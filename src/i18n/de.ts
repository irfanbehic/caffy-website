import type { Dict } from "./en";

const de: Dict = {
  meta: { code: "de", name: "Deutsch", flag: "🇩🇪" },
  seo: {
    title: "Caffy: Koffein- & Schlaf-Tracker",
    description:
      "Caffy ist ein Koffein- & Schlaf-Tracker für iPhone. Sieh in Echtzeit, wie viel Koffein in deinem Körper ist, tracke Kaffee, Tee & Energydrinks und schütze deinen Schlaf.",
  },
  nav: {
    features: "Funktionen",
    calculator: "Rechner",
    sleep: "Schlaf",
    faq: "FAQ",
    download: "Laden",
  },
  hero: {
    badge: "Wissenschaftliches Koffein-Tracking",
    titleA: "Wisse genau, wie viel",
    titleAccent: "Koffein",
    titleB: "gerade in deinem Körper ist.",
    sub: "Caffy erfasst jeden Kaffee, Tee und Energydrink und modelliert deinen Stoffwechsel in Echtzeit – so schützt du deinen Schlaf und behältst die Kontrolle.",
    primary: "Im App Store laden",
    secondary: "Rechner testen",
    rating: "Geliebt von allen, die guten Schlaf lieben",
  },
  calc: {
    eyebrow: "Live-Demo",
    title: "Sieh, wie Koffein durch deinen Körper wandert",
    subtitle:
      "Füge ein Getränk hinzu, ziehe deine Schlafenszeit und sieh, wie viel Koffein noch in dir steckt, wenn dein Kopf das Kissen berührt.",
    addLabel: "Getränk hinzufügen",
    added: "Hinzugefügt",
    remove: "Entfernen",
    profileLabel: "Dein Stoffwechsel",
    bedtimeLabel: "Schlafenszeit",
    atBedtime: "Beim Schlafen",
    peak: "Höchstwert heute",
    now: "Jetzt gerade",
    reset: "Zurücksetzen",
    verdictSafe: "Perfekt – Koffein steht deinem Tiefschlaf nicht im Weg.",
    verdictCaution: "Grenzwertig – das könnte deinen Schlaf verzögern oder stören.",
    verdictPoor: "Zu hoch – erwarte heute Nacht unruhigen, gebrochenen Schlaf.",
    note: "Ein vereinfachtes Modell zur Veranschaulichung. Die Caffy-App passt die Kurve an dein Alter, deinen Körper und deine Empfindlichkeit an.",
    profiles: {
      average: "Durchschnitt",
      sensitive: "Empfindlich",
      fast: "Schnell",
      smoker: "Raucher",
      pregnant: "Schwanger",
    },
    drinks: {
      espresso: "Espresso",
      coffee: "Kaffee",
      energy: "Energy",
      tea: "Tee",
      matcha: "Matcha",
      cola: "Cola",
    },
    mg: "mg",
    sleep: {
      score: "Schlafscore",
      impactLabel: "Einfluss auf den Schlaf",
      readiness: { good: "Gut", fair: "Mäßig", poor: "Schwach", critical: "Kritisch" },
      impact: { minimal: "Minimal", mild: "Leicht", elevated: "Erhöht", high: "Hoch" },
      rec: {
        good: "Du bist bestens für den Schlaf — keine Änderung nötig.",
        fair: "Mäßiges Koffein zur Schlafenszeit. Sollte ok sein, aber nicht mehr.",
        poor: "Hohes Koffein zur Schlafenszeit erwartet. Nichts mehr trinken — leichte Bewegung hilft.",
        critical: "Dein Schlaf wird wohl stark beeinträchtigt. Früher schlafen und morgen weniger Koffein.",
      },
    },
  },
  viz: {
    sleepScore: "Schlafscore",
    stepDown: "7-Tage-Reduktion",
    weeklyInsight: "Diese Woche",
    insightLine: "Du schläfst besser an Tagen, an denen du vor 14 Uhr aufhörst.",
    activeNow: "Jetzt aktiv",
    untilSafe: "Schlaf-sicher in",
    health: "Mit Apple Health synchronisiert",
  },
  gallery: {
    eyebrow: "Genauer betrachtet",
    title: "Alles Wichtige auf einen Blick.",
    shots: [
      "Live-Stoffwechsel",
      "Schlafschutz",
      "Trends & Detox",
      "Wöchentliche KI-Insights",
      "Deine Koffein-Woche",
    ],
  },
  features: {
    eyebrow: "Auf deinen Körper abgestimmt",
    title: "Ein Modell, wie dein Körper Koffein verarbeitet.",
    items: {
      realtime: {
        title: "Koffeinspiegel in Echtzeit",
        body: "Ein personalisiertes Halbwertszeit-Modell zeigt genau, wie viel Koffein in deinem Blut aktiv ist – kein generischer Countdown, sondern eine auf dich abgestimmte Kurve.",
      },
      sleep: {
        title: "Ein Schlafscore, der dich warnt",
        body: "Caffy kennt deine Schlafenszeit und sagt dir vor der letzten Tasse, ob sie dich heute Tiefschlaf kostet. Leise Hinweise statt Nörgeln.",
      },
      detox: {
        title: "Reduzieren ohne Absturz",
        body: "Geführte Koffein-Detox-Programme reduzieren schrittweise – du behältst deine Energie und verlierst die Abhängigkeit, in einem Tempo, das dein Körper verträgt.",
      },
      insights: {
        title: "Wöchentliche KI-Insights",
        body: "Jede Woche erkennt Caffy die Muster, die du nicht siehst – deine echten Auslöser, deine schlimmsten Stunden, die Gewohnheiten, die deinen Schlaf prägen.",
      },
      widgets: {
        title: "Widgets & Apple Health",
        body: "Sieh deinen aktuellen Wert auf einen Blick vom Home- und Sperrbildschirm und synchronisiere nahtlos mit Apple Health. Deine Daten bleiben deine.",
      },
    },
  },
  science: {
    eyebrow: "Die Wissenschaft",
    title: "Die Mathematik hinter jeder Zahl.",
    body: "Caffy modelliert Koffein mit einer pharmakokinetischen Halbwertszeit-Kurve und einer 45-minütigen Aufnahmephase, angepasst an die Faktoren, die deinen Stoffwechsel wirklich verändern – Alter, Empfindlichkeit, Schwangerschaft, Rauchen und mehr.",
    formula: "C(t) = C₀ × 0.5^(t / t½)",
    sources: "Modelle auf Basis von FDA, EFSA, NIH und Sleep Foundation.",
    stats: {
      halflife: "Durchschnittliche Halbwertszeit",
      halflifeVal: "~5–6 Std",
      absorption: "Zeit bis zur Spitzenaufnahme",
      absorptionVal: "45 Min",
      safe: "Sicheres Tageslimit (Erwachsene)",
      safeVal: "400 mg",
    },
  },
  faq: {
    eyebrow: "Fragen",
    title: "Alles, was du dich fragen könntest",
    items: [
      {
        q: "Woher weiß Caffy, wie viel Koffein ich noch habe?",
        a: "Caffy wendet auf jedes erfasste Getränk ein pharmakokinetisches Halbwertszeit-Modell an und passt die Kurve an dein Profil an – Alter, Körper, Empfindlichkeit und Faktoren wie Schwangerschaft oder Rauchen. Das Ergebnis ist eine Live-Schätzung des aktiven Koffeins, kein fester Timer.",
      },
      {
        q: "Hilft es wirklich meinem Schlaf?",
        a: "Caffy berechnet, wie viel Koffein zu deiner Schlafenszeit noch aktiv ist, und gibt dir vor dem Trinken einen Schlafscore. Zu wissen, dass dein Kaffee um 16 Uhr um Mitternacht noch 90 mg hinterlässt, reicht meist, um die Entscheidung zu ändern.",
      },
      {
        q: "Welche Getränke kann ich erfassen?",
        a: "Kaffee in jeder Form, Tees, Energydrinks, Limonade, Matcha und mehr – jeweils mit realistischem Koffeingehalt. Du kannst auch eigene Getränke mit eigenen Mengen anlegen.",
      },
      {
        q: "Sind meine Daten privat?",
        a: "Ja. Deine Einträge gehören dir. Der Apple-Health-Zugriff bleibt auf deinem Gerät, und wir verkaufen deine Daten nie. Details in der Datenschutzerklärung.",
      },
      {
        q: "Ist Caffy kostenlos?",
        a: "Caffy ist kostenlos mit grundlegendem Tracking. Premium schaltet erweiterte Insights, Detox-Programme und das vollständige Stoffwechselmodell frei.",
      },
    ],
  },
  cta: {
    title: "Übernimm die Kontrolle über dein Koffein.",
    sub: "Mehr Energie am Tag. Tieferer Schlaf in der Nacht. Es beginnt damit, deine Zahl zu kennen.",
    button: "Im App Store laden",
  },
  footer: {
    tagline: "Echtzeit-Koffein-Tracking, das deinen Schlaf schützt.",
    product: "Produkt",
    company: "Unternehmen",
    legal: "Rechtliches",
    privacy: "Datenschutz",
    support: "Support",
    rights: "Alle Rechte vorbehalten.",
    madeWith: "Gemacht für Menschen, die Kaffee und Schlaf lieben.",
  },
  privacy: {
    title: "Datenschutzerklärung",
    updated: "Zuletzt aktualisiert: Juni 2026",
    backHome: "Zurück zur Startseite",
    intro:
      "Caffy ist datenschutzfreundlich gebaut. Diese Erklärung beschreibt, was wir erfassen, warum, und welche Kontrolle du hast. Kurz: Deine Koffeindaten gehören dir, und wir verkaufen sie nicht.",
    sections: [
      {
        h: "Was wir erfassen",
        p: "Deine erfassten Koffeineinträge (Getränketyp, Menge, Zeit), deine Profileinstellungen (z. B. Altersbereich und Empfindlichkeit zur Personalisierung) und grundlegende App-Einstellungen wie Sprache und Design.",
      },
      {
        h: "Authentifizierung",
        p: "Caffy nutzt standardmäßig anonyme Authentifizierung, damit du sofort ohne Konto starten kannst. Meldest du dich mit Apple an, wird deine Identität sicher verknüpft, um deine Daten geräteübergreifend zu halten.",
      },
      {
        h: "Apple Health",
        p: "Mit deiner Erlaubnis kann Caffy relevante Gesundheitsdaten lesen, um die Personalisierung zu verbessern. Dieser Zugriff ist optional, wird auf deinem Gerät verarbeitet und kann jederzeit in der Health-App widerrufen werden.",
      },
      {
        h: "Wie deine Daten gespeichert werden",
        p: "Deine Daten werden lokal auf deinem Gerät gespeichert und sicher mit unserem Backend synchronisiert, damit sie auf all deinen Geräten verfügbar sind. Der Zugriff ist durch Row-Level-Security geschützt – nur du kannst deine Zeilen lesen.",
      },
      {
        h: "Was wir nicht tun",
        p: "Wir verkaufen deine persönlichen Daten nicht. Wir zeigen keine Drittanbieter-Werbung basierend auf deinen Koffeingewohnheiten.",
      },
      {
        h: "Deine Kontrolle",
        p: "Du kannst jeden Eintrag bearbeiten oder löschen und jederzeit die Löschung deines Kontos und der zugehörigen Daten in der App oder per Kontakt anfordern.",
      },
      {
        h: "Kontakt",
        p: "Fragen zum Datenschutz? Schreib uns an support@caffy.app und wir melden uns.",
      },
    ],
  },
  support: {
    title: "Support",
    backHome: "Zurück zur Startseite",
    intro:
      "Brauchst du Hilfe? Die meisten Antworten findest du unten. Wenn nicht: Wir lesen jede Nachricht.",
    contactTitle: "Kontakt",
    contactBody: "Schreib uns – meist antworten wir innerhalb von 1–2 Werktagen.",
    emailButton: "Support per E-Mail",
    email: "support@caffy.app",
    topicsTitle: "Häufige Themen",
    topics: [
      {
        h: "Erste Schritte",
        p: "Öffne Caffy, erfasse dein erstes Getränk auf dem Startbildschirm und stelle deine Schlafenszeit ein, damit dein Schlafscore vom ersten Tag an funktioniert.",
      },
      {
        h: "Modell personalisieren",
        p: "Füge Altersbereich, Empfindlichkeit und relevante Faktoren zu deinem Profil hinzu, damit die Koffeinkurve widerspiegelt, wie dein Körper wirklich arbeitet.",
      },
      {
        h: "Premium & Abrechnung",
        p: "Verwalte oder kündige dein Abo jederzeit in deinen Apple-ID-Einstellungen. Premium schaltet Insights, Detox-Programme und das volle Modell frei.",
      },
      {
        h: "Käufe wiederherstellen",
        p: "Neu installiert oder Gerät gewechselt? Nutze „Käufe wiederherstellen“ in den Einstellungen, um deinen Premium-Zugang zurückzuholen.",
      },
    ],
  },
};

export default de;
