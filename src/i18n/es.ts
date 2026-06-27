import type { Dict } from "./en";

const es: Dict = {
  meta: { code: "es", name: "Español", flag: "🇪🇸" },
  nav: {
    features: "Funciones",
    calculator: "Calculadora",
    sleep: "Sueño",
    faq: "FAQ",
    download: "Descargar",
  },
  hero: {
    badge: "Seguimiento de cafeína con base científica",
    titleA: "Sabe exactamente cuánta",
    titleAccent: "cafeína",
    titleB: "hay en tu cuerpo ahora mismo.",
    sub: "Caffy registra cada café, té y bebida energética, y modela tu metabolismo en tiempo real — para que protejas tu sueño y tengas el control.",
    primary: "Descargar en App Store",
    secondary: "Probar la calculadora",
    rating: "Querida por quienes aman dormir bien",
  },
  calc: {
    eyebrow: "Demo en vivo",
    title: "Mira cómo la cafeína recorre tu cuerpo",
    subtitle:
      "Añade una bebida, arrastra tu hora de dormir y mira cuánta cafeína sigue en tu sistema cuando tu cabeza toca la almohada.",
    addLabel: "Añadir bebida",
    profileLabel: "Tu metabolismo",
    bedtimeLabel: "Hora de dormir",
    atBedtime: "Al dormir",
    peak: "Pico de hoy",
    now: "Ahora mismo",
    reset: "Reiniciar",
    verdictSafe: "Genial — la cafeína no se interpondrá en tu sueño profundo.",
    verdictCaution: "En el límite — podría retrasar o aligerar tu sueño.",
    verdictPoor: "Demasiado alta — espera un sueño inquieto y entrecortado esta noche.",
    note: "Un modelo simplificado para demostración. La app Caffy personaliza la curva según tu edad, cuerpo y sensibilidad.",
    profiles: {
      average: "Promedio",
      sensitive: "Sensible",
      fast: "Rápido",
      smoker: "Fumador",
      pregnant: "Embarazo",
    },
    drinks: {
      espresso: "Espresso",
      coffee: "Café",
      energy: "Energética",
      tea: "Té",
      matcha: "Matcha",
      cola: "Cola",
    },
    mg: "mg",
  },
  viz: {
    sleepScore: "Puntuación de sueño",
    stepDown: "Reducción en 7 días",
    weeklyInsight: "Esta semana",
    insightLine: "Duermes mejor los días que dejas la cafeína antes de las 14:00.",
    activeNow: "Activa ahora",
    untilSafe: "Sueño seguro en",
    health: "Sincronizado con Apple Health",
  },
  gallery: {
    eyebrow: "Más de cerca",
    title: "Todo lo que necesitas, de un vistazo.",
    shots: [
      "Metabolismo en vivo",
      "Protección del sueño",
      "Tendencias y detox",
      "Análisis semanal con IA",
      "Tu semana de cafeína",
    ],
  },
  features: {
    eyebrow: "Diseñado en torno a tu cuerpo",
    title: "Un modelo de cómo tu cuerpo procesa la cafeína.",
    items: {
      realtime: {
        title: "Nivel de cafeína en tiempo real",
        body: "Un modelo de vida media personalizado muestra exactamente cuánta cafeína está activa en tu sangre — no una cuenta atrás genérica, sino una curva ajustada a tu cuerpo.",
      },
      sleep: {
        title: "Una puntuación de sueño que te avisa",
        body: "Caffy conoce tu hora de dormir y te dice, antes de esa última taza, si te costará el sueño profundo esta noche. Avisos sutiles, sin insistir.",
      },
      detox: {
        title: "Reduce sin desplomarte",
        body: "Programas guiados de desintoxicación de cafeína te bajan poco a poco — mantienes tu energía y pierdes la dependencia, a un ritmo que tu cuerpo puede asumir.",
      },
      insights: {
        title: "Análisis semanal con IA",
        body: "Cada semana Caffy detecta los patrones que tú no ves — tus verdaderos detonantes, tus peores horas, los hábitos que moldean tu sueño en silencio.",
      },
      widgets: {
        title: "Widgets y Apple Health",
        body: "Consulta tu nivel actual de un vistazo desde la pantalla de inicio y de bloqueo, y sincroniza sin esfuerzo con Apple Health. Tus datos siguen siendo tuyos.",
      },
    },
  },
  science: {
    eyebrow: "La ciencia",
    title: "Las matemáticas detrás de cada número.",
    body: "Caffy modela la cafeína con una curva farmacocinética de vida media y una fase de absorción de 45 minutos, ajustada a los factores que realmente cambian cómo la metabolizas — edad, sensibilidad, embarazo, tabaco y más.",
    formula: "C(t) = C₀ × 0.5^(t / t½)",
    sources: "Modelos basados en FDA, EFSA, NIH y la Sleep Foundation.",
    stats: {
      halflife: "Vida media media de la cafeína",
      halflifeVal: "~5–6 h",
      absorption: "Tiempo hasta absorción máxima",
      absorptionVal: "45 min",
      safe: "Límite diario seguro (adultos)",
      safeVal: "400 mg",
    },
  },
  faq: {
    eyebrow: "Preguntas",
    title: "Todo lo que podrías preguntarte",
    items: [
      {
        q: "¿Cómo sabe Caffy cuánta cafeína me queda?",
        a: "Caffy aplica un modelo farmacocinético de vida media a cada bebida que registras y ajusta la curva a tu perfil personal — edad, cuerpo, sensibilidad y factores como embarazo o tabaco. El resultado es una estimación en vivo de la cafeína activa, no un temporizador fijo.",
      },
      {
        q: "¿De verdad ayudará a mi sueño?",
        a: "Caffy calcula cuánta cafeína seguirá activa a tu hora de dormir y te da una puntuación de sueño antes de beber. Saber que tu café de las 16:00 deja 90 mg en tu sistema a medianoche suele bastar para cambiar la decisión.",
      },
      {
        q: "¿Qué bebidas puedo registrar?",
        a: "Café en todas sus formas, tés, bebidas energéticas, refrescos, matcha y más — cada uno con contenido realista de cafeína. También puedes crear bebidas personalizadas con tus propias cantidades.",
      },
      {
        q: "¿Mis datos son privados?",
        a: "Sí. Tus registros son tuyos. El acceso a Apple Health se queda en tu dispositivo y nunca vendemos tus datos. Consulta la política de privacidad para más detalles.",
      },
      {
        q: "¿Caffy es gratis?",
        a: "Caffy se descarga gratis con el seguimiento básico incluido. Premium desbloquea análisis avanzados, programas de desintoxicación y el modelo de metabolismo completo.",
      },
    ],
  },
  cta: {
    title: "Toma el control de tu cafeína.",
    sub: "Mejor energía de día. Sueño más profundo de noche. Empieza por conocer tu número.",
    button: "Descargar en App Store",
  },
  footer: {
    tagline: "Seguimiento de cafeína en tiempo real que protege tu sueño.",
    product: "Producto",
    company: "Empresa",
    legal: "Legal",
    privacy: "Política de privacidad",
    support: "Soporte",
    rights: "Todos los derechos reservados.",
    madeWith: "Hecho para quienes aman el café y el sueño.",
  },
  privacy: {
    title: "Política de privacidad",
    updated: "Última actualización: junio de 2026",
    backHome: "Volver al inicio",
    intro:
      "Caffy está construido priorizando la privacidad. Esta política explica qué recopilamos, por qué y el control que tienes. En resumen: tus datos de cafeína son tuyos y no los vendemos.",
    sections: [
      {
        h: "Qué recopilamos",
        p: "Las entradas de cafeína que registras (tipo de bebida, cantidad, hora), los ajustes de tu perfil (como rango de edad y sensibilidad usados para personalizar el modelo) y preferencias básicas como idioma y tema.",
      },
      {
        h: "Autenticación",
        p: "Caffy usa autenticación anónima por defecto, así puedes empezar de inmediato sin cuenta. Si decides iniciar sesión con Apple, tu identidad se vincula de forma segura para mantener tus datos entre dispositivos.",
      },
      {
        h: "Apple Health",
        p: "Si concedes acceso, Caffy puede leer datos de salud relevantes para mejorar la personalización. Este acceso es opcional, se procesa en tu dispositivo y puedes revocarlo cuando quieras en la app Salud.",
      },
      {
        h: "Cómo se almacenan tus datos",
        p: "Tus datos se almacenan localmente en tu dispositivo y se sincronizan de forma segura con nuestro backend para que estén disponibles en todos tus dispositivos. El acceso está protegido por seguridad a nivel de fila — solo tú puedes leer tus filas.",
      },
      {
        h: "Lo que no hacemos",
        p: "No vendemos tus datos personales. No mostramos publicidad de terceros basada en tus hábitos de cafeína.",
      },
      {
        h: "Tu control",
        p: "Puedes editar o eliminar cualquier entrada, y solicitar la eliminación de tu cuenta y los datos asociados en cualquier momento desde la app o contactándonos.",
      },
      {
        h: "Contacto",
        p: "¿Preguntas sobre privacidad? Escríbenos a support@caffy.com y te responderemos.",
      },
    ],
  },
  support: {
    title: "Soporte",
    backHome: "Volver al inicio",
    intro:
      "¿Necesitas ayuda? La mayoría de respuestas están abajo. Si sigues atascado, leemos cada mensaje.",
    contactTitle: "Contáctanos",
    contactBody: "Escríbenos y normalmente respondemos en 1–2 días laborables.",
    emailButton: "Email de soporte",
    email: "support@caffy.com",
    topicsTitle: "Temas frecuentes",
    topics: [
      {
        h: "Primeros pasos",
        p: "Abre Caffy, registra tu primera bebida desde la pantalla de inicio y ajusta tu hora de dormir para que tu puntuación de sueño funcione desde el primer día.",
      },
      {
        h: "Personalizar el modelo",
        p: "Añade tu rango de edad, sensibilidad y cualquier factor relevante en tu perfil para que la curva de cafeína refleje cómo funciona tu cuerpo de verdad.",
      },
      {
        h: "Premium y facturación",
        p: "Gestiona o cancela tu suscripción cuando quieras en los ajustes de tu Apple ID. Premium desbloquea análisis, programas de desintoxicación y el modelo completo.",
      },
      {
        h: "Restaurar compras",
        p: "¿Reinstalaste o cambiaste de dispositivo? Usa «Restaurar compras» en ajustes para recuperar tu acceso premium.",
      },
    ],
  },
};

export default es;
