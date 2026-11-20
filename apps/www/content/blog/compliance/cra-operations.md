---
title: 'Running the Cyber Resilience Act: an operating model'
seoTitle: 'Cyber Resilience Act operations: reporting, records and suppliers'
description: 'The CRA as operations: a 24-hour reporting rota, releases, ten-year records, suppliers, distributors, spare parts and a unit-by-unit plan for December 2027.'
date: 2026-11-20
tags:
  - cyber resilience act
  - cra
  - compliance operations
  - operations
  - supply chain
  - importers and distributors
  - vulnerability reporting
  - connected products
about:
  - name: Cyber Resilience Act, Regulation (EU) 2024/2847
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
  - name: Commission guidance on the application of the Cyber Resilience Act, C/2026/6013
    url: https://eur-lex.europa.eu/eli/C/2026/6013
  - name: European Union Agency for Cybersecurity (ENISA)
    url: https://www.enisa.europa.eu/
---

**Key takeaways**

- The Cyber Resilience Act (CRA) runs on three clocks at once: **hours** for
  reporting exploited vulnerabilities, **releases** for SBOMs and security
  updates, and **years** for support and records. Operations has to run all
  three.
- The 24-hour reporting duty, in force since 11 September 2026, needs a rota,
  not a policy: a named person who decides "aware", at least two people who can
  file on ENISA's platform, and cover for nights, weekends and August.
- Records outlive tools and people: technical documentation and the
  declaration of conformity for **ten years** or the support period if longer,
  each security update available for ten years after it is issued, or for the rest of the support period if longer.
- The transition on **11 December 2027 is per unit**, not per model. Units
  placed on the market from that day must comply; units already supplied
  before it do not, but remain reportable.
- Importers and distributors have their own duties, and become manufacturers if
  they rebrand or substantially modify a product. Identical spare parts are out
  of scope; different ones are not.
- Suppliers are the weak link: in ENISA's 2026 survey only **10%** of
  organisations had mandatory SBOM requirements in supplier contracts.

_Part of a series on EU product compliance for connected-product makers. For
the full calendar and who owns what, start with
[the map](/blog/compliance/eu-product-compliance-map)._

## Why the CRA is an operations problem

Most product rules are met once, at launch: you test the product, write the
file, sign the declaration and ship. The CRA (Regulation (EU) 2024/2847) is
different because most of its duties are processes that run for years after
the sale. Reporting an exploited vulnerability within 24 hours, shipping free
security updates for the support period, keeping documents for a decade,
checking what suppliers send: each of these sits between support, engineering,
sales, purchasing and legal, which is where things fall through.

That makes the CRA an operating-model question as much as a security one. The
CISO owns the security decisions; the [CRA field guide](/blog/security/cra-field-guide)
covers them. Someone still has to own the machinery that makes those decisions
happen on time, every time, for years. In most companies of 20 to 250 people,
that is the COO.

Agenda Digitale put the point well for Italian manufacturers: versions in the
field, vulnerabilities, support and documentation have to be organised now, and
being able to reach your customers turns compliance into an operational
problem as well as a technical one. I build connected products at Ganiga, and
that is where our own work has been hardest. I am not a lawyer; the sources are
at the end.

## Three clocks

The easiest way I have found to explain the CRA to an operations team is as
three clocks running at different speeds.

