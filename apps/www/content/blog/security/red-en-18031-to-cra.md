---
title: 'From RED and EN 18031 to the CRA: what carries over for radio products'
seoTitle: 'From RED and EN 18031 to the CRA'
description: 'Radio products have met EN 18031 since August 2025; the CRA takes over on 11 December 2027. What carries over, what is new, and how old certificates count.'
date: 2026-11-20
tags:
  - radio equipment directive
  - red
  - en 18031
  - cyber resilience act
  - cra
  - iot
  - conformity assessment
  - connected products
about:
  - name: Commission Delegated Regulation (EU) 2022/30
    url: https://eur-lex.europa.eu/eli/reg_del/2022/30/oj
  - name: Commission Delegated Regulation (EU) 2026/339
    url: https://eur-lex.europa.eu/eli/reg_del/2026/339/oj
  - name: Cyber Resilience Act, Regulation (EU) 2024/2847
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
---

**Key takeaways**

- Since **1 August 2025**, internet-connected radio equipment has had to protect the network, and, depending on what it processes or does, personal data and users against fraud; radio wearables, toys and childcare equipment are covered for privacy even offline. These are the requirements of the Radio Equipment Directive's delegated act, Regulation (EU) 2022/30,
  usually through the **EN 18031** standards.
- Delegated Regulation (EU) 2026/339 **repeals** that act from **11 December
  2027**, the day the Cyber Resilience Act (CRA) applies in full. From then,
  radio products are under the CRA for cybersecurity.
- EN 18031 work covers much of the CRA's **product properties** (Annex I, Part
  I). It does not cover **vulnerability handling** (Part II): SBOM, disclosure,
  free updates for a support period, reporting.
- RED cybersecurity **type-examination certificates** count under the CRA only
  for the risks they cover, and only until **11 June 2028**, according to the
  Commission's guidance of 17 November 2026.
- Radio products already have CRA duties today: the **24-hour reporting** of
  actively exploited vulnerabilities has applied since 11 September 2026,
  including to radio products already on the market.

_Part of a series on EU product compliance for connected-product makers. For
the full calendar and who owns what, start with
[the map](/blog/compliance/eu-product-compliance-map)._

## Radio makers have done this once already

For most makers of connected devices, the CRA is the first cybersecurity law
that applies to their product. For makers of radio equipment, it is the second.
Since 1 August 2025, anything with Wi-Fi, Bluetooth, cellular or another radio
that connects to the internet has had to meet three essential requirements of
the Radio Equipment Directive, activated by Delegated Regulation (EU) 2022/30:
protecting the network, protecting personal data and privacy, and protecting
against fraud.

That experience is an advantage. It is also a trap, if a company assumes the
CRA is the same exercise with a new label. One of the practitioners we
interviewed this month put it plainly: building only for EN 18031 is
short-sighted, because the CRA absorbs the RED's cybersecurity requirements
over time.

I build connected products at Ganiga, and this transition is part of our own
plan. I am not a lawyer; the sources are at the end.

## The timeline for a radio product

```tikz Cybersecurity rules for a radio product, 2025 to 2028.
% Alt: A vertical timeline. On 1 August 2025, the RED cybersecurity delegated act applies, with EN 18031 standards cited with restrictions. On 11 September 2026, CRA vulnerability and incident reporting applies to all products with digital elements, radio products included and also those already on the market. On 11 December 2027, the CRA applies in full and the RED delegated act is repealed by Delegated Regulation 2026/339. On 11 June 2028, RED cybersecurity type-examination certificates stop counting towards CRA compliance.
\begin{tikzpicture}[milestone/.style={anchor=west, align=left, inner sep=0pt}]
  \draw[line width=1.6pt, draw opacity=0.15] (0,0) -- (0,-4.4);
  \draw[line width=1.6pt, accent] (0,0) -- (0,-1.45);
  \fill[accent] (0,0) circle (3pt);
  \fill[accent] (0,-1.45) circle (3pt);
  \fill[fill opacity=0.35] (0,-2.9) circle (3pt);
  \fill[fill opacity=0.35] (0,-4.35) circle (3pt);
  \node[milestone] at (0.5,0) {{\small\bfseries 1 Aug 2025}\\[1pt]{\footnotesize RED delegated act applies; EN 18031, with restrictions}};
  \node[milestone] at (0.5,-1.45) {{\small\bfseries 11 Sep 2026}\\[1pt]{\footnotesize CRA reporting applies, radio products included}};
  \node[milestone] at (0.5,-2.9) {{\small\bfseries\color{accent} 11 Dec 2027}\\[1pt]{\footnotesize CRA in full; RED delegated act repealed}};
  \node[milestone] at (0.5,-4.35) {{\small\bfseries 11 Jun 2028}\\[1pt]{\footnotesize RED type-examination certificates stop counting}};
\end{tikzpicture}
```

