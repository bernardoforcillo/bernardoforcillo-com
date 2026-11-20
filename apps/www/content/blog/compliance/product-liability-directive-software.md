---
title: 'Software is now a product: the new EU Product Liability Directive and connected devices'
seoTitle: 'New Product Liability Directive and software'
description: 'From 9 December 2026 software is a product under strict EU liability. What changes for makers of connected products, how it ties to the CRA, and Italy''s decree.'
date: 2026-11-20
tags:
  - product liability directive
  - pld
  - software liability
  - security updates
  - cyber resilience act
  - cra
  - connected products
  - italy
about:
  - name: Product Liability Directive, Directive (EU) 2024/2853
    url: https://eur-lex.europa.eu/eli/dir/2024/2853/oj
  - name: Cyber Resilience Act, Regulation (EU) 2024/2847
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
---

**Key takeaways**

- The new Product Liability Directive (PLD, Directive (EU) 2024/2853) applies to
  products placed on the market or put into service **after 8 December 2026**,
  following a corrigendum published on 7 May 2026. Member States must transpose
  it by **9 December 2026**.
- **Software is a product**: firmware, apps, AI systems and software supplied as
  a service, plus digital services the product needs to work. Free and
  open-source software supplied outside a commercial activity is excluded.
- Liability is **strict**: an injured person proves defect, damage and causation,
  not fault. The €500 threshold for property damage is gone, there is no cap,
  and destruction or corruption of data not used for professional purposes counts as damage. A data leak as such does not.
- A manufacturer loses the defence that a defect did not exist at sale when the
  defect comes from software updates, or from **missing updates needed for
  safety**, that were within its control.
- When a product breaches mandatory safety requirements, a court **shall presume** it defective, and courts can order evidence to be disclosed. The CRA's technical
  file becomes potential evidence.
- **Italy** approved its transposing decree on 28 October 2026. It rewrites
  articles 114 to 127 of the Consumer Code and keeps the development-risk
  defence.

_Part of a series on EU product compliance for connected-product makers. For
the full calendar and who owns what, start with
[the map](/blog/compliance/eu-product-compliance-map)._

## Why 9 December matters

For almost forty years, product liability in the EU rested on Directive
85/374/EEC, written for physical goods. Whether software was a "product" under
it was never settled, and connected devices sat in that grey zone. The new
directive ends the debate for anything placed on the market from 9 December
2026: software is a product, the people who make it are liable without fault
for damage it causes, and a missing security update can be a defect.

This matters to makers of connected products for a reason the Cyber Resilience
Act (CRA) makes sharper. The CRA tells you what security you owe the regulator,
and for how long. The PLD tells you what you owe a person who is harmed when
that security fails. The two use different vocabularies, different enforcers and
different deadlines, but they rest on the same facts: what you knew, what you
shipped, and what you fixed.

I build connected products at Ganiga and this is our exposure too. I am not a
lawyer and this is not legal advice; the sources are at the end, and for any
real decision the national text and your counsel are what count.

## The date, precisely

The directive entered into force on 8 December 2024 and must be transposed by 9
December 2026 (Article 22), when Directive 85/374/EEC is repealed (Article 21).
The original text said it applied to products placed on the market or put into
service after 9 December 2026. A corrigendum published in the Official Journal
on 7 May 2026 changed that to after 8 December 2026. In practice, the new regime
covers products placed on the market from 9 December 2026 inclusive, and the old
regime keeps covering earlier ones.

"Placed on the market" works unit by unit, as it does under the CRA. A model
launched in 2025 is under the old regime for units supplied before 9 December
and under the new one for units supplied after it.

## What counts as a product now

| Question                                    | Directive 85/374/EEC                          | Directive (EU) 2024/2853                                                                                     |
| ------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Is software a product?                      | Unclear                                       | Yes, however it is supplied, including as a service and AI systems; source code as such is not              |
| Are digital services around the product covered? | No                                       | Yes: related services integrated with or interconnected to the product, such as a cloud back end, are treated as components |
| Open source?                                | Not addressed                                 | Excluded when developed or supplied outside a commercial activity                                            |
| Data loss?                                  | No                                            | Destruction or corruption of data not used for professional purposes                                         |
| Psychological harm?                         | Depended on national law                      | Medically recognised damage to psychological health                                                          |
| Minimum property damage                     | €500 threshold                                | Removed                                                                                                       |
| Cap on total liability                      | Member States could set one                   | Not allowed                                                                                                   |

