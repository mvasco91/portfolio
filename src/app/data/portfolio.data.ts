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

export interface Profile {
  name: string;
  shortName: string;
  role: Text;
  location: Text;
  email: string;
  linkedin: string;
  /** Leave empty to hide the GitHub link. */
  github: string;
  /** Path inside /public (e.g. 'resume-en.pdf'). Leave empty to hide the button. */
  resume: Text;
}

export interface Metric { value: Text; label: Text; wide?: boolean }

export interface Job {
  id: string;
  company: string;
  role: Text;
  client?: Text;
  period: Text;
  place: Text;
  bullets: Text[];
  stack: string[];
}

export interface Project {
  name: Text;
  company: string;
  kind: Text;
  summary: Text;
  highlights: Text[];
  stack: string[];
  featured?: boolean;
}

export interface SkillGroup { title: Text; items: string[] }

export const PROFILE: Profile = {
  name: 'Mauricio Vasco Vélez',
  shortName: 'Mauricio Vasco',
  role: {
    en: 'Senior Front-End Developer & Tech Lead',
    fr: 'Développeur front-end senior et responsable technique',
    es: 'Desarrollador front-end senior y líder técnico',
  },
  location: { en: 'Toronto, Ontario, Canada', fr: 'Toronto (Ontario), Canada', es: 'Toronto, Ontario, Canadá' },
  email: 'maurovasco91@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mauricio-vasco-velez',
  github: 'https://github.com/mvasco91',
  resume: same('Mauricio-Vasco-Resume.pdf'),
};

