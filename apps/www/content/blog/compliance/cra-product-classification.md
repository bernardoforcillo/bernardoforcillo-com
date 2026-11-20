---
title: 'Important or critical? Classifying products under the CRA, and who has to check them'
seoTitle: 'CRA product classification: important, critical and notified bodies'
description: 'How to classify a product under the CRA by core functionality, which conformity route follows, and why class I means a notified body until standards are cited.'
date: 2026-11-20
tags:
  - cyber resilience act
  - cra
  - product classification
  - important products
  - critical products
  - conformity assessment
  - notified bodies
  - harmonised standards
about:
  - name: Cyber Resilience Act, Regulation (EU) 2024/2847
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
  - name: Commission Implementing Regulation (EU) 2025/2392
    url: https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj
---

**Key takeaways**

- The Cyber Resilience Act (CRA) sorts products into three tiers: **default**
  (most products), **important** (Annex III: 19 class I and 4 class II
  categories) and **critical** (Annex IV: 3 categories).
- The tier depends on the product's **core functionality**, not on the
  components inside it. Implementing Regulation (EU) 2025/2392, in force since
  21 December 2025, gives the technical description of each category.
- Default products are **self-assessed**. Class I products can be self-assessed
  only by applying a harmonised standard, common specification or certification
  scheme **in full**; otherwise, and always for class II, a **notified body** is
  needed. Critical products will need European certification once the
  Commission requires it.
- As of 17 November 2026 no CRA harmonised standard is cited, and as of 6
  November 2026 no CRA notified body is listed. For class I products today, the
  practical route is third-party assessment with uncertain capacity.
- Write the classification down, with the descriptions you considered and why
  they do or do not fit. It is the first thing an authority or a notified body
  will ask for.

_Part of a series on EU product compliance for connected-product makers. For
the full calendar and who owns what, start with
[the map](/blog/compliance/eu-product-compliance-map)._

## Why classification decides the cost of a product

Every product with digital elements must meet the same essential requirements
in Annex I of the Cyber Resilience Act (Regulation (EU) 2024/2847). What
changes between tiers is **who checks** that it does. A default product is
assessed by its own manufacturer. An important class II or critical product is
checked by a third party. An important class I product sits in between, and in
2026 that middle ground has become the most awkward place to be.

The difference is not academic. A notified body adds fees, months of lead time
and a dependency on someone else's calendar to every launch, and for every
substantial modification afterwards. Getting the class right, early, is
therefore one of the few CRA decisions that changes a product roadmap.

I build connected products at Ganiga, and classification was the first
question we had to answer for our own devices. I am not a lawyer; the sources
are at the end. For how classification fits the rest of the work, the
[CRA field guide](/blog/security/cra-field-guide) and the
[CRA engineering guide](/blog/security/cra-engineering) are the companions to
this article.

## The three tiers

| Tier                         | Categories                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Important, class I (19)      | Identity and privileged access management systems, including access control readers; browsers; password managers; anti-malware software; VPN products; network management systems; SIEM systems; boot managers; PKI and certificate software; physical and virtual network interfaces; operating systems; routers, modems and switches for internet connection; microprocessors, microcontrollers, ASICs and FPGAs with security-related functionalities; smart home general-purpose virtual assistants; smart home products with security functionalities, such as door locks, security cameras, baby monitors and alarm systems; internet-connected toys with social interaction or location tracking; personal wearables for health monitoring outside the medical device rules, or intended for children |
| Important, class II (4)      | Hypervisors and container runtime systems; firewalls and intrusion detection or prevention systems; tamper-resistant microprocessors; tamper-resistant microcontrollers                                                                                                                                                                                                                                                                                                                          |
| Critical (3)                 | Hardware devices with security boxes; smart meter gateways within smart metering systems and other devices for advanced security purposes, including secure cryptoprocessing; smartcards and similar devices, including secure elements |
| Default                      | Everything else in scope                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

Most connected products end up in the default tier. The ones that do not are
mostly security products themselves, network equipment, and a handful of
consumer categories where the EU judged the risk high: smart home security,
connected toys and wearables for health or for children.

