---
name: Nikita Chaturov
title: Infrastructure Engineer / Linux System Administrator
location: Kazan, Russia
email: nikchester01@gmail.com
telegram: https://t.me/Chesterf1ld
github: https://github.com/Chest3rf1eld
linkedin: https://www.linkedin.com/in/nikita-chaturov-8625a5281/
---

## Profile

Linux System Administrator and Infrastructure Engineer focused on production Linux infrastructure, virtualization, automation, monitoring, backups, networking, incident troubleshooting, and technical documentation.

Currently the only infrastructure engineer in the company. I manage around 15 servers and virtual machines across 4 providers, an internal Proxmox VE environment, and infrastructure for 170+ websites.

## Core Stack

Linux, Debian, Ubuntu, Proxmox VE, Docker, Docker Compose, Ansible, Bash, Python, Nginx, HAProxy, MikroTik, WireGuard, OpenVPN, DNS, Bind9, Prometheus, Grafana, Loki, Zabbix, MySQL/MariaDB, PostgreSQL, Redis, GitLab CI/CD, Yandex Cloud, Object Storage.

## Experience

### Wclik - System Administrator / Infrastructure Engineer

Jan 2024 - Present, Kazan

- Own Linux servers, VMs, networking, monitoring, backups, access control, security hardening, documentation, and incident troubleshooting.
- Build idempotent Ansible playbooks and Bash scripts for server provisioning, HestiaCP/nginx/PHP-FPM setup, exporters, SSL, domain setup, migrations, permissions, and routine operations.
- Administer Docker and Docker Compose services, Nginx/HAProxy reverse proxies, DNS, GitLab, GitLab CI/CD pipelines, PostgreSQL, MySQL/MariaDB, Redis, VPN, and Proxmox VE.
- Maintain monitoring and alerting with Prometheus, Grafana, Loki, Promtail, exporters, and Zabbix. Tune alert thresholds and reduce noisy alerts.
- Manage backups to Object Storage with retention policies, failed-backup alerts, test restores, log rotation, and runbooks.
- Support security controls: SSH keys, fail2ban, nftables/iptables, dynamic firewall sets, database access restrictions, IP allowlists, rate limiting, and captcha-based abuse protection.
- Document infrastructure in Wiki.js: architecture diagrams, runbooks, troubleshooting notes, and operational procedures.

## Selected Work

### Monitoring and Alerting From Scratch

Designed and implemented monitoring for servers, websites, backups, and application services. Set up Prometheus, Grafana, Loki, Promtail, exporters, and alerts for availability, HTTP status codes, SSL expiration, load, service failures, and backup failures.

### Automation for 170+ Websites

Created Ansible playbooks and Bash tooling for a web hosting platform: server provisioning with HestiaCP, domain creation with DNS zones and databases, website migrations, mass SSL issuing, reCAPTCHA setup, MariaDB tuning, and backups to Object Storage. Recovery became hours instead of days.

### Proxmox VE Infrastructure and Service Migration

Deployed an internal Proxmox VE server and migrated GitLab, WireGuard VPN, Wiki.js, Vaultwarden, GLPI, monitoring, remote desktops, Bitrix24, and FreePBX between cloud providers and local infrastructure without data loss.

### Production Incident Mitigation

Investigated abusive traffic against a public service that exhausted external API limits. Added request/IP correlation, captcha, nginx rate limiting, a request queue, and fail2ban escalation. Then implemented subnet-level containment with nftables: interval sets for manual /24 blocking and an in-kernel meter that detects flood by subnet and bans abusive IPs through dynamic sets with timeouts. The abuse stopped, manual blocking decreased, and diagnostics became clearer.

## Education

Kazan National Research Technical University named after A. N. Tupolev - KAI, Information Systems and Technologies, part-time bachelor's degree, expected graduation in 2028.

KTK KNITU, Applied Informatics, Programmer Technician, graduated in 2023.

## Languages

Russian - native. English - A2.
