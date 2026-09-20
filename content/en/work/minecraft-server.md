---
title: Minecraft Server Infrastructure
priority: primary
url: https://github.com/Chest3rf1eld/minecraft-server
caseUrl: /en/cases/minecraft-server/
stack: Debian, Paper, Ansible, GitHub Actions, restic, rclone, Yandex Disk, Telegram, Healthchecks.io
---

**Problem:** a private server for friends still needed safe deploys, working backups, and real alerting.

**Action:** built Ansible provisioning, a GitHub Actions deploy pipeline with a pre-deploy backup gate, restic/rclone backups to Yandex Disk, and Telegram/Healthchecks.io monitoring.

**Result:** provision, deploy, backup, and restore run end to end, and a real restore has been verified on production.
