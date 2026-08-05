---
page:         /home
job:          Establish the both-halves position and route to a single enquiry
reader:       Founder or operator who needs a product built and customers arriving
awareness:    Solution-aware (knows they need an agency, comparing)
lead message: #1 — build and growth from one team
proof used:   Structural (service range). No statistics — none are confirmed.
CTA:          Tell us what you're building
open NEEDS:   11
---

# Homepage copy — SoftexEdge

**Read this first.** The dominant recommendation is that the homepage gets *shorter*.
Three sections currently carry content that cannot be published honestly — the stats
band, the testimonials, and four of five portfolio entries. Copy cannot fix them;
only the client can, by supplying real figures. Until then they should come off the
page rather than ship as fabrications.

A shorter honest homepage outperforms a longer one the reader stops believing.

---

## 1. Hero — `home/Herosection.tsx` ✅ current

Rewritten earlier today. No change.

> **Brand. Build. Grow.** *(mobile tag)*
> # We Build Digital Businesses
> not just websites

Still correct against the agreed position. The line does the positioning work: it
claims the outcome (a business) rather than the artefact (a website), and the
qualifier names the category's default.

---

## 2. "Trusted By" strip — `home/page.tsx:153-178` ⚠️ **relabel**

The label says "Trusted By". The logos are React, Next.js, TypeScript and Tailwind —
your own stack. React does not trust you, and a technical buyer reads this as a
company with no clients to show.

**One-word fix:**

> ~~Trusted By~~ → **Built with**

Honest, still useful, costs nothing. If real client logos arrive later, add a genuine
"Trusted by" strip beneath it.

---

## 3. About block — `home/AboutSection.tsx` ✅ current

Rewritten earlier today. No change.

> ### We build **the product** and the demand that fills it, for [founders]
>
> Most agencies hand over a design file and wish you luck. We stay on it — the brand,
> the build, the launch, and the marketing that follows — so one team is accountable
> when the numbers come in.

---

## 4. Portfolio — `home/PortfolioSection.tsx` ⚠️ **cut to one, pending confirmation**

Five projects listed. One (Traul) has its own asset, specific technical scope and a
hard number. Four use stock imagery and claim European festivals and North American
markets.

**Recommendation:** show Traul alone until the others are confirmed. One real project
beats five where the reader cannot tell which are real — and if a prospect recognises
a stock photo, they discount all five.

**Traul card, rewritten:**

> **LOGISTICS · 2024**
> # Traul
> We rebuilt an on-demand logistics platform from scratch — the admin portal, the
> driver app and the customer app — with live dispatch, geofencing and B2B billing.
> It replaced a vendor system at a fraction of the running cost.
>
> `[[NEEDS: confirm the ~75% figure and written permission to publish it. With the
> number this becomes the strongest asset on the site; without it, the sentence stays
> qualitative as written above.]]`
>
> React Native · Node.js · Geofencing · Payments

**Note the hedge.** "A fraction of the running cost" is what can be said without the
confirmed figure. It is deliberately weaker than the current copy, which states 75%
as fact.

`[[NEEDS: are Finova Dashboard, Lumina Festival, Nova Workspace and Zephyr Mobility
real client engagements? If yes, each needs a metric and permission. If no, remove.]]`

---

## 5. Stats band — `home/StatsSection.tsx` 🔴 **remove from the homepage**

Currently: *16 Years of Vision · 85 Brands Directed · 500 Creative Deployments ·
18 Different Sectors.*

Your service pages simultaneously claim 10 years, 250 projects and 50 team members.
Two clicks apart. A prospect who notices stops believing everything else on the site —
including the things that are true.

**No copy can be written for this section.** Every available number is contradicted by
another number on the same site.

`[[NEEDS: one canonical set — actual years trading, actual projects delivered, actual
headcount. Then this section returns, and it will be strong.]]`

**Interim:** remove the band. The page reads fine without it — the section currently
occupies four full screens of scroll to deliver four disputed figures.

---

## 6. Services — `home/ServiceSection.tsx` ⚠️ **regroup**

Eight services listed flat as equals. That reads as a menu, and a menu invites the
objection *"they do everything, so probably nothing well."*

**Group them into the two halves.** The grouping *is* the positioning argument — it
shows the combination instead of claiming it.

> **WHAT WE DO**
> # We cover both halves
> Most companies hire one agency to build the thing and another to market it, then
> spend their time refereeing between the two. We do both.
>
> **BUILD**
> Web Development · App Development · Custom Software & SaaS · UI/UX Design
>
> **GROW**
> Brand Strategy & Identity · Digital Marketing · AI & Marketing Automation · Video Production

