---
title: Monitoring Stack as Code
priority: primary
url: https://github.com/Chest3rf1eld/grafana-prometheus-loki-ansible
stack: Ansible, Prometheus, Grafana, Loki, Promtail, blackbox_exporter, nginx, nftables
---

**Problem:** monitoring should be reproducible, not hand-built on every server.

**Action:** built Ansible playbooks and roles for a distributed monitoring stack with Grafana, Prometheus, Loki, blackbox checks, TLS, and firewall rules.

**Result:** monitoring setup can be reviewed, repeated, and changed through code.
