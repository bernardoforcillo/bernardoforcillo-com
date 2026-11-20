---
title: 'Engineering for the Cyber Resilience Act: Annex I, SBOMs and an evidence pipeline'
seoTitle: 'CRA engineering: Annex I requirements and SBOM'
description: 'Cyber Resilience Act engineering: Annex I as requirements, a CRA-grade SBOM, updates, the cloud back end in scope and the technical file as a build output.'
date: 2026-11-20
tags:
  - cyber resilience act
  - cra
  - security engineering
  - annex i
  - sbom
  - vex
  - secure by design
  - product security
  - connected products
about:
  - name: Cyber Resilience Act, Regulation (EU) 2024/2847
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
  - name: Commission guidance on the application of the Cyber Resilience Act, C/2026/6013
    url: https://eur-lex.europa.eu/eli/C/2026/6013
  - name: BSI TR-03183, Cyber Resilience Requirements for Manufacturers and Products
    url: https://www.bsi.bund.de/dok/TR-03183-en
---

**Key takeaways**

- Annex I of the Cyber Resilience Act (CRA) is a requirements list: **13
  product properties** and **8 vulnerability-handling duties**. Treat each as a
  requirement with an owner, a control, a test and an evidence artefact.
- No CRA harmonised standard is cited in the Official Journal as of 17 November
  2026. Build against Annex I directly and use EN 18031, IEC 62443 or ETSI EN
  303 645 work as supporting evidence.
- The SBOM must be machine-readable and cover at least top-level dependencies.
  No format is mandated; Germany's **BSI TR-03183-2** accepts CycloneDX 1.6+ or
  SPDX 3.0.1+, and ENISA found CycloneDX used by **44%** of organisations.
- Your cloud back end is part of the product when the product cannot perform one of its functions without it and you designed it or had it developed under your responsibility. Third-party SaaS is not, but is handled like a
  component.
- Updates become a product feature: automatic by default where applicable, with an opt-out,
  security fixes separate where feasible, free, and each kept available for ten years or the rest of the support period if longer.
- Make evidence a build output. Every release should produce its SBOM, triage
  decisions, test results and an updated risk assessment without anyone
  assembling them by hand.

_Part of a series on EU product compliance for connected-product makers. For
the full calendar and who owns what, start with
[the map](/blog/compliance/eu-product-compliance-map)._

## The CTO's version of the CRA

The CRA (Regulation (EU) 2024/2847) is usually summarised for executives as
deadlines and fines. For an engineering organisation it is something more
familiar: a set of non-functional requirements, a definition of done for every
release, and a documentation duty that lasts as long as the product is
supported.

The reporting duty has applied since 11 September 2026 and is covered in the
[CRA field guide](/blog/security/cra-field-guide). Everything in this
article applies from 11 December 2027, to every unit placed on the market from
that day. That leaves about one product cycle to change how products are built,
which is why the work starts now.

The Commission's guidance on applying the CRA, adopted on 27 July 2026 as C(2026) 5252 and published in the Official Journal on 17 November 2026 as C/2026/6013, settles several engineering questions that the regulation left open: where the product ends in the cloud, when an update
is a new product, and how far risk acceptance can go. I cite it by point number
throughout. I build connected products at Ganiga, with firmware, a mobile app
and a cloud back end, so these questions are ours too. I am not a lawyer; the
sources are at the end.

## Annex I as a requirements table

Annex I, Part I starts with a general rule: products must be designed,
developed and produced to ensure a level of cybersecurity appropriate to the
risks. Point 2 then lists thirteen properties, which apply on the basis of the
risk assessment. Part II lists eight vulnerability-handling duties that apply
for the whole support period. This is how I translate them for an engineering
team.

