---
title: "Model Progress Research"
layout: "standard"
heroImage: "/images/media/modules/generated/era-7-foundation-models.webp"
seo:
  title: "Model Progress Research"
  description: "A faculty-facing handout on 2023–2026 benchmark progress, rate analysis, saturation-aware projections, and the 2026 cross-check."
---

## What the 2023–2026 benchmark record actually shows

The benchmark record matters because it clarifies what has changed between
2023 and 2026. The point is not to claim a single magical AI curve — it is
to show that several important capability and cost signals are now moving
together, and to reason honestly about where that does and does not translate
into institutional autonomy.

```source-line
benchmarksLocal, mythosCard, sweBenchVerified
```

## Executive Summary

- **Reasoning benchmarks** (GPQA, ARC-AGI, MATH) have moved from well-below
  human expert to at-or-above expert in three years.
- **Coding and software-engineering** (SWE-bench Verified, HumanEval) have
  moved from under 10% to 70%+ on the Verified leaderboard in the same window.
- **Agentic task execution** (WebArena, OSWorld, long-horizon tool use) has
  moved from brittle prototype to reliably productized in 2025–26.
- **Cost efficiency** per unit of capability has fallen by roughly an order
  of magnitude.
- Several benchmarks are now **saturating**, which is itself a
  methodological issue — the benchmark record needs fresh, harder
  evaluations to stay informative.

## The Frontier AI Intensity Index

The chart below is the site's normalized composite — a four-family
weighted view of the same underlying signals (capability 40%, scaling
inputs 25%, economics 20%, deployment 15%). It tracks frontier AI
acceleration; it is not a metaphysical scalar of intelligence.

```faii
```

## Benchmark Set And Comparability

The benchmarks this site tracks are intentionally cross-domain:

- **Reasoning / knowledge:** GPQA, MATH, ARC-AGI
- **Coding / SE:** SWE-bench Verified, HumanEval, LiveCodeBench
- **Agentic:** WebArena, OSWorld, GAIA
- **Safety / governance:** the published evaluations in the Anthropic
  Mythos system card §6.3

No single benchmark proves generality. Movement across all four families at
once is the signal worth taking seriously.

## The benchmark frontier, split in three

The 2023–2026 record does not describe a single curve. It describes three
distinct regimes, each with different implications for what remains hard:

- **Saturating micro-benchmarks.** HumanEval and MMLU rose fast, then
  crowded the ceiling. HumanEval 67.0 → 93.7. MMLU 86.4 → 93.4. Frontier
  labs increasingly drop them from headline reporting because there is
  no discriminative headroom left.
- **Agentic software engineering.** SWE-bench variants rose even faster
  than the older coding micro-benchmarks, but the rise came with
  contamination risk, harness dependence, and active benchmark revision.
  SWE-bench Verified 33.2 → 93.9 in under two years. Anthropic reports
  SWE-bench Pro (harder, contamination-resistant) at 77.8%.
- **Harder reasoning benchmarks.** GPQA Diamond and MMMU still show real
  headroom, but the public frontier is climbing fast enough that the
  same saturation story is starting. GPQA 39 → 94.5. MMMU 68.3 → 84.2.
  USAMO 2026 (post-training-cutoff) 97.6% on Anthropic's own test.

## Normalized rates, not raw scores

Raw benchmark scores are hard to compare across starting points. Three
normalized measures — absolute points per year, failure-rate reduction,
and multiplicative gain — make the relative speed visible.

| Benchmark | Pts/yr | Failure-rate reduction | Multiplicative gain |
|---|---:|---:|---:|
| SWE-bench original | ~32.6 | 77.4% | 39.7× |
| **SWE-bench Verified** | **~36.4** | **90.9%** | 2.83× |
| **GPQA Diamond** | ~22.9 | **91.0%** | 2.42× |
| HumanEval | ~16.9 | 80.9% | 1.40× |
| MMMU | ~13.8 | 50.2% | 1.23× |
| MMLU | ~2.9 | 51.5% | 1.08× |

> The strongest evidence of capability advance is not that one benchmark
> hit 90. It is that three benchmarks testing different kinds of useful
> work all reduced their failure rate by ~90% at the same time.

## Rate Analysis — Worked Examples

**SWE-bench Verified.** Between 2023-11 (first strong agents scoring
~4–6%) and 2026-02 (~74% on Verified), the benchmark has shown
approximately an order-of-magnitude improvement in headline score per
roughly eighteen-month doubling window. Headline scores overstate
practical reliability; the Verified subset tightened the evaluation,
and most of the improvement is from better scaffolding and tool use,
not raw model capability.

**GPQA.** Expert-level science questions: under 40% in late 2023, above 80% by
early 2026. GPQA is closer to saturation than SWE-bench, so headroom is
shrinking and the rate is naturally leveling.

