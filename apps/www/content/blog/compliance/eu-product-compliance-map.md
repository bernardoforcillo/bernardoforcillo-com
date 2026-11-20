---
title: 'EU product compliance 2026–2028: the map for connected-product makers'
seoTitle: 'EU product compliance map 2026–2028'
description: 'Eight EU laws now reach connected hardware and software. When each applies, who owns it and how the CRA links them, with dates checked on 20 November 2026.'
date: 2026-11-20
tags:
  - cyber resilience act
  - cra
  - product liability directive
  - data act
  - ai act
  - nis2
  - machinery regulation
  - product compliance
  - connected products
about:
  - name: Cyber Resilience Act, Regulation (EU) 2024/2847
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
  - name: Product Liability Directive, Directive (EU) 2024/2853
    url: https://eur-lex.europa.eu/eli/dir/2024/2853/oj
  - name: Data Act, Regulation (EU) 2023/2854
    url: https://eur-lex.europa.eu/eli/reg/2023/2854/oj
  - name: Artificial Intelligence Act, Regulation (EU) 2024/1689
    url: https://eur-lex.europa.eu/eli/reg/2024/1689/oj
  - name: Machinery Regulation, Regulation (EU) 2023/1230
    url: https://eur-lex.europa.eu/eli/reg/2023/1230/oj
  - name: NIS2 Directive, Directive (EU) 2022/2555
    url: https://eur-lex.europa.eu/eli/dir/2022/2555/oj
---

**Key takeaways**

- Between December 2024 and August 2028, eight EU laws reach a connected
  product: the General Product Safety Regulation, the RED cybersecurity
  delegated act, the Data Act, the Cyber Resilience Act (CRA), the new Product
  Liability Directive (PLD), the Machinery Regulation, the AI Act and NIS2, through your customers or directly if you are a medium-sized or larger manufacturer in its sectors.
- Three already bite today: CRA vulnerability reporting (since **11 September
  2026**), Data Act access by design (for products placed on the market after
  **12 September 2026**) and the RED cybersecurity requirements (since **1
  August 2025**).
- The PLD follows in weeks: products placed on the market after **8 December
  2026** fall under strict liability that treats software as a product.
- **11 December 2027** is the pivot: the CRA applies in full, its penalties
  apply, and the RED cybersecurity delegated act is repealed.
- The laws answer four different questions: can you sell the product, who pays
  when it hurts someone, who controls its data, and can your customers buy it.
  The same evidence feeds all four; the conclusions mostly do not transfer.

_This is the map for a series of deep dives on EU product compliance for
connected-product makers, one per leadership role and one per law that meets
the CRA. Every article links back here._

## Why one map instead of eight checklists

A connected product is a piece of hardware, its firmware, a mobile app and a
cloud back end. Until recently, the EU regulated it mostly as hardware: safety,
radio, electromagnetic compatibility. Since 2024, a wave of laws has started to
regulate the rest: the software, the data it produces, the updates it receives
and the damage it can cause.

Each of those laws comes with its own checklist, its own authority and, often,
its own consultant. The trouble is that they land on the same product and on
the same small leadership team. The CISO hears about the CRA, the CTO about the
Data Act, the CFO about fines, the COO about distributors, and nobody holds the
whole picture.

I build connected products at Ganiga, and every law in this article lands on
ours. This map is what I wish someone had handed me: one calendar, one view of
who owns what, and the places where the laws connect. Each section links to a
deep dive for the role or the law in question. I am not a lawyer; the sources for every section are listed at the end.

## The calendar

The dates below were checked on 20 November 2026. "Placed on the market" means
the first time a given unit is supplied for distribution or use in the EU; for
most of these laws, that happens unit by unit, not once per model.

