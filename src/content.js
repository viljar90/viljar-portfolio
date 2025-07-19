// src/content.js

import React from 'react';
import { PuzzleIcon, ChartIcon, MagicIcon, PieChartIcon, VideoEditorIcon } from './components/uiElements';

export const MAIN_STAGES = { INSULTS: 'Insults', INTRO: 'Intro', HOME: 'Home' };

export const MAIN_NAV_ITEMS = [
  { name: MAIN_STAGES.INSULTS, colorScheme: 'black', pauseAfter: 200 },
  { name: MAIN_STAGES.INTRO, colorScheme: 'black', pauseAfter: 200 },
  { name: MAIN_STAGES.HOME, colorScheme: 'black' },
];

export const CONTENT = {
  INSULTS: {
    LINES: [
      { text: "You're dumb...", pause: 1200 },
      { text: "You're lazy...", pause: 1200 },
      { text: "You're impatient...", pause: 1400 },
      { text: "...when using technology.", pause: 1600 },
      { text: "Me too!", pause: 1200 },
      { text: "Everyone is...", pause: 1500 },
      { text: "...that's where I come in.", pause: 1400 }
    ]
  },
  INTRO: {
    GREETING: "Hi there!",
    steps: [
        { title: "Viljar Tornøe here", titleParts: ["Viljar Tornøe here"], icon: "wave", mainText: "PRODUCT · UX · UI · AI", pause: 800 },
        { title: "aka", mainText: "PRODUCT · UX · UI · AI", pause: 800 },
        { title: "Professional Problemsolver", mainText: "PRODUCT · UX · UI · AI", pause: 1000 },
        { title: "aka", mainText: "PRODUCT · UX · UI · AI", pause: 500 },
        { title: "Design Potato", mainText: "PRODUCT · UX · UI · AI", pause: 1000 },
        { title: "Viljar Designer", titleParts: ["Viljar", "Designer"], icon: "potato", mainText: "PRODUCT · UX · UI · AI", pause: 500 },
    ],
    QUESTION: "", //used to be the get to know text
  },
  HOME: {
    BUTTON_OPTIONS: ["Design", "My Work", "Me"]
  }
};

export const DESIGN_STAGE_KEYS = {
  ABOUT_DESIGN: "ABOUT_DESIGN_KEY",
  WHAT: "WHAT_KEY",
  PRODUCT_DESIGNER: "PRODUCT_DESIGNER_KEY",
  UX_RESEARCHER: "UX_RESEARCHER_KEY",
  //SERVICE_DESIGNER: "SERVICE_DESIGNER_KEY",
  UX_DESIGNER: "UX_DESIGNER_KEY",
  UI_DESIGNER: "UI_DESIGNER_KEY",
};

export const DESIGN_NAV_ITEMS = [
  { name: DESIGN_STAGE_KEYS.ABOUT_DESIGN },
  { name: DESIGN_STAGE_KEYS.WHAT },
  { name: DESIGN_STAGE_KEYS.PRODUCT_DESIGNER },
  { name: DESIGN_STAGE_KEYS.UX_RESEARCHER },
  //{ name: DESIGN_STAGE_KEYS.SERVICE_DESIGNER },
  { name: DESIGN_STAGE_KEYS.UX_DESIGNER },
  { name: DESIGN_STAGE_KEYS.UI_DESIGNER },
];

