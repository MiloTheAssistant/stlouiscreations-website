# St. Louis Creations Website

## Getting Started

This repo's assigned local ports are:

- Normal dev port: `3000`
- Alternate / preview / debug port: `3001`

Run the development server on the normal port:

```bash
npm run dev -- -p 3000
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If port `3000` is occupied or you need a parallel preview/debug session, use the alternate port:

```bash
npm run dev -- -p 3001
```

Open [http://localhost:3001](http://localhost:3001) for the alternate session.

See [docs/local-port-map.md](docs/local-port-map.md) for the full local project port map.

## Quote Delivery

The public quote form posts to the same-origin `/api/contact` Route Handler. Production sends the validated request through Microsoft Graph from the sender mailbox `Media@digitalenergymedia.com` to the fixed recipient alias `contact@stlouiscreations.com`; the existing server-side Exchange rule moves delivered messages into `_StLouisCreations`.

The Graph application is authorized only through Exchange Application RBAC scoped to the sender mailbox. Do not grant tenant-wide Microsoft Graph `Mail.Send` in Entra.

Vercel Production requires these server-only variables: `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET`, and `MS_FROM_EMAIL`. Preview deployments intentionally do not receive them. Never prefix these variables with `NEXT_PUBLIC_` or commit their real values.

Provision and verify this path in the approved Microsoft 365 and Vercel admin runbook: confirm the Exchange Application RBAC assignment remains mailbox-scoped to `Media@digitalenergymedia.com`, set the four variables in Vercel Production only, then submit one controlled Production quote and confirm it reaches `contact@stlouiscreations.com` and is moved to `_StLouisCreations`. Do not remove the existing Production Formspree variable until that delivery check succeeds.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
