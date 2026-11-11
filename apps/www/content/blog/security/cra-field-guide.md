---
title: 'The CRA is already live: a field guide to product security evidence'
seoTitle: 'Cyber Resilience Act (CRA) field guide for CISOs'
description: "The CRA's 24-hour reporting duty has applied since 11 September 2026. What evidence EU manufacturers must keep, what is unsettled, and a 90-day plan."
date: 2026-11-11
tags:
  - cyber resilience act
  - cra
  - product security
  - vulnerability reporting
  - sbom
  - ciso
  - compliance
about:
  - name: Cyber Resilience Act, Regulation (EU) 2024/2847
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
  - name: European Union Agency for Cybersecurity (ENISA)
    url: https://www.enisa.europa.eu/
---

**Key takeaways**

- Since **11 September 2026**, a manufacturer selling a product with digital
  elements in the EU must report actively exploited vulnerabilities and severe
  incidents through ENISA's Single Reporting Platform: an early warning within
  **24 hours**, a notification within **72 hours**, then a final report.
- The reporting duty already covers products on the market, including ones
  shipped years before the Cyber Resilience Act.
- From **11 December 2027**, each product also needs a risk assessment against
  Annex I, an SBOM, a vulnerability-handling process, a support period of at
  least five years and technical documentation kept for ten years.
- No harmonised standard is cited yet, so makers of important class I products
  may need a notified body instead of self-assessment.
- The hard part is not the rules but the evidence: per release, kept for years,
  with a named owner for the moment of "awareness".

## Why this lands on the CISO's desk

Since 11 September 2026, a manufacturer that sells a product with digital
elements in the EU has 24 hours to warn the authorities once it learns that a
vulnerability in that product is being actively exploited. Most of the Cyber
Resilience Act (CRA, Regulation (EU) 2024/2847) applies from 11 December 2027,
but this duty is in force today, and it covers products that are already in the
field.

That changes who owns the problem. Product security used to be an engineering
practice; under the CRA it is a legal obligation with a clock, a regulator and a
file that must be kept for years. Someone has to make that work, and the CISO is
the obvious candidate, whether or not the product organisation reports to them.

I build connected products, and I am working through the CRA on our own product.
This article sets out what the regulation expects as evidence, where I think the
hard part really is, and what remains unsettled. It ends with questions for
readers, which you can answer by email, because many of you have run
evidence programmes for far longer than the CRA has existed. I am not a lawyer;
the sources are listed at the end so every claim can be checked.

## What is already in force

Only one part of the CRA applies today, and it is the part with the shortest
deadline: Article 14, the reporting of actively exploited vulnerabilities and
severe incidents.

```tikz When each part of the CRA applies.
% Alt: A timeline: the CRA entered into force on 10 December 2024; rules on notified bodies applied from 11 June 2026; Article 14 reporting has applied since 11 September 2026 and is in force now; everything else, including Annex I, technical documentation, conformity assessment and CE marking, applies from 11 December 2027.
\begin{tikzpicture}[milestone/.style={anchor=west, align=left, inner sep=0pt}]
  % The rail: faint for the whole span, accent for the part already behind us.
  \draw[line width=1.6pt, draw opacity=0.15] (0,0) -- (0,-4.36);
  \draw[line width=1.6pt, accent] (0,0) -- (0,-3);
  \fill[accent] (0,0) circle (3pt);
  \fill[accent] (0,-1.5) circle (3pt);
  \fill[accent, fill opacity=0.2] (0,-3) circle (8pt);
  \fill[accent] (0,-3) circle (4pt);
  \draw[line width=1.2pt, draw opacity=0.45] (0,-4.5) circle (3.2pt);
  \node[milestone] at (0.5,0) {{\small\bfseries 10 Dec 2024}\\[1pt]{\footnotesize The CRA enters into force}};
  \node[milestone] at (0.5,-1.5) {{\small\bfseries 11 Jun 2026}\\[1pt]{\footnotesize Rules on notified bodies apply}};
  \node[milestone] (now) at (0.5,-3) {{\small\bfseries\color{accent} 11 Sep 2026}\\[1pt]{\footnotesize Article 14 reporting applies}};
  \node[tag, anchor=west] at ([xshift=8pt]now.east) {IN FORCE NOW};
  \node[milestone] at (0.5,-4.5) {{\small\bfseries 11 Dec 2027}\\[1pt]{\footnotesize Everything else: Annex I, technical file, CE marking}};
\end{tikzpicture}
```