## Core functionality: the test that decides

The CRA classifies a product by what it is fundamentally designed to do. The
Commission's Implementing Regulation (EU) 2025/2392 of 28 November 2025,
published on 1 December 2025 and in force since 21 December 2025, sets out the
technical description of each category in its own annexes. It does not amend the
CRA; it tells you how to read Annexes III and IV.

Two consequences matter most for makers of connected devices.

**Components do not pull the product up.** Embedding a component that would
itself be important or critical does not make the product important or
critical. The Commission's guidance uses the clearest example (point 141): an operating system is important class I, but a smartphone that contains one is default. The same applies to a
device built on a security-related microcontroller: the microcontroller sold on
its own is class I; your device, if its core functionality is something else,
is not.

**Multi-function products need a reasoned call.** A smart hub that is also a
security camera, or a gateway that is also a router, can match more than one
description. Herbert Smith Freehills Kramer's advice is to use the technical
descriptions as the matching exercise rather than the category labels, to
expect grey areas, and to record what you considered so legal, engineering and
marketing hold the same position. The Commission's guidance narrows the room for argument: a product has one core functionality (point 144), and describing it in a misleading way to avoid a category is not allowed (point 143). Its example of a router with a built-in firewall comes out as a router, class I, not a firewall.

Some illustrations of how the test works in practice. They are readings, not
legal advice, and the descriptions in Regulation 2025/2392 are what count.

| Product                                    | Likely tier                  | Why                                                                                       |
| ------------------------------------------ | ---------------------------- | ----------------------------------------------------------------------------------------- |
| Smart door lock                            | Important, class I           | A smart home product with security functionality                                          |
| Home router                                | Important, class I           | Router for connecting to the internet                                                     |
| Baby monitor with an app                   | Important, class I           | Named as a smart home security product                                                    |
| Firewall appliance                         | Important, class II          | Firewall or intrusion detection is its core functionality                                 |
| Smart meter gateway                        | Critical                     | Named in Annex IV                                                                         |
| Connected thermostat, appliance or bin     | Default, unless a description fits | Its core functionality is heating, washing or collecting waste, not security        |
| Smartphone                                 | Default                      | Contains an operating system, but is not one                                              |
| Secure microcontroller sold to other makers | Important or critical        | Class I with security-related functionality; class II if tamper-resistant against moderate attack potential (AVA_VAN.2 or 3); a secure element built to resist high attack potential (AVA_VAN.4 or higher) is critical |

## The conformity route that follows

Article 32 of the CRA sets the routes. Annex VIII describes the modules: module
A is internal control by the manufacturer; modules B and C combine an EU-type
examination by a notified body with conformity to type based on internal
production control; module H is conformity based on full quality assurance,
approved by a notified body.

```tikz From core functionality to conformity route under the CRA.
% Alt: A decision flow. If the product's core functionality is in Annex IV, it is critical: European cybersecurity certification once the Commission requires it, and third-party assessment until then. If it is in Annex III class II, it needs third-party assessment through modules B and C or H, or a European certificate. If it is in Annex III class I, it can be self-assessed under module A only if a harmonised standard, common specification or certification scheme is applied in full; otherwise it needs modules B and C or H. If none applies, the product is default and is self-assessed under module A.
\begin{tikzpicture}[q/.style={box, text width=3.3cm, font=\footnotesize}, res/.style={box, text width=2.5cm, font=\scriptsize, align=left}, node distance=0.55cm]
  \node[q] (q1) {Core functionality in \textbf{Annex IV}?};
  \node[q, below=of q1] (q2) {In \textbf{Annex III, class II}?};
  \node[q, below=of q2] (q3) {In \textbf{Annex III, class I}?};
  \node[q, below=of q3] (q4) {Standard or scheme applied \textbf{in full}?};
  \node[hot, text width=3.3cm, font=\footnotesize, below=of q4] (a) {\textbf{Self-assessment}\\{\scriptsize module A; default products too}};
  \node[res, right=0.6cm of q1] (r1) {\textbf{Critical}: EUCC once required; until then third party};
  \node[res, right=0.6cm of q2] (r2) {\textbf{Third party}: modules B+C or H, or EUCC};
  \node[res, right=0.6cm of q4] (r4) {\textbf{Third party}: modules B+C or H};
  \draw[flow] (q1) -- node[note, right] {no} (q2);
  \draw[flow] (q2) -- node[note, right] {no} (q3);
  \draw[flow] (q3) -- node[note, right] {yes} (q4);
  \draw[flow] (q4) -- node[note, right] {yes} (a);
  \draw[flow] (q1) -- node[note, above] {yes} (r1);
  \draw[flow] (q2) -- node[note, above] {yes} (r2);
  \draw[flow] (q4) -- node[note, above] {no} (r4);
  \draw[flow] (q3.west) -- ++(-0.45,0) |- node[note, left, pos=0.25] {no} (a.west);
\end{tikzpicture}
```

