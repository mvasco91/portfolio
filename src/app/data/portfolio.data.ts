/**
 * All portfolio content lives here, in English (primary), French and Spanish.
 * Edit this file to update the site; no component changes needed.
 */

export type Lang = 'en' | 'fr' | 'es';
export const LANGS: Lang[] = ['en', 'fr', 'es'];
export const DEFAULT_LANG: Lang = 'en';
export interface Text { en: string; fr: string; es: string }

/** Same text in every language (names, brands). */
const same = (s: string): Text => ({ en: s, fr: s, es: s });

export const PROFILE = {
  name: 'Mauricio Vasco Vélez',
  shortName: 'Mauricio Vasco',
  role: {
    en: 'Senior Front-End Developer & Tech Lead',
    fr: 'Développeur front-end senior et responsable technique',
    es: 'Desarrollador front-end senior y líder técnico',
  } as Text,
  location: { en: 'Toronto, Ontario', fr: 'Toronto (Ontario)', es: 'Toronto, Ontario' } as Text,
  email: 'maurovasco91@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mauricio-vasco-velez',
  github: 'https://github.com/mvasco91',
  source: 'https://github.com/mvasco91/portfolio',
  resume: 'Mauricio-Vasco-Resume.pdf',
};

export const UI = {
  nav: {
    work: { en: 'Case studies', fr: 'Études de cas', es: 'Casos' },
    experience: { en: 'Experience', fr: 'Parcours', es: 'Experiencia' },
    skills: { en: 'Skills', fr: 'Compétences', es: 'Habilidades' },
    contact: { en: 'Contact', fr: 'Contact', es: 'Contacto' },
  },
  hero: {
    headline: {
      en: 'I lead front‑end teams and still write code every day.',
      fr: 'Je dirige des équipes front‑end et je code encore tous les jours.',
      es: 'Lidero equipos front‑end y sigo programando todos los días.',
    },
    intro: {
      en: "I'm Mauricio, a senior front-end developer in Toronto. For 10 years I've built Angular apps for banks, insurers and enterprise SaaS. At Asigra I lead the front-end team and set up the architecture of SaaS Assure from the first commit, and I still build features, review pull requests and fix bugs with the team.",
      fr: "Je suis Mauricio, développeur front-end senior à Toronto. Depuis 10 ans, je développe des applications Angular pour des banques, des assureurs et du SaaS d'entreprise. Chez Asigra, je dirige l'équipe front-end et j'ai mis en place l'architecture de SaaS Assure dès le premier commit. Je développe encore des fonctionnalités, révise les pull requests et corrige des bogues avec l'équipe.",
      es: 'Soy Mauricio, desarrollador front-end senior en Toronto. Llevo 10 años construyendo aplicaciones Angular para bancos, aseguradoras y SaaS empresarial. En Asigra lidero el equipo front-end y armé la arquitectura de SaaS Assure desde el primer commit, y sigo desarrollando funcionalidades, revisando pull requests y corrigiendo bugs con el equipo.',
    },
    available: {
      en: 'Available for Front-End Lead and Senior Front-End Developer roles in Canada.',
      fr: 'Disponible pour des postes de responsable front-end et de développeur front-end senior au Canada.',
      es: 'Disponible para roles de líder front-end y desarrollador front-end senior en Canadá.',
    },
    email: { en: 'Email me', fr: 'Écrivez-moi', es: 'Escríbeme' },
    resume: { en: 'Download resume (PDF)', fr: 'Télécharger mon CV (PDF, anglais)', es: 'Descargar hoja de vida (PDF, inglés)' },
  },
  cases: {
    title: { en: 'Case studies', fr: 'Études de cas', es: 'Casos de estudio' },
    note: {
      en: 'These are client and employer products, so I describe the work instead of showing screens.',
      fr: "Ce sont des produits de clients et d'employeurs : je décris le travail au lieu de montrer des écrans.",
      es: 'Son productos de clientes y empleadores, así que describo el trabajo en lugar de mostrar pantallas.',
    },
    open: { en: 'Read case study', fr: "Lire l'étude de cas", es: 'Leer el caso' },
    close: { en: 'Close', fr: 'Fermer', es: 'Cerrar' },
    did: { en: 'What I did', fr: "Ce que j'ai fait", es: 'Qué hice' },
    outcome: { en: 'Outcome', fr: 'Résultat', es: 'Resultado' },
    facts: {
      role: { en: 'Role', fr: 'Rôle', es: 'Rol' },
      period: { en: 'Period', fr: 'Période', es: 'Periodo' },
      team: { en: 'Team', fr: 'Équipe', es: 'Equipo' },
      stack: { en: 'Stack', fr: 'Technologies', es: 'Tecnologías' },
    },
  },
  experience: {
    title: { en: 'Experience', fr: 'Parcours', es: 'Experiencia' },
  },
  skills: {
    title: { en: 'Skills', fr: 'Compétences', es: 'Habilidades' },
    certs: { en: 'Certifications', fr: 'Certifications', es: 'Certificaciones' },
    education: { en: 'Education', fr: 'Formation', es: 'Educación' },
    languages: { en: 'Languages', fr: 'Langues', es: 'Idiomas' },
  },
  contact: {
    title: { en: "Let's talk.", fr: 'Discutons.', es: 'Hablemos.' },
    body: {
      en: "I'm open to Senior Front-End or Angular Developer roles as well as Tech Lead positions. I'm happy writing code full-time or leading a team while staying hands-on. Remote or hybrid in the GTA both work, and I'm open to relocating.",
      fr: "Je suis ouvert aux postes de développeur front-end ou Angular senior, ainsi qu'aux postes de responsable technique. Je peux coder à temps plein ou diriger une équipe tout en restant dans le code. À distance ou en mode hybride dans la région de Toronto, et je suis ouvert à déménager.",
      es: 'Estoy abierto a roles de desarrollador front-end o Angular senior y también a posiciones de líder técnico. Me siento cómodo programando a tiempo completo o liderando un equipo sin dejar de programar. Remoto o híbrido en el área de Toronto, y estoy abierto a mudarme.',
    },
    copy: { en: 'Copy email', fr: 'Copier le courriel', es: 'Copiar correo' },
    copied: { en: 'Copied', fr: 'Copié', es: 'Copiado' },
  },
  footer: {
    built: {
      en: 'Built with Angular signals. The panel in the corner shows them working.',
      fr: "Fait avec les signals d'Angular. Le panneau dans le coin les montre en action.",
      es: 'Hecho con signals de Angular. El panel de la esquina los muestra en acción.',
    },
    source: { en: 'View the source', fr: 'Voir le code source', es: 'Ver el código fuente' },
  },
  langNames: { en: same('English'), fr: same('Français'), es: same('Español') },
  langPicker: { en: 'Language', fr: 'Langue', es: 'Idioma' },
  a11y: {
    open: { en: 'Accessibility and display', fr: 'Accessibilité et affichage', es: 'Accesibilidad y visualización' },
    title: { en: 'Display', fr: 'Affichage', es: 'Visualización' },
    theme: { en: 'Colour theme', fr: 'Thème de couleurs', es: 'Tema de color' },
    light: { en: 'Light', fr: 'Clair', es: 'Claro' },
    dark: { en: 'Dark', fr: 'Sombre', es: 'Oscuro' },
    contrast: { en: 'High contrast', fr: 'Contraste élevé', es: 'Alto contraste' },
    motion: { en: 'Reduce motion', fr: 'Réduire les animations', es: 'Reducir animaciones' },
  },
  inspector: {
    toggle: same('Signals'),
    title: { en: 'Live signal graph', fr: 'Graphe de signals en direct', es: 'Grafo de signals en vivo' },
    intro: {
      en: 'This is the real state of this page. Change the language, the theme or open a case study and watch what updates.',
      fr: "Voici l'état réel de cette page. Changez la langue, le thème ou ouvrez une étude de cas pour voir ce qui se met à jour.",
      es: 'Este es el estado real de esta página. Cambia el idioma, el tema o abre un caso y mira qué se actualiza.',
    },
    log: { en: 'Recent updates', fr: 'Mises à jour récentes', es: 'Actualizaciones recientes' },
    empty: {
      en: 'Nothing yet. Try pressing L or T.',
      fr: "Rien pour l'instant. Essayez L ou T.",
      es: 'Nada todavía. Prueba con L o T.',
    },
    shortcuts: {
      en: 'Shortcuts: L language, T theme, S this panel',
      fr: 'Raccourcis : L langue, T thème, S ce panneau',
      es: 'Atajos: L idioma, T tema, S este panel',
    },
    how: { en: 'How it works', fr: 'Comment ça marche', es: 'Cómo funciona' },
    close: { en: 'Close panel', fr: 'Fermer le panneau', es: 'Cerrar panel' },
  },
};