export const UI = {
  nav: {
    about: { en: 'About', fr: 'Profil', es: 'Perfil' },
    experience: { en: 'Experience', fr: 'Expérience', es: 'Experiencia' },
    work: { en: 'Work', fr: 'Projets', es: 'Proyectos' },
    skills: { en: 'Skills', fr: 'Compétences', es: 'Habilidades' },
    contact: { en: 'Contact', fr: 'Contact', es: 'Contacto' },
  },
  hero: {
    eyebrow: { en: "Hi, I'm", fr: 'Bonjour, je suis', es: 'Hola, soy' },
    headline: {
      en: 'I lead front-end teams and still write code every day.',
      fr: 'Je dirige des équipes front-end et je code encore tous les jours.',
      es: 'Lidero equipos front-end y sigo programando todos los días.',
    },
    intro: {
      en: "Senior front-end developer with 10 years building Angular apps for banking, insurance and enterprise SaaS. Since 2022 I've led the front-end team at Asigra without stepping away from the code: I set up the architecture of SaaS Assure from the first commit, and I still build features, review pull requests and fix bugs alongside the team.",
      fr: "Développeur front-end senior avec 10 ans d'expérience en applications Angular pour la banque, l'assurance et le SaaS d'entreprise. Depuis 2022, je dirige l'équipe front-end chez Asigra sans m'éloigner du code : j'ai mis en place l'architecture de SaaS Assure dès le premier commit, et je développe encore des fonctionnalités, révise les pull requests et corrige des bogues avec l'équipe.",
      es: 'Desarrollador front-end senior con 10 años construyendo aplicaciones Angular para banca, seguros y SaaS empresarial. Desde 2022 lidero el equipo front-end en Asigra sin alejarme del código: armé la arquitectura de SaaS Assure desde el primer commit y sigo desarrollando funcionalidades, revisando pull requests y corrigiendo bugs con el equipo.',
    },
    ctaWork: { en: 'See my work', fr: 'Voir mes projets', es: 'Ver mis proyectos' },
    ctaContact: { en: 'Get in touch', fr: 'Me contacter', es: 'Contáctame' },
    resume: { en: 'Resume (PDF)', fr: 'CV (PDF, anglais)', es: 'Hoja de vida (PDF, inglés)' },
    available: {
      en: 'Available for Front-End Lead / Senior Front-End Developer roles',
      fr: 'Disponible pour des postes de responsable front-end / développeur front-end senior',
      es: 'Disponible para roles de líder front-end / desarrollador front-end senior',
    },
  },
  about: {
    title: { en: 'About', fr: 'Profil', es: 'Perfil' },
    body: {
      en: "I joined Asigra as a Senior Front-End Developer and a week later I was leading the front-end team. The team grew to 11 developers, and along the way I defined the architecture and coding standards for SaaS Assure. Leading never meant leaving the code: I still pick up tickets and ship features with the team. We now use AI tools like Claude Code and Copilot in our day-to-day work, and many features that used to take weeks ship in days. Before Asigra, I spent several years in Colombia building banking and insurance apps for Bancolombia, Itaú and SURA.",
      fr: "Je suis arrivé chez Asigra comme développeur front-end senior et, une semaine plus tard, je dirigeais l'équipe front-end. L'équipe a grandi jusqu'à 11 développeurs et j'ai défini l'architecture et les normes de code de SaaS Assure. Diriger ne m'a jamais éloigné du code : je prends encore des tickets et je livre des fonctionnalités avec l'équipe. Nous utilisons maintenant des outils d'IA comme Claude Code et Copilot au quotidien, et plusieurs fonctionnalités qui prenaient des semaines sont livrées en quelques jours. Avant Asigra, j'ai passé plusieurs années en Colombie à développer des applications bancaires et d'assurance pour Bancolombia, Itaú et SURA.",
      es: 'Entré a Asigra como desarrollador front-end senior y a la semana ya estaba liderando el equipo front-end. El equipo llegó a 11 desarrolladores y en el camino definí la arquitectura y los estándares de código de SaaS Assure. Liderar nunca significó dejar el código: sigo tomando tickets y entregando funcionalidades con el equipo. Hoy usamos herramientas de IA como Claude Code y Copilot en el día a día, y muchas funcionalidades que tomaban semanas ahora salen en días. Antes de Asigra trabajé varios años en Colombia haciendo apps bancarias y de seguros para Bancolombia, Itaú y SURA.',
    },
    focusTitle: { en: 'How I work', fr: 'Ma façon de travailler', es: 'Cómo trabajo' },
    focus: [
      { en: 'Staying hands-on: I write code, not just review it', fr: "Rester dans le code : je développe, je ne fais pas que réviser", es: 'Seguir programando: escribo código, no solo lo reviso' },
      { en: 'Architecture the whole team can work in', fr: "Une architecture où toute l'équipe peut travailler", es: 'Arquitectura en la que todo el equipo pueda trabajar' },
      { en: 'Security first, especially with financial data', fr: "La sécurité d'abord, surtout avec des données financières", es: 'Seguridad primero, sobre todo con datos financieros' },
      { en: 'Code reviews that actually teach something', fr: 'Des revues de code qui font progresser', es: 'Revisiones de código que enseñen algo' },
      { en: 'Using AI to move faster without cutting corners', fr: "Utiliser l'IA pour aller plus vite, sans négliger la qualité", es: 'Usar IA para ir más rápido sin descuidar la calidad' },
    ] as Text[],
    award: { en: 'Employee of the Quarter · Asigra', fr: 'Employé du trimestre · Asigra', es: 'Empleado del trimestre · Asigra' },
  },
  experience: {
    title: { en: 'Experience', fr: 'Expérience', es: 'Experiencia' },
  },
  work: {
    title: { en: 'Projects', fr: 'Projets', es: 'Proyectos' },
    note: {
      en: 'These are client and employer products, so I describe them instead of showing screenshots.',
      fr: "Ce sont des produits de clients et d'employeurs, alors je les décris au lieu de montrer des captures d'écran.",
      es: 'Son productos de clientes y empleadores, por eso los describo en lugar de mostrar capturas.',
    },
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
      en: "I'm open to Senior Front-End or Angular Developer roles as well as Tech Lead positions in Canada. I'm happy writing code full-time or leading a team while staying hands-on. Remote or hybrid in the GTA both work, and I'm open to relocating.",
      fr: "Je suis ouvert aux postes de développeur front-end ou Angular senior, ainsi qu'aux postes de responsable technique au Canada. Je peux coder à temps plein ou diriger une équipe tout en restant dans le code. À distance ou en mode hybride dans la région de Toronto, et je suis ouvert à déménager.",
      es: 'Estoy abierto a roles de desarrollador front-end o Angular senior y también a posiciones de líder técnico en Canadá. Me siento cómodo programando a tiempo completo o liderando un equipo sin dejar de programar. Remoto o híbrido en el área de Toronto, y estoy abierto a mudarme.',
    },
    email: { en: 'Email me', fr: 'Écrivez-moi', es: 'Escríbeme' },
    copy: { en: 'Copy email', fr: 'Copier le courriel', es: 'Copiar correo' },
    copied: { en: 'Copied!', fr: 'Copié !', es: '¡Copiado!' },
    resume: { en: 'Download resume (PDF)', fr: 'Télécharger mon CV (PDF, anglais)', es: 'Descargar hoja de vida (PDF, inglés)' },
  },
  footer: {
    built: {
      en: 'Built with Angular and SCSS. Hosted on GitHub Pages.',
      fr: 'Fait avec Angular et SCSS. Hébergé sur GitHub Pages.',
      es: 'Hecho con Angular y SCSS. Publicado en GitHub Pages.',
    },
  },
  langNames: {
    en: same('English'),
    fr: same('Français'),
    es: same('Español'),
  },
  langPicker: { en: 'Language', fr: 'Langue', es: 'Idioma' },
  a11y: {
    open: { en: 'Accessibility & display', fr: 'Accessibilité et affichage', es: 'Accesibilidad y visualización' },
    title: { en: 'Display', fr: 'Affichage', es: 'Visualización' },
    theme: { en: 'Colour theme', fr: 'Thème de couleurs', es: 'Tema de color' },
    dark: { en: 'Dark', fr: 'Sombre', es: 'Oscuro' },
    light: { en: 'Light', fr: 'Clair', es: 'Claro' },
    contrast: { en: 'High contrast', fr: 'Contraste élevé', es: 'Alto contraste' },
    motion: { en: 'Reduce motion', fr: 'Réduire les animations', es: 'Reducir animaciones' },
    close: { en: 'Close', fr: 'Fermer', es: 'Cerrar' },
  },
};