```tikz The three clocks of the CRA.
% Alt: Three time axes. Hours: the manufacturer becomes aware of an actively exploited vulnerability, then sends an early warning within 24 hours, a notification within 72 hours and a final report later. Releases: every release produces a new SBOM, vulnerability triage, tests, security updates and advisories. Years: each unit is placed on the market, the support period of at least five years runs, and records are kept for ten years or the support period if longer.
\begin{tikzpicture}[lane/.style={font=\footnotesize\bfseries, anchor=east}, tk/.style={font=\scriptsize, anchor=north, align=center}]
  \node[lane] at (-0.25,0) {Hours};
  \draw[flow] (0,0) -- (6.4,0);
  \foreach \x/\t in {0/aware, 1.4/24 h\\early warning, 3.0/72 h\\notification, 5.4/final\\report}{
    \fill[accent] (\x,0) circle (2.4pt);
    \node[tk] at (\x,-0.12) {\t};
  }
  \node[lane] at (-0.25,-1.75) {Releases};
  \draw[flow] (0,-1.75) -- (6.4,-1.75);
  \foreach \x in {0,1.35,2.7,4.05,5.4}{\fill (\x,-1.75) circle (2.4pt);}
  \node[note, anchor=north west] at (-0.1,-1.9) {every release: new SBOM, triage, tests, updates, advisories};
  \node[lane] at (-0.25,-3.25) {Years};
  \draw[flow] (0,-3.25) -- (6.4,-3.25);
  \foreach \x/\t in {0/unit placed\\on the market, 2.9/support ends\\(5 years or more), 5.4/records kept\\(10 years or more)}{
    \fill (\x,-3.25) circle (2.4pt);
    \node[tk] at (\x,-3.37) {\t};
  }
\end{tikzpicture}
```

Each clock needs a different kind of operational answer: an on-call rota for
the first, a release process for the second, an archive and an owner for the
third.

## Clock one: the reporting rota

Since 11 September 2026, a manufacturer that becomes aware of an actively
exploited vulnerability or a severe incident in its product must send an early warning without undue delay and in any event within 24 hours, a notification within 72 hours and a final report later, through ENISA's Single Reporting Platform. The Commission's guidance of
17 November 2026 says a manufacturer becomes aware once an initial assessment
gives it a reasonable degree of certainty, and that the assessment should start
promptly (points 213 and 214).

Three points from that guidance shape the rota:

- **Third-party components.** Reporting is mandatory only if the vulnerability
  is actively exploited in your own product. If it is not exploitable there, or
  has not been exploited, reporting is voluntary, but you must still handle it
  and report it upstream (point 218).
- **Legacy products.** Products already on the market are covered. Exploitation
  known before 11 September 2026 does not have to be reported retroactively,
  but anything discovered after that date is reportable, and reporting
  continues even after the support period ends (points 210 and 217).
- **Users.** You must inform affected users, and where appropriate all users.
  The guidance treats this as risk-based: detail can be limited to affected
  customers first, with wider disclosure once a fix exists (points 219 to 221).

The duty is legal; the 24 hours are logistics. This is the minimum rota I would
set up.

| Role                     | What they do                                                                 | What they need                                                              |
| ------------------------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Signal intake            | Support, sales and engineering forward any report of exploitation at once    | One channel everyone knows, and a rule that "maybe" is forwarded too       |
| Decider                  | Runs the initial assessment and decides when the company is "aware"          | Authority, clear criteria, a deputy                                         |
| Filers, at least two     | Submit the early warning and notification on the Single Reporting Platform   | A personal EU Login with multi-factor authentication, validated in advance; on the platform one primary user is verified first and then invites the others |
| Engineering on call      | Confirms exposure by version, prepares mitigation and fix                    | The SBOM per shipped version and the ability to build an emergency release  |
| Customer communication   | Informs affected users with the mitigation they can apply                    | A list of who runs which version, and pre-agreed message templates         |
| Executive                | Approves public statements and unusual decisions                             | To be reachable, not to be in the critical path                            |

Twenty-four hours include Saturday night and, in Italy, the second half of
August. A rota that works on paper fails when the only filer is on holiday.
Rehearse it: simulate an exploited vulnerability in a shipped product outside
office hours, and time two numbers, from first signal to decision and from
decision to a filed early warning.

The rota has a hidden dependency: **knowing who your users are**. Informing
affected users requires an installed-base register by product and version.
Products sold through distributors and installed by integrators are the hard
case, and it is better to discover that gap in a rehearsal than in an incident.

## Clock two: the release cycle

From 11 December 2027, every release of an in-scope product carries CRA work.
The vulnerability-handling requirements in Annex I, Part II, translate into a
release checklist:

- a software bill of materials (SBOM) for the version, in a machine-readable
  format;
- triage of known vulnerabilities in its components, with the decision recorded;
- regular security testing, reviewed as new threats appear;
- security updates delivered securely, free of charge and without delay, and
  where technically feasible separately from feature updates;
