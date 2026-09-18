---
name: mon-workflow-simple
description: "[TODO: décrivez ce que ce workflow automatise — ex. « Orchestre la création et la revue d'une feature »]"
---

# Workflow (Tier 1) — Slash Command — [Titre]

Ceci est un **workflow simple et accessible** basé sur une slash command (`.claude/commands/<nom>.md` dans votre projet).

Vous décrivez le flux en langage naturel, étape par étape. Claude orchestrera automatiquement les appels selon le contexte. Ce format est parfait pour les workflows qui ne nécessitent pas de parallélisation complexe.

## Déclenchement

**Commande :** `/mon-workflow` (ou le nom de votre choix)

**Argument :** [TODO: décrivez l'argument attendu, ex. « un chemin de fichier », « une description de la feature », etc.]

## Étapes du flux

### Étape 1 — [Titre]

[TODO: décrire la première étape.
Exemples :
- « Lis le fichier fourni en argument »
- « Demande à l'utilisateur de décrire le besoin »
- « Récupère les données depuis une API »
- « Appelle l'agent X pour analyser Z »]

### Étape 2 — [Titre]

[TODO: deuxième étape, qui s'appuie généralement sur le résultat de l'étape 1]

### Étape 3 — [Titre]

[TODO: continuez le flux]

### ⚠️ **ARRÊTE-TOI ICI — Validation manuelle**

Avant de continuer vers la production, **demande une approbation explicite à l'utilisateur**.

Résumé de ce qui a été fait aux étapes 1-3 :
- [TODO: listez les décisions et les résultats intermédiaires]

Demander : **« Souhaitez-vous continuer ? Avez-vous des ajustements ? »**

### Étape 4 — [Titre]

[TODO: étape qui ne s'exécute que si l'utilisateur a validé à l'étape 3.
Exemple : « Procéder au déploiement », « Générer le rapport final »]

### Étape N — Récap final

[TODO: synthèse de ce qui a été livré : fichiers générés, résumé des changements, prochaines étapes optionnelles]

---

## Pour implémenter cette slash command

1. Créez le fichier `.claude/commands/mon-workflow.md` dans votre projet local
2. Copiez ce modèle et remplissez les `[TODO]`
3. Testez avec `/mon-workflow` depuis Claude Code
4. Affinez les étapes selon les résultats réels

**Avantage de ce format :** accessible, lisible, permet l'interaction humaine à des points clés (comme l'étape 3 qui demande une validation avant de continuer).

**Inconvénient :** moins de contrôle programmatique sur la parallélisation ou les schémas JSON complexes — si vous avez besoin de ça, passer au **Tier 2 (script Workflow)**.
