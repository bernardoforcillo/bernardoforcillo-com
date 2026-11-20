---
title: 'NIS2 from the supplier''s side: questionnaires, contract clauses and CRA evidence'
seoTitle: 'NIS2 supplier requirements for product makers'
description: 'NIS2 binds your customers, and often you too. What supplier questionnaires and clauses ask, Italy''s ACN rules, and how CRA evidence answers them.'
date: 2026-11-20
tags:
  - nis2
  - supply chain security
  - supplier questionnaire
  - cyber resilience act
  - cra
  - acn
  - italy
  - ciso
  - connected products
about:
  - name: NIS2 Directive, Directive (EU) 2022/2555
    url: https://eur-lex.europa.eu/eli/dir/2022/2555/oj
  - name: Commission Implementing Regulation (EU) 2024/2690
    url: https://eur-lex.europa.eu/eli/reg_impl/2024/2690/oj
  - name: Agenzia per la cybersicurezza nazionale (ACN)
    url: https://www.acn.gov.it/
---

**Key takeaways**

- Many makers of connected products are NIS2 entities themselves: NIS2 covers the manufacture of electronics, electrical equipment, machinery and vehicles, so a maker in those sectors that is at least medium-sized has its own duties. All makers meet NIS2 through their customers, who must manage **supply-chain security**,
  including the quality of their suppliers' products and their **secure
  development procedures** (Article 21).
- That obligation reaches suppliers as questionnaires, contract clauses and, in
  Italy, a place on the customer's list of relevant suppliers sent to the
  national agency, ACN.
- In Italy, entities listed in 2025 had to adopt ACN's basic security measures
  by **31 October 2026**, and ACN can verify them from November. Entities listed
  in 2026 have until **31 July 2027**.
- For a product supplier, most questions have an answer in **CRA artefacts**:
  support end date, vulnerability contact and disclosure policy, SBOM on
  request, update policy, product class and the declaration of conformity. Most become CRA duties only on 11 December 2027; offering them now is good practice that customers already reward.
- Build a **trust pack** once and reuse it, instead of answering every
  questionnaire from scratch.
- One exploited vulnerability can trigger **two reports**: yours under the CRA
  and your customer's under NIS2. Align your contractual notification times with
  both.

_Part of a series on EU product compliance for connected-product makers. For
the full calendar and who owns what, start with
[the map](/blog/compliance/eu-product-compliance-map)._

## Your customers are in scope. You may be too.

The NIS2 Directive (Directive (EU) 2022/2555) regulates essential and important
entities: energy, transport, health, water, digital infrastructure, public
administration, waste management, manufacturing of certain products and more.
It does not regulate products, but it does regulate manufacturers. Annex II, point 5, covers the manufacture of computers, electronic and optical products, electrical equipment, machinery and vehicles (NACE C26 to C30). A maker in those sectors with at least 50 staff, or more than €10 million in both turnover and balance sheet, is an important entity. In Italy that means registering on ACN's platform, adopting the basic security measures and notifying significant incidents to CSIRT Italia. One exploited vulnerability can then produce three reports: yours under the CRA, yours under NIS2, and your customer's. Smaller makers, and makers outside those sectors, stay outside direct scope; the rest of this article applies to everyone.

But NIS2 requires every entity in scope to manage the security of its supply
chain. In Italy alone, the provisional 2026 list counted more than 21,000
entities, at least 5,000 of them essential, according to figures from ACN
reported in April 2026. Each of them has suppliers, and from November 2026 those listed in 2025 can be checked on how they manage them. That is how NIS2 arrives at a
supplier: not as a law, but as a customer's requirement.

I build connected products at Ganiga, and our customers include organisations
in NIS2 sectors, so this is how NIS2 reaches us. I am not a lawyer; the sources
are at the end.

## What NIS2 asks your customers about you

Article 21(2) lists the minimum cybersecurity risk-management measures. Two of
them concern suppliers directly:

- **supply chain security**, including the security-related aspects of the
  relationship between the entity and its direct suppliers or service providers
  (point d);