Four details matter more than the dates.

**The clock has three stops.** An early warning within 24 hours of becoming
aware, a notification within 72 hours, and a final report: 14 days after a
corrective or mitigating measure is available for a vulnerability, or one month
after the notification for a severe incident. The independent CRA guide notes
that Commission guidance ties "aware" to an initial assessment that gives
reasonable certainty. That decision is where most of the 24 hours will go.

```tikz The Article 14 reporting clock.
% Alt: A sequence of four steps: the manufacturer becomes aware of active exploitation; an early warning is due within 24 hours of awareness; a notification within 72 hours of awareness; a final report 14 days after a fix is available, or one month after the notification for a severe incident.
\begin{tikzpicture}[node distance=0.95cm, stage/.style={box, text width=4.2cm}]
  \node[hot, text width=4.2cm] (a) {\textbf{Aware}\\[1pt]{\scriptsize an initial assessment gives reasonable certainty}};
  \node[stage, below=of a] (b) {\textbf{Early warning}};
  \node[stage, below=of b] (c) {\textbf{Notification}};
  \node[stage, below=of c] (d) {\textbf{Final report}};
  \draw[flow] (a) -- node[right=3pt, note] {{\color{accent}\bfseries 24 h} after $t_a$} (b);
  \draw[flow] (b) -- node[right=3pt, note] {{\color{accent}\bfseries 72 h} after $t_a$} (c);
  \draw[flow] (c) -- node[right=3pt, note] {{\color{accent}\bfseries 14 days} after a fix, or\\{\color{accent}\bfseries 1 month} after notification} (d);
\end{tikzpicture}
```

Written as deadlines, with $t_a$ the moment of awareness, $t_n$ the
notification and $t_f$ the moment a corrective or mitigating measure is
available:

$$
\begin{aligned}
t_{\text{early warning}} &\le t_a + 24\,\text{h} \\
t_{\text{notification}} &\le t_a + 72\,\text{h} \\
t_{\text{final report}} &\le
\begin{cases}
t_f + 14\,\text{days} & \text{actively exploited vulnerability} \\
t_n + 1\,\text{month} & \text{severe incident}
\end{cases}
\end{aligned}
$$

Only $t_a$ is a decision. Every other deadline follows from it, which is why
the moment of awareness needs a named owner.

**Legacy products are in.** Under Article 69(2), products placed on the market
before 11 December 2027 fall under the product requirements only if they are
substantially modified. Article 69(3) makes an exception for reporting: Article
14 applies to every in-scope product, including the ones shipped years ago. A
product can be outside Annex I and still be reportable.

**The submission is manual.** Reports go through ENISA's Single Reporting
Platform to the CSIRT designated as coordinator in the manufacturer's main
Member State, and to ENISA at the same time. At launch there is no API: it is a
browser form behind an EU Login account. So the 24 hours is a people problem:
who decides, who holds the login, who covers the weekend.

