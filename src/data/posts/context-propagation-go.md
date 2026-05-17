---
title: Context Propagation in Go: The Right Way
excerpt: A deep dive into how Go contexts should flow through your application layers — and the subtle bugs that happen when they do not.
category: tech
date: Mar 5, 2025
readTime: 10 min read
slug: context-propagation-go
featured: false
---

## Why Context Matters

Go's `context.Context` is the idiomatic way to carry deadlines, cancellation signals, and request-scoped values across API boundaries. When done right, it makes cancellation propagate automatically. When done wrong, you leak goroutines and ignore timeouts.

## The Golden Rules

**1. Always pass context as the first argument**

```go
// Good
func FetchUser(ctx context.Context, id int) (*User, error)

// Bad — context hidden inside struct
func (s *Service) FetchUser(id int) (*User, error) {
    // uses s.ctx internally — antipattern
}
```

**2. Never store context in a struct**

Contexts are request-scoped. Storing them in long-lived structs creates subtle bugs where stale contexts outlive their request.

**3. Derive, never replace**

```go
// Adding a timeout to an existing context
ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
defer cancel()

// Adding a value
ctx = context.WithValue(ctx, traceIDKey, traceID)
```

## A Real-World Layered Example

```go
// Handler layer
func (h *Handler) GetOrder(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()
    order, err := h.svc.GetOrder(ctx, orderID)
    // ...
}

// Service layer
func (s *OrderService) GetOrder(ctx context.Context, id int) (*Order, error) {
    return s.repo.FindByID(ctx, id)
}

// Repository layer
func (r *OrderRepo) FindByID(ctx context.Context, id int) (*Order, error) {
    row := r.db.QueryRowContext(ctx, "SELECT ... WHERE id = $1", id)
    // ...
}
```

If the HTTP request is cancelled (client disconnects), the cancellation propagates all the way down to the database query. No leaked goroutines, no wasted DB connections.

## Common Mistakes

- Using `context.Background()` deep in the call stack instead of the incoming ctx
- Ignoring `ctx.Err()` in long loops
- Passing `nil` context (always use `context.TODO()` as a placeholder, never nil)
