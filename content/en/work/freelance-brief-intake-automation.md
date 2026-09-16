---
title: Freelance Email-to-Telegram Monitor
priority: supporting
url: https://github.com/Chest3rf1eld/kwork-jobs-parser
redditUrl: https://www.reddit.com/r/RuProgrammers/s/O6DUeSJ1W3
stack: Google Apps Script, JavaScript, Gmail API, Telegram Bot API, clasp, parsing, workflow automation
---

**Problem:** relevant freelance leads can be missed when Kwork email notifications stay buried in Gmail.

**Action:** built a Google Apps Script workflow that reads labeled Gmail messages, parses Kwork order cards, filters by budget and keywords, sends Telegram digests, marks processed messages, and retries Telegram `429` rate limits.

**Result:** matching leads are delivered to Telegram with enough context for quick triage, while processed emails are tracked safely by Gmail labels.
