---
title: Minecraft Server Infrastructure
priority: primary
url: https://github.com/Chest3rf1eld/minecraft-server
caseUrl: /ru/cases/minecraft-server/
stack: Debian, Paper, Ansible, GitHub Actions, restic, rclone, Yandex Disk, Telegram, Healthchecks.io
---

**Проблема:** приватному серверу для друзей всё равно нужны безопасные деплои, рабочие бэкапы и реальный алертинг.

**Действие:** собрал Ansible-провижининг, GitHub Actions deploy pipeline с обязательным backup gate перед деплоем, restic/rclone бэкапы в Yandex Disk и мониторинг через Telegram/Healthchecks.io.

**Результат:** provision, deploy, backup и restore проходят end-to-end, а реальный restore проверен на production.
