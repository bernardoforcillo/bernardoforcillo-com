---
title: 'Open source under the CRA: maintainers, stewards and the companies that ship it'
seoTitle: 'Open source and the Cyber Resilience Act: stewards and integrators'
description: 'When open source counts as placed on the market, what stewards must do, and what manufacturers owe the components they ship, per the November 2026 guidance.'
date: 2026-11-20
tags:
  - open source
  - cyber resilience act
  - cra
  - open source steward
  - software supply chain
  - sbom
  - cto
  - product security
about:
  - name: Cyber Resilience Act, Regulation (EU) 2024/2847
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
  - name: Commission guidance on the application of the Cyber Resilience Act, C/2026/6013
    url: https://eur-lex.europa.eu/eli/C/2026/6013
---

**Key takeaways**

- Free and open-source software is outside the Cyber Resilience Act (CRA) unless
  it is **made available in the course of a commercial activity**. The
  Commission's guidance of 17 November 2026 spells out when that happens:
  charging for the software itself, making access or updates conditional on
  payment, or requiring personal data beyond what security, compatibility or
  interoperability need.
- Paid support services, voluntary donations and third-party funding do **not**
  by themselves make open source commercial.
- A **steward** is a legal person that systematically supports open source
  intended for commercial use without monetising it. It has a lighter regime: a
  cybersecurity policy, cooperation with authorities and some reporting, and it
  cannot be fined.
- A company that **integrates** open source into its product is the
  manufacturer of that product. It must do due diligence on components, report
  vulnerabilities it finds to the maintainer and share fixes, but it is not
  responsible for the upstream project's CRA compliance.
- In practice that means a component policy, an SBOM per version, triage
  records, and a plan for components nobody maintains.

_Part of a series on EU product compliance for connected-product makers. For
the full calendar and who owns what, start with
[the map](/blog/compliance/eu-product-compliance-map)._

## Why open source got its own rules

Almost every connected product is mostly open source by line count: an embedded
Linux or RTOS, a TLS library, a web server, an MQTT client, a mobile framework.
Early drafts of the CRA alarmed the open-source community, because they seemed
to make volunteer maintainers liable as manufacturers. The final text drew a
line at commercial activity and created a new role, the open-source software
steward. The Commission's guidance, published in the Official Journal on 17
November 2026, now explains where the line falls, with worked examples.

This article reads that guidance from two sides: the company that ships open
source inside its product, and the company or foundation that publishes it. I
build connected products at Ganiga, and like everyone else we depend on
hundreds of open-source components. I am not a lawyer; the sources are at the
end.

## When open source is "placed on the market"

The CRA applies to products made available on the market in the course of a
commercial activity. For open source, the guidance gives the tests.

| Situation                                                                                         | Commercial under the CRA?              | Guidance       |
| ------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------- |
| Charging for the software itself, for example for pre-compiled binaries                           | Yes: the publisher is a manufacturer   | Points 51–54   |
| Requiring personal data processing beyond what security, compatibility or interoperability need   | Can be                                 | Points 51–54   |
| Making access to the software or its updates conditional on payment                               | Yes                                    | Points 55–62   |
| Selling paid professional services around freely available software                              | Not by itself                          | Points 55–62   |
| Accepting donations                                                                               | Unlikely, unless they are in practice a condition for access or updates | Points 55–62 |
| Receiving third-party funding                                                                     | Not decisive by itself                 | Points 63–66   |
| A not-for-profit publisher whose earnings serve not-for-profit aims                               | No                                     | Points 63–66   |
| Source code shared only with paying customers                                                     | Not free and open source at all        | Point 46       |

Responsibility attaches to whoever publishes the software and controls its
releases, usually the maintainers. Contributors without that control are outside
the CRA (points 47 to 49).

Companies that publish their own libraries should read this part carefully. A free "community" release that the company does not monetise is not placed on the market by it, even if the company sells something else (points 51 to 54 and 67 to 68). But a legal person that systematically supports such a project for commercial use is its steward, with the duties below (points 53 and 76). And monetisation is read broadly: a free release that in practice serves to monetise the company's other products or services, for example because it only works with a paid platform, can count as commercial (point 54). Monetise it, directly or that way, and the company becomes its manufacturer.

## Stewards: the middle role

A steward is a legal person, other than a manufacturer, that systematically
supports the development of free and open-source software intended for
commercial activities and ensures its viability. Foundations are the typical
case, but a company can be a steward for one project and a manufacturer for
another (points 69 to 84).