```tikz From first signal to a filed report.
% Alt: A flow: signals arrive in different teams as support tickets, researcher emails and threat-intel feeds; one named owner decides the manufacturer is aware, which starts the 24-hour clock; the report is filed on the Single Reporting Platform with a personal EU Login and MFA, without an API; the platform sends it to the coordinator CSIRT and to ENISA at the same time.
\begin{tikzpicture}[sig/.style={box, font=\scriptsize, minimum height=0.85cm, text width=1.65cm}]
  \node[sig] (s2) {Researcher\\email};
  \node[sig, left=0.3cm of s2] (s1) {Support\\ticket};
  \node[sig, right=0.3cm of s2] (s3) {Threat-intel\\feed};
  \node[note, above=4pt of s2] {\textbf{SIGNALS}, in different teams};
  \node[hot, text width=5.2cm, below=1.05cm of s2] (o) {\textbf{One named owner decides ``aware''}\\[1pt]{\scriptsize the 24-hour clock starts here: $t_a$}};
  \node[box, text width=5.2cm, below=0.9cm of o] (p) {\textbf{Single Reporting Platform}\\[1pt]{\scriptsize personal EU Login with MFA, no API}};
  \node[box, anchor=north east, text width=2.3cm, minimum height=1.25cm] (c) at ([xshift=-0.25cm, yshift=-0.95cm]p.south) {Coordinator CSIRT};
  \node[box, anchor=north west, text width=2.3cm, minimum height=1.25cm] (e) at ([xshift=0.25cm, yshift=-0.95cm]p.south) {ENISA};
  \draw[flow] (s1.south) -- (o.north -| s1.south);
  \draw[flow] (s2.south) -- (o.north);
  \draw[flow] (s3.south) -- (o.north -| s3.south);
  \draw[flow] (o) -- (p);
  \draw[flow] (p.south) -- (c.north);
  \draw[flow] (p.south) -- (e.north);
  \node[note, below=2pt of c.south east, anchor=north] {sent to both at once};
\end{tikzpicture}
```

**The relief for small companies is narrow.** Article 64(10) says
microenterprises and small enterprises are not fined for missing the 24-hour
early warning. The duty to report stays, and the 72-hour notification and the
final report keep their penalties. Medium-sized companies get no relief at all.

One point is not settled: whether a missed report can be fined before 11
December 2027. The CRA Response Center guide argues that it cannot, because
Article 71(2) applies Article 14 from September 2026 but Article 64, the
penalties article, only from December 2027. The same guide notes that at least
one law firm reads it differently. If you have had a formal answer from a
national authority, I would like to hear it.

## What a manufacturer must be able to prove

From 11 December 2027 the CRA asks for nine kinds of evidence per product, and
an authority can ask to see any of them. The article and annex numbers below
follow the regulation as summarised in the NHIMG guide and in Katharina
Koerner's analysis.

| Evidence                    | Where the CRA asks for it            | What it has to show                                                                                                                                                                                  |
| --------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cybersecurity risk assessment | Article 13(2)-(4)                  | Documented and kept current through the support period; for each product requirement, whether it applies and how it is met, with a justification where it does not apply                            |
| Product security properties | Annex I, Part I                      | No known exploitable vulnerabilities at release, secure defaults, access control, confidentiality and integrity of data, data minimisation, availability, reduced attack surface, logging, secure deletion |
| Vulnerability handling      | Annex I, Part II                     | Components and vulnerabilities documented, fixes without delay, regular testing, disclosure of fixed vulnerabilities, a coordinated disclosure policy, secure and free security updates               |
| SBOM                        | Annex I, Part II, point 1            | Machine-readable, covering at least top-level dependencies; kept in the technical file, not published                                                                                               |
| Third-party components      | Article 13(5)-(6)                    | Due diligence on integrated components, open source included; vulnerabilities found are reported to the maintainer                                                                                   |
| Support period              | Article 13(8)-(9)                    | At least five years unless the product is expected to be used for less; each update stays available for ten years or the rest of the support period                                                 |
| User information            | Annex II                             | A contact point for vulnerability reports, the support end date, instructions for secure installation and decommissioning                                                                           |
| Technical documentation     | Article 31, Annex VII, Article 13(13) | Product description, design, risk assessment, standards applied, test reports, vulnerability handling, SBOM; kept ten years or for the support period if longer                                     |
| Conformity assessment       | Article 32, Annexes III and IV       | Self-assessment for default products; standards or a notified body for the 19 important class I categories; a third party for the 4 class II and 3 critical categories                               |

Three points in that table change how a security team has to work.

