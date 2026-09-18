# 📌 Cas pratique — Générateur de rapport de tâches

Ce dossier contient un **cas pratique universel** que vous pouvez utiliser pendant l'atelier pour tester votre Agent et votre Skill en conditions réelles.

## Le contexte

Vous avez un **petit script Python** (`task_reporter.py`) qui lit une liste de tâches au format JSON et génère un rapport texte. Le script fonctionne, mais il y a des améliorations à faire.

**Votre mission dans l'atelier :**

1. **Agent** : Analyser le script et identifier 3-5 problèmes de qualité (clarté, lisibilité, optimisation)
2. **Skill** : Refactoriser ou optimiser le script selon une checklist de bonnes pratiques

---

## Fichiers fournis

### `tasks.json`

Données d'exemple — une liste de tâches au format JSON :

```json
{
  "project": "Atelier Claude Code",
  "tasks": [
    {
      "id": 1,
      "title": "Créer un Agent",
      "description": "Implémenter un agent qui revue du code",
      "status": "in_progress",
      "priority": "high"
    },
    {
      "id": 2,
      "title": "Créer un Skill",
      "description": "Implémenter un skill de génération",
      "status": "todo",
      "priority": "high"
    },
    // ... plus de tâches
  ]
}
```

### `task_reporter.py`

Le script que vous analyserez et optimiserez :

```python
import json
import sys

# Charge les tâches depuis un fichier JSON
with open('tasks.json', 'r') as f:
    data = json.load(f)

# Génère un rapport
report = []
report.append("=== TASK REPORT ===\n")
report.append(f"Project: {data['project']}\n")

for task in data['tasks']:
    report.append(f"[{task['status'].upper()}] {task['title']} (Priority: {task['priority']})\n")
    report.append(f"  Description: {task['description']}\n")

# Écrit le rapport
with open('report.txt', 'w') as f:
    f.writelines(report)

print("Report generated: report.txt")
```

**⚠️ Note :** Ce script fonctionne, mais contient des opportunités d'amélioration pédagogique (pas d'erreur de logique majeure, mais du code ordinaire qu'on peut améliorer).

---

## Comment utiliser ce cas pratique

### Avant l'atelier

1. Lisez `task_reporter.py` et `tasks.json`
2. Exécutez le script localement pour voir ce qu'il produit :
   ```bash
   cd examples/
   python3 task_reporter.py
   cat report.txt
   ```
3. Notez mentalement ce qui pourrait s'améliorer (c'est normal si vous ne trouvez pas grand-chose — c'est l'agent qui va vous aider)

### Pendant l'atelier

**Pour votre Agent :**
- Demandez-lui : « Effectue une revue qualité du script `task_reporter.py`. Identifie les problèmes de clarté, lisibilité, structuration. »
- Il lira le fichier et vous donnera une liste structurée de findings
- Format de sortie attendu : JSON avec `{ verdict, findings: [...], summary }`

**Pour votre Skill :**
- Décrivez-le comme : « Je me déclenche quand l'utilisateur demande d'optimiser ou refactoriser un script Python. Je m'appuie sur une checklist de bonnes pratiques (nommage, structure, réutilisabilité). »
- Alimentez-le avec `task_reporter.py` comme entrée
- Il devrait générer une version améliorée du script, avec une note expliquant les changements

---

## Domaines d'amélioration possibles

Voici quelques pistes si vous cherchez des idées (ne lisez que si vous êtes bloqué) :

- **Gestion d'erreurs** : le script plante si `tasks.json` n'existe pas
- **Nommage des variables** : `data`, `report` pourraient être plus explicites
- **Structuration** : pas de fonction dédiée, tout au top-level
- **Lisibilité** : les print statements sont simples, pas de logging
- **Réutilisabilité** : hardcodé sur `tasks.json` et `report.txt`, pas de paramètres
- **Format de rapport** : très basique, pas d'agrégation (nombre de tâches par status, etc.)
- **Types Python** : pas de type hints (Python 3.5+)
- **Tests** : aucun test unitaire

---

## Résultat attendu

Après l'atelier, vous devriez avoir :

1. **Un rapport d'Agent** structuré (JSON ou Markdown) listant les problèmes identifiés
2. **Une version optimisée du script** générée par votre Skill, avec explications des changements

---

## Adapter ce cas à votre contexte

Si Python ne correspond pas à votre contexte, vous pouvez adapter :

- **JavaScript/Node.js** : remplacez le script par du JS moderne
- **SQL** : un script de requête qu'on peut optimiser
- **Configuration (YAML/JSON)** : un fichier de config qu'on peut validater/refactoriser
- **HTML/CSS** : un petit composant qu'on peut analyser pour l'accessibilité

Le principe reste le même : **un artefact concret qu'agent et skill peuvent traiter**.

---

## Notes pour l'animateur

Ce cas pratique peut servir de **démo live pendant l'atelier** :
- Montrez comment lancer l'Agent sur `task_reporter.py`
- Montrez comment le Skill génère une version améliorée
- Les participants reprennent ensuite avec leur propre cas d'usage

Temps estimé : 10–15 minutes pour une démo complète.
