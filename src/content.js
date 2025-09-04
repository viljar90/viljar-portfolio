// src/content.js

import React from 'react';
import { PuzzleIcon, ChartIcon, MagicIcon, PieChartIcon, VideoEditorIcon } from './components/uiElements';
import ProfilePicture from './assets/profile.png';
import PixarProfilePicture from './assets/pixar-profile.png';

export const MAIN_STAGES = { INSULTS: 'Insults', INTRO: 'Intro', HOME: 'Home' };

export const MAIN_NAV_ITEMS = [
  { name: MAIN_STAGES.INSULTS, slug: 'insults', colorScheme: 'black', pauseAfter: 200 },
  { name: MAIN_STAGES.INTRO, slug: 'intro', colorScheme: 'black', pauseAfter: 200 },
  { name: MAIN_STAGES.HOME, slug: 'home', colorScheme: 'black' },
];

export const CONTENT = {
  INSULTS: {
    LINES: [
      { text: "You're dumb...", pause: 1200 },
      { text: "You're lazy...", pause: 1200 },
      { text: "You're impatient...", pause: 1400 },
      { text: "...when using technology.", pause: 2600 },
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
    QUESTION: "",
  },
  HOME: {
    BUTTON_OPTIONS: ["Design", "My Work", "Me"]
  }
};

export const DESIGN_VIEWS = {
  WHY_DESIGN: 'Why Design',
  WHAT_DESIGN: 'What I Do',
};

export const WHY_DESIGN_CONTENT = {
  intro: {
    steps: [
      { title: "Why Design", mainText: "Every design has a price." },
      { title: "Why Design", mainText: "Good design can build fortunes." },
      { title: "Why Design", mainText: "One bad design choice can turn to ruin." },
      { title: "Why Design", mainText: "Play to see why design can make or break the bank." }
      //{ title: "Why Design", mainText: "Money is not talked about enough in design." },
      //{ title: "Why Design", mainText: "Probably because quantifying it is difficult, as design involves many intangible factors." },
      //{ title: "Why Design", mainText: "The whole is greater than the sum of its parts." },
      //{ title: "Why Design", mainText: "But bad parts can destroy the whole." },
      //{ title: "Why Design", mainText: "Play the game to see why design can make or break the bank." },
    ]
  }
};

export const WHY_DESIGN_GAME_CONTENT = [
    {
        slug: 'best-buy',
        caseTitle: "Best Buy: Expensive Button",
        parts: [
            {
                type: 'singleChoice',
                context: "E-commerce giant Best Buy required customers to create an account before purchase, creating a barrier for buyers.",
                question: "What do you think was the estimated annual cost of this friction?",
                options: [
                    { text: "$150,000,000", isCorrect: false, rationale: "The actual cost was significantly higher." },
                    { text: "$75,000,000", isCorrect: false, rationale: "The actual cost was significantly higher." },
                    { text: "$300,000,000", isCorrect: true, rationale: "This case illustrates how one single point of friction can lead to massive revenue loss." },
                    { text: "$5,000,000", isCorrect: false, rationale: "The actual cost was significantly higher." }
                ]
            },
            {
                type: 'selectAll',
                context: "Simply adding a 'Continue As Guest' button led to a 45% increase in purchasing customers for Best Buy.",
                question: "Guess which design lessons the original design ignore?",
                options: [
                    { text: "User Control and Freedom", isCorrect: true, rationale: "The design removed the user's freedom to simply purchase an item, offering no easy 'emergency exit.' Good design empowers users, it doesn't trap them." },
                    { text: "Visibility of System Status", isCorrect: false, rationale: "While important, this wasn't the primary failure. The system was clear about what it wanted (registration); the problem was that the requirement itself was flawed." },
                    { text: "Reactance", isCorrect: true, rationale: "This is a bias where people react negatively when forced to do something. Forcing registration made almost half of users to abandon their carts." },
                    { text: "Fitt's Law", isCorrect: false, rationale: "Fitt's Law relates to the time it takes to move to a target area (e.g., making buttons large and easy to click). It wasn't the core issue here." }
                ]
            }
        ]
    },
    {
        slug: 'helseplattformen',
        caseTitle: "Helseplattformen: Slowed to Death",
        parts: [
             {
                type: 'singleChoice',
                context: "The 'Helseplattformen' IT system has been harshly criticized for being so slow and difficult to use to the point of risking patient care.",
                question: "Guess how much has this life risking system cost so far?",
                options: [
                    { text: "2.6 billion NOK", isCorrect: false, rationale: "This is just the overrun cost." },
                    { text: "980 million NOK", isCorrect: false, rationale: "The total cost is much higher." },
                    { text: "6.6 billion NOK", isCorrect: true, rationale: "4 billion NOK was the orignal budget, but with significant overruns of 2.6 billion part in due to the ongoing design issues." },
                    { text: "9.5 billion NOK", isCorrect: false, rationale: "The total is lower." }
                ]
            },
            {
                type: 'selectAll',
                context: "84% of doctors felt that 'Helseplattformen' could endanger patients because it was too complicated and not adapted to clinical workflows.",
                question: "Which of these key design points should have been concidered?",
                options: [
                    { text: "Dunning-Kruger effect", isCorrect: false, rationale: "The Dunning-Kruger effect is a cognitive bias where people with low ability at a task overestimate their competence, while those with high ability can underestimate their own. Not relevant to this question." },
                    { text: "Match Between System and the Real World", isCorrect: true, rationale: "The system failed to speak the users' language or align with the workflows of Norwegian clinical practice, making even simple tasks difficult. Qualitative insights and contextual user testing were clearly neglegted." },
                    { text: "Aesthetic and Minimalist Design", isCorrect: true, rationale: "This principle states that interfaces should be clean and not make tasks more complicated than necessary. Any information a user sees related to any given task should be thought of as on a need-to-know-now basis." },
                    { text: "Flexibility and Efficiency of Use", isCorrect: true, rationale: "The new system's poor usability is a critical issue, with tasks taking up to five times as long. The cost in wasted staff hours is unsustainable for a health sector already under pressure." }
                ]
            }
        ]
    },
    {
        slug: 'citibank',
        caseTitle: "Citibank: Big Small Mistake",
        parts: [
             {
                type: 'singleChoice',
                context: "The confusing UI design of Citibank's software directly caused an employee to turn a simple click into a costly mistake.",
                question: "Guess the direct financial loss from this bad user interface?",
                options: [
                    { text: "$900,000", isCorrect: false, rationale: "The loss was much, much larger." },
                    { text: "$50,000,000", isCorrect: false, rationale: "The loss was much larger." },
                    { text: "$90,000,000", isCorrect: false, rationale: "The loss was much larger." },
                    { text: "$900,000,000", isCorrect: true, rationale: "Citibank accidentally wired nearly a billion dollars due to a confusing interface, and courts ruled they legally did not have the right get it back, though a portion was returned willingly." }
                ]
            },
            {
                type: 'selectAll',
                context: "The court decided that the UI was not user-friendly, had inadequate safeguards and Citibank could only blame themselves.",
                question: "Which of these design lessons were overlooked?",
                options: [
                    { text: "Error Prevention", isCorrect: true, rationale: "The best designs strive to prevent critical errors entirely. Actions should be reversible and small mistakes should not lead to a huge negative impacts. Users make small mistakes all the time." },
                    { text: "Negative Feedback Loop", isCorrect: true, rationale: "A well-designed system uses negative feedback (like warnings) to prevent mistakes. This interface failed to provide  good guidance, which directly led to the massive financial loss." },
                    { text: "Jakob's Law", isCorrect: false, rationale: "This law states that users prefer sites to work like other sites they know. In this case all interactions were actually too similar, the most critical failure was the lack of safeguards against catastrophic mistakes." },
                    { text: "Miller's Law", isCorrect: false, rationale: "This law suggests users can only keep 5-9 items in working memory. While a cluttered interface can strain memory, the core issue here was a confusing workflow and lack of safeguards, not just the number of items on screen." }
                ]
            }
        ]
    },
    {
        slug: 'nav',
        caseTitle: "NAV: Hidden Calculations",
        parts: [
             {
                type: 'singleChoice',
                context: "NAV's new pension systems resulted in a tool notoriously difficult for both employees and citizens to understand.",
                question: "What was the total cost for this part of the modernization project?",
                options: [
                    { text: "3 billion NOK", isCorrect: false, rationale: "This was the budget overrun, not the total cost." },
                    { text: "3.4 billion NOK", isCorrect: false, rationale: "This was the original budget, not the final cost." },
                    { text: "6 billion NOK", isCorrect: true, rationale: "The cost soared past 6 billion NOK on a 3.4 billion budget. Years of expensive fixes still haven't solved its user-unfriendliness. A costly lesson how just fixing things later isn't that simple." },
                    { text: "8 billion NOK", isCorrect: false, rationale: "The total cost a but lower." }
                ]
            },
            {
                type: 'selectAll',
                context: "The NAV system's calculations were so opaque that it became near impossible for citizens and case workers to verify financial pension decisions.",
                question: "Which of these factors did the system fail to deliver on?",
                options: [
                    { text: "Visibility of System Status", isCorrect: true, rationale: "The system completely failed to communicate to users how it arrived at its conclusions. It left both caseworkers and citizens in the dark about the logic behind critical financial decisions." },
                    { text: "Authority Bias", isCorrect: false, rationale: "This bias relates to our tendency to attribute greater accuracy to the opinion of an authority figure. While a factor in how users might have initially trusted the system's outputs, it wasn't the core design failure itself." },
                    { text: "Tesler's Law", isCorrect: true, rationale: "Also known as The Law of Conservation of Complexity. By hiding how it reached its financial conclusions, the system didn't remove complexity, it just transferred the burden of figuring out the opaque result onto workers and clients." },
                    { text: "The Efficiency Tax", isCorrect: true, rationale: "This refers to the enormous waste in resources when workers fight with clunky software. A difficult-to-use tool creates an ongoing, compounding effect on efficiency, wasting time and resources. The inefficacy of a widely used tool can, over time, dwarf the billions that went into creating it." }
                ]
            }
        ]
    },
    {
        slug: 'police',
        caseTitle: "Norwegian Police: PEN Scandal",
        parts: [
            {
                type: 'singleChoice',
                context: "The Police's 'PEN' system was designed for stationary, office-based work, conflicting with the on-the-go nature of modern policing.",
                question: "Guess what was the financial loss for cancelling this from-the-start fatally flawed system?",
                options: [
                    { text: "250 million NOK", isCorrect: false, rationale: "The loss was higher." },
                    { text: "728 million NOK", isCorrect: false, rationale: "The loss was lower." },
                    { text: "1.2 billion NOK", isCorrect: false, rationale: "The loss was lower." },
                    { text: "485 million NOK", isCorrect: true, rationale: "The project was cancelled after wasting 485 million NOK, a significant loss for a system that failed the most basic contextual needs of its users." }
                ]
            },
            {
                type: 'selectAll',
                context: "The system forced officers to return to the station to do administrative tasks instead of on-the-go, wasting time",
                question: "Which core ignored UX lessons led to the failure?",
                options: [
                    { text: "Match Between System and the Real World", isCorrect: true, rationale: "The design was based on an office environment, completely failing to match the real-world context of a police officer on patrol." },
                    { text: "Flexibility and Efficiency of Use", isCorrect: true, rationale: "The system was not flexible enough to be used efficiently in the field. It failed on the contextual requirement needed for mobile use, forcing a costly and inefficient workflow." },
                    { text: "Outdated Mental Model", isCorrect: true, rationale: "The developers of the system had a preconceived mental model how police work is done. With good qualitative research the PEN project would probably been a success." },
                    { text: "Consistency and Standards", isCorrect: false, rationale: "Refers in simple terms to don't reinvent the wheel unless necessary. However, in this case not just another desktop solution was not enough." }
                ]
            }
        ]
    },
     {
        slug: 'lidl',
        caseTitle: "Lidl: Mismatched System",
        parts: [
            {
                type: 'singleChoice',
                context: "Supermarket giant Lidl selected an industry-standard inventory system, thinking they could just adapt their business model to the system.",
                question: "How much did Lidl write off after finally dropping the system?",
                options: [
                    { text: "€90 million", isCorrect: false, rationale: "The write-off was much larger." },
                    { text: "€500 million", isCorrect: true, rationale: "A costly reminder that the 'standard' solution isn't always the right one." },
                    { text: "€800 million", isCorrect: false, rationale: "The write-off was lower." },
                    { text: "€1 billion", isCorrect: false, rationale: "The write-off was lower." }
                ]
            },
            {
                type: 'selectAll',
                context: "The industry standard was cheaper, but in the end led to a large financial loss",
                question: "Which design teachings is relevant regarding this failure?",
                options: [
                    { text: "Match Between System and the Real World", isCorrect: true, rationale: "A tool must serve the business and user's reality. The system's logic was fundamentally opposed to Lidl's business model, making it a bad fit from the start." },
                    { text: "Sunk Cost Effect", isCorrect: true, rationale: "As costs mounts, this psychological bias makes it harder for leadership to abandon a failing project, because of the the money already 'sunk' into it. This is why design and testing is so important." },
                    { text: "Occam's Razor", isCorrect: false, rationale: "This principle suggests simpler solutions are better. While a better-fitting system would have been a 'simpler' solution in hindsight, the core failure was the mismatch, not just a failure to choose the simplest path." },
                    { text: "Status Quo Bias", isCorrect: false, rationale: "Status quo bias means a preferance for things to stay the the way they are, even if they are bad. In this case this bias was underestimated, and some core things should could not be changed." }
                ]
            }
        ]
    },
    {
        slug: 'us-census',
        caseTitle: "US Census: Ignoring users",
        parts: [
            {
                type: 'singleChoice',
                context: "The US Census Bureau developed new handheld devices to collect data, but field tests showed they were slow, confusing, and unreliable.",
                question: "Guess the cost to abandon the failing digital system and revert to paper-and-pencil at the last minute?",
                options: [
                    { text: "$500 million", isCorrect: false, rationale: "The cost was much higher." },
                    { text: "$1 billion", isCorrect: false, rationale: "The cost was double this." },
                    { text: "$2 billion", isCorrect: true, rationale: "It cost an extra $2 billion on top of the $600 million to develop the failed devices." },
                    { text: "$100 million", isCorrect: false, rationale: "The cost was much higher." }
                ]
            },
            {
                type: 'selectAll',
                context: "The user testing process worked perfectly! It correctly identified that the solution was not good enough. The failure was that leadership ignored these clear warnings from users.",
                question: "Which biases and process failures explain this decision to ignore clear user feedback?",
                options: [
                    { text: "Confirmation Bias", isCorrect: true, rationale: "Leadership, already committed to the digital strategy, likely looked for any evidence that confirmed their decision while downplaying the overwhelmingly negative user feedback." },
                    { text: "Sunk Cost Effect", isCorrect: true, rationale: "As millions were already invested in the handhelds, it became psychologically harder for leadership to abandon the plan, even when faced with evidence of its failure." },
                    { text: "Feedback Loop Failure", isCorrect: true, rationale: "This is the core process failure. The organization had a system for getting user feedback (field tests), but it failed to act on that feedback, rendering it useless." },
                    { text: "The Framing Effect", isCorrect: false, rationale: "This bias refers to that how information is presented influences how people make decisions. While potentially a factor, the core issue was the complete breakdown of the feedback process itself." }
                ]
            }
        ]
    },
    {
        slug: 'walmart',
        caseTitle: "Walmart: Expensive Question",
        parts: [
            {
                type: 'singleChoice',
                context: 'On their website, they asked "Would you like Walmart to be less cluttered?" Users overwhelmingly responded "yes".',
                question: "Guess the loss in sales from removing 15% of the inventory based on this single question?",
                options: [
                    { text: "$250 million", isCorrect: false, rationale: "The loss was much higher." },
                    { text: "$850 million", isCorrect: false, rationale: "The loss was more than double this amount." },
                    { text: "$1.85 billion", isCorrect: true, rationale: "The move alienated customers who couldn't find their usual products, leading to a massive, self-inflicted sales drop." },
                    { text: "$2.4 billion", isCorrect: false, rationale: "The a bit lower." }
                ]
            },
            {
                type: 'selectAll',
                context: "The failure wasn't in listening to customers, but the approach. The closed-ended question didn't uncover the real user need.",
                question: "Which user design rules were violated by this approach?",
                options: [
                    { text: "Leading Question", isCorrect: true, rationale: "The question was framed to elicit a 'yes' answer. Of course people want less clutter. This is a classic user research mistake. It failed to discover the root issue." },
                    { text: "Anchoring Bias ", isCorrect: false, rationale: "Simply refers to that users rely more heavily on the first piece of information they see." },
                    { text: "Confirmation Bias", isCorrect: true, rationale: "As the team posed the question, they likely already believed that removing inventory was the solution to 'clutter' and used the flawed survey results to confirm their pre-existing belief." },
                    { text: "The Peak-End Rule", isCorrect: false, rationale: "This rule states people judge an experience based on its most intense point and its end. It's not relevant to the flawed methodology of the survey question itself." }
                ]
            }
        ]
    },
    {
        slug: 'us-navy',
        caseTitle: "USS McCain: Deadly Design",
        parts: [
            {
                type: 'singleChoice',
                context: "Navy destroyer USS McCain collided with a commercial tanker, the accident was traced to a confusing UI in the cockpit.",
                question: "The tragic loss of 10 lives is immeasurable, the cost in repairs are not.",
                options: [
                    { text: "$118 million", isCorrect: false, rationale: "The cost was higher." },
                    { text: "$223 million", isCorrect: true, rationale: "It was mere luck it didn't sink losing more lives and the $1.8 billion ship." },
                    { text: "$760 million", isCorrect: false, rationale: "The cost was lower." },
                    { text: "$1.1 billion", isCorrect: false, rationale: "The cost was lower." }
                ]
            },
            {
                type: 'selectAll',
                context: "A new, complex touchscreen system made the crew lose control causing the crash.",
                question: "Which critical design failures contributed to this tragedy?",
                options: [
                    { text: "Visibility of System Status", isCorrect: true, rationale: "The system failed to provide clear, immediate feedback about which station had control of which function (steering vs. throttle), leaving the crew in the dark during a critical moment." },
                    { text: "Recognition Rather Than Recall", isCorrect: true, rationale: "The complex system forced sailors to recall complex procedures from memory under high stress, rather than making system functions and statuses clearly visible." },
                    { text: "Empathy Gap", isCorrect: true, rationale: "The designers likely underestimated how much the stress and high-pressure emotions of a real-world naval operation would influence the crew's ability to interact with a complex system." },
                    { text: "Fitt's Law", isCorrect: false, rationale: "While related to interaction, the core issue was the system's confusing feedback and logic, not the physical difficulty of tapping a target." }
                ]
            }
        ]
    },
    {
        slug: 'foxmeyer',
        caseTitle: "FoxMeyer: Internal Rebellion",
        parts: [
            {
                type: 'singleChoice',
                context: "Pharmaceutical giant FoxMeyer invested in a system to automate its warehouses which failed.",
                question: "What was the ultimate outcome for the multi-billion dollar company?",
                options: [
                    { text: "A 50% loss in stock value", isCorrect: false, rationale: "The outcome was far more severe." },
                    { text: "A government bailout", isCorrect: false, rationale: "No, this went beyond a bailout." },
                    { text: "Bankruptcy", isCorrect: true, rationale: "The $65 million dollar system investment and $34 million dollars in lost revenue proved to big to overcome." },
                    { text: "A hostile takeover", isCorrect: false, rationale: "It went beyond this." }
                ]
            },
            {
                type: 'selectAll',
                context: "Warehouse employees in fear for their jobs felt they had no control and began to actively sabotage the new system.",
                question: "Which powerful psychological factors were at play?",
                options: [
                    { text: "Reactance", isCorrect: true, rationale: "The employees felt their freedom and job security were threatened by the new system. This triggered a strong negative reaction, leading them to actively work against its success." },
                    { text: "Loss Aversion", isCorrect: true, rationale: "States people prefer to avoid loss more than potential new gains. The perceived loss of jobs was a much more powerful motivator for the employees than any potential company efficiency gain. They acted to avoid this loss." },
                    { text: "Empathy Gap", isCorrect: true, rationale: "Refers to underestimating how much emotions influence behavior. The planners underestimated how fear and uncertainty would influence the workers behavior." },
                    { text: "Negativity Bias", isCorrect: false, rationale: "This bias refers to how people remember negative events more than positive ones. Not relevant to situation." }
                ]
            }
        ]
    },
    {
        slug: 'e-helse-direktoratet',
        caseTitle: "E-helse Direktoratet: Akson",
        parts: [
            {
                type: 'singleChoice',
                context: "The Norwegian government's 'Akson' project had a 'one health journal for all' vision.",
                question: "Guess the cost of this vision that did not deliver a single line of code",
                options: [
                    { text: "981 million NOK", isCorrect: false, rationale: "It was much lower." },
                    { text: "640 million NOK", isCorrect: false, rationale: "It was lower." },
                    { text: "482 million NOK", isCorrect: true, rationale: "Too much money for something that didn't deliver anything of value." },
                    { text: "1.3 billion NOK", isCorrect: false, rationale: "It was much lower." }
                ]
            },
            {
                type: 'selectAll',
                context: "The project was stopped after massive opposition from doctors, who argued that a single, monolithic system could never meet their diverse needs.",
                question: "Which strategic errors and biases led to this conceptual failure?",
                options: [
                    { text: "False Consensus Effect", isCorrect: true, rationale: "This bias describes the tendency to assume others share our beliefs. The project's proponents likely overestimated how much GPs agreed with their top-down vision." },
                    { text: "Occam's Razor", isCorrect: true, rationale: "This principle states that simpler solutions are often better. The project chose the most complex possible solution (one giant system) instead of a simpler one (integrating existing systems)." },
                    { text: "User Control and Freedom", isCorrect: true, rationale: "The proposed system would have removed the autonomy that GPs and municipalities had over their own tools and workflows, forcing them into a rigid system." },
                    { text: "Sunk Cost Effect", isCorrect: false, rationale: "This case is an example of avoiding the Sunk Cost Effect. By cancelling the project despite the money already spent on planning, the government made a rational decision and prevented much larger losses." }
                ]
            }
        ]
    }
];
export const WHY_DESIGN_NAV_ITEMS = [
  { name: 'Start' },
];

export const DESIGN_STAGE_KEYS = {
  ABOUT_DESIGN: 'about_design_key',
  WHAT_I_DO: 'what_i_do_key',
  PRODUCT_DESIGNER: 'product_designer_key',
  UX_RESEARCHER: 'ux_researcher_key',
  UX_DESIGNER: 'ux_designer_key',
  UI_DESIGNER: 'ui_designer_key',
};

export const WHAT_DESIGN_NAV_ITEMS = [
  { name: DESIGN_STAGE_KEYS.ABOUT_DESIGN, title: "Why Design" },
  { name: DESIGN_STAGE_KEYS.WHAT_I_DO, title: "What I Do" },
  { name: DESIGN_STAGE_KEYS.PRODUCT_DESIGNER, title: "Product Designer" },
  { name: DESIGN_STAGE_KEYS.UX_RESEARCHER, title: "UX Researcher" },
  { name: DESIGN_STAGE_KEYS.UX_DESIGNER, title: "UX designer" },
  { name: DESIGN_STAGE_KEYS.UI_DESIGNER, title: "UI designer" },
];

export const DESIGN_CONTENT = {
  [DESIGN_STAGE_KEYS.ABOUT_DESIGN]: {
  navText: "Design",
  steps: [
    {
      title: "Design",
      mainText: "A beautiful interface is often mistaken as the goal of design."
    },
    {
      title: "Design",
      mainText: "It's simply the strategic result of a problem solved correctly."
    },
    {
      title: "Design",
      mainText: "Design is about making solutions fit humans, not trying to make humans fit solutions."
    },
    {
      title: "Combination",
      mainText: "Solving real customer needs in an aesthetic and functional form isn't just a goal..."
    },
    {
      title: "Winning Combination",
      mainText: "...it's the winning strategy of every market leader."
    },
    {
      title: "The Real Cost",
      mainText: "Ignoring design is an expensive mistake to make..."
    },
    {
      title: "The Real Cost",
      mainText: "It’s how you build a product nobody wants..."
    },
    {
      title: "The Real Cost",
      mainText: "a service nobody uses..."
    },
    {
      title: "The Real Cost",
      mainText: "...and an investment that ultimately fails."
    },
    {
      title: "The Value",
      mainText: "Good design isn't just another cost. It's the insurance policy for your investment."
    }
  ],
  /*
  steps: [
    { title: "What is design", mainText: "Most people don't understand design.", pause: 3000 },
    { title: "What is design", mainText: "Lets look at some classic mistakes." },
    { title: "Mistake 1", mainText: "Those who don't know design think it is all about what something looks like." },
    { title: "Mistake 2", mainText: "So some decision makers think they can skip it to cut cost." },
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
  */
},
  [DESIGN_STAGE_KEYS.WHAT_I_DO]: {
  navText: "What I do",
  steps: [
    {
      title: "What I do",
      mainText: "Developers build logical systems for computers."
    },
    {
      title: "What I do",
      mainText: "As a designer, I build intuitive solutions for human minds."
    },
    {
      title: "The Challenge",
      mainText: "Minds are infinitely more complex than computers..."
    },
    {
      title: "The Challenge",
      mainText: "But unlike computers, minds get distracted, bored and tired."
    },
    {
      title: "The Challenge",
      mainText: "It’s a survival machine, not a fan club."
    },
    {
      title: "The Challenge",
      mainText: "It's hardwired to focus on flaws, not what works well."
    },
    {
      title: "The fuel",
      // Your excellent, concise, and powerful line.
      mainText: "For me, that's not frustration — it's motivation."
    },
    {
      title: "As a Designer",
      mainText: "My work honors that instinct, distilling messy real-world complexity..."
    },
    {
      title: "As a Designer",
      mainText: "...into an experience that feels effortless."
    },
    {
      title: "As a Designer",
      mainText: "The following roles show how my skills create tangible value."
    }
]
  /*
  steps: [
    { title: "What I do", mainText: "Developers create logical and rational systems in computers." },
    { title: "What I do", mainText: "As a designer I create logical and rational systems in human minds." },
    { title: "What I do", mainText: "Human minds are far more complex than computers." },
    { title: "What I do", mainText: "But unlike computers, minds get bored and easily frustrated..."},
    { title: "What I do", mainText: "...they reject needless complexity." },
    { title: "What I do", mainText: "The most important skill of a designer is to distill complexity..." },
    { title: "What I do", mainText: "...into something that is useful, intuitive and deceptively simple." },
    { title: "What I do", mainText: "Explore the design roles where i demonstrate this skill..." },
    { title: "What I do", mainText: "...by making complicated things seem simple." },
    //{ title: "What I do", mainText: "Understand what I do in an engaging and simple to follow way." }
  ]
  */
},
  [DESIGN_STAGE_KEYS.PRODUCT_DESIGNER]: {
    navText: "Product Designer",
    steps: [
      {
        title: "Product Designer",
        mainText: "Think of me as the architect of the product's strategic and creative vision."
      },
      {
        title: "Product Designer",
        mainText: "Before a single blueprint is drawn, my work is to answer the fundamental question..."
      },
      {
        title: "Product Designer",
        mainText: "What is the right thing to build, and why?"
      },
      {
        title: "Product Designer",
        mainText: "The right answer must always satisfy three truths."
      },
      {
        title: "Product Designer",
        mainText: "It must be desirable for the customer..."
      },
      {
        title: "Product Designer",
        mainText: "valuable for the business..."
      },
      {
        title: "Product Designer",
        mainText: "and technologically feasible."
      },
      {
        title: "Product Designer",
        mainText: "Within a product trio I collaborate with product manager, and senior tech advisor to find the balance."
      },
      {
        title: "Product Designer",
        mainText: "The product designer chart the correct course to steer the product on a good path."
      },
      {
        title: "Product Designer",
        mainText: "This ensures the right product gets built from day."
      }
    ],
    /*
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
    */
  },
  
  [DESIGN_STAGE_KEYS.UX_RESEARCHER]: {
    navText: "UX Researcher",
    steps: [
      {
        title: "UX Researcher",
        mainText: "Think of my role as an investigator."
      },
      {
        title: "UX Researcher",
        mainText: "But my job isn't to solve a crime — it's to prevent one. "
      },
      {
        title: "UX Researcher",
        mainText: "The crime? A failed product built on faulty assumptions."
      },
      {
        title: "UX Researcher",
        mainText: "My investigation starts by interviewing your real customers..."
      },
      {
        title: "UX Researcher",
        mainText: "...to uncover their unspoken needs and hidden frustrations."
      },
      {
        title: "UX Researcher",
        mainText: "These insights become testable hypotheses, validated by real-world experiments."
      },
      {
        title: "UX Researcher",
        mainText: "This process replaces costly assumptions with the evidence needed to build with confidence."
      }
    ],
    /*
    steps: [
      { title: "The UX Researcher", mainText: "Before drawing a single line, we need to know: Is there a market for this building?" },
      { title: "The UX Researcher", mainText: "The Commercial Market Researcher answers this crucial question." },
      { title: "The UX Researcher", mainText: "Their data on potential tenants and their critical needs makes my design commercially sound." },
    ]
    */
  },
  [DESIGN_STAGE_KEYS.UX_DESIGNER]: {
    navText: "UX Designer",
    steps: [
      {
        title: "UX Designer",
        mainText: "If the Product Designer is the architect of the strategic vision..."
      },
      {
        title: "UX Designer",
        mainText: "...then the UX Designer is the architect who creates the structural blueprints."
      },
      {
        title: "UX Designer",
        mainText: "I focus on the user's journey throughout the product..."
      },
      {
        title: "UX Designer",
        mainText: "...ensuring every step is tailored to achieve specific needs and goals."
      },
      {
        title: "UX Designer",
        mainText: "This involves a relentless cycle of research, ideas, sketching, prototyping and user testing..."
      },
      {
        title: "UX Designer",
        mainText: "...until every flaw is eliminated and only a deceptively simple workflow remains."
      },
      {
        title: "UX Designer",
        mainText: "The result is a product blueprint that doesn't just work..."
      },
      {
        title: "UX Designer",
        mainText: "...but feels effortless to use. No manual needed."
      }
    ],
    /*
    steps: [
      { title: "The UX Designer", mainText: "With my UX Designer hat on, I architect the building's internal logic and flow." },
      { title: "The UX Designer", mainText: "I become the Process Engineer, designing the most logical pathways for people to accomplish their goals." },
      { title: "The UX Designer", mainText: "My focus is on making the space functional and effortless to navigate." },
    ]
    */
  },

  [DESIGN_STAGE_KEYS.UI_DESIGNER]: {
    navText: "UI Designer",
    steps: [
      {
        title: "UI Designer",
        mainText: "The UX Designer draws the structural blueprints, but blueprints are never the final result."
      },
      {
        title: "UI Designer",
        mainText: "A UI Designer takes the blueprints to build the final look of the product."
      },
      {
        title: "UI Designer",
        mainText: "My role is to translate the system's logic into a visual language the user already speaks."
      },
      {
        title: "UI Designer",
        mainText: "By grounding this language in your brand, the entire experience feels cohesive and trustworthy."
      },
      {
        title: "UI Designer",
        mainText: "Every color, font, state and icon is a deliberate choice, scrutinized to communicate function instantly."
      },
      {
        title: "UI Designer",
        mainText: "My work ensures the user doesn't just see the interface, they feel like they already know it."
      },
      {
        title: "UI Designer",
        mainText: "The result is a polished, professional product that builds trust and is intuitive to use."
      }
    ],
    /*
    steps: [
      {
        title: "UI Designer",
        mainText: "With the blueprint for the experience complete, my role as the UI Designer is to bring it to life."
      },
      {
        title: "UI Designer",
        mainText: "I am the architect of the product's look, feel, and final finish."
      },
      {
        title: "UI Designer",
        mainText: "My work is to craft the visual language that communicates the underlying logic."
      },
      {
        title: "UI Designer",
        mainText: "Every color, font, icon, and interaction is a deliberate choice..."
      },
      {
        title: "UI Designer",
        mainText: "...designed to make the intuitive workflow feel obvious."
      },
      {
        title: "UI Designer",
        mainText: "The result is a polished, professional interface that builds trust, creates delight, and feels cohesive."
      }
    ]
    */
  }
};

export const QUIZZES = [
  {
    id: 'aiPlatform',
    slug: 'question-1',
    title: 'AI Platform',
    question: "Your large Norwegian company wants to leverage GenAI but is unsure where to start in a rapidly evolving market.\nWhat is the best approach maintain flexibility and secure company data?",
    options: [
        { text: 'Mandate the use of a single GenAI provider across the company', isCorrect: false, feedback: 'A single-provider AI strategy is a gamble on two fronts. It is restrictive, locking you out of the best tools, and it is risky, leaving you vulnerable to unpredictable changes in price, platform, and terms of service.' },
        { text: 'Build a custom in-house GenAI model from scratch', isCorrect: false, feedback: 'This is extremely resource-intensive and may not be necessary when powerful models are already available.' },
        { text: 'Invest in an internal platform that can use any or multiple GenAI providers', isCorrect: true },
        { text: 'Wait for the market to mature before adopting AI tools', isCorrect: false, feedback: 'GenAI is mature enough to create significant value. Delaying adoption means missing out on great potential gains and falling behind competitors.' },
    ],
    resultText: "A well designed internal platform that can connect to multiple AI providers offers many benefits.",
    summaryPoints: [
        "Reduces risk by avoiding vendor lock-in",
        "Modular architecture makes it future-proof as technlogies evolve",
        "Secures your company data and GDPR compliance",
        "Guide in best practices and a safe space to experiment with AI",
    ],
    projectButtonText: "The AI Platform",
    projectUrl: "#work/project/aiPlatform?from=quiz"
  },
  {
    id: 'design-system',
    slug: 'question-2',
    title: 'Design System',
    question: "Your product teams are struggling with inefficient frontend development and a misaligned product portfolio.\nWhat's the most effective first step to solve this?",
    options: [
        { text: 'Hire an agile coach', isCorrect: false, feedback: "While helpful, an agile coach addresses process, not the core issues of design and development inconsistency." },
        { text: 'Create a design system', isCorrect: true },
        { text: 'Reorganize your IT department', isCorrect: false, feedback: "Reorgs are needed for managerial, financial, strategic etc issues. They won't solve the underlying problem of inconsistent UI and redundant efforts in design and development." },
        { text: 'Hire a service designer', isCorrect: false, feedback: "A service designer looks at the entire customer journey, but don't provide foundational tools for product efficiancy and consistency." },
    ],
    resultText: 'A design system is the most effective way to boost consistency, quality and speed.',
    summaryPoints: [
        "Core design and code ready-to-copy - faster time to market",
        "Avoids expensive duplicate work",
        "Consistent user experience across your products",
        "Scalable and maintainable - making updates cheap and easy"
    ],
    projectButtonText: 'The Design System',
    projectUrl: "#work/project/design-system?from=quiz"
  },
  {
    id: 'dataCatalogue',
    slug: 'question-3',
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
    projectButtonText: "The Data Catalogue",
    projectUrl: "#work/project/dataCatalogue?from=quiz"
  },
  {
    id: 'aiDashboard',
    slug: 'question-4',
    title: 'AI Dashboard',
    question: "Your product teams are unsure which services to improve digitally in a huge organization with vast amounts of data.\nHow can they best prioritize what digital service to focus on next?",
    options: [
        { text: 'Have product teams consistantly read through customer service records', isCorrect: false, feedback: "This isn't scalable and is prone to individual bias, making it hard to see the bigger picture." },
        { text: 'Use AI to analyze records and present findings in an interactive dashboard', isCorrect: true },
        { text: 'Hire UX designers to work with customer service and users to gain qualitative data', isCorrect: false, feedback: "This is a very good second step, but in a huge organization it will be difficult to get the full picture with qualitative insights alone." },
        { text: 'Hire more customer service staff to handle requests', isCorrect: false, feedback: "This is a reactive solution that doesn't address the root cause of user struggles." },
    ],
    resultText: "Using AI to analyze user needs and a dashboard to visualize them empowers teams to make data-driven decisions.",
    summaryPoints: [
        "Identifies the real-time struggles of users",
        "Allows product teams to prioritize effectively",
        "Makes complex data accessible and understandable",
    ],
    projectButtonText: "The AI Dashboard",
    projectUrl: "#work/project/aiDashboard?from=quiz"
  },
  {
    id: 'aiVideoProduction',
    slug: 'question-5',
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
    projectButtonText: "The AI Video Production Tool",
    projectUrl: "#work/project/aiVideoProduction?from=quiz"
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
    url: '#work/project/aiPlatform?from=overview',
    isWIP: true,
    details: {
      problem: "A large Norwegian company needed to leverage generative AI without being locked into a single provider, while also ensuring the security of their internal data.",
      role: "As the lead product designer in a cross-functional team, I was responsible for the entire design process, from initial user research and concept development to creating high-fidelity, interactive prototypes and conducting usability testing.",
      solution: "The solution was 'FortelVia,' a secure, internal platform that acts as a gateway to multiple leading AI models. It allows employees to experiment safely and provides a centralized point for managing access and ensuring compliance.",
      impact: "The platform successfully decoupled the company from any single AI vendor, providing crucial flexibility. It established a secure environment for AI experimentation, which led to the development of three new internal tools within the first six months.",
      reflections: "This project underscored the importance of a modular architecture in a rapidly evolving field like AI. If I were to do it again, I would push for even earlier integration with the security team to streamline the compliance process from day one."
    }
  },
  {
    id: 'design-system',
    navText: 'Design System',
    cardTitle: 'Cohesive Design System',
    description: 'Co-led the UX strategy and development of a comprehensive design system that streamlined product creation and ensured brand consistency.',
    tags: ['UX', 'UI', 'Figma'],
    icon: <PuzzleIcon />,
    url: '#work/project/design-system?from=overview',
    isWIP: true,
    details: {
        problem: "Product teams were working in silos, leading to inconsistent user experiences across the product portfolio and duplicated design and development efforts, which slowed down time-to-market.",
        role: "I co-led the UX strategy and component design, working closely with developers to translate design concepts into reusable code. My role involved establishing a governance model, documenting usage guidelines, and advocating for adoption across the organization.",
        solution: "We developed a comprehensive design system with a shared library of reusable components, clear design guidelines, and robust documentation. This created a single source of truth for both designers and developers.",
        impact: "The design system reduced design and development time for new features by an estimated 30%. It also significantly improved UI consistency and quality across all digital products.",
        reflections: "The biggest challenge was not building the system, but fostering its adoption. In the future, I'd involve more teams in the initial component selection process to create a stronger sense of shared ownership from the start."
    }
  },
  {
    id: 'dataCatalogue',
    navText: 'Data Catalogue',
    cardTitle: 'Data Catalogue',
    description: 'Designing a user-centric data catalogue makes data discoverable and drives a data-driven culture.',
    tags: ['UX Research', 'UX', 'UI'],
    icon: <ChartIcon />,
    url: '#work/project/dataCatalogue?from=overview',
    isWIP: true,
    details: {
        problem: "Valuable data was fragmented across the organization, making it difficult for employees to find, trust, and utilize it effectively. This hindered the company's ability to become truly data-driven.",
        role: "I led the user research to understand the pain points of data consumers and producers. Based on these insights, I designed the information architecture, wireframes, and final UI for a centralized data catalogue.",
        solution: "The data catalogue provides a single, searchable interface for all company data, complete with clear documentation, data lineage, and quality metrics. It's designed to be intuitive for both technical and non-technical users.",
        impact: "The platform increased data discovery by 60% in the first quarter after launch and significantly improved employee trust in the available data, as measured by internal surveys.",
        reflections: "Early on, we underestimated the complexity of data lineage. A deeper initial collaboration with data engineers would have allowed us to present this information even more intuitively from the first version."
    }
  },
  {
    id: 'aiDashboard',
    navText: 'AI Dashboard',
    cardTitle: 'AI Insights Dashboard',
    description: "Designed a user-friendly dashboard for NAV, visualizing AI-driven insights on user needs. This empowered product teams to prioritize services based on real-time data of what users need the most.",
    tags: ['UX', 'UI', 'Data Visualization'],
    icon: <PieChartIcon />,
    url: '#work/project/aiDashboard?from=overview',
    isWIP: true,
    details: {
        problem: "With millions of customer interactions, NAV's product teams lacked a clear, data-driven way to identify and prioritize the most pressing user needs for digitalization.",
        role: "My role was to translate complex AI-driven data into an accessible and actionable dashboard. I conducted user interviews with product managers, designed the data visualizations, and created an interactive prototype that served as the blueprint for development.",
        solution: "The AI Insights Dashboard uses natural language processing to analyze customer service logs and surfaces the most common user struggles in real-time. Its intuitive interface allows product teams to filter by theme, urgency, and volume.",
        impact: "The dashboard enabled product teams to shift from a reactive to a proactive approach, leading to a 25% faster identification of high-impact digitalization opportunities.",
        reflections: "Initially, some visualizations were too complex. Iterating on the design based on user feedback was key to finding the right balance between data richness and clarity. Simpler is almost always better."
    }
  },
  {
    id: 'aiVideoProduction',
    navText: 'AI Video Production',
    cardTitle: 'MAI - Smart Video Production',
    description: "Led a product discovery for a major TV network to find how AI could optimize video production. The result was MAI – a tool that automates metadata creation to drastically speed up post-production.",
    tags: ['Product','UX', 'UI'],
    icon: <VideoEditorIcon />,
    url: '#work/project/aiVideoProduction?from=overview',
    isWIP: true,
    details: {
        problem: "A major TV network was struggling with a slow and manual post-production workflow. Editors spent countless hours logging footage and searching for specific clips, which delayed content delivery.",
        role: "As the lead product designer, I conducted in-depth interviews and observation sessions with video editors to map their workflow. I then led the ideation and prototyping of an AI-powered solution, culminating in a proof-of-concept that secured stakeholder buy-in.",
        solution: "MAI (Media AI) is a tool that uses AI to automatically analyze video footage, generating rich metadata such as speaker identification, topic detection, and scene descriptions. This makes the entire library searchable and dramatically accelerates the editing process.",
        impact: "The proof-of-concept demonstrated that MAI could reduce the time spent on logging and searching for footage by up to 70%, allowing editors to focus on the creative aspects of their work.",
        reflections: "The biggest learning was the importance of a human-in-the-loop design. While the AI is powerful, we quickly realized that giving editors the ability to easily review and correct AI-generated metadata was crucial for building trust and ensuring accuracy."
    }
  },
];

export const ME_CONTENT = {
  name: "Viljar Tornøe",
  paragraphs: [
    "My journey into design started with a simple observation: technology is often frustrating, and it doesn't have to be.",
    "Every innovation begins with an idea, and design is what gives an idea form, function, and life. From the initial spark to the final product, I can help at every step.",
    "When I'm not designing, you'll likely find me lost in a good movie, learning to sew, or working on a creative writing piece. Lately I've also gotten into CrossFit, but for now my creative muscles are far stronger.",
    "Feel free to reach out if you'd like to chat about design, technology, or your favorite film!"
  ],
  imageUrl: ProfilePicture,
  pixarUrl: PixarProfilePicture,
  email: "vito@netlight.com",
  phone: "+47 45 45 29 52",
  linkedinUrl: "https://www.linkedin.com/in/viljar-tornøe-872b2b15b"
};