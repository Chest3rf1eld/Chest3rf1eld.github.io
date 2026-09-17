---
title: Proverka-cheka.ru Abuse Mitigation
summary: Сдерживание злоупотребления трафиком, которое расходовало лимиты внешнего API.
relatedWorkSlug: anti-flood-mitigation
stack: nginx, fail2ban, nftables, captcha, request queue, diagnostics
---

```text
public traffic
  -> request and IP correlation
  -> captcha / queue / rate controls
  -> nginx and fail2ban escalation
  -> nftables containment layer
  -> clearer incident signals
```

## Контекст

Злоупотребление трафиком против proverka-cheka.ru расходовало лимиты внешнего API и требовало повторяющихся ручных действий.

## Ограничения

Публичный кейс может называть домен, но не раскрывает точные firewall rules, thresholds, regular expressions, jail internals, IP, attacker network labels, allowlists, logs, provider details или exact defensive configuration.

## Архитектура

Сдерживание построено несколькими слоями, а не одним block rule: application-facing controls, nginx-side rate limiting, fail2ban escalation, nftables containment и более понятная диагностика.

## Действия

- Добавил request/IP correlation, чтобы понять паттерны злоупотребления.
- Добавил captcha, request queueing и nginx rate limiting.
- Добавил fail2ban escalation и nftables subnet containment.
- Использовал dynamic containment behavior, чтобы уменьшить повторяющуюся ручную блокировку.

## Результаты

- Abuse stopped или был сильно снижен.
- Расход внешних API limits стал контролируемым.
- Ручной блокировки стало меньше.
- Diagnostics стали понятнее для будущих incidents.

## Safety Note

Кейс намеренно не раскрывает exact defensive configuration, rules, thresholds, expressions, private topology, logs и attacker network details.