/* ----------------------------------------------------------------
   Case studies (facts only from the resume)
   ---------------------------------------------------------------- */
export interface CaseSection {
  title: Text;
  items: Text[];
}

export interface CaseStudy {
  id: string;
  name: Text;
  company: string;
  summary: Text;
  context: Text;
  sections: CaseSection[];
  outcome: Text;
  role: Text;
  period: Text;
  team?: Text;
  stack: string;
}

const T = {
  architecture: { en: 'Architecture', fr: 'Architecture', es: 'Arquitectura' },
  problems: { en: 'Hard problems I solved', fr: "Problèmes difficiles que j'ai résolus", es: 'Problemas difíciles que resolví' },
  quality: { en: 'Quality and delivery', fr: 'Qualité et livraison', es: 'Calidad y entrega' },
  did: { en: 'What I did', fr: "Ce que j'ai fait", es: 'Qué hice' },
};

export const CASES: CaseStudy[] = [
  {
    id: 'saas-assure',
    name: same('SaaS Assure'),
    company: 'Asigra',
    summary: {
      en: 'Front-end architecture for an enterprise backup and data-protection platform, from the first commit to a large signal-based migration.',
      fr: "Architecture front-end d'une plateforme d'entreprise de sauvegarde et de protection des données, du premier commit à une grande migration vers les signals.",
      es: 'Arquitectura front-end de una plataforma empresarial de respaldo y protección de datos, desde el primer commit hasta una gran migración a signals.',
    },
    context: {
      en: "SaaS Assure is the web front end of Asigra's enterprise backup platform. I joined as a senior developer and was leading the front-end team within a week, so the architecture decisions were mine to make and to live with. Today it runs on Angular 20 with standalone components.",
      fr: "SaaS Assure est le front-end web de la plateforme de sauvegarde d'entreprise d'Asigra. Je suis arrivé comme développeur senior et je dirigeais l'équipe front-end une semaine plus tard : les décisions d'architecture m'appartenaient, avec leurs conséquences. Aujourd'hui, l'application tourne sur Angular 20 avec des composants autonomes.",
      es: 'SaaS Assure es el front-end web de la plataforma empresarial de respaldos de Asigra. Entré como desarrollador senior y a la semana ya lideraba el equipo front-end, así que las decisiones de arquitectura eran mías, y también sus consecuencias. Hoy corre sobre Angular 20 con componentes standalone.',
    },
    sections: [
      {
        title: T.architecture,
        items: [
          {
            en: 'Set up the Nx monorepo with shared libraries and clear boundaries between features.',
            fr: "Mise en place du monorepo Nx avec des bibliothèques partagées et des frontières claires entre les fonctionnalités.",
            es: 'Armé el monorepo Nx con librerías compartidas y límites claros entre funcionalidades.',
          },
          {
            en: 'Led a module-by-module migration from classic NgRx (actions, reducers, effects, selectors) to signal stores behind facades, in production and with no downtime. I wrote it as a repeatable playbook: analysis, state mapping, signal store, facade, consumer migration, NgRx removal, tests and validation.',
            fr: "Direction d'une migration module par module de NgRx classique (actions, reducers, effects, selectors) vers des signal stores derrière des façades, en production et sans interruption. Je l'ai rédigée comme une méthode reproductible : analyse, cartographie de l'état, signal store, façade, migration des consommateurs, retrait de NgRx, tests et validation.",
            es: 'Lideré una migración módulo por módulo de NgRx clásico (actions, reducers, effects, selectors) a signal stores detrás de facades, en producción y sin caídas. La escribí como un procedimiento repetible: análisis, mapeo del estado, signal store, facade, migración de consumidores, retiro de NgRx, pruebas y validación.',
          },
          {
            en: 'Separated state-connected components from presentational ones across the codebase, replacing manual subscriptions with signal-based reactivity using effect() and untracked().',
            fr: "Séparation des composants connectés à l'état et des composants de présentation dans tout le code, en remplaçant les abonnements manuels par une réactivité basée sur les signals avec effect() et untracked().",
            es: 'Separé los componentes conectados al estado de los presentacionales en todo el código, reemplazando suscripciones manuales por reactividad con signals usando effect() y untracked().',
          },
          {
            en: 'Kept four API versions (v1 to v4) working side by side in the most complex module, backup lifecycle management: multi-step restore wizards with MFA or MPA at the final step, granular and domain-level backup selection, and a vault-browsing session that retries transient 504 errors with exponential backoff.',
            fr: "Coexistence de quatre versions d'API (v1 à v4) dans le module le plus complexe, la gestion du cycle de vie des sauvegardes : assistants de restauration en plusieurs étapes avec MFA ou MPA à la dernière étape, sélection granulaire ou par domaine, et une session de navigation du coffre qui relance les erreurs 504 passagères avec un délai exponentiel.",
            es: 'Mantuve cuatro versiones de API (v1 a v4) funcionando juntas en el módulo más complejo, la gestión del ciclo de vida de los respaldos: asistentes de restauración de varios pasos con MFA o MPA en el último paso, selección granular o por dominio, y una sesión de exploración del vault que reintenta los errores 504 transitorios con backoff exponencial.',
          },
          {
            en: 'Picked the simplest tool for each case: NgRx where much of the app shares state, lightweight services where components only need to talk to each other.',
            fr: "Choix de l'outil le plus simple selon le cas : NgRx quand une grande partie de l'application partage l'état, des services légers quand des composants doivent seulement communiquer entre eux.",
            es: 'Elegí la herramienta más simple para cada caso: NgRx donde gran parte de la app comparte estado, servicios livianos donde los componentes solo necesitan comunicarse entre sí.',
          },
          {
            en: 'Rebuilt the shared UI library with an atomic design structure and moved it from legacy SCSS to Tailwind CSS.',
            fr: "Refonte de la bibliothèque d'interface partagée selon une structure atomique, en passant du SCSS historique à Tailwind CSS.",
            es: 'Reconstruí la librería de UI compartida con una estructura de diseño atómico y la migré de SCSS heredado a Tailwind CSS.',
          },
        ],
      },
      {
        title: T.problems,
        items: [
          {
            en: 'Refresh-token race across browser tabs: elected a leader tab with the Web Locks API, which removed duplicate refresh calls and the auth failures they caused.',
            fr: "Concurrence entre onglets lors du renouvellement du jeton : élection d'un onglet principal avec la Web Locks API, ce qui a éliminé les appels en double et les échecs d'authentification qu'ils causaient.",
            es: 'Condición de carrera del refresh token entre pestañas: elegí una pestaña líder con la Web Locks API, lo que eliminó las llamadas duplicadas y los fallos de autenticación que causaban.',
          },
          {
            en: 'Cross-account cache leak: switching accounts could show cached data from the previous one. I found the root cause and shipped the fix with regression tests and QA acceptance criteria.',
            fr: "Fuite de cache entre comptes : changer de compte pouvait afficher des données du compte précédent. J'ai trouvé la cause et livré le correctif avec des tests de régression et des critères d'acceptation pour l'assurance qualité.",
            es: 'Fuga de caché entre cuentas: al cambiar de cuenta podían aparecer datos de la anterior. Encontré la causa raíz y entregué la corrección con pruebas de regresión y criterios de aceptación para QA.',
          },
          {
            en: 'Firefox-only race conditions in the OTP and MFA inputs, with lost focus and dropped keystrokes during sign-in.',
            fr: "Conditions de concurrence propres à Firefox dans les champs OTP et MFA, avec perte de focus et frappes ignorées pendant la connexion.",
            es: 'Condiciones de carrera exclusivas de Firefox en los campos de OTP y MFA, con pérdida de foco y teclas que no se registraban al iniciar sesión.',
          },
          {
            en: 'Front-end mitigations for OWASP-class issues such as insecure direct object references, rolled out in stages from dev to preprod to production.',
            fr: "Mesures front-end contre des vulnérabilités de type OWASP, comme les références directes non sécurisées à des objets, déployées par étapes du développement à la préproduction puis à la production.",
            es: 'Mitigaciones front-end para vulnerabilidades tipo OWASP, como referencias directas inseguras a objetos, desplegadas por etapas de dev a preproducción y producción.',
          },
        ],
      },
      {
        title: T.quality,
        items: [
          {
            en: 'Test coverage at 90% with Jest and Playwright. I reproduce bugs against real network and console behaviour before fixing them, instead of guessing the cause.',
            fr: "Couverture de tests à 90 % avec Jest et Playwright. Je reproduis les bogues avec le comportement réel du réseau et de la console avant de les corriger, au lieu de deviner la cause.",
            es: '90% de cobertura de pruebas con Jest y Playwright. Reproduzco los bugs con el comportamiento real de la red y la consola antes de corregirlos, en lugar de adivinar la causa.',
          },
          {
            en: 'I own production deployments through Jenkins CI/CD and work closely with backend engineers, architects, product and QA.',
            fr: "Je suis responsable des déploiements en production via Jenkins CI/CD et je travaille de près avec le back-end, les architectes, le produit et l'assurance qualité.",
            es: 'Soy responsable de los despliegues a producción con Jenkins CI/CD y trabajo de cerca con backend, arquitectos, producto y QA.',
          },
        ],
      },
    ],
    outcome: {
      en: 'The team grew to 11 developers on this codebase, and I was named Employee of the Quarter for on-time delivery.',
      fr: "L'équipe a grandi jusqu'à 11 développeurs sur ce code, et j'ai été nommé Employé du trimestre pour le respect des délais.",
      es: 'El equipo llegó a 11 desarrolladores sobre este código, y me nombraron Empleado del trimestre por entregar a tiempo.',
    },
    role: { en: 'Front-End Tech Lead', fr: 'Responsable technique front-end', es: 'Líder técnico front-end' },
    period: { en: '2022 to present', fr: "2022 à aujourd'hui", es: '2022 a hoy' },
    team: { en: 'Up to 11 developers, currently 3', fr: "Jusqu'à 11 développeurs, 3 actuellement", es: 'Hasta 11 desarrolladores, hoy 3' },
    stack: 'Angular 20, NgRx, Signals, Nx, Angular Material, Tailwind CSS, Jest, Playwright, Jenkins, AWS',
  },
  {
    id: 'ai-workflows',
    name: { en: 'AI-assisted engineering', fr: "Ingénierie assistée par l'IA", es: 'Ingeniería asistida por IA' },
    company: 'Asigra',
    summary: {
      en: 'A repeatable way for a production team to work with AI assistants, with a person approving every step that matters.',
      fr: "Une façon reproductible pour une équipe en production de travailler avec des assistants d'IA, avec une personne qui approuve chaque étape importante.",
      es: 'Una forma repetible de que un equipo en producción trabaje con asistentes de IA, con una persona aprobando cada paso importante.',
    },
    context: {
      en: 'Using an AI assistant is easy. Making it reliable inside a team with code review, QA and a release process is the hard part. At Asigra I designed how we use these tools, not just which ones we use.',
      fr: "Utiliser un assistant d'IA est facile. Le rendre fiable dans une équipe avec des revues de code, de l'assurance qualité et un processus de mise en production, c'est là que c'est difficile. Chez Asigra, j'ai conçu notre façon d'utiliser ces outils, pas seulement le choix des outils.",
      es: 'Usar un asistente de IA es fácil. Lo difícil es que sea confiable dentro de un equipo con revisión de código, QA y un proceso de releases. En Asigra diseñé cómo usamos estas herramientas, no solo cuáles usamos.',
    },
    sections: [
      {
        title: { en: 'Skills built for real team workflows', fr: "Des compétences conçues pour les vrais flux de l'équipe", es: 'Skills hechas para los flujos reales del equipo' },
        items: [
          {
            en: 'Migration skills that run the NgRx to signal store and component refactors in gated phases (analysis, implementation, tests, validation) instead of one unsupervised pass.',
            fr: "Des compétences de migration qui exécutent la transition de NgRx vers les signal stores et la refonte des composants par phases contrôlées (analyse, implémentation, tests, validation), plutôt qu'en une seule passe sans supervision.",
            es: 'Skills de migración que ejecutan el paso de NgRx a signal stores y la refactorización de componentes en fases con control (análisis, implementación, pruebas, validación) en lugar de una sola pasada sin supervisión.',
          },
          {
            en: "QA criteria drafted from the branch's actual code diff, not from a template, and published only after a person approves them.",
            fr: "Des critères d'assurance qualité rédigés à partir du diff réel de la branche, pas d'un gabarit, et publiés seulement après l'approbation d'une personne.",
            es: 'Criterios de QA redactados a partir del diff real de la rama, no de una plantilla, y publicados solo después de que una persona los aprueba.',
          },
          {
            en: 'A code-review checklist compiled from real reviewer comments, SonarQube and axe-core audits, so the same review comments stop coming back.',
            fr: "Une liste de vérification pour les revues de code, construite à partir de vrais commentaires de réviseurs et d'audits SonarQube et axe-core, pour que les mêmes remarques ne reviennent plus.",
            es: 'Un checklist de code review armado con comentarios reales de revisores y auditorías de SonarQube y axe-core, para que los mismos comentarios dejen de repetirse.',
          },
          {
            en: 'Dev-testing automation (test runs, evidence capture, structured reports) with human sign-off before anything is shared outside the team.',
            fr: "Automatisation des tests de développement (exécution, preuves, rapports structurés) avec validation humaine avant tout partage hors de l'équipe.",
            es: 'Automatización de pruebas de desarrollo (ejecución, captura de evidencia, reportes estructurados) con aprobación humana antes de compartir nada fuera del equipo.',
          },
        ],
      },
      {
        title: { en: 'Context and integrations', fr: 'Contexte et intégrations', es: 'Contexto e integraciones' },
        items: [
          {
            en: 'A memory structure (user context, team feedback and preferences, project state, references) so the assistant keeps business context and team agreements between sessions.',
            fr: "Une structure de mémoire (contexte de l'utilisateur, rétroaction et préférences de l'équipe, état du projet, références) pour que l'assistant garde le contexte d'affaires et les ententes de l'équipe d'une session à l'autre.",
            es: 'Una estructura de memoria (contexto del usuario, feedback y preferencias del equipo, estado del proyecto, referencias) para que el asistente conserve el contexto del negocio y los acuerdos del equipo entre sesiones.',
          },
          {
            en: 'Connected the assistant to Jira and Bitbucket through MCP and browser automation for tickets and pull request reviews, without credentials in code.',
            fr: "Connexion de l'assistant à Jira et Bitbucket par MCP et automatisation du navigateur pour les tickets et les revues de pull requests, sans identifiants dans le code.",
            es: 'Conecté el asistente a Jira y Bitbucket con MCP y automatización del navegador para tickets y revisión de pull requests, sin credenciales en el código.',
          },
        ],
      },
      {
        title: { en: 'Guardrails', fr: 'Garde-fous', es: 'Límites' },
        items: [
          {
            en: 'Clear rules for what the assistant may do on its own and what always needs a person: commits, pushes, pull request comments and ticket creation.',
            fr: "Des règles claires sur ce que l'assistant peut faire seul et ce qui exige toujours une personne : commits, pushes, commentaires de pull requests et création de tickets.",
            es: 'Reglas claras sobre qué puede hacer el asistente por su cuenta y qué siempre requiere a una persona: commits, pushes, comentarios en pull requests y creación de tickets.',
          },
        ],
      },
    ],
    outcome: {
      en: 'Many features that used to take weeks now ship in days, and code review, QA and releases keep their human checkpoints.',
      fr: "Plusieurs fonctionnalités qui prenaient des semaines sont maintenant livrées en quelques jours, et les revues de code, l'assurance qualité et les mises en production gardent leurs points de contrôle humains.",
      es: 'Muchas funcionalidades que tomaban semanas ahora salen en días, y el code review, QA y los releases mantienen sus puntos de control humanos.',
    },
    role: { en: 'Front-End Tech Lead', fr: 'Responsable technique front-end', es: 'Líder técnico front-end' },
    period: { en: 'Ongoing', fr: 'En cours', es: 'En curso' },
    stack: 'Claude Code, GitHub Copilot, MCP, Jira, Bitbucket, SonarQube, axe-core',
  },
  {
    id: 'wesura',
    name: same('Wesura'),
    company: 'SURA',
    summary: {
      en: 'Leading the front-end team of a customer-facing insurance platform with 5,000+ users.',
      fr: "Direction de l'équipe front-end d'une plateforme d'assurance destinée aux clients, avec plus de 5 000 utilisateurs.",
      es: 'Liderazgo del equipo front-end de una plataforma de seguros para clientes con más de 5.000 usuarios.',
    },
    context: {
      en: "Wesura is a customer-facing insurance platform from SURA, one of Latin America's largest financial groups. I joined as a senior front-end developer and took on the front-end team lead role.",
      fr: "Wesura est une plateforme d'assurance destinée aux clients de SURA, l'un des plus grands groupes financiers d'Amérique latine. Je suis arrivé comme développeur front-end senior et j'ai pris la direction de l'équipe front-end.",
      es: 'Wesura es una plataforma de seguros para clientes de SURA, uno de los grupos financieros más grandes de América Latina. Entré como desarrollador front-end senior y asumí el liderazgo del equipo front-end.',
    },
    sections: [
      {
        title: T.did,
        items: [
      {
        en: 'Led the front-end team while building features myself in Angular and TypeScript.',
        fr: "Direction de l'équipe front-end tout en développant moi-même des fonctionnalités en Angular et TypeScript.",
        es: 'Lideré el equipo front-end mientras desarrollaba funcionalidades en Angular y TypeScript.',
      },
      {
        en: 'Worked on the parts of the product that customers use directly, where clarity and reliability matter most.',
        fr: 'Travail sur les parties du produit utilisées directement par les clients, là où la clarté et la fiabilité comptent le plus.',
        es: 'Trabajé en las partes del producto que usan directamente los clientes, donde la claridad y la confiabilidad importan más.',
      },
        ],
      },
    ],
    outcome: {
      en: 'The platform served more than 5,000 users.',
      fr: 'La plateforme a servi plus de 5 000 utilisateurs.',
      es: 'La plataforma atendió a más de 5.000 usuarios.',
    },
    role: {
      en: 'Senior Front-End Developer, then Front-End Team Lead',
      fr: "Développeur front-end senior, puis chef d'équipe front-end",
      es: 'Desarrollador front-end senior, luego líder del equipo front-end',
    },
    period: { en: '2019 to 2021', fr: '2019 à 2021', es: '2019 a 2021' },
    stack: 'Angular, TypeScript, REST APIs',
  },
  {
    id: 'banking',
    name: { en: 'Banking apps', fr: 'Applications bancaires', es: 'Apps bancarias' },
    company: 'Pragma',
    summary: {
      en: 'Web and hybrid mobile banking apps for Itaú, Bancolombia and BCR in high-security environments.',
      fr: 'Applications bancaires web et mobiles hybrides pour Itaú, Bancolombia et BCR, dans des environnements à haute sécurité.',
      es: 'Apps bancarias web y móviles híbridas para Itaú, Bancolombia y BCR en entornos de alta seguridad.',
    },
    context: {
      en: 'At Pragma I worked for several clients, mainly banks: Itaú, Bancolombia and BCR, along with Genfar and Universidad de Antioquia. Banking work means strict security rules and careful handling of financial data.',
      fr: "Chez Pragma, j'ai travaillé pour plusieurs clients, surtout des banques : Itaú, Bancolombia et BCR, ainsi que Genfar et l'Universidad de Antioquia. Le travail bancaire implique des règles de sécurité strictes et une gestion rigoureuse des données financières.",
      es: 'En Pragma trabajé para varios clientes, sobre todo bancos: Itaú, Bancolombia y BCR, además de Genfar y la Universidad de Antioquia. Trabajar con bancos implica reglas de seguridad estrictas y un manejo cuidadoso de los datos financieros.',
    },
    sections: [
      {
        title: T.did,
        items: [
      {
        en: 'Built banking web apps in AngularJS and later Angular, and hybrid iOS and Android apps with Ionic.',
        fr: "Développement d'applications bancaires web en AngularJS puis en Angular, et d'applications hybrides iOS et Android avec Ionic.",
        es: 'Construí apps bancarias web en AngularJS y luego en Angular, y apps híbridas iOS y Android con Ionic.',
      },
      {
        en: 'Shipped multiple production releases in Scrum teams with continuous integration through Jenkins.',
        fr: "Plusieurs mises en production au sein d'équipes Scrum, avec intégration continue via Jenkins.",
        es: 'Entregué varios lanzamientos a producción en equipos Scrum con integración continua en Jenkins.',
      },
        ],
      },
    ],
    outcome: {
      en: 'Three and a half years of releases for some of the largest banks in the region, and the security habits I still bring to every project.',
      fr: "Trois ans et demi de mises en production pour certaines des plus grandes banques de la région, et des habitudes de sécurité que j'apporte encore à chaque projet.",
      es: 'Tres años y medio de lanzamientos para algunos de los bancos más grandes de la región, y hábitos de seguridad que sigo aplicando en cada proyecto.',
    },
    role: { en: 'Front-End Developer', fr: 'Développeur front-end', es: 'Desarrollador front-end' },
    period: { en: '2016 to 2019', fr: '2016 à 2019', es: '2016 a 2019' },
    stack: 'AngularJS, Angular, Ionic, TypeScript, Jenkins',
  },
];