```tikz Eight laws, one calendar: when each rule reaches a connected product.
% Alt: A vertical timeline. Past milestones: on 13 December 2024 the General Product Safety Regulation makes cybersecurity part of product safety; on 1 August 2025 the RED cybersecurity delegated act applies to radio products, with the EN 18031 standards; on 12 September 2025 the Data Act gives users rights to their product data; on 11 and 12 September 2026 CRA vulnerability reporting starts and Data Act access by design applies to new products. Today is 20 November 2026. Future milestones: on 9 December 2026 the new Product Liability Directive treats software as a product; on 20 January 2027 the Machinery Regulation applies; on 2 December 2027 the AI Act's stand-alone high-risk rules apply; on 11 December 2027 the CRA applies in full and the RED delegated act is repealed; on 2 August 2028 the AI Act applies to high-risk AI in regulated products.
\begin{tikzpicture}[milestone/.style={anchor=west, align=left, inner sep=0pt}]
  \draw[line width=1.6pt, draw opacity=0.15] (0,0) -- (0,-10);
  \draw[line width=1.6pt, accent] (0,0) -- (0,-4.4);
  \foreach \y in {0,-1.1,-2.2,-3.3}{\fill[accent] (0,\y) circle (3pt);}
  \foreach \y in {-5.5,-6.6,-7.7,-8.8,-9.9}{\fill[fill opacity=0.35] (0,\y) circle (3pt);}
  \fill[accent, fill opacity=0.2] (0,-4.4) circle (8pt);
  \fill[accent] (0,-4.4) circle (4pt);
  \node[milestone] at (0.5,0) {{\small\bfseries 13 Dec 2024}\\[1pt]{\footnotesize GPSR: cybersecurity is part of safety}};
  \node[milestone] at (0.5,-1.1) {{\small\bfseries 1 Aug 2025}\\[1pt]{\footnotesize RED delegated act and EN 18031}};
  \node[milestone] at (0.5,-2.2) {{\small\bfseries 12 Sep 2025}\\[1pt]{\footnotesize Data Act: users' rights to product data}};
  \node[milestone] at (0.5,-3.3) {{\small\bfseries 11--12 Sep 2026}\\[1pt]{\footnotesize CRA reporting; Data Act access by design}};
  \node[tag, anchor=west] at (0.5,-4.4) {TODAY, 20 NOV 2026};
  \node[milestone] at (0.5,-5.5) {{\small\bfseries 9 Dec 2026}\\[1pt]{\footnotesize New PLD: software is a product}};
  \node[milestone] at (0.5,-6.6) {{\small\bfseries 20 Jan 2027}\\[1pt]{\footnotesize Machinery Regulation applies}};
  \node[milestone] at (0.5,-7.7) {{\small\bfseries 2 Dec 2027}\\[1pt]{\footnotesize AI Act: stand-alone high-risk rules}};
  \node[milestone] at (0.5,-8.8) {{\small\bfseries\color{accent} 11 Dec 2027}\\[1pt]{\footnotesize CRA in full; RED delegated act repealed}};
  \node[milestone] at (0.5,-9.9) {{\small\bfseries 2 Aug 2028}\\[1pt]{\footnotesize AI Act: high-risk AI inside regulated products}};
\end{tikzpicture}
```