Two definitions do most of the work. A **related service** is a digital service
integrated with or interconnected to a product so that its absence would prevent
one or more of the product's functions (Article 4(3)), which is close to the
CRA's idea of remote data processing. A **component** includes software modules
and libraries integrated into a product (Article 4(4)), and its maker can be
liable alongside the product's manufacturer.

## Who is liable

```tikz Who an injured person can claim against under the new PLD.
% Alt: The manufacturer of the product and the manufacturer of a defective component are liable. If the manufacturer is outside the EU, the importer, the authorised representative or, failing those, the fulfilment service provider is liable. Anyone who substantially modifies a product outside the manufacturer's control is treated as a manufacturer. Distributors and online platforms acting as distributors are liable only if they fail to identify a liable EU operator within one month of a request.
\begin{tikzpicture}[op/.style={box, text width=5.6cm, align=left, font=\footnotesize}, node distance=0.22cm]
  \node[hot, text width=5.6cm, align=left, font=\footnotesize] (m) {\textbf{Manufacturer} of the product, and of any defective \textbf{component}};
  \node[op, below=of m] (i) {\textbf{Importer} or \textbf{authorised representative}, if the manufacturer is outside the EU; failing both, the \textbf{fulfilment service provider}};
  \node[op, below=of i] (s) {\textbf{Anyone who substantially modifies} the product outside the manufacturer's control: treated as a manufacturer};
  \node[op, below=of s, draw opacity=0.18, dashed] (d) {\textbf{Distributors and online platforms}: only if they cannot name a liable EU operator within one month};
\end{tikzpicture}
```

Liable operators are jointly and severally liable, with rights of recourse
between them (Articles 12 and 14). Two rules matter in contract negotiations.
Liability towards the injured person cannot be limited or excluded by contract
(Article 15). And liability is not reduced because a third party contributed to
the damage, which includes an attacker who exploited a vulnerability (Article
13); only the injured person's own fault can reduce it.

For a maker of connected products, the chain usually looks like this: you are
the manufacturer of the device and of the software you wrote; the suppliers of
your modules and libraries are component manufacturers; your distributor is
liable only if it cannot point to you.

## When software is defective

A product is defective when it does not provide the safety that a person is
entitled to expect, or that Union or national law requires (Article 7(1)). Among
the circumstances a court must consider are the effect of the product's ability
to keep learning or acquire new features after it is placed on the market
(Article 7(2)(c)), relevant product safety requirements, including
safety-relevant cybersecurity requirements (Article 7(2)(f)), and recalls or
other interventions by authorities or the manufacturer (Article 7(2)(g)).

Three consequences follow for connected products. First, a cybersecurity
weakness can be a safety defect: Article 7(2)(f) counts safety-relevant cybersecurity requirements among the circumstances that decide what safety people are entitled to expect. Second, the safety a user
is entitled to expect now includes how the product behaves after updates, not
only on the day it was sold. Third, a later and better product does not make an
earlier one defective (Article 7(3)), so shipping improvements is not an
admission.

The damage still has to be of a recognised kind: death or personal injury,
damage to property not used exclusively for professional purposes, or destruction or corruption of data not used for professional purposes (Article 6). Two exclusions matter for connected products. Damage to the defective product itself is not covered (Article 6(1)(b)), so a device bricked by a bad update is a contract question, not a PLD one. And a data leak, without destruction or corruption, is not PLD damage; the GDPR handles it. A smoke alarm silenced by a faulty update,
a heater that overheats after a malicious command, a hub that wipes a family's
photos: these are PLD cases. A lost day of production at a business customer is
not; that stays in contract law.

## Updates and the control rule

Under the old directive, a manufacturer could escape liability by showing the
defect probably did not exist when the product was put into circulation. The new
directive keeps that defence in Article 11(1)(c), but Article 11(2) removes it
when the defect is due to any of the following, provided it is within the
manufacturer's control:

- a related service;
- software, including software updates or upgrades;
- the **lack of software updates or upgrades necessary to maintain safety**;
- a substantial modification of the product.

Article 4(5) defines control: it includes software updates and upgrades that the manufacturer supplies itself or that a third party supplies with its authorisation (Article 4(5)(b)). The rule cuts both ways. Where an update needed for safety was supplied but the owner did not install it, recital 51 and Article 13(2) let the manufacturer's liability be reduced or excluded, so keep the proof of when each update was offered. The directive does not itself
oblige anyone to provide updates. The CRA does: free security updates for a
support period of at least five years.

```tikz Two clocks on the same unit: CRA support and PLD liability.
% Alt: A timeline for one unit, starting when it is placed on the market. The CRA support period runs for at least five years, during which security updates must be provided free of charge; a missing update in that period is both a CRA breach and, if it causes damage, removes the PLD defence that the defect did not exist at sale. The PLD's ten-year expiry runs from placing on the market, extended to twenty-five years for latent personal injury, and restarts after a substantial modification.
\begin{tikzpicture}[lbl/.style={font=\scriptsize, anchor=west}]
  \draw[flow] (0,0) -- (8.4,0);
  \foreach \x/\t in {0/0, 2.5/5, 5/10}{\draw (\x,0.08) -- (\x,-0.08); \node[font=\scriptsize, anchor=north] at (\x,-0.1) {\t\,y};}
  \node[font=\scriptsize, anchor=north west] at (6.2,-0.1) {years after placing};
  \fill[accent, fill opacity=0.18] (0,0.35) rectangle (2.5,0.8);
  \draw[accent, line width=1pt] (0,0.35) rectangle (2.5,0.8);
  \node[lbl] at (0.08,0.575) {\textbf{CRA support}};
  \node[lbl] at (2.6,0.575) {5 y or more: free security updates};
  \fill[fill opacity=0.08] (0,1.0) rectangle (5,1.45);
  \draw[draw opacity=0.4] (0,1.0) rectangle (5,1.45);
  \node[lbl] at (0.08,1.225) {\textbf{PLD expiry}: 10 years};
  \draw[dashed, draw opacity=0.4] (5,1.225) -- (8.2,1.225);
  \node[lbl] at (5.1,1.5) {25 y for latent injury};
  \node[note, anchor=north west, text width=6.4cm] at (0,-0.6) {A substantial modification restarts the PLD clock and makes the product new under the CRA.};
\end{tikzpicture}
```

Put together: during the CRA support period, a missing security update is both
a regulatory breach and, if it causes damage, a defect the manufacturer cannot
argue away. After the support period, the CRA duty ends, but PLD liability for
damage caused by the product can run for up to ten years from placing on the
market. The support end date you state at the point of sale is therefore not
only a CRA disclosure; it is part of what a person is entitled to expect.

## Evidence and presumptions

The PLD gives injured people two tools that matter for anyone keeping a CRA
technical file.

**Disclosure (Article 9).** A claimant who presents a plausible claim can ask the
court to order the defendant to disclose relevant evidence. Courts must protect
trade secrets, but the evidence can be ordered.

**Presumptions (Article 10).** A product is presumed defective when the defendant
fails to disclose relevant evidence, when the claimant shows the product does
not comply with mandatory product safety requirements meant to protect against
the risk of the damage suffered, or when the damage was caused by an obvious
malfunction in reasonably foreseeable use. Where technical or scientific
complexity makes proof excessively difficult, a court can presume defect,
causation or both if the claimant shows they are likely. The presumptions are
rebuttable.

For a connected product this changes the meaning of the documents the CRA asks
you to keep:

| CRA record                                                  | How it can matter under the PLD                                                                    |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Annex I risk assessment and conformity evidence             | Shows compliance with safety-relevant requirements; gaps can support a presumption of defect        |
| SBOM and vulnerability triage decisions, per version        | Shows what you knew about a vulnerability, when, and why you decided what you did                  |
| Security update history and advisories                      | Shows whether the update "necessary to maintain safety" existed, and when users could install it  |
| Reporting trail under Article 14                            | Time-stamps your awareness of an exploited vulnerability                                           |
| Support end date stated at sale                             | Frames what users were entitled to expect                                                          |

A good file is a defence. A missing or inconsistent one is worse than nothing,
because refusing disclosure itself triggers a presumption. That is one more
reason to produce evidence per release as part of the build, as described in the
[CRA engineering guide](/blog/security/cra-engineering).

## How long liability lasts

A claim must be brought within three years of the date the injured person knew,
or should have known, of the damage, the defect and the liable operator (Article
16). Rights expire ten years after the product was placed on the market or put
into service, or after a substantial modification, which restarts the clock for
that product; for latent personal injury the period is twenty-five years
(Article 17).

## Italy's decree

Italy transposes the directive by rewriting the Consumer Code. The Council of
Ministers approved a draft legislative decree on 4 August 2026, sent to
Parliament as Government Act no. 434, and approved it in final form on 28
October 2026. The decree replaces Title II of Part IV of the Consumer Code,
keeping the numbering of articles 114 to 127, and adds an article 126-bis on the
publication of judgments. According to Laura Turini's analysis, Italy kept the
development-risk defence: a producer is not liable if the state of scientific
and technical knowledge, at placing on the market or during the period of
control, did not allow the defect to be discovered.

At the time of writing I had not found the decree published in the Gazzetta Ufficiale; the published text is the one that counts. One detail to check in it: article 3 of the draft sent to Parliament still applies the new rules to products placed on the market "dopo il 9 dicembre 2026", the date before the EU corrigendum.

The directive reaches manufacturers through national law. Until a Member State transposes it, an injured person cannot rely on it directly against a private company, and in a cross-border case the Rome II Regulation (Article 5) decides which country's law applies. Reed Smith counted only three Member States that had transposed it by September 2026. Products placed on the
market before the new rules apply stay under the current articles 114 to 127.

## What to do before and after 9 December

1. **List what you will place on the market from 9 December 2026**, by product
   and software version. Those units are under the new regime.
2. **Decide, in writing, how long each product stays within your control**:
   when you stop shipping updates, and how users learn that date. Align it with
   the CRA support period.
3. **Treat the update channel as a safety system.** A failed or skipped security
   update is now a liability event as well as an engineering one.
4. **Keep evidence as if you will have to disclose it**: technical file, triage
   decisions, update history, advisories and reporting trail, consistent and
   dated.
5. **Review supplier contracts** for modules, libraries and cloud services:
   component makers are jointly liable, and recourse between you depends on
   contracts.
6. **Review customer contracts** knowing that liability towards an injured
   person cannot be excluded; what you can allocate is recourse between
   businesses.
7. **Call your insurer** about software defects, updates shipped after the sale
   and destruction or corruption of consumers' data.
8. **In Italy, watch for publication** of the decree in the Gazzetta Ufficiale,
   and check the final text of articles 114 to 127.

The [guide to CRA costs](/blog/compliance/cra-costs) puts these exposures next to
the CRA budget.

## Why I am writing this

I write these articles as research: to understand the sector and how companies
actually run compliance day to day. They are also groundwork for a product I
will probably build, to streamline how companies handle their compliance
processes. If that interests you, **[write to me](mailto:me@bernardoforcillo.com?subject=PLD%20and%20software)** at
[me@bernardoforcillo.com](mailto:me@bernardoforcillo.com?subject=PLD%20and%20software).

_Disclosure: I work on connected products at Ganiga. Nothing is for sale yet._

## Frequently asked questions

### When does the new Product Liability Directive apply?

Directive (EU) 2024/2853 applies to products placed on the market or put into
service after 8 December 2026, following a corrigendum published on 7 May 2026.
Member States must transpose it by 9 December 2026, when Directive 85/374/EEC is
repealed. Products placed on the market earlier stay under the old rules.

### Is software a product under the new PLD?

Yes. Software is a product however it is supplied, including firmware,
applications, AI systems and software supplied as a service. Digital services
integrated with or interconnected to a product, such as a cloud back end it
needs, are covered as related services, which the directive treats as components. Free and open-source software developed
or supplied outside a commercial activity is excluded.