- **security in the acquisition, development and maintenance** of network and
  information systems, including vulnerability handling and disclosure (point
  e).

Article 21(3) then says what "appropriate" means for the supply chain: entities
must take into account the vulnerabilities specific to each direct supplier, and
the overall quality of products and cybersecurity practices of their suppliers,
including their secure development procedures. That last phrase is the bridge to
the Cyber Resilience Act: secure development procedures are exactly what the
CRA requires manufacturers to have and to document.

For certain digital infrastructure and digital service providers, such as cloud, data centre, managed service and managed security service providers, Implementing
Regulation (EU) 2024/2690 spells this out: a supply chain security policy
(section 5.1), a directory of suppliers (5.2), security in the acquisition of
ICT services or products (6.1) and a secure development life cycle (6.2).
Two points are worth reading in full, because customers copy them into contracts: point 5.1.4 lists what supplier contracts should cover, such as cybersecurity requirements, staff skills and background checks, and incident notification; point 6.1.2 asks entities to require security updates throughout a product's lifetime and information on its hardware and software components. ENISA's technical implementation guidance adds examples of evidence. Other entities get the same logic through national rules.

## Italy: ACN's rules and dates

Italy transposed NIS2 with Legislative Decree 138/2024, with ACN as the
competent authority. ACN's determinations turn the directive into specific
measures and deadlines.

| What                                                                   | Rule                                                                 | Date                                                                                   |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Basic security measures: 37 measures and 87 requirements for important entities, 43 and 116 for essential ones | ACN Determination 379907/2025 | 18 months from notice of listing: by 31 October 2026 for entities listed in 2025; by 31 July 2027 for 2026 entrants |
| Notification of significant incidents to CSIRT Italia                  | Legislative Decree 138/2024                                          | Since January 2026 for entities listed in 2025; from 1 January 2027 for 2026 entrants |
| Annual list of relevant suppliers on the ACN platform                  | ACN Determination 127437 of 13 April 2026                            | Every year between 15 April and 31 May                                                 |
| Verification and inspections                                           | ACN                                                                  | From November 2026 for entities listed in 2025                                         |

The supplier measures sit in the governance category GV.SC of Italy's national
framework. According to Eulogika's guide, they require an entity to involve the
security function in procurement and set requirements based on risk (GV.SC-01),
keep an inventory of suppliers with potential security impact (GV.SC-04), put
security requirements into tenders and contracts and document any exceptions
(GV.SC-05), and assess and periodically check the risk of each supply (GV.SC-07).
An inventory of IT services provided by suppliers, cloud included, sits under
ID.AM-04.

The **relevant supplier list** deserves attention. According to the same guide,
a supplier is relevant if it provides one of the ICT services listed in the
decree, such as cloud, data centre, managed services or managed security
services, or if it is non-fungible: its interruption would significantly affect
the entity's services. The list includes the supplier's name, tax code,
registered office, procurement codes and the reason it is relevant. A maker
whose devices and cloud run part of a customer's service can end up on it.

## What lands on your desk

The questions vary by customer, but they cluster. Eulogika lists the typical
ones; the right-hand column is where a product supplier can find the answer.

| What the customer asks                                                    | Where the answer comes from                                                                            |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Are you ISO/IEC 27001 certified? For what scope?                          | Your organisation's ISMS, if you have one. The CRA does not replace it, but covers the product side   |
| How do you manage vulnerabilities, and how fast do you ship critical fixes? | CRA Annex I, Part II: disclosure policy, vulnerability contact, SBOM, triage, free security updates, advisories |
| How long will you support this product?                                   | The support end date you must state at purchase under CRA Article 13(19), from 11 December 2027 |
| Within what time will you tell us about an incident affecting us?         | Your CRA Article 14 process, which requires informing affected users of an exploited vulnerability or severe incident, without a fixed deadline (Article 14(8)); incidents in your own IT are not covered, so agree those by contract. If you process personal data for the customer, GDPR Article 33(2) already applies |
| How does your staff access our systems?                                   | For the product: CRA access control and logging; for remote maintenance: your operational procedures  |
| What are your RTO and RPO, and when did you last test recovery?           | Mostly operational, not a CRA artefact. The CRA asks only that essential functions stay available and resist denial of service (Annex I, Part I, point 2(h)), and covers a cloud back end only if it is the product's remote data processing |
| Do you use subcontractors, and under what security requirements?          | Your CRA due diligence on third-party components (Article 13(5)); for services and subcontractors, your own contracts                          |
| How is data returned and deleted at the end of the contract?              | CRA secure erasure; Data Act export where it applies                                                    |
| Can we have an SBOM?                                                      | The SBOM you keep per version under CRA Annex I, Part II, shared under NDA                              |
| How do you develop securely?                                              | Your CRA risk assessment and secure development process; standards you follow                          |
| Is the product CE marked for cybersecurity?                               | The EU declaration of conformity under the CRA from 11 December 2027; until then, RED and EN 18031 where they apply |

