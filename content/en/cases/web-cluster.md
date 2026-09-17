---
title: Web Cluster Operations
summary: Repeatable operations for a 170+ site web platform.
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

## Context

The platform supports 170+ websites where manual changes quickly become slow, inconsistent, and risky.

## Constraints

The public case does not expose provider mapping, topology, IP addresses, private hostnames, customer names, or operational logs.

## Architecture Summary

The public architecture is a standard web operations stack: Nginx/HAProxy, HestiaCP, WordPress/PHP-FPM, MySQL/MariaDB, DNS, and backups to Object Storage.

## Actions

- Built Bash and Ansible workflows for provisioning and routine operations.
- Automated SSL, DNS/domain setup, migrations, permissions, cache/plugin maintenance, PHP backend changes, and backup workflows.
- Standardized recovery and repeatable setup steps through scripts and runbooks.

## Results

- Routine operations became faster and more predictable.
- Manual risk decreased through repeatable scripts and playbooks.
- Recovery and redeploy workflows moved toward hours instead of days.
- New sites, domains, and backups became easier to scale through a standard process.

## Safety Note

This case intentionally omits private infrastructure layout, exact provider setup, IPs, hostnames, customer data, allowlists, credentials, and logs.