| Tier                | Route under Article 32                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Default             | Module A, internal control; the third-party routes are also open                                                                                             |
| Important, class I  | Module A only where harmonised standards, common specifications or a European cybersecurity certification scheme at least at level "substantial" are applied; otherwise module B with C, or module H |
| Important, class II | Module B with C, module H, or a European cybersecurity certificate at least at level "substantial"                                                           |
| Critical            | A European cybersecurity certificate where the Commission requires one by delegated act (Article 8); until then, the class II routes                         |

Two rules apply across tiers. Microenterprises and small enterprises may submit
technical documentation in a simplified form, which notified bodies must accept, once the Commission has set that form by implementing act (Article 33(5)). And free and open-source products in the important tier can use
self-assessment if their technical documentation is made public, a route covered
in the [deep dive on open source](/blog/security/open-source-cra).

## Why class I means a notified body today

The class I shortcut depends on applying in full a harmonised standard, a common specification or a European cybersecurity certification scheme at level "substantial". No common specification exists, and EUCC can serve only once the delegated act under Article 27(9) is adopted, so in practice the question is standards. As of 17
November 2026, according to the CRA Evidence tracker, none is cited in the
Official Journal. EN 40000-1-1 and EN 40000-1-2 were ratified on 2 November 2026
but are not expected to be cited; EN 40000-1-3, on vulnerability handling, is
the horizontal part expected to give a presumption first; its formal vote opened on 19 November. On 10 November the Commission amended the standardisation request (C(2026) 7861), moving the deadline for vertical standards to 31 January 2027. Vertical standards for
specific categories are in progress, for example one for smart meter gateways in
CEN-CENELEC's JTC 13, and Nemko notes drafts for virtual assistants, browsers and
network management systems.

Until a standard covering your product is cited, and applied in full, a class I product needs third-party assessment. The guidance adds that the standard has to cover all the risks of the product's core functionality (point 149). "In full" matters: applying a cited
standard partly, or using parts the citation restricts, brings the notified body
back. Makers of radio equipment have already seen this with EN 18031, as the
[deep dive on RED](/blog/security/red-en-18031-to-cra) explains.

## Notified bodies: the capacity question

The CRA's rules on notified bodies have applied since 11 June 2026. As of 6 November 2026, secondary sources reported that the Commission's NANDO database listed **no notified body under the CRA** and 16 notifying authorities; check NANDO directly before you book. In Italy, the draft legislative decree implementing the CRA (Atto del Governo 447) would make the national cybersecurity agency, ACN, both the notifying authority and the market surveillance authority.

Two practical details. A European certificate is issued by a conformity assessment body under the Cybersecurity Act, not by a CRA notified body. And under module B, the notified body that issued the type-examination certificate must be told of every modification to the approved type that may affect conformity.

For an important class I or class II product launching in 2027, that means:

- **book early**: contact candidate bodies now, many of which already assess
  RED or Machinery products, and ask about their designation plans and lead
  times;
