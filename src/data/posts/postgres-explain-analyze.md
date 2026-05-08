## Why EXPLAIN ANALYZE?

When a query is slow, the first instinct is often to add an index and pray. But without reading the query plan, you might add the wrong index — or worse, add one that makes things slower.

`EXPLAIN ANALYZE` shows you exactly what Postgres did: which indexes it used, how many rows it scanned, and where the time was spent.

## Reading a Basic Plan

```sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 42 AND status = 'pending';
```

Output:

```
Index Scan using orders_user_id_idx on orders  (cost=0.43..8.45 rows=3 width=156)
                                               (actual time=0.032..0.041 rows=2 loops=1)
  Index Cond: (user_id = 42)
  Filter: ((status)::text = 'pending')
  Rows Removed by Filter: 7
Planning Time: 0.3 ms
Execution Time: 0.1 ms
```

Key things to notice:
- **Index Scan**: good, it is using an index
- **Rows Removed by Filter: 7**: it fetched 9 rows from the index, then discarded 7 — opportunity to add a composite index on `(user_id, status)`
- **actual rows vs estimated rows**: if these diverge wildly, run `ANALYZE orders` to update statistics

## The Seq Scan Red Flag

```
Seq Scan on orders  (cost=0.00..95432.00 rows=4200000 width=156)
                    (actual time=0.012..820.442 rows=4200000 loops=1)
```

A sequential scan on millions of rows is almost always a problem. Postgres is reading the entire table. Add an index on the filtered column, or check if your `WHERE` clause is using a function that prevents index use:

```sql
-- Bad: function on indexed column prevents index use
WHERE LOWER(email) = 'test@example.com'

-- Good: use a functional index or store data normalized
CREATE INDEX ON users (LOWER(email));
```

## Connecting to Go

In Go, you can log slow queries using pgx's tracer interface:

```go
type queryTracer struct{}

func (t *queryTracer) TraceQueryStart(ctx context.Context, conn *pgx.Conn, data pgx.TraceQueryStartData) context.Context {
    return context.WithValue(ctx, "query_start", time.Now())
}

func (t *queryTracer) TraceQueryEnd(ctx context.Context, conn *pgx.Conn, data pgx.TraceQueryEndData) {
    start := ctx.Value("query_start").(time.Time)
    if time.Since(start) > 100*time.Millisecond {
        slog.Warn("slow query", "sql", data.SQL, "duration", time.Since(start))
    }
}
```

Then run `EXPLAIN ANALYZE` on any query that shows up in your slow query log.
