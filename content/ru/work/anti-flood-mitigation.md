---
title: Proverka-cheka.ru Abuse Mitigation
priority: primary
order: 1
caseUrl: /ru/cases/proverka-cheka/
stack: nginx, fail2ban, nftables, captcha, request queue, диагностика инцидентов
---

**Проблема:** злоупотребление трафиком против proverka-cheka.ru расходовало лимиты внешнего API и требовало повторяющихся ручных действий.

**Действие:** добавил корреляцию запросов и IP, captcha, nginx rate limiting, очередь запросов, эскалацию fail2ban и сдерживание подсетей через nftables: interval sets, in-kernel meter и dynamic sets с timeout.

**Результат:** злоупотребления прекратились, ручной блокировки стало меньше, диагностика инцидентов стала понятнее.