```tikz Which role do you have for an open-source project under the CRA?
% Alt: A decision flow for an open-source project. If you charge for the software, make access or updates conditional on payment, or require personal data beyond security, compatibility or interoperability, you are a manufacturer with full CRA obligations. Otherwise, if you are a legal person that systematically supports the project for commercial use and ensures its viability, you are a steward with a lighter regime. Otherwise, if you contribute without controlling releases, or publish without monetising, the project is not placed on the market by you. Separately, a company that integrates open source into its own product is the manufacturer of that product.
\begin{tikzpicture}[q/.style={box, text width=3.6cm, font=\footnotesize}, res/.style={box, text width=2.8cm, font=\scriptsize, align=left}, node distance=0.55cm]
  \node[q] (q1) {Do you \textbf{monetise} the software, its access or its updates?};
  \node[q, below=of q1] (q2) {Do you, as a legal person, \textbf{systematically support} it for commercial use?};
  \node[hot, text width=3.6cm, font=\footnotesize, below=of q2] (n) {\textbf{Not placed on the market} by you\\{\scriptsize contributors, unmonetised publishers}};
  \node[res, right=0.6cm of q1] (r1) {\textbf{Manufacturer}: full CRA obligations};
  \node[res, right=0.6cm of q2] (r2) {\textbf{Steward}: policy, cooperation, some reporting; no fines};
  \draw[flow] (q1) -- node[note, right] {no} (q2);
  \draw[flow] (q2) -- node[note, right] {no} (n);
  \draw[flow] (q1) -- node[note, above] {yes} (r1);
  \draw[flow] (q2) -- node[note, above] {yes} (r2);
  \node[box, font=\scriptsize, text width=6.9cm, align=left, anchor=north west, dashed] at ([yshift=-0.45cm]n.south west) {\textbf{Separately}: if you ship open source inside your own product, you are the manufacturer of that product, with due diligence and upstream duties for its components.};
\end{tikzpicture}
```

Under Article 24, a steward must put in place and document a cybersecurity
policy that fosters secure development and effective vulnerability handling,
and cooperate with market surveillance authorities. Reporting is split in two (Article 24(3), points 80 to 82): stewards report actively exploited vulnerabilities to the extent they are involved in developing the products concerned, and severe incidents only when these affect the network and information systems they provide for that development, and their obligations vary with the kind of support
they give (point 79). Under Article 64(10), stewards cannot be fined. Monetising
a steward-supported project turns the steward into its manufacturer from that
date.

The CRA also provides for voluntary security attestation of open-source
software, which the Commission can establish by delegated act (Article 25),
so that integrators have a way to rely on upstream assurance.

## If you ship open source in your product

This is the case for almost every connected-product maker, and the guidance is
clear on the split of responsibility. Integrators are not responsible for the
CRA compliance of the open-source components they use, but they are fully
responsible for their own product, which includes those components (points 85
to 88). Three duties follow from Article 13.

**Due diligence (Article 13(5)).** When integrating third-party components,
including open source not supplied commercially, the manufacturer must exercise
due diligence so that the components do not compromise the product's
cybersecurity. The CRA does not prescribe a method. What I would want to be able
to show for each significant component:

- the version shipped, from the SBOM of each release;
- whether the project is maintained: recent releases, response to security
  reports, a security policy or contact;
- its vulnerability history and how fast fixes arrived;
- how releases are published and whether they are signed;
- the decision to use it, and the alternative if it stops being maintained.

**Upstream reporting and fixes (Article 13(6)).** A manufacturer that finds a
vulnerability in an integrated component must report it to the person or entity
that maintains it, and share the fix if it develops one. The guidance narrows
this sensibly: report only for the version you use and only if the maintainer
is not already aware; share fixes in a machine-readable form compatible with
the component's licence, without having to get them accepted; and no upstream
report is needed when a component has no maintainer (points 222 to 228).

**Reporting to authorities (Article 14).** This duty has applied since 11 September 2026, to products already on the market too. A vulnerability in an open-source component is mandatory to report only if it is actively exploited in your own product. If it is not exploitable there, reporting is voluntary, but you still
have to handle it (point 218). That is what the triage record in the
[engineering guide for CTOs](/blog/security/cra-for-ctos) is for.

Two further points change the economics. First, the Linux Foundation's 2026
readiness report found the share of organisations relying passively on upstream
projects for security fixes rose from 46% to 51%. Under the CRA, "we wait for
upstream" is a decision you have to justify per vulnerability, within your own
support period. Second, the new Product Liability Directive excludes open source
developed or supplied outside a commercial activity, but its recitals make clear that a manufacturer that integrates such software into a product in the course of a commercial activity can still be liable for it. The upstream project is shielded; you are
not.

## Unmaintained components

The hardest case is a component with no maintainer: a library abandoned five
years ago, still in your firmware. The guidance removes the duty to report
upstream when there is nobody to report to, but not the duty to handle the
vulnerability in your product. The options are the usual ones, with a
compliance cost attached to each:

| Option                              | What it costs under the CRA                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------------------------- |
| Replace it                          | Engineering time, and possibly a substantial-modification check                             |
| Fork and maintain it yourself       | You fix its vulnerabilities for your whole support period                                   |
| Contain it                          | Reduce exposure so known vulnerabilities are not exploitable, and record why in the triage  |
| Fund or join its maintenance        | Money or people, and shared benefit with other users                                        |

Whichever you choose, write it down. An authority asking about a known
vulnerability in an unmaintained library will want the decision and its reasons,
not the library's history.

## If you publish open source yourself

Many companies that make connected products also publish SDKs, libraries or
tools. Before December 2027, decide project by project which role you have:

