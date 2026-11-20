---
title: 'Cybersecurity in the Machinery Regulation: protection against corruption from January 2027'
seoTitle: 'Machinery Regulation cybersecurity requirements'
description: 'The Machinery Regulation applies from 20 January 2027: machines must resist corruption and log interventions. What 1.1.9 and 1.2.1 require, and the CRA overlap.'
date: 2026-11-20
tags:
  - machinery regulation
  - protection against corruption
  - industrial cybersecurity
  - cyber resilience act
  - cra
  - ai act
  - coo
  - cto
about:
  - name: Machinery Regulation, Regulation (EU) 2023/1230
    url: https://eur-lex.europa.eu/eli/reg/2023/1230/oj
  - name: Cyber Resilience Act, Regulation (EU) 2024/2847
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
---

**Key takeaways**

- The Machinery Regulation, (EU) 2023/1230, replaces the Machinery Directive on
  **20 January 2027**. Machinery placed on the market from that day must meet its
  requirements; earlier units stay under the Directive.
- For the first time, cybersecurity is a **safety requirement** for machinery:
  Annex III, section 1.1.9 on **protection against corruption** and section 1.2.1
  on the **safety and reliability of control systems**, including resistance to
  malicious attempts and a **tracing log kept for five years**.
- A connected machine is usually also a product with digital elements, so the
  **Cyber Resilience Act (CRA)** applies too: its reporting duty already, its
  product requirements from 11 December 2027. The two laws overlap but keep
  separate conformity assessments.
- The **AI Omnibus** moved machinery to a sectoral approach: the AI Act's
  high-risk requirements for AI in machinery will arrive through the Machinery
  Regulation itself, by delegated acts.
- Machinery cybersecurity certificates count under the CRA only for the risks
  they cover, and only until **11 June 2028**.

_Part of a series on EU product compliance for connected-product makers. For
the full calendar and who owns what, start with
[the map](/blog/compliance/eu-product-compliance-map)._

## Why this matters now

For decades, machinery safety meant guards, interlocks, emergency stops and
stability. The Machinery Regulation, adopted on 14 June 2023, adds a new kind of
hazard: someone, or something, changing the software, data or signals a machine
relies on to be safe. It applies from 20 January 2027, a date set by a
corrigendum to the original 14 January, and from that day only machinery that
meets the Regulation can be placed on the EU market.

That is less than two months away. For makers of connected industrial
equipment, it lands before the CRA applies in full, so it is the first
cybersecurity requirement many of them will meet in a conformity assessment. The exception is machines with radio modules: those have been under the RED's cybersecurity requirements since 1 August 2025.

I build connected products at Ganiga, and our industrial customers are working
through this now. I am not a lawyer; the sources are at the end.

## What sections 1.1.9 and 1.2.1 ask for

The requirements sit in Annex III, the essential health and safety
requirements. An application guide on these sections, circulated in draft by ibf solutions in October, was approved by the Machinery Expert Group on 5 November 2026 and published by the Commission. It explains them in practical terms. In summary:

| Requirement                                        | What it means                                                                                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1.1.9: connections                                 | Connecting another device, directly or through remote access, must not lead to a hazardous situation                                             |
| 1.1.9: safety-relevant hardware                    | Hardware that transmits safety-relevant signals or data must be protected against accidental or intentional corruption, and interventions recorded where relevant |
| 1.1.9: safety software and data                    | Software and data critical for safety must be identified and protected; the machine must be able to report which safety software it runs     |
| 1.1.9: evidence of intervention                    | Legitimate or illegitimate interventions in software or configuration must leave evidence                                                        |
| 1.2.1(a): control systems                          | Control systems must withstand reasonably foreseeable malicious attempts by third parties that could create a hazard                             |
| 1.2.1(f): tracing log                              | A log of interventions and of safety software versions uploaded after placing on the market, kept for five years, available to authorities on reasoned request |