| Annex I                                   | What it means in engineering                                                                 | Evidence artefact                                     |
| ----------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| I.2(a) No known exploitable vulnerabilities | A release gate: known vulnerabilities in the shipped artefact are fixed or triaged          | SBOM and triage record for the release                |
| I.2(b) Secure by default, with reset      | No default credentials, minimal services enabled, factory reset restores a secure state      | Configuration baseline and its test                   |
| I.2(c) Security updates                   | Signed updates, installed automatically by default where applicable, with an easy opt-out or postponement | Update architecture description and test              |
| I.2(d) Protection from unauthorised access | Authentication and authorisation on every interface, device, app and API                    | Threat model, access-control tests, penetration test  |
| I.2(e) Confidentiality                    | Encryption of data in transit and at rest, where the risk assessment calls for it            | Cryptography inventory                                |
| I.2(f) Integrity                          | Secure boot, signed firmware, integrity of commands and configuration, report corruption     | Boot chain description and tests                      |
| I.2(g) Data minimisation                  | Collect and keep only the data the intended purpose needs                                     | Data inventory, shared with the Data Act and GDPR work |
| I.2(h) Availability of essential functions | Resilience to denial of service; degraded but safe modes                                    | Load and fault tests                                  |
| I.2(i) Not harming other devices or networks | No amplification, sane retry and back-off behaviour                                        | Network behaviour tests                               |
| I.2(j) Limited attack surface             | Closed ports; debug interfaces such as JTAG or UART consoles disabled or locked on production units | Port scan and hardware review                         |
| I.2(k) Reduced impact of exploitation     | Least privilege, process isolation, compiler and OS hardening                                | Build configuration                                   |
| I.2(l) Security logging and monitoring    | Logs of security-relevant events, with a user opt-out                                         | Logging specification                                 |
| I.2(m) Secure erase and transfer          | Users can permanently remove data and settings, and move data where relevant                  | Erase test                                            |
| II.1 Identify components and vulnerabilities | An SBOM for each version, at least top-level dependencies                                  | SBOM in the technical file                            |
| II.2 Remediate without delay              | Fix fast; ship security updates separately from features where technically feasible           | Update history                                        |
| II.3 Regular testing                      | Security tests and reviews, refreshed as threats change                                       | Test plan and results                                 |
| II.4 Disclose fixed vulnerabilities       | Public advisories once an update is available                                                 | Advisories                                            |
| II.5 Coordinated disclosure policy        | A published policy                                                                            | Policy page                                           |
| II.6 Contact address                      | A way to report vulnerabilities                                                               | `security.txt` or equivalent                          |
| II.7 Secure distribution of updates       | Authenticated delivery channel, signing keys protected                                        | Release signing procedure                             |
| II.8 Free, timely updates with advisories | No charge for security updates; users told what changed and what to do                        | Release notes and advisories                          |

Two points from the guidance change how that table is used. Residual risk is
judged against these requirements, not against the company's risk appetite or
cost (point 158), and risks cannot be pushed onto users or third parties that
the design leaves unaddressed (point 161). On the other hand, designs that
predate the CRA can be placed on the market without a redesign if the risk
assessment shows the measures are adequate (points 33 to 36). The table is a
test of evidence, not an order to rebuild.

## Standards: build to Annex I, not to a citation

A harmonised standard cited in the Official Journal gives a presumption of
conformity. As of 17 November 2026 none is cited for the CRA. EN 40000-1-1, the
vocabulary, and EN 40000-1-2, on principles, risk management and lifecycle, were
ratified on 2 November and published by CEN on 18 November 2026, but are not
expected to be cited. EN 40000-1-3, on vulnerability handling, is still under approval, due by 30 November 2026, and is the only EN 40000-1 part for which CEN expects a citation in the Official Journal. On 10 November the Commission amended the standardisation request M/606 (C(2026) 7861), with new deadlines of 30 November 2026 for the two horizontal standards due this year (risk-based design and vulnerability handling) and 31 January 2027 for vertical ones; the other horizontal standards remain due by 30 October 2027. Vertical
standards for important and critical product categories are being written in
parallel.

For engineering, that means three things:

- **Design against Annex I itself**, and record in the risk assessment how each
  requirement is met, or why it does not apply.
