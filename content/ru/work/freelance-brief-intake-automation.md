---
title: Freelance Email-to-Telegram Monitor
priority: supporting
url: https://github.com/Chest3rf1eld/kwork-jobs-parser
redditUrl: https://www.reddit.com/r/RuProgrammers/s/O6DUeSJ1W3
stack: Google Apps Script, JavaScript, Gmail API, Telegram Bot API, clasp, parsing, workflow automation
---

**Проблема:** релевантные фриланс-заказы легко пропустить, когда уведомления Kwork остаются в Gmail.

**Действие:** сделал Google Apps Script workflow, который читает письма с Gmail-меткой, парсит карточки заказов Kwork, фильтрует по бюджету и ключевым словам, отправляет Telegram-дайджесты, помечает обработанные письма и повторяет отправку при Telegram `429` rate limit.

**Результат:** подходящие заказы приходят в Telegram с контекстом для быстрого triage, а обработанные письма безопасно отслеживаются через Gmail labels.