export const DESIGN_CONTENT = {
  [DESIGN_STAGE_KEYS.ABOUT_DESIGN]: {
    navText: "About Design",
    steps: [
      { title: "About design", mainText: "Most people don't understand design.", pause: 3000 },
      { title: "About design", mainText: "Lets look at some classic mistakes." },
      { title: "Mistake 1", mainText: "Those who don't know design think it is all about what something looks like." },
      { title: "Mistake 2", mainText: "So decision makers often think they can skip it to cut cost." },
      { title: "Mistake 3", mainText: "Or far too often, designers are brought on way too late just to fix the visuals..." },
      { title: "Mistake 3", mainText: "...too late to let design be the critical driver as it always should be." },
      { title: "Back to No. 1", mainText: "Making a nice looking design is just one small part of what designers actually do." },
      { title: "Back to No. 1", mainText: "And we don't do it for the reason you think." },
      { title: "You probably know", mainText: "People often perceive attractive people to be more intelligent, more successful and more trustworthy." },
      { title: "Bias", mainText: "This human bias is called the attractiveness halo." },
      { title: "Bias Leverage", mainText: "The aesthetic-usability effect is a very similar human bias designers leverage." },
      { title: "Bias Leverage", mainText: "When comparing two products with identical functionality the more visually appealing UI is... ", pause: 3000 },
      { title: "Bias Leverage", mainText: "...perceived to be more useful, effective and simple to use.", pause: 2000 },
      { title: "Bias Leverage", mainText: "Even when the ugly UI has better functionality, the pretty can come out on top." },
      { title: "Not form over function", mainText: "As with everything designers do, form serves function." },
      { title: "Form serves function", mainText: "It is thousends of big and small intentional decisions that make a product or service great.  " },
      { title: "Invest in design", mainText: "Developing a product or service is expensive..." },
      { title: "Invest in design", mainText: "...but not having someone design your product or service is even more expensive." },
      { title: "Mistake 4", mainText: "You risk your whole investment by developing..." },
      { title: "Mistake 4", mainText: "something nobody needs..." },
      { title: "Mistake 4", mainText: "nobody wants..." },
      { title: "Mistake 4", mainText: "nobody will use..." },
      { title: "Mistake 4", mainText: "and something that probably should be made all over again." },
    ]
  },
  [DESIGN_STAGE_KEYS.WHAT]: {
    navText: "What I do",
    steps: [
      { title: "What I do", mainText: "Developers create logical and rational systems in computers." },
      { title: "What I do", mainText: "As a designer I create logical and rational systems in human minds." },
      { title: "What I do", mainText: "Human minds are far more complex than computers." },
      { title: "What I do", mainText: "But unlike computers, minds get bored and easily frustrated..."},
      { title: "What I do", mainText: "...they reject needless complexity." },
      //{ title: "What I do", mainText: "They seek the path of least resistance." },
      { title: "What I do", mainText: "So let me demonstrate the most important skill of a designer..." },
      { title: "What I do", mainText: "...by making complicated things seem simple." },
      { title: "What I do", mainText: "Understand what I do in an engaging and simple to follow way." }
      //{ title: "What I do", mainText: "To make it clear how I can help..." },
      //{ title: "What I do", mainText: "...or perhaps you need a different designer." },
      //{ title: "What I do", mainText: "I know many good ones." },
      //{ title: "What I do", mainText: "The roles marked with a ★ are my specialties." },
    ]
  },
  [DESIGN_STAGE_KEYS.PRODUCT_DESIGNER]: {
    navText: "Product Designer",
    steps: [
      { title: "Product Designer", mainText: "is kind of like the the visionary architect of a product." },
      { title: "Product Designer", mainText: "Imagine a company has a prime plot of land and a new business opportunity or challange." },
      { title: "Product Designer", mainText: "They need build a new commercial building." },
      { title: "Product Designer", mainText: "Maybe a new store for their products?" },
      { title: "Product Designer", mainText: "Or a high-tech warehouse?"},
      { title: "Product Designer", mainText: "Perhaps a state-of-the-art factory?"},
      { title: "Product Designer", mainText: "Or a fancy new head office building?" },
      { title: "Product Designer", mainText: "They don't start with blueprints. They start aligning business goals, user needs, and technical constraints." },
      { title: "Product Designer", mainText: "But it is best to not do this solo." },
      { title: "Product Designer", mainText: "They must also champion the hard business realities, guided by the savvy real estate developer (Product Manager)." },
      { title: "Product Designer", mainText: "And respect the laws of physics, informed by the master structural engineer (Tech Lead)." },
      { title: "Product Designer", mainText: "The architect is the one who must stand in the middle, holding these three truths." },
      { title: "Product Designer", mainText: "The purpose for the people, the viability for the business, and the limits of the possible." },
      { title: "Product Designer", mainText: "Their visionary plan is born from balancing these competing, critical forces." },
      { title: "Product Designer", mainText: "Ensuring the right building, for the right purpose, for the right people gets built." },
    ]
  },
  
  [DESIGN_STAGE_KEYS.UX_RESEARCHER]: {
    navText: "UX Researcher",
    steps: [
      { title: "The UX Researcher", mainText: "Before drawing a single line, we need to know: Is there a market for this building?" },
      { title: "The UX Researcher", mainText: "The Commercial Market Researcher answers this crucial question." },
      { title: "The UX Researcher", mainText: "Their data on potential tenants and their critical needs makes my design commercially sound." },
    ]
  },/*
  [DESIGN_STAGE_KEYS.SERVICE_DESIGNER]: {
    navText: "Service Designer",
    steps: [
      { title: "The Service Designer", mainText: "The user's journey doesn't start or end with the product I design." },
      { title: "The Service Designer", mainText: "The Supply Chain and Logistics Expert designs this bigger picture." },
      { title: "The Service Designer", mainText: "They map the entire end-to-end customer experience, and my work must fit seamlessly within it." },
    ]
  },*/
  [DESIGN_STAGE_KEYS.UX_DESIGNER]: {
    navText: "UX Designer",
    steps: [
      { title: "The UX Designer", mainText: "With my UX Designer hat on, I architect the building's internal logic and flow." },
      { title: "The UX Designer", mainText: "I become the Process Engineer, designing the most logical pathways for people to accomplish their goals." },
      { title: "The UX Designer", mainText: "My focus is on making the space functional and effortless to navigate." },
    ]
  },
  [DESIGN_STAGE_KEYS.UI_DESIGNER]: {
    navText: "UI Designer",
    steps: [
      { title: "The UI Designer", mainText: "My work as a UI Designer makes the resulting space intuitive and understandable." },
      { title: "The UI Designer", mainText: "I am the Interior and Signage Designer, responsible for the look, feel, and clarity of the space." },
      { title: "The UI Designer", mainText: "I ensure that all controls and interactive elements are clear, accessible, and simple to use." },
    ]
  },
};

