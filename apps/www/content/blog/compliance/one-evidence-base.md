---
title: 'One product, many laws: one evidence base for the CRA, AI Act, Data Act and GDPR'
seoTitle: 'One evidence base for the CRA, AI Act and GDPR'
description: 'CRA, AI Act, Data Act and GDPR files have different owners. What EU law lets you merge, what it does not, and how to build one evidence base for a product.'
date: 2026-11-20
tags:
  - cyber resilience act
  - cra
  - ai act
  - data act
  - gdpr
  - multi-regulation compliance
  - technical documentation
  - connected products
about:
  - name: Cyber Resilience Act, Regulation (EU) 2024/2847
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
  - name: Artificial Intelligence Act, Regulation (EU) 2024/1689
    url: https://eur-lex.europa.eu/eli/reg/2024/1689/oj
  - name: Data Act, Regulation (EU) 2023/2854
    url: https://eur-lex.europa.eu/eli/reg/2023/2854/oj
  - name: General Data Protection Regulation, Regulation (EU) 2016/679
    url: https://eur-lex.europa.eu/eli/reg/2016/679/oj
---

**Key takeaways**

- One connected product with AI features and personal data can trigger several
  separate files: the **CRA** risk assessment and technical file, the **AI Act**
  documentation if the AI is high-risk, the **Data Act** information and design
  duties, a **GDPR** impact assessment, **NIS2** supplier evidence for customers
  and, from December 2026, a **product liability** defence file.
- They have **different owners**. The manufacturer owns the CRA file; the
  customer, as controller, owns the GDPR impact assessment; certain deployers own
  the AI Act's fundamental rights assessment.
- **One risk assessment can serve several laws, on one condition.** The Commission's CRA FAQ accepts a single risk assessment across product laws as long as compliance with each law can still be demonstrated. The same FAQ says the CRA and the GDPR do not overlap legally, though they may complement each other.
- Some conclusions do transfer by law: CRA Article 12 for high-risk AI
  cybersecurity, a **single declaration of conformity** for all applicable acts,
  and a **single technical file** for high-risk AI products.
- The rule of thumb: share **conclusions** only when it is the same property,
  the same object and the same responsible party; otherwise share only the
  **evidence**. Build one foundation per product, and a separate demonstration
  for each law.

_Part of a series on EU product compliance for connected-product makers. For
the full calendar and who owns what, start with
[the map](/blog/compliance/eu-product-compliance-map)._

## The duplication problem

Take a connected device with a camera that uses a vision model, a mobile app and
a cloud back end. Under EU law in 2027 it can need a CRA risk assessment and
technical file, AI Act documentation if the AI is high-risk, Data Act
pre-contract information and an access design, input for a customer's data
protection impact assessment, answers to NIS2 supplier questionnaires, and a
file that would defend it under the new Product Liability Directive.

Each of those is usually written by a different person, often a different
consultant, starting from the same facts: what the product is made of, how data
flows, what can go wrong, what controls exist and how they were tested. The
hypothesis we have been testing at Ganiga, where one product touches all of
these laws, is that the same facts get re-documented three to five times. One
of the people we interviewed this month described the cost precisely: paying
several times for the same evidence.

This article is about what can be merged and what cannot, written from the
maker's side. I am not a lawyer; the sources are at the end, and the analysis
leans heavily on Katharina Koerner's work on overlapping risk assessments, which
is the clearest treatment I have found.

## Who owns which file

| Law                                   | Document                                                        | Responsible party                                                     | Applies                                                              |
| ------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Cyber Resilience Act                  | Cybersecurity risk assessment, technical file, declaration      | Manufacturer                                                          | Reporting since 11 September 2026; the rest from 11 December 2027     |
| AI Act                                | Risk management system and technical documentation              | Provider of a high-risk AI system                                     | 2 December 2027 (stand-alone); 2 August 2028 (inside regulated products) |
| AI Act, Article 27                    | Fundamental rights impact assessment                            | Certain deployers, such as public bodies and providers of public services, for Annex III systems other than critical infrastructure (point 2) | From 2 December 2027 |
| GDPR, Article 35                      | Data protection impact assessment, where processing is likely to be high-risk | Controller: often the customer; the maker when it runs a service as controller | In force                                                     |
| Data Act                              | Pre-contract information; access-by-design architecture         | Manufacturer for the design; seller, renter or lessor for the information; data holder for indirect access | Since 12 September 2025; design rule for products after 12 September 2026 |
| NIS2                                  | Supplier assessment; your own duties if you are a medium-sized or larger maker in its Annex II sectors | The customer, about you; or you | In force; Italian verification from November 2026                    |
| Product Liability Directive           | No document required, but your evidence if sued                 | Manufacturer                                                          | Products placed on the market after 8 December 2026                  |

