# Design Brainstorm: UK Business Bank Account Comparison Website

## Context
A professional comparison website for UK business bank accounts. Must feel authoritative, trustworthy, and easy to navigate. Target audience: UK business owners (sole traders, contractors, limited companies, startups).

---

<response>
<text>

## Idea 1: "Financial Clarity" — Editorial Fintech

**Design Movement:** Editorial Fintech / Bloomberg-meets-Which?

**Core Principles:**
- Data-first layout: tables and comparison grids are the hero
- High information density with clear visual hierarchy
- Trust through restraint — no flashy gradients, just precise typography
- Scannable at a glance, readable in depth

**Color Philosophy:**
Deep navy (#0f1f3d) as primary authority colour, with a sharp teal accent (#00b4a6) for CTAs and highlights. Off-white (#f8f9fc) background. This palette signals financial authority without feeling like a bank's own marketing.

**Layout Paradigm:**
Left-anchored sidebar navigation for category filters on desktop; full-width comparison table as the centrepiece. Review pages use a two-column layout: main content left, sticky sidebar right with key facts.

**Signature Elements:**
- Thin horizontal rule dividers between sections
- Monospaced font for pricing/fee data
- Colour-coded suitability badges (sole trader / limited company / contractor)

**Interaction Philosophy:**
Filters animate in/out smoothly; table rows highlight on hover. No unnecessary modals.

**Animation:**
Subtle fade-in on page load; filter transitions with 200ms ease; no parallax or heavy motion.

**Typography System:**
Display: "Sora" (bold, geometric) for headings
Body: "Source Serif 4" for long-form review text
Data: "JetBrains Mono" for fee tables

</text>
<probability>0.08</probability>
</response>

<response>
<text>

## Idea 2: "Modern Clarity" — Clean Professional Comparison

**Design Movement:** Modern SaaS / NerdWallet-inspired professional comparison

**Core Principles:**
- Clean white canvas with strong typographic hierarchy
- Comparison cards as the primary UI pattern
- Trust signals woven throughout (editorial badges, last-updated dates)
- Mobile-first with excellent responsive tables

**Color Philosophy:**
Slate-900 (#0f172a) for text authority, a vibrant blue (#2563eb) as the primary action colour, and a warm amber (#f59e0b) for star ratings and highlights. Clean white backgrounds with subtle slate-50 section breaks.

**Layout Paradigm:**
Full-width hero with search/filter bar, then a card-grid comparison below. Category pages use a two-column layout with sticky filter sidebar. Review pages are long-form editorial with a sticky "key facts" box.

**Signature Elements:**
- "Best for" badges on each bank card
- Star rating component with half-star precision
- Expandable feature rows in comparison table

**Interaction Philosophy:**
Filter chips animate; cards have a subtle lift on hover; CTA buttons pulse gently.

**Animation:**
Cards fade-up on scroll; filter transitions 150ms; skeleton loading states.

**Typography System:**
Display: "Plus Jakarta Sans" (modern, professional)
Body: "Inter" for UI elements, "Lora" for long-form review prose
Data: tabular-nums for all fee/pricing

</text>
<probability>0.07</probability>
</response>

<response>
<text>

## Idea 3: "Authoritative Broadsheet" — British Editorial

**Design Movement:** British Financial Press / The Times meets MoneySavingExpert

**Core Principles:**
- Newspaper-inspired column layouts for review pages
- Strong masthead identity with editorial credibility
- Data tables styled like financial press tables
- Warm, readable, authoritative

**Color Philosophy:**
Racing green (#1a3a2a) as the brand anchor — evoking British financial tradition. Cream (#faf8f3) background for warmth. Gold (#c9a84c) for premium/featured highlights. Deep charcoal (#1c1c1e) for body text.

**Layout Paradigm:**
Masthead-style header with category navigation below. Homepage uses a broadsheet grid: featured comparison table spans full width, with a sidebar of "Editor's Picks" and "Latest Guides." Review pages use a classic three-column newspaper layout.

**Signature Elements:**
- Thick top border in racing green on all cards (like a newspaper section header)
- "Editor's Choice" ribbon on top-rated accounts
- Pull-quote styling for key facts in reviews

**Interaction Philosophy:**
Understated hover states; no animations on data — only on navigation. Feels like a premium publication.

**Animation:**
Minimal — only navigation transitions and accordion open/close. Respects the editorial feel.

**Typography System:**
Display: "Playfair Display" (serif authority) for headings
Body: "Libre Baskerville" for review text
UI: "DM Sans" for navigation, labels, and data

</text>
<probability>0.06</probability>
</response>

---

## Selected Approach: **Idea 3 — "Authoritative Broadsheet"**

This approach best fits the UK audience and the nature of the content. The British editorial aesthetic signals trustworthiness and expertise — exactly what someone choosing a business bank account needs to feel. The racing green / cream / gold palette is distinctive and avoids the generic blue-fintech look that every comparison site uses.

### Key Implementation Notes:
- Font: Playfair Display (headings) + DM Sans (UI) + Libre Baskerville (review prose)
- Primary: Racing green oklch(0.25 0.08 155)
- Accent: Gold oklch(0.75 0.12 85)
- Background: Cream oklch(0.98 0.01 85)
- Cards: White with thick green top border
- Badges: Green (featured), amber (best value), slate (standard)
