// src/content.js

import React from 'react';
import { PuzzleIcon, ChartIcon, MagicIcon, PieChartIcon, VideoEditorIcon } from './components/uiElements';
import Accordion from './components/Accordion';
import DefinitionPopover from './components/DefinitionPopover';
import MetricBox from './components/MetricBox';
import ProfilePicture from './assets/profile.png';
import PixarProfilePicture from './assets/pixar-profile.png';
import LeanUXImage from './assets/aiplatform/lean_ux_en.webp'; 

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
                question: "Guess which design lessons the original design ignored?",
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
                question: "Which of these key design points should have been considered?",
                options: [
                    { text: "Dunning-Kruger effect", isCorrect: false, rationale: "The Dunning-Kruger effect is a cognitive bias where people with low ability at a task overestimate their competence, while those with high ability can underestimate their own. Not relevant to this question." },
                    { text: "Match Between System and the Real World", isCorrect: true, rationale: "The system failed to speak the users' language or align with the workflows of Norwegian clinical practice, making even simple tasks difficult. Qualitative insights and contextual user testing were clearly neglected." },
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
                    { text: "Status Quo Bias", isCorrect: false, rationale: "Status quo bias means a preference for things to stay the way they are, even if they are bad. In this case this bias was underestimated, and some core things could not be changed." }
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
    }/*,
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
    }*/
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
      { title: "Product Designer", mainText: "Imagine a company has a prime plot of land and a new business opportunity or challenge." },
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
        "Modular architecture makes it future-proof as technologies evolve",
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
    question: "Your product teams are struggling with inefficient frontend development and inconsistent design in the product portfolio.\nWhat's the most effective first step to solve this?",
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
    question: "Your organization has valuable data, but it's siloed, hard to find, and undocumented – working data-driven is difficult.\nHow do you empower your employees to discover and trust your data?",
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
        { text: 'Have product teams consistently read through customer service records', isCorrect: false, feedback: "This isn't scalable and is prone to individual bias, making it hard to see the bigger picture." },
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
  },
];


