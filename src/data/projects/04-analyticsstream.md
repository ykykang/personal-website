---
title: AnalyticsStream — Real-time Data Pipeline
tech: Go, Kafka, ClickHouse, Protobuf, Grafana
status: Production
link: #
year: 2022
featured: false
---

End-to-end streaming data pipeline that ingests millions of user events daily. Built with Go consumers, schema validation, and ClickHouse for analytics.

## Background

The product team was running analytics on nightly batch exports to BigQuery — dashboards were always 12–24 hours stale. Business decisions around promotions and A/B tests were being made on yesterday's data.

## Bottleneck

Schema evolution was the main operational headache. Producers pushed breaking schema changes that silently corrupted downstream consumers. Enforced Protobuf contracts with a schema registry and added consumer-side validation before writes to ClickHouse.

## Achievements

- Analytics latency dropped from 12–24 hours to under 90 seconds end-to-end
- Pipeline handles sustained 3M+ events/day with no manual intervention
- Schema validation layer caught 4 breaking changes in the first month before they reached production dashboards