- public disclosure of fixed vulnerabilities once an update is available;
- the risk assessment and technical documentation kept accurate.

For operations, three things follow. **The release calendar needs a
security-only lane** that can ship on short notice without waiting for the next
feature release. **Updates have to reach the field**: where applicable, Annex I asks for automatic security updates by default with an easy opt-out (recital 56 says this may not fit products meant mainly for professional or industrial networks), which assumes devices are connected and
that someone measures how many actually install. And **every supported software
baseline multiplies the work**. For software products that come in substantially modified versions, the CRA lets manufacturers limit the duty to fix vulnerabilities to the latest version, provided users can move to it at no extra cost (Article 13(10); guidance points 129 and 130). Reporting and the other vulnerability-handling duties stay for every version in support. That makes a small number of baselines an
operational goal, not only an engineering preference.

A release can also change the product's legal status. A substantial
modification makes it a new product for CRA purposes. The guidance's test is
whether a change alters the cybersecurity risk in a way the risk assessment did
not consider (point 104); size alone does not decide it (point 107). Security
updates are generally not substantial modifications; a new function that
changes the product's intended purpose generally is (point 108). Put that
question in the release checklist, with engineering and product answering it.

## Clock three: ten-year records

The CRA's retention periods are longer than most tool contracts and many
careers in one company.

| Record                                                         | How long                                                                  | Where in the CRA |
| -------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------- |
| Technical documentation and EU declaration of conformity       | At least ten years after placing on the market, or the support period if longer | Article 13(13)   |
| Each security update, available to users                       | At least ten years after it is issued, or the rest of the support period if longer | Article 13(9)    |
| User information and instructions (Annex II), online included  | At least ten years, or the support period if longer                       | Article 13(18)   |
| Importer's copy of the declaration; access to the documentation | At least ten years, or the support period if longer                       | Article 19(6)    |
| Who supplied you, and whom you supplied                         | Ten years                                                                 | Article 23       |

Add one record the regulation does not list but an authority can ask for: the
trail of each reporting decision, from first signal to filing. From 11 December 2027, under Article 53,
a market surveillance authority can request data and documentation on a
reasoned request. From 9 December 2026 the same records can also become
evidence in civil claims under the new
[Product Liability Directive](/blog/compliance/product-liability-directive-software).

Three operational decisions follow. **Where the archive lives**: somewhere that
survives a change of tools, vendors and cloud accounts. **What goes in per
release**: SBOM, triage decisions, test results, the risk-assessment version
and the published update itself. **Who owns it** when the people who wrote it
have moved on, or when the company is sold. If a manufacturer ceases
operations, its importers and distributors must inform the authorities and, as
far as possible, users (Articles 19(8) and 20(6)); that is worth knowing if
you rely on a small supplier yourself.

## The transition is per unit

EU product law treats placing on the market as something that happens to each
individual unit, the first time it is supplied for distribution or use. The
Commission's guidance repeats it for the CRA (point 11). Under Article 69(2),
units placed on the market before 11 December 2027 need to meet the product
requirements only if they are substantially modified afterwards; units placed
from that date must comply, whatever the launch date of the model.

```tikz The CRA transition happens unit by unit.
% Alt: A time axis with 11 December 2027 marked. Units placed on the market before that date do not have to meet the CRA's product requirements but remain subject to vulnerability reporting. Units placed on or after that date must comply in full, even if the model launched earlier. Stock still in the manufacturer's warehouse has not been placed on the market, so it falls after the date if it ships after it.
\begin{tikzpicture}
  \draw[flow] (0,0) -- (8.2,0);
  \draw[accent, line width=1.2pt] (4.3,-0.35) -- (4.3,0.95);
  \node[tag, anchor=south east] at (4.22,0.6) {11 DEC 2027};
  \foreach \x in {0.4,0.9,1.4,1.9,2.4,2.9,3.4,3.9}{\fill[fill opacity=0.35] (\x,0.35) circle (3pt);}
  \foreach \x in {4.7,5.2,5.7,6.2,6.7,7.2,7.7}{\fill[accent] (\x,0.35) circle (3pt);}
  \node[note, anchor=north, text width=3.8cm, align=center] at (2.15,-0.15) {\textbf{placed before}\\product rules do not apply;\\reporting does};
  \node[note, anchor=north, text width=3.4cm, align=center] at (6.2,-0.15) {\textbf{placed from this day}\\must comply in full,\\whatever the model's age};
  \node[box, font=\scriptsize, text width=2.5cm, anchor=south] at (6.55,0.75) {stock still in your\\warehouse on the day\\falls on this side};
\end{tikzpicture}
```