The table shows why "one compliance file" is the wrong goal. A maker cannot
write its customer's impact assessment, because the customer decides the
purpose and legal basis of the processing. What a maker can do is supply the
evidence those assessments need, once, in a form that each owner can use.

## What the law lets you merge

Several provisions do let work count twice. They are narrower than the marketing
around "unified compliance" suggests.

| Provision                                         | What transfers                                                                                                                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CRA, Article 12                                   | A high-risk AI product that meets Annex I is presumed to meet the AI Act's cybersecurity requirement, as shown by the CRA declaration of conformity    |
| CRA, Article 28                                   | One EU declaration of conformity for all Union acts that require one, identifying each act; it can be a dossier of the individual declarations (recital 88) |
| CRA, Article 31(3)                                | For high-risk AI products also subject to other acts, a single set of technical documentation containing what each act requires                       |
| Commission CRA guidance, points 175 to 177        | Product variants with the same cybersecurity properties can share one risk assessment and one document set                                             |
| AI Act, Article 27(4)                             | A fundamental rights impact assessment can build on a data protection impact assessment, which it complements rather than replaces                    |

Two statements in the Commission's CRA FAQ, last updated on 4 September 2026, set the frame. A **single risk assessment across product laws** is acceptable, as long as compliance with each law can still be demonstrated. And there is **no legal overlap between the CRA and the GDPR**, although the two may complement each other: meeting Annex I does not prove GDPR compliance, but the same controls can serve both.

## The rule of thumb

Koerner's rule is the one I now use for every merge decision: **share
conclusions only when it is the same property, the same object and the same
responsible party; otherwise share only evidence.**

- Same property, object and party: the cybersecurity of a high-risk AI product,
  assessed by its manufacturer, can count under both the CRA and the AI Act,
  because Article 12 says so.
- Same object, different party: the data flows of your product feed your CRA
  data-minimisation analysis and your customer's impact assessment. The facts
  are shared; the conclusion "this processing is proportionate" belongs to the
  customer.
- Same party, different property: the Data Act asks whether users can reach
  their data; the CRA asks whether that access is secure. One design, two
  separate demonstrations.

## One foundation, several demonstrations

The model that follows from that rule is a single foundation per product, kept
current per release, and a separate demonstration on top of it for each law and
each responsible party.

```tikz One foundation per product, one demonstration per law and party.
% Alt: On the left, one foundation per product and release: the system model and interfaces, components and SBOM, the data catalogue, the update and support policy, and the chain from threats to controls to tests. On the right, six demonstrations built from it: the CRA technical file owned by the manufacturer; AI Act documentation owned by the provider if the AI is high-risk; the Data Act data sheet and access design owned by the manufacturer; inputs for the customer's GDPR impact assessment, where the customer owns the conclusion; a NIS2 supplier pack for customers' checks; and the product liability evidence file.
\begin{tikzpicture}[demo/.style={box, text width=3.5cm, align=left, font=\scriptsize, minimum height=0.85cm, inner sep=4pt}, node distance=0.18cm]
  \node[demo] (d1) {\textbf{CRA}: technical file\\{\itshape manufacturer}};
  \node[demo, below=of d1] (d2) {\textbf{AI Act}: documentation\\{\itshape provider, if high-risk}};
  \node[demo, below=of d2] (d3) {\textbf{Data Act}: data sheet, access\\{\itshape manufacturer}};
  \node[demo, below=of d3, dashed] (d4) {\textbf{GDPR}: inputs for the DPIA\\{\itshape customer decides}};
  \node[demo, below=of d4, dashed] (d5) {\textbf{NIS2}: supplier pack\\{\itshape customer checks}};
  \node[demo, below=of d5] (d6) {\textbf{PLD}: evidence file\\{\itshape manufacturer}};
  \node[hot, anchor=north west, text width=2.7cm, align=left, font=\scriptsize, minimum height=6.05cm] (fb) at ([xshift=-3.95cm]d1.north west) {\textbf{One foundation}\\{\scriptsize per product and release}\\[5pt]system model and interfaces\\[3pt]components and SBOM\\[3pt]data catalogue\\[3pt]update and support policy\\[3pt]threats, controls, tests};
  \foreach \d in {d1,d2,d3,d4,d5,d6}{\draw[flow] (fb.east |- \d.west) -- (\d.west);}
\end{tikzpicture}
```