- **Reuse what you already have.** If you certified radio products against EN
  18031 for the RED delegated act, which has applied since August 2025, you have
  covered much of the ground of Part I, as the
  [deep dive on RED](/blog/security/red-en-18031-to-cra) maps out. The EN 40000 work builds on EN 18031.
  The RED delegated act is repealed from 11 December 2027, when the CRA takes
  over. EN 18031 does not cover Part II, so the SBOM and vulnerability handling
  are new work.
- **Check the class.** The [classification guide](/blog/compliance/cra-product-classification)
  covers the test in detail. Important class I products can self-assess only by applying in full harmonised standards, common specifications or an EU cybersecurity certification scheme at level "substantial" or higher (Article 32(2)). None of the three is available yet, so for now they need a notified body, and as of 6 November 2026, according to secondary sources, NANDO listed none under the CRA.
  The technical descriptions of each category are in Implementing Regulation
  (EU) 2025/2392.

## Where the product ends: devices, apps and clouds

Under the CRA, remote data processing is part of a product when the
manufacturer designed or developed the software and its absence would prevent
the product from performing one of its functions. The guidance turns that into
a three-part test: processing at a distance, a product function that depends on
it, and software the manufacturer designed or had developed under its
responsibility (points 184 to 202).

```tikz Where a connected product ends under the CRA.
% Alt: The product boundary includes the device and its firmware, the companion mobile app and the manufacturer's own cloud back end, even when it runs on third-party infrastructure. Outside the boundary but handled like components: third-party SaaS the product relies on and the infrastructure provider. Outside and not part of the product: internal IT, the CI/CD pipeline and test systems.
\begin{tikzpicture}[part/.style={box, text width=2.0cm, font=\footnotesize}, ext/.style={box, text width=2.5cm, font=\footnotesize, dashed}]
  \node[part] (dev) at (0,0) {\textbf{Device}\\{\scriptsize firmware}};
  \node[part] (app) at (2.65,0) {\textbf{Mobile app}};
  \node[part] (rdp) at (5.3,0) {\textbf{Your cloud back end}\\{\scriptsize even on rented IaaS}};
  \draw[accent, line width=1pt, rounded corners=8pt] (-1.35,-0.85) rectangle (6.7,1.05);
  \node[tag, anchor=south west] at (-1.35,1.1) {THE PRODUCT};
  \node[ext] (saas) at (1.0,-2.2) {\textbf{Third-party SaaS}\\{\scriptsize handled like a component}};
  \node[ext] (ci) at (4.5,-2.2) {\textbf{CI/CD, internal IT}\\{\scriptsize not part of the product}};
  \draw[flow] (rdp.south) -- node[note, above left=0pt and 1pt, pos=0.7] {uses} (saas.north east);
\end{tikzpicture}
```

The guidance's examples are useful. A smart thermostat whose manufacturer-written
back end runs on a third-party cloud provider: the back end is remote data
processing and part of the product (section 8.3.2). A device that stores files
in a third-party SaaS: not remote data processing, but treated as a component,
with risk assessment, assurance artefacts and service-level agreements (points
200, 201, 207 and 208). Internal IT, CI/CD and test systems are excluded (point
182). Web applications accessed only through a browser are not products on that
basis alone (point 21).

For a typical connected product, then, the firmware, the companion app and the
manufacturer's own API are one product for the CRA: one risk assessment, one
SBOM scope, one release discipline. If the cloud team runs on a different
process from the firmware team, that is the first organisational fix. The
technical documentation must also state any remote data processing and
third-party remote solutions the product uses (point 204).

## The SBOM that survives an audit

Annex I, Part II, point 1 asks manufacturers to identify and document the
components and vulnerabilities in the product, including by drawing up an SBOM
in a commonly used, machine-readable format covering at least the top-level
dependencies. It goes in the technical documentation; it does not have to be
published, although Annex II lets users be told where to find it if the
manufacturer chooses to provide it. Article 13(24) allows the Commission to
specify the format by implementing act; none has been adopted.