The guide's examples are concrete: restrict service interfaces to authorised
people nearby; block remote access when it is not needed, and ship it disabled
by default with instructions for enabling it securely; verify signatures on
software updates; use message authentication codes or hashes for integrity,
since checksums only catch accidents; use a data diode where data only needs to
flow out; seal or check configuration set by DIP switches; and validate it all
with penetration testing.

Two points are easy to miss. "Evidence of intervention" covers legitimate
interventions too, such as a technician changing a parameter, not only attacks.
And the tracing log exists to show conformity to an authority; it is not a
general security monitoring requirement.

## How it meets the CRA

A connected machine with software, a network interface and often a cloud
service is a product with digital elements, so the CRA applies to it as well.
Both laws apply in full, with separate conformity assessment procedures,
according to the Commission's CRA FAQ as summarised by ibf solutions. CRA
recital 53 notes that the CRA's essential requirements can coexist with the
Machinery Regulation's provisions on protection against corruption and control
systems.

```tikz Where the Machinery Regulation and the CRA overlap.
% Alt: Two overlapping areas. The Machinery Regulation alone covers cyber risks that create hazards: connections that must not cause hazardous situations, evidence of interventions, and a five-year tracing log of safety software. The CRA alone covers all cybersecurity risks across the lifecycle: confidentiality, vulnerability handling, an SBOM, a support period with free security updates, and reporting of exploited vulnerabilities. The overlap covers integrity of safety software and data, access control on interfaces, and secure updates.
\begin{tikzpicture}
  \fill[fill opacity=0.06] (0,0) circle (2.15cm);
  \draw[draw opacity=0.35] (0,0) circle (2.15cm);
  \fill[accent, fill opacity=0.08] (2.6,0) circle (2.15cm);
  \draw[accent] (2.6,0) circle (2.15cm);
  \node[font=\footnotesize\bfseries] at (-0.55,1.45) {Machinery Reg.};
  \node[font=\footnotesize\bfseries, text=accent] at (3.2,1.45) {CRA};
  \node[note, text width=1.75cm, align=center] at (-0.85,-0.1) {hazards from corruption\\[2pt]evidence of interventions\\[2pt]5-year tracing log};
  \node[note, text width=1.75cm, align=center] at (3.45,-0.1) {confidentiality\\[2pt]vulnerability handling, SBOM\\[2pt]support period\\[2pt]24 h reporting};
  \node[note, text width=1.2cm, align=center] at (1.3,-0.1) {\textbf{integrity}\\[2pt]access control\\[2pt]secure updates};
\end{tikzpicture}
```

The overlap is large on the product side: integrity of software and data, access
control on interfaces, secure updates. The differences are in purpose and in
time. The Machinery Regulation looks at cybersecurity through safety: a risk
matters if it can create a hazard. The CRA looks at all cybersecurity risks,
including confidentiality, and adds a lifecycle: vulnerability handling, an SBOM,
a support period with free security updates, and reporting of actively exploited
vulnerabilities within 24 hours, which has applied since 11 September 2026.

A practical consequence: one risk assessment can cover both, if it shows each
law's requirements separately, and one EU declaration of conformity can cover
both acts under Article 28 of the CRA. The
[deep dive on one evidence base](/blog/compliance/one-evidence-base) explains
what can be merged.

## Presumption and certificates

Two mechanisms help with conformity.

**Cybersecurity certification.** According to the guide, Article 20(9) of
the Machinery Regulation presumes conformity with sections 1.1.9 and 1.2.1 for
products covered by a cybersecurity certificate or statement of conformity under
the Cybersecurity Act, Regulation (EU) 2019/881. On standards, EN 50742:2026 on protection against corruption was published on 20 November 2026. It gives a presumption of conformity only once it is cited in the Official Journal, which had not happened at the time of writing.
The IEC 62443 series is the reference most industrial teams already use.

