# Justification des Choix Techniques

Ce document décrit les raisons derrière les choix des principales technologies et approches utilisées dans le projet Autocar Location.

## 1. Framework Principal : Next.js (avec App Router)

- **Raison :** Next.js est un framework React de production puissant et populaire, offrant un excellent équilibre entre fonctionnalités pour le développeur et performances pour l'utilisateur.
- **Avantages :**
  - **Rendu Côté Serveur (SSR) et Génération de Site Statique (SSG) :** Améliore le SEO et les performances initiales de chargement.
  - **App Router :** Le nouveau routeur basé sur les répertoires (`app/`) simplifie la création de layouts imbriqués, le streaming de contenu, et l'utilisation des Server Components, ce qui permet une architecture plus moderne et performante.
  - **Route Handlers (API Routes) :** Facilité pour créer des points d'API backend directement dans le projet Next.js (ex: `/api/distance`).
  - **Optimisation des images, polices, et scripts :** Fonctionnalités intégrées pour améliorer les performances.
  - **Écosystème et Communauté :** Large communauté, beaucoup de ressources, et bonne intégration avec d'autres outils (Vercel, etc.).

## 2. Langage : TypeScript

- **Raison :** TypeScript ajoute un typage statique à JavaScript, ce qui améliore la maintenabilité et la robustesse du code.
- **Avantages :**
  - **Détection précoce des erreurs :** Beaucoup d'erreurs sont attrapées pendant la phase de développement plutôt qu'en production.
  - **Meilleure Autocomplétion et Refactoring :** Les types aident les IDE à fournir une meilleure assistance.
  - **Code plus lisible et compréhensible :** Les types servent de documentation et clarifient les structures de données.
  - **Collaboration facilitée :** Surtout dans les équipes, les types aident à comprendre le code des autres.

## 3. Style et UI : Tailwind CSS & Shadcn/UI

- **Tailwind CSS :**
  - **Raison :** Un framework CSS "utility-first" qui permet de construire des designs personnalisés rapidement sans quitter le HTML (ou JSX).
  - **Avantages :** Design rapide et cohérent, personnalisation facile, pas de CSS inutilisé en production grâce à PurgeCSS, approche composable.
- **Shadcn/UI :**
  - **Raison :** Collection de composants d'interface utilisateur réutilisables, magnifiquement conçus, basés sur Tailwind CSS et Radix UI.
  - **Avantages :** Composants accessibles et personnalisables, pas une librairie de composants classique (on copie-colle le code dans son projet, ce qui donne un contrôle total), thémable, économie de temps considérable pour construire une UI moderne.

## 4. Gestion des formulaires : React Hook Form & Zod

- **React Hook Form :**
  - **Raison :** Bibliothèque performante et facile à utiliser pour la gestion des formulaires dans React.
  - **Avantages :** Optimise les re-renderings, intégration facile avec les bibliothèques de validation, API simple et intuitive (hooks).
- **Zod :**
  - **Raison :** Bibliothèque de déclaration et validation de schémas basée sur TypeScript.
  - **Avantages :** Permet de définir des schémas de données clairs et de les valider facilement (côté client et serveur). Inférence de type TypeScript à partir des schémas, ce qui assure la cohérence entre la validation et les types statiques.

## 5. Gestion de l'état : Contextes React (et `localStorage` pour le prototype)

- **Contextes React :**
  - **Raison :** Solution intégrée à React pour partager l'état entre les composants sans avoir à passer les props manuellement à chaque niveau (prop drilling).
  - **Avantages :** Suffisant pour la complexité actuelle du prototype, évite d'introduire une dépendance externe plus lourde (comme Redux ou Zustand) tant que le besoin ne s'en fait pas sentir.
- **`localStorage` :**
  - **Raison (pour le prototype) :** Permet de simuler une persistance des données de manière simple et rapide, sans nécessiter la configuration d'une base de données pour la phase initiale de développement et de test des fonctionnalités clés.
  - **Limitations :** Non adapté pour la production (stockage limité, synchrone, pas de sécurité des données, pas de partage entre utilisateurs/sessions).
  - **Évolution :** Prévu pour être remplacé par une véritable base de données (ex: PostgreSQL avec Prisma) pour la version de production.

## 6. Appels API et Calcul de Distance : Google Maps Platform (Distance Matrix API)

- **Raison :** Fournit des données précises et fiables pour le calcul de distances et de durées de trajet, essentielles pour l'estimation des coûts de transport.
- **Avantages :** Données mondiales, mises à jour, intégration facile via des requêtes HTTP.
- **Sécurité :** La clé API est utilisée côté serveur via une API Route Next.js pour ne pas l'exposer côté client.

## 7. Versionning : Git & GitHub (implicite)

- **Raison :** Standards de l'industrie pour le contrôle de version du code source.
- **Avantages :** Suivi des modifications, collaboration, branches pour le développement de fonctionnalités, retour en arrière facile, etc.

## 8. Environnement d'exécution et Déploiement initial : Node.js & Vercel

- **Node.js :** Nécessaire pour l'écosystème JavaScript/TypeScript et l'exécution de Next.js.
- **Vercel :**
  - **Raison :** Plateforme d'hébergement optimisée pour les applications Next.js (créée par les mêmes développeurs).
  - **Avantages :** Déploiement continu simplifié (intégration Git), performances optimisées pour Next.js, gestion des variables d'environnement, previews de déploiement.
