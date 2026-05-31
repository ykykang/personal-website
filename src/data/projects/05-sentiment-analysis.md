---
title: Sentimen Analisis — Student Internet Usage Sentiment Analysis
tech: PHP, Laravel 11, SQLite, Naive Bayes
status: Production
link: #
year: 2024
featured: true
---

Web application for schools to classify student sentiment toward internet usage in learning, using Naive Bayes with Laplacian correction. Teachers fill questionnaires; the system automatically classifies each student and generates accuracy metrics (TP/TN/FP/FN).

## Background

A school needed an evidence-based way to assess whether internet usage positively or negatively impacts student learning motivation. Manual teacher observation was inconsistent and not scalable across classes. Administrators had no aggregate view of which students were at risk of low learning motivation due to internet distraction.

## Bottleneck

Naive Bayes can produce zero-probability outcomes when a test attribute never appears in the training data, silently breaking classification. The training dataset is small (20 labeled records), making this a near-certain occurrence for any reasonably diverse questionnaire response. Solved by applying Laplacian smoothing selectively — only triggered when a calculated probability reaches zero, avoiding unnecessary inflation of other probabilities.

## Achievements

- Classifies student sentiment across 24 questionnaire attributes with automatic zero-probability fallback
- Role-based access: Admin manages all data; Guru (teacher) sees only their own class
- Public `/hasil` endpoint lets students self-lookup their analysis result via student code — no login required
- Confusion matrix (TP/TN/FP/FN) summary for Admin to evaluate model accuracy across all submissions