## Saturation-Aware Projections

Projecting saturating benchmarks forward linearly is a methodological error.
The more informative questions for curriculum design are:

- Which benchmarks are near ceiling, and what replaces them?
- Where does headline benchmark success decouple from downstream
  production reliability?
- Which capability families still have clear headroom (long-horizon
  agentic, open-ended tool use, multi-day execution)?

These are the questions the [FAII](#the-frontier-ai-intensity-index) chart
is designed to make legible without overclaiming.

## Cross-Domain Interpretation

- Multiple capability families are improving at the same time.
- The floor for useful system behavior is falling fast.
- The ceiling for unsupervised deployment is still constrained by
  evaluation, oversight, and context.
- Value is moving toward the people who can design and govern the system
  around the model.

That is exactly where an Enterprise AI degree becomes defensible.

## 2026 Cross-Check — Anthropic Mythos System Card

The Claude Mythos Preview System Card (Anthropic, April 7, 2026) publishes
its own benchmark table in §6.3. It is the strongest independent confirmation
of the rate analysis above:

- frontier reasoning and coding now approach or exceed human-expert
  baselines on most tasks tested
- the model demonstrates dramatic reductions in misuse cooperation and
  deception vs. prior generations (§4.1.3)
- the same model also demonstrates evaluation awareness in roughly 29%
  of tested contexts, meaning headline scores must be read alongside
  the evaluation-awareness number

That last point is the reason this handout does not lead with a single
headline number.

## Three scenarios for 2030–2031

An honest reading of the 2023–2026 record does not support a single
forecast. It supports a small set of scenarios that a curriculum has to be
ready for. These are the three BSEAI treats as planning anchors — not
predictions, but envelopes the program has to remain credible inside.

### Scenario A — Saturation and integration

Frontier benchmark scores plateau. Headline capability improvements slow
as the cheap wins of scaffolding, tool use, and mid-training get spent.
Value moves almost entirely to the layer around the model: evaluation,
retrieval, integration, runtime monitoring, incident response, and
institutional context.

- Enterprise AI work looks like reliability engineering for probabilistic
  components.
- The bottleneck is people who can design the evaluation set, own the
  deployment, and defend the release evidence.
- The BSEAI studio spine is, by design, aimed at exactly this layer.

### Scenario B — Steady capability lift

Long-horizon, multi-day, ambiguous tasks continue to improve at something
like the current rate. Models do more of the work inside a given role,
but still require humans for scope definition, judgment calls,
stakeholder translation, and accountability for outcomes.

- The Forward-Deployed Engineer role family becomes the dominant
  archetype in applied AI work (it is already the fastest-growing title
  family in LinkedIn's January 2026 Labor Market Report).
- Graduate value concentrates in people who can embed with a business,
  specify the system, evaluate it against intent, and own the rollout.
- BSEAI trains that role by name across IS 265 / IS 390 / IS 425.

### Scenario C — Discontinuous jump

A general, self-managing system appears meaningfully earlier than base
rates suggest. Capability questions become less interesting than
institutional ones: who is authorized to let it act, on what scope, with
what evidence, and with what recourse when it drifts?

- The whole institutional surface — governance, evaluation, release
  evidence, human oversight, incident response, and legal accountability —
  becomes the job.
- The curriculum's drift, runtime, and governance modules move from
  supporting content to the center of the degree.
- BSEAI already treats that surface as core, not appendix — because the
  April 2026 Mythos system card already made it the real frontier.

### Why three, not one

Under all three scenarios, the graduates who can specify, evaluate,
deploy, and govern AI inside real organizations are the ones still
getting paid. The degree is defensible across the envelope — not by
betting on one forecast, but by training the work that every plausible
forecast still depends on.

```source-line
benchmarksLocal, mythosCard, aiIndex2025, graceHLMI2023, linkedinLabor2026, assistantInterpretation
```

## How We Talk About Timelines

Frontier capability is accelerating and concentrating in a small set of labs.
Timelines for "general" capability remain uncertain and are treated on this
site as scenario language, not settled evidence. The public anchor this site
uses is Grace et al. 2023 — median 50% HLMI estimate = **2047**, far later
than the most aggressive commercial narratives. See
[doctrine/01-realistic-optimism](/how-this-was-made) for the site-wide rule.

## Why This Matters To Faculty

If the evidence shows the tools are getting more capable, cheaper, and easier
to deploy, then the institution has to respond by educating students for the
layer above raw model access. That layer is where NJIT can be credible.

```cta
[Return to the presentation](/)
[Read Why BSEAI](/why-bseai)
[Read the frontier alignment evidence](/frontier-alignment-evidence)
```

```source-line
benchmarksLocal, mythosCard, sweBenchVerified, aiIndex2025, graceHLMI2023
```