export const PROJECTPAGES = [
  {
    id: 'aiPlatform',
    impact: (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <MetricBox title="Adoption Rate" value="45%" subtext="within first six months" />
          <MetricBox title="User Engagement" value="10,000+" subtext="problems solved" />
          <MetricBox title="Sustained Growth" value="+5%" subtext="monthly" />
        </div>
        <p>The platform's launch had a significant and measurable impact on the Elvia, validating our approach and sparking widespread interest in AI. The product success gave workers the confidence and assurance they needed to adopt the technology. The platform generated such a strong pipeline of new ideas and use cases from employees that prioritization became the team's next major challenge.</p>
      </>
    ),
    problem: (
        <>
          <p className="mb-12">With GenAI, the interesting problems isn't for the users, it is for the business. Everyone wants to leverage GenAI to improve their business processes or products, but how to do this? As the largest electricity grid provider in Norway, Elvia wanted to find a way to kickoff AI initiatives internally.</p>

          <Accordion title="Data Security & User Compliance">
            <div className="flex flex-col md:flex-row items-center gap-6">

              <div className="w-full md:w-1/3 mx-auto max-w-sm md:order-last">
                <img 
                  src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHZlZGtreWc1ZDlwNHgyY2xnZ2p1MWQzZmtrMzI0dWxjeGkwMnU3eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sGa613aLoPzQB3YfSw/giphy.gif" 
                  alt="Man peeking at anothers phone" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="md:w-2/3 md:order-first">Using external AI services for internal documents or customer data poses a massive risk to both security and GDPR compliance. Relying on employees to navigate these complexities on their own is an unsustainable and unsafe model, as it places the burden of compliance on teams and individuals ill-equipped to handle it.</p>
            </div>
          </Accordion>

          <Accordion title="Rapidly Evolving Market">
            <div className="flex flex-col md:flex-row items-center gap-6">

              <div className="w-full md:w-1/3 mx-auto max-w-sm md:order-last">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXl1M2c3aTg4c2x6eWc3d3hidnp2cGxtdXhlZDF6Z3AzZXY3eDJzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JWybLzXs7Hn0JKhSji/giphy.gif" 
                    alt="Cartoon character working intensely on a computer" 
                    className="w-full h-auto transform scale-125"
                  />
                </div>
              </div>
              <p className="md:w-2/3 md:order-first">The GenAI landscape changes daily. New models are released all the time and older models gets phased out. Knowing what models are best for a company's domain context is impossible without experimentation. Aligning a GenAI strategy across the company is impossible if every team and worker uses seperate tools.</p>
            </div>
          </Accordion>
          
          <Accordion title="Vendor Lock-in">
            <div className="flex flex-col md:flex-row items-center gap-6">

              <div className="w-full md:w-1/3 mx-auto max-w-sm md:order-last">
                <div className="rounded-lg overflow-hidden">
                   <img 
                    src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDkxbDRkcXBjaWh2M2l1cXVjb3c2ZnFwZ3BpbWEwa281dm1rb2dndyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K9sJRNHyQp3iw/giphy.gif" 
                    alt="Read the fine print before signing" 
                    className="w-full h-auto transform scale-125"
                  />
                </div>
              </div>
              <p className="md:w-2/3 md:order-first">Committing to a single AI provider and building solutions around it is a strategic risk in the long term. It makes the company vulnerable to potential price hikes, changes in terms of service, or discontinuation of key models the company comes to rely on – introducing integration issues across the board.</p>
            </div>
          </Accordion>

          <Accordion title="Slow Development">
            <div className="flex flex-col md:flex-row items-center gap-6">

              <div className="w-full md:w-1/4 mx-auto max-w-sm md:order-last">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjRwbjh6NjNpaHRodmUxZ2F2M3Rnc3J0dWYzZTBmcDV0anAzZ2l4MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1xkMJIvxeKiDS/giphy.gif" 
                    alt="Sloth working slow" 
                    className="w-full h-auto transform scale-125"
                  />
                </div>
              </div>
              <p className="md:w-2/3 md:order-first">Many development teams used a project based delivery model, taking a long time before systems were completed and released. What could we learn by using GenAI deliberately in developing the product? Could we use this product as a pilot to challenge slow development cycles at Elvia?</p>
            </div>
          </Accordion>
        </>
      ),
    
    solution: (
        <>
          <p className="mb-12">FortelVia is a platform where you can chat with the best AI models on the market, presented as historical geniuses. This human-centric design anchors complex technology in familiar, anthropomorphic terms, making the experience uniquely intuitive and engaging.</p>

          <Accordion title="MVP - FortelVia Beta">
            <p>
              To quickly validate user interest with minimal investment, we developed an {' '}
              <DefinitionPopover
                acronym="MVP"
                title="Minimum Viable Product"
              >
                an early, basic version of a product that meets the minimum necessary requirements for use but can be adapted and improved in the future, especially after customer feedback.
              </DefinitionPopover>.
              This strategy allowed us to fast gauge user engagement on the core functionality before committing to a full-featured product.
            </p>
          </Accordion>
          
          <Accordion title="Product comparison">
              <p>Think of platforms like ChatGPT, Gemini or Anthropic. FortelVIA is very similar, but with some key differences. The solution is model agnostic so any model from any provider can easily be integrated into the same interface. Moreover, using enterprise agreements, none of users data were shared with the third-party providers. Our long term vision was a secure solution where users and product teams can create specialized agents they in turn could use, again and again in their workflows or products. To make it intuitive I made the deliberate choice of anthropomorphizing the AI models as assistants based on historical geniuses, with distinct personalities and skillsets. This made it easy for users to understand the strengths and weaknesses of each model, and making complicated technological terminology more approachable and easy to understand.</p>
          </Accordion>

          <Accordion title="Sandbox">
            <p>The company needed a secure, internal "sandbox" where employees could experiment with AI without exposing confidential information.</p>
          </Accordion>
        </>
      ),

    role: (
        <>
          <p className="mb-12">I wore many design hats at different phases during the development of the product. From strategy and concept development to the final high-fidelity prototypes.</p>
          <Accordion title="Product Design">
            <p>In the product role my focus was on both the short- and long term vision in regards to the product and the business goals. Through this I developed the creative concept and communication strategy that would make the product a success and would scale if the PoC was a success.</p>
          </Accordion>
          <Accordion title="UX Design">
            <p>My process was rooted in deep user understanding. I conducted user interviews and workshops to gather insights, which informed the creation of user personas, journey maps, and wireframes. I also ran iterative usability testing sessions to validate design decisions and refine the user experience.</p>
          </Accordion>
          <Accordion title="UI Design">
            <p>I was responsible for creating a clean, intuitive, and accessible user interface. This included developing a consistent visual language, designing pixel-perfect high-fidelity mockups and interactive prototypes in Figma, and creating a component library to ensure consistency and streamline development.</p>
          </Accordion>
          <Accordion title="Vibe Coder">
            <p>For some features I used AI to help develop parts of the front-end. One of our front-end developers was moved to another project, leaving us shorthanded. In collaboration with our remaining front-ender we could push the envelope, making more ambitious design and code that previously we would not have prioritized due to complexity.</p>
          </Accordion>
        </>
      ),
      designProcess: (
        <>
          <p className="mb-12">To tackle this project's unique challenges, we adopted a dynamic and evidence-driven design process. Here’s a look at our methodology, the techniques we used, and what we discovered along the way.</p>
          <Accordion title="Methodology - Lean UX">
            <img 
              src={LeanUXImage} 
              alt="Lean UX Cycle Diagram" 
              className="w-full h-auto rounded-lg mb-4"
            />
            <p>Speed was one of the main success metrics, and with no need for an extended product discovery or user research phase, Lean UX was the obvious choice. My confidence in AI and access to high-performing AI services gave me a strong starting point. Lean UX delivers fast results when risk is low and uncertainty is limited.</p>
          </Accordion>

          <Accordion title="Methods">
            <p>We employed a mix of techniques to gather insights and validate our designs:</p>
            {/* The change is in the className of this ul tag */}
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li>
                <b>AI-Powered Analysis:</b> Used internal AI tools to analyze existing documentation and identify initial user pain points and opportunities.
              </li>
              <li>
                <b>Stakeholder Workshops:</b> Ran collaborative sessions to align on business goals, define success metrics, and map out technical constraints.
              </li>
              <li>
                <b>User Interviews:</b> Conducted interviews with potential users to understand their current workflows and attitudes towards AI.
              </li>
              <li>
                <b>Iterative Usability Testing:</b> Tested low and high-fidelity prototypes with users to continuously refine the experience.
              </li>
            </ul>
          </Accordion>

          <Accordion title="Key Findings">
            <p>Our research and testing uncovered several critical insights that directly shaped the product:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Finding #1: Users were concerned about...</li>
              <li>Finding #2: The most requested feature was...</li>
              <li>Finding #3: A surprising discovery was that...</li>
            </ul>
          </Accordion>
        </>
      ),
    reflections: "This project underscored the importance of a modular architecture in a rapidly evolving field like AI. If I were to do it again, I would push for even earlier integration with the security team to streamline the compliance process from day one."
  },
  {
    id: 'design-system',
    impact: (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <MetricBox title="Design & Frontend" value="-40%" subtext="for new features" />
          <MetricBox title="Design Consistency" value="70%" subtext="across all products" />
          <MetricBox title="Time to Market" value="+30%" subtext="faster deployment" />
        </div>
        <p>
          The design system reduced design and development significantly. It also greatly improved UI consistency and quality across all digital products, leading to a more cohesive user experience and faster time to market. Check out:&nbsp;
          <a 
            href="https://design.elvia.io" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-semibold text-primary dark:text-secondary hover:underline"
          >
            The Elvia Design System
          </a>
        </p>
      </>
    ),
    problem: (
        <>
          <p className="mb-12">After a big merger Elvia needed to develop all new common work interfaces to join the two companies. But teams were working in silos, leading to inconsistent user experiences across the product portfolio and duplicated design and development efforts.</p>

          <Accordion title="Inconsistent User Experience">
            <div className="flex flex-col md:flex-row items-center gap-6">

              <div className="w-full md:w-1/3 mx-auto max-w-sm md:order-last">
                <img 
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnNpcDE3d3V3d2RlNzZqOTR6Y2Vja3ZjcXFkbnE3Nzc3aGgwZndxayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/citBl9yPwnUOs/giphy.gif" 
                  alt="Cartoon character struggeling to navigate the interface" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="md:w-2/3 md:order-first">Without a centralized design language, each product had a different look and feel. This fragmented the user journey, and forced users to constantly relearn interfaces — creating significant costs in training and support.</p>
            </div>
          </Accordion>

          <Accordion title="Duplicate & Redundant Work">
            <div className="flex flex-col md:flex-row items-center gap-6">

              <div className="w-full md:w-1/3 mx-auto max-w-sm md:order-last">
                <img 
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnAyaHA2NjUxYTk2ZzV4ZXpxNXZ1ZWV4NDA0bXVwMzdlc3kweDR1OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BDIv0n0pGYIT2YwnVx/giphy.gif" 
                  alt="Identical but not the same" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="md:w-2/3 md:order-first">Teams were designing and developing the similar components from scratch for different projects, wasting valuable time and resources. This redundancy made it difficult to maintain and update products efficiently.</p>
            </div>
          </Accordion>

          <Accordion title="Slow Time-to-Market">
            <div className="flex flex-col md:flex-row items-center gap-6">

              <div className="w-full md:w-1/3 mx-auto max-w-sm md:order-last">
                <img 
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2Q4NXBvZ291YTJ3OWphNzEwOGZveTV2MmRkYms3bjhmd3h4c2lubCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LqBvylC85KoLHONEEv/giphy.gif" 
                  alt="Slow snail incoming..." 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="md:w-2/3 md:order-first">The lack of reusable components and clear guidelines meant that every new feature required a lengthy design and development cycle, delaying the launch of new products and updates.</p>
            </div>
          </Accordion>

          <Accordion title="Accessibility Issues">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/3 mx-auto max-w-sm md:order-last">
                <img 
                  src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2w1MGlwcGNrNnBoZXhwY3BoNnNxenR2NGQ4ZW4wMGV0ZjBydXg3NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0ozmBje9bTxfPlKO7m/giphy.gif" 
                  alt="Accessibility for everyone..." 
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* --- THE FIX IS ON THIS LINE --- */}
              <p className="md:w-2/3 md:order-first">
                Accessibility needs are often overlooked in digital development. The{' '}
                <DefinitionPopover
                  acronym="WCAG"
                  title="Web Content Accessibility Guidelines"
                >
                  WCAG is a globally recognized set of recommendations for making web content, digital services, and applications accessible to all people, including those with various disabilities.
                </DefinitionPopover>{' '}
                is a field in its own right and too often not made a top priority in busy development cycles. And at Elvia this was no exception.
              </p>
            </div>
          </Accordion>

          <Accordion title="Hidden branding">
            <div className="flex flex-col md:flex-row items-center gap-6">

              <div className="w-full md:w-1/3 mx-auto max-w-sm md:order-last">
                <img 
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWltZzNkZHlhcTZheXc5a3M2eHFtdHB4OGRyNXk3ZXZhbmZybHNuaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aWxbEGCqkiZFK/giphy.gif" 
                  alt="Classified information" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="md:w-2/3 md:order-first">Elvia invested in a new brand, but very few people knew where to find the brand guidelines. The agency who developed the brand created a website to document the brand, but charged an exorbitant amount of money each year just to host the site.</p>
            </div>
          </Accordion>
        </>
      ),
    role: (
        <>
          <p className="mb-12">I co-led the UX strategy and component design, working closely with developers to translate design concepts into reusable code. My role involved establishing a governance model, documenting usage guidelines, and advocating for adoption across the organization.</p>
          <Accordion title="UX Strategy & Governance">
            <p>I helped define the principles and standards that would guide the design system, ensuring it aligned with both user needs and business goals. This included creating a contribution and maintenance model to keep the system alive and relevant.</p>
          </Accordion>
          <Accordion title="Component Design & Documentation">
            <p>I designed and documented a wide range of reusable components, from basic elements like buttons and inputs to more complex patterns. Each component was designed with accessibility, usability, and brand consistency in mind.</p>
          </Accordion>
        </>
      ),
      designProcess: (
        <>
          <p className="mb-12">Our process was centered around collaboration and iteration, ensuring the design system met the needs of all teams.</p>
          <Accordion title="Methodology - Atomic Design">
            <p>We adopted the Atomic Design methodology to break down interfaces into their fundamental components, making them easier to build, test, and reuse. This approach allowed us to create a flexible and scalable system that could adapt to the needs of different products.</p>
          </Accordion>

          <Accordion title="Methods">
            <p>We employed a mix of techniques to gather insights and validate our designs:</p>
            {/* The change is in the className of this ul tag */}
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li>
                <b>AI-Powered Analysis:</b> Used internal AI tools to analyze existing documentation and identify initial user pain points and opportunities.
              </li>
              <li>
                <b>Stakeholder Workshops:</b> Ran collaborative sessions to align on business goals, define success metrics, and map out technical constraints.
              </li>
              <li>
                <b>User Interviews:</b> Conducted interviews with potential users to understand their current workflows and attitudes towards AI.
              </li>
              <li>
                <b>Iterative Usability Testing:</b> Tested low and high-fidelity prototypes with users to continuously refine the experience.
              </li>
            </ul>
          </Accordion>
        </>
      ),
    solution: (
        <>
          <p className="mb-12">We developed a comprehensive design system with a shared library of reusable components, clear design guidelines, and robust documentation. This created a single source of truth for both designers and developers.</p>
          <Accordion title="Component Library">
            <p>We created a library of reusable components in Figma and React, allowing teams to quickly build consistent and high-quality interfaces.</p>
          </Accordion>
          <Accordion title="Documentation & Guidelines">
            <p>We developed clear and comprehensive documentation with usage guidelines, best practices, and code examples to ensure that the design system was easy to understand and use.</p>
          </Accordion>
        </>
      ),
    reflections: "The biggest challenge was not building the system, but fostering its adoption. In the future, I'd involve more teams in the initial component selection process to create a stronger sense of shared ownership from the start."
  },
  {
    id: 'dataCatalogue',
    impact: (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <MetricBox title="Adoption Rate" value="80%" subtext="of target teams within 3 months" />
          <MetricBox title="Data Discovery" value="+60%" subtext="increase in successful searches" />
          <MetricBox title="Time Saved" value="-35%" subtext="time to find the right dataset" />
        </div>
        <p>The data catalogue transformed how teams discover and trust organizational data. The high adoption rate validated our user-centric approach, while the improved discovery metrics showed we successfully addressed the core pain points of data fragmentation and accessibility.</p>
      </>
    ),
    problem: (
      <>
        <p className="mb-12">Valuable data was fragmented across the organization, making it difficult for employees to find, trust, and utilize it effectively. This hindered the company's ability to become truly data-driven.</p>
  
        <Accordion title="Hard to Find or Discover Data">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 mx-auto max-w-sm md:order-last">
              <img 
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2w1MGlwcGNrNnBoZXhwY3BoNnNxenR2NGQ4ZW4wMGV0ZjBydXg3NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0ozmBje9bTxfPlKO7m/giphy.gif" 
                alt="Person searching through scattered documents" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="md:w-2/3 md:order-first">Multiple sources, inconsistent naming, and scattered documentation made finding the right data a time-consuming treasure hunt. Teams spent hours searching through different systems and asking colleagues for help.</p>
          </div>
        </Accordion>
  
        <Accordion title="Low Trust in Data">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 mx-auto max-w-sm md:order-last">
              <img 
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW15MHV6bnU4aXdhbDA0YXkzOHpzYjNpMnJlc214bDBzc2EycnBqbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ANbD1CCdA3iI8/giphy.gif" 
                alt="Person questioning data reliability" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="md:w-2/3 md:order-first">Missing owners, unclear freshness, and unknown quality/provenance made teams hesitant to use available data. Without trust signals, every dataset required extensive validation before use.</p>
          </div>
        </Accordion>
  
        <Accordion title="Siloed Knowledge">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 mx-auto max-w-sm md:order-last">
              <img 
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnc1bDVzY3FibnZsOXZ4djR3MzZiN2FsMmI1dHlrZjJpazN6ZHk4cyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/12eSZ21FAlxfpK/giphy.gif" 
                alt="Experts answering repeated questions" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="md:w-2/3 md:order-first">Experts were constantly answering the same questions repeatedly in Slack and Teams. This created bottlenecks and prevented knowledge from being shared systematically across the organization.</p>
          </div>
        </Accordion>
  
        <Accordion title="Slow Onboarding">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 mx-auto max-w-sm md:order-last">
              <img 
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGMxMjFpOGQ2cHkxbjhxOG5qanVneW9oZTBoZWRjNzMzdno1ejI0dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7btO8WLQFyw2q0Qo/giphy.gif" 
                alt="New employee struggling to find information" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="md:w-2/3 md:order-first">New analysts spent weeks figuring out where data lives and what it means. The lack of centralized documentation and clear ownership made onboarding unnecessarily complex and time-consuming.</p>
          </div>
        </Accordion>
  
        <Accordion title="Compliance Risk">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 mx-auto max-w-sm md:order-last">
              <img 
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWE3cXNmbWptZ2NnaTRpc2p2aGVmOTE2NHNxZTVndG1kOHM5cDJpMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lubyxjNyY7RaebH6r3/giphy.gif" 
                alt="Security and compliance concerns" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="md:w-2/3 md:order-first">Sensitive datasets existed without clear access policies and ownership, creating compliance risks. Teams couldn't easily understand who should have access to what data, leading to potential security gaps.</p>
          </div>
        </Accordion>
      </>
    ),
    solution: (
      <>
        <p className="mb-12">The data catalogue provides a single, searchable interface for all company data, complete with clear documentation, ownership, and quality indicators. It's designed to be intuitive for both technical and non-technical users.</p>
  
        <Accordion title="Unified Catalogue">
          <p>One searchable place for datasets, owners, access, and quality. Users can find what they need through business-friendly search terms and filters, eliminating the need to navigate multiple systems.</p>
        </Accordion>
        
        <Accordion title="Trust by Design">
          <p>Clear ownership, SLA/freshness indicators, and automated data quality checks (where possible) provided the data with a grade, helping users quickly assess data reliability. Trust signals are prominently displayed to reduce uncertainty.</p>
        </Accordion>
  
        <Accordion title="Documentation">
          <p>A multi-layered approach to documentation. Most important documentation could be found in the data catalogue, but the teams could add links to their confluence pages, Ardoq, CLI or other information they deemed relevant.</p>
        </Accordion>
  
        <Accordion title="Access Clarity">
          <p>Request access directly from the dataset page with policy hints and turnaround expectations. This streamlines the access request process and sets clear expectations for users.</p>
        </Accordion>
      </>
    ),
    role: (
      <>
        <p className="mb-12">I led the user research to understand the pain points of data consumers and producers. Based on these insights, I designed the information architecture, wireframes, and final UI for a centralized data catalogue.</p>
        <Accordion title="Product Design">
          <p>Defined success metrics, MVP scope, and prioritization with stakeholders (Data Platform, Security, BI). Focused on creating a solution that addressed both user needs and organizational requirements.</p>
        </Accordion>
        <Accordion title="UX Research">
          <p>Conducted extensive user interviews with analysts and data consumers. Created journey maps for "Find, Trust, Use" data flow and spent significant time researching the data landscape to understand user workflows.</p>
        </Accordion>
        <Accordion title="UX/UI Design">
          <p>Designed information architecture, search UX, card/tile layout, dataset page, owner pages, and request flows. Ensured the interface was intuitive for both technical and non-technical users.</p>
        </Accordion>
        <Accordion title="Design Ops">
          <p>Leveraged component reuse with the Design System, creating patterns for cards, tabs, badges, and indicators. This ensured consistency and accelerated development.</p>
        </Accordion>
      </>
    ),
    designProcess: (
      <>
        <p className="mb-12">Our process was centered around understanding the complex data landscape and user needs through extensive research and iterative design.</p>
        <Accordion title="Methodology - Dual-track">
          <p>We adopted a dual-track approach with Discovery and Delivery running in parallel. Discovery focused on problem framing, job stories, and value mapping, while Delivery involved iterative prototypes, usability testing, and rollout by team cohorts.</p>
        </Accordion>
  
        <Accordion title="Methods">
          <p>We employed a mix of techniques to gather insights and validate our designs:</p>
          <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
            <li>
              <b>Stakeholder Workshops:</b> Collaborative sessions with Data Platform, Security, and BI teams to align on goals and constraints.
            </li>
            <li>
              <b>Extensive User Interviews:</b> Deep conversations with analysts and data consumers to understand their daily workflows and pain points.
            </li>
            <li>
              <b>Deep Research:</b> Significant time spent understanding the data landscape and user workflows as a non-developer, translating technical complexity into user-friendly solutions.
            </li>
            <li>
              <b>Content Modelling:</b> Structured the information architecture around dataset > fields > ownership > policies.
            </li>
            <li>
              <b>Usability Testing:</b> Tested search, filters, and dataset detail page with real users to continuously refine the experience.
            </li>
          </ul>
        </Accordion>
  
        <Accordion title="Key Findings">
          <p>Our research uncovered several critical insights that directly shaped the product:</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>"Owner and last updated" are the most critical trust signals for users.</li>
            <li>People search by business terms, not technical names—synonyms matter significantly.</li>
            <li>Top queries cluster around a few themes—curated Collections accelerate value delivery.</li>
          </ul>
        </Accordion>
      </>
    ),
    reflections: "Early on, we underestimated the complexity of data lineage. A deeper initial collaboration with data engineers would have allowed us to present this information even more intuitively from the first version. The biggest learning was the importance of spending time as a non-developer to truly understand the data landscape and translate technical complexity into user-friendly solutions."
  },
  {
    id: 'aiDashboard',
    problem: "With millions of customer interactions, NAV's product teams lacked a clear, data-driven way to identify and prioritize the most pressing user needs for digitalization.",
    role: "My role was to translate complex AI-driven data into an accessible and actionable dashboard. I conducted user interviews with product managers, designed the data visualizations, and created an interactive prototype that served as the blueprint for development.",
    solution: "The AI Insights Dashboard uses natural language processing to analyze customer service logs and surfaces the most common user struggles in real-time. Its intuitive interface allows product teams to filter by theme, urgency, and volume.",
    impact: "The dashboard enabled product teams to shift from a reactive to a proactive approach, leading to a 25% faster identification of high-impact digitalization opportunities.",
    reflections: "Initially, some visualizations were too complex. Iterating on the design based on user feedback was key to finding the right balance between data richness and clarity. Simpler is almost always better."
  },
  {
    id: 'aiVideoProduction',
    problem: "A major TV network was struggling with a slow and manual post-production workflow. Editors spent countless hours logging footage and searching for specific clips, which delayed content delivery.",
    role: "As the lead product designer, I conducted in-depth interviews and observation sessions with video editors to map their workflow. I then led the ideation and prototyping of an AI-powered solution, culminating in a proof-of-concept that secured stakeholder buy-in.",
    solution: "MAI (Media AI) is a tool that uses AI to automatically analyze video footage, generating rich metadata such as speaker identification, topic detection, and scene descriptions. This makes the entire library searchable and dramatically accelerates the editing process.",
    impact: "The proof-of-concept demonstrated that MAI could reduce the time spent on logging and searching for footage by up to 70%, allowing editors to focus on the creative aspects of their work.",
    reflections: "The biggest learning was the importance of a human-in-the-loop design. While the AI is powerful, we quickly realized that giving editors the ability to easily review and correct AI-generated metadata was crucial for building trust and ensuring accuracy."
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