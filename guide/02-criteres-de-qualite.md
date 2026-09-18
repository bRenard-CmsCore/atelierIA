# Guide — Critères de qualité « bien fait »

Ce guide présente une checklist pour évaluer si votre Agent, Skill ou Workflow est prêt à être utilisé.

---

## Critères transversaux (tous les types)

### ✅ Description orientée activation

**Le point le plus important, et le plus souvent manqué.**

Une bonne description répond à la question : **« Quand est-ce que j'interviens ? »**

**❌ Mauvais :**
```
description: "Je suis un générateur de composants"
```
(Qui va reconnaître ce besoin ? Claude Code ne sait pas quand déclencher.)

**✅ Bon :**
```
description: "Active-toi quand l'utilisateur demande la création d'un composant React.
Tu reconnais les formulations comme 'crée un composant', 'génère une carte qui affiche…',
'fais un formulaire pour'. Tu ignores les demandes de review ou refactor."
```

### ✅ Périmètre et hors-périmètre explicites

Dites clairement ce que vous faites ET ce que vous ne faites pas.

**Exemple (Agent de review) :**
```
Périmètre :
- Identifier les problèmes de clarity, complexité, conventions
- Proposer des corrections concrètes

Hors périmètre :
- Audit de sécurité (un autre agent s'en charge)
- Refactoring architecturale globale (juste le fichier fourni)
- Modification du code lui-même (Read/Grep uniquement)
```

### ✅ Pas de faux positif

Si vous n'êtes pas certain d'un finding / d'une activation / d'une décision, dites-le ou restez silencieux.

---

## Critères spécifiques

### Agent

**Tools scopés au strict nécessaire**

Si votre agent ne fait que lire et analyser : `tools: [Read, Grep, Glob]` — pas de Bash, pas d'Edit/Write.

Si votre agent doit générer du code : `tools: [Read, Grep, Glob, Edit, Write]` — pas de Bash sauf si vraiment nécessaire.

```yaml
❌ Mauvais :
tools:
  - Read
  - Grep
  - Glob
  - Edit
  - Write
  - Bash
  - NotebookEdit

✅ Bon :
tools:
  - Read
  - Grep
```

**Format de sortie structuré (si le résultat doit être consommé par un workflow)**

Si un workflow appelle votre agent et utilise le résultat pour prendre une décision, fournissez un schéma JSON.

```json
✅ Bon :
{
  "verdict": "pass | needs_changes",
  "findings": [
    { "severity": "blocker | major | minor", "file": "...", "line": 42, "description": "..." }
  ],
  "summary": "..."
}
```

---

### Skill

**Sources de vérité identifiées et croisées**

Si votre skill génère un artefact conforme à une référence, nommez ces sources explicitement.

```markdown
❌ Mauvais :
Procédure :
1. Lire la spec
2. Générer le composant
3. Voilà

✅ Bon :
Sources de vérité :
- Conventions du projet (memory/conventions.md)
- Spec fonctionnelle (si fournie)
- Maquette visuelle (PNG référencée dans la spec)
- Critères TDD (listés dans la spec)

Procédure (boucle de convergence) :
1. Lire les conventions
2. Lire la spec
3. Implémenter le composant
4. Vérifier vs conventions → correction si nécessaire
5. Vérifier vs spec → correction si nécessaire
6. Vérifier vs maquette → correction si nécessaire
7. Boucle tant qu'il y a un écart
```

**Pas d'ajout non spécifié**

Si la spec demande 3 propriétés, n'en ajoutez pas une 4e par initiative.

```markdown
❌ Mauvais :
Spec : « Créer un bouton avec une label et un onClick »
Générateur : ajoute aussi couleur, taille, disabled state, animation...

✅ Bon :
Spec : « Créer un bouton avec une label et un onClick »
Générateur : exactement ça, rien de plus. Valeur par défaut pour les styles de base.
```

---

### Workflow (Tier 1 — Slash Command)

**Étapes claires et numérotées**

```markdown
❌ Mauvais :
Ensuite lancer une review, puis demander à l'utilisateur, puis faire un build peut-être

✅ Bon :
Étape 1 — Lire la feature branch
Étape 2 — Lancer les tests unitaires
Étape 3 — Appeler l'agent de review
**ARRÊTE-TOI — Validation manuelle** : « Êtes-vous satisfait de la review ? »
Étape 4 — Générer le rapport final
```

**Point d'arrêt avant les étapes irréversibles**