export const QUIZZES = [
  {
    id: 'aiPlatform',
    title: 'AI Platform',
    question: "Your company wants to leverage GenAI but is unsure where to start in a rapidly evolving market.\nWhat is the best approach to secure your data and maintain flexibility?",
    options: [
        { text: 'Mandate the use of a single GenAI provider across the company', isCorrect: false, feedback: 'A single-provider AI strategy is a gamble on two fronts: it is restrictive, locking you out of the best tools, and it is risky, leaving you vulnerable to unpredictable changes in price, platform, and terms of service.' },
        { text: 'Build a custom in-house GenAI model from scratch', isCorrect: false, feedback: 'This is extremely resource-intensive and may not be necessary when powerful models are already available.' },
        { text: 'Invest in an internal platform that can use any or multiple GenAI providers', isCorrect: true },
        { text: 'Wait for the market to mature before adopting AI tools', isCorrect: false, feedback: 'GenAI is mature enough to create significant value. Delaying adoption means missing out on great efficiency gains and falling behind competitors.' },
    ],
    resultText: "A well designed internal platform that can connect to multiple AI providers offers many benefits.",
    summaryPoints: [
        "Reduces risk by avoiding vendor lock-in",
        "Modular architecture makes it future-proof as technlogies evolve",
        "Secures your company data and GDPR compliance",
        "Guide in best practices and a safe space to experiment with AI",
    ],
    projectButtonText: "The AI Platform"
  },
  {
    id: 'designSystem',
    title: 'Design System',
    question: "Your product teams are struggling with inefficient frontend development and a misaligned product portfolio.\nWhat's the most effective first step to solve this?",
    options: [
        { text: 'Hire an agile coach', isCorrect: false, feedback: "While helpful, an agile coach addresses process, not the core issues of design and development inconsistency." },
        { text: 'Create a design system', isCorrect: true },
        { text: 'Reorganize your IT department', isCorrect: false, feedback: "Reorgs are needed for managerial, financial, strategic etc. issues. They won't solve the underlying problem of inconsistent UI and redundant efforts in design and development." },
        { text: 'Hire a service designer', isCorrect: false, feedback: "A service designer looks at the entire customer journey, but don't provide foundational tools for product efficiancy and consistency." },
    ],
    resultText: 'A design system is the most effective way to ensure consistency and speed.',
    summaryPoints: [
        "Core design and code ready-to-copy - faster time to market",
        "Avoids expensive duplicate work",
        "Consistent user experience across your products",
        "Scalable and maintainable - making updates cheap and easy"
    ],
    projectButtonText: 'The Design System'
  },
  {
    id: 'dataCatalogue',
    title: 'Data Catalogue',
    question: "Your organization has valuable data, but it's siloed, hard to find, and undocumented – working data-driven is diffucult.\nHow do you empower your employees to discover and trust your data?",
    options: [
        { text: 'Invest in more data science', isCorrect: false, feedback: "More data scientists won't help if they can't find or trust the data they need to work with." },
        { text: 'Launch a company-wide data literacy program', isCorrect: false, feedback: "A literacy program is great to make people more comfortable with using data, but alone it's insufficient if people still can't access or trust the data." },
        { text: 'Build a Data Catalogue', isCorrect: true },
        { text: 'Purchase a new BI tool', isCorrect: false, feedback: "A new tool is only as good as the data it's connected to. It doesn't solve the discovery and trust issues." },
    ],
    resultText: "Designing a user-centric data catalogue makes data discoverable and drives a data-driven culture.",
    summaryPoints: [
        "Improved data discovery",
        "Increased trust in data",
        "Fosters a data-driven culture"
    ],
    projectButtonText: "The Data Catalogue"
  },
  {
    id: 'aiDashboard',
    title: 'AI Dashboard',
    question: "Your product teams are unsure which services to improve digitally in a huge organization with vast amounts of data.\nHow can they best prioritize what digital service to focus on next?",
    options: [
        { text: 'Have product teams consistantly read through customer service records', isCorrect: false, feedback: "This isn't scalable and is prone to individual bias, making it hard to see the bigger picture." },
        { text: 'Use AI to analyze records and present findings in an interactive dashboard', isCorrect: true },
        { text: 'Hire UX designers to work with customer service and users to gain qualitative data', isCorrect: false, feedback: "This is a very good second step, but in a huge organization it will be difficult to get the full picture." },
        { text: 'Hire more customer service staff to handle requests', isCorrect: false, feedback: "This is a reactive solution that doesn't address the root cause of user struggles." },
    ],
    resultText: "Using AI to analyze user needs and a dashboard to visualize them empowers teams to make data-driven decisions.",
    summaryPoints: [
        "Identifies the real-time struggles of users",
        "Allows product teams to prioritize effectively",
        "Makes complex data accessible and understandable",
    ],
    projectButtonText: "The AI Dashboard"
  },
  {
    id: 'aiVideoProduction',
    title: 'AI Video Production',
    question: "Your company delivers digital products towards large tv broadcasters.\nHow do you leverage AI to get an advantage towards your client base?",
    options: [
        { text: 'Assign a multidisciplinary product team to discover new opportunities', isCorrect: true },
        { text: 'Invest in a new data science department', isCorrect: false, feedback: "Data scientists are required but won't alone get you the advantage you seek to create better products." },
        { text: 'Build a new product around the latest generative AI video model', isCorrect: false, feedback: "Chasing the latest trend without insight into real user needs is risky. You need to ensure you're solving real valuable problems." },
        { text: 'Conduct a market research poll to see what features clients want', isCorrect: false, feedback: "While useful, a poll only captures surface-level wants. It will not uncover nuanced needs, opportunities, or issues that even users themselves are blind to." },
    ],
    resultText: "A dedicated product team is the best first step. This ensures that any AI solution is built on a solid foundation of user needs and business goals.",
    summaryPoints: [
        "Focuses on solving real valuable problems",
        "Reduces the risk of building a product nobody wants",
        "Aligns the team around a clear, user-centric purpose",
        "Uncovers opportunities for true innovation beyond the obvious"
    ],
    projectButtonText: "The AI Video Production Tool"
  }
];