The foundation holds facts. The demonstrations hold conclusions, each signed by
whoever is responsible for it. Dashed boxes are the ones where your customer
draws the conclusion and you supply the evidence.

## What goes in the foundation

Five things, each versioned with the product:

1. **A system model**: hardware, firmware, app, cloud back end and third-party
      services, with the interfaces between them. Under the CRA's guidance, the manufacturer's own back end is part of the product when the product needs it for one of its functions, so it usually belongs here.
2. **Components**: the SBOM per released version, with triage decisions for
   known vulnerabilities.
3. **A data catalogue**: every data flow, what it contains, where it goes, how
   often, how long it is kept, whether it is personal data, and how users reach
   it.
4. **Update and support policy**: the support end date, how updates are
   delivered, and how users learn about them.
5. **The chain from threats to controls to tests**: each risk, the requirement it
   touches, the control that addresses it and the evidence that the control
   works.

The data catalogue is where the reuse is most visible. One entry can serve three
laws:

```yaml
data_flows:
  - id: fill-level
    source: ultrasonic sensor on the device
    destination: manufacturer back end, EU region
    contents: fill percentage, timestamp, device identifier
    personal_data: false   # true if linked to a named account, e.g. pay-as-you-throw billing
    frequency: every 15 minutes
    retention: 24 months
    user_access: export API, JSON and CSV with a published schema
    used_by:
      cra: Annex I, Part I, points 2(e) confidentiality, 2(f) integrity, 2(g) data minimisation
      data_act: Article 3 pre-contract information; access by design
      gdpr: input to the customer's records and impact assessment
```

## Where merging breaks

Merging fails in predictable places, and it helps to know them in advance.

- **Different triggers.** The CRA applies to every product with digital elements;
  the AI Act's heavy obligations apply only to high-risk systems. Most connected
  products with AI features will not be high-risk, so there may be no AI Act file
  to merge into at all.
- **Different standards of evidence.** The CRA asks whether each Annex I
  requirement is met; the GDPR asks whether processing is necessary and
  proportionate for its purpose. The same control can be sufficient for one and
  irrelevant to the other.
- **Different decision-makers.** Whoever signs a conclusion has to own it. A
  merged document signed by the wrong party is weaker than two separate ones.
- **Different clocks.** Reporting under the CRA, notification under NIS2 and
  breach notification under the GDPR start from different events and go to
  different authorities. The Digital Omnibus proposal would create one entry
  point for incident reports, but the Council's mandate of 21 October 2026
  prefers national entry points, and nothing is adopted.

## What I would do this quarter

1. **Count the descriptions.** For your last product, list every separate
   description of its architecture or data flows, who wrote it and for whom.
2. **Choose one system model** and make the others derive from it.
3. **Start the data catalogue** with the flows you already know.
4. **Map each law's output** to the foundation entries it needs, and to the
   person who signs its conclusion.
5. **Produce evidence per release** as part of the build, as described in the
   [CRA engineering guide](/blog/security/cra-engineering).
