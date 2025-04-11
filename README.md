# Autocar Location

Application de gestion de location d'autocars, comprenant:

- Demande de devis
- Gestion des devis et commandes
- Espace client et admin
- Messagerie intégrée

## Stack technique

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI

## Configuration de l'autocomplétion d'adresses

L'application utilise l'API Google Places pour l'autocomplétion des champs d'adresse. Pour activer cette fonctionnalité:

1. Créez un projet dans la Google Cloud Console
2. Activez l'API Places pour votre projet
3. Générez une clé API avec les restrictions appropriées
4. Copiez la clé API dans le fichier `.env.local` :

```
GOOGLE_MAPS_API_KEY=votre_clé_api_ici
```

5. Décommentez et adaptez le code dans `components/autocomplete-component.tsx`

## Installation

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

## Développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

## Structure du projet

- `/app` - Routes et pages de l'application
- `/components` - Composants réutilisables
- `/lib` - Utilitaires, hooks et contextes
- `/public` - Fichiers statiques

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
