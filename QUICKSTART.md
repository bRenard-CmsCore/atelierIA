# ⚡ Quick Start — 30 secondes pour démarrer

Si vous êtes pressé, voici le **strict minimum** pour commencer.

---

## Étape 1 : Lire les concepts (5 min)

Lisez juste le **tableau comparatif** dans [`guide/01-agents-skills-workflows.md`](guide/01-agents-skills-workflows.md) (première section).

→ Vous comprenez : Agent = à la demande, Skill = automatique, Workflow = orchestration.

---

## Étape 2 : Copier un template (2 min)

Créez un dossier `.claude/` dans votre projet local :

```bash
mkdir -p mon-projet/.claude/agents
mkdir -p mon-projet/.claude/skills/mon-skill
mkdir -p mon-projet/.claude/commands
```

Copiez les squelettes :
- `templates/agents/mon-agent.md` → `mon-projet/.claude/agents/`
- `templates/skills/mon-skill/SKILL.md` → `mon-projet/.claude/skills/mon-skill/`

---

## Étape 3 : Remplir les TODOs (5 min)

**Pour votre Agent :**
```yaml
name: ma-review-agent
description: "Active-toi quand l'utilisateur demande une review du script task_reporter.py"
tools:
  - Read
  - Grep
model: sonnet
```

**Pour votre Skill :**
```yaml
name: mon-optimiseur
description: "Active-toi quand l'utilisateur demande d'optimiser un script Python"
```

---

## Étape 4 : Utiliser un prompt prêt (3 min)

Ouvrez Claude Code, consultez [`examples/PROMPTS-POUR-ATELIER.md`](examples/PROMPTS-POUR-ATELIER.md) et copiez un prompt.

**Exemple :** copie le prompt du point 1️⃣ (« Créer votre Agent de review ») et lance-le.

Claude Code crée votre Agent directement.

---

## Étape 5 : Tester (2 min)

Testez votre Agent en l'appelant dans Claude Code :

```
Effectue une revue qualité de examples/task_reporter.py
```

Voilà ! 🎉

---

## Prochaines étapes (optionnel)

- Créer votre Skill en suivant le prompt du point 2️⃣
- Créer votre Workflow en suivant le prompt du point 3️⃣
- Consulter [`guide/02-criteres-de-qualite.md`](guide/02-criteres-de-qualite.md) pour affiner

---

## Points clés à retenir

✅ **Description orientée activation** — C'est la partie la plus importante
✅ **Périmètre clair** — Dites ce que vous faites ET ce que vous ne faites pas
✅ **Testez tout de suite** — Pas de théorie, tout en pratiquant

---

## En cas de blocage

| Problème | Solution |
|----------|----------|
| Je ne sais pas par où commencer | → Lisez `PREPARATION-ATELIER.md` |
| Mon Agent/Skill ne se déclenche pas | → Vérifiez la `description` (« Active-toi quand… ») |
| Je doute de la qualité | → Consultez `guide/02-criteres-de-qualite.md` |
| Je veux des exemples | → Consultez `examples/PROMPTS-POUR-ATELIER.md` |
| Je suis l'animateur | → Lisez `DEROULEMENT-ANIMATEUR.md` |

---

Allez-y ! ⚡