**Certificates under the CRA.** The Commission's CRA guidance of 17 November 2026
says that certificates covering the Machinery Regulation's cybersecurity-related
requirements remain valid under the CRA for the risks they cover, but not beyond
11 June 2028, and that other cyber-safety risks must be addressed under the CRA
(points 255 to 257).

## AI in machinery: the sectoral switch

The Machinery Regulation already contains rules for safety functions based on
machine learning: safety components and embedded systems with fully or partially
self-evolving behaviour that ensure safety functions are among the categories
that need third-party conformity assessment.

The AI Omnibus, Regulation (EU) 2026/1744, in force since 27 July 2026, went
further. It moved the Machinery Regulation from Section A to Section B of the AI
Act's Annex I. Instead of applying the AI Act's high-risk requirements directly,
the Commission must adopt delegated acts that carry them into the Machinery
Regulation's own essential requirements, making it the main framework for AI that performs a safety function in a machine. The empowerment sits in the amended Machinery Regulation, and the requirements are to apply from 2 August 2028; until then, AI safety functions follow the Machinery Regulation as it stands. The
[deep dive on the AI Act in connected products](/blog/compliance/ai-act-connected-products)
covers the rest of the AI Act.

## The industry's request to postpone

In January 2026, a group of industry associations, including CECIMO and
CEMA, asked the Commission to postpone the application of the Machinery
Regulation's cybersecurity provisions and align them with the CRA, citing the
lack of state-of-the-art standards; an updated position followed in February
2026. I have not found a decision to postpone, so plan for 20 January 2027 and
check the current position before relying on a delay.

## What I would do before 20 January 2027

1. **List the machines you will place on the market** from 20 January 2027, and
   those you can still ship under the Directive before that date.
2. **Identify safety-relevant software, data and signals** for each machine, and
   where they can be corrupted.
3. **Close remote access by default** and document how customers enable it
   securely.
4. **Add evidence of intervention**: signed updates, configuration hashes, seals
   where hardware matters.
5. **Implement the tracing log** of interventions and safety software versions,
   with five-year retention.
6. **Write one risk assessment** that shows the Machinery Regulation and CRA
   requirements separately, and plan one declaration of conformity.
7. **Check self-evolving safety functions** for third-party assessment, and
   watch for the AI delegated acts.

The [CRA operating model](/blog/compliance/cra-operations) covers the CRA's
unit-by-unit transition, which works the same way as the Machinery Regulation's.

## Why I am writing this

I write these articles as research: to understand the sector and how companies
actually run compliance day to day. They are also groundwork for a product I
will probably build, to streamline how companies handle their compliance
processes. If that interests you, **[write to me](mailto:me@bernardoforcillo.com?subject=Machinery%20cybersecurity)** at
[me@bernardoforcillo.com](mailto:me@bernardoforcillo.com?subject=Machinery%20cybersecurity).

_Disclosure: I work on connected products at Ganiga. Nothing is for sale yet._

## Frequently asked questions

### When does the Machinery Regulation apply?

Regulation (EU) 2023/1230 applies from 20 January 2027, replacing the Machinery
Directive 2006/42/EC. Machinery placed on the market from that date must meet the
Regulation; machinery placed on the market before it remains under the Directive.

### What does protection against corruption mean in the Machinery Regulation?

Under Annex III, section 1.1.9, connecting another device must not create a
hazardous situation; safety-relevant hardware, software and data must be
protected against accidental or intentional corruption; the machine must be able
to identify its safety software; and interventions in software or configuration
must leave evidence.

### What is the tracing log required by section 1.2.1?

A log of data generated by interventions and of the versions of safety software
uploaded after the machine was placed on the market, kept for five years after
each upload, used only to show conformity on a reasoned request from a national
authority.

### Does the CRA apply to machinery?

Yes, when the machine is a product with digital elements, which most connected
machines are. Both laws apply, with separate conformity assessment procedures.
The CRA's reporting duty has applied since 11 September 2026; its product
requirements apply to units placed on the market from 11 December 2027.