Until then, the most detailed public reference is Germany's BSI TR-03183-2,
which accepts CycloneDX 1.6 or later and SPDX 3.0.1 or later, in JSON or XML, and expects dependencies to be resolved recursively rather than only at the top level.
ENISA's 2026 survey of 334 organisations shows where practice is: 78% have
started on SBOMs but only 9% are mature and fully automated; CycloneDX is used
by 44%, SPDX by 29%; 39% generate SBOMs during the build. The hard parts are
completeness (62% find it quite or extremely difficult), supplier SBOMs (61%)
and matching vulnerabilities to components (58%). The Linux Foundation's 2026
readiness report found 32% producing SBOMs for all products, unchanged from
2025.

What makes an SBOM useful as evidence, in my experience:

- **Generate it in the build, then check it against the shipped artefact.** Repository manifests miss things; a binary scan of what you actually ship catches vendor SDKs, binary blobs and statically linked libraries. For firmware, that means the image you flash.
- **One per released version**, stored with the release and never edited
  afterwards.
- **Go deeper than top-level where you can**, because exploitability is
  usually decided in transitive dependencies.
- **Match it again every day, not only at release.** New vulnerabilities are published after you ship, so every SBOM still in support has to be re-matched continuously.
- **Record triage decisions next to it.** An SBOM produces alerts; the evidence
  is the decision about each one, who made it and why.

That last point is where VEX statements help. OpenVEX and CycloneDX both record a status such as `not_affected` with a justification, but their vocabularies differ: OpenVEX says `vulnerable_code_not_in_execute_path`, CycloneDX says `code_not_reachable`. Pick one format, map the other at the boundary with suppliers, and publish advisories in CSAF if your customers consume them. Either way, a machine-readable decision with a reason is the evidence that survives an audit years later.

```tikz The evidence pipeline: what each release should produce.
% Alt: A vertical pipeline. Source and dependencies are built into the shipped artefact; the build generates the SBOM from the artefact; vulnerabilities are matched against the SBOM; a person triages each match and records a decision with a justification; a release gate checks that no known exploitable vulnerability remains; the release ships with signed updates and advisories; everything is filed in the technical file for that version.
\begin{tikzpicture}[node distance=0.42cm, st/.style={box, text width=3.3cm, font=\footnotesize}, side/.style={note, anchor=west, text width=3.4cm}]
  \node[st] (a) {Build the shipped artefact};
  \node[st, below=of a] (b) {Generate the SBOM from it};
  \node[st, below=of b] (c) {Match known vulnerabilities};
  \node[hot, text width=3.3cm, font=\footnotesize, below=of c] (d) {\textbf{A person triages}};
  \node[st, below=of d] (e) {Release gate};
  \node[st, below=of e] (f) {Signed update and advisory};
  \node[st, below=of f] (g) {File it, per version};
  \foreach \u/\v in {a/b, b/c, c/d, d/e, e/f, f/g}{\draw[flow] (\u) -- (\v);}
  \node[side] at ([xshift=0.3cm]b.east) {CycloneDX or SPDX, per version};
  \node[side] at ([xshift=0.3cm]d.east) {affected, not affected, fixed: with a reason};
  \node[side] at ([xshift=0.3cm]e.east) {Annex I.2(a): no known exploitable vulnerabilities};
  \node[side] at ([xshift=0.3cm]g.east) {kept ten years or the support period};
\end{tikzpicture}
```

## Updates are a product feature now

Annex I asks, where applicable, for security updates to be installed automatically by default, with a clear way to opt out (Part I, point 2(c)); recital 56 says this should not apply to products mainly integrated as components or used in professional ICT networks, especially critical and industrial ones, where the operator controls the timing; delivered securely (Part II, point
7); free of charge and without delay, with advisory messages (Part II, point 8);
and, where technically feasible, separately from feature updates (Part II, point
2). Article 13(9) adds that each security update must stay available for at
least ten years after it is issued, or the rest of the support period if longer.