export const METRICS: Metric[] = [
  { value: same('10'), label: { en: 'years building web & mobile apps', fr: 'ans à développer des applications web et mobiles', es: 'años construyendo apps web y móviles' } },
  { value: same('11'), label: { en: 'developers led at peak', fr: 'développeurs dirigés au plus fort', es: 'desarrolladores liderados en el pico' } },
  { value: { en: '90%', fr: '90 %', es: '90%' }, label: { en: 'test coverage on SaaS Assure', fr: 'de couverture de tests sur SaaS Assure', es: 'de cobertura de pruebas en SaaS Assure' } },
  { value: { en: '5,000+', fr: '5 000+', es: '5.000+' }, label: { en: 'users on Wesura (SURA)', fr: 'utilisateurs sur Wesura (SURA)', es: 'usuarios en Wesura (SURA)' } },
  {
    value: { en: 'weeks → days', fr: 'semaines → jours', es: 'semanas → días' },
    label: {
      en: 'delivery time with AI-assisted workflows',
      fr: "délai de livraison grâce aux flux assistés par l'IA",
      es: 'tiempo de entrega con flujos asistidos por IA',
    },
    wide: true,
  },
];

const REMOTE: Text = { en: 'Remote', fr: 'À distance', es: 'Remoto' };
const MEDELLIN: Text = { en: 'Medellín, Colombia', fr: 'Medellín, Colombie', es: 'Medellín, Colombia' };
const SENIOR_FE: Text = { en: 'Senior Front-End Developer', fr: 'Développeur front-end senior', es: 'Desarrollador front-end senior' };