**The benchmark is not your risk appetite.** A risk register records a decision
to accept a finding. The CRA asks whether each Annex I requirement is
implemented, not applicable with a reason, or met another way. Koerner puts it
precisely: an acceptance entry is evidence of a decision, not evidence that a
requirement has been met.

**The method is free, the traceability is not.** The Commission's FAQ lets the
manufacturer choose how it identifies and treats risk. What it must be able to
show is how each risk was identified, evaluated and mitigated. STRIDE, attack
trees or your own method all work, as long as the chain from threat to control
to test can be followed.

```tikz The chain an authority must be able to follow.
% Alt: A chain of four steps: a threat, found with STRIDE, attack trees or any method; the Annex I requirement it touches, applicable or not with a reason; the control that meets it; and the test result that proves it works, with where it is filed.
\begin{tikzpicture}[node distance=0.6cm, link/.style={box, text width=2.4cm}, why/.style={note, text width=3.7cm, anchor=west}, num/.style={font=\scriptsize\bfseries, text=accent}]
  \node[link] (a) {\textbf{Threat}};
  \node[link, below=of a] (b) {\textbf{Requirement}};
  \node[link, below=of b] (c) {\textbf{Control}};
  \node[hot, text width=2.4cm, below=of c] (d) {\textbf{Test and proof}};
  \draw[flow] (a) -- (b);
  \draw[flow] (b) -- (c);
  \draw[flow] (c) -- (d);
  \node[num, left=5pt of a] {1};
  \node[num, left=5pt of b] {2};
  \node[num, left=5pt of c] {3};
  \node[num, left=5pt of d] {4};
  \node[why] at ([xshift=0.35cm]a.east) {found with STRIDE, attack trees or your own method};
  \node[why] at ([xshift=0.35cm]b.east) {the Annex I requirement: applies or not, and why};
  \node[why] at ([xshift=0.35cm]c.east) {how the product meets it};
  \node[why] at ([xshift=0.35cm]d.east) {the result that shows it works, and where it is filed};
\end{tikzpicture}
```

**The file can be requested.** Under Article 53 a market surveillance authority
can ask, on a reasoned request, for data and internal documentation. The CRA
Response Center guide reads this as including the record of when you became
aware of an incident and when you notified it.

## Where the work breaks in practice

The requirements are readable; the difficulty is that the evidence already
exists and is scattered. What follows is my own reading from working on our
product and from what practitioners publish. Treat it as hypotheses to correct.

**The unit is the release, not the organisation.** An ISMS produces evidence per
organisation, per year. The CRA wants it per product and per version: which
components shipped, which vulnerabilities were open, what was decided and why.
Scanners hold one part, spreadsheets another, documents a third, and every
release restarts the search.

**"Aware" has no owner.** The 24 hours start when the manufacturer becomes aware
of active exploitation. In practice a support ticket, a researcher's email and a
threat-intel feed arrive in three different teams. Without a named person who
decides, the clock starts before anyone knows it is running.

**An SBOM without triage is an alert feed.** Generating the bill of materials is
the cheap step. Deciding that a component vulnerability does not affect the
product, and recording the reason so that it survives an audit, needs a person
and a place to keep the decision.

**The documents age faster than the product.** A technical file written once is
easy. Keeping the architecture description, the risk assessment and the test
evidence aligned with what actually shipped is where teams fall behind.

**The time horizons outlive the team.** Five years of support and ten years of
retention are longer than most tool contracts and many careers in one company.
Whoever answers the authority in 2034 will not be the person who wrote the file.

The one large survey available points the same way. ENISA surveyed 194 SMEs in
31 countries in February and March 2026: 66% had heard of the CRA, incident
response and product lifecycle management were the weakest capabilities, and
more than 70% asked for templates for technical documentation and secure
development. Company size was the most consistent predictor of maturity.

A note on AI assistants, since many of us now use them for this work. They can
read an architecture, propose risks and keep documents current, which matters
when there are hundreds of products. Koerner's caution is the right one: they
change the volume of work, not who is responsible, so every generated claim
needs review and a link to the evidence behind it.