/* ----------------------------------------------------------------
   Experience (a real sequence, newest first)
   ---------------------------------------------------------------- */
export interface Job {
  years: string;
  company: string;
  role: Text;
  note: Text;
}

export const JOBS: Job[] = [
  {
    years: '2022–now',
    company: 'Asigra',
    role: { en: 'Front-End Tech Lead', fr: 'Responsable technique front-end', es: 'Líder técnico front-end' },
    note: {
      en: 'Toronto. Promoted from Senior Developer in the first week. Working from Canada full-time since December 2024.',
      fr: 'Toronto. Promu de développeur senior dès la première semaine. En poste à temps plein depuis le Canada depuis décembre 2024.',
      es: 'Toronto. Ascendido de desarrollador senior en la primera semana. Trabajando desde Canadá a tiempo completo desde diciembre de 2024.',
    },
  },
  {
    years: '2021–2022',
    company: 'Gorilla Logic',
    role: { en: 'Senior Front-End Developer', fr: 'Développeur front-end senior', es: 'Desarrollador front-end senior' },
    note: {
      en: 'New Angular applications for Western Asset, a global fixed-income investment firm. Recognized by the client for performance.',
      fr: 'Nouvelles applications Angular pour Western Asset, société mondiale de placements à revenu fixe. Saluées par le client pour leur performance.',
      es: 'Nuevas aplicaciones Angular para Western Asset, firma global de inversiones de renta fija. Reconocidas por el cliente por su desempeño.',
    },
  },
  {
    years: '2021',
    company: 'Making Sense',
    role: { en: 'Senior Front-End Developer', fr: 'Développeur front-end senior', es: 'Desarrollador front-end senior' },
    note: {
      en: "Production features in Angular and NgRx for AHP, a U.S. client's web platform.",
      fr: "Fonctionnalités en production avec Angular et NgRx pour AHP, la plateforme web d'un client américain.",
      es: 'Funcionalidades en producción con Angular y NgRx para AHP, la plataforma web de un cliente estadounidense.',
    },
  },
  {
    years: '2019–2021',
    company: 'SURA',
    role: { en: 'Senior Front-End Developer and Team Lead', fr: "Développeur front-end senior et chef d'équipe", es: 'Desarrollador front-end senior y líder de equipo' },
    note: { en: 'Wesura insurance platform.', fr: "Plateforme d'assurance Wesura.", es: 'Plataforma de seguros Wesura.' },
  },
  {
    years: '2016–2019',
    company: 'Pragma',
    role: { en: 'Front-End Developer', fr: 'Développeur front-end', es: 'Desarrollador front-end' },
    note: {
      en: 'Banking web and mobile apps for Itaú, Bancolombia and BCR.',
      fr: 'Applications bancaires web et mobiles pour Itaú, Bancolombia et BCR.',
      es: 'Apps bancarias web y móviles para Itaú, Bancolombia y BCR.',
    },
  },
];