**Then, immediately after — the objection this creates:**

> **We're not the deepest specialist in any one of these.** A brand consultancy will
> out-think us on brand alone; a performance shop will out-optimise us on ads alone.
> We're the right call when the handoff between the two is where your projects
> actually die.

That paragraph will feel uncomfortable to publish. It is the highest-trust element
available on the page, because it is the only line no competitor would write.

---

## 7. Testimonials — `home/ExperimentalTestimonials.tsx` 🔴 **remove**

Four testimonials. All four quotes end mid-sentence ("…our design system", "We were
struggling "). Two attributed to job titles — "Lead Product Designer", "Sr. Backend
Engineer" — that describe employees, not clients who would testify about an agency.

**These are fabricated and visibly broken.** They cannot be edited into shape.

`[[NEEDS: two real testimonials. Ask past clients exactly two questions —
"What were you worried about before you hired us?" and "What specifically changed?"
Those two produce usable quotes; "any feedback?" produces "great to work with".]]`

**Interim:** remove the section. An empty space is neutral; a fake testimonial that
gets noticed is fatal.

---

## 8. Contact — `home/ContactSection.tsx` 🔴 **blocker, then rewrite**

Two problems, one of which no copy can fix.

**The blocker:** the form has no `onSubmit` and no `action` (line 147). Every enquiry
is discarded. Fix this before any copy change — it is worth more than the entire rest
of this document.

**The placeholders:** the channels array claims *Studio: San Francisco* and
`+1 (800) 123-4567`.

`[[NEEDS: real location and a phone number that rings]]`
`[[NEEDS: canonical email — the site says hello@softexedge.com, your own address is
on softexedge.in. Pick one.]]`

**Copy, once the form works:**

> # Let's build [the future →your vision →together]
>
> Tell us what you're trying to build. If we're not the right fit we'll say so on the
> first call rather than three weeks in.
>
> **[ Send the brief ]**
>
> *Four questions, about two minutes. You'll get a reply within one working day —
> no call unless you want one.*
>
> `[[NEEDS: confirm the response-time promise before publishing it. Only publish a
> number you will actually hit.]]`

The italic reassurance line is the highest-value sentence in this document. It
converts an unknown into a known, and it is currently absent from every CTA on the site.

---

## 9. Blog — `home/BlogSection.tsx` — no change

Structure is fine. Out of scope for a homepage copy pass.

---

## 10. Footer — `layout/Footer.tsx` ⚠️ two fixes

**The newsletter form has no handler** (line 193). Same problem as the contact form —
it silently discards addresses. Either wire it or remove it.

**"© Made By Softexedge"** reads like the credit line you would leave on a client's
site, not your own.

> ~~© Made By Softexedge~~ → **© 2026 SoftexEdge**

Also: brand casing is `Softexedge` in five places and `SoftEXedge` in one
(`ExperimentalTestimonials.tsx:14`). Pick one and apply it everywhere.
`[[NEEDS: canonical casing — SoftexEdge, Softexedge, or SOFTEXEDGE?]]`

---

## Resulting page order

```
Hero                    ✅ current
Built with (relabelled) ⚠️ one-word fix
About                   ✅ current
Traul                   ⚠️ pending confirmation
Services — Build/Grow   ⚠️ regroup + objection paragraph
Contact                 🔴 fix form, then new copy
Blog                    — unchanged
Footer                  ⚠️ two fixes
```

Removed pending real data: the stats band, the testimonials, four portfolio entries.

**The page loses roughly a third of its length and gains all of its credibility.**

---

## Open NEEDS — 11

| # | Need | Unblocks |
|---|---|---|
| 1 | Canonical stat set (years / projects / headcount) | Stats band returns |
| 2 | Traul figure confirmed + naming permission | Flagship proof, stronger position |
| 3 | Which portfolio projects are real | Portfolio section |
| 4 | Two real testimonials | Testimonials section |
| 5 | Real studio location | Contact |
| 6 | Phone number that rings | Contact |
| 7 | Canonical email (.com or .in) | Contact, footer |
| 8 | Where the contact form submits | **Every CTA on the site** |
| 9 | Response-time promise you'll hit | Contact reassurance line |
| 10 | Price shape | Services, future service pages |
| 11 | Canonical brand casing | Repo-wide |

**Items 8 and 1 are the highest value.** Item 8 because the site currently converts to
nothing. Item 1 because it is blocking the single most persuasive section on the page.