## If you buy products rather than make them

Many readers run security for organisations that buy connected products and
software. The CRA gives you evidence you could not demand before, and it meets
your NIS2 supply-chain duties halfway.

The two laws regulate different things. The CRA covers products placed on the
market; NIS2 covers how in-scope entities secure their own operations. A vendor
can be under both, and one incident can trigger a CRA product report and a NIS2
entity report.

From December 2027, a CE-marked product with digital elements comes with a set
of facts you can ask for:

- **The support end date.** It must be stated to the user, so it can be a
  procurement criterion.
- **A vulnerability contact and a disclosure policy.** Both are mandatory, so
  their absence is a finding.
- **The product class.** Default, important or critical tells you whether a
  third party looked at the product or the manufacturer assessed itself.
- **The SBOM, on request.** The CRA does not make it public, but it must exist
  per product, so a contract can require access.
- **The EU declaration of conformity.** It names the manufacturer and the rules
  the product claims to meet.

Two cautions. First, until 11 December 2027 none of this is owed for new
products, and for older products it is owed only after a substantial
modification, so supplier answers will be uneven for years. Second, check your
own role: importers and distributors have verification duties of their own, and
a company that sells a product under its own name can end up with a
manufacturer's obligations.

## What is still unsettled

Five things are open as of early November 2026, and each one changes how much
work a manufacturer has to do by hand.

**No harmonised standard gives a presumption of conformity yet.** The Commission
asked for 41 standards under request M/606. According to the CRA Evidence
tracker, as of 6 November 2026 none is cited in the Official Journal. The first
two horizontal standards, EN 40000-1-1 and EN 40000-1-2, were ratified on 2
November 2026 but are not expected to be cited. The vulnerability-handling
standard is still under approval, and the original 2026 delivery dates have
passed. Until a citation appears, conformity has to be shown by documenting your
own solutions against Annex I.

**Class I manufacturers may lose the self-assessment route.** Makers of the 19
important class I categories can self-assess only by applying harmonised
standards in full. Without cited standards, the alternative is a notified body,
and nobody knows how much capacity those bodies will have in 2027.

```tikz Who checks the product, by class.
% Alt: Who checks the product, by class, from least to most outside scrutiny: default products are self-assessed by the manufacturer; important class I products, 19 categories, are self-assessed only with harmonised standards applied in full and otherwise go to a notified body; important class II products, 4 categories, go to a notified body; critical products, 3 categories, go to a third party.
\begin{tikzpicture}[row/.style={box, align=left, text width=5.6cm, font=\footnotesize, minimum height=0.85cm}, node distance=0.18cm]
  % Four dots per row: filled up to the level of outside scrutiny.
  \newcommand{\meter}[2]{%
    \foreach \i in {1,...,4}{%
      \ifnum\i>#2
        \draw[line width=0.8pt, draw opacity=0.3] ([xshift={4pt+\i*9pt}]#1.east) circle (2.8pt);
      \else
        \fill[accent] ([xshift={4pt+\i*9pt}]#1.east) circle (3.2pt);
      \fi
    }%
  }
  \node[row] (r1) {\textbf{Default} {\scriptsize most products}\\[1pt]Self-assessment by the manufacturer};
  \node[row, below=of r1] (r2) {\textbf{Important, class I} {\scriptsize 19 categories}\\[1pt]Self-assessment only with harmonised standards applied in full; otherwise a notified body};
  \node[row, below=of r2] (r3) {\textbf{Important, class II} {\scriptsize 4 categories}\\[1pt]A notified body};
  \node[row, below=of r3] (r4) {\textbf{Critical} {\scriptsize 3 categories}\\[1pt]A third party};
  \meter{r1}{1}
  \meter{r2}{2}
  \meter{r3}{3}
  \meter{r4}{4}
  \node[note, anchor=south, align=center] at ([xshift={4pt+22.5pt}, yshift=3pt]r1.north east) {outside\\scrutiny};
\end{tikzpicture}
```

