---
layout: post
title: Announcing beta.getmonero.org
summary: A redesigned getmonero.org is up at beta.getmonero.org. Feedback wanted.
tags: [announcements, community]
author: redsh4de
---

Work on the redesign began with a concept by [rehrar](https://github.com/rehrar) (Diego Salazar), shared in Figma in 2024 and refined through community feedback. Building it out was [funded through the CCS](https://ccs.getmonero.org/proposals/redsh4de-getmonero-redesign.html), and the result is now up for testing:

### [beta.getmonero.org](https://beta.getmonero.org)

<figure style="margin: 1.5rem 0;">
  <img src="/blog/assets/2026-09-08-announcing-the-getmonero-org-beta/home.png" alt="The beta front page" style="border-radius: 8px;">
  <figcaption style="font-size: 0.9em; opacity: 0.75; margin-top: 0.5rem;"><em>The beta front page.</em></figcaption>
</figure>

The rules the beta is built against:

- No JavaScript required
- No landing-page gimmicks
- No dark-only theme
- Designed for mobile from the start
- No increase in page weight

## What is new in the beta

Taking those rules in order.

**Still no JavaScript.** No scripts run in your browser, and no page asks anything of anyone else's server. Fonts and video are served from the site itself.

**Follows your system theme.** Light or dark, matched to your browser's settings, so neither camp gets a theme forced on them.

<figure style="margin: 1.5rem 0;">
  <picture>
    <source srcset="/blog/assets/2026-09-08-announcing-the-getmonero-org-beta/theme-light-dark.png" media="(prefers-reduced-motion: reduce)">
    <img src="/blog/assets/2026-09-08-announcing-the-getmonero-org-beta/theme-light-dark.gif" alt="The beta roadmap page wiping between light and dark mode" style="border-radius: 8px;">
  </picture>
  <figcaption style="font-size: 0.9em; opacity: 0.75; margin-top: 0.5rem;"><em>The roadmap page in light and dark mode.</em></figcaption>
</figure>

**Lighter than the site it replaces.** The front page transfers about a third of the bytes the current one does, which matters on a slow or expensive connection.

<figure style="margin: 1.5rem 0;">
  <img src="/blog/assets/2026-09-08-announcing-the-getmonero-org-beta/page-weight.png" alt="Chart comparing front page transfer size" style="border-radius: 8px;">
  <figcaption style="font-size: 0.9em; opacity: 0.75; margin-top: 0.5rem;"><em>Front page weight on a desktop browser, measured on a first visit with an empty cache.</em></figcaption>
</figure>

**Icons that hold up in Tor Browser.** On the strictest security setting, Tor Browser blocks SVGs, commonly used for iconography. The beta uses a custom AVIF icon system, so the icons still render.

**Better right-to-left language support.** On the current site the text flips but the layout around it does not. The beta mirrors the whole page instead, and any right-to-left language added later gets that from the start. Arabic is live now.

**Built with Astro instead of Jekyll.** The current site needs an old Ruby setup and custom plugins to build, which puts off casual contributors. Astro is simpler to run and still ships plain HTML, with no client-side JavaScript.

## What is still in progress

A few things are still being worked on:

**Illustrations.** Some have been carried over from the current site and sit awkwardly next to the new design; others are stand-ins. If illustration or design is something you do, this is one of the more useful places to contribute right now, and it does not require touching any code. Say so in `#monero-site` on [Matrix] or [IRC] and we can point you at what needs replacing.

**Languages.** English, Arabic, and Chinese are in place so far, compared to a considerably greater number of options on the current site. The translation setup is ready for the rest, and work is underway to bring the Weblate instance back up, so translating a page will not mean touching the repository. If there is a language you want to work on, say so in `#monero-site` on [Matrix] or [IRC].

**Copy.** A few pages still carry placeholder or lightly-edited text, and some inherited content is out of date and needs rewriting rather than moving across. Moneropedia is the largest piece of this.

## Feedback

Before this becomes the site everyone lands on, it should be tested by the people who use it.

Useful things to report:

- **Broken things.** Layout problems, dead links, anything that misbehaves in Tor Browser, on a phone, or in a narrow window.
- **Things you could not find.** If you went looking for something and gave up, that is a navigation problem, and worth reporting along with what you were after.
- **Translation problems.** Text that overflows, reads wrong, or lays out incorrectly.
- **Accessibility problems.** Screen reader behaviour, keyboard navigation, contrast.
- **Content that is wrong or out of date.** Corrections are welcome.

Where to send it:

- **[GitHub issues](https://github.com/monero-project/monero-site/issues)** for anything specific and reproducible. Put **`[beta]`** in the title, so it is clear the report is about the beta and not the current site.
- **`#monero-site`** on [Matrix] or [IRC] for discussion and questions.

Pull requests are welcome too.

Thanks to rehrar for the design, to everyone who has reviewed, tested and filed issues against the beta so far, and to the community for funding the work.

[beta.getmonero.org](https://beta.getmonero.org)

[Matrix]: https://matrix.to/#/%23monero-site:monero.social
[IRC]: irc://irc.libera.chat/#monero-site
