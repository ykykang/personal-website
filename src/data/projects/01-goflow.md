---
title: GoFlow — Event-Driven Microservices Framework
tech: Go, Kafka, Redis, PostgreSQL, Docker
status: Open Source
link: https://github.com/ykykang
year: 2024
featured: true
---

A lightweight framework built in Go for orchestrating event-driven microservices. Features automatic retry, dead-letter queues, and distributed tracing out of the box.

## Background

Growing frustration with boilerplate across multiple Go microservice projects — every service reimplemented retry logic, DLQ handling, and tracing wiring differently. No consistent standard existed in the team.

## Bottleneck

The hardest part was designing a generic event schema that could carry arbitrary payloads without sacrificing type safety. Early versions used interface{} everywhere, leading to silent runtime panics in consumers.

## Achievements

- Adopted by 3 internal teams within 2 months of open-sourcing
- Reduced per-service boilerplate by ~60% (measured in lines of code across 5 services)
- Built-in distributed tracing cut average incident MTTR from 40 min to under 12 min