The pattern is clear. NIS2 customers ask organisational questions and product
questions in the same questionnaire. An ISO 27001 certificate answers the first
kind; the CRA file answers most of the second. A supplier that has done the CRA
work has most of the product answers already, and a supplier that has not will
find the questionnaires are a preview of what the CRA asks.

## Contract clauses to expect

Questionnaires become clauses. These are the ones I see most often, with a
position that is consistent with the CRA.

- **Incident and vulnerability notification within a fixed time.** Customers
  under NIS2 have 24 hours to send an early warning about a significant incident.
  Your CRA clock is also 24 hours from awareness. Commit to notifying affected
  customers promptly after you become aware, and make sure the clause defines
  awareness the way your CRA process does.
- **Audit rights or evidence on request.** Offer evidence first: the trust pack
  below, SBOMs under NDA, test summaries. Reserve on-site audits for high
  criticality.
- **Vulnerability management service levels.** Tie them to severity and to your
  disclosure policy, and to the support period you have published.
- **End-of-support notice.** You already have to publish the support end date;
  commit to it contractually.
- **Subcontracting.** List the cloud and component suppliers that matter, and
  flow down the same requirements.
- **Data return and deletion.** Point to the product's secure erase function and
  your export format.

## One incident, two reports

When a vulnerability in your product is actively exploited at a customer that is
a NIS2 entity, two reporting duties can run in parallel.

```tikz One exploited vulnerability, two reporting duties.
% Alt: An actively exploited vulnerability in the supplier's product at a NIS2 customer. The supplier, as manufacturer, reports under CRA Article 14 through ENISA's Single Reporting Platform to the coordinating CSIRT and ENISA: early warning within 24 hours, notification within 72 hours, final report later; and informs affected users, including the customer. The customer, if the incident is significant, reports under NIS2 Article 23 to its CSIRT, in Italy CSIRT Italia: early warning within 24 hours, notification within 72 hours, final report within one month. A proposed single entry point under the Digital Omnibus is not adopted.
\begin{tikzpicture}[side/.style={box, text width=3.3cm, align=left, font=\scriptsize}]
  \node[hot, text width=4.8cm, font=\footnotesize] (v) at (2.1,0) {\textbf{Your product is exploited}\\{\scriptsize at a customer in a NIS2 sector}};
  \node[side, anchor=north] (you) at (-0.35,-1.25) {\textbf{You, the manufacturer}\\[2pt]CRA Article 14, through ENISA's platform: 24 h, 72 h, final report\\[2pt]inform affected users};
  \node[side, anchor=north] (cust) at (4.55,-1.25) {\textbf{Your customer}\\[2pt]NIS2 Article 23, if significant: 24 h, 72 h, one month\\[2pt]in Italy, to CSIRT Italia};
  \draw[flow] ([xshift=0.5cm]v.south west) -- (you.north);
  \draw[flow] ([xshift=-0.5cm]v.south east) -- (cust.north);
  \draw[flow, accent, line width=1pt] (you.east) -- node[note, above, align=center] {notice} node[note, below, align=center] {per\\contract} (cust.west);
\end{tikzpicture}
```