- **choose the module deliberately**: modules B and C suit a few product types;
  module H suits a company with an established quality system and many product
  lines, since the body approves the system rather than each type;
- **prepare the file before the slot**: a notified body assesses evidence, so an
  incomplete risk assessment or SBOM costs you the slot;
- **plan for substantial modifications**: a change that alters the cybersecurity
  risk can bring the product back to the body.

Certificates already issued under other product laws help for a while. According
to the Commission's guidance of 17 November 2026, EU type-examination
certificates covering cybersecurity under the RED delegated act or the Machinery
Regulation remain valid for the risks they cover until 11 June 2028, but risks
they do not cover, such as vulnerability handling, must still be addressed under
the CRA (points 247 to 257).

## Critical products and European certification

Annex IV lists three critical categories: hardware devices with security boxes; smart meter gateways and other devices for advanced security purposes, including secure cryptoprocessing, which is where hardware security modules, payment terminals and tachographs can land; and smartcards and similar devices, including secure
elements. Under Article 8, the Commission may require them to obtain a European
cybersecurity certificate at assurance level at least "substantial", using a
scheme under the Cybersecurity Act, such as EUCC, which is based on Common
Criteria. Until such a delegated act applies, critical products follow the class
II routes. The Commission's implementation page lists a delegated act on the
presumption of conformity for EUCC certificates for the fourth quarter of 2026. That act, under Article 27(9), would let EUCC certificates serve important products; it is not the Article 8 act that would make certification mandatory for critical ones.

## Write the classification down

A classification is a decision an authority can question years later, so it
deserves a record. This is the structure I use, kept in the product's technical
file:

```yaml
product: Smart access controller, model AC-200
core_functionality: Controls door locking for residential buildings via app and cloud
descriptions_considered:
  - annex: III, class I, smart home products with security functionalities
    regulation_2025_2392: matches; locking is the core function
    decision: applies
    - annex: III, class I, identity and access management systems, including access control readers
    regulation_2025_2392: may also match; it covers readers and access management to physical locations
    decision: considered; same tier and route either way, core functionality recorded as locking (point 144)
tier: important, class I
route: modules B and C (no cited harmonised standard covers the product)
notified_body: contacted 2026-11; lead time to confirm
review_triggers:
  - a harmonised standard covering the category is cited
  - a substantial modification
  - new functions that change the core functionality
signed_off_by: product security lead, CTO
date: 2026-11-20
```

## What I would do this quarter

1. **List every product type** and write one sentence on its core functionality.
2. **Match each against the descriptions** in Regulation 2025/2392, not the
   labels in Annexes III and IV.
3. **Record the decision** with the descriptions considered and the reasons.
4. **For class I and above, pick a module** and contact candidate notified
   bodies.
5. **Track the standards** that could move a class I product back to
   self-assessment, and the EUCC delegated act if you make critical products.
6. **Check old certificates** under RED or the Machinery rules, and list the
   risks they do not cover.

## Why I am writing this

I write these articles as research: to understand the sector and how companies
actually run compliance day to day. They are also groundwork for a product I
will probably build, to streamline how companies handle their compliance
processes. If that interests you, **[write to me](mailto:me@bernardoforcillo.com?subject=CRA%20classification)** at
[me@bernardoforcillo.com](mailto:me@bernardoforcillo.com?subject=CRA%20classification).

_Disclosure: I work on connected products at Ganiga. Nothing is for sale yet._

## Frequently asked questions

### How are products classified under the Cyber Resilience Act?

By core functionality. A product is important if its core functionality matches
a category in Annex III, critical if it matches a category in Annex IV, and
default otherwise. Implementing Regulation (EU) 2025/2392 gives the technical
description of each category. Integrating an important or critical component
does not by itself change the product's tier.

### What are the important class I products under the CRA?

Annex III lists nineteen class I categories, including identity and access
management systems, browsers, password managers, VPNs, operating systems,
routers and modems, security-related microcontrollers and microprocessors,
smart home virtual assistants, smart home security products such as door locks
and cameras, connected toys with social or location features, and health or
children's wearables.

