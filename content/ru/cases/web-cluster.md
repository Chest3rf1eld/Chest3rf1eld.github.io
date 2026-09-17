---
title: Web Cluster Operations
summary: Повторяемые операции для web-платформы на 170+ сайтов.
relatedWorkSlug: hestiacp-automation
stack: Nginx/HAProxy, HestiaCP, WordPress/PHP-FPM, MySQL/MariaDB, DNS, Bash, Ansible, WP-CLI, Object Storage
---

```text
request path
  -> edge routing / reverse proxy
  -> web platform services
  -> database and storage layer
  -> backup and restore workflow

operations path
  -> scripted provisioning
  -> SSL / DNS / migration tasks
  -> permissions and cache maintenance
  -> backup checks and recovery runbooks
```

## Контекст

Платформа обслуживает 170+ сайтов, где ручные изменения быстро становятся медленными, непоследовательными и рискованными.

## Ограничения

Публичный кейс не раскрывает карту провайдеров, топологию, IP-адреса, приватные hostnames, клиентов или операционные логи.

## Архитектура

Публично безопасное описание: стандартный web operations stack на Nginx/HAProxy, HestiaCP, WordPress/PHP-FPM, MySQL/MariaDB, DNS и бэкапах в Object Storage.

## Действия

- Собрал Bash и Ansible workflows для подготовки и типовых операций.
- Автоматизировал SSL, DNS/domain setup, миграции, права, cache/plugin maintenance, смену PHP backend и backup workflows.
- Стандартизировал восстановление и повторяемую подготовку через scripts и runbooks.

## Результаты

- Типовые операции стали быстрее и предсказуемее.
- Риск ручных ошибок снизился за счет повторяемых scripts и playbooks.
- Recovery и redeploy workflows приблизились к часам вместо дней.
- Новые сайты, домены и бэкапы стало проще масштабировать по стандартному процессу.

## Safety Note

Кейс намеренно не раскрывает приватную схему инфраструктуры, точную карту провайдеров, IP, hostnames, данные клиентов, allowlists, credentials и логи.
