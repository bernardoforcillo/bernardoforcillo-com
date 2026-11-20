---
title: 'What the Cyber Resilience Act costs: budget, fines and liability'
seoTitle: 'CRA compliance cost: budget, fines, liability'
description: 'What CRA compliance costs per product, the fines and withdrawal risk, five years of support as a priced promise, liability from December 2026 and EU funding.'
date: 2026-11-20
tags:
  - cyber resilience act
  - cra
  - cra cost
  - cra fines
  - compliance budget
  - product liability directive
  - compliance costs
  - connected products
about:
  - name: Cyber Resilience Act, Regulation (EU) 2024/2847
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
  - name: Product Liability Directive, Directive (EU) 2024/2853
    url: https://eur-lex.europa.eu/eli/dir/2024/2853/oj
---

**Key takeaways**

- The Commission's 2022 impact assessment puts CRA compliance at about **€61,000–68,000 per product**: about €42,700 for secure development plus €18,400–25,000 for conformity assessment, before documentation, which the same study puts at a further 9% of development cost. A consultancy puts a first product at about **€100,000**, internal and external cost together. A cost
  calculator gives **€78,300 one-off and €13,500 a year** for three products.
- The largest line is not paperwork. In both the Commission's model and the
  calculator, secure development is the biggest share: €13.13 billion of €29
  billion, and €54,500 of €78,300.
- Fines reach **€15 million or 2.5% of worldwide turnover**, whichever is
  higher. For a product company, being told to withdraw a product is usually
  the larger exposure.
- The CRA applies **unit by unit**: every unit placed on the market from 11
  December 2027 must comply. That turns compliance into a production and
  inventory decision.
- The support period, at least **five years**, is a promise of free security
  updates made at the moment of sale. From December 2026 the new Product
  Liability Directive makes a missing update a liability question too.
- EU money exists but is small and closing: the SECURE call pays up to
  **€30,000 at 50%** and closes on **11 December 2026**.

_Part of a series on EU product compliance for connected-product makers. For
the full calendar and who owns what, start with
[the map](/blog/compliance/eu-product-compliance-map)._

## Why the CFO should own a number, not a checkbox

The Cyber Resilience Act (CRA, Regulation (EU) 2024/2847) is usually presented
as a security topic, and the reporting duty that has applied since 11 September
2026 is indeed one for the CISO. But most of what the CRA asks for from 11
December 2027 is spending: engineering time, testing, documentation, sometimes a
notified body, and a stream of free security updates for years after each sale.

In the companies I talk to, the CRA tends to reach the board as a compliance
item and leave it as a cost to minimise. That matches what two people told us
in interviews this month: compliance is seen as a cost, and decisions go to the
board looking for the cheapest option. ENISA's survey of 194 organisations, mostly SMEs, points the
same way, with implementation cost cited as a difficulty by 56.2% of
respondents and financial support requested by 73.2%.

Minimising is a reasonable instinct, but it needs a number. This article sets
out what the public benchmarks say, where the money goes, what the downside
looks like and which decisions only finance can make. I build connected
products at Ganiga, so I am working through the same arithmetic. I am not an
accountant or a lawyer; the sources are at the end.

## What compliance costs: three benchmarks

There is no audited figure for what the CRA costs a real company, because full
application is a year away. There are three public benchmarks, and they measure
different things.

| Source                                                                 | What it measures                                                    | Figure                                                                                                                                                                                  |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| European Commission, impact assessment SWD(2022) 282                   | Average cost per product, by type of cost                           | Secure development about €42,700 (30.5% of an average €140,000 development cost); conformity assessment about €18,400 with self-assessment or about €25,000 with a third party; so about €61,000–68,000 before documentation, which the study puts at a further 9% of development cost. Recurrent operating cost of €3,000–5,000 per product from a targeted survey                                |
| Same document, option 4(b)(ii)                                         | Total for the economy, all software and hardware                    | About €29 billion: €13.13 billion secure development, €8.1 billion conformity testing, €7.8 billion documentation, declaration, CE marking and reporting                                 |
| cetome, consultancy price list (September 2026)                        | External fees for one company                                       | Scoping €1,000 per product type; gap analysis €5,000 per product or €20,000 per portfolio; risk assessment €8,000–10,000; technical documentation from €15,000 (simple) or €30,000 (complex); about €100,000 for a first product, internal and external cost together |
| cyberresilienceact.eu calculator, calibrated on i46's model at €45/h (a low rate) | One company, three products, security foundations already in place  | €78,300 one-off; €13,500 a year                                                                                                                                                         |