### Which CRA products need a notified body?

Important class II products need third-party assessment, through modules B and C,
module H or a European certificate. Important class I products need it unless a
harmonised standard, common specification or certification scheme is applied in
full. Critical products need a European certificate once the Commission requires
it, and third-party assessment until then.

### Can important class I products be self-assessed today?

Only by applying a harmonised standard, common specification or European cybersecurity certification scheme in full. As of 20 November 2026 no CRA harmonised standard is cited in the Official Journal, no common specification exists and EUCC awaits its delegated act, so most class I products
currently need a notified body.

### Are there notified bodies for the CRA yet?

As of 6 November 2026, the Commission's NANDO database listed no notified body
under the CRA and 16 notifying authorities. The CRA's rules on notified bodies
have applied since 11 June 2026.

### Do RED or Machinery certificates count under the CRA?

For a time and only partly. According to the Commission's guidance, EU
type-examination certificates covering cybersecurity under the RED delegated act
or the Machinery Regulation remain valid for the risks they cover until 11 June
2028. Risks they do not cover, such as vulnerability handling, must still be
addressed under the CRA.

### What are critical products under the CRA?

Annex IV lists hardware devices with security boxes; smart meter gateways and other devices for advanced security purposes, including secure cryptoprocessing; and smartcards and similar devices, including secure elements. The Commission may
require them to obtain a European cybersecurity certificate at assurance level
at least "substantial"; until it does, they follow the third-party routes for
class II products.

## Read next

- [The map: EU product compliance 2026–2028](/blog/compliance/eu-product-compliance-map),
  every law, date and owner on one page.
- [From RED and EN 18031 to the CRA](/blog/security/red-en-18031-to-cra), for
  radio products that already went through one certification cycle.
- [Running the CRA: an operating model](/blog/compliance/cra-operations),
  where notified-body capacity becomes a launch plan.
- [What the CRA costs](/blog/compliance/cra-costs), for
  the budget line a notified body adds.

## References

Checked on 20 November 2026. The regulation, the implementing regulation and
the Commission's guidance are primary sources; the rest are secondary.

- [_Regulation (EU) 2024/2847, Cyber Resilience Act_](https://eur-lex.europa.eu/eli/reg/2024/2847/oj),
  EUR-Lex. Articles 7, 8, 27, 32, 33; Annexes III, IV and VIII.
- [_Commission Implementing Regulation (EU) 2025/2392_](https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng),
  EUR-Lex, 1 December 2025.
- European Commission,
  [_Commission guidance on the application of Regulation (EU) 2024/2847, C/2026/6013_](https://eur-lex.europa.eu/eli/C/2026/6013),
  Adopted on 27 July 2026 as C(2026) 5252; published in the Official Journal on 17 November 2026. Points 141–151, 247–257.
- European Commission,
  [_Cyber Resilience Act implementation_](https://digital-strategy.ec.europa.eu/en/factpages/cyber-resilience-act-implementation).
  Planned EUCC delegated act.
- Herbert Smith Freehills Kramer,
  [_Cyber Resilience Act: Commission clarifies important and critical product categories_](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories).
- Nemko Digital,
  [_From RED to CRA: what manufacturers need to do next_](https://digital.nemko.com/hubfs/From%20RED%20to%20CRA%20What%20Manufacturers%20Need%20to%20Do%20Next.pdf),
  18 May 2026.

- CRA Evidence,
  [_CRA harmonised standards status_](https://craevidence.com/cra-compliance/harmonised-standards-status),
  as of 17 November 2026.
- CRA Evidence,
  [_CRA for German manufacturers_](https://craevidence.com/blog/cra-german-manufacturers-bsi-guide).
  NANDO status as of 6 November 2026.
- CEN-CENELEC,
  [_CRA Standards Unlocked: smart meter gateways_](https://www.cencenelec.eu/news-events/events/2026/2026-02-23-cra-unlocked-smart-meter-gateways/),
  23 February 2026.