The reports go to different places under different laws, but they describe the
same event, and both start from a moment of awareness. Two practical
consequences: your notice to the customer is what starts, or speeds up, their
NIS2 clock, so it should be fast and factual; and the facts in your CRA
notification and in their NIS2 notification should not contradict each other.

The Commission's Digital Omnibus proposal of November 2025 would create a single
entry point for incident reports under NIS2, the GDPR and other laws. The
Council's mandate of 21 October 2026 prefers national entry points instead.
Nothing is adopted, and today the two reports are separate.

## Build the trust pack once

The cheapest answer to a hundred questionnaires is one well-kept pack. This is
what I would put in it for each product, most of it a by-product of CRA work:

1. **Product security summary**: intended use, CRA class, support end date,
   update policy, how updates are delivered.
2. **Vulnerability disclosure policy and contact**, with the advisories page.
3. **SBOM per supported version**, shared under NDA.
4. **Notification commitment**: how and how fast you inform customers of
   exploited vulnerabilities and incidents.
5. **Secure development statement**: your process, the standards you follow,
   and how the risk assessment is kept current.
6. **Certifications and test summaries**: ISO 27001 if you have it, RED and EN
   18031 for radio products, penetration test summaries.
7. **Cloud and service facts**: hosting regions, key subcontractors, recovery
   objectives, data export and deletion.
8. **The EU declaration of conformity**, from 11 December 2027.
9. **Pre-approved answers** to the usual questionnaire categories, and
   pre-approved positions on the usual clauses.

Keep it versioned like the product. A pack that describes last year's firmware
is worse than none.

## What I would do this quarter

1. **Collect every questionnaire** received this year and group the questions
   by the table above.
2. **Ask your top customers** whether you are on their relevant supplier list
   for ACN, and what they expect from you because of it.
3. **Publish the basics**: a vulnerability contact, a disclosure policy and
   support end dates.
4. **Build the first version of the trust pack** for your main product, using
   CRA work already done or planned.
5. **Align notification clauses** with your CRA reporting process and your
   customers' NIS2 clock.
6. **Name one owner** for questionnaires, so answers stay consistent.

The [CRA field guide](/blog/security/cra-field-guide) covers the CRA
reporting process, and the [CRA operating model](/blog/compliance/cra-operations)
covers the supplier evidence you should be asking for in turn.

## Why I am writing this

I write these articles as research: to understand the sector and how companies
actually run compliance day to day. They are also groundwork for a product I
will probably build, to streamline how companies handle their compliance
processes. If that interests you, **[write to me](mailto:me@bernardoforcillo.com?subject=NIS2%20suppliers)** at
[me@bernardoforcillo.com](mailto:me@bernardoforcillo.com?subject=NIS2%20suppliers).

_Disclosure: I work on connected products at Ganiga. Nothing is for sale yet._

## Frequently asked questions

### Does NIS2 apply to product manufacturers?

Directly, if the manufacturer is itself an essential or important entity, and many are: Annex II covers the manufacture of electronics, electrical equipment, machinery and vehicles (NACE C26 to C30), so a maker in those sectors that is at least medium-sized is an important entity. Every maker is also affected as a supplier: NIS2 requires their customers to manage supply-chain
security, so customers send questionnaires and add security clauses to
contracts.

### What does NIS2 require about supply chain security?

Article 21(2)(d) requires entities to address supply chain security, including
the security aspects of relationships with direct suppliers. Article 21(3)
requires them to take into account each supplier's vulnerabilities and the
overall quality of suppliers' products and cybersecurity practices, including
their secure development procedures.

### What do NIS2 customers usually ask their suppliers?

Typical questions cover ISO 27001 certification, vulnerability management and
patch times, staff access to customer systems, incident notification times,
recovery objectives, subcontractors, and data return and deletion at the end of
the contract. Product suppliers are increasingly asked for SBOMs and support
periods.

### What is a relevant supplier under Italy's NIS rules?

Under ACN Determination 127437 of 13 April 2026, NIS entities communicate their
relevant suppliers to ACN every year between 15 April and 31 May. A supplier is
relevant if it provides an ICT service listed in the decree, such as cloud, data
centre or managed security services, or if it is non-fungible, meaning its
interruption would significantly affect the entity's services.

