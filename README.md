# ReFi Colombia website

Source of [reficolombia.org](https://reficolombia.org), the site of the national
regenerative finance community in Colombia. It started as the ReFi Medellín
site and was migrated to ReFi Colombia in 2026.

## What is in here

| Route | What it does |
|---|---|
| `/[locale]` | Landing page: what ReFi is, principles, nodes, transparency, governance, team |
| `/[locale]/donate` | Direct onchain donations to the treasury |
| `/[locale]/community` | Lending panel for members (needs a wallet and the membership NFT) |
| `/[locale]/lend-manager` | Lending admin panel (needs a wallet with the admin role) |

Locales are `es` (default) and `en`.

## Stack

Next.js 13 (App Router), Tailwind, next-intl, wagmi 1 with viem, Apollo Client
for the lending subgraphs.

## Run it

```bash
yarn install
cp .env.example .env.local   # fill in what you need
yarn dev
```

`yarn build` creates the production build. Railway deploys `main` to
reficolombia.org on every push, so work on a branch and open a pull request.

## Configuration

All settings are documented in [.env.example](./.env.example). The ones that
matter most:

- **Donation recipients.** The `/donate` form stays closed until all five
  `NEXT_PUBLIC_*_RECIPENT` addresses are set. There is no default on purpose.
- **Contracts.** Lending contract, schema and EAS addresses have defaults in
  `constants/index.ts`.
- **Subgraphs.** Lending data comes from The Graph Studio. URLs are built in
  `lib/subgraphs.ts`.
- **RPC.** Public RPC endpoints are used by default, see `lib/chains.ts`.

Do not commit provider keys. Anything prefixed with `NEXT_PUBLIC_` ends up in
the browser.

## Related

- Subsidies app: [ReFiColombia/subsidies](https://github.com/ReFiColombia/subsidies)
- Lending contracts and subgraph: [ReFiMedellin/Lending-protocol](https://github.com/ReFiMedellin/Lending-protocol)
