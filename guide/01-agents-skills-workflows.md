# Guide — Agents, Skills, Workflows : concepts et emplacements

Claude Code propose trois mécanismes pour automatiser du travail :

## Tableau comparatif

| Aspect | Agent | Skill | Workflow |
|--------|-------|-------|----------|
| **Déclenchement** | À la demande, explicite | Automatique, selon sa `description` | Orchestration explicite |
| **Cas d'usage** | Tâche ponctuelle, bien délimitée | Tâche récurrente, reproductible | Enchaînement de plusieurs étapes/agents |
| **Emplacement conventionnel** | `.claude/agents/<nom>.md` | `.claude/skills/<nom>/SKILL.md` | `.claude/commands/<nom>.md` (tier 1) ou `.claude/workflows/<nom>.js` (tier 2) |
| **Activation** | Appel direct : `Agent({ name: 'mon-agent', ... })` ou UI | Auto-déclenchement quand l'utilisateur formule un besoin reconnu | Slash command `/nom` ou appel direct : `Workflow({ name: '...' })` |
| **Outils disponibles** | Tous (Read, Edit, Bash, etc.) | Tous | Agents orchestrés ; le script JS lui-même limité à agent(), pipeline(), parallel(), log() |
| **Sortie** | Texte, JSON, artefacts | Texte, JSON, artefacts, fichiers modifiés | Agrégation des résultats des agents appelés |

---

## Agent

### Qu'est-ce qu'un Agent ?

Un **agent** est une version spécialisée de Claude qui intervient **à la demande**, accomplissant une tâche bien délimitée. C'est un expert qu'on demande ponctuellement, sans attendre qu'il se déclenche tout seul.

### Structure d'un Agent

```yaml
---
name: mon-agent
description: "[Description activant l'agent — « Active-toi quand… »]"
tools:
  - Read
  - Grep
  - Glob
  - Bash
  - Edit
  - Write
  - ...
model: sonnet
---

# Contenu du rôle, périmètre, méthodologie, format de sortie, principes
```

### Points clés pour bien faire

- **Frontmatter strict** : les clés doivent être exactement `name`, `description`, `tools`, `model`
- **Description orientée activation** : écrivez-la comme « Active-toi quand… » suivi des cas d'usage explicites
- **Tools scopés** : incluez uniquement ce qui est nécessaire (une review seule en lecture ? Read + Grep + Glob, pas de Bash)
- **Périmètre ET hors-périmètre** : dites clairement ce que l'agent fait ET ce qu'il ne fait pas
- **Format de sortie structuré** : si un orchestrateur (workflow) consume le résultat, définissez un schéma JSON

### Exemple de template

Voir `templates/agents/mon-agent.md`.

---

## Skill

### Qu'est-ce qu'un Skill ?

Un **skill** est un **automatisme** : il se déclenche automatiquement quand l'utilisateur exprime un besoin reconnaissable. Le skill en décide et gère la tâche selon sa procédure interne.

### Structure d'un Skill

```yaml
---
name: mon-skill
description: "[Description activante — « Active-toi quand… »]"
---

# Contenu : quand t'activer, sources de vérité, procédure, format de sortie, principes
```

### Points clés pour bien faire

- **Frontmatter minimal** : uniquement `name` et `description` — pas de `tools`, pas de `model` (c'est géré en interne)
- **Description très précise** : l'utilisateur ne cherche PAS à déclencher le skill ; il exprime un besoin métier (« crée un composant React »). Le skill doit reconnaître cette expression et se déclencher automatiquement
  - ✅ Bon : « Active-toi quand l'utilisateur demande la création d'un composant React, peu importe la formulation »
  - ❌ Mauvais : « Je suis un générateur de composants » (trop vague, aucun déclencheur explicite)
- **Sources de vérité** : si votre skill produit un artefact conforme à une référence (spec, conventions, maquette), listez ces sources et dites comment vous les croisez
- **Procédure pas à pas** : décrivez chaque étape, surtout s'il y a une boucle de convergence (ex : « Je relis le résultat contre chaque source de vérité, et je corrige jusqu'à convergence »)
- **Pas de fausse sécurité** : pas d'invention au-delà du spécifié ; soyez honnête sur les limites

### Exemple de template

Voir `templates/skills/mon-skill/SKILL.md` et son dossier `examples/`.

---

## Workflow

### Qu'est-ce qu'un Workflow ?

Un **workflow** **orchestre** plusieurs étapes ou agents pour automatiser un processus plus complexe. Il peut :

- Dérouler une procédure step-by-step
- Faire tourner plusieurs agents en parallèle
- Demander des validations manuelles à des points clés
- Regrouper les résultats en fin de chaîne

Claude Code propose **deux formes** : une simple (slash command) et une avancée (script JavaScript).

### Tier 1 — Slash Command

