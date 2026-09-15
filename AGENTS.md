# Project Goal

Create a personal portfolio website hosted on GitHub Pages so hosting costs are zero.

# Product Direction

The site should present the owner clearly and quickly: who they are, what they do, what value they provide, proof through selected work, and direct contact options.

# Style

Minimalism in both visual design and copy.

Use the principle: 20% of the text should communicate 80% of the meaning.

Prefer short, precise, high-signal copy over long descriptions. Avoid filler, generic claims, and decorative complexity.

# Visual Direction

Use a minimal retro desktop aesthetic inspired by old Windows 95/98 UI.

Key traits:
- teal or dark desktop-like backgrounds
- grey system windows
- blue active title bars
- thin borders and bevel effects
- compact system typography
- restrained pixel, toolbar, and icon details

Do not recreate visual clutter directly. Use the reference as an interface language while keeping the portfolio clear, readable, and minimal.

See `DESIGN_REFERENCE.md` for the extracted reference traits.

# Audience

Primary audience:
- Recruiters and hiring managers
- Freelance clients
- Technical leads
- Professional contacts

The site should help visitors quickly understand:
- Role and specialization
- Problems solved
- Relevant projects
- Technical skill level
- How to make contact

# GitHub Pages

Use GitHub Pages as the hosting target.

Prefer a simple static site first. Add build tooling only if it improves maintainability, design quality, or deployment reliability.

For a free GitHub Pages setup, prefer a public repository named `<username>.github.io` for the main portfolio site.

# GitHub Workflow

GitHub CLI access is available and should be used for GitHub operations whenever possible.

Use `gh` CLI for repository setup, GitHub Pages configuration, issue/PR operations, and other GitHub tasks that can be performed from the terminal.

Do not ask the user to do GitHub actions manually unless they cannot be completed through available tools or require user-only access, credentials, payment, or an external confirmation.

If something cannot be completed independently, clearly assign that specific blocked action to the user.
