# QA — SoftexEdge homepage

Date: 2026-08-05 · Reviewed: `deliverables/copy/home.md` against the live page

# Verdict: **BLOCKED**

Not because of the copy. Because the page cannot honestly ship while three live
blockers remain, and two of them are defects no copy change can repair.

---

## Blockers (4) — cannot ship

**B1 · Every conversion path on the page is dead.**
`home/ContactSection.tsx:147` — `<form>` with no `onSubmit` and no `action`.
`layout/Footer.tsx:193` — newsletter `<form>`, same.
Every CTA on the homepage routes to one of these. Enquiries are being discarded now.
**Required:** wire both forms. This outranks every other item in this report.

**B2 · Fabricated social proof is live.**
`ExperimentalTestimonials.tsx:11-40` — four testimonials, all quotes truncated
mid-sentence, two attributed to employee job titles. No source in the fact inventory.
**Required:** remove. Replace only with real, attributed quotes.

**B3 · Placeholder contact details are live.**
`ContactSection.tsx:13-31` — "Studio: San Francisco" and `+1 (800) 123-4567` for an
India-based company.
**Required:** real location and a working number, or remove the fields.

**B4 · Unverifiable statistics are live and self-contradictory.**
Home: 16 years / 85 brands / 500 deployments. Service pages: 10 years / 250 projects /
50 team. CTA blocks: 27,000+ creators.
No source for any of them; 16 vs 10 is a direct contradiction two clicks apart.
**Required:** one canonical set, or remove the section. Per `CLAUDE.md` §2 these
cannot be published, and client preference does not clear this without written
confirmation of the figures.

## Major (2)

**M1 · "Trusted By" implies endorsement that does not exist.**
`home/page.tsx:153-178` — label is "Trusted By", contents are React/Next/TS/Tailwind.
**Fix supplied:** relabel to "Built with". One word.

**M2 · Four of five portfolio entries are unverified.**
Stock imagery plus claims of "Europe's premier festival" and "the North American
market". Traul is the only entry with its own asset and specific scope.
**Fix supplied:** show Traul alone pending confirmation.

## Minor (2)

**m1 · "© Made By Softexedge"** reads as a credit line left on a client's site.
Fix supplied.
**m2 · Brand casing** inconsistent — `Softexedge` ×5, `SoftEXedge` ×1.

## Notes (1)

**n1 ·** Positioning is provisional — no client interview, no competitor research, no
audience research. The homepage copy inherits that status. A single conversation with
the client could invalidate the position, and the copy would need re-derivation rather
than editing.

---

## Fact verification

| Claim in the new copy | Source | Verified |
|---|---|---|
| Offers build + marketing services | 8 live routes in `src/app/` | ✅ Structural |
| "One team, no handoff" | Mechanism statement about company structure | ⚠️ `[[NEEDS]]` — stated as arrangement, not result |
| Traul: 3 apps, dispatch, geofencing, B2B billing | Client's own site copy | ⚠️ `[[NEEDS]]` — hedged in the draft |
| "A fraction of the running cost" | Deliberately qualitative pending the figure | ✅ Safe as written |
| **Any statistic** | — | ✅ **None used** |

**No number appears anywhere in the new homepage copy.** That is the correct outcome
for a project with one confirmed fact, and it is the single clearest signal of how
much the client's evidence gap is costing them.

## Swap Test

| Line | Survives swap? | Verdict |
|---|---|---|
| "We Build Digital Businesses / not just websites" | ❌ Fails for build-only and marketing-only shops | ✅ Pass |
| "We build the product and the demand that fills it" | ❌ Fails for both specialist types | ✅ Pass |
| "We cover both halves" | ❌ Fails | ✅ Pass |
| "We're not the deepest specialist in any one of these" | ❌ No competitor would write this | ✅ **Strongest line on the page** |
| "Tell us what you're trying to build" | ⚠️ Survives — but it is a functional CTA, not a positioning line | Acceptable |

## Banned phrases

None in the new copy. Verified against `banned-phrases.md` including the §8 pattern
rules — no triads, no rhetorical-question openers, no "not just X but Y" construction,
no exclamation marks.

Removed from the existing page by this pass: "cinematic", "immersive", "unforgettable",
"crafted for impact", "Innovate. Build. Scale.", "seamless", "photorealism at scale",
"Trusted by 27,000+ creators".

## The six questions

| # | Question | Answer |
|---|---|---|
| 1 | Could this describe another company? | No — the both-halves claim and the trade-off paragraph are specific |
| 2 | Does every paragraph have one purpose? | Yes; sections without a purpose were removed rather than rewritten |
| 3 | Does every claim have evidence? | Yes — every unevidenced claim was cut or marked `[[NEEDS]]` |
| 4 | Can this be shorter? | It already is — the page loses roughly a third |
| 5 | Can this be clearer? | Yes, once real numbers replace the markers |
| 6 | Would a creative director approve? | **The copy, yes. The page, not while B1–B4 stand.** |

## Open NEEDS — 11

Full table in `copy/home.md`. Ranked by value:

1. **Where does the contact form submit?** — the site converts to nothing without it
2. **Canonical stat set** — unblocks the most persuasive section on the page
3. **Traul confirmation + naming permission** — unlocks the flagship proof *and* a
   stronger position ("cheaper than incumbent vendors")
4. Real location, phone, canonical email
5. Two real testimonials
6. Which portfolio projects are real
7. Price shape · response-time promise · brand casing

---

## What ships today without any client input

Three changes are safe, honest, and need nothing from anyone:

1. Relabel "Trusted By" → "Built with"
2. Remove the fabricated testimonials
3. Regroup services into Build / Grow, and add the trade-off paragraph

Everything else waits on the client, or on a developer wiring two forms.
