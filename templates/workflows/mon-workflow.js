// Workflow (Tier 2) — Script Workflow avancé
//
// Ce fichier montre comment écrire un workflow en JavaScript, à dépôt sous
// .claude/workflows/mon-workflow.js pour que Claude Code le reconnaisse comme
// un workflow nommé réutilisable.
//
// Format :
// - export const meta = { name, description, phases } en littéral pur (pas de variables)
// - Corps utilisant phase(), agent(), pipeline(), parallel(), log()
// - Schéma JSON pour typer les agents en fan-out
// - JS pur : pas de TypeScript, pas de Date.now()/Math.random()

export const meta = {
  name: 'mon-workflow',
  description: '[TODO: décrire ce que ce workflow automatise]',
  phases: [
    { title: '[TODO: phase 1 - ex. "Analyse"]' },
    { title: '[TODO: phase 2 - ex. "Génération"]' },
    { title: '[TODO: phase 3 - ex. "Validation"]' },
  ],
}

// Exemple 1 : Pipeline simple (séquentiel)
// Chaque étape s'exécute l'une après l'autre, en utilisant le résultat de la précédente.

async function simple_pipeline() {
  phase('Analyse')

  log('Étape 1 : analyse du contexte')
  const context = await agent('Lis le fichier fourni et résume-le en 5 points clés', {
    label: 'etape1_read',
  })

  log('Étape 2 : génération de recommandations')
  const recommendations = await agent(
    `Basé sur ce contexte : ${context}, propose 3 recommandations`,
    { label: 'etape2_gen' }
  )

  phase('Validation')

  log('Étape 3 : synthèse finale')
  const summary = `Contexte analysé: ${context}\nRecommandations: ${recommendations}`
  return summary
}

// Exemple 2 : Pipeline avec parallélisation
// Certaines étapes peuvent s'exécuter en parallèle si elles n'ont pas de dépendance l'une envers l'autre.

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['pass', 'needs_changes'] },
    findings: { type: 'array' },
    summary: { type: 'string' },
  },
}

async function pipeline_with_parallel() {
  phase('Reviews parallèles')

  log('Lancement des 2 reviews en parallèle...')
  const [codeReviewResult, securityReviewResult] = await parallel([
    () => agent('Effectue une review qualité du code fourni', {
      label: 'code_review',
      schema: REVIEW_SCHEMA,
    }),
    () => agent('Effectue une review sécurité du code fourni', {
      label: 'security_review',
      schema: REVIEW_SCHEMA,
    }),
  ])

  phase('Synthèse')

  log('Combinaison des résultats...')
  const synthesis = {
    code_review: codeReviewResult,
    security_review: securityReviewResult,
    combined_verdict: 'merged from both above', // Vous combineriez les résultats ici
  }

  return synthesis
}

// À votre projet : remplacez les exemples ci-dessus par votre propre logique.
//
// Points clés à retenir :
//
// 1. pipeline(steps) — Par défaut, utilisez-le. Chaque étape s'exécute après la précédente.
//
// 2. parallel(steps) — Seulement si plusieurs étapes n'ont PAS de dépendance l'une envers l'autre.
//    Exemple : deux reviews indépendantes sur le même code.
//    Pièges à éviter :
//    - parallel([...]) qui attend les résultats de l'étape N-1 ? C'est une fausse parallélisation.
//    - Trop d'agents en parallèle qui chacun appelleraient un autre parallèle ? Ça reste séquentiel.
//
// 3. agent(prompt, { label, schema?, ... }) — Lance un agent Claude.
//    - label : nom court pour l'UI (ex. 'code_review')
//    - schema : (optionnel) schéma JSON pour valider/typer la sortie
//
// 4. phase(title) — Marque une phase. Les titres doivent correspondre exactement aux phases de meta.phases[].
//
// 5. log(message) — Affiche un message dans la console (debug).
//
// Syntaxe JS pur :
// - Pas de TypeScript (pas de :Type, pas de generics <T>)
// - Pas de Date.now(), Math.random(), ou autres random non-déterministes
// - Pas d'import/export autres que export const meta
// - Pas de dépendances externes (npm packages)

// [TODO] Adaptez ce template à votre cas d'usage :
// 1. Remplacez les [TODO] dans meta
// 2. Remplissez le body : phases, étapes, agents à appeler
// 3. Testez en déposant ce fichier dans .claude/workflows/mon-workflow.js
// 4. Appelez avec Workflow({ name: 'mon-workflow' }) ou via Claude Code UI
