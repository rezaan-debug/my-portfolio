/**
 * Single source of truth for all portfolio content.
 * Everything shown on the site, Zarney's knowledge, and the public MCP
 * server reads from this file — update it here to update everywhere.
 */

export const profile = {
  name: "Rezaan Achmat Fredericks",
  pronouns: "she/her",
  title: "Full-Stack Developer | UI/UX Designer",
  location: "Cape Town, South Africa",
  email: "rezaan91@gmail.com",
  github: "https://github.com/Rezaan91",
  linkedin: "https://linkedin.com/in/rezaan-achmat-59050774/",
  portfolioUrl: "https://rezaan-achmat-portfolio.lovable.app",
  opportunities:
    "Open to junior to mid-level frontend development, full-stack development, UI/UX opportunities, freelance work, and collaboration opportunities.",
};

export const hero = {
  intro: "Hi, I'm Rezaan Achmat — a Full-Stack Developer | UI/UX Designer.",
  lines: [
    "I build scalable, user-focused digital platforms.",
    "Full-stack developer with a design edge, creating responsive web apps, developer tools, and data-driven systems powered by APIs, microservices, and AI.",
    "I turn ideas into intuitive, high-impact digital experiences.",
  ],
};

export const about = {
  summary:
    "My journey into technology began with graphic design, where I developed a strong understanding of visual communication, creativity, and user interaction. This foundation inspired me to explore software development, where I began building web applications using JavaScript and Python, bridging the gap between design and functionality.",
  summary2:
    "Today, I work at the intersection of design and development. I don't just build interfaces; I create thoughtful digital experiences. My focus is on usability, responsive design, clean architecture, and developing solutions that are both visually appealing and technically sound.",
  summary3:
    "I'm continuously expanding my expertise in full-stack development, exploring artificial intelligence, and strengthening my project management skills.",
  summary4:
    "I enjoy tackling new challenges, experimenting with emerging technologies, and transforming creative ideas into innovative digital solutions.",
  summary5:
    "My goal is to keep growing as a developer, embrace new opportunities, and create technology that makes a meaningful difference.",
  story: [
    "I didn't start as a developer — I started as a designer.",
    "My entry into tech came through graphic design, where I learned how people see, feel, and interact with visuals. That foundation shaped how I think: every interface tells a story, and every detail influences the user experience.",
    "But design alone wasn't enough. I wanted to build the ideas I imagined.",
    "So I moved into development, teaching myself how to turn concepts into real, working applications using JavaScript and Python.",
    "What started as curiosity quickly became a focus: creating digital products that don't just look good, but actually solve problems.",
    "Today, I work at the intersection of design and development. I build responsive, user-focused web applications with a strong emphasis on usability, clean structure, and performance.",
    "I think about the full experience — from the first interaction to the smallest detail — because great products aren't just built, they're designed with intention.",
  ],
  vision: [
    "I'm focused on building a future where creativity, technology, and innovation come together to solve real-world challenges.",
    "My journey is driven by a passion for developing scalable digital solutions, creating intuitive user experiences, and exploring the potential of emerging technologies.",
    "From full-stack development and API-driven applications to data-driven systems and AI-powered solutions, I'm continuously expanding my skills and turning ideas into meaningful digital experiences.",
    "My vision is simple: to keep learning, keep building, and create technology that makes a difference.",
  ],
  approach: [
    "Technical development",
    "UI/UX principles",
    "Responsive design",
    "Usability",
    "Clean architecture",
    "Problem solving",
    "Creativity",
    "Emerging technologies",
    "Artificial intelligence",
  ],
  building: [
    { name: "Asset Monitoring Platforms" },
    { name: "Business Enablement Tools" },
    { name: "Fintech & Utility Apps" },
    { name: "Workflow & Developer Tools" },
    { name: "API-Driven Systems & Microservices" },
    { name: "Scalable Platforms with Future AI Integration" },
  ],
  beliefs: [
    "Good design is not decoration — it's how things work.",
    "Clean code is just as important as clean UI.",
    "Technology should simplify, not complicate.",
    "The best products solve real problems.",
  ],
  beliefsClosing:
    "I'm always building, learning, and pushing toward creating technology that makes a real difference.",
};

export const skills = {
  frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Bootstrap"],
  backend: ["Node.js", "Express.js", "MongoDB", "SQL", "REST APIs"],
  tools: ["Git", "GitHub", "Figma", "VS Code", "Postman"],
  other: ["UI/UX Design", "Responsive Design", "Microservices", "AI Integration"],
};

export interface Project {
  name: string;
  description: string;
  technology: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: "TrackSuite – IT Asset Monitoring Platform",
    description:
      "A browser-based IT asset management platform that helps organizations track, manage, and monitor assets through a modern web interface, demonstrating frontend/backend integration, API-driven development, and database-connected functionality.",
    technology: ["React", "TypeScript", "API", "Database", "Asset Management"],
    github: "https://github.com/Rezaan91/UM-Tech-TrackSuite",
    demo: "https://tracksuite-asset-manager.vercel.app/",
    featured: true,
  },
  {
    name: "Golden Arrow Mobile App",
    description:
      "A mobile transit app for Golden Arrow Bus Services with real-time tracking features.",
    technology: ["React", "Node.js", "MongoDB"],
  },
  {
    name: "Sentiment Analysis Dashboard",
    description:
      "An AI-powered dashboard for analyzing text sentiment with data visualization.",
    technology: ["React", "Python", "NLP"],
  },
  {
    name: "Bias Audit Report",
    description:
      "A comprehensive bias audit report analyzing AI model fairness and ethical considerations.",
    technology: ["Python", "Jupyter", "Pandas"],
  },
  {
    name: "Talent-Bloom",
    description: "A talent management platform.",
    technology: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Rezaan91/Talent-Bloom",
  },
  {
    name: "Lula",
    description: "A search application.",
    technology: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Rezaan91/Lula",
  },
];

export const experience = [
  {
    role: "Founder / Full-Stack Developer",
    organization: "Ubuntu Mzansi Tech (UM Tech CG)",
    period: "Present",
    description:
      "Building scalable platforms, developer tools, and data-driven systems including UM-Tech-BizActivate, Watt Wallet Buddy, and TrackSuite.",
  },
  {
    role: "Tech Career Accelerator Participant",
    organization: "Capaciti",
    period: "2024–2025",
    description: "Completed intensive full-stack development training.",
  },
  {
    role: "IT Support",
    organization: "Various",
    period: "Earlier",
    description: "Troubleshooting, networking, and system administration.",
  },
];

export const education = [
  {
    title: "National Diploma in ICT: Applications Development",
    institution: "Cape Peninsula University of Technology",
  },
  {
    title: "Tech Career Accelerator Program",
    institution: "Capaciti",
  },
  {
    title: "FNB App Academy",
    institution: "Graduate with multiple certifications and diplomas",
  },
  {
    title: "NQF 4 in Project Management",
    institution:
      "Certified — covering Scope, Time, Cost and Quality management",
  },
];

export const footer = {
  copyright: "© 2026 Rezaan Achmat Fredericks. All Rights Reserved.",
  craft:
    "Developed through exceptional craftsmanship, passion, precision, purpose and digital ideas by Rezaan Achmat Fredericks.",
};
