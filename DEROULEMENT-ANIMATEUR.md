# Déroulement — Guide pour l'animateur

Ce document guide le déroulement de l'atelier Claude Code, du démarrage jusqu'au partage final des réalisations.

---

## Vue d'ensemble

| Phase | Durée | Responsabilité | Matériel |
|-------|-------|-----------------|----------|
| **Accueil + présentation des concepts** | 15–20 min | Animateur | Slides ou live démo des concepts |
| **Démonstration cas concret** | 20–25 min | Animateur | Démo live : créer un Agent/Skill/Workflow simple |
| **Atelier pratique** | 90–120 min | Participants + animateur (support) | PC/IDE, templates du kit, Claude Code ouvert |
| **Partage + retours** | 20–25 min | Participants | Chacun expose rapidement son travail |
| **Bilan et suivi** | 5–10 min | Animateur | Tour de table, points clés à retenir |

**Total indicatif : 3h00 à 3h30**

---

## Phase 1 : Accueil + présentation des concepts (15–20 min)

### À couvrir

1. **Bienvenue et objectif** : à la fin de cette session, chacun repart avec un Agent, un Skill et un Workflow répondant à sa problématique réelle.

2. **Les 3 concepts de Claude Code** (renvoyez vers `guide/01-agents-skills-workflows.md` pour les détails) :
   - **Agent** : expert qu'on appelle à la demande, tâche bien délimitée
   - **Skill** : automatisme qui se déclenche quand il reconnaît un besoin
   - **Workflow** : orchestre plusieurs agents/étapes pour automatiser un processus

3. **Structure `.claude/`** : où déposer ses créations dans son projet local
   ```
   mon-projet/.claude/
   ├── agents/
   ├── skills/<nom>/
   ├── commands/  (workflows tier 1)
   └── workflows/ (workflows tier 2)
   ```

4. **Checklist « bien fait »** (les 3 points les plus importants) :
   - Description orientée activation
   - Périmètre clair (ce qu'on fait, ce qu'on ne fait pas)
   - Format de sortie approprié

### Conseil d'animation

Ne bloquez pas sur la théorie. Les participants apprendront mieux en faisant. Passez vite à la démo pour rendre ça concret.

---

## Phase 2 : Démonstration cas concret (20–25 min)

### Vous devez montrer comment on crée un Agent / Skill / Workflow réellement fonctionnel.

Voici deux approches :

### Approche A : Démo live live d'un cas simple

Choisissez un cas **très simple** (ex : agent de review d'une fonction Python, skill de génération d'un fichier de config, workflow d'export de données). Pendant l'atelier en direct :

1. Ouvrez Claude Code
2. Créez `.claude/agents/mon-demo-agent.md` avec un frontmatter + 2-3 lignes de contenu
3. Testez l'agent en l'appelant depuis Claude Code
4. Idem pour un skill simple
5. Idem pour un workflow tier 1

**Durée : 20–25 min live, parfait pour montrer les erreurs (oups, frontmatter cassé → correction) et ça paraît plus réel.**

### Approche B : Préparation en amont + démo précalculée

Si vous ne pouvez pas faire du live, préparez une démo d'un Agent/Skill/Workflow simple et montrez les fichiers + résultats réels (captures d'écran, transcriptions).

### Quoi montrer

- **Un Agent simple** : ex. agent qui lit un fichier et le résume en 3 points
  - Montrez le `.md`, le frontmatter, les tools scopés
  - Montrez comment l'appeler depuis Claude Code
- **Un Skill simple** : ex. skill qui génère un fichier de config JSON
  - Montrez comment il se déclenche automatiquement quand l'utilisateur dit « crée une config »
  - Montrez la boucle de convergence (comparaison vs une source de vérité)
- **Un Workflow tier 1 (facile)** : ex. slash command `/mon-workflow` qui enchaîne 3 étapes
  - Montrez qu'il suffit de numéroter les étapes, pas de code complexe

---

## Phase 3 : Atelier pratique (90–120 min)

### Avant le démarrage

Rappelez aux participants :
- Vous travaillez **chacun sur votre projet local** — pas dans `atelierIA/` qui est juste un kit de référence
- Consultez les templates dans `templates/` pour copier les squelettes
- Lisez `guide/02-criteres-de-qualite.md` si vous doutez de votre description ou de votre périmètre
- **Demandez de l'aide si vous bloquez** — l'animateur est là pour ça

### Déroulement suggéré

1. **Premiers 15 min** : Chaque participant configure son projet local
   - Crée `.claude/agents/`, `.claude/skills/`, `.claude/commands/` ou `.claude/workflows/`
   - Ouvre Claude Code sur son projet
   - Copie le template de départ (`templates/agents/mon-agent.md`, etc.)

