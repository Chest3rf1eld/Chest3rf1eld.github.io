---
title: Monitoring Stack as Code
priority: primary
url: https://github.com/Chest3rf1eld/grafana-prometheus-loki-ansible
stack: Ansible, Prometheus, Grafana, Loki, Promtail, blackbox_exporter, nginx, nftables
---

**Проблема:** мониторинг не должен собираться руками на каждом сервере.

**Действие:** сделал Ansible playbooks и роли для distributed monitoring stack: Grafana, Prometheus, Loki, blackbox checks, TLS и firewall rules.

**Результат:** мониторинг можно повторить, проверить и менять через код.