The change happens unit by unit, as everywhere in EU product law. Units placed
on the market before 11 December 2027 stay under the RED delegated act and do
not have to meet the CRA's product requirements unless they are substantially
modified. Units placed from that day are under the CRA. The CRA's reporting duty,
on the other hand, already covers every in-scope radio product on the market.

## What the RED delegated act asked for

Delegated Regulation (EU) 2022/30 applies three essential requirements of the
Radio Equipment Directive to defined categories of radio equipment:

| Requirement                                         | Applies to                                                                                                                       | Standard   |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Article 3(3)(d): no harm to the network             | Radio equipment that can communicate over the internet, directly or through other equipment                                      | EN 18031-1 |
| Article 3(3)(e): personal data and privacy          | Internet-connected radio equipment that can process personal, traffic or location data; radio wearables, radio toys and radio equipment designed exclusively for childcare, even if not internet-connected | EN 18031-2 |
| Article 3(3)(f): protection from fraud              | Internet-connected radio equipment that can transfer money, monetary value or virtual currency                                   | EN 18031-3 |

The EN 18031 series was published by CEN-CENELEC in August 2024 and cited in the
Official Journal at the end of January 2025 by Implementing Decision (EU) 2025/138, **with three restrictions**. The best known concerns passwords: products relying on the options that let a user set no password, or not use one, get no presumption of conformity. The other two concern the access-control options for toys and childcare equipment in EN 18031-2, and an option in the secure update mechanism in EN 18031-3. A manufacturer can self-declare only if it applies the standards and the restrictions do not affect its product; otherwise the route is EU-type examination by a notified body (module B with C) or full quality assurance (module H).

The delegated act also leaves out radio equipment already covered by other EU rules, such as medical devices, civil aviation products, vehicles and electronic road-toll equipment, for some or all of its requirements.

The CRA repeats that pattern only for important class I products: they can self-assess only by applying in full a cited harmonised standard, a common specification or a certification scheme, and partial application brings a notified body in. Most radio products will be default products under the CRA, and those self-assess with or without a cited standard. For them, the CRA is more permissive than the RED, where not applying the cited standards meant a notified body. The [classification guide](/blog/compliance/cra-product-classification)
covers when that applies.

## What carries over, and what is new

EN 18031 is organised around security mechanisms. Most of them correspond to the
product properties in Annex I, Part I of the CRA. The mapping below is my
reading, not an official correspondence table; it is meant as a starting point
for a gap analysis.

| EN 18031 mechanism family                                         | CRA Annex I, Part I                                      | Carries over?                         |
| ----------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------- |
| Access control and authentication                                 | (d) protection from unauthorised access                  | Largely                               |
| Secure update                                                     | (c) security updates                                     | Partly: the CRA adds automatic updates by default, where applicable, with opt-out |
| Secure storage, cryptographic keys, cryptography                  | (e) confidentiality, (f) integrity                       | Largely                               |
| Secure communication                                              | (e) confidentiality, (f) integrity                       | Largely                               |
| Resilience, network monitoring, traffic control                   | (h) availability, (i) no harm to other devices           | Largely                               |
| General equipment capabilities, such as no known vulnerabilities and minimal exposed services | (a) no known exploitable vulnerabilities, (b) secure by default, (j) limited attack surface | Partly; the guidance counts attack-surface reduction among the risks RED certificates do not cover (point 253) |
| Logging, deletion, user notification (EN 18031-2)                 | (l) logging, (m) secure erasure                          | Partly                                |
| None                                                              | (g) data minimisation, (k) reduced impact of exploitation | New work                             |

"Largely" assumes you applied the relevant EN 18031 parts across all the product's assets; work done on a narrow asset scope carries over less.

And then there is everything the RED delegated act never asked for, because it
regulated the product at the moment it was sold, not over its life:

- **Vulnerability handling, Annex I Part II**: an SBOM per version, prompt fixes,
  regular testing, public disclosure of fixed vulnerabilities, a coordinated
  disclosure policy and contact, and free security updates.
- **A support period** of at least five years, with an end date stated at
  purchase.