export interface SkillGroup { title: Text; items: string }

export const SKILLS: SkillGroup[] = [
  { title: same('Angular'), items: 'AngularJS through Angular 20, standalone components, Signals and signal stores, NgRx, RxJS, Nx, Angular Material, TypeScript' },
  { title: { en: 'Styling', fr: 'Styles', es: 'Estilos' }, items: 'Tailwind CSS, SCSS, atomic design, accessible UI' },
  { title: { en: 'Mobile', fr: 'Mobile', es: 'Móvil' }, items: 'Ionic, Capacitor, Cordova, hybrid iOS and Android apps' },
  { title: { en: 'APIs and cloud', fr: 'API et infonuagique', es: 'APIs y nube' }, items: 'REST, OpenAPI, AWS Lambda and serverless APIs, Node.js, Express, MySQL' },
  { title: { en: 'Security', fr: 'Sécurité', es: 'Seguridad' }, items: 'OWASP, OAuth and JWT, MFA flows, secure coding, payment gateways, financial data' },
  { title: { en: 'Quality', fr: 'Qualité', es: 'Calidad' }, items: 'Jest, Jasmine, Karma, Playwright, Cypress, SonarQube, axe-core, Jenkins CI/CD' },
  { title: { en: 'Leadership', fr: 'Leadership', es: 'Liderazgo' }, items: 'Code reviews, mentoring, technical hiring, Agile and Scrum' },
  { title: { en: 'AI tools', fr: "Outils d'IA", es: 'Herramientas de IA' }, items: 'Claude Code, GitHub Copilot, custom agent skills, MCP integrations, human-in-the-loop workflows' },
];

export const CERTS = [
  { name: 'Claude Code in Action', issuer: 'Anthropic', year: '2026' },
  { name: 'Google AI Professional Certificate', issuer: 'Google', year: '2026' },
];

export const EDUCATION = {
  degree: { en: 'Bachelor of Systems Engineering', fr: 'Baccalauréat en génie des systèmes', es: 'Ingeniería de Sistemas' } as Text,
  school: 'María Cano University, Colombia, 2014',
  wes: {
    en: "Evaluated by WES as equivalent to a Canadian bachelor's degree.",
    fr: "Équivalence d'un baccalauréat canadien reconnue par WES.",
    es: 'Evaluado por WES como equivalente a un título universitario canadiense.',
  } as Text,
};

export const LANGUAGES: Text = {
  en: 'English (professional), Spanish (native)',
  fr: 'Anglais (professionnel), espagnol (langue maternelle)',
  es: 'Inglés (profesional), español (nativo)',
};
