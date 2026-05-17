---
title: Kasir — Real-time POS & Inventory API
tech: Go, PostgreSQL, Redis, WebSocket, gRPC
status: Production
link: #
year: 2023
featured: true
---

High-throughput REST + WebSocket API serving a nationwide retail chain. Handles 50k+ concurrent connections with sub-10ms p99 latency using Go and Redis.

## Background

A national retail chain was running inventory sync on a legacy PHP monolith that couldn't handle flash-sale traffic spikes. During peak events, the system would lag 5–10 minutes behind real stock levels, causing overselling.

## Bottleneck

WebSocket fan-out at scale was the core challenge. Broadcasting inventory updates to thousands of connected POS terminals caused head-of-line blocking. Solved with a pub/sub layer in Redis Streams and per-connection write buffers.

## Achievements

- Sustained 50k+ concurrent WebSocket connections at p99 < 10ms
- Eliminated overselling incidents — zero stock discrepancies during three consecutive flash sales
- Inventory sync lag reduced from ~8 minutes to under 200ms
