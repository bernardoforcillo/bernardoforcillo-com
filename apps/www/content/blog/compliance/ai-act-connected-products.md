---
title: 'The AI Act in connected products: what applies, and when, after the AI Omnibus'
seoTitle: 'AI Act for connected products after the AI Omnibus'
description: 'Most AI in connected devices is not high-risk, but some is. The dates after Regulation 2026/1744, the machinery switch, transparency duties and the CRA bridge.'
date: 2026-11-20
tags:
  - ai act
  - ai omnibus
  - high-risk ai
  - cyber resilience act
  - cra
  - machinery regulation
  - connected products
  - cto
about:
  - name: Artificial Intelligence Act, Regulation (EU) 2024/1689
    url: https://eur-lex.europa.eu/eli/reg/2024/1689/oj
  - name: Digital Omnibus on AI, Regulation (EU) 2026/1744
    url: https://eur-lex.europa.eu/eli/reg/2026/1744/oj
  - name: Cyber Resilience Act, Regulation (EU) 2024/2847
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
---

**Key takeaways**

- The **AI Omnibus**, Regulation (EU) 2026/1744, entered into force on **27 July
  2026** and moved the AI Act's high-risk deadlines: **2 December 2027** for
  stand-alone high-risk systems in Annex III, **2 August 2028** for AI inside
  products covered by EU product law in Annex I.
- Most AI in connected products, such as image classification, anomaly
  detection or predictive maintenance, is **not high-risk**. It becomes high-risk
  mainly when it is a **safety component** of a regulated product that needs
  third-party assessment, or when it serves an **Annex III use**, such as safety
  in critical infrastructure.
- **AI in machinery** now follows a sectoral route: the Omnibus moved the
  Machinery Regulation to Section B of the AI Act's Annex I, so the high-risk
  requirements will reach machinery through the Machinery Regulation itself.
- Non-high-risk AI is not unregulated: **transparency duties** under Article 50
  have applied since 2 August 2026, prohibited practices since February 2025, and
  the **CRA** covers the model and its runtime as part of the product's software.
- For high-risk AI products, CRA **Article 12** lets compliance with the CRA's
  essential requirements count for the AI Act's cybersecurity requirement.

_Part of a series on EU product compliance for connected-product makers. For
the full calendar and who owns what, start with
[the map](/blog/compliance/eu-product-compliance-map)._

## Why connected-product makers should care, and why most can relax

Many connected products now contain a model: a camera that classifies what it
sees, a sensor that flags anomalies, a voice interface, a predictive maintenance
score. Each time, someone asks whether the AI Act applies, and the honest answer
is: yes, but probably not the part you are worried about.

The AI Act (Regulation (EU) 2024/1689) puts its heaviest obligations on
high-risk systems. For connected products, those are a minority. What applies
more often is lighter: banned practices to avoid, transparency towards people
who interact with the system, and the cybersecurity of the product under the
Cyber Resilience Act (CRA). The AI Omnibus of July 2026 also moved the dates and
changed how AI in machinery is regulated.

I build connected products at Ganiga, where a vision model runs on our devices,
so this classification question is our own. I am not a lawyer; the sources are
at the end.

## The dates after the Omnibus

The Omnibus was signed on 8 July 2026, published in the Official Journal on 24
July 2026 and entered into force on 27 July 2026.

| Obligation                                                                   | Applies from                                                      |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Prohibited AI practices                                                      | 2 February 2025                                                   |
| Obligations for providers of general-purpose AI models                       | 2 August 2025                                                     |
| Transparency obligations, Article 50                                         | 2 August 2026                                                     |
| Machine-readable marking of AI-generated content, for systems placed on the market before 2 August 2026 | 2 December 2026                        |
| New prohibitions on non-consensual intimate imagery and child sexual abuse material | 2 December 2026                                             |
| High-risk systems in Annex III (stand-alone uses)                            | 2 December 2027, previously 2 August 2026                         |
| High-risk AI in products covered by Annex I legislation                      | 2 August 2028, previously 2 August 2027                           |

For connected-product makers, the important dates are the last two, and the
transparency rules already in force.

## Is your AI high-risk?

The AI Act has two routes into the high-risk regime, plus a list of things that
are banned outright.

