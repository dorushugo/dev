# Plan de Déploiement - Autocar Location

Ce document décrit les étapes et considérations pour le déploiement de l'application Autocar Location.

## 1. Prérequis

- **Compte Vercel :** L'application est optimisée pour Vercel. Un compte Vercel est nécessaire.
- **Compte GitHub (ou GitLab/Bitbucket) :** Pour l'intégration du déploiement continu.
- **Nom de domaine (optionnel) :** Si vous souhaitez utiliser un domaine personnalisé.
- **Clé API Google Maps Platform :** Une clé API valide pour la Distance Matrix API et Places API (pour l'autocomplétion), avec les restrictions appropriées (HTTP referrers pour Places API, IP pour Distance Matrix API si exécutée depuis une IP fixe).
- **Base de données (pour la version non-prototype) :** Si l'application évolue au-delà du `localStorage` (ce qui est recommandé pour la production), une base de données (ex: PostgreSQL, MySQL) sera nécessaire. L'URL de connexion à cette base de données sera requise.

## 2. Configuration de l'Environnement

### 2.1. Variables d'Environnement

Les variables d'environnement suivantes doivent être configurées sur la plateforme d'hébergement (Vercel) :

- `GOOGLE_MAPS_API_KEY` : Votre clé API Google Maps. Essentielle pour le calcul de distance et l'autocomplétion des adresses.
- `DATABASE_URL` (si utilisation d'une BDD avec Prisma) : L'URL de connexion à votre base de données. Exemple : `postgresql://user:password@host:port/database`.
- `NEXTAUTH_URL` (si NextAuth.js est utilisé pour l'authentification avancée) : L'URL canonique de votre application. Exemple : `https://votre-domaine.com`.
- `NEXTAUTH_SECRET` (si NextAuth.js est utilisé) : Une chaîne aléatoire utilisée pour signer les cookies et les jetons.
- `NEXT_PUBLIC_GA_TRACKING_ID` (optionnel) : Si Google Analytics est utilisé pour le suivi.
- Autres variables spécifiques à votre application (ex: clés API pour services de messagerie, etc.).

**Important :** Ne jamais commiter les valeurs de ces variables directement dans le code. Utiliser les configurations d'environnement de la plateforme d'hébergement.
Créer un fichier `.env.local.example` à la racine du projet pour lister les variables nécessaires, sans leurs valeurs.

### 2.2. Fichier `.env.local` (Développement Uniquement)

Pour le développement local, copiez `.env.local.example` en `.env.local` et renseignez les valeurs.
**NE PAS COMMITTER `.env.local`** (il doit être dans `.gitignore`).

## 3. Processus de Déploiement (avec Vercel)

### 3.1. Connexion du Projet à Vercel

1.  Connectez-vous à votre compte Vercel.
2.  Importez un nouveau projet en le liant à votre dépôt Git (GitHub, GitLab, Bitbucket).
3.  Vercel détectera automatiquement que c'est un projet Next.js.

### 3.2. Configuration du Build

- **Framework Preset :** Devrait être automatiquement `Next.js`.
- **Build Command :** Généralement `pnpm build` (ou `next build` si `pnpm` n'est pas configuré spécifiquement sur Vercel, mais Vercel supporte `pnpm`).
- **Output Directory :** Automatiquement détecté (`.next`).
- **Install Command :** `pnpm install` (ou laisser Vercel gérer, il détecte `pnpm-lock.yaml`).

### 3.3. Configuration des Variables d'Environnement sur Vercel

Allez dans les paramètres du projet sur Vercel, section "Environment Variables", et ajoutez toutes les variables listées en 2.1.

### 3.4. Déploiement Initial

Une fois configuré, Vercel lancera un premier build et déploiera l'application. Vous obtiendrez une URL Vercel (ex: `nom-projet.vercel.app`).

### 3.5. Déploiements Continus (CI/CD)

- Par défaut, Vercel déploiera automatiquement chaque `push` sur la branche principale (ex: `main` ou `master`).
- Il créera également des "Preview Deployments" pour chaque `push` sur d'autres branches ou pour chaque Pull Request, ce qui est très utile pour tester les changements avant de les merger.

### 3.6. Domaines Personnalisés

Dans les paramètres du projet sur Vercel, section "Domains", vous pouvez ajouter votre nom de domaine personnalisé et suivre les instructions pour configurer les enregistrements DNS.

## 4. Migration de Base de Données (si applicable avec Prisma)

Si vous utilisez Prisma et une base de données relationnelle :

1.  **Générer les migrations :**
    ```bash
    pnpm prisma migrate dev --name nom_de_la_migration
    ```
    Cela crée un fichier de migration SQL dans `prisma/migrations/`.
2.  **Appliquer les migrations en production :**

    - Vercel ne lance pas `prisma migrate deploy` automatiquement pendant le build par défaut pour des raisons de sécurité et de contrôle.
    - **Option 1 (Build Command) :** Modifier la commande de build sur Vercel pour inclure l'application des migrations : `pnpm prisma migrate deploy && pnpm build`. Cela nécessite que `DATABASE_URL` soit disponible au moment du build.
    - **Option 2 (Hooks de Déploiement Vercel - Plus sûr) :** Utiliser les "Deployment Hooks" ou des scripts post-déploiement pour exécuter `pnpm prisma migrate deploy` après un build réussi, potentiellement depuis un environnement sécurisé ayant accès à la base de données.
    - **Option 3 (Manuel) :** Se connecter à un environnement qui peut accéder à la base de données de production et exécuter `pnpm prisma migrate deploy` manuellement après chaque déploiement qui inclut des changements de schéma.

    Consulter la [documentation Vercel sur les migrations Prisma](https://vercel.com/guides/prisma-migrate-nextjs) pour les meilleures pratiques.

## 5. Monitoring et Logs

- **Vercel Analytics :** Fournit des informations sur les performances et l'utilisation.
- **Vercel Logs :** Accès aux logs de build et aux logs d'exécution (fonctions serverless) pour le débogage.
- **Services de monitoring externes (optionnel) :** Intégrer des outils comme Sentry pour le suivi des erreurs, ou d'autres outils de logging/monitoring si besoin.

## 6. Rollbacks

Vercel conserve les déploiements précédents. En cas de problème avec un nouveau déploiement, vous pouvez facilement revenir à une version antérieure via l'interface Vercel.

## 7. Considérations de Sécurité Post-Déploiement

- **HTTPS :** Vercel fournit automatiquement des certificats SSL pour les domaines hébergés.
- **Headers de Sécurité :** Vérifier et configurer les headers HTTP de sécurité appropriés (CSP, HSTS, X-Frame-Options, etc.) via `next.config.js` si nécessaire.
- **Dépendances :** Mettre à jour régulièrement les dépendances pour corriger les failles de sécurité connues (`pnpm audit`).
- **Sauvegardes de la base de données :** Si vous gérez votre propre base de données, mettre en place une stratégie de sauvegarde régulière.

## 8. Tests Post-Déploiement

Après chaque déploiement en production, effectuer une série de tests manuels (ou automatisés si des tests end-to-end sont en place) pour vérifier que les fonctionnalités clés sont opérationnelles.
