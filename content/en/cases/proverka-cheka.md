---
title: Proverka-cheka.ru Abuse Mitigation
summary: Incident mitigation for abusive traffic exhausting external API limits.
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

## Context

Abusive traffic against proverka-cheka.ru was exhausting external API limits and creating repeated manual response work.

## Constraints

The public case can name the domain, but it cannot publish exact firewall rules, thresholds, regular expressions, jail internals, IPs, attacker network labels, allowlists, logs, provider details, or exact defensive configuration.

## Architecture Summary

The mitigation used multiple layers rather than a single block rule: application-facing controls, nginx-side rate limiting, fail2ban escalation, nftables containment, and clearer diagnostics.

## Actions

- Added request/IP correlation to understand abusive patterns.
- Added captcha, request queueing, and nginx rate limiting.
- Added fail2ban escalation and nftables subnet containment.
- Used dynamic containment behavior to reduce repeated manual blocking.

## Results

- Abuse stopped or was strongly reduced.
- External API limit usage became controlled.
- Manual blocking decreased.
- Diagnostics became clearer for future incidents.

## Safety Note

This case intentionally avoids exact defensive configuration, rules, thresholds, expressions, private topology, logs, and attacker network details.
