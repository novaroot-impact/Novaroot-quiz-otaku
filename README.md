# Quiz Otaku 2027 — NovaRoot Impact

Plateforme interactive de quiz culturel portée par **NovaRoot Impact** à Kisangani (RDC). Le projet vise à faire passer la jeunesse locale du statut de simple spectatrice à celui d'actrice engagée de la culture contemporaine, à travers une expérience mobile-first, une progression claire et un suivi collectif des sessions.

- **Lien en ligne** : [novaroot-impact.github.io/Novaroot-quiz-otaku](https://novaroot-impact.github.io/Novaroot-quiz-otaku/)

## Vision & Philosophie
- **Participation active plutôt que simple vitrine** : chaque session engage réellement le candidat, mesure sa performance et alimente un suivi partagé.
- **Mobile-first** : conçu d'abord pour les smartphones (iPhone et Android) avec une lecture directe et un retour immédiat.
- **Ancrage à Kisangani** : un espace culturel numérique qui valorise la régularité, l'appropriation collective et la dynamique de communauté.

## Structure du Jeu (3 Sessions Officielles)
- **Session 1 (Jour 1)** : Chronométrée Classique (15s / question, 10 questions).
- **Session 2 (Jour 2)** : Chronométrée Rapide (10s / question, 10 questions).
- **Session 3 (Jour 3)** : Openings, Devinettes & Citations (12s / question, 10 questions).
- **Règle stricte** : ordre séquentiel obligatoire, 1 seule tentative officielle par session et par jour.

## Architecture & Synchronisation
- **Frontend** : application web mobile-first (`index.html`) hébergée sur GitHub Pages.
- **Backend** : Google Apps Script (`Quiz otaku 2027 sync`) exposant un point de terminaison Web (`/exec`) via `doPost(e)`.
- **Base de données** : Google Sheets recevant les colonnes `Date`, `name`, `day`, `score`, `total`, `sessionId`.

## Flux de Données
1. Le candidat s'identifie avec son pseudo et son numéro WhatsApp.
2. Il complète la session ouverte du jour dans le temps imparti.
3. À la fin de la session, le frontend envoie le payload JSON (`name`, `day`, `score`, `total`, `sessionId`) via `POST` vers l'endpoint `/exec`.
4. `doPost(e)` ajoute automatiquement une ligne horodatée dans Google Sheets.