That turns a regulatory date into a sales-and-operations planning decision,
product by product: make the product compliant before the first unit ships on
or after the date; supply the remaining stock of the old version to
distributors and customers before it and stop production; or discontinue it in the EU. Under the Blue Guide, a unit is placed on the market only when it is finished and an offer or agreement transfers it to a distributor or customer. A transfer on paper while the goods stay in your warehouse, or a move into your own subsidiary, invites a finding that you circumvented the date. Units already with distributors can still be sold after the date, since
they were placed on the market before it. The [guide to CRA costs](/blog/compliance/cra-costs)
covers the cost side of each option.

Software follows the same logic with one twist. According to the guidance, all
copies of a given software version are placed on the market at the same moment,
even if users download them later (point 14), and software a device needs to
work is placed on the market together with the hardware (point 25).

**Spare parts** need their own rule. Spare parts that replace identical
components, made to the same specifications, are outside the CRA, but only when supplied to repair a product already on the market or extend its life; "identical" is judged on
security-relevant characteristics such as cryptography, protocols and access
control, and a non-identical part is in scope (points 96 to 101). If your
service operation substitutes a newer board or module, check it against that
test.

## Your place in the supply chain

The CRA assigns duties by role, and the same company can hold different roles
for different products.

| If you…                                                                  | You are…                     | Main duties                                                                                                     |
| ------------------------------------------------------------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Design or manufacture a product, or have it made, and sell it under your name | Manufacturer                 | Articles 13 and 14: requirements, conformity assessment, CE marking, support period, reporting                  |
| Act in the EU on behalf of a manufacturer, under a written mandate       | Authorised representative    | The tasks in the mandate (Article 18)                                                                           |
| Place a product from a non-EU manufacturer on the EU market              | Importer                     | Article 19: check conformity assessment, documentation, CE marking and instructions; add your contact details; keep the declaration ten years; pass on vulnerabilities; corrective action |
| Make a product available further down the chain                          | Distributor                  | Article 20: due care; check the CE marking and that the manufacturer and importer did their part; act on non-conformity |
| Sell a product under your own name or trademark, or substantially modify it | Manufacturer, by Articles 21 and 22 | All manufacturer duties, for the modified part or the whole product                                             |

Two common cases surprise people. A white-label product sold under your brand
makes you the manufacturer, whoever built it. And a distributor or integrator
that substantially modifies a product, for example by changing its firmware in
ways that alter its security, takes on manufacturer duties for what it changed.

## Suppliers: from questionnaire to contract

Under Article 13(5), manufacturers must exercise due diligence when integrating
third-party components, open source included, and under Article 13(6) report
vulnerabilities they find to the component's maintainer and share fixes. The
guidance adds that third-party software-as-a-service used by your product is
generally not part of the product but is handled like a component, with risk
assessment, assurance artefacts and service-level agreements (points 200, 201,
207 and 208).

In practice this lands on purchasing. ENISA's survey on SBOM adoption, run at the end of 2025 with 334 respondents, found that only 10% had mandatory SBOM requirements in
supplier contracts, 45% said no more than a quarter of their suppliers met their
SBOM requirements, and 61% found supplier SBOM availability and quality quite or
extremely challenging.

What I would add to component and module contracts now:

- an SBOM per delivered version, in CycloneDX or SPDX;
- the component's support end date, and at least twelve months' notice of end
  of life;
- notification to you, within hours, when they learn a vulnerability in their
  component is being actively exploited, so your own 24 hours can start in
  time;
- a commitment on security update delivery, and a vulnerability contact with a
  disclosure policy;