The architecture this implies is familiar but has to be complete: signed images with signing keys kept in a hardware security module and a plan to rotate them, a hardware root of trust on the device, rollback on failed installs but anti-rollback protection against downgrades to vulnerable versions, cryptography you can replace within a ten-year support period, a security channel that can
ship without the next feature release, staged rollouts, and a way to know how
much of the fleet has installed an update. That last part has to respect data
minimisation and the logging opt-out, so measure installation, not behaviour.

Two rules reward a simple update strategy. For software products that come in substantially modified versions, the duty to fix vulnerabilities (Annex I, Part II, point 2) can be limited to the latest version, provided users can move to it at no extra cost, which rules out an upgrade that needs new hardware (Article 13(10); guidance points 129 and 130). Reporting and the other vulnerability-handling duties stay for every version in support.
And a security update is generally not a substantial modification; new
functionality that changes the product's intended purpose generally is, and the
test is whether the change alters the cybersecurity risk in a way the risk
assessment did not consider (points 104 to 109). Even a small "remember me"
login option can qualify if it adds risk the assessment never covered (example
44). Put that question in your pull-request and release templates.

## The technical file as a build output

Annex VII lists what the technical documentation must contain: a description of
the product and its design, the risk assessment, the vulnerability-handling
process, the SBOM, the standards or solutions applied, test reports and more. It
must be kept for ten years or the support period, and kept accurate as the
product changes. Written once in a word processor, it starts ageing on the next
commit. It can also end up in court: under the new
[Product Liability Directive](/blog/compliance/product-liability-directive-software),
a judge can order evidence to be disclosed, and a refusal lets the court presume
the product defective.

The approach I prefer treats it like code: structured files in the repository,
generated or checked by the pipeline, reviewed in pull requests. A layout along
these lines works for us:

```text
compliance/
  product.yaml            # class, intended purpose, support end date, conformity route
  annex-i.yaml            # one entry per requirement: applies, why, control, test, evidence
  risk-assessment.md      # method, threats, residual-risk decisions
  remote-processing.md    # back ends and third-party services, with the scope decision
  releases/
    2.4.0/
      sbom.cdx.json       # generated by the build from the shipped image
      triage.yaml         # one decision per known vulnerability, with justification
      tests/              # results, linked to annex-i.yaml entries
      advisory.json       # advisory for vulnerabilities fixed in this release
```

Each Annex I entry carries the chain an authority must be able to follow, from
requirement to control to test to evidence:

```yaml
- id: I.2.b
  requirement: Secure by default configuration, with reset to the original state
  applies: true
  control: No default credentials; onboarding forces a unique credential
  test: tests/onboarding/default-credentials.spec.ts
  evidence: releases/{version}/tests/onboarding.xml
  owner: firmware-team
```

Variants can share one risk assessment and one document set when their
cybersecurity properties match, as long as security-relevant differences are
reflected (points 175 to 177), so one `compliance/` tree per platform rather
than per SKU is usually right.

On AI assistants, since many teams now use them for this: they are good at
proposing threats, drafting entries and keeping files in step with the code.
They change the volume of work, not who is responsible. Every generated entry
needs a reviewer and a link to evidence.

## Open source in your product

The [deep dive on open source](/blog/security/open-source-cra) covers the
roles in detail; this is the engineering summary. Article 13(5) requires due diligence on integrated components, open source
included, and Article 13(6) requires reporting vulnerabilities you find to the
maintainer and sharing fixes. The guidance narrows this sensibly: report only
for the version you use and only if the maintainer is not already aware; share
fixes in a machine-readable form compatible with the licence, without having to
get them accepted; and no upstream report is needed when a component has no
maintainer (points 222 to 228).

For reporting under Article 14, a vulnerability in a third-party component is
mandatory to report only if it is actively exploited in your own product. If it
is not exploitable there, reporting is voluntary, but you still have to handle
it (point 218). That is exactly what the triage record is for. The Linux
Foundation's 2026 report found that the share of organisations relying
passively on upstream projects for security fixes rose from 46% to 51%. Under
the CRA, waiting for upstream is a decision you have to be able to justify.

## AI components

