// src/content.js

export const MAIN_STAGES = { INSULTS: 'Insults', INTRO: 'Intro', HOME: 'Home' };

export const MAIN_NAV_ITEMS = [
  { name: MAIN_STAGES.INSULTS, colorScheme: 'black', pauseAfter: 200 },
  { name: MAIN_STAGES.INTRO, colorScheme: 'black', pauseAfter: 400 },
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
        { title: "Viljar Tornøe here 👋", mainText: "PRODUCT · UX · UI · AI", pause: 800 },
        { title: "aka", mainText: "PRODUCT · UX · UI · AI", pause: 800 },
        { title: "Professional Problemsolver", mainText: "PRODUCT · UX · UI · AI", pause: 1000 },
        { title: "aka", mainText: "PRODUCT · UX · UI · AI", pause: 500 },
        { title: "Design Potato", mainText: "PRODUCT · UX · UI · AI", pause: 1000 },
        { title: "Viljar 🥔 Designer", mainText: "PRODUCT · UX · UI · AI", pause: 1000 },
    ],
    QUESTION: "know more about",
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
  SERVICE_DESIGNER: "SERVICE_DESIGNER_KEY",
  UX_DESIGNER: "UX_DESIGNER_KEY",
  UI_DESIGNER: "UI_DESIGNER_KEY",
};

export const DESIGN_NAV_ITEMS = [
  { name: DESIGN_STAGE_KEYS.ABOUT_DESIGN },
  { name: DESIGN_STAGE_KEYS.WHAT },
  { name: DESIGN_STAGE_KEYS.PRODUCT_DESIGNER },
  { name: DESIGN_STAGE_KEYS.UX_RESEARCHER },
  { name: DESIGN_STAGE_KEYS.SERVICE_DESIGNER },
  { name: DESIGN_STAGE_KEYS.UX_DESIGNER },
  { name: DESIGN_STAGE_KEYS.UI_DESIGNER },
];

export const DESIGN_CONTENT = {
  [DESIGN_STAGE_KEYS.ABOUT_DESIGN]: {
    navText: "About Design",
    steps: [
      { title: "About design", mainText: "Most people don't understand design.", pause: 3000 },
      { title: "About design", mainText: "Lets look at some classic mistakes." },
      { title: "Mistake 1", mainText: "People not familiar with design think it is all about what something looks like." },
      { title: "Mistake 2", mainText: "So decision makers often think they can skip it to cut cost." },
      { title: "Mistake 3", mainText: "Or far too often, designers are brought on way too late just to fix the visuals..." },
      { title: "Mistake 3", mainText: "...too late to let design be the critical driver of the product as it always should be." },
      { title: "Back to 1", mainText: "Making a nice looking design is just one small part of what designers actually do." },
      { title: "Back to 1", mainText: "And we don't do it for the reason you think." },
      { title: "You probably know", mainText: "People often perceive attractive people to be more intelligent, more successful and more trustworthy." },
      { title: "Bias", mainText: "This human bias is called the attractiveness halo." },
      { title: "Bias Leverage", mainText: "The aesthetic-usability effect is a very similar human bias designers leverage." },
      { title: "Bias Leverage", mainText: "Studies show that when comparing two products with the identical functionality the more visually appealing UI is... ", pause: 3000 },
      { title: "Bias Leverage", mainText: "...perceived to be more useful, effective and simple to use.", pause: 2000 },
      { title: "Bias Leverage", mainText: "Even when the ugly UI has better functionality, the pretty can come out on top." },
      { title: "Not form over function", mainText: "As with everything designers do, form serves function." },
      { title: "Form serves function", mainText: "It is thousends of tiny decisions that make a product or service great.  " },
      { title: "Invest in design", mainText: "Developing a product or service is expensive..." },
      { title: "Invest in design", mainText: "...but not having someone design your product or service is even more expensive." },
      { title: "Mistake 4", mainText: "You risk your whole investment by creating something nobody wants." },
    ]
  },
  [DESIGN_STAGE_KEYS.WHAT]: {
    navText: "What I do",
    steps: [
      { title: "What I do", mainText: "While developers create logical and rational systems in computers." },
      { title: "What I do", mainText: "As a designer I create logical and rational systems in human minds." },
      { title: "What I do", mainText: "Human minds are far more complex than computers." },
      { title: "What I do", mainText: "But unlike computers, minds are lazy and impatient\n– they reject needless complexity." },
      { title: "What I do", mainText: "They seek the path of least resistance." },
      { title: "What I do", mainText: "So let me show you what I as a designer do best..." },
      { title: "What I do", mainText: "...by making complex things simple." },
      { title: "What I do", mainText: "Lets explore the different roles in the difficult world of design a bit differently." },
      { title: "What I do", mainText: "To make it clear how I can help..." },
      { title: "What I do", mainText: "...or perhaps you need a different designer." },
      { title: "What I do", mainText: "I know many good ones." },
      { title: "What I do", mainText: "The roles marked with a ★ are my specialties." },
    ]
  },
  [DESIGN_STAGE_KEYS.PRODUCT_DESIGNER]: {
    navText: "★ Product Designer",
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
  },
  [DESIGN_STAGE_KEYS.SERVICE_DESIGNER]: {
    navText: "Service Designer",
    steps: [
      { title: "The Service Designer", mainText: "The user's journey doesn't start or end with the product I design." },
      { title: "The Service Designer", mainText: "The Supply Chain and Logistics Expert designs this bigger picture." },
      { title: "The Service Designer", mainText: "They map the entire end-to-end customer experience, and my work must fit seamlessly within it." },
    ]
  },
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