import { ASSETS } from '../assets';

export interface CreatorProfile {
  name: string;
  nickname: string;
  birthday: string;
  ageText: string;
  course: string;
  bio: string;
  tags: string[];
  email: string;
  socials: {
    handle: string;
    platform: string;
  }[];
}

export interface CreatorHobby {
  id: string;
  owner: 'chiyo' | 'requiha';
  category: string;
  title: string;
  text: string;
  tags: string[];
  image: string;
  colorClass: 'purple' | 'amber';
  hasSpecialButton?: boolean;
  buttonText?: string;
}

export interface PortfolioData {
  ownerA: CreatorProfile;
  ownerB: CreatorProfile;
  section: string;
  currentYear: string;
  theme: 'lavender-amber' | 'coral-slate' | 'rose-teal' | 'midnight-neon' | 'emerald-gold';
  hobbies: CreatorHobby[];
}

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  ownerA: {
    name: "Aneela Emina Dimalomping",
    nickname: "Chiyo",
    birthday: "Jan 20, 2006",
    ageText: "20 Years Old",
    course: "CBAA at MSU",
    bio: "A cheerful and talkative student of CBAA at MSU. Chiyo finds beauty in the small moments and deeply values creating authentic, long-lasting connections with everyone she meets.",
    tags: ["CREATIVE", "TALKATIVE", "CBAA STUDENT"],
    email: "aneela.d@school.edu",
    socials: [
      { handle: "@chiyo_creatives", platform: "Behance" },
      { handle: "aneela.d@school.edu", platform: "Email" }
    ]
  },
  ownerB: {
    name: "Requiha Yana Qais Derogongan Tanggote",
    nickname: "Requiha",
    birthday: "Dec 3, 2002",
    ageText: "23 Years Old",
    course: "Public Speaker & CS Student",
    bio: "A hardworking student leader and seasoned Public Speaker/Emcee. Requiha thrives on the philosophy of balancing rigorous academics, proactive leadership, and continuous self-development.",
    tags: ["LEADER", "SPEAKER", "HARDWORKING"],
    email: "requiha.t@school.edu",
    socials: [
      { handle: "@requiha_qais", platform: "LinkedIn" },
      { handle: "requiha.t@school.edu", platform: "Email" }
    ]
  },
  section: "CS-301",
  currentYear: "2024",
  theme: "lavender-amber",
  hobbies: [
    {
      id: "hobby-literature",
      owner: "chiyo",
      category: "LITERATURE & READING",
      title: "Literature & Reading",
      text: "A sanctuary of imagination where words construct entire universes. For Chiyo, reading is not just consumption but a dialogue with the author's psyche, favoring magical realism and deep philosophical narratives.",
      tags: ["FICTION", "WORLD-BUILDING"],
      image: ASSETS.openBook,
      colorClass: "purple"
    },
    {
      id: "hobby-athletic",
      owner: "requiha",
      category: "ATHLETIC PRECISION",
      title: "Athletic Precision",
      text: "As a team captain in Pickleball and an avid Volleyball player, Requiha thrives in the heat of competition. Athletics is the playground for strategy, physical endurance, and the synergy of team dynamics.",
      tags: ["TEAM CAPTAIN", "STRATEGY"],
      image: ASSETS.sportsCourt,
      colorClass: "amber",
      hasSpecialButton: true,
      buttonText: "View Tournament Stats"
    },
    {
      id: "hobby-gaming",
      owner: "chiyo",
      category: "MSUONE CUP GAMING",
      title: "MSUone Cup Gaming",
      text: "Gaming is more than play; it's a competitive arena. A participant in the MSUone Cup tournament, Chiyo balances mechanical skill with tactical foresight in high-stakes digital environments.",
      tags: ["COMPETITIVE", "MSUONE CUP"],
      image: ASSETS.gamingTeam,
      colorClass: "purple"
    },
    {
      id: "hobby-painting",
      owner: "requiha",
      category: "FINE ARTS & PAINTING",
      title: "Fine Arts & Painting",
      text: "Painting serves as a creative escape for Requiha. Away from the roar of the stadium or the pressure of leadership, the canvas offers a silent space for emotional expression and aesthetic exploration.",
      tags: ["ABSTRACT", "ACRYLICS"],
      image: ASSETS.artPainting,
      colorClass: "amber"
    },
    {
      id: "hobby-kpop",
      owner: "chiyo",
      category: "K-POP CULTURE",
      title: "K-Pop Culture",
      text: "An avid album collector and fan of the global K-Pop phenomenon, Chiyo appreciates the multi-sensory storytelling, intricate choreography, and high-fidelity production value that defines the genre.",
      tags: ["COLLECTOR", "STORYTELLING"],
      image: ASSETS.kpopCollection,
      colorClass: "purple"
    },
    {
      id: "hobby-event",
      owner: "requiha",
      category: "EVENT ORGANIZING & LEADERSHIP",
      title: "Event Organizing & Leadership",
      text: "As a student officer, Requiha directs community initiatives and large-scale events. This hobby is where organizational logic meets social impact, fostering leadership skills that transcend the classroom.",
      tags: ["OFFICER", "COMMUNITY"],
      image: ASSETS.studentLeadership,
      colorClass: "amber"
    }
  ]
};