C'est une **procédure en langage naturel**, décrite dans `.claude/commands/<nom>.md`.

**Déclenchement :** `/mon-workflow`

**Format :** étapes numérotées, appels à d'autres agents/skills, points d'arrêt pour validation manuelle.

**Avantages :**
- Lisible et facile à modifier
- Interaction humaine intégrée (« arrête-toi et demande validation »)
- Pas de programmation JavaScript requise

**Inconvénients :**
- Contrôle moins fin sur la parallélisation
- Pas de schémas JSON typés pour les entrées/sorties d'agents

**Quand l'utiliser :** workflows simples et séquentiels, avec peu de parallélisation nécessaire.

### Tier 2 — Script Workflow (avancé)

C'est un **script JavaScript**, déposé dans `.claude/workflows/<nom>.js`.

**Déclenchement :** `Workflow({ name: 'mon-workflow' })` ou via l'outil Workflow de Claude Code

**Format :** export const meta + appels à `phase()`, `agent()`, `pipeline()`, `parallel()`, `log()`

```javascript
export const meta = {
  name: 'mon-workflow',
  description: '...',
  phases: [
    { title: 'Phase 1' },
    { title: 'Phase 2' },
  ],
}

// script
phase('Phase 1')
const result1 = await agent('...', { label: 'step1' })

phase('Phase 2')
const result2 = await agent('...', { label: 'step2' })
```

**Avantages :**
- Parallélisation fine grained : `parallel([...])` pour lancer plusieurs agents à la fois
- Schémas JSON pour typer les sorties d'agents
- Logique conditionnelle avancée

**Inconvénients :**
- Requiert de la programmation JavaScript
- Plus de complexité
- Pas accès à tous les outils (juste agent() + orchestration)

**Quand l'utiliser :** workflows complexes, parallelisation réelle, besoin de convergence ou d'agrégation sophistiquée des résultats.

### Exemple de templates

Voir `templates/workflows/mon-workflow-simple.md` (tier 1) et `templates/workflows/mon-workflow.js` (tier 2).

---

## Comment choisir entre Agent / Skill / Workflow

```
┌─ Tâche ponctuelle, à la demande ?
│  └─ OUI → Agent
│
└─ Tâche récurrente que tu reconnais automatiquement ?
   └─ OUI → Skill
   
   └─ Sinon : plusieurs étapes/agents à orchestrer ?
      └─ OUI → Workflow (Tier 1 ou Tier 2)
      └─ NON → Peut-être juste du Skill, ou juste un Agent appelé différemment
```

**Exemple concret :**

- **Tâche :** Générer un composant React quand l'utilisateur le demande
  - Agent ? Non, trop récurrent
  - Skill ? OUI — se déclenche quand l'utilisateur dit « crée un composant »
  - Workflow ? Non, une seule étape

- **Tâche :** Revue de code, appelée ponctuellement
  - Agent ? OUI
  - Skill ? Non, c'est à la demande, pas automatique
  - Workflow ? Non, une seule étape

- **Tâche :** Déployer une feature en production (tests → revue → builds → deploy)
  - Agent ? Non, plusieurs étapes
  - Skill ? Peut-être au niveau global si on reconnaît « dépôt une feature »
  - Workflow ? OUI — orchestre tests + agents de revue + deploy

---

## Créer et tester dans votre projet

### Structure `.claude/` attendue

```
mon-projet/
├── .claude/
│   ├── agents/
│   │   ├── mon-agent-1.md
│   │   └── mon-agent-2.md
│   ├── skills/
│   │   ├── mon-skill-1/
│   │   │   ├── SKILL.md
│   │   │   └── examples/
│   │   │       └── template.md
│   │   └── mon-skill-2/
│   │       └── SKILL.md
│   ├── commands/
│   │   └── mon-workflow.md         (tier 1)
│   └── workflows/
│       └── mon-workflow.js          (tier 2)
└── ... (votre code projet)
```

### Comment Claude Code découvre vos créations

- **Agents** : un `.claude/agents/*.md` avec un frontmatter `name` + `description` est immédiatement disponible comme sub-agent
- **Skills** : un `.claude/skills/<nom>/SKILL.md` avec un frontmatter `name` + `description` s'auto-déclenche quand sa description reconnaît un besoin utilisateur
- **Workflows (Tier 1)** : un `.claude/commands/<nom>.md` est appelable via `/nom`
- **Workflows (Tier 2)** : un `.claude/workflows/<nom>.js` est enregistré et callable via `Workflow({ name: 'nom' })`

Ouvrez simplement votre projet dans Claude Code après avoir créé ces fichiers — ils sont découverts automatiquement.

---

## À lire aussi

- `guide/02-criteres-de-qualite.md` pour la checklist « bien fait »
- `templates/` pour des squelettes copiables
- `DEROULEMENT-ANIMATEUR.md` pour le déroulement de l'atelier