If the product includes a high-risk AI system, Article 12 of the CRA lets
compliance with Annex I count as compliance with the AI Act's cybersecurity
requirement. After the AI Omnibus, Regulation (EU) 2026/1744, the AI Act's
rules for high-risk AI inside regulated products apply from 2 August 2028, and
according to Reed Smith, AI embedded in products under the Machinery Regulation is now excluded from the AI Act's high-risk regime. The
[deep dive on the AI Act in connected products](/blog/compliance/ai-act-connected-products)
has the classification test; for most connected products in 2027, the CRA is the
binding constraint.

## What I would do in the next 90 days

1. **Draw the product boundary** for each product with the three-part test, and
   list third-party services as components.
2. **Write `annex-i.yaml` for one product** and run a gap review against it.
3. **Generate an SBOM from the shipped artefact** for every supported version,
   in CycloneDX 1.6 or SPDX 3.0.1 or later.
4. **Stand up vulnerability matching and a triage record**, with a named person
   owning decisions.
5. **Separate the security update channel**, and test signing, rollback and
   automatic installation with opt-out.
6. **Remove default credentials and lock or disable debug interfaces** in production builds,
   and add a release gate.
7. **Publish a vulnerability contact and a disclosure policy**, and an advisory
   format.
8. **Reduce supported baselines**, and plan a free upgrade path to the latest
   version for old hardware.
9. **Classify each product** against Implementing Regulation (EU) 2025/2392, and
   plan early for a notified body if it is class I or above.
10. **Add a substantial-modification check** to pull-request and release
    templates.

## Why I am writing this

I write these articles as research: to understand the sector and how companies
actually run compliance day to day. They are also groundwork for a product I
will probably build, to streamline how companies handle their compliance
processes. If that interests you, **[write to me](mailto:me@bernardoforcillo.com?subject=CRA%20for%20CTOs)** at
[me@bernardoforcillo.com](mailto:me@bernardoforcillo.com?subject=CRA%20for%20CTOs).

_Disclosure: I work on connected products at Ganiga. Nothing is for sale yet._

## Frequently asked questions

### What does Annex I of the Cyber Resilience Act require?

Part I requires products to be designed for a level of cybersecurity
appropriate to their risks and lists thirteen properties, including no known
exploitable vulnerabilities at release, secure default configuration, security
updates, access control, confidentiality, integrity, data minimisation,
availability, a limited attack surface, logging and secure erasure. Part II
lists eight vulnerability-handling duties, including an SBOM, prompt fixes,
regular testing, a disclosure policy and free security updates.

### Is an SBOM mandatory under the CRA, and in which format?

Yes, from 11 December 2027. Each product needs a software bill of materials in a
commonly used, machine-readable format covering at least top-level
dependencies, kept in the technical documentation. No format is mandated yet.
Germany's BSI TR-03183-2 accepts CycloneDX 1.6 or later and SPDX 3.0.1 or
later, and the Commission may set a format by implementing act.

### Is the cloud back end of a connected product in scope of the CRA?

Yes, when it is remote data processing that the manufacturer designed or had
developed and without which the product cannot perform one of its functions.
According to the Commission's guidance of 17 November 2026, this holds even when
the back end runs on a third-party cloud provider. Third-party SaaS is generally
not part of the product but is treated like a component.

### Is a software update a substantial modification under the CRA?

Usually not, if it is a security update. According to the Commission's
guidance, the test is whether a change alters the cybersecurity risk in a way
the manufacturer's risk assessment did not consider, or changes the intended
purpose. New functionality that changes the intended purpose generally is a
substantial modification, and the size of the change does not decide it.

### Are there harmonised standards for the CRA?

Not with a presumption of conformity yet. As of 17 November 2026 no CRA
harmonised standard is cited in the Official Journal. EN 40000-1-1 and EN
40000-1-2 were published by CEN in November 2026 but are not expected to be
cited; EN 40000-1-3, on vulnerability handling, is still under approval, due by 30 November 2026, and is the only part of the series for which CEN expects a citation.

### Must I report a vulnerability in an open-source component I use?