```tikz Does the AI Act's high-risk regime apply to the AI in your product?
% Alt: A decision flow. First, check the AI is not used for a prohibited practice. Second, if the AI is a safety component of a product, or is itself a product, covered by EU product law in Annex I that requires third-party conformity assessment, it is high-risk from 2 August 2028; for machinery, the requirements arrive through the Machinery Regulation. Third, if the AI serves a use listed in Annex III, such as a safety component in critical infrastructure or biometrics, it is high-risk from 2 December 2027, subject to the Article 6(3) exception. Otherwise it is not high-risk: transparency duties may apply under Article 50, and the CRA applies to the product.
\begin{tikzpicture}[q/.style={box, text width=3.5cm, font=\footnotesize}, res/.style={box, text width=2.8cm, font=\scriptsize, align=left}, node distance=0.55cm]
  \node[q] (q1) {Used for a \textbf{prohibited} practice?};
  \node[q, below=of q1] (q2) {\textbf{Safety component} of an Annex I product that needs third-party assessment?};
  \node[q, below=of q2] (q3) {Serves a use listed in \textbf{Annex III}?};
  \node[hot, text width=3.5cm, font=\footnotesize, below=of q3] (n) {\textbf{Not high-risk}\\{\scriptsize Article 50 transparency where relevant; CRA applies}};
  \node[res, right=0.6cm of q1] (r1) {\textbf{Banned} since February 2025};
  \node[res, right=0.6cm of q2] (r2) {\textbf{High-risk} from 2 August 2028; machinery via the Machinery Regulation};
  \node[res, right=0.6cm of q3] (r3) {\textbf{High-risk} from 2 December 2027, unless Article 6(3) applies};
  \draw[flow] (q1) -- node[note, right] {no} (q2);
  \draw[flow] (q2) -- node[note, right] {no} (q3);
  \draw[flow] (q3) -- node[note, right] {no} (n);
  \draw[flow] (q1) -- node[note, above] {yes} (r1);
  \draw[flow] (q2) -- node[note, above] {yes} (r2);
  \draw[flow] (q3) -- node[note, above] {yes} (r3);
\end{tikzpicture}
```

**Route one: AI inside a regulated product.** Under Article 6(1), an AI system is
high-risk if it is a safety component of a product, or is itself a product,
covered by the EU product laws listed in Annex I, and that product has to
undergo a third-party conformity assessment under those laws. Annex I includes,
among others, toys, radio equipment, lifts, pressure equipment and medical
devices. Two conditions must both hold: a safety function, and a third-party
assessment duty for the product. A vision model that sorts waste by type is
usually not a safety component; an AI that decides when a machine guard can open is. When it is, you as the product's manufacturer count as the provider of that AI system (Article 25(3)).

**Route two: a listed use.** Annex III lists uses that are high-risk whatever the
product, such as biometric identification and categorisation, safety components
in the management and operation of critical digital infrastructure, road
traffic or the supply of water, gas, heating or electricity, and uses in
employment and education. A connected device sold to a utility as a safety
component of its network can fall here. Article 6(3) lets a provider show that a
listed system does not pose a significant risk, for example because it performs
a narrow procedural task, subject to documentation and registration.

The Commission published draft guidelines on high-risk classification on 19
May 2026. They are the place to check borderline cases. They read the third-party condition broadly: where a product law allows internal control only if harmonised standards are applied, as the toy rules do, the draft treats the product as one that needs third-party assessment.

## Machinery: the sectoral switch

The Omnibus made one structural change that matters for industrial makers. The
Machinery Regulation was listed in Section A of the AI Act's Annex I, which
would have applied the AI Act's high-risk requirements directly to AI-enabled
machinery. The Omnibus moved it to Section B. As a result, the AI Act's
requirements for high-risk AI in machinery will be carried into the Machinery
Regulation's own Annex III through delegated acts the Commission has to adopt,
and the Machinery Regulation becomes the main framework for AI that performs a
safety function in a machine. Medical devices, toys and radio equipment stay in
Section A.

The [deep dive on the Machinery Regulation](/blog/compliance/machinery-regulation-cybersecurity)
covers what that regulation already asks for from 20 January 2027, including
self-evolving safety functions and protection against corruption.

## If your AI is high-risk

A provider of a high-risk system has to set up a risk management system,
govern its training data, write technical documentation, enable logging, give
deployers instructions, design for human oversight, achieve appropriate
accuracy, robustness and cybersecurity (Article 15), run a quality management
system, go through conformity assessment and monitor the system after it is
placed on the market, including reporting serious incidents.

The CRA reduces part of that. Under Article 12 of the CRA, a high-risk AI system
that is also a product with digital elements, and that meets the CRA's
essential requirements in Annex I, is presumed to meet the AI Act's
cybersecurity requirement, as demonstrated by the CRA declaration of conformity.
The conformity assessment follows the AI Act's procedure, and the AI Act's
notified bodies can also assess the CRA requirements. For such products the CRA
also allows a single set of technical documentation covering both laws (Article 31(3)). One exception runs the other way (Article 12(3)): an important product under the CRA that is also a high-risk AI system under the AI Act's internal-control procedure goes through the CRA's own conformity assessment for its cybersecurity requirements. The [deep dive on one evidence base](/blog/compliance/one-evidence-base)
explains what can and cannot be merged.

Two other parties have duties too. Deployers must use the system according to
its instructions and monitor it. Some deployers, such as public bodies and
providers of public services, must also carry out a fundamental rights impact assessment for Annex III systems, except those used in critical infrastructure (point 2), which the maker cannot do for them but can feed with information.

## If your AI is not high-risk

Three things still apply.

**Prohibitions.** The banned practices have applied since February 2025. For
camera and sensor products the ones to know are emotion recognition in
workplaces and schools, untargeted scraping of facial images, and biometric
categorisation that infers sensitive characteristics.

**Transparency, Article 50.** Since 2 August 2026, providers must design AI
systems that interact directly with people so that they know they are dealing
with an AI, unless it is obvious, and providers of systems that generate
synthetic audio, images, video or text must mark the output in a
machine-readable way. A voice interface on a device is the common case. Deployers have their own duty under Article 50(3): whoever uses emotion recognition or biometric categorisation must inform the people exposed to it, which matters if your customer runs your camera with such a feature switched on.

**The CRA.** For the CRA, the model, its runtime and the code that calls it are
software in the product. The model file belongs in the component inventory, the
inference service in the cloud back end is part of the product if you designed it, or had it developed, and the device needs it for one of its functions, and model updates go through the same release and update process as
firmware. CycloneDX includes a machine-learning bill of materials format that
can record model provenance alongside the SBOM; the
[engineering guide for CTOs](/blog/security/cra-for-ctos) covers the rest.

## Italy

Legislative Decree 7 October 2026, no. 179, published on 8 October and in force
since 23 October 2026, adapts Italian law to the AI Act. It names the national
cybersecurity agency, ACN, as market surveillance authority and single point of
contact, and AgID as notifying authority, with financial supervisors covering
high-risk systems in their sectors. For high-risk AI in products covered by the product laws in Section A of Annex I, the market surveillance authorities are those of the product law (Article 74(3)), so the authority for an AI-enabled toy or lift may not be ACN. ACN is also the authority proposed for the
CRA, so for many connected products the same agency will supervise both.

## What I would do this quarter

1. **List every model in every product**: what it does, what decision it
   influences, who sees its output.
2. **Run the three questions** in the flow above for each, and record the
   answer and the reasoning.
3. **Check the prohibitions** for any camera, microphone or biometric feature.
4. **Implement Article 50 disclosures** where people interact with the system or
   receive generated content.
5. **Add models to the component inventory** and the update process under the
   CRA.
6. **If anything is high-risk**, plan the AI Act file and the CRA file as one
   technical documentation, and budget for the 2027 or 2028 date that applies.

## Why I am writing this

I write these articles as research: to understand the sector and how companies
actually run compliance day to day. They are also groundwork for a product I
will probably build, to streamline how companies handle their compliance
processes. If that interests you, **[write to me](mailto:me@bernardoforcillo.com?subject=AI%20Act%20in%20products)** at
[me@bernardoforcillo.com](mailto:me@bernardoforcillo.com?subject=AI%20Act%20in%20products).

_Disclosure: I work on connected products at Ganiga. Nothing is for sale yet._

## Frequently asked questions

### When do the AI Act's high-risk rules apply after the AI Omnibus?

Under Regulation (EU) 2026/1744, in force since 27 July 2026, high-risk rules for
stand-alone systems listed in Annex III apply from 2 December 2027, and those for
AI in products covered by the EU product laws in Annex I apply from 2 August 2028.

### Is AI in a connected device high-risk under the AI Act?

Usually not. It is high-risk if it is a safety component of a product covered by
the EU product laws in Annex I that requires third-party conformity assessment,
or if it serves a use listed in Annex III, such as a safety component in critical
infrastructure or biometric identification. Classification, anomaly detection and
predictive maintenance features are typically outside both routes.

### How does the AI Omnibus change AI in machinery?

It moved the Machinery Regulation from Section A to Section B of the AI Act's
Annex I. Instead of applying the AI Act's high-risk requirements directly, the
Commission will carry them into the Machinery Regulation's essential
requirements through delegated acts, making that regulation the main framework
for AI that performs safety functions in machinery.

### Does CRA compliance help with the AI Act?

For cybersecurity, yes. Under Article 12 of the CRA, a high-risk AI system that is
a product with digital elements and meets the CRA's essential requirements is
presumed to meet the AI Act's cybersecurity requirement, as shown by the CRA
declaration of conformity. The other AI Act requirements need their own evidence.

### What AI Act rules apply to AI that is not high-risk?

The prohibitions on certain practices, in force since February 2025, and the
transparency obligations of Article 50, in force since 2 August 2026, which
require informing people that they interact with an AI system and marking
AI-generated content. The product itself remains subject to the CRA.

### Who enforces the AI Act in Italy?

Legislative Decree 7 October 2026, no. 179, names the national cybersecurity
agency, ACN, as market surveillance authority and single point of contact, and
AgID as notifying authority, with financial supervisors responsible for high-risk systems in their sectors. For AI inside products covered by EU product laws, the sectoral market surveillance authorities stay competent (Article 74(3)).

## Read next

- [The map: EU product compliance 2026–2028](/blog/compliance/eu-product-compliance-map),
  every law, date and owner on one page.
- [One product, many laws: one evidence base](/blog/compliance/one-evidence-base),
  for merging the AI Act and CRA files.
- [Cybersecurity in the Machinery Regulation](/blog/compliance/machinery-regulation-cybersecurity),
  where AI in machinery is now regulated.
- [Engineering for the CRA](/blog/security/cra-for-ctos), for models as
  components and the update pipeline.

## References

Checked on 20 November 2026. EUR-Lex texts are primary sources; the rest are
secondary.

- [_Regulation (EU) 2024/1689, AI Act_](https://eur-lex.europa.eu/eli/reg/2024/1689/oj),
  EUR-Lex. Articles 5, 6, 15, 25, 27, 50, 74; Annexes I and III.
- [_Regulation (EU) 2026/1744, Digital Omnibus on AI_](https://eur-lex.europa.eu/eli/reg/2026/1744/oj),
  EUR-Lex.
- [_Regulation (EU) 2024/2847, Cyber Resilience Act_](https://eur-lex.europa.eu/eli/reg/2024/2847/oj),
  EUR-Lex. Articles 12 and 31.
- White & Case,
  [_EU AI Omnibus enters into force, amending the AI Act_](https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act).
- Cooley,
  [_Digital AI Omnibus delays key deadlines, introduces new rules_](https://cdp.cooley.com/digital-ai-omnibus-delays-key-deadlines-introduces-new-rules/).
- Orrick,
  [_EU AI Act update: Digital Omnibus finalizes 8 compliance changes_](https://www.orrick.com/en/Insights/2026/07/EU-AI-Act-Update-Digital-Omnibus-Finalizes-8-Compliance-Changes),
  July 2026.
- Mayer Brown,
  [_EU AI Act news: Digital Omnibus on AI, new guidance on risk classification_](https://www.mayerbrown.com/en/insights/publications/2026/07/eu-ai-act-news-digital-omnibus-on-ai-new-guidance-on-risk-classification-gpai-and-transparency-obligations),
  30 July 2026.
- EU AI Act reference,
  [_Regulation (EU) 2026/1744, Articles 2 and 3: sectoral amendments_](https://www.euaiact.com/digital-omnibus-ai/sectoral-amendments).
- Eurogip,
  [_Machinery Regulation 2023/1230: what the Digital Omnibus on AI changes_](https://eurogip.fr/en/machinery-regulation-2023-1230-what-the-digital-omnibus-on-ai-changes/).
- Sidley,
  [_The EU AI Act's machinery exemption: does it extend to surgical robotics?_](https://goodlifesci.sidley.com/2026/06/11/the-eu-ai-acts-machinery-exemption-does-it-extend-to-surgical-robotics/).
- Agenda Digitale,
  [_AI Act, come funzionano le nuove sanzioni previste in Italia_](https://www.agendadigitale.eu/sicurezza/ai-act-come-funzionano-le-nuove-sanzioni-previste-in-italia/),
  16 October 2026.