### How does the AI Omnibus affect AI in machinery?

It moved the Machinery Regulation from Section A to Section B of the AI Act's
Annex I. The Commission will carry the AI Act's high-risk requirements into the
Machinery Regulation through delegated acts, so AI that performs safety functions
in machinery will be regulated mainly through the Machinery Regulation.

### Has the Machinery Regulation's cybersecurity requirement been postponed?

Industry associations asked for a postponement in January 2026. I have not found
a decision to postpone; the application date remains 20 January 2027 unless the
Commission and co-legislators change it.

## Read next

- [The map: EU product compliance 2026–2028](/blog/compliance/eu-product-compliance-map),
  every law, date and owner on one page.
- [The AI Act in connected products](/blog/compliance/ai-act-connected-products),
  for AI outside machinery.
- [One product, many laws: one evidence base](/blog/compliance/one-evidence-base),
  for running the Machinery Regulation and the CRA as one file.
- [Important or critical? Classifying products under the CRA](/blog/compliance/cra-product-classification),
  for the CRA conformity route of a machine.

## References

Checked on 20 November 2026. EUR-Lex texts and the Commission's guidance are
primary sources; the rest are secondary.

- [_Regulation (EU) 2023/1230, Machinery Regulation_](https://eur-lex.europa.eu/eli/reg/2023/1230/oj),
  EUR-Lex. Article 20; Annex I; Annex III, sections 1.1.9 and 1.2.1.
- [_Regulation (EU) 2024/2847, Cyber Resilience Act_](https://eur-lex.europa.eu/eli/reg/2024/2847/oj),
  EUR-Lex. Articles 14, 28, 69; recital 53.
- European Commission,
  [_Commission guidance on the application of Regulation (EU) 2024/2847, C/2026/6013_](https://eur-lex.europa.eu/eli/C/2026/6013),
  Adopted on 27 July 2026 as C(2026) 5252; published in the Official Journal on 17 November 2026. Points 247–257.
- ibf solutions,
  [_Guide to application of the Machinery Regulation, Annex III 1.1.9 and 1.2.1: protection against corruption_](https://www.ibf-solutions.com/fileadmin/dateidownloads/draft-mr-protection-aginst-corruption.pdf),
    draft of 18 October 2026; approved by the Machinery Expert Group on 5 November 2026.
- ibf solutions,
  [_FAQs on the CRA: implications for mechanical engineering companies_](https://www.ibf-solutions.com/en/news-and-knowledge/technical-papers-and-news-on-ce-marking/faqs-on-the-cra-implications-for-mechanical-engineering-companies).
- UL,
  [_Navigating the new EU Machinery Regulation (EU) 2023/1230_](https://www.ul.com/resources/navigating-new-eu-machinery-regulation-eu-20231230).
- KAN,
  [_Combating vulnerabilities with standards: new EU cybersecurity rules_](https://www.kan.de/en/publications/kanbrief/2025/2-25/combating-vulnerabilities-with-standards-new-eu-cybersecurity-rules).
- CECIMO,
  [_Joint industry call on cybersecurity and Machinery Regulation_](https://www.cecimo.eu/news/joint-industry-call-on-cybersecurity-and-machinery-regulation/),
  20 January 2026.
- EU AI Act reference,
  [_Regulation (EU) 2026/1744, Articles 2 and 3: sectoral amendments_](https://www.euaiact.com/digital-omnibus-ai/sectoral-amendments).
- Eurogip,
  [_Machinery Regulation 2023/1230: what the Digital Omnibus on AI changes_](https://eurogip.fr/en/machinery-regulation-2023-1230-what-the-digital-omnibus-on-ai-changes/).
- Ecorpit,
  [_EU Machinery Regulation 2027: cybersecurity and AI rules from 20 January_](https://ecorpit.com/eu-machinery-regulation-cybersecurity-ai-2027/).
  The corrigendum moving the date.