To the authorities, only if it is actively exploited in your own product. To
the maintainer, yes: Article 13(6) requires reporting vulnerabilities you find
in integrated components and sharing fixes. The Commission's guidance limits
this to the version you use and to cases where the maintainer is not already
aware.

### Does the CRA require automatic updates?

For security updates, Annex I asks that they be installed automatically by
default where applicable, with a clear and easy way for users to opt out. Where
technically feasible, security updates must be provided separately from feature
updates, free of charge, and each must stay available for at least ten years after it is issued, or for the rest of the support period if longer.

## Read next

- [The map: EU product compliance 2026–2028](/blog/compliance/eu-product-compliance-map),
  every law, date and owner on one page.
- [The CRA field guide](/blog/security/cra-field-guide), on reporting
  and the chain from threat to proof.
- [Data Act access by design meets the CRA](/blog/compliance/data-act-access-by-design),
  for the data interface your product now needs.
- [Running the CRA: an operating model](/blog/compliance/cra-operations),
  for the release and records clocks.
- [What the CRA costs](/blog/compliance/cra-costs), for
  why secure development is the largest budget line.

## References

Checked on 20 November 2026. The regulation, the Commission's guidance and the
implementing acts are primary sources; the rest are secondary.

- [_Regulation (EU) 2024/2847, Cyber Resilience Act_](https://eur-lex.europa.eu/eli/reg/2024/2847/oj),
  EUR-Lex. Articles 12, 13, 14, 24; Annexes I, II and VII.
- European Commission,
  [_Commission guidance on the application of Regulation (EU) 2024/2847, C/2026/6013_](https://eur-lex.europa.eu/eli/C/2026/6013),
  first adopted on 27 July 2026 as C(2026) 5252; published in the Official Journal on 17 November 2026. Points 21, 33–36, 104–109, 129–130,
  158–163, 175–208, 218, 222–228.
- [_Commission Implementing Regulation (EU) 2025/2392_](https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj),
  EUR-Lex. Technical descriptions of important and critical products.
- [_Commission Delegated Regulation (EU) 2026/339_](https://eur-lex.europa.eu/eli/reg_del/2026/339/oj/eng),
  EUR-Lex. Repeal of the RED cybersecurity delegated act.
- BSI,
  [_TR-03183: Cyber Resilience Requirements for Manufacturers and Products_](https://www.bsi.bund.de/dok/TR-03183-en).
- FOSSA,
  [_SBOM requirements under the Cyber Resilience Act_](https://fossa.com/blog/sbom-requirements-cra-cyber-resilience-act).
  Article 13(24) and BSI TR-03183-2 v2.1.0.
- ENISA,
  [_SBOM Adoption State of Play 2026_](https://www.enisa.europa.eu/sites/default/files/2026-06/SBOM%20Adoption%20State%20of%20Play%202026.pdf),
  June 2026.
- Linux Foundation,
  [_The CRA readiness reality: what changed and what didn't between 2025 and 2026_](https://www.linuxfoundation.org/blog/the-cra-readiness-reality-what-changed-and-what-didnt-between-2025-and-2026).
- CRA Evidence,
  [_CRA harmonised standards status_](https://craevidence.com/cra-compliance/harmonised-standards-status),
  as of 17 November 2026.
- CVD Portal,
  [_The EN 40000 series of CRA standards_](https://cvdportal.com/standards/en-40000).
  CEN publication on 18 November 2026.
- cyberresilienceact.eu,
  [_The Commission's draft amendment pushes the CRA's 2026 standard deadlines back_](https://www.cyberresilienceact.eu/news/cra-standardisation-deadlines-pushed-back-two-months.html).
  EN 40000 and EN 18031.
- CRA Evidence,
  [_CRA for German manufacturers_](https://craevidence.com/blog/cra-german-manufacturers-bsi-guide).
  NANDO status as of 6 November 2026.
- Reed Smith,
  [_EU AI Act: next level applies as of 2 August 2026_](https://www.reedsmith.com/our-insights/blogs/technology-law-dispatch/102nfi5/eu-ai-act-next-level-applies-as-of-2-august-2026/).