The spread is wide for good reasons. The Commission's figure is an average over
the whole economy and could not separate one-off from recurring costs. The
consultancy figure includes the first-time effort of building processes that
later products reuse. The calculator assumes some maturity already exists. None
of them knows your products.

What they agree on is the shape of the spend. In the calculator's breakdown for
three products, secure development is seven tenths of the one-off budget.

```tikz Where a first CRA budget goes: one-off costs for three products, in thousands of euros.
% Alt: Horizontal bars of one-off costs from the cyberresilienceact.eu calculator, for three products with security foundations in place, total 78,300 euros: secure development uplift 54,500; documentation and SBOM 8,400; security testing 6,400; gap and risk analysis 4,000; conformity assessment 3,000; disclosure and reporting setup 2,000. Ongoing costs are 13,500 euros a year.
\begin{tikzpicture}[lbl/.style={anchor=east, font=\scriptsize}, val/.style={anchor=west, font=\scriptsize}]
  \foreach \y/\v/\t in {0/54.5/Secure development uplift, -0.55/8.4/Documentation and SBOM, -1.1/6.4/Security testing, -1.65/4.0/Gap and risk analysis, -2.2/3.0/Conformity assessment, -2.75/2.0/Disclosure and reporting setup}{
    \node[lbl] at (-0.12,\y) {\t};
    \fill[fill opacity=0.2] (0,{\y-0.16}) rectangle ({\v*0.072},{\y+0.16});
    \node[val] at ({\v*0.072+0.05},\y) {\v\,k};
  }
  \fill[accent, fill opacity=0.75] (0,-0.16) rectangle ({54.5*0.072},0.16);
  \node[note, anchor=west] at (0,-3.3) {Total 78.3\,k one-off; 13.5\,k a year};
\end{tikzpicture}
```

That is the first thing I would tell a board: the CRA is mainly a bill for
engineering maturity. A company that already threat-models, scans its
dependencies and ships signed updates pays mostly for documentation. A company
that does none of that pays to start doing it, and the documentation is the
small part.

The second thing is that the cheapest option has been closed explicitly. The
Commission's guidance says residual risk is judged against the essential
requirements, not against a company's own risk appetite or cost (point 158),
and that cost alone is not a valid reason to leave a risk untreated (point 163).
A risk register entry that accepts a finding because fixing it is expensive is
not evidence of compliance.

## Three layers of cost

For budgeting, I find it more useful to split CRA spending by how often it
recurs than by the categories above.

```tikz Three layers of CRA cost, and how often each is paid.
% Alt: Three stacked layers. Once per company, the platform: a reporting rota and EU Login accounts, a vulnerability disclosure policy, a secure development process, tooling and training. Once per product, then kept current: classification, the Annex I risk assessment, the technical file, conformity assessment and the support-period decision. Every release, for years, the recurring line: SBOM and triage, security testing, free security updates, advisories and file updates.
\begin{tikzpicture}[layer/.style={box, text width=6.4cm, align=left, font=\footnotesize}, node distance=0.25cm]
  \node[layer] (a) {\textbf{Once per company}: the platform\\[2pt]reporting rota and EU Login accounts, disclosure policy, secure development process, tooling, training};
  \node[layer, below=of a] (b) {\textbf{Once per product}, then kept current\\[2pt]classification, Annex I risk assessment, technical file, conformity assessment, support-period decision};
  \node[hot, text width=6.4cm, align=left, font=\footnotesize, below=of b] (c) {\textbf{Every release, for years}: the recurring line\\[2pt]SBOM and triage, security testing, free security updates, advisories, file updates};
\end{tikzpicture}
```

**The platform** is paid once and is where the first product looks expensive.
It is also the layer where a shared tool or a shared service makes the most
difference, because the work is the same for every company.

**The product layer** scales with the number of product types, not units. The
Commission's guidance on the CRA, published in the Official Journal on 17
November 2026, confirms that variants whose cybersecurity properties match can
share one risk assessment and one set of documents, as long as security-relevant
differences are reflected (points 175 to 177). A portfolio of twelve variants on
two platforms therefore costs far less than twelve unrelated products, which is
an argument for consolidating platforms before December 2027.

**The release layer** is the one finance tends to miss. It scales with release
frequency and with the length of the support period, and it never appears in a
launch budget because it starts after launch.