6. **Offer customers one pack** for their impact assessments and supplier checks,
   as described in [NIS2 from the supplier's side](/blog/compliance/nis2-supplier-requirements).

## Why I am writing this

I write these articles as research: to understand the sector and how companies
actually run compliance day to day. They are also groundwork for a product I
will probably build, to streamline how companies handle their compliance
processes. If that interests you, **[write to me](mailto:me@bernardoforcillo.com?subject=One%20evidence%20base)** at
[me@bernardoforcillo.com](mailto:me@bernardoforcillo.com?subject=One%20evidence%20base).

_Disclosure: I work on connected products at Ganiga. Nothing is for sale yet._

## Frequently asked questions

### Can one risk assessment cover the CRA, the AI Act and the GDPR?

For the product laws, yes, according to the Commission's CRA FAQ, as long as compliance with each law can still be demonstrated. The GDPR is different: the FAQ says it does not overlap legally with the CRA, although the two may complement each other, and the impact assessment usually belongs to your customer as controller. In practice, share the evidence and keep a separate demonstration for each law.

### Does CRA compliance count for the AI Act?

For cybersecurity, yes, in a defined case. Under Article 12 of the CRA, a
high-risk AI system that is a product with digital elements and meets the CRA's
essential requirements is presumed to meet the AI Act's cybersecurity
requirement, as demonstrated by the CRA declaration of conformity. Other AI Act
requirements still need their own evidence.

### Can a product have one declaration of conformity for several EU laws?

Yes. Under Article 28 of the CRA, where a product is subject to more than one
Union act requiring an EU declaration of conformity, a single declaration is
drawn up for all of them, identifying each act. It can be organised as a dossier
of the individual declarations.

### Who is responsible for the DPIA of a connected product?

The controller of the processing, which is often the customer that deploys the
product rather than its manufacturer. The manufacturer is responsible for the
CRA file and, as a provider, for any AI Act documentation, and can supply the
customer with the facts its impact assessment needs.

### What is the difference between sharing evidence and sharing conclusions?

Evidence is the facts, such as architecture, data flows, components and test
results, which can be reused across laws. Conclusions are the judgements each
law asks for, such as compliance with an essential requirement or the
proportionality of processing. A conclusion can be reused only when it concerns
the same property, the same object and the same responsible party.

### Will the Digital Omnibus create a single compliance file?

No. The Digital Omnibus proposal of November 2025 would simplify incident
reporting through a single entry point, but it does not merge the underlying
assessments, and as of 20 November 2026 it was not adopted. The Council's
mandate of 21 October 2026 prefers national entry points.

## Read next

- [The map: EU product compliance 2026–2028](/blog/compliance/eu-product-compliance-map),
  every law, date and owner on one page.
- [The AI Act in connected products](/blog/compliance/ai-act-connected-products),
  for when AI Act documentation is needed at all.
- [Data Act access by design meets the CRA](/blog/compliance/data-act-access-by-design),
  the clearest case of one design serving two laws.
- [Engineering for the CRA](/blog/security/cra-engineering), for evidence produced
  per release.

## References

Checked on 20 November 2026. The regulations and the Commission's guidance are
primary sources; the rest are secondary.

- [_Regulation (EU) 2024/2847, Cyber Resilience Act_](https://eur-lex.europa.eu/eli/reg/2024/2847/oj),
  EUR-Lex. Articles 12, 13, 28 and 31.
- [_Regulation (EU) 2024/1689, AI Act_](https://eur-lex.europa.eu/eli/reg/2024/1689/oj),
  EUR-Lex. Articles 15 and 27.
- [_Regulation (EU) 2016/679, GDPR_](https://eur-lex.europa.eu/eli/reg/2016/679/oj),
  EUR-Lex. Article 35.
- [_Regulation (EU) 2023/2854, Data Act_](https://eur-lex.europa.eu/eli/reg/2023/2854/oj),
  EUR-Lex. Article 3.
- European Commission,
  [_Commission guidance on the application of Regulation (EU) 2024/2847, C/2026/6013_](https://eur-lex.europa.eu/eli/C/2026/6013),
  first adopted on 27 July 2026 as C(2026) 5252; published in the Official Journal on 17 November 2026. Points 175–177 and section 8.
- European Commission,
  [_Cyber Resilience Act implementation: frequently asked questions_](https://digital-strategy.ec.europa.eu/en/library/cyber-resilience-act-implementation-frequently-asked-questions),
    version 1.4, 4 September 2026. Single risk assessment; relation to the GDPR.
- Katharina Koerner,
  [_One Product, Four Risk Assessments?_](https://www.linkedin.com/pulse/one-product-four-risk-assessments-eu-cyber-resilience-koerner-dzypc/),
  5 November 2026.
- Springlex,
  [_CRA Article 28: EU declaration of conformity_](https://www.springlex.eu/en/packages/cra/cra-regulation/article-28/).
- Hannes Snellman,
  [_Art. 31 CRA: technical documentation_](https://digitalhorizon.hannessnellman.com/?p=10786).
- Regreportingdesk,
  [_Digital Omnibus incident reporting: the Council mandate_](https://regreportingdesk.com/digital-omnibus-incident-reporting-national-entry-point/).