2. **Ensuite, au rythme de chacun** : Construction parallèle
   - Commencez par l'**Agent** (le plus simple : une tâche ponctuelle)
   - Puis le **Skill** (récurrence identifiée, boucle de convergence vers une source de vérité)
   - Puis le **Workflow** (orchestre les deux ou d'autres agents)

3. **Support animateur**
   - Circulez et posez des questions : « Qui est l'utilisateur de ton Agent ? », « Comment tu recognizes ton skill automatiquement ? », « Quelles sont tes sources de vérité ? »
   - Signalez les descriptions trop floues (« Active-toi quand… ? Quand exactement ? »)
   - Aidez sur les blocages techniques (fichier pas trouvé, frontmatter cassé, etc.)

4. **Fin de phase 3**
   - Vérifiez que chacun a **au minimum un Agent + un Skill fonctionnels**
   - Le Workflow peut être tier 1 (simple) ou tier 2 (JS) selon le confort de chacun
   - Pas grave si c'est brouillon — ce qui compte c'est le **principe** et la **clarté de la description**

### Timing par participant

- Agent : 20–30 min
- Skill : 30–40 min (si boucle de convergence à bien pensée)
- Workflow : 15–30 min (tier 1 : rapide, tier 2 : plus long)

**Total : 65–100 min pour les trois. Laissez 15–30 min de buffer pour les questions.**

---

## Phase 4 : Partage + retours (20–25 min)

### Format suggéré

Chaque participant a **5–7 minutes** pour présenter (timez strictement pour que tout le monde passe) :

1. **Sa problématique** (1 min) : « Je voulais automatiser [X] »
2. **Son Agent** (1 min) : nom, activation, exemple
3. **Son Skill** (1.5 min) : quand il se déclenche, ses sources de vérité, résultat
4. **Son Workflow** (1.5 min) : étapes, tier 1 ou 2, point d'arrêt ou parallélisation
5. **Blocages + apprentissages** (1 min) : qu'est-ce qui a marché, qu'est-ce qui s'est cassé, qu'allez-vous refaire ?

### Points de collecte de feedback

- Clarity de la description (activations bien énoncées ?)
- Périmètre clair ?
- Format de sortie approprié ?
- Sources de vérité bien identifiées ?

### Rôle de l'animateur

Posez une question simple après chaque présentation pour montrer l'intérêt et poser des jalons pour les prochains pas : « Comment tu imagines que ce skill s'améliore la prochaine fois qu'il y aura ce besoin ? »

---

## Phase 5 : Bilan et suivi (5–10 min)

### À retenir

Résumez les points clés :

1. **Description d'activation** (« Active-toi quand… ») est LA base
2. **Périmètre clair** = moins de surpises
3. **Tests réels** dans votre projet local = meilleur que la théorie
4. **Réutilisabilité** : votre Skill/Agent/Workflow peut servir à vos collègues aussi

### Prochains pas

- Chacun prend sa création et l'affine à la maison avec ses vrais fichiers/données
- Si vous avez des questions après, on se re-contact sur [canal de support]
- Versionnez vos `.claude/` dans Git (le `.claude/` doit être commité comme le reste du projet)

### Optionnel : tour de table

« En une phrase : qu'est-ce que vous ramenez de cette session ? Qu'est-ce que vous allez essayer demain ? »

---

## Checklist matériel animateur

- [ ] Claude Code installé et à jour sur votre machine
- [ ] Un projet local prêt pour la démo (ou précalculée + captures)
- [ ] `atelierIA/` partagé avec les participants (lien, email, ou dépôt cloné sur chaque machine)
- [ ] Timeboxes notées (start/end pour chaque phase)
- [ ] Table ou écrans partagés si hybride (Zoom, Teams, etc.)
- [ ] Un modérateur pour notes/blocages si équipe large

---

## Annexe : Réponses rapides aux questions récurrentes

**Q. C'est quoi la différence entre un Skill et un Workflow ?**
A. Skill = automatisme qui se reconnaît tout seul (« crée un composant »). Workflow = vous appelez vous-même (« `/mon-workflow` »). Skill est pro-actif, Workflow est réactif (si vous trouvez que c'est l'inverse, c'est normal, c'est une question de perspective 😄).

**Q. On peut faire quoi avec un Agent qu'on ne peut pas faire avec un Skill ?**
A. L'Agent, tu l'appelles **explicitement**. Le Skill doit se **découvrir automatiquement** quand l'utilisateur exprime un besoin. Même code, but différent.

**Q. Tier 1 ou Tier 2 pour le Workflow ?**
A. Tier 1 (slash command) 99 % du temps. Tier 2 seulement si vous avez **vraiment besoin** de parallelization fine ou de schémas JSON typés.

**Q. Peut-on mettre un Workflow dans un Skill ?**
A. Techniquement oui (un Skill qui orchestre des agents), mais c'est un cas avancé. Commencez simples.

**Q. Comment je version mon `.claude/` ?**
A. Commitez-le comme le reste du code : `.claude/agents/*.md`, `.claude/skills/`, `.claude/workflows/`, tous dans Git.

---

Bon atelier ! 🚀