### Can a missing security update make a product defective?

It can. Safety-relevant cybersecurity requirements are among the factors used to
judge defectiveness, and under Article 11(2) a manufacturer cannot rely on the
defence that a defect did not exist when the product was sold if the defect is
due to a lack of software updates necessary to maintain safety that were within
its control.

### Is a manufacturer liable if a hacker exploits a vulnerability?

The hacker's act does not reduce the manufacturer's liability. Under Article 13
of the directive, liability is not reduced when the damage is caused both by a
defect and by the act or omission of a third party. Only the injured person's
own fault can reduce compensation.

### How long does liability under the new PLD last?

A claim must be brought within three years from when the injured person knew, or
should have known, of the damage, the defect and the liable operator. Rights
expire ten years after the product was placed on the market or substantially
modified, or twenty-five years for latent personal injury.

### Is there a cap or minimum for damages under the new PLD?

No. The €500 threshold for property damage in the old directive is removed, and
Member States cannot set a ceiling on total liability. Damage to property used
exclusively for professional purposes is still excluded.

### How is the PLD transposed in Italy?

Through a legislative decree that rewrites articles 114 to 127 of the Consumer
Code and adds an article 126-bis on publication of judgments. The Council of
Ministers approved it in final form on 28 October 2026. According to published
analysis, Italy kept the development-risk defence.

## Read next

- [The map: EU product compliance 2026–2028](/blog/compliance/eu-product-compliance-map),
  every law, date and owner on one page.
- [What the CRA costs](/blog/compliance/cra-costs), with
  the support period as a priced promise.
- [Engineering for the CRA](/blog/security/cra-engineering), for evidence produced
  per release.
- [The CRA field guide](/blog/security/cra-field-guide), on the
  reporting trail that time-stamps awareness.
- [Open source under the CRA](/blog/security/open-source-cra), for liability
  when you integrate components you did not write.

## References

Checked on 20 November 2026. The directive is the primary source; national
status and summaries are secondary.

- [_Directive (EU) 2024/2853 on liability for defective products_](https://eur-lex.europa.eu/eli/dir/2024/2853/oj),
  EUR-Lex. Articles 2, 4 (including 4(5)(b)), 6–17, 21, 22; recitals 20 and 51.
- Reed Smith,
  [_EU Product Liability Directive: where things stand with Member State transposition_](https://www.reedsmith.com/articles/eu-product-liability-directive-where-things-stand-with-member-state-transposition/).
  The corrigendum.
- AboutPharma,
  [_Responsabilità da prodotto difettoso e dispositivi medici_](https://www.aboutpharma.com/legal-regulatory/responsabilita-da-prodotto-difettoso-e-dispositivi-medici-cosa-cambia-con-la-direttiva-ue-2024-2853/).
  The corrigendum of 7 May 2026 and Government Act no. 434.

- Camera dei deputati,
  [_Recepimento della direttiva (UE) 2024/2853: dossier sull'Atto del Governo n. 434_](https://documenti.camera.it/leg19/dossier/testi/gi0115.htm),
  8 September 2026.
- Diritto Bancario,
  [_Responsabilità per danni da prodotti difettosi: novità dallo schema di decreto_](https://www.dirittobancario.it/art/responsabilita-per-danni-da-prodotti-difettosi-novita-dallo-schema-di-decreto/),
  18 August 2026.
- eDotto,
  [_Prodotti difettosi, approvato il decreto_](https://www.edotto.com/articolo/prodotti-difettosi-approvato-il-decreto-nuove-responsabilita-nellera-digitale),
  29 October 2026.
- Laura Turini,
  [_Software e AI come prodotti (potenzialmente) difettosi_](https://lauraturini.substack.com/p/software-e-ai-come-prodotti-potenzialmente-difettosi-direttiva-ue-2024-2853).
  Development-risk defence in the Italian decree.
- [_Regulation (EU) 2024/2847, Cyber Resilience Act_](https://eur-lex.europa.eu/eli/reg/2024/2847/oj),
  EUR-Lex. Article 13 and Annex I.