- **Reporting** of actively exploited vulnerabilities and severe incidents
  within 24 hours, already in force.
- **A cybersecurity risk assessment** for the whole product, kept current, with
  a justification for every requirement that does not apply.
- **Classification by core functionality** into default, important or critical,
  which decides the conformity route. The cloud back end and app that count as the product's remote data processing come into scope, but they do not change its class.

Nemko's summary is a fair one: RED work is a good start towards the CRA but not
sufficient on its own. In my experience the gap is mostly process, not product:
the device may already be well secured, while the organisation around it has
never had to run vulnerability handling for a support period of five years or more.

## Old certificates under the new law

Many radio products went through a notified body for the RED delegated act,
either because the EN 18031 restrictions applied or because the manufacturer
chose to. The Commission's guidance of 17 November 2026 says how those
certificates count:

- a valid EU type-examination certificate for the RED cybersecurity requirements
  can be relied on for the risks it covers, **but not beyond 11 June 2028**
  (points 251 and 252);
- risks it does not cover, such as **vulnerability handling, data minimisation
  and attack-surface reduction**, must still be addressed under the CRA (point
  253);
- the certificate is evidence for the covered risks only, not proof of full CRA
  compliance (point 254).

The general rule behind this is Article 69(1) of the CRA: certificates under
other product laws remain valid until 11 June 2028 unless they expire earlier,
and manufacturers still have to carry out a full CRA risk assessment and close
the gaps (points 247 to 250). Products placed on the market under the RED act stay subject to market surveillance under it after the repeal (recital 5 of Delegated Regulation 2026/339).

## The standards bridge

The CRA's horizontal standards, the EN 40000 series, were developed in the same
CEN-CENELEC committee and build on the EN 18031 work, according to
cyberresilienceact.eu. As of 17 November 2026 none of them is cited under the
CRA: EN 40000-1-1 and EN 40000-1-2 were ratified on 2 November but are not
expected to be cited, and EN 40000-1-3, on vulnerability handling, is the part
expected to give a presumption of conformity first.

For a radio maker, that suggests a practical approach: keep the EN 18031 test
evidence, map it to Annex I Part I, and invest the new effort in Part II, where
the first CRA standard is also likely to land.

## What I would do this quarter

1. **List your radio products** and the RED route each one took: self-declaration
   or notified body.
2. **Map each EN 18031 test report** to the CRA's Annex I, Part I, and mark what
   is missing.
3. **Build Part II from scratch where needed**: SBOM per version, triage records,
   disclosure policy, support period, update process.
4. **Check certificate dates** against 11 June 2028, and plan any new assessment
   before then.
5. **Classify each product under the CRA** by core functionality, including its
   app and cloud back end.
6. **Plan the unit-by-unit switch** on 11 December 2027 with production and sales.

The [CRA engineering guide](/blog/security/cra-engineering) covers Part II in
depth, and the [CRA operating model](/blog/compliance/cra-operations) the
transition.

## Why I am writing this

I write these articles as research: to understand the sector and how companies
actually run compliance day to day. They are also groundwork for a product I
will probably build, to streamline how companies handle their compliance
processes. If that interests you, **[write to me](mailto:me@bernardoforcillo.com?subject=RED%20to%20CRA)** at
[me@bernardoforcillo.com](mailto:me@bernardoforcillo.com?subject=RED%20to%20CRA).

_Disclosure: I work on connected products at Ganiga. Nothing is for sale yet._

## Frequently asked questions

### When is the RED cybersecurity delegated act repealed?

Delegated Regulation (EU) 2026/339, adopted on 16 February 2026 and published in
the Official Journal on 29 April 2026, repeals Delegated Regulation (EU) 2022/30
with effect from 11 December 2027, the date the Cyber Resilience Act applies in
full.

### Does EN 18031 compliance mean CRA compliance?

No. EN 18031 covers security properties that overlap with Annex I, Part I of the
CRA, but not the vulnerability-handling requirements of Part II, such as the
SBOM, disclosure policy, free security updates and the support period, nor the
CRA's reporting duty. It is a strong starting point, not a substitute.

### Are RED cybersecurity certificates valid under the CRA?

Partly and temporarily. According to the Commission's guidance of 17 November
2026, a valid EU type-examination certificate for the RED cybersecurity
requirements can be relied on for the risks it covers until 11 June 2028. Risks
it does not cover must be addressed under the CRA.

### Do radio products already on the market fall under the CRA?