1. **Is any of it monetised**, directly or by making updates or access
   conditional? Then you are its manufacturer, with the full CRA.
2. **Is it a free community release** you do not monetise, directly or through your other services? Then you do not place it on the market, even if your company is commercial, but check item 3.
3. **Do you systematically support a project others build products on**? Then
   you may be its steward.

Important products that qualify as free and open-source software can use
self-assessment if their technical documentation is made public when they are
placed on the market (Article 32(5)), an option that matters for open-source
operating systems, browsers or network software published by companies.

## What I would do this quarter

1. **Generate SBOMs for every shipped version** so you know which components
   and versions you are responsible for.
2. **Write a component policy**: what you check before adopting a dependency,
   and who decides.
3. **Record due diligence** for the components that matter most: network-facing
   code, cryptography, parsers, update clients.
4. **Set up upstream reporting**: who reports, how, and how fixes are shared
   under each licence.
5. **List unmaintained components** and choose an option for each.
6. **Classify your own published projects** as manufacturer, steward or
   neither.

## Why I am writing this

I write these articles as research: to understand the sector and how companies
actually run compliance day to day. They are also groundwork for a product I
will probably build, to streamline how companies handle their compliance
processes. If that interests you, **[write to me](mailto:me@bernardoforcillo.com?subject=Open%20source%20and%20CRA)** at
[me@bernardoforcillo.com](mailto:me@bernardoforcillo.com?subject=Open%20source%20and%20CRA).

_Disclosure: I work on connected products at Ganiga. Nothing is for sale yet._

## Frequently asked questions

### Does the Cyber Resilience Act apply to open-source software?

Only when it is made available in the course of a commercial activity.
According to the Commission's guidance of 17 November 2026, that includes
charging for the software, making access or updates conditional on payment, or
requiring personal data beyond what security, compatibility or interoperability
need. Paid support services, donations and funding do not by themselves make it
commercial.

### What is an open-source software steward under the CRA?

A legal person, other than a manufacturer, that systematically supports the
development of free and open-source software intended for commercial activities
and ensures its viability, such as a foundation. Stewards must have a
cybersecurity policy, cooperate with market surveillance authorities and report
in some cases, and cannot be fined under Article 64(10).

### Am I responsible for the open-source components in my product?

You are responsible for your product, including its components, but not for the
upstream project's own CRA compliance. Under Article 13 you must exercise due
diligence on integrated components, report vulnerabilities you find to their
maintainers and share fixes you develop.

### Do I have to report vulnerabilities in open-source components to ENISA?

Only if the vulnerability is actively exploited in your own product. If it is not
exploitable there, reporting is voluntary, but you still have to handle it in
your product and report it to the maintainer if the maintainer is not already
aware.

### What if an open-source component has no maintainer?

According to the Commission's guidance, upstream reporting is not required when a
component has no maintainer, but the vulnerability still has to be handled in
your product. Replacing, forking, containing or funding the component are the
usual options; record the decision.

### Do donations make an open-source project commercial under the CRA?

Not by themselves. The Commission's guidance says donations are unlikely to
amount to placing on the market unless, in practice, they are a condition for
accessing the software or its updates.

## Read next

- [The map: EU product compliance 2026–2028](/blog/compliance/eu-product-compliance-map),
  every law, date and owner on one page.
- [Engineering for the CRA](/blog/security/cra-for-ctos), for SBOMs, triage and
  the evidence pipeline.
- [Important or critical? Classifying products under the CRA](/blog/compliance/cra-product-classification),
  including the self-assessment route for open-source important products.
- [Software is now a product](/blog/compliance/product-liability-directive-software),
  for liability when you integrate open source.

## References

Checked on 20 November 2026. The regulation and the Commission's guidance are
primary sources; the rest are secondary.

- [_Regulation (EU) 2024/2847, Cyber Resilience Act_](https://eur-lex.europa.eu/eli/reg/2024/2847/oj),
  EUR-Lex. Articles 13, 14, 24, 25, 32 and 64.
- European Commission,
  [_Commission guidance on the application of Regulation (EU) 2024/2847, C/2026/6013_](https://eur-lex.europa.eu/eli/C/2026/6013),
  Adopted on 27 July 2026 as C(2026) 5252; published in the Official Journal on 17 November 2026. Points 42–90 (including 53–54, 76, 80–82), 216–228.
- Lewis Silkin,
  [_EU Cyber Resilience Act guidance now out: here's what you need to know_](https://www.lewissilkin.com/insights/2026/07/31/eu-cyber-resilience-act-guidance-now-out-heres-what-you-need-to-know-102nfex),
  31 July 2026. Draft guidance on open source.
- Linux Foundation,
  [_The CRA readiness reality: what changed and what didn't between 2025 and 2026_](https://www.linuxfoundation.org/blog/the-cra-readiness-reality-what-changed-and-what-didnt-between-2025-and-2026).

- [_Directive (EU) 2024/2853 on liability for defective products_](https://eur-lex.europa.eu/eli/dir/2024/2853/oj),
  EUR-Lex. Article 2(2).