| Law                                                            | What applies to a connected product                                                                                                    | Since or from                                                                                       |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| General Product Safety Regulation, (EU) 2023/988               | Cybersecurity features are one of the aspects used to judge whether a consumer product is safe                                           | 13 December 2024                                                                                    |
| RED cybersecurity delegated act, (EU) 2022/30                  | Network protection, personal data and fraud requirements for radio equipment; EN 18031 standards                                       | 1 August 2025; repealed from 11 December 2027 by Delegated Regulation (EU) 2026/339                 |
| Data Act, (EU) 2023/2854                                       | Users' right to the data their product generates; pre-contract information; access by design for new products                           | 12 September 2025; access by design for products placed on the market after 12 September 2026       |
| Cyber Resilience Act, (EU) 2024/2847                           | Reporting of exploited vulnerabilities and severe incidents; then Annex I, technical file, conformity assessment and CE marking        | Reporting since 11 September 2026; everything else from 11 December 2027                            |
| Product Liability Directive, (EU) 2024/2853                    | Strict liability for defective products, software included                                                                             | Products placed on the market or put into service after 8 December 2026                             |
| Machinery Regulation, (EU) 2023/1230                           | Protection against corruption and reliable control systems as safety requirements                                                       | 20 January 2027                                                                                     |
| AI Act, (EU) 2024/1689, as amended by (EU) 2026/1744           | High-risk AI obligations                                                                                                               | 2 December 2027 for stand-alone systems; 2 August 2028 for AI inside regulated products              |
| NIS2, (EU) 2022/2555, Italy: D.Lgs. 138/2024                   | Your customers' supply-chain duties, passed to you as questionnaires and clauses; a direct duty for medium-sized and larger makers of electronics, electrical equipment, machinery and vehicles (Annex II) | In Italy, basic measures due by 31 October 2026 for entities listed in 2025; by 31 July 2027 for 2026 entrants |

Two details in that table are easy to miss.

**The PLD date moved by a day.** The directive originally said it applied to
products placed on the market after 9 December 2026. A corrigendum published in the Official Journal on 7 May 2026 changed this to after 8 December 2026; the transposition deadline
is still 9 December 2026. In practice: anything you ship from 9 December is
under the new regime.

**Access by design is not retroactive.** The Data Act's design obligation
applies to connected products placed on the market after 12 September 2026, so
products already on the market do not have to be retrofitted. Users' rights to
request their data, on the other hand, have applied since September 2025.

## Four questions the laws answer

The fastest way I have found to stop the laws blurring together is to ask what
question each one answers. There are only four.

```tikz Four questions, four families of law.
% Alt: A connected product sits in the centre, linked to four questions. Can we sell it? answered by the CRA, the RED delegated act, the Machinery Regulation, the AI Act and the GPSR, enforced by market surveillance authorities. Who pays if it causes harm? answered by the Product Liability Directive, enforced in civil courts. Who controls its data? answered by the Data Act and the GDPR, enforced by data authorities. Can our customers buy it? answered by NIS2, through customers' supplier checks and contract clauses.
\begin{tikzpicture}[q/.style={box, text width=3.5cm, align=left, font=\footnotesize}]
  \node[hot, text width=2.1cm] (p) at (0,0) {\textbf{Your product}\\[1pt]{\scriptsize device, app, cloud}};
  \node[q, anchor=south east] (a) at (-0.35,0.95) {\textbf{Can we sell it?}\\[2pt]CRA, RED act, Machinery Reg., AI Act, GPSR\\[2pt]{\scriptsize\itshape market surveillance}};
  \node[q, anchor=south west] (b) at (0.35,0.95) {\textbf{Who pays if it harms someone?}\\[2pt]Product Liability Directive\\[2pt]{\scriptsize\itshape civil courts}};
  \node[q, anchor=north east] (c) at (-0.35,-0.95) {\textbf{Who controls its data?}\\[2pt]Data Act, GDPR\\[2pt]{\scriptsize\itshape data authorities}};
  \node[q, anchor=north west] (d) at (0.35,-0.95) {\textbf{Can our customers buy it?}\\[2pt]NIS2, through their suppliers' checks\\[2pt]{\scriptsize\itshape customers' contracts}};
  \draw[flow] (p.north west) -- (a.south east);
  \draw[flow] (p.north east) -- (b.south west);
  \draw[flow] (p.south west) -- (c.north east);
  \draw[flow] (p.south east) -- (d.north west);
\end{tikzpicture}
```