### How does the CRA help with NIS2 supplier requirements?

The CRA requires manufacturers to have and document what NIS2 customers ask
about products: a support period with a stated end date, a vulnerability contact
and disclosure policy, an SBOM, free security updates, a secure development
process and, from December 2027, a declaration of conformity. That evidence can
be packaged once and reused across customers.

### If my product is exploited at a NIS2 customer, who reports what?

You, as manufacturer, report the actively exploited vulnerability under CRA
Article 14 through ENISA's Single Reporting Platform and inform affected users.
Your customer, if the incident is significant, reports it under NIS2 Article 23
to its CSIRT, in Italy CSIRT Italia. Both start with a 24-hour early warning. If you are a NIS2 entity yourself and the event is a significant incident for you, you report under NIS2 too.

### When were NIS2 basic security measures due in Italy?

For entities on the NIS list since 2025, within eighteen months of the notice of
listing, which put the last deadline at 31 October 2026; ACN can verify from
November 2026. Entities listed for the first time in 2026 have until 31 July
2027.

## Read next

- [The map: EU product compliance 2026–2028](/blog/compliance/eu-product-compliance-map),
  every law, date and owner on one page.
- [The CRA field guide](/blog/security/cra-field-guide), including
  the buyer's view of CRA evidence.
- [Running the CRA: an operating model](/blog/compliance/cra-operations),
  for the evidence you should ask your own suppliers for.
- [Data Act access by design meets the CRA](/blog/compliance/data-act-access-by-design),
  for the data export and deletion questions.
- [One product, many laws: one evidence base](/blog/compliance/one-evidence-base),
  for building the trust pack from one foundation.

## References

Checked on 20 November 2026. The directive and implementing regulation are
primary sources; Italian rules are cited through secondary sources that quote
the ACN determinations.

- [_Directive (EU) 2022/2555, NIS2_](https://eur-lex.europa.eu/eli/dir/2022/2555/oj),
  EUR-Lex. Articles 21 and 23.
- [_Commission Implementing Regulation (EU) 2024/2690_](https://eur-lex.europa.eu/eli/reg_impl/2024/2690/oj),
  EUR-Lex. Annex, sections 5 and 6.
- [_Regulation (EU) 2024/2847, Cyber Resilience Act_](https://eur-lex.europa.eu/eli/reg/2024/2847/oj),
  EUR-Lex. Articles 13 and 14; Annex I.
- DLA Piper,
  [_NIS2 Directive explained, part 3: supply chain security_](https://www.dlapiper.com/en/insights/publications/2025/12/nis2-directive-explained-part-3-supply-chain-security),
  4 December 2025.
- Eulogika,
  [_Qualifica fornitori NIS2: guida pratica alle misure ACN_](https://www.eulogika.net/blog/qualifica-fornitori-nis2-guida-pratica/).
  GV.SC measures, relevant suppliers and typical questions.
- Planetel,
  [_NIS2 scadenze 2026: chi è obbligato e come adeguarsi_](https://www.planetel.it/2026/08/nis2-scadenze-2026/).
  Determination 379907/2025 and deadlines.
- Aruba Magazine,
  [_NIS2, misure di sicurezza di base: la checklist per il 31 ottobre 2026_](https://www.aruba.it/magazine/security/nis2-misure-sicurezza-base-acn.aspx).
- Hackita,
  [_NIS2: obblighi, requisiti e scadenze 2026_](https://hackita.it/articoli/nis2/).
  Deadlines for 2025 and 2026 entrants.
- Aimazing,
  [_NIS2 in Italia: obblighi, scadenze ACN e cosa cambia per le PMI_](https://aimazing.it/blog/nis2-in-italia-obblighi-scadenze-acn-e-cosa-cambia-per-le-pmi).
  ACN figures on the 2026 provisional list.
- Regreportingdesk,
  [_Digital Omnibus incident reporting: the Council mandate_](https://regreportingdesk.com/digital-omnibus-incident-reporting-national-entry-point/).
