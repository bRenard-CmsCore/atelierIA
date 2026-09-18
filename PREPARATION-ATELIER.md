# Préparation — Atelier Claude Code

Merci de participer à cet atelier pratique sur Claude Code ! Avant la session, veuillez compléter cette fiche pour définir votre cas d'usage.

## Vos informations

**Prénom :**

**Équipe/domaine :**

## Votre problématique réelle

Décrivez en 2-3 phrases la tâche ou le processus que vous souhaitez automatiser ou améliorer à l'aide de Claude Code.

*Exemple : « Je fais des restitutions de tests manuels chaque semaine en copiant-collant les résultats d'une feuille de calcul. Je veux automatiser la génération d'un rapport Markdown prêt à partager. »*

**Ma problématique :**

---

## Découpage en candidats Agent / Skill / Workflow

À partir de votre problématique, identifiez les trois briques que vous allez construire pendant l'atelier.

### Candidat Agent

**Question :** Quelle tâche **ponctuelle**, à **périmètre net**, voudriez-vous déléguer à la demande ?

*Exemples : « Extraire les URLs d'une page HTML », « Relire la clarté d'un paragraphe », « Valider que ma requête SQL est correcte » — des tâches qu'on demande une fois, ponctuellement.*

**Mon Agent :**
- **Nom (tentative) :** `[TODO]`
- **Ce qu'il doit faire :** `[TODO]`
- **Données d'entrée attendues :** `[TODO]`
- **Format de sortie attendu :** `[TODO]`

### Candidat Skill

**Question :** Quelle tâche **récurrente** refaites-vous à l'identique et voudriez-vous **automatiser dès qu'elle se présente** ?

*Exemples : « Générer un composant React à partir d'une spec », « Tester une nouvelle API avant de l'intégrer », « Mettre à jour les balises SEO d'une page » — des tâches qu'on déclenche automatiquement selon un pattern reconnaissable.*

**Mon Skill :**
- **Nom (tentative) :** `[TODO]`
- **Déclencheurs (quand s'activer ?) :** `[TODO]`
- **Ce qu'il doit faire :** `[TODO]`
- **Sources de vérité (s'il y en a une — spec, maquette, convention) :** `[TODO]`
- **Format de sortie attendu :** `[TODO]`

### Candidat Workflow

**Question :** Quel **enchaînement de plusieurs étapes/agents** voudriez-vous **fiabiliser et orchestrer** ?

*Exemples : « Pour déployer une feature en production, il faut (1) créer le composant, (2) demander une review, (3) lancer les tests, (4) valider manuellement. Je veux une commande qui enchaîne tout ça. », « Chaque début de sprint, je dois (1) lister les tâches non faites, (2) les regrouper par priorité, (3) générer un récap pour l'équipe. »*

**Mon Workflow :**
- **Nom (tentative) :** `[TODO]`
- **Déclenchement :** Comment va-t-on l'appeler ? (slash command `/mon-workflow`, ou appel direct au script ?)
- **Étapes principales (3-5 étapes) :** `[TODO]` → `[TODO]` → `[TODO]` → …
- **Résultat final attendu :** `[TODO]`
- **Niveau de complexité visé :** Tier 1 (simple, langage naturel) ou Tier 2 (script JavaScript, avancé) ?

---

## Pré-requis techniques

Veuillez vérifier que vous avez ces éléments prêts **avant l'atelier** :

- [ ] Claude Code installé sur votre machine (web.claude.ai/code ou app bureautique)
- [ ] Un **projet local** (Git ou non) où vous pouvez créer un dossier `.claude/` pour expérimenter (peut être un projet existant ou un dossier de test)
- [ ] Un **jeu de fichiers d'exemple** pertinent pour votre cas d'usage (données d'entrée, fichiers de référence, spec, maquette… selon votre besoin)
- [ ] Les **guides du kit** lus en diagonale (au minimum `guide/01-agents-skills-workflows.md`)

**Si vous avez un doute ou un blocage technique, rapportez-le lors de la session — on l'aura tôt le matin.**

---

## Notes finales

- Votre cas d'usage ne doit **pas être parfait** — c'est l'atelier qui sert à le converger et l'affiner.
- Si une ou plusieurs des trois briques vous semblent floues, apportez la fiche quand même — vous aurez l'occasion de les redéfinir pendant la session, face à face avec l'animateur et la team.
- Si vous avez des questions avant la session, posez-les dans le canal/mail dédié.

À bientôt ! 🚀