For reporting, yes: since 11 September 2026, manufacturers must report actively
exploited vulnerabilities and severe incidents for all in-scope products,
including radio products already on the market. The CRA's product requirements
apply only to units placed on the market from 11 December 2027, or to older ones
that are substantially modified.

### What were the EN 18031 restrictions?

The EN 18031 standards were cited in the Official Journal in January 2025 with
three restrictions, set by Implementing Decision (EU) 2025/138. The best known concerns password options that let users set no password or not use one; the others concern access-control options for toys and childcare equipment in EN 18031-2 and an option in the secure update mechanism in EN 18031-3. Products relying on restricted options get no presumption of conformity and need a notified body.

### Which radio products are covered by the RED delegated act?

Radio equipment that can communicate over the internet, directly or through
other equipment, for network protection; internet-connected radio equipment that
can process personal, traffic or location data, plus radio wearables, radio toys and radio equipment designed exclusively for childcare, for privacy; and internet-connected radio equipment that can
transfer money or virtual currency, for fraud protection.

## Read next

- [The map: EU product compliance 2026–2028](/blog/compliance/eu-product-compliance-map),
  every law, date and owner on one page.
- [Important or critical? Classifying products under the CRA](/blog/compliance/cra-product-classification),
  for the conformity route after RED.
- [Engineering for the CRA](/blog/security/cra-engineering), for the Part II work
  EN 18031 never asked for.
- [The CRA field guide](/blog/security/cra-field-guide), on the
  reporting duty already in force.

## References

Checked on 20 November 2026. EUR-Lex texts and the Commission's guidance are
primary sources; the rest are secondary.

- [_Commission Delegated Regulation (EU) 2022/30_](https://eur-lex.europa.eu/eli/reg_del/2022/30/oj/eng),
    EUR-Lex. RED Article 3(3)(d), (e) and (f).
- [_Commission Implementing Decision (EU) 2025/138_](https://eur-lex.europa.eu/eli/dec_impl/2025/138/oj),
  EUR-Lex. Citation of EN 18031-1, -2 and -3 with restrictions.
- [_Commission Delegated Regulation (EU) 2026/339 repealing Delegated Regulation (EU) 2022/30_](https://eur-lex.europa.eu/eli/reg_del/2026/339/oj/eng),
    EUR-Lex. Recital 5.
- [_Regulation (EU) 2024/2847, Cyber Resilience Act_](https://eur-lex.europa.eu/eli/reg/2024/2847/oj),
  EUR-Lex. Articles 14, 69 and 71; Annex I.
- European Commission,
  [_Commission guidance on the application of Regulation (EU) 2024/2847, C/2026/6013_](https://eur-lex.europa.eu/eli/C/2026/6013),
  Adopted on 27 July 2026 as C(2026) 5252; published in the Official Journal on 17 November 2026. Points 247–254.
- UK Government,
  [_Regulation (EU) 2022/30 factsheet_](https://www.gov.uk/government/publications/radio-equipment-regulations-2017/regulation-eu-202230-factsheet).
  The application date moved to 1 August 2025.
- SGS,
  [_EU harmonizes EN 18031 standards_](https://www.sgs.com/en/news/2025/02/safeguards-02625-eu-harmonizes-en-18031-standards),
  February 2025.
- Spanish Ministry for Digital Transformation,
  [_Guidance on the application of the harmonised standards EN 18031_](https://digital.gob.es/content/dam/portal-mtdfp/avance-digital/telecomunicacion-e-infraestructuras-digitales/areas_interes/equipos-telecomunicacion/documents/Guia-aplicacion-EN-18031.pdf).
- QIMA,
  [_RED cybersecurity requirements_](https://www.qima.com/consumer-products/lab-testing/cybersecurity/red-cybersecurity-requirements).
  Scope of Article 3(3)(d), (e) and (f).
- Nemko Digital,
  [_From RED to CRA: what manufacturers need to do next_](https://digital.nemko.com/hubfs/From%20RED%20to%20CRA%20What%20Manufacturers%20Need%20to%20Do%20Next.pdf),
  18 May 2026.
- cyberresilienceact.eu,
  [_The Commission's draft amendment pushes the CRA's 2026 standard deadlines back_](https://www.cyberresilienceact.eu/news/cra-standardisation-deadlines-pushed-back-two-months.html).
  EN 40000 and EN 18031.
- CRA Evidence,
  [_CRA harmonised standards status_](https://craevidence.com/cra-compliance/harmonised-standards-status),
  as of 17 November 2026.