With no harmonised standard cited yet, class I in practice means a notified
body. The categories are defined in Implementing Regulation (EU) 2025/2392.

**Classification needs the fine print.** The category names in Annexes III and
IV are short. The technical descriptions are in Implementing Regulation (EU)
2025/2392, and a wrong class means a wrong conformity route.

**Cloud back ends sit on a boundary.** Remote data processing that a product
needs in order to work is in scope; stand-alone SaaS generally is not. The
Commission's guidance of July 2026 spends its longest part on this line, which
tells you how many products sit near it.

**The laws overlap without merging.** Koerner's map is the clearest I have
found. The CRA has a written bridge to the AI Act: a high-risk AI product that
meets Annex I is deemed to meet the AI Act's cybersecurity requirement. It has
no bridge to the GDPR. Evidence can be reused across these files; conclusions
mostly cannot.

National enforcement is also still being built. The same guide on fines reports
that Germany's implementing act, which would give the role to the BSI, had not
been promulgated by mid-October 2026, and that Austria had not yet named its
market surveillance authority.

## What I would do in the next 90 days

The first four steps cover the duty that is already live; the rest prepare for
December 2027.

1. **List every product with digital elements you have on the EU market**,
   including the ones you no longer sell but customers still use. Article 14
   covers them.
2. **Name who decides "aware" and who files.** Register the people on the Single
   Reporting Platform now: each needs a personal EU Login with multi-factor
   authentication, and the CSIRT validates the link to the company.
3. **Run one rehearsal outside office hours.** Simulate an exploited
   vulnerability in a shipped product and time the path from first signal to a
   submitted early warning.
4. **Pre-draft the early warning.** Product, versions, Member States where it is
   sold, contact details. The fields that never change should not be typed at
   2 a.m.
5. **Classify each product** as default, important or critical against
   Implementing Regulation (EU) 2025/2392, and write down the reasoning.
6. **Produce an SBOM for each shipped version** and decide where triage
   decisions are recorded.
7. **Publish a vulnerability contact and a disclosure policy**, and set a
   support end date per product.
8. **Start the Article 13 risk assessment as a table of Annex I requirements**:
   applies or not, why, how it is met, where the proof is.
9. **Decide where the technical file lives for ten years**, and who owns it when
   people move on.
10. **Ask your main component suppliers for their SBOM, support period and
    vulnerability contact.** Their answers are your due-diligence evidence.

## Questions for you

To be clear about why I am asking: these questions are market research. We are
exploring potential solutions that make CRA compliance plug and play, so that
product teams can build it into a product instead of assembling it by hand for
every release. Your answers decide what is worth building.

I would rather learn from what you have already done than from what vendors say
you should do. If you work on this, from either the making or the buying side,
**[email me your answers](mailto:me@bernardoforcillo.com?subject=CRA%20field%20guide%3A%20my%20answers)**
at [me@bernardoforcillo.com](mailto:me@bernardoforcillo.com?subject=CRA%20field%20guide%3A%20my%20answers).
Two lines on any one of these questions is enough; you do not need to answer
them all. Over the next few weeks we will use your answers to shape a first
plug-and-play solution to the problems they describe.

1. When did your team last have to decide whether a vulnerability in a shipped
   product was being actively exploited? Who made the call, and how long did it
   take?
2. Where does your product security evidence live today, and what did you have
   to rebuild by hand for the last release or the last audit?
3. Who owns the CRA in your company: the CISO, product, quality or legal? How
   was that decided?
4. Have you filed, or rehearsed filing, on the Single Reporting Platform? What
   surprised you?
5. What have you spent on the CRA so far, in people, tools or consultants? What
   would you not buy again?
6. Which part of the work did tooling really take off your hands, and which part
   stayed manual?
7. If you are on the buying side: have you asked a supplier for an SBOM, a
   support end date or a vulnerability contact? What came back?

_Disclosure: I work on connected products at Ganiga. This post is part of
market research into plug-and-play CRA solutions; nothing is for sale yet, and
the questions above are not a sales pitch._