export const JOBS: Job[] = [
  {
    id: 'asigra',
    company: 'Asigra',
    role: { en: 'Front-End Tech Lead', fr: 'Responsable technique front-end', es: 'Líder técnico front-end' },
    period: { en: 'Jun 2022 – Present', fr: "juin 2022 – aujourd'hui", es: 'jun. 2022 – actualidad' },
    place: { en: 'Toronto, ON', fr: 'Toronto (Ontario)', es: 'Toronto, ON' },
    bullets: [
      {
        en: 'Hired as Senior Front-End Developer and promoted to lead the front-end team within the first week; Employee of the Quarter for on-time delivery and commitment.',
        fr: "Embauché comme développeur front-end senior et promu à la tête de l'équipe front-end dès la première semaine; nommé Employé du trimestre pour le respect des délais et l'engagement.",
        es: 'Contratado como desarrollador front-end senior y ascendido a líder del equipo front-end en la primera semana; Empleado del trimestre por entregas a tiempo y compromiso.',
      },
      {
        en: 'Lead and mentor the front-end team (up to 11 developers, currently 3) while staying hands-on, running code reviews and technical hiring.',
        fr: "Dirige et accompagne l'équipe front-end (jusqu'à 11 développeurs, 3 actuellement) tout en restant impliqué dans le code, les revues de code et le recrutement technique.",
        es: 'Lidero y acompaño al equipo front-end (hasta 11 desarrolladores, hoy 3) sin dejar de programar, haciendo revisiones de código y entrevistas técnicas.',
      },
      {
        en: 'Built the front-end architecture of SaaS Assure, a secure enterprise data-protection platform, from inception with Angular, NgRx, Nx and Signals.',
        fr: "Conception de l'architecture front-end de SaaS Assure, une plateforme SaaS sécurisée de protection des données, dès sa création avec Angular, NgRx, Nx et Signals.",
        es: 'Construí desde cero la arquitectura front-end de SaaS Assure, una plataforma empresarial segura de protección de datos, con Angular, NgRx, Nx y Signals.',
      },
      {
        en: 'Keep 90% test coverage with Jest and Playwright and own production deployments through Jenkins CI/CD.',
        fr: "Maintien d'une couverture de tests de 90 % avec Jest et Playwright et responsabilité des déploiements en production via Jenkins CI/CD.",
        es: 'Mantengo 90% de cobertura de pruebas con Jest y Playwright y soy responsable de los despliegues a producción con Jenkins CI/CD.',
      },
      {
        en: 'Introduced AI-assisted workflows (Claude Code, GitHub Copilot, agents), cutting delivery for many features from weeks to days.',
        fr: "Introduction de flux de travail assistés par l'IA (Claude Code, GitHub Copilot, agents), réduisant le délai de livraison de nombreuses fonctionnalités de plusieurs semaines à quelques jours.",
        es: 'Introduje flujos de trabajo asistidos por IA (Claude Code, GitHub Copilot, agentes), reduciendo la entrega de muchas funcionalidades de semanas a días.',
      },
    ],
    stack: ['Angular', 'NgRx', 'Nx', 'Signals', 'AWS', 'Jest', 'Playwright', 'Jenkins'],
  },
  {
    id: 'gorilla',
    company: 'Gorilla Logic',
    role: SENIOR_FE,
    client: {
      en: 'Client: Western Asset (fixed-income investment management)',
      fr: 'Client : Western Asset (gestion de placements à revenu fixe)',
      es: 'Cliente: Western Asset (gestión de inversiones de renta fija)',
    },
    period: { en: 'Dec 2021 – Jun 2022', fr: 'déc. 2021 – juin 2022', es: 'dic. 2021 – jun. 2022' },
    place: REMOTE,
    bullets: [
      {
        en: 'Built new Angular applications for a global investment management firm.',
        fr: 'Développement de nouvelles applications Angular pour une société mondiale de gestion de placements.',
        es: 'Construí nuevas aplicaciones Angular para una firma global de gestión de inversiones.',
      },
      {
        en: 'Delivered multiple successful production releases and earned client recognition for performance.',
        fr: 'Plusieurs mises en production réussies, saluées par le client pour leur performance.',
        es: 'Entregué varios lanzamientos exitosos a producción, con reconocimiento del cliente por el desempeño.',
      },
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'SCSS'],
  },
  {
    id: 'making-sense',
    company: 'Making Sense',
    role: SENIOR_FE,
    client: { en: 'Client: AHP (U.S.)', fr: 'Client : AHP (États-Unis)', es: 'Cliente: AHP (EE. UU.)' },
    period: { en: 'Jan 2021 – Dec 2021', fr: 'janv. 2021 – déc. 2021', es: 'ene. 2021 – dic. 2021' },
    place: REMOTE,
    bullets: [
      {
        en: "Shipped features to production for a U.S. client's web platform using Angular and NgRx.",
        fr: "Livraison de fonctionnalités en production pour la plateforme web d'un client américain avec Angular et NgRx.",
        es: 'Llevé funcionalidades a producción para la plataforma web de un cliente estadounidense con Angular y NgRx.',
      },
      {
        en: 'Earned positive client feedback for quality and reliability of delivery.',
        fr: 'Rétroaction positive du client sur la qualité et la fiabilité des livraisons.',
        es: 'Recibí comentarios positivos del cliente por la calidad y confiabilidad de las entregas.',
      },
    ],
    stack: ['Angular', 'NgRx', 'RxJS', 'TypeScript'],
  },
  {
    id: 'sura',
    company: 'SURA',
    role: {
      en: 'Senior Front-End Developer / Front-End Team Lead',
      fr: "Développeur front-end senior / chef d'équipe front-end",
      es: 'Desarrollador front-end senior / líder de equipo front-end',
    },
    client: { en: 'Project: Wesura', fr: 'Projet : Wesura', es: 'Proyecto: Wesura' },
    period: { en: 'Dec 2019 – Jan 2021', fr: 'déc. 2019 – janv. 2021', es: 'dic. 2019 – ene. 2021' },
    place: MEDELLIN,
    bullets: [
      {
        en: "Led the front-end team for Wesura, a customer-facing insurance platform of one of Latin America's largest financial groups.",
        fr: "Direction de l'équipe front-end de Wesura, plateforme d'assurance destinée aux clients de l'un des plus grands groupes financiers d'Amérique latine.",
        es: 'Lideré el equipo front-end de Wesura, plataforma de seguros para clientes de uno de los grupos financieros más grandes de América Latina.',
      },
      {
        en: 'Platform served 5,000+ users.',
        fr: 'Plateforme utilisée par plus de 5 000 personnes.',
        es: 'La plataforma atendió a más de 5.000 usuarios.',
      },
    ],
    stack: ['Angular', 'TypeScript', 'SCSS', 'REST APIs'],
  },
  {
    id: 'pragma',
    company: 'Pragma',
    role: { en: 'Front-End Developer', fr: 'Développeur front-end', es: 'Desarrollador front-end' },
    client: {
      en: 'Clients: Itaú, Bancolombia, BCR, Genfar, Universidad de Antioquia',
      fr: 'Clients : Itaú, Bancolombia, BCR, Genfar, Universidad de Antioquia',
      es: 'Clientes: Itaú, Bancolombia, BCR, Genfar, Universidad de Antioquia',
    },
    period: { en: 'Aug 2016 – Dec 2019', fr: 'août 2016 – déc. 2019', es: 'ago. 2016 – dic. 2019' },
    place: MEDELLIN,
    bullets: [
      {
        en: 'Built banking web and mobile applications for major banks (Itaú, Bancolombia, BCR) in high-security environments.',
        fr: "Développement d'applications bancaires web et mobiles pour de grandes banques (Itaú, Bancolombia, BCR) dans des environnements à haute sécurité.",
        es: 'Construí aplicaciones bancarias web y móviles para grandes bancos (Itaú, Bancolombia, BCR) en entornos de alta seguridad.',
      },
      {
        en: 'Delivered multiple production releases in Scrum teams with continuous integration through Jenkins.',
        fr: "Plusieurs mises en production au sein d'équipes Scrum, avec intégration continue via Jenkins.",
        es: 'Entregué varios lanzamientos a producción en equipos Scrum con integración continua en Jenkins.',
      },
    ],
    stack: ['AngularJS', 'Angular', 'Ionic', 'TypeScript', 'Jenkins'],
  },
];

