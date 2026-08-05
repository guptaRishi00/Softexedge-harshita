# Discovery — SoftexEdge

Date: 2026-08-05
Sources: full audit of the live codebase (`src/`), two prior copy audits this session.
**No client interview conducted.** This is a compressed discovery run from code
evidence alone.

**Confidence: LOW–MEDIUM.** Everything below marked *claim* is the company's own
assertion taken from its website. None of it has been verified with the client. Per
`CLAUDE.md` §2, claims cannot be used as proof until confirmed.

---

## 1. What the business actually does

A digital agency offering **both engineering and marketing** under one roof. Verified
from the route structure (`src/app/`), which is the strongest evidence available
without an interview:

**Engineering:** web development · app development · custom software & SaaS · UI/UX design
**Marketing:** digital marketing · AI & marketing automation · brand strategy · video production

This combination is the most interesting fact in the discovery. Most agencies do one
side or the other.

Domain evidence: `softexedge.com` on-site; `softexedge.in` in the operator's own email.
India-based. City not evidenced in code.

## 2. Fact inventory

| Fact | Source | Verified | Usable as proof |
|---|---|---|---|
| Offers 8 services spanning build + marketing | `src/app/` route structure | ✅ Yes | ✅ Yes — structural, self-evident |
| Traul: rebuilt admin portal + driver app + customer app | `PortfolioSection.tsx:28-38` | ❌ Client's own copy | ⚠️ Needs confirmation |
| Traul: React Native + Node.js, real-time dispatch, geofencing, B2B billing | same | ❌ | ⚠️ Needs confirmation |
| Traul: "~75% lower cost than the previous vendor" | same | ❌ | ⚠️ **Flagship claim — confirm first** |
| "16 Years of Vision", 85 brands, 500 deployments, 18 sectors | `home/StatsSection.tsx:13-18` | ❌ **Conflicts** | ❌ Unusable |
| "10 years experience", 250 projects, 50 team, 98% retention | `brand-strategy/AgencyStats.tsx:9-26` | ❌ **Conflicts** | ❌ Unusable |
| "Trusted by 27,000+ creators" | `*/CtaSection.tsx` ×8 | ❌ Template residue | ❌ **Delete on sight** |
| 4 testimonials (Rivera, Chen, Lin, Ross) | `ExperimentalTestimonials.tsx:11-40` | ❌ Fabricated, quotes truncated | ❌ **Delete** |
| Portfolio: Finova, Lumina, Nova, Zephyr | `PortfolioSection.tsx` / `data/projects.ts` | ❌ Stock imagery, Europe/N-America claims | ❌ Unverified |

**Three mutually exclusive self-descriptions exist on the live site.** 16 years vs 10
years is a direct contradiction two clicks apart. Until the client picks one, **no
company statistic may appear in any copy.**

## 3. Proof assets

**Usable today:** exactly one — the service-range fact, which is structural and
self-proving.

**Potentially strong, pending confirmation:** the Traul rebuild. It is the only
portfolio entry with its own asset (`traul3.png` rather than stock), specific
technical scope, and a hard number. If confirmed it becomes the flagship.

**Unusable:** every statistic, every testimonial, four of five portfolio entries.

**This is a proof-poor project.** Per `proof-formulas.md` §"When there is genuinely no
proof", the homepage must lean on **mechanism** — explaining precisely why the
approach works — rather than evidence. That is a legitimate strategy, not a fallback.

## 4. The offer

Eight services. No pricing published anywhere. No engagement model, minimum, or
timeline stated. Contact form is the only conversion route, and it does not submit.

`[[NEEDS: price shape — even a range, e.g. "most projects £X–£Y"]]`
`[[NEEDS: typical engagement length and team size per project]]`

## 5. How they win / lose deals

Unknown. No sales input available.

`[[NEEDS: who do you lose to, and why?]]`
`[[NEEDS: what do prospects consistently misunderstand about you?]]`
`[[NEEDS: best result ever produced for a client, with numbers]]`

## 6. Constraints

None recorded. No regulated claims present. No legal review process known.

## 7. Existing copy audit

Full findings in `.claude/SESSION_LOG.md` (2026-08-05 entries). Live blockers:

| Issue | Location | Status |
|---|---|---|
| "Studio: San Francisco" + `+1 (800) 123-4567` | `home/ContactSection.tsx:13-31` | Live |
| Template CTA — waitlist / "photorealism at scale" / 27,000 creators | all 8 `*/CtaSection.tsx` | Live |
| `hello@youragency.com` + `+1 (555) 123-4567` | all 8 `*/CtaSection.tsx` | Live |
| Contact form has no `onSubmit`/`action` | `home/ContactSection.tsx:147` | Live |
| Newsletter form has no handler | `layout/Footer.tsx:193` | Live |
| 4 testimonial quotes truncated mid-sentence | `ExperimentalTestimonials.tsx:14,21,28,35` | Live |
| "Trusted By" strip shows React/Next/TS/Tailwind | `home/page.tsx:153-178` | Live |
| Brand casing `Softexedge` ×5 vs `SoftEXedge` ×1 | repo-wide | Live |

Hero and About copy were rewritten earlier today and are current.

## 8. Gaps — prioritised

**Blocking the homepage:**
1. `[[NEEDS: one canonical stat set — years, projects, team size. Three conflicting sets are live.]]`
2. `[[NEEDS: confirm the Traul engagement — scope, the ~75% figure, and written permission to name them]]`
3. `[[NEEDS: real studio location and phone number]]`
4. `[[NEEDS: canonical email — softexedge.com or softexedge.in?]]`
5. `[[NEEDS: which of Finova / Lumina / Nova / Zephyr are real clients?]]`

**Blocking credibility generally:**
6. `[[NEEDS: two real testimonials — ask "what were you worried about before hiring us?" and "what specifically changed?"]]`
7. `[[NEEDS: price shape]]`
8. `[[NEEDS: where does the contact form submit to?]]`

## 9. Open questions for the client

1. How many years, actually? Three numbers are published.
2. Is the Traul 75% figure something you'd put in writing?
3. Which portfolio projects are real client engagements?
4. Where are you based, and what number should ring?
5. Who do you lose deals to?
6. What is the smallest project you'll take?