## The downside: fines, withdrawal and units in the warehouse

The CRA's penalties apply from 11 December 2027. Article 64 sets three tiers;
in each, the maximum is the fixed amount or the share of worldwide annual
turnover, whichever is higher.

| Tier          | What is breached                                                                                                                  | Maximum fine                     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Article 64(2) | Annex I essential requirements; manufacturer obligations in Article 13, which include drawing up the declaration of conformity and affixing the CE marking (Article 13(12)); reporting in Article 14 | €15 million or 2.5% of turnover  |
| Article 64(3) | Other obligations, including those of authorised representatives, importers and distributors, the declaration of conformity, CE marking, technical documentation and conformity assessment | €10 million or 2% of turnover    |
| Article 64(4) | Incorrect, incomplete or misleading information to notified bodies or market surveillance authorities                              | €5 million or 1% of turnover     |

Two qualifications matter for smaller companies. Under Article 64(10),
microenterprises and small enterprises cannot be fined for missing the 24-hour
early-warning deadlines in Article 14; the duty to report remains. And the
maximum is a ceiling, not a tariff: authorities set fines case by case, weighing among other things the size of the company. And for a manufacturer, a missing declaration of conformity, CE marking or technical file is not only an Article 64(3) breach: the same duties sit in Article 13, so expect them to be argued under the top tier.

In Italy, the draft decree approved in preliminary form on 2 October 2026 and sent to Parliament on 9 October (Atto del Governo 447) gives market surveillance to the national cybersecurity agency, ACN, with CRA fines, which under Article 71(2) apply from 11
December 2027. Whether a missed report can be fined before that date is
disputed; the [CRA field guide](/blog/security/cra-field-guide) sets out
both readings.

For a product company, though, the fine is rarely the worst outcome. Market
surveillance authorities can require corrective action, withdrawal from the
market or recall. A product line that cannot be sold for a quarter costs more
than most fines a small company would realistically face, and a recall of
units in the field costs more again.

**The deadline is per unit.** EU product law treats "placing on the market" as
something that happens to each individual unit, the first time it is supplied
for distribution or use. Under Article 69(2), units placed on the market before
11 December 2027 do not have to meet the CRA's product requirements unless they
are substantially modified later. Units of the same model placed from that day
must comply, even if the model launched years earlier. Units still in your own
warehouse have not been placed on the market.

That turns a regulatory date into an operations and finance decision, product
by product:

1. **Make it compliant** before the first unit ships on or after 11 December
   2027.
2. **Place the remaining stock before the date**, by supplying it to
   distributors or customers, and stop production of the old version. Under the Blue Guide, a unit is placed on the market only when its manufacture is complete and an offer or agreement transfers ownership, possession or another right in it; physical handover is not required, but stock still held by the manufacturer has not been placed. In my reading, a transfer inside your own group, or a sale with no commercial substance, is likely to be challenged as circumvention. Those units stay subject to vulnerability reporting under Article 69(3), and to product liability. Check with your auditor how a bulk sale before the date is booked: a bill-and-hold arrangement may not let you recognise the revenue.
3. **Discontinue** the product in the EU.

Each option has a cost: engineering, working capital and margin respectively.
The [CRA operating model](/blog/compliance/cra-operations) covers the
planning side.

## The support period is a promise you price

Under Article 13(8), the manufacturer must handle vulnerabilities for a support
period that reflects how long the product is expected to be used, and that
lasts at least five years unless the product is expected to be used for less.
Three further rules make it a financial commitment:

- the end date, at least month and year, must be stated clearly at the time of
  purchase (Article 13(19));
- security updates must be provided free of charge, except that a business user and the manufacturer of a tailor-made product can agree otherwise by contract (Annex I, Part II, point 8);
- each security update must stay available for at least ten years after it is
  issued, or for the rest of the support period if that is longer (Article
  13(9)).

So every unit sold carries a promise to keep monitoring, fixing, testing and
shipping updates for years, at no extra charge. Its present value for a product
line, with $c_t$ the yearly cost of that work and $r$ your discount rate, is:

$$
C_{\text{support}} = \sum_{t=1}^{T} \frac{c_t}{(1+r)^t}
$$

The question is what $T$ is. If you sell a model for $S$ years and the support
period $P$ runs from when each unit is placed on the market, which is how
Bitsea reads it, the last unit sold still needs its full period:

$$
T = S + P, \qquad P \ge 5 \text{ years}
$$