export const PROJECTS: Project[] = [
  {
    name: same('SaaS Assure'),
    company: 'Asigra',
    featured: true,
    kind: {
      en: 'Enterprise SaaS · Data protection',
      fr: "SaaS d'entreprise · Protection des données",
      es: 'SaaS empresarial · Protección de datos',
    },
    summary: {
      en: 'A secure, multi-tenant data-protection platform for enterprises. I designed its front-end architecture from day one and lead the team that builds it.',
      fr: "Une plateforme SaaS sécurisée et multilocataire de protection des données pour les entreprises. J'en ai conçu l'architecture front-end dès le premier jour et je dirige l'équipe qui la développe.",
      es: 'Una plataforma segura y multi-tenant de protección de datos para empresas. Diseñé su arquitectura front-end desde el primer día y lidero el equipo que la construye.',
    },
    highlights: [
      { en: 'Nx monorepo with NgRx + Signals state', fr: 'Monorepo Nx avec état NgRx + Signals', es: 'Monorepo Nx con estado en NgRx + Signals' },
      { en: '90% coverage · Jest + Playwright', fr: 'Couverture de 90 % · Jest + Playwright', es: '90% de cobertura · Jest + Playwright' },
      { en: 'AWS-backed APIs · Jenkins CI/CD', fr: 'API sur AWS · CI/CD Jenkins', es: 'APIs sobre AWS · CI/CD con Jenkins' },
    ],
    stack: ['Angular', 'Nx', 'NgRx', 'Signals', 'AWS'],
  },
  {
    name: same('Wesura'),
    company: 'SURA',
    kind: { en: 'Insurance · Customer platform', fr: 'Assurance · Plateforme client', es: 'Seguros · Plataforma de clientes' },
    summary: {
      en: "Customer-facing insurance platform for one of Latin America's largest financial groups, serving 5,000+ users. I led its front-end team.",
      fr: "Plateforme d'assurance destinée aux clients de l'un des plus grands groupes financiers d'Amérique latine, utilisée par plus de 5 000 personnes. J'en ai dirigé l'équipe front-end.",
      es: 'Plataforma de seguros para clientes de uno de los grupos financieros más grandes de América Latina, con más de 5.000 usuarios. Lideré su equipo front-end.',
    },
    highlights: [
      { en: 'Front-end team leadership', fr: "Direction de l'équipe front-end", es: 'Liderazgo del equipo front-end' },
      { en: '5,000+ users', fr: 'Plus de 5 000 utilisateurs', es: 'Más de 5.000 usuarios' },
    ],
    stack: ['Angular', 'TypeScript'],
  },
  {
    name: { en: 'Banking apps', fr: 'Applications bancaires', es: 'Apps bancarias' },
    company: 'Pragma',
    kind: { en: 'Banking · Web & mobile', fr: 'Banque · Web et mobile', es: 'Banca · Web y móvil' },
    summary: {
      en: 'Web and hybrid mobile banking apps for Itaú, Bancolombia and BCR, built in high-security environments.',
      fr: 'Applications bancaires web et mobiles hybrides pour Itaú, Bancolombia et BCR, développées dans des environnements à haute sécurité.',
      es: 'Aplicaciones bancarias web y móviles híbridas para Itaú, Bancolombia y BCR, construidas en entornos de alta seguridad.',
    },
    highlights: [
      { en: 'Hybrid iOS & Android with Ionic', fr: 'Applications hybrides iOS et Android avec Ionic', es: 'Apps híbridas iOS y Android con Ionic' },
      same('AngularJS → Angular'),
    ],
    stack: ['Angular', 'Ionic', 'Jenkins'],
  },
  {
    name: same('Western Asset'),
    company: 'Gorilla Logic',
    kind: { en: 'Investment management', fr: 'Gestion de placements', es: 'Gestión de inversiones' },
    summary: {
      en: 'New Angular applications for a global fixed-income investment firm, recognized by the client for performance.',
      fr: 'Nouvelles applications Angular pour une société mondiale de placements à revenu fixe, saluées par le client pour leur performance.',
      es: 'Nuevas aplicaciones Angular para una firma global de inversiones de renta fija, reconocidas por el cliente por su desempeño.',
    },
    highlights: [{ en: 'Multiple production releases', fr: 'Plusieurs mises en production', es: 'Varios lanzamientos a producción' }],
    stack: ['Angular', 'RxJS'],
  },
  {
    name: same('AHP'),
    company: 'Making Sense',
    kind: { en: 'U.S. web platform', fr: 'Plateforme web américaine', es: 'Plataforma web en EE. UU.' },
    summary: {
      en: "Production features for a U.S. client's web platform, built with Angular and NgRx.",
      fr: "Fonctionnalités en production pour la plateforme web d'un client américain, avec Angular et NgRx.",
      es: 'Funcionalidades en producción para la plataforma web de un cliente estadounidense, con Angular y NgRx.',
    },
    highlights: [same('Angular + NgRx')],
    stack: ['Angular', 'NgRx'],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    title: { en: 'Angular & front-end', fr: 'Angular et front-end', es: 'Angular y front-end' },
    items: ['Angular (AngularJS → latest)', 'TypeScript', 'Signals', 'NgRx', 'RxJS', 'Nx', 'Angular Material', 'HTML5', 'SCSS'],
  },
  {
    title: { en: 'Mobile', fr: 'Mobile', es: 'Móvil' },
    items: ['Ionic', 'Capacitor', 'Cordova', 'iOS & Android hybrid'],
  },
  {
    title: { en: 'Cloud & APIs', fr: 'Infonuagique et API', es: 'Nube y APIs' },
    items: ['AWS Lambda / serverless', 'REST', 'OpenAPI', 'Node.js', 'Express', 'MySQL'],
  },
  {
    title: { en: 'Security & finance', fr: 'Sécurité et finance', es: 'Seguridad y finanzas' },
    items: ['OWASP', 'OAuth / JWT', 'Secure coding', 'Payment gateways', 'Banking apps'],
  },
  {
    title: { en: 'Quality & delivery', fr: 'Qualité et livraison', es: 'Calidad y entrega' },
    items: ['Jest', 'Jasmine / Karma', 'Playwright', 'Cypress', 'Jenkins CI/CD', 'Git', 'Agile / Scrum'],
  },
  {
    title: { en: 'AI tooling', fr: "Outils d'IA", es: 'Herramientas de IA' },
    items: ['Claude Code', 'GitHub Copilot', 'AI agents'],
  },
];

export const CERTS: { name: string; issuer: string; year: string }[] = [
  { name: 'Claude Code in Action', issuer: 'Anthropic', year: '2026' },
  { name: 'Google AI Professional Certificate', issuer: 'Google', year: '2026' },
];

export const EDUCATION = {
  degree: {
    en: 'Bachelor of Systems Engineering',
    fr: 'Baccalauréat en génie des systèmes',
    es: 'Ingeniería de Sistemas',
  } as Text,
  school: 'María Cano University, Colombia · 2014',
  wes: {
    en: "Evaluated by WES as equivalent to a Canadian bachelor's degree (2026)",
    fr: "Équivalence d'un baccalauréat canadien reconnue par WES (2026)",
    es: 'Evaluado por WES como equivalente a un título universitario canadiense (2026)',
  } as Text,
};

export const LANGUAGES: Text[] = [
  { en: 'English (professional)', fr: 'Anglais (professionnel)', es: 'Inglés (profesional)' },
  { en: 'Spanish (native)', fr: 'Espagnol (langue maternelle)', es: 'Español (nativo)' },
];