Avant de déployer, envoyer ou modifier en profondeur, arrêtez-vous et demandez une approbation.

```markdown
✅ Bon :
Étape 2 — Préparation du déploiement (fichiers générés, config créée)
**ARRÊTE-TOI — Validation manuelle** : « Revoyez la config. Souhaitez-vous continuer ? »
Étape 3 — Déploiement effectif
```

---

### Workflow (Tier 2 — Script Workflow)

**Meta en littéral pur (pas de variables)**

```javascript
❌ Mauvais :
const phaseTitles = ['Phase 1', 'Phase 2']
export const meta = {
  name: 'mon-workflow',
  phases: phaseTitles.map(t => ({ title: t })),
}

✅ Bon :
export const meta = {
  name: 'mon-workflow',
  description: '...',
  phases: [
    { title: 'Analyse' },
    { title: 'Génération' },
  ],
}
```

**Titres de phase alignés mot pour mot avec meta.phases**

```javascript
❌ Mauvais :
meta.phases = [{ title: 'Analyse' }]
// mais dans le code :
phase('Analyser les données')  // titre différent

✅ Bon :
meta.phases = [{ title: 'Analyse' }]
// dans le code :
phase('Analyse')  // même titre exactement
```

**Pipeline par défaut, parallel seulement si vraiment utile**

```javascript
❌ Mauvais (fausse parallélisation) :
const step1 = await agent('étape 1', ...)
const [step2, step3] = await parallel([
  () => agent('étape 2, qui a besoin du résultat de step1', ...),
  () => agent('étape 3', ...),
])

✅ Bon (vraie parallélisation) :
const [reviewCode, reviewSecurity] = await parallel([
  () => agent('Review code quality', { label: 'code' }),
  () => agent('Review security', { label: 'security' }),
])
// Les deux reviews sont indépendantes, pas de dépendance entre elles

✅ Bon (pipeline) :
const step1 = await agent('Analyser le fichier', ...)
const step2 = await agent('Basé sur cette analyse, générer les recommandations...', ...)
// step2 dépend de step1 → pipeline
```

**Schéma JSON pour les agents en fan-out (optionnel mais recommandé)**

Si un agent en parallèle doit retourner un format structuré, définissez un schéma :

```javascript
const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['pass', 'needs_changes'] },
    findings: { type: 'array' },
  },
}

const result = await agent('Review this', {
  label: 'review',
  schema: REVIEW_SCHEMA,
})
```

**JavaScript pur (pas de TypeScript)**

```javascript
❌ Mauvais :
export const meta: IWorkflowMeta = { ... }
function processResults<T>(data: T[]): T[] { ... }

✅ Bon :
export const meta = { ... }
function processResults(data) { ... }
```

**Pas de Date.now(), Math.random(), ou non-déterminisme**

```javascript
❌ Mauvais :
const timestamp = Date.now()  // Non-déterministe
const id = Math.random().toString(36).slice(2)

✅ Bon :
// Pas besoin d'UUID ou timestamp auto-généré dans un workflow
// Laissez l'orchestrateur gérer ça
```

---

## Checklist avant de présenter

- [ ] Description orientée activation (« Active-toi quand… ») clairement écrite
- [ ] Périmètre ET hors-périmètre explicites
- [ ] Pas de faux positif (« si doute, je signale ou je me tais »)
- [ ] (Agent) Tools scopés au strict nécessaire
- [ ] (Agent) Format de sortie structuré si consommé par orchestrateur
- [ ] (Skill) Sources de vérité identifiées
- [ ] (Skill) Procédure étape par étape + boucle de convergence si applicable
- [ ] (Workflow T1) Étapes claires et points d'arrêt explicites avant irréversibilité
- [ ] (Workflow T2) Meta en littéral pur + phases alignées + pipeline par défaut
- [ ] (Workflow T2) JS pur (pas TS), pas de random/Date.now()
- [ ] Aucun fichier secret en clair (clés API, MDP, tokens)

---

## À retenir

**La description est votre allié numéro 1.**

Une bonne description orientée activation (Agent, Skill) ou un bon déroulement étape par étape (Workflow) compensent 90 % des autres imperfections. C'est là que le besoin réel se fait connaître et que Claude Code sait quand intervenir.

**Pensez toujours : à la demande de qui ? Automatiquement quand ? Quel est le signal de déclenchement ?**

Si vous répondez clairement à ces trois questions dans votre description/procédure, vous êtes sur la bonne voie.
