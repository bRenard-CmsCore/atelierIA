# 📝 Prompts prêts à l'emploi pour l'atelier

Ce fichier contient des **prompts simples et copiables** que vous pouvez passer directement à Claude Code pour créer votre Agent, Skill et Workflow en utilisant le cas pratique.

**Comment utiliser :** Copiez le prompt qui vous intéresse, lancez Claude Code, et collez-le dans la conversation. Adaptez les détails selon vos besoins.

---

## 1️⃣ Créer votre Agent de review

### Prompt simple — Review du script task_reporter.py

```
Tu es un expert en revue de code Python. 

Effectue une revue qualité du script `task_reporter.py` (dans examples/).

Identifie les problèmes dans ces catégories :
1. Gestion d'erreurs (que se passe-t-il si le fichier n'existe pas ?)
2. Clarté du code (noms de variables explicites ?)
3. Structuration (le code est-il bien organisé en fonctions ?)
4. Réutilisabilité (peut-on paramétrer le script ?)
5. Tests (y a-t-il des tests ?)

Pour chaque problème trouvé, donne :
- Localisation (fichier + ligne approximative)
- Sévérité (blocker, major, minor)
- Description du problème
- Recommandation concrète

Format de sortie : JSON avec { verdict: "pass" | "needs_changes", findings: [...], summary: "..." }
```

### Prompt avancé — Review structurée avec critères explicites

```
Tu es un reviewer Python senior spécialisé dans la qualité de code.

Revise `examples/task_reporter.py` et rends un verdict structuré.

**Périmètre d'analyse :**
- Clarity : nommage des variables, lisibilité du code
- Structuration : organisation en fonctions, responsabilités claires
- Robustesse : gestion d'erreurs, validation des entrées
- Maintenabilité : facilité à modifier/étendre le code

**Hors périmètre :**
- Performance (n'optimise pas encore)
- Refactoring architecturale globale
- Ajout de nouvelles features

**Format de sortie (JSON) :**
{
  "verdict": "pass" | "needs_changes",
  "findings": [
    {
      "category": "clarity" | "structuration" | "robustesse" | "maintenabilité",
      "severity": "blocker" | "major" | "minor",
      "line": XX,
      "description": "...",
      "recommendation": "..."
    }
  ],
  "summary": "..."
}

Si aucun problème trouvé, findings: [] et verdict: "pass".
```

---

## 2️⃣ Créer votre Skill d'optimisation

### Prompt simple — Optimiser le script

```
Tu es un optimiseur de code Python. Tu te déclenches quand l'utilisateur demande 
d'améliorer, refactoriser ou optimiser un script.

Optimise le script `examples/task_reporter.py` en appliquant ces bonnes pratiques :

1. **Organise en fonctions** : une fonction pour charger le JSON, une pour générer 
   le rapport, une pour écrire le fichier
2. **Ajoute une gestion d'erreurs** : que faire si tasks.json n'existe pas ?
3. **Rends-le réutilisable** : accepte des paramètres (fichiers d'entrée/sortie)
4. **Améliore la clarté** : noms de variables explicites (pas `data`, mais `project_data`)
5. **Ajoute type hints** : utilise les annotations de type Python

Écris le script optimisé et explique en une phrase chaque changement.
```

### Prompt avancé — Refactor avec sources de vérité

```
Tu es un refactoreur Python expert. Tu optimises des scripts existants 
en les rendant plus maintenables et réutilisables.

**Tu te déclenches quand :** l'utilisateur demande de refactoriser, optimiser 
ou améliorer un script Python.

**Source de vérité :** Le code doit respecter PEP 8 et utiliser les idiomes 
Python modernes (3.8+).

**Procédure :**
1. Lis le script original (`examples/task_reporter.py`)
2. Identifie les opportunités d'amélioration
3. Refactorise en appliquant :
   - Découpage en fonctions (une responsabilité par fonction)
   - Type hints (fonction __main__ optionnelle pour démo)
   - Gestion d'erreurs (try/except pour les I/O)
   - Nommage clair
4. Crée le script optimisé
5. **Boucle de convergence :** Compare ta version vs la version originale
   - Est-elle plus lisible ? ✓
   - Est-elle testable ? ✓
   - Est-elle réutilisable ? ✓

**Format de sortie :**
1. Script refactorisé (entre ``` ````)
2. Liste des changements (une par ligne)
3. Note de convergence : points améliorés vs version originale
```

---

## 3️⃣ Créer votre Workflow

### Prompt simple — Workflow d'analyse et optimisation (Tier 1)

```
Crée un workflow qui enchaîne review et optimisation du script task_reporter.py.

**Étapes :**
1. Lis le script task_reporter.py
2. Appelle l'agent de review pour analyser la qualité
3. Demande à l'utilisateur : "Les findings te semblent-ils corrects ? Veux-tu continuer ?"
4. Si oui : appelle le skill d'optimisation pour générer une version améliorée
5. Comparaison : affiche côte à côte (avant/après)

**Où :** Crée ce workflow sous `.claude/commands/optimize-task-reporter.md` 
(ou un nom de ton choix) dans ton projet local.

Utilise la structure simple (slash command) — pas besoin de JS.
```

### Prompt avancé — Workflow orchestré en pipeline (Tier 2)

```
Écris un script Workflow (JS) qui orchestre une pipeline complète 
de review + optimisation du script task_reporter.py.