## Frequently asked questions

### When does the Cyber Resilience Act apply?

The CRA entered into force on 10 December 2024. The rules on notifying
conformity assessment bodies apply from 11 June 2026, and the Article 14
reporting duty from 11 September 2026. Everything else, including the Annex I
requirements, technical documentation, conformity assessment and CE marking,
applies from 11 December 2027.

### What are the CRA reporting deadlines?

For an actively exploited vulnerability or a severe incident, the manufacturer
sends an early warning within 24 hours of becoming aware, a notification within
72 hours, and a final report 14 days after a corrective or mitigating measure is
available (vulnerability) or one month after the notification (severe
incident). Reports go through ENISA's Single Reporting Platform to the
coordinator CSIRT and to ENISA at the same time.

### Does the CRA apply to products already on the market?

For reporting, yes: Article 14 applies to every in-scope product, including
those placed on the market before 11 December 2027. The product requirements
apply to those older products only if they are substantially modified.

### Is an SBOM mandatory under the CRA?

From 11 December 2027, yes. Each product needs a machine-readable software bill
of materials covering at least its top-level dependencies. It is kept in the
technical documentation rather than published, and a market surveillance
authority can ask to see it.

### How long must manufacturers support a product?

The support period is at least five years, unless the product is expected to be
used for less. Each security update stays available for ten years or for the
rest of the support period, and the technical documentation is kept for ten
years or for the support period if that is longer.

### Do small companies get relief from CRA reporting?

Only a little. Under Article 64(10), microenterprises and small enterprises are
not fined for missing the 24-hour early warning. The duty to report stays, and
the 72-hour notification and the final report keep their penalties.
Medium-sized companies get no relief.

### Can a manufacturer self-assess CRA conformity?

For default products, yes. Makers of important class I products can self-assess
only by applying harmonised standards in full, and as of 6 November 2026 none is
cited in the Official Journal, so the alternative is a notified body. Important
class II and critical products need a third party.

## References

Checked on 11 November 2026. Apart from the regulation itself and the two ENISA
pages, these are secondary sources; article and annex numbers should be
confirmed against the official text before you rely on them.

- [_Regulation (EU) 2024/2847, Cyber Resilience Act_](https://eur-lex.europa.eu/eli/reg/2024/2847/oj),
  official text on EUR-Lex.
  Articles 13, 14, 31, 32, 53, 64, 69, 71; Annexes I, II, III, IV, VII.
- ENISA,
  [_Single Reporting Platform: frequently asked questions_](https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp/frequently-asked-questions). Go-live date,
  access roles, no API at launch, legacy products.
- ENISA,
  [_Where do SMEs stand in preparing for the Cyber Resilience Act?_](https://www.enisa.europa.eu/news/where-do-smes-stand-in-preparing-for-the-cyber-resilience-act), 13
  July 2026. Survey of 194 organisations.
- cyberresilienceact.eu,
  [_CRA reporting: Article 14_](https://www.cyberresilienceact.eu/reporting.html). Independent guide to
  deadlines, triggers and the platform.
- CRA Response Center,
  [_Fines and market surveillance under the CRA_](https://cra-response-center.com/guides/fines/). Penalty
  tiers, Article 64(10), the argument on fines before December 2027, national
  authorities.
- NHIMG,
  [_EU Cyber Resilience Act Guide_](https://nhimg.org/eu-cyber-resilience-act-guide). Annex I, Article 13 duties, product
  classes, CRA and NIS2.
- CRA Evidence,
  [_CRA harmonised standards status_](https://craevidence.com/cra-compliance/harmonised-standards-status), as of 6 November 2026.
- Katharina Koerner,
  [_One Product, Four Risk Assessments?_](https://www.linkedin.com/pulse/one-product-four-risk-assessments-eu-cyber-resilience-koerner-dzypc/),
  5 November 2026.
  Risk assessment benchmark, Commission FAQ and guidance, bridges to the AI Act
  and the GDPR.