- for components placed on the market separately, the CE marking and declaration
  of conformity once the CRA applies;
- a right to evidence on request, and flow-down of the same terms to their own
  suppliers.

## Conformity assessment is a booking problem

Most products follow self-assessment; the
[classification guide](/blog/compliance/cra-product-classification) explains how
to tell. Important class I products can self-assess only by applying in full harmonised standards, common specifications or an EU cybersecurity certification scheme at level "substantial"; class II and critical products need a third party. As of 20 November 2026 none of those three is available for the CRA, so class I in practice means a notified body too.

As of 6 November 2026, according to secondary sources, the Commission's NANDO database listed no notified body under the CRA and 16 notifying authorities; check NANDO directly before you plan. In Italy, the draft decree implementing the CRA (Atto del Governo 447, sent to Parliament on 9 October 2026) would make ACN both the notifying authority and the market surveillance authority. For any product that needs
a third party, treat the assessment as a capacity booking with an uncertain
lead time, and plan launches in the second half of 2027 around it.
Microenterprises and small enterprises may submit technical documentation in a
simplified form, which notified bodies must accept (Article 33(5)); the form still has to be set by a Commission implementing act.

## The 90-day operating plan

1. **Name the owner** of the CRA operating model, and write down who decides,
   who files, who engineers and who communicates.
2. **Set up the reporting rota**: a decider with a deputy, at least two filers
   registered on the Single Reporting Platform, a cover calendar that includes
   holidays and August.
3. **Rehearse once outside office hours** and record the two times.
4. **Build the installed-base register**: which product and version runs where,
   and how to reach its users.
5. **Add a security-only lane** to the release calendar, and a substantial
   modification check to the release checklist.
6. **Choose the ten-year archive** and define what goes in it per release.
7. **Map your role per product and market**: manufacturer, importer, distributor
   or a mix.
8. **Send suppliers an evidence request** and put the clauses above in every new
   contract.
9. **Plan the 11 December 2027 cut-over** per product with sales and finance,
   including spare parts.
10. **Identify products that need a notified body** and contact candidate bodies
    now.

## Why I am writing this

I write these articles as research: to understand the sector and how companies
actually run compliance day to day. They are also groundwork for a product I
will probably build, to streamline how companies handle their compliance
processes. If that interests you, **[write to me](mailto:me@bernardoforcillo.com?subject=CRA%20for%20COOs)** at
[me@bernardoforcillo.com](mailto:me@bernardoforcillo.com?subject=CRA%20for%20COOs).

_Disclosure: I work on connected products at Ganiga. Nothing is for sale yet._

## Frequently asked questions

### Who should own CRA compliance operationally?

The CRA names no job title. Security decisions, such as when the company is
aware of an exploited vulnerability, sit naturally with the CISO or product
security lead. The machinery that makes those decisions happen on time for years,
including the reporting rota, the release process, supplier evidence and
records, fits the COO in most companies of 20 to 250 people.

### What records must be kept under the CRA, and for how long?

The technical documentation and EU declaration of conformity for at least ten
years after placing on the market, or the support period if longer. Each
security update must stay available for at least ten years after it is issued,
or the rest of the support period if longer. User information must stay
available for the same period, and economic operators must be able to say who
supplied them and whom they supplied for ten years.

### What are importers' and distributors' obligations under the CRA?

Importers must check that the conformity assessment was carried out, that the
documentation, CE marking and instructions exist, add their own contact details,
keep the declaration of conformity for ten years, pass vulnerabilities to the
manufacturer and take corrective action. Distributors must act with due care,
check the CE marking and that the manufacturer and importer met their duties, and
act on non-conformity.

### When does a distributor become a manufacturer under the CRA?

Under Article 21, an importer or distributor becomes a manufacturer when it
places a product on the market under its own name or trademark, or makes a
substantial modification to a product already on the market. Under Article 22,
anyone else who substantially modifies a product and makes it available is also
treated as a manufacturer, for the affected part or the whole product.

### Can distributors keep selling stock after 11 December 2027?