**Can we sell it?** This is market-access law. The CRA, the RED delegated act,
the Machinery Regulation, the AI Act and the GPSR decide whether a product may
be placed on the EU market and, for most of them, whether it carries a CE
marking. They are enforced by market surveillance authorities, which can fine,
order corrective action, withdraw or recall. For the CRA, start with the
[CRA field guide](/blog/security/cra-field-guide), the
[CRA engineering guide](/blog/security/cra-engineering) and
[how to classify a product](/blog/compliance/cra-product-classification). Radio
products have [their own transition from the RED](/blog/security/red-en-18031-to-cra),
machinery [its own cybersecurity rules](/blog/compliance/machinery-regulation-cybersecurity),
and AI features [their own questions](/blog/compliance/ai-act-connected-products).

**Who pays if it harms someone?** This is liability law. The new
[Product Liability Directive](/blog/compliance/product-liability-directive-software)
does not fine anyone; it decides who compensates a person whose health or property was harmed, or whose data kept for non-professional purposes was destroyed or corrupted, by a defective product. It is enforced
in civil courts, and from December 2026 it treats software as a product.

**Who controls its data?** The [Data Act](/blog/compliance/data-act-access-by-design)
gives users rights over the data a connected product generates, and from
September 2026 requires new products to be designed so users can reach that
data. The GDPR still governs any personal data in the same stream.

**Can our customers buy it?** NIS2 does not regulate your product. It regulates organisations, and it may regulate you: NIS2's Annex II covers the manufacture of computers and electronics, electrical equipment, machinery and vehicles (NACE C26 to C30), so a maker in those sectors with at least 50 staff, or more than €10 million in both turnover and balance sheet, is an important entity in its own right. It also regulates your customers, if they are essential or important entities, and requires them to manage the security of their suppliers. That reaches you as
[questionnaires and contract clauses](/blog/compliance/nis2-supplier-requirements),
and from November 2026 the Italian authority can check whether they did it.

## Who owns what

None of these laws names a job title. In a company of 20 to 250 people, though,
the work falls in fairly predictable places. This is how I would split it; the
deep dives explain each line.

