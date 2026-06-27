const en = {
  meta: { code: "en", name: "English", flag: "🇬🇧" },
  nav: {
    features: "Features",
    calculator: "Calculator",
    sleep: "Sleep",
    faq: "FAQ",
    download: "Download",
  },
  hero: {
    badge: "Science-based caffeine tracking",
    titleA: "Know exactly how much",
    titleAccent: "caffeine",
    titleB: "is in your body right now.",
    sub: "Caffy tracks every coffee, tea and energy drink, then models your personal metabolism in real time — so you protect your sleep and feel in control.",
    primary: "Download on the App Store",
    secondary: "Try the calculator",
    rating: "Loved by people who love their sleep",
  },
  calc: {
    eyebrow: "Live demo",
    title: "Watch caffeine move through your body",
    subtitle:
      "Add a drink, drag your bedtime, and see how much caffeine is still in your system when your head hits the pillow.",
    addLabel: "Add a drink",
    profileLabel: "Your metabolism",
    bedtimeLabel: "Bedtime",
    atBedtime: "At bedtime",
    peak: "Peak today",
    now: "Right now",
    reset: "Reset",
    verdictSafe: "Great — caffeine won’t stand between you and deep sleep.",
    verdictCaution: "Borderline — this may delay or lighten your sleep.",
    verdictPoor: "Too high — expect restless, broken sleep tonight.",
    note: "A simplified model for demonstration. The Caffy app personalizes the curve to your age, body and sensitivity.",
    profiles: {
      average: "Average",
      sensitive: "Sensitive",
      fast: "Fast",
      smoker: "Smoker",
      pregnant: "Pregnant",
    },
    mg: "mg",
  },
  gallery: {
    eyebrow: "A closer look",
    title: "Designed to be glanced at, not studied.",
    shots: [
      "Live metabolism",
      "Sleep protection",
      "Trends & detox",
      "Weekly AI insights",
      "Your caffeine week",
    ],
  },
  features: {
    eyebrow: "Built around your body",
    title: "Not another timer. A model of you.",
    items: {
      realtime: {
        title: "Real-time caffeine level",
        body: "A personalized half-life model shows exactly how much caffeine is active in your bloodstream — not a generic countdown, but a curve tuned to your body.",
      },
      sleep: {
        title: "A sleep score that warns you",
        body: "Caffy knows your bedtime and tells you, before that last cup, whether it will cost you deep sleep tonight. Quiet nudges, not nagging.",
      },
      detox: {
        title: "Cut back without crashing",
        body: "Guided caffeine detox programs step you down gradually, so you keep your energy and lose the dependence — at a pace your body can handle.",
      },
      insights: {
        title: "Weekly AI insights",
        body: "Every week Caffy spots the patterns you can’t — your real triggers, your worst hours, the habits quietly shaping your sleep.",
      },
      widgets: {
        title: "Widgets & Apple Health",
        body: "Glance at your current level from the Home and Lock Screen, and sync seamlessly with Apple Health. Your data stays yours.",
      },
    },
  },
  science: {
    eyebrow: "The science",
    title: "Honest numbers, not vibes.",
    body: "Caffy models caffeine with a pharmacokinetic half-life curve and a 45-minute absorption phase, adjusted for the factors that actually change how you metabolize it — age, sensitivity, pregnancy, smoking and more.",
    formula: "C(t) = C₀ × 0.5^(t / t½)",
    sources: "Models informed by FDA, EFSA, NIH and the Sleep Foundation.",
    stats: {
      halflife: "Average caffeine half-life",
      halflifeVal: "~5–6 h",
      absorption: "Time to peak absorption",
      absorptionVal: "45 min",
      safe: "Safe daily limit (adults)",
      safeVal: "400 mg",
    },
  },
  faq: {
    eyebrow: "Questions",
    title: "Everything you might be wondering",
    items: [
      {
        q: "How does Caffy know how much caffeine I have left?",
        a: "Caffy applies a pharmacokinetic half-life model to every drink you log and adjusts the curve to your personal profile — age, body, sensitivity and factors like pregnancy or smoking. The result is a live estimate of active caffeine, not a fixed timer.",
      },
      {
        q: "Will it really help my sleep?",
        a: "Caffy calculates how much caffeine will still be active at your bedtime and gives you a sleep score before you drink. Knowing that your 4pm coffee leaves 90mg in your system at midnight is usually all it takes to change the decision.",
      },
      {
        q: "Which drinks can I track?",
        a: "Coffee in every form, teas, energy drinks, soda, matcha and more — each with realistic caffeine content. You can also create custom drinks with your own amounts.",
      },
      {
        q: "Is my data private?",
        a: "Yes. Your logs are yours. Apple Health access stays on your device, and we never sell your data. See the privacy policy for details.",
      },
      {
        q: "Is Caffy free?",
        a: "Caffy is free to download with core tracking included. Premium unlocks advanced insights, detox programs and the full metabolism model.",
      },
    ],
  },
  cta: {
    title: "Take control of your caffeine.",
    sub: "Better energy by day. Deeper sleep by night. It starts with knowing your number.",
    button: "Download on the App Store",
  },
  footer: {
    tagline: "Real-time caffeine tracking that protects your sleep.",
    product: "Product",
    company: "Company",
    legal: "Legal",
    privacy: "Privacy Policy",
    support: "Support",
    rights: "All rights reserved.",
    madeWith: "Made for people who love both coffee and sleep.",
  },
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: June 2026",
    backHome: "Back to home",
    intro:
      "Caffy is built privacy-first. This policy explains what we collect, why, and the control you have. In short: your caffeine data is yours, and we don’t sell it.",
    sections: [
      {
        h: "What we collect",
        p: "The caffeine entries you log (drink type, amount, time), your profile settings (such as age range and sensitivity used to personalize the model), and basic app preferences like language and theme.",
      },
      {
        h: "Authentication",
        p: "Caffy uses anonymous authentication by default, so you can start immediately without an account. If you choose to sign in with Apple, your identity is linked securely to keep your data across devices.",
      },
      {
        h: "Apple Health",
        p: "If you grant access, Caffy can read relevant health data to improve personalization. This access is optional, processed on your device, and can be revoked anytime in the Health app.",
      },
      {
        h: "How your data is stored",
        p: "Your data is stored locally on your device and synced securely to our backend so it’s available across your devices. Access is protected by row-level security — only you can read your rows.",
      },
      {
        h: "What we don’t do",
        p: "We do not sell your personal data. We do not show third-party advertising based on your caffeine habits.",
      },
      {
        h: "Your control",
        p: "You can edit or delete any entry, and you can request deletion of your account and associated data at any time from within the app or by contacting us.",
      },
      {
        h: "Contact",
        p: "Questions about privacy? Email us at [YOUR_EMAIL] and we’ll get back to you.",
      },
    ],
  },
  support: {
    title: "Support",
    backHome: "Back to home",
    intro:
      "Need a hand? Most answers are below. If you’re still stuck, we read every message.",
    contactTitle: "Contact us",
    contactBody:
      "Email us and we’ll usually reply within 1–2 business days.",
    emailButton: "Email support",
    email: "[YOUR_EMAIL]",
    topicsTitle: "Common topics",
    topics: [
      {
        h: "Getting started",
        p: "Open Caffy, log your first drink from the home screen, and set your bedtime in settings so your sleep score works from day one.",
      },
      {
        h: "Personalizing the model",
        p: "Add your age range, sensitivity and any relevant factors in your profile so the caffeine curve reflects how your body actually works.",
      },
      {
        h: "Premium & billing",
        p: "Manage or cancel your subscription anytime in your Apple ID settings. Premium unlocks insights, detox programs and the full model.",
      },
      {
        h: "Restoring purchases",
        p: "Reinstalled or switched devices? Use “Restore Purchases” in settings to bring your premium access back.",
      },
    ],
  },
};

export default en;
export type Dict = typeof en;