export const PROJECTS = [
  
  {
    id: 'aiPlatform',
    navText: 'AI Chat Platform',
    cardTitle: 'AI Chat Platform',
    description: 'FortelVia is an internal platform where employees can chat with the best AI models on the market in a secure and compliant way.',
    tags: ['Product','UX', 'UI'],
    icon: <MagicIcon />,
  },
  {
    id: 'design-system',
    navText: 'Design System',
    cardTitle: 'Cohesive Design System',
    description: 'Led the UX strategy and development of a comprehensive design system that streamlined product creation and ensured brand consistency.',
    tags: ['UX', 'UI', 'Figma'],
    icon: <PuzzleIcon />,
  },
  {
    id: 'dataCatalogue',
    navText: 'Data Catalogue',
    cardTitle: 'Data Catalogue',
    description: 'Designing a user-centric data catalogue makes data discoverable and drives a data-driven culture.',
    tags: ['UX Research', 'UX', 'UI'],
    icon: <ChartIcon />,
  },
  {
    id: 'aiDashboard',
    navText: 'AI Dashboard',
    cardTitle: 'AI Insights Dashboard for NAV',
    description: "Designed a user-friendly dashboard for NAV, visualizing AI-driven insights on user needs. This empowered product teams to prioritize services based on real-time data of what users struggled with the most.",
    tags: ['UX', 'UI', 'Data Visualization'],
    icon: <PieChartIcon />,
  },
  {
    id: 'aiVideoProduction',
    navText: 'AI Video Production',
    cardTitle: 'MAI - Smart Video Production',
    description: "Led a product discovery for a major TV network to find how AI could optimize video production. The result was MAI – a tool that automates metadata creation to drastically speed up post-production.",
    tags: ['Product','UX', 'UI'],
    icon: <VideoEditorIcon />,
  },
];
