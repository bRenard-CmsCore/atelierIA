# 🚀 Kit d'atelier Claude Code

Bienvenue dans le kit d'atelier **Claude Code** — une session pratique dédiée à la création d'**Agents**, **Skills** et **Workflows** pour automatiser vos tâches récurrentes.

## Objectif de l'atelier

À la fin de cette session (3 à 3.5 heures), vous repartirez avec :

1. ✅ **Un Agent fonctionnel** — un expert qui intervient à la demande sur une tâche bien délimitée
2. ✅ **Un Skill réutilisable** — un automatisme qui se déclenche quand il reconnaît un besoin récurrent
3. ✅ **Un Workflow automatisé** — un enchaînement d'étapes/agents qui orchestre un processus

Tous trois répondront à **une problématique réelle de votre quotidien**.

---

## 📋 Comment utiliser ce kit

**Ce repo est un kit de référence** — guide, templates, checklists. Vous travaillez chacun dans votre **propre projet local**, pas ici. Consultez cette arborescence avant et pendant la session :

### Avant l'atelier

1. **[PREPARATION-ATELIER.md](PREPARATION-ATELIER.md)** — Fiche à remplir et à envoyer à l'animateur
   - Votre problématique réelle (c'est là que tout se joue)
   - Pré-requis techniques à vérifier
   - Découpage en candidat Agent / Skill / Workflow

### Pendant l'atelier (présentation + pratique)

2. **[guide/01-agents-skills-workflows.md](guide/01-agents-skills-workflows.md)** — Les concepts expliqués
   - Tableau comparatif Agent / Skill / Workflow
   - Quand utiliser quoi
   - Structure `.claude/` dans un projet

3. **[guide/02-criteres-de-qualite.md](guide/02-criteres-de-qualite.md)** — Checklist « bien fait »
   - Description orientée activation
   - Périmètre clair
   - Tests et validation

4. **[templates/](templates/)** — Squelettes copiables pour votre projet local
   - `agents/mon-agent.md` — Frontmatter + structure d'un Agent
   - `skills/mon-skill/SKILL.md` — Frontmatter + structure d'un Skill
   - `workflows/mon-workflow-simple.md` — Slash Command (Tier 1, facile)
   - `workflows/mon-workflow.js` — Script Workflow (Tier 2, avancé)

### En fin d'atelier

5. **[RESTITUTION.md](RESTITUTION.md)** — Fiche de documentation de votre travail
   - Récapitulatif Agent / Skill / Workflow
   - Apprentissages et blocages
   - Prochaines étapes

### Pour l'animateur

6. **[DEROULEMENT-ANIMATEUR.md](DEROULEMENT-ANIMATEUR.md)** — Timing, phases, démo, support participants

---

## 💡 Cas pratique à essayer pendant l'atelier

Un **cas pratique concret** est fourni dans `examples/` pour que vous puissiez tester votre Agent et votre Skill en conditions réelles :

- **Données** : `examples/tasks.json` (liste de tâches)
- **Script à analyser** : `examples/task_reporter.py` (générateur de rapport)
- **Guide** : `examples/README.md` (comment l'utiliser)

**L'idée** : Votre Agent analyse le script et identifie des problèmes de qualité. Votre Skill l'optimise. Vous voyez les résultats concrets en fin d'atelier.

---

## 🎯 Structure de votre `.claude/` (dans **votre** projet)

Après l'atelier, vos créations seront organisées comme ça dans votre projet local :

```
mon-projet/
└── .claude/
    ├── agents/
    │   └── mon-agent.md          ← Votre Agent
    ├── skills/
    │   └── mon-skill/
    │       ├── SKILL.md          ← Votre Skill
    │       └── examples/          ← Fichiers de référence (optionnel)
    ├── commands/
    │   └── mon-workflow.md        ← Votre Workflow (Tier 1 — slash command)
    └── workflows/
        └── mon-workflow.js        ← Votre Workflow (Tier 2 — script JS)
```

---

## ⚡ Raccourcis

| Besoin | Fichier à consulter |
|--------|---------------------|
| Je ne sais pas par où commencer | [PREPARATION-ATELIER.md](PREPARATION-ATELIER.md) |
| Expliquez-moi Agent / Skill / Workflow | [guide/01-agents-skills-workflows.md](guide/01-agents-skills-workflows.md) |
| Je doute de la qualité de mon code | [guide/02-criteres-de-qualite.md](guide/02-criteres-de-qualite.md) |
| Je veux un squelette à copier | [templates/](templates/) |
| Je veux tester sur un cas concret | [examples/README.md](examples/README.md) |
| Je dois documenter ce que j'ai fait | [RESTITUTION.md](RESTITUTION.md) |
| Je suis l'animateur | [DEROULEMENT-ANIMATEUR.md](DEROULEMENT-ANIMATEUR.md) |

---

## 🔑 Points clés à retenir

1. **Description orientée activation** — La description (« Active-toi quand… ») est votre allié numéro 1. Si elle est claire, tout le reste suit.

2. **Périmètre explicite** — Dites ce que vous faites **et** ce que vous ne faites pas. Zéro ambiguïté.

3. **Testez dans votre contexte réel** — Les templates ici sont des squelettes. C'est chez vous, dans votre projet, que les choses deviennent vraies.

4. **Réutilisabilité** — Votre Skill/Agent/Workflow peut servir à vos collègues aussi. Pensez-y dans votre description et votre documentation.

---

## ❓ Questions fréquentes

**Q. Je dois créer les fichiers sous `.claude/` dans ce repo `atelierIA/` ?**  
A. Non. Ce repo est un kit de référence. Créez tout dans **votre propre projet local** (dans votre `.claude/` à vous).

**Q. Quel ordre : Agent, Skill ou Workflow en premier ?**  
A. Commencez par l'**Agent** (le plus simple). Puis le **Skill** (reproductibilité + sources de vérité). Puis le **Workflow** (orchestration). Mais vous pouvez adapter selon votre confort.

**Q. Tier 1 (Slash Command) ou Tier 2 (Script JS) pour le Workflow ?**  
A. **Tier 1 par défaut** — c'est lisible et accessible. Tier 2 seulement si vous avez besoin de parallélisation fine ou de logique JavaScript.

**Q. Qui peut voir/utiliser mon Agent/Skill/Workflow quand je l'ai fini ?**  
A. D'abord vous dans votre projet. Pour partager avec l'équipe, versionnez-le dans Git et partagez le repo (ou dupliquez le `.claude/` dans un repo partagé).

---

## 📞 Support

- Pendant l'atelier : posez vos questions à l'animateur en direct
- Après l'atelier : [canal/mail de support à remplir par l'équipe]

---

## 📄 Licence et contexte

Ce kit est fourni dans le contexte d'une formation interne. Libre d'adaptation selon vos besoins.

Bonne chance ! 🚀