| Duty                                                             | Law                         | Natural owner                    | Deep dive                                                                    |
| ---------------------------------------------------------------- | --------------------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| Deciding when you are "aware" of an exploited vulnerability     | CRA, Article 14             | CISO or product security lead    | [CRA field guide](/blog/security/cra-field-guide)                      |
| The reporting rota, supplier evidence, distributors, records    | CRA, Articles 13, 14, 19–23 | COO                              | [Running the CRA](/blog/compliance/cra-operations)                    |
| Annex I design, SBOM, update architecture, technical file       | CRA, Annex I, Article 31    | CTO                              | [Engineering for the CRA](/blog/security/cra-engineering)                    |
| Budget, support-period pricing, fines and liability exposure    | CRA, Article 64; PLD        | CFO                              | [What the CRA costs](/blog/compliance/cra-costs)                |
| Liability for defective software and missing updates            | PLD                         | CFO with legal counsel           | [Software is now a product](/blog/compliance/product-liability-directive-software) |
| User access to product data, by design                          | Data Act, Article 3         | CTO with legal or the DPO        | [Data Act meets the CRA](/blog/compliance/data-act-access-by-design)         |
| Supplier questionnaires and security clauses from customers     | NIS2, Article 21            | CISO with sales operations       | [NIS2 from the supplier's side](/blog/compliance/nis2-supplier-requirements) |

The line that most often has no owner is the support period. The CRA requires
it to be at least five years unless the product is expected to be used for less, and the end date must be stated at the time of purchase. Five years is a floor, not a default: the period has to reflect how long users can reasonably expect to use the product (point 126 of the Commission's guidance). It is an
engineering commitment, a cost that the CFO has to price and a promise that
sales makes to customers. If three people each assume another one decided it,
nobody did.

## Where the laws connect

The laws were written separately, but several of them refer to each other.
These bridges decide where one piece of work can count twice.

| From the CRA to…       | The bridge                                                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AI Act                 | Article 12 CRA: a high-risk AI product that meets Annex I is presumed to meet the AI Act's cybersecurity requirement                                                                       |
| RED delegated act      | Delegated Regulation (EU) 2026/339 repeals the RED cybersecurity act from 11 December 2027, when the CRA takes over; the EN 40000 standards build on the EN 18031 work                     |
| Machinery Regulation   | CRA recital 53: both laws apply, but meeting the CRA can help demonstrate compliance with the Machinery Regulation's protection against corruption and safety and reliability of control systems (Annex III, sections 1.1.9 and 1.2.1); the manufacturer has to show the synergy                                         |
| Product Liability      | Under the PLD, safety-relevant cybersecurity requirements are a factor in judging defectiveness, and breaching mandatory safety requirements lets a court presume a defect                 |
| NIS2                   | The CRA's support period, vulnerability contact, SBOM and declaration of conformity are exactly what NIS2 customers ask suppliers for; one incident can trigger a report under both          |
| Data Act               | The Data Act asks for data to be accessible "securely"; the access path is attack surface that the CRA's Annex I applies to                                                                |
| GDPR                   | A procedural bridge, not a presumption: market surveillance authorities cooperate with data protection authorities (Article 52(7)), and Annex I protects personal data (Part I, points 2(e) and 2(g)), but meeting it proves nothing under the GDPR. The Commission's CRA FAQ says the two laws do not overlap legally but may complement each other. Evidence can be reused; conclusions cannot |

Koerner's rule of thumb is the most useful one I have found: share
conclusions only when it is the same property, the same object and the same
responsible party; otherwise share only the evidence. In practice, that means
one description of the product's architecture, components, data flows and
update policy, kept current per release, and a separate demonstration for each
law built on top of it. The [deep dive on one evidence base](/blog/compliance/one-evidence-base)
works this through law by law.

## Italy: where national enforcement stands

The CRA, the Data Act, the AI Act and the Machinery Regulation are regulations
and apply directly, but each Member State still has to name authorities and set
penalties. The PLD and NIS2 are directives and need national law. As of 20
November 2026, the Italian picture is uneven.

- **CRA.** On 2 October 2026 the Council of Ministers gave preliminary approval
  to a draft legislative decree that names the national cybersecurity agency,
  ACN, as notifying authority and market surveillance authority, with a
  regulatory sandbox and a dedicated channel for SMEs. Parliament's committees
  had until 18 November 2026 for their opinion; final approval and publication
  are still to come.
- **PLD.** The Council of Ministers approved the transposing decree in final
  form on 28 October 2026. It rewrites articles 114 to 127 of the Consumer Code.
  The national text that counts is the one published in the Gazzetta Ufficiale.
- **AI Act.** Legislative Decree 7 October 2026, no. 179, names ACN as market
  surveillance authority and single point of contact, and AgID as notifying
  authority.
- **Data Act.** According to iSimply, none of the European delegation laws from
  2023 to 2025 included a mandate for the Data Act, and as of July 2026 no
  national authority or penalty regime had been set.
- **NIS2.** Legislative Decree 138/2024 applies, with ACN as the competent
  authority. Entities listed in 2025 had to adopt the basic security measures by
  31 October 2026; from November, ACN can verify.

If you sell in other Member States, check them too: a missing authority in one
country does not protect you in another.

## What is still moving

One thing settled this week. The Commission's guidance on applying the CRA, adopted on 27 July 2026 as C(2026) 5252, was published in the Official Journal on 17 November 2026 as C/2026/6013. It covers
placing on the market unit by unit, when a software update is a substantial
modification, how to set the support period, which cloud back ends are part of
the product, and what "aware" means for reporting. The deep dives in this series
cite it by point number.

Four things will still change the amount of work in the next twelve months.

**CRA harmonised standards.** As of 17 November 2026, no CRA harmonised
standard is cited in the Official Journal, according to the CRA Evidence
tracker. EN 40000-1-1 and EN 40000-1-2 were ratified on 2 November 2026 but are
not expected to be cited; EN 40000-1-3, on vulnerability handling, is the part expected to give a presumption of conformity first; it was still under approval as of 17 November, with a delivery deadline of 30 November 2026. On 10 November the Commission amended the standardisation request (C(2026) 7861), moving the deadlines to 30 November 2026 for the two horizontal standards due this year (risk-based design and vulnerability handling) and to 31 January 2027 for the vertical ones; the other horizontal standards remain due by 30 October 2027.

**CRA notified bodies.** The CRA's rules on notified bodies (Chapter IV) have applied since 11 June 2026, so bodies can be notified at any time. As of 6 November 2026, secondary sources reported that the Commission's NANDO database listed no notified body under the CRA, and 16 notifying authorities; check NANDO directly before you plan. For
products that need third-party assessment, that is a capacity question for
2027.

**The Digital Omnibus on data and incident reporting.** The Commission proposed
in November 2025 a single entry point for incident reports under NIS2, the
GDPR, DORA and other laws. On 21 October 2026 the Council agreed its mandate,
preferring national entry points and a 96-hour deadline for high-risk personal
data breaches. It is not adopted, and it changes nothing today.

**Machinery cybersecurity.** Industry associations asked the Commission in
January 2026 to postpone the Machinery Regulation's cybersecurity provisions
and align them with the CRA. Check the current position before planning on a
delay.

## How to read this series

Each article is a deep dive for one role or one law, written for a company that
makes connected products and sells them in the EU.

- [The CRA is already live: a field guide](/blog/security/cra-field-guide):
  the 24-hour reporting duty, the evidence the CRA asks for and a 90-day plan.
- [What the CRA costs](/blog/compliance/cra-costs): cost
  benchmarks, fines, the support period as a priced promise and funding.
- [Running the CRA: an operating model](/blog/compliance/cra-operations):
  the three clocks, the reporting rota, suppliers, distributors and the
  unit-by-unit transition.
- [Engineering for the CRA](/blog/security/cra-engineering):
  Annex I as requirements, the SBOM, update architecture and the technical file
  as a build output.
- [Software is now a product: the new Product Liability Directive](/blog/compliance/product-liability-directive-software):
  what changes on 9 December 2026 and how it links to the CRA.
- [Data Act access by design meets the CRA](/blog/compliance/data-act-access-by-design):
  one access path, two laws.
- [NIS2 from the supplier's side](/blog/compliance/nis2-supplier-requirements):
  what customers will ask, and how CRA evidence answers it.
- [Important or critical? Classifying products under the CRA](/blog/compliance/cra-product-classification):
  core functionality, conformity routes and the notified-body gap.
- [One product, many laws: one evidence base](/blog/compliance/one-evidence-base):
  what the law lets you merge across the CRA, AI Act, Data Act and GDPR.
- [From RED and EN 18031 to the CRA](/blog/security/red-en-18031-to-cra):
  what carries over for radio products.
- [The AI Act in connected products](/blog/compliance/ai-act-connected-products):
  what applies, and when, after the AI Omnibus.
- [Open source under the CRA](/blog/security/open-source-cra):
  maintainers, stewards and the companies that ship it.
- [Cybersecurity in the Machinery Regulation](/blog/compliance/machinery-regulation-cybersecurity):
  protection against corruption from January 2027.

## Why I am writing this

I write these articles as research: to understand the sector and how companies
actually run compliance day to day. They are also groundwork for a product I
will probably build, to streamline how companies handle their compliance
processes. If that interests you, **[write to me](mailto:me@bernardoforcillo.com?subject=EU%20compliance%20map)** at
[me@bernardoforcillo.com](mailto:me@bernardoforcillo.com?subject=EU%20compliance%20map).

_Disclosure: I work on connected products at Ganiga. Nothing is for sale yet._

## Frequently asked questions

### Which EU laws apply to connected products between 2026 and 2028?

For a typical connected product sold in the EU: the General Product Safety
Regulation, the RED cybersecurity delegated act for radio equipment until 11
December 2027, the Data Act, the Cyber Resilience Act, the new Product Liability
Directive, the Machinery Regulation for machinery, the AI Act if the product
contains high-risk AI, and the GDPR for personal data. NIS2 applies to many
customers and reaches makers through their supplier requirements.

### What changes on 11 December 2027?

The Cyber Resilience Act applies in full: Annex I requirements, technical
documentation, conformity assessment, CE marking and penalties. On the same day,
Delegated Regulation (EU) 2026/339 repeals the RED cybersecurity delegated act,
so radio products move to the CRA. Every unit placed on the market from that
day must comply.

### Does the new Product Liability Directive apply to software?

Yes. Directive (EU) 2024/2853 treats software and digital manufacturing files as products, and related digital services, such as a cloud back end, as components. It applies to products placed on the
market or put into service after 8 December 2026. Free and open-source software
developed or supplied outside a commercial activity is excluded.

### Is the Data Act's access-by-design rule retroactive?

No. Article 3(1) applies to connected products and related services placed on
the market after 12 September 2026. Products already on the market do not have
to be redesigned, although users of those products have been able to request
their data since 12 September 2025.

### Do NIS2 rules apply to product manufacturers?

Directly, if the manufacturer is itself an essential or important entity, and many are: NIS2's Annex II covers the manufacture of computers and electronics, electrical equipment, machinery and vehicles (NACE C26 to C30), so a maker in those sectors that is at least medium-sized is an important entity. In Italy that means registering with ACN, applying the basic security measures and notifying incidents to CSIRT Italia. Smaller makers are affected as suppliers: their NIS2 customers
must manage supply-chain security, so they send questionnaires and add security
clauses to contracts.

### Can one risk assessment cover the CRA, the AI Act and the GDPR?

For the product laws, yes, according to the Commission's CRA FAQ, as long as compliance with each law can still be demonstrated. The GDPR is different: the same FAQ says it does not overlap legally with the CRA, though the two may complement each other, and the impact assessment usually belongs to your customer as controller. In practice, share the evidence: one system model and one evidence base, with a separate demonstration for each law.

### Who enforces the Cyber Resilience Act in Italy?

Under the draft legislative decree approved in preliminary form on 2 October
2026, the national cybersecurity agency (ACN) would be the notifying authority
and the market surveillance authority for the CRA. Vulnerability and incident
reports go through ENISA's Single Reporting Platform to the designated CSIRT.

## References

Checked on 20 November 2026. EUR-Lex texts are primary sources; the rest are
secondary and are cited for dates and national status.

- [_Regulation (EU) 2024/2847, Cyber Resilience Act_](https://eur-lex.europa.eu/eli/reg/2024/2847/oj),
  EUR-Lex. Articles 12, 13, 14, 52(7), 69, 71; Annex I; recital 53.
- European Commission,
  [_Commission guidance on the application of Regulation (EU) 2024/2847, C/2026/6013_](https://eur-lex.europa.eu/eli/C/2026/6013),
  first adopted on 27 July 2026 as C(2026) 5252; published in the Official Journal on 17 November 2026.
- [_Directive (EU) 2024/2853 on liability for defective products_](https://eur-lex.europa.eu/eli/dir/2024/2853/oj),
  EUR-Lex. Article 2(1) as corrected by the [corrigendum of 7 May 2026](https://eur-lex.europa.eu/eli/dir/2024/2853/corrigendum/2026-05-07/oj).
- [_Regulation (EU) 2023/2854, Data Act_](https://eur-lex.europa.eu/eli/reg/2023/2854/oj),
  EUR-Lex. Articles 3 and 50.
- [_Commission Delegated Regulation (EU) 2026/339 repealing Delegated Regulation (EU) 2022/30_](https://eur-lex.europa.eu/eli/reg_del/2026/339/oj/eng),
  EUR-Lex.
- [_General product safety regulation (2023): summary_](https://eur-lex.europa.eu/EN/legal-content/summary/general-product-safety-regulation-2023.html),
  EUR-Lex.
- Reed Smith,
  [_EU Product Liability Directive: where things stand with Member State transposition_](https://www.reedsmith.com/articles/eu-product-liability-directive-where-things-stand-with-member-state-transposition/).
  The corrigendum to 8 December 2026.
- Withers,
  [_Who holds the data? The EU Data Act's access by design rules take effect_](https://www.withersworldwide.com/en-gb/insight/read/a-design-for-access-new-eu-data-act-data-access-rules-take-effect),
  15 September 2026.
- White & Case,
  [_EU AI Omnibus enters into force, amending the AI Act_](https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act).
  New high-risk dates.
- Reed Smith,
  [_EU AI Act: next level applies as of 2 August 2026_](https://www.reedsmith.com/our-insights/blogs/technology-law-dispatch/102nfi5/eu-ai-act-next-level-applies-as-of-2-august-2026/).
  AI in machinery and the high-risk regime.
- UL,
  [_Navigating the new EU Machinery Regulation (EU) 2023/1230_](https://www.ul.com/resources/navigating-new-eu-machinery-regulation-eu-20231230).
  Application date, Annex III sections 1.1.9 and 1.2.1, CRA recital 53.
- CECIMO,
  [_Joint industry call on cybersecurity and Machinery Regulation_](https://www.cecimo.eu/news/joint-industry-call-on-cybersecurity-and-machinery-regulation/),
  20 January 2026.
- CRA Evidence,
  [_CRA harmonised standards status_](https://craevidence.com/cra-compliance/harmonised-standards-status),
  as of 17 November 2026.
- CRA Evidence,
  [_CRA for German manufacturers_](https://craevidence.com/blog/cra-german-manufacturers-bsi-guide).
  NANDO status as of 6 November 2026.
- Regreportingdesk,
  [_Digital Omnibus incident reporting: the Council mandate_](https://regreportingdesk.com/digital-omnibus-incident-reporting-national-entry-point/).
- Cybersecurity360,
  [_CRA, il decreto italiano affida ad ACN la vigilanza_](https://www.cybersecurity360.it/news/cra-il-decreto-italiano-affida-ad-acn-la-vigilanza-obblighi-e-nodi-aperti/),
  7 October 2026.
- Pasquale Pillitteri,
  [_Cyber Resilience Act in Italia, arriva il decreto_](https://pasqualepillitteri.it/news/26647/cyber-resilience-act-decreto-italiano-acn-cosa-preparare).
  Parliamentary timetable.
- Agenda Digitale,
  [_Software e AI difettosi: come cambia la norma dal 9 dicembre_](https://www.agendadigitale.eu/?p=287710),
  30 October 2026.
- Agenda Digitale,
  [_AI Act, come funzionano le nuove sanzioni previste in Italia_](https://www.agendadigitale.eu/sicurezza/ai-act-come-funzionano-le-nuove-sanzioni-previste-in-italia/),
  16 October 2026.
- iSimply,
  [_Data Act, dal 12 settembre 2026 i dispositivi connessi devono garantire l'accesso ai dati_](https://www.isimply.it/news/data-act-access-by-design-dispositivi-connessi-2026/).
- Aruba Magazine,
  [_NIS2, misure di sicurezza di base: la checklist per il 31 ottobre 2026_](https://www.aruba.it/magazine/security/nis2-misure-sicurezza-base-acn.aspx).
- European Commission,
  [_Cyber Resilience Act implementation: frequently asked questions_](https://digital-strategy.ec.europa.eu/en/library/cyber-resilience-act-implementation-frequently-asked-questions),
  version 1.4, 4 September 2026. Single risk assessment, relation to the GDPR.
- Katharina Koerner,
  [_One Product, Four Risk Assessments?_](https://www.linkedin.com/pulse/one-product-four-risk-assessments-eu-cyber-resilience-koerner-dzypc/),
  5 November 2026.