A model sold for four years would then need security updates for up to nine.
The guidance does not settle it: its Example 52 counts the period from placing "the model" on the market, without addressing units, and I could not find more in the parts of the guidance I
read, so confirm it with counsel for your own products, because it changes the
answer by years. Either way, $C_{\text{support}}$ divided by the units you
expect to sell is a cost per unit that the price has to carry.

The guidance also gives finance two levers. Five years is a floor, not a
default: the period must reflect how long the product is expected to be used,
which can be longer (point 126). But for software products that come in substantially modified versions, the duty to fix vulnerabilities (Annex I, Part II, point 2) can be limited to the latest version, provided users can move to it at no extra cost (Article 13(10), points 129 and 130). The other vulnerability-handling duties, reporting included, stay. A footnote in the guidance (footnote 19) adds that fixes for older versions can then be offered for a fee. That only works if
the upgrade does not require buying new hardware, which the guidance counts as
an additional cost. Both point the same way: keep the number of supported
software baselines small, and keep old hardware able to run the current one.

How to account for that commitment is a question for your auditor, but the likely frame is worth knowing. Under IFRS 15 (paragraphs B28 to B33), free security updates that only assure the product works as promised look like an assurance-type warranty: not a separate performance obligation, but a cost provided for under IAS 37. Under Italian GAAP the same logic leads to OIC 31. A paid extension beyond the legal minimum is more likely a separate service, with its own revenue. Ask before the first CRA-marked product ships, because the answer can change reported margins, not only the notes.

## Liability: the PLD changes who pays after the sale

The CRA is enforced by regulators. The new Product Liability Directive (PLD,
Directive (EU) 2024/2853) is enforced by the people who are harmed, in civil
courts, and it applies to products placed on the market after 8 December 2026.
For a CFO, five changes matter:

- software, including firmware and apps, is a product, related digital services count as components of the product, and liability is strict: the claimant does not have to prove fault;
- the €500 threshold for property damage is gone and Member States cannot cap
  total liability;
- destruction or corruption of data not used for professional purposes counts as damage;
- the defence that a defect did not exist when the product was sold does not
  apply when the defect comes from a missing software update that was within the manufacturer's control and necessary to keep the product safe;
- a court shall presume a product defective when it breaches mandatory safety requirements meant to protect against the damage suffered, and can order the manufacturer to disclose evidence.

Put together with the CRA, that means the support period is not only a
regulatory duty but a liability horizon. The
[deep dive on the PLD](/blog/compliance/product-liability-directive-software)
covers it in detail, including Italy's transposing decree.

This is also the moment to call your broker, before 9 December. Three questions
I would ask: does our product liability policy cover damage caused by software,
including updates we ship after the sale? Does it cover destruction or corruption of
consumers' data? And does any of our policies cover the cost of a product
security incident, such as investigation, customer notification and an
emergency update, or only incidents in our own systems?

## Money on the table

Public support exists, but it is small next to the benchmarks above.

- **SECURE.** The EU-funded SECURE project, under the Digital Europe Programme,
  opened its second call on 1 October 2026 with €11.5 million. It funds up to
  €30,000 per project at a 50% co-financing rate, so the company pays the other
  half, and **closes on 11 December 2026**. It targets SMEs working on products with digital elements; check the eligibility rules in the call text before you count on it. The first call, with €5
  million, closed in March 2026.
- **Article 33 support measures.** The CRA asks Member States, where
  appropriate, to provide SMEs with training, a help channel and support for
  testing and conformity assessment, and allows regulatory sandboxes.
  Microenterprises and small enterprises may submit technical documentation in
  a simplified form, which notified bodies must accept (Article 33(5)); the form itself still has to be set by a Commission implementing act.
- **Italy.** The draft decree (Atto del Governo 447) provides for a sandbox and a
  dedicated channel for SMEs at ACN. Details depend on the final text.

## A budget template for 2027

This is the structure I would use for a first CRA budget. The figures in the
last column are the public benchmarks above, as starting points to replace with
quotes and your own estimates.

