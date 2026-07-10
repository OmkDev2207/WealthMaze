# Content Review Checklist

This file tracks rate-sensitive calculators that depend on government-published rates
and must be reviewed quarterly. Link this from the [Content Update Policy](/content-update-policy) page.

## Rate-Sensitive Calculators — Quarterly Review Required

These calculators use interest rates, tax slabs, or contribution limits set by Indian government
bodies (RBI, EPFO, Finance Ministry, NPS Trust). Rates can change quarterly.

| Calculator | Rate Source | Rate Used | Next Review Due |
|---|---|---|---|
| PPF Calculator | Ministry of Finance (quarterly) | 7.1% p.a. | Oct 2026 |
| EPF Calculator | EPFO (annual, March) | 8.25% p.a. | March 2027 |
| NPS Calculator | NPS Trust (indicative return) | Variable | Oct 2026 |
| FD Calculator | RBI / Bank rates (floating) | Default 7% | Oct 2026 |
| RD Calculator | RBI / Bank rates (floating) | Default 7% | Oct 2026 |
| Income Tax Calculator | Finance Act (annual Budget) | FY 2025-26 | Feb 2027 |
| TDS Calculator | Finance Act (annual Budget) | FY 2025-26 | Feb 2027 |
| Capital Gains Tax Calculator | Finance Act (Budget + amendments) | FY 2025-26 | Feb 2027 |

## Review Process

1. Check the government source for any rate change announcements.
2. Update the relevant calculator config file (`src/data/calculators/savings.ts`, `tax.ts`, etc.).
3. Update the `lastUpdated` field in that calculator's config to the current `YYYY-MM` date.
4. Run `npm run build` to verify zero TypeScript/build errors.
5. Commit with message: `chore(rates): update [Calculator Name] to [New Rate] effective [Period]`.

## How `lastUpdated` Works

Every `CalculatorConfig` object has a required `lastUpdated: string` field (e.g., `"2026-07"`).
This is rendered on the calculator page as "Updated: [Month Year]", giving users a clear signal
of when the rates and formulas were last reviewed. It is enforced at compile time — any new
calculator that omits this field will fail the TypeScript build.

## Adding New Rate-Sensitive Calculators

When adding a new calculator that uses a government-published rate, add it to the table above
and mark it with `isIndiaSpecific: true` in the config. Ensure the `lastUpdated` field reflects
when you last verified the rate.
