---
title: Designing for Failure: Retry Patterns in Go Microservices
excerpt: How to implement robust retry logic with exponential backoff, jitter, and circuit breakers without drowning your downstream services.
category: tech
date: Apr 12, 2025
readTime: 8 min read
slug: retry-patterns-go
featured: true
---

## The Problem with Naive Retries

Most engineers reach for a simple retry loop when a network call fails. It looks innocent:

```go
for i := 0; i < 3; i++ {
    err := callDownstream()
    if err == nil {
        break
    }
}
```

The problem? If your service has 100 instances all retrying on failure, you've just created a **retry storm** that hammers your downstream at the worst possible moment.

## Exponential Backoff with Jitter

The standard solution is exponential backoff — wait longer between each attempt:

```go
func retryWithBackoff(fn func() error, maxAttempts int) error {
    for attempt := 0; attempt < maxAttempts; attempt++ {
        if err := fn(); err == nil {
            return nil
        }
        // base * 2^attempt, capped at 30s
        wait := min(time.Duration(math.Pow(2, float64(attempt)))*100*time.Millisecond, 30*time.Second)
        // add jitter: +/- 20%
        jitter := time.Duration(rand.Int63n(int64(wait / 5)))
        time.Sleep(wait + jitter)
    }
    return fmt.Errorf("max attempts reached")
}
```

The **jitter** is critical. Without it, all your service instances back off to the same intervals and fire simultaneously — the thundering herd problem.

## Circuit Breakers

Backoff alone is not enough. If downstream is completely down, you are wasting resources even waiting. Enter the circuit breaker pattern:

| State | Behavior |
|-------|----------|
| Closed | Normal — requests pass through |
| Open | Fast-fail — no requests sent |
| Half-Open | Test probe — one request allowed |

Use [sony/gobreaker](https://github.com/sony/gobreaker) for a solid Go implementation. The library handles state transitions automatically based on failure thresholds you configure.

## Key Takeaways

- Always add **jitter** to backoff to avoid thundering herd
- Set a **maximum backoff** cap (30s is usually sane)
- Use **circuit breakers** for fast-fail when downstream is down
- Make retries **idempotent** — only retry safe, idempotent operations
- Log **every attempt** with context for observability