Yes, for units that were placed on the market before that date: placing on the
market happens once per unit, so those units do not have to meet the CRA's
product requirements unless substantially modified. Units first supplied from 11
December 2027 must comply. Stock still in the manufacturer's own warehouse has
not been placed on the market.

### Are there CRA notified bodies yet?

Not as of 6 November 2026, when, according to secondary sources, the Commission's NANDO database listed no notified body under the CRA and 16 notifying authorities. The rules on notified
bodies have applied since 11 June 2026. Manufacturers whose products need
third-party assessment should plan for limited capacity in 2027.

### Must a manufacturer inform customers about an exploited vulnerability?

Yes. Under Article 14, after becoming aware of an actively exploited
vulnerability or a severe incident, the manufacturer must inform impacted users,
and where appropriate all users, including the mitigations they can apply.
According to the Commission's guidance, this can be risk-based, with detail
first limited to affected customers.

## Read next

- [The map: EU product compliance 2026–2028](/blog/compliance/eu-product-compliance-map),
  every law, date and owner on one page.
- [The CRA field guide](/blog/security/cra-field-guide), on the
  reporting duty and the evidence behind it.
- [What the CRA costs](/blog/compliance/cra-costs), for
  the cost of each transition option.
- [Engineering for the CRA](/blog/security/cra-engineering), for the SBOM and
  update architecture behind clock two.
- [NIS2 from the supplier's side](/blog/compliance/nis2-supplier-requirements),
  for what your own customers will ask you.
- [Cybersecurity in the Machinery Regulation](/blog/compliance/machinery-regulation-cybersecurity),
  if you make machinery: its own deadline is 20 January 2027.

## References

Checked on 20 November 2026. The regulation and the Commission's guidance are
primary sources; the rest are secondary.

- [_Regulation (EU) 2024/2847, Cyber Resilience Act_](https://eur-lex.europa.eu/eli/reg/2024/2847/oj),
  EUR-Lex. Articles 13, 14, 18–23, 33, 53, 69; Annex I.
- European Commission,
  [_Commission guidance on the application of Regulation (EU) 2024/2847, C/2026/6013_](https://eur-lex.europa.eu/eli/C/2026/6013),
  Adopted on 27 July 2026 as C(2026) 5252; published in the Official Journal on 17 November 2026. Points 11, 14, 25, 96–109, 129–130,
  200–208, 210–221.
- ENISA,
  [_Single Reporting Platform: frequently asked questions_](https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp/frequently-asked-questions).
- ENISA,
  [_SBOM Adoption State of Play 2026_](https://www.enisa.europa.eu/sites/default/files/2026-06/SBOM%20Adoption%20State%20of%20Play%202026.pdf),
  June 2026. Survey of 334 organisations.
- Schutzwerk,
  [_Legacy products under the Cyber Resilience Act_](https://www.schutzwerk.com/en/blog/cra-bestandsprodukte/).
  Placing on the market per unit.
- European Commission,
  [_Cyber Resilience Act implementation: frequently asked questions_](https://digital-strategy.ec.europa.eu/en/library/cyber-resilience-act-implementation-frequently-asked-questions),
  version 1.4, 4 September 2026. Products already on the market, distributors' stock.
- European Commission,
  [_The "Blue Guide" on the implementation of EU product rules 2022_](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52022XC0629(04)),
  section 2.3. Placing on the market.
- CRA Evidence,
  [_CRA harmonised standards status_](https://craevidence.com/cra-compliance/harmonised-standards-status),
  as of 17 November 2026.
- CRA Evidence,
  [_CRA for German manufacturers_](https://craevidence.com/blog/cra-german-manufacturers-bsi-guide).
  NANDO status as of 6 November 2026.
- Agenda Digitale,
  [_Cyber Resilience Act in Italia: cosa devono preparare le imprese_](https://www.agendadigitale.eu/sicurezza/cyber-resilience-act-in-italia-cosa-devono-preparare-le-imprese/),
  23 October 2026.
- Cybersecurity360,
  [_CRA, il decreto italiano affida ad ACN la vigilanza_](https://www.cybersecurity360.it/news/cra-il-decreto-italiano-affida-ad-acn-la-vigilanza-obblighi-e-nodi-aperti/),
  7 October 2026.