| Line                                    | Layer    | Driver                         | Owner        | Starting point                                     |
| --------------------------------------- | -------- | ------------------------------ | ------------ | -------------------------------------------------- |
| Product scoping and classification      | Product  | Number of product types        | CTO          | About €1,000 per type (consultancy list price)     |
| Gap analysis against Annex I            | Product  | Number of products             | CTO, CISO    | €5,000 per product, or €20,000 per portfolio       |
| Secure development uplift               | Platform | Distance from current practice | CTO          | The largest line: 70% of one-off in the calculator |
| Risk assessment and technical file      | Product  | Complexity                     | CTO, quality | €8,000–10,000 plus €15,000–30,000                  |
| Conformity assessment                   | Product  | Class of product               | COO          | Self-assessment, or a notified body if required    |
| Reporting readiness and rehearsals      | Platform | People and hours covered       | CISO, COO    | Mostly internal time                               |
| Security testing per release            | Release  | Release cadence                | CTO          | Within the €13,500 a year for three products (updates, monitoring, audits)          |
| Support period                          | Release  | Product lines and years        | CFO          | $C_{\text{support}}$ above                         |
| Insurance                               | Platform | Exposure under the PLD         | CFO          | Broker quote                                       |
| Funding                                 | Offset   | Eligibility                    | CFO          | Up to €30,000 at 50% from SECURE                   |

## What I would do this quarter

1. **Count what you sell in the EU**: product types, variants, software
   baselines and expected units after 11 December 2027.
2. **Put a range on it** using the three benchmarks, then ask the CTO where the
   company sits on secure development maturity, because that decides the top
   of the range.
3. **Split the budget into platform, product and release lines**, so the
   recurring cost is visible before launch.
4. **Decide the support period per product line** with the CTO and sales, and
   price it into new contracts and list prices.
5. **Choose, product by product, how to cross 11 December 2027**: comply,
   place the remaining stock before the date, or discontinue.
6. **Call your broker before 9 December 2026** about software, data and
   product security incidents.
7. **Apply to SECURE before 11 December 2026** if you are eligible.
8. **Ask the auditor** how the support commitment should be accounted for.
9. **Put the CRA on the board's risk register** with three numbers: the fine
   ceiling, the revenue of the product lines that could be withdrawn, and the
   support cost.

## Why I am writing this

I write these articles as research: to understand the sector and how companies
actually run compliance day to day. They are also groundwork for a product I
will probably build, to streamline how companies handle their compliance
processes. If that interests you, **[write to me](mailto:me@bernardoforcillo.com?subject=CRA%20for%20CFOs)** at
[me@bernardoforcillo.com](mailto:me@bernardoforcillo.com?subject=CRA%20for%20CFOs).

_Disclosure: I work on connected products at Ganiga. Nothing is for sale yet._

## Frequently asked questions

### How much does CRA compliance cost per product?

The Commission's 2022 impact assessment puts it at about €61,000–68,000 per product: about €42,700 for secure development plus €18,400 (self-assessment) to €25,000 (third party) for conformity assessment, before documentation, which the same study puts at a further 9% of development cost. A consultancy estimate from September 2026 gives about €100,000 for a first product, internal and external cost together. A public calculator gives €78,300 one-off and
€13,500 a year for three products in a company with security foundations in
place. Secure development is the largest share in every model.

### What are the fines under the Cyber Resilience Act?

Article 64 sets three tiers: up to €15 million or 2.5% of worldwide annual
turnover for breaching the essential requirements or the manufacturer's
obligations under Articles 13 and 14; up to €10 million or 2% for other
obligations; and up to €5 million or 1% for misleading information to
authorities. In each tier the higher amount applies. Penalties apply from 11
December 2027.

### Are small companies exempt from CRA fines?

Only partly. Under Article 64(10), microenterprises and small enterprises
cannot be fined for missing the 24-hour early-warning deadlines in Article 14.
All other obligations and fines still apply to them.

### Can I keep selling non-compliant stock after 11 December 2027?

Units placed on the market before 11 December 2027 do not have to meet the
CRA's product requirements unless they are substantially modified, and
distributors can keep selling them. Units placed on the market from that date
must comply, even if the model launched earlier. Placing on the market happens
once per unit, when it is first supplied for distribution or use.

### How long must a manufacturer provide security updates under the CRA?

For the support period, which must reflect the product's expected use and be at
least five years unless the product is expected to be used for less. Updates
must be free of charge, and each one must remain available for at least ten
years after it is issued or for the rest of the support period if longer. The
end date must be stated at the time of purchase. According to the Commission's
guidance, for software with substantially modified versions the duty to fix vulnerabilities can be limited to the latest version when users can move to it at no extra cost (Article 13(10)).

### Is there EU funding for CRA compliance?