export const THEMES = {
  "lavender-amber": {
    name: "Lavender & Amber (Default)",
    primary: "text-purple-600",
    primaryBg: "bg-purple-50",
    primaryBorder: "border-purple-200/50",
    accent: "text-amber-700Bg",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-200/50",
    gradientA: "from-purple-900/40 via-purple-950/20 to-purple-550/10",
    gradientB: "from-[#422006]/35 via-[#422006]/15 to-[#fbbf24]/5",
    themeClass: "lavender-amber-theme",
  },
  "coral-slate": {
    name: "Coral & Slate Blue",
    primary: "text-coral-600",
    primaryBg: "bg-orange-50",
    primaryBorder: "border-orange-200/50",
    accent: "text-slate-700",
    accentBg: "bg-slate-50",
    accentBorder: "border-slate-200/50",
    gradientA: "from-orange-950/40 via-orange-950/20 to-orange-550/10",
    gradientB: "from-slate-900/40 via-slate-950/20 to-slate-550/10",
    themeClass: "coral-slate-theme",
  },
  "rose-teal": {
    name: "Rose Quartz & Fresh Teal",
    primary: "text-rose-600",
    primaryBg: "bg-rose-55",
    primaryBorder: "border-rose-200/50",
    accent: "text-teal-700",
    accentBg: "bg-teal-50",
    accentBorder: "border-teal-200/50",
    gradientA: "from-rose-950/40 via-rose-950/20 to-rose-550/10",
    gradientB: "from-teal-950/40 via-teal-950/20 to-teal-550/10",
    themeClass: "rose-teal-theme",
  },
  "midnight-neon": {
    name: "Midnight & Electric Green",
    primary: "text-cyan-600",
    primaryBg: "bg-slate-950",
    primaryBorder: "border-cyan-500/20",
    accent: "text-emerald-500",
    accentBg: "bg-[#091a14]",
    accentBorder: "border-emerald-500/20",
    gradientA: "from-cyan-950/60 via-slate-950 to-slate-950",
    gradientB: "from-emerald-950/60 via-slate-950 to-slate-950",
    themeClass: "midnight-neon-theme",
  },
  "emerald-gold": {
    name: "Emerald Grace & Gold Crown",
    primary: "text-emerald-700",
    primaryBg: "bg-emerald-50",
    primaryBorder: "border-emerald-200/50",
    accent: "text-amber-700",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-200/50",
    gradientA: "from-emerald-950/40 via-emerald-950/20 to-emerald-550/10",
    gradientB: "from-amber-950/40 via-amber-950/20 to-amber-550/10",
    themeClass: "emerald-gold-theme",
  }
};