**Structure :**
export const meta = {
  name: 'optimize-task-reporter',
  description: 'Orchestre review et optimisation du script task_reporter.py',
  phases: [
    { title: 'Review' },
    { title: 'Optimisation' },
    { title: 'Synthèse' },
  ],
}

**Phases :**
1. **Review** → Lance l'agent de review, attends le verdict JSON
2. **Optimisation** → Lance le skill d'optimisation avec le script + findings en contexte
3. **Synthèse** → Combine les deux résultats (findings originaux + script optimisé)

**Déploie :** Crée ce fichier sous `.claude/workflows/optimize-task-reporter.js` 
dans ton projet local.

Utilise pipeline() pour la séquence, pas parallel() (une étape après l'autre).
```

---

## 4️⃣ Prompts de validation/test

### Test Agent — Vérifier que l'agent fonctionne

```
Teste mon agent en le lançant sur examples/task_reporter.py.

Commandes :
1. Lis examples/task_reporter.py
2. Exécute la revue (appelle ton agent avec le prompt du point 1)
3. Rends-moi le résultat en JSON

Regarde bien : l'agent a-t-il identifié au moins 3 problèmes ?
```

### Test Skill — Vérifier que le skill se déclenche

```
Mon skill s'appelle « optimiseur Python ».

Teste-le en lui demandant : 
"Optimise examples/task_reporter.py en appliquant les bonnes pratiques Python."

Vérifications :
- Le skill s'active-t-il ? (reconnait-il la demande ?)
- Génère-t-il une version améliorée du script ?
- Explique-t-il ses changements ?
```

### Test Workflow — Vérifier que le workflow s'enchaîne

```
J'ai créé un workflow "/optimize-task-reporter".

Teste-le :
1. Lance la commande /optimize-task-reporter
2. Le workflow doit :
   - Charger examples/task_reporter.py
   - Appeler l'agent de review
   - T'afficher les findings
   - T'arrêter et demander : "Continuer avec l'optimisation ?"
   - Si tu dis oui : optimiser le script
   - Afficher le script optimisé

Tout fonctionne ? Bravo, tu as un workflow complet !
```

---

## 5️⃣ Prompts d'amélioration progressive

### Amélioration n°1 — Ajouter la gestion d'erreurs

```
Mon script task_reporter.py échoue silencieusement si tasks.json n'existe pas.

Améliore-le : 
- Vérifie que tasks.json existe avant de le lire
- Si absent, affiche un message clair : "Erreur : tasks.json non trouvé dans le répertoire courant"
- Arrête proprement le script (exit code 1)

Réécris la version améliorée.
```

### Amélioration n°2 — Rendre paramétrable

```
Actuellement, task_reporter.py est hardcodé sur 'tasks.json' et 'report.txt'.

Rends-le flexible :
- Accepte le chemin d'entrée et de sortie comme paramètres (en dur ou via argparse)
- Exemple d'usage : python task_reporter.py --input autre.json --output autre_report.txt

Réécris la version.
```

### Amélioration n°3 — Ajouter des tests

```
Mon script task_reporter.py n'a pas de tests.

Écris un fichier test_task_reporter.py (Unittest ou Pytest) avec 3 tests :
1. Test : le script crée bien un fichier report.txt
2. Test : le rapport contient le titre "TASK REPORT"
3. Test : le rapport compte correctement les tâches par status

Fournis le fichier test.
```

---

## 🎯 Récapitulatif — Ordre suggéré pour l'atelier

```
Temps    | Tâche
---------|-------------------------------------------
15 min   | Créer mon Agent (prompt 1.1)
         | Test Agent (prompt 4.1)
---------|-------------------------------------------
20 min   | Créer mon Skill (prompt 2.1)
         | Test Skill (prompt 4.2)
---------|-------------------------------------------
15 min   | Créer mon Workflow (prompt 3.1)
         | Test Workflow (prompt 4.3)
---------|-------------------------------------------
10 min   | Amélioration progressive (prompt 5.*)
         | Choisir 1-2 améliorations à tester
---------|-------------------------------------------
```

---

## 💡 Conseils

1. **Commencez par le prompt simple** — Adaptez vers l'avancé si vous êtes à l'aise
2. **Testez après chaque création** — Utilisez les prompts de validation
3. **Refinez progressivement** — Pas besoin d'être parfait au premier essai
4. **Documentez vos descriptions** — La description d'activation (« Active-toi quand… ») est la clé
5. **Explorez les améliorations** — Une fois l'Agent/Skill/Workflow fonctionnels, essayez les prompts n°5

---

## ❓ Questions fréquentes

**Q. Je dois vraiment utiliser le cas pratique task_reporter.py ?**  
A. Non, c'est optionnel. Vous pouvez utiliser vos propres scripts/données. Mais c'est un excellent démarreur si vous êtes bloqué.

**Q. Puis-je combiner plusieurs prompts ?**  
A. Bien sûr ! Vous pouvez dire : « [prompt Agent] + [amélioration n°1] » en une seule demande.

**Q. Mon Agent/Skill ne fonctionne pas au premier essai ?**  
A. C'est normal ! Itérez : demandez à Claude Code de corriger, vérifier la description, affiner le périmètre.

**Q. Tier 1 ou Tier 2 pour le Workflow ?**  
A. Tier 1 (simple) pour 90 % des cas. Tier 2 seulement si vous avez besoin de parallélisation fine.