The SECURE project's second call, open from 1 October to 11 December 2026,
offers €11.5 million in total, up to €30,000 per project at 50% co-financing,
to SMEs established in the EU or EEA; check the call text for the rules on products with digital elements. The CRA
also asks Member States to offer SMEs training, help channels and support for
testing, and lets micro and small enterprises use simplified technical
documentation.

### Does the CRA change product liability?

The CRA itself sets regulatory obligations and fines. Liability towards people
harmed by a product comes from the new Product Liability Directive, which
applies to products placed on the market after 8 December 2026, treats software
as a product and removes the manufacturer's defence for defects caused by
missing updates within its control.

## Read next

- [The map: EU product compliance 2026–2028](/blog/compliance/eu-product-compliance-map),
  every law, date and owner on one page.
- [Software is now a product](/blog/compliance/product-liability-directive-software),
  the Product Liability Directive in depth.
- [Running the CRA: an operating model](/blog/compliance/cra-operations),
  including the unit-by-unit transition.
- [Engineering for the CRA](/blog/security/cra-engineering), where the largest
  budget line is spent.
- [The CRA field guide](/blog/security/cra-field-guide), on the
  reporting duty already in force.
- [Important or critical? Classifying products under the CRA](/blog/compliance/cra-product-classification),
  which decides whether a notified body enters the budget.

## References

Checked on 20 November 2026. The regulation and the Commission's impact
assessment are primary sources; the rest are secondary, and the consultancy and
calculator figures are estimates, not market prices.

- [_Regulation (EU) 2024/2847, Cyber Resilience Act_](https://eur-lex.europa.eu/eli/reg/2024/2847/oj),
  EUR-Lex. Articles 13, 33, 64, 69; Annex I.
- European Commission,
  [_Commission guidance on the application of Regulation (EU) 2024/2847, C/2026/6013_](https://eur-lex.europa.eu/eli/C/2026/6013),
  first adopted on 27 July 2026 as C(2026) 5252; published in the Official Journal on 17 November 2026. Points 126, 129–130, 158, 163, 175–177.
- European Commission,
  [_Impact assessment accompanying the Cyber Resilience Act proposal, SWD(2022) 282, part 1_](https://data.consilium.europa.eu/doc/document/ST-12429-2022-ADD-2/en/pdf).
  Per-product costs and option 4(b)(ii) totals.
- cetome,
  [_What CRA compliance costs, and how to budget for it_](https://cetome.com/insights/cra-compliance-cost/),
  17 September 2026, and [_CRA services and prices_](https://cetome.com/services/cra/).
- cyberresilienceact.eu,
  [_CRA compliance cost calculator_](https://www.cyberresilienceact.eu/cra-compliance-cost-calculator/).
  Default scenario of three products.
- ENISA,
  [_SME CRA survey report_](https://www.enisa.europa.eu/sites/default/files/2026-06/SME%20CRA%20survey%20report.pdf),
  June 2026.
- Finite State,
  [_Cyber Resilience Act fines and penalties_](https://finitestate.io/blog/cyber-resilience-act-fines-and-penalties).
- Schutzwerk,
  [_Legacy products under the Cyber Resilience Act_](https://www.schutzwerk.com/en/blog/cra-bestandsprodukte/).
  Placing on the market per unit.
- Bitsea,
  [_Cyber Resilience Act and legacy products_](https://bitsea.us/blog/2026/03/cyber-resilience-act-and-legacy-products/).
  When the support period starts.
- [_Directive (EU) 2024/2853 on liability for defective products_](https://eur-lex.europa.eu/eli/dir/2024/2853/oj),
  EUR-Lex. Articles 4, 6, 9, 10 and 11.
- European Commission,
  [_The "Blue Guide" on the implementation of EU product rules 2022_](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52022XC0629(04)),
  section 2.3. Placing on the market.

- Netherlands Enterprise Agency,
  [_SECURE: open call for EU SMEs_](https://english.rvo.nl/funding-portal/secure-digital-europe-programme-cybersecurity),
  checked by the agency on 1 October 2026.
- cyberresilienceact.eu,
  [_SECURE opened a second €11.5 million call_](https://www.cyberresilienceact.eu/news/secure-second-open-call-1-october-2026-cra-sme-funding.html),
  12 October 2026.
- Studio Calabrese,
  [_Cyber Resilience Act: controlli ACN sui nuovi obblighi_](https://studiomcalabrese.it/cyber-resilience-act-controlli-acn-sui-nuovi-obblighi-e-notifiche-enisa/).
  Italian draft decree and sanctions from December 2027.
