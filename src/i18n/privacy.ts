// AUTO-GENERATED from the Caffy iOS app's privacy policy strings.
// Mirrors PrivacyPolicyView + the app localization files exactly.

export interface PrivacyDoc {
  updatedLabel: string;
  date: string;
  overview: string;
  sections: { h: string; p: string }[];
}

export const privacyDoc: Record<string, PrivacyDoc> = {
  "en": {
    "updatedLabel": "Last updated:",
    "date": "May 1, 2026",
    "overview": "Caffy is designed with your privacy in mind. We collect only what is necessary to provide accurate caffeine tracking and sleep predictions. We do not sell your data to third parties.",
    "sections": [
      {
        "h": "Data We Collect",
        "p": "• Caffeine entries (drink name, amount in mg, time consumed)\n• Profile information (age, weight, caffeine sensitivity, bedtime, wake time)\n• Notification preferences\n• Account email address (for authentication)\n\nWe do not collect location data, contacts, camera access, or any other device information beyond what is listed above."
      },
      {
        "h": "How Your Data Is Used",
        "p": "Your data is used exclusively to:\n• Calculate real-time caffeine metabolism curves\n• Predict sleep readiness scores\n• Generate personalised alerts and recommendations\n• Display your intake history and weekly insights\n\nAll calculations are performed locally on your device. Your entries are synced to our secure database solely to preserve your history across devices."
      },
      {
        "h": "Data Storage & Security",
        "p": "Your data is stored on Supabase (supabase.com), a GDPR-compliant cloud database provider. Data is encrypted in transit (TLS) and at rest (AES-256). Row-Level Security policies ensure your data is only accessible to your own authenticated account — not to other users or Caffy staff."
      },
      {
        "h": "Data Retention & Deletion",
        "p": "Your caffeine entries and profile are retained for as long as your account is active. You may delete your account and all associated data at any time from Settings → Delete Account. Deletion is permanent and irreversible."
      },
      {
        "h": "AI Analysis & Data Processing",
        "p": "The AI Weekly Analysis feature sends a summary of your weekly caffeine data to our secure server for processing. This includes:\n• Aggregate intake statistics (total mg, average mg, over-limit days)\n• Sleep score data (best/worst days, caffeine at bedtime)\n• Anonymised profile factors (age range, caffeine sensitivity, half-life, bedtime/wake time, smoker status, pregnancy status, oral contraceptive use)\n\nThis data is sent to a Supabase Edge Function and processed using an AI language model (Claude by Anthropic) to generate personalised insights. It is not stored beyond the duration of the request and is never used to train AI models. The resulting insights are cached locally on your device only.\n\nThis feature is only triggered manually or once per week. You can disable it by not using the AI Weekly Analysis section."
      },
      {
        "h": "Third-Party Services",
        "p": "Caffy uses the following third-party services:\n• Supabase — database and authentication (supabase.com/privacy)\n• Anthropic (Claude API) — AI analysis of anonymised weekly stats, processed server-side and not retained\n• Apple UserNotifications — local push notifications (no data leaves your device)\n\nNo analytics SDKs, advertising networks, or tracking libraries are included in the app."
      },
      {
        "h": "Children's Privacy",
        "p": "Caffy is intended for users aged 13 and older. We do not knowingly collect data from children under 13. If you believe a child has provided personal information, please contact us to have it removed."
      },
      {
        "h": "Your Rights",
        "p": "Depending on your jurisdiction you may have the right to:\n• Access the personal data we hold about you\n• Request correction of inaccurate data\n• Request deletion of your data\n• Export your data in a portable format\n\nTo exercise any of these rights, contact us at the address below."
      },
      {
        "h": "Contact",
        "p": "If you have questions about this policy or your data, please contact us at privacy@caffy.app"
      }
    ]
  },
  "tr": {
    "updatedLabel": "Son güncelleme:",
    "date": "1 Mayıs 2026",
    "overview": "Caffy, gizliliğiniz gözetilerek tasarlanmıştır. Yalnızca doğru kafein takibi ve uyku tahminleri sunmak için gerekli minimum veriyi topluyoruz. Verilerinizi hiçbir üçüncü tarafla paylaşmıyoruz.",
    "sections": [
      {
        "h": "Topladığımız Veriler",
        "p": "• Kafein girişleri (içecek adı, mg miktarı, tüketim saati)\n• Profil bilgileri (yaş, kilo, kafein hassasiyeti, yatış/uyanış saati)\n• Bildirim tercihleri\n• Hesap e-posta adresi (kimlik doğrulama için)\n\nKonum verisi, rehber, kamera erişimi veya yukarıda belirtilenler dışında herhangi bir cihaz bilgisi toplamıyoruz."
      },
      {
        "h": "Verileriniz Nasıl Kullanılır",
        "p": "Verileriniz yalnızca şunlar için kullanılır:\n• Gerçek zamanlı kafein metabolizma eğrisi hesaplama\n• Uyku hazırlığı puanı tahmini\n• Kişiselleştirilmiş uyarı ve öneri oluşturma\n• Alım geçmişinizi ve haftalık içgörüleri görüntüleme\n\nTüm hesaplamalar cihazınızda yerel olarak yapılır. Girişleriniz yalnızca geçmişinizi cihazlar arasında korumak amacıyla güvenli veritabanımıza senkronize edilir."
      },
      {
        "h": "Veri Depolama ve Güvenlik",
        "p": "Verileriniz GDPR uyumlu bir bulut veritabanı sağlayıcısı olan Supabase'de (supabase.com) saklanır. Veriler iletim sırasında (TLS) ve durağan halde (AES-256) şifrelenir. Satır Düzeyinde Güvenlik politikaları, verilerinize yalnızca kendi kimliği doğrulanmış hesabınızla erişilebilmesini sağlar."
      },
      {
        "h": "Veri Saklama ve Silme",
        "p": "Kafein girişleriniz ve profiliniz hesabınız aktif olduğu sürece saklanır. Ayarlar → Hesabı Sil yolundan istediğiniz zaman hesabınızı ve tüm ilişkili verilerinizi silebilirsiniz. Silme işlemi kalıcı ve geri alınamaz."
      },
      {
        "h": "Yapay Zeka Analizi ve Veri İşleme",
        "p": "Haftalık AI Analizi özelliği, haftalık kafein verilerinizin bir özetini işlenmek üzere güvenli sunucumuza gönderir. Bu şunları içerir:\n• Toplam alım istatistikleri (toplam mg, ortalama mg, limit aşılan günler)\n• Uyku puanı verileri (en iyi/en kötü günler, yatış saatindeki kafein miktarı)\n• Anonimleştirilmiş profil faktörleri (yaş aralığı, kafein hassasiyeti, yarı ömür, yatış/uyanış saatleri, sigara durumu, hamilelik durumu, oral kontraseptif kullanımı)\n\nBu veriler bir Supabase Edge Fonksiyonuna iletilir ve kişiselleştirilmiş içgörüler oluşturmak amacıyla bir yapay zeka dil modeli (Anthropic tarafından Claude) tarafından işlenir. İstek süresinin ötesinde saklanmaz ve yapay zeka modellerini eğitmek için hiçbir zaman kullanılmaz. Elde edilen içgörüler yalnızca cihazınızda yerel olarak önbelleğe alınır.\n\nBu özellik yalnızca manuel olarak veya haftada bir kez tetiklenir. Haftalık AI Analizi bölümünü kullanmayarak devre dışı bırakabilirsiniz."
      },
      {
        "h": "Üçüncü Taraf Hizmetler",
        "p": "Caffy aşağıdaki üçüncü taraf hizmetleri kullanır:\n• Supabase — veritabanı ve kimlik doğrulama (supabase.com/privacy)\n• Anthropic (Claude API) — sunucu tarafında işlenen ve saklanmayan anonimleştirilmiş haftalık istatistiklerin yapay zeka analizi\n• Apple UserNotifications — yerel push bildirimleri (cihazınızdan veri çıkmaz)\n\nUygulama herhangi bir analitik SDK, reklam ağı veya izleme kütüphanesi içermez."
      },
      {
        "h": "Çocukların Gizliliği",
        "p": "Caffy, 13 yaş ve üzeri kullanıcılara yöneliktir. 13 yaşın altındaki çocuklardan bilerek veri toplamıyoruz. Bir çocuğun kişisel bilgi sağladığını düşünüyorsanız lütfen bizimle iletişime geçin."
      },
      {
        "h": "Haklarınız",
        "p": "Yetki alanınıza bağlı olarak aşağıdaki haklara sahip olabilirsiniz:\n• Hakkınızda tuttuğumuz kişisel verilere erişim\n• Hatalı verilerin düzeltilmesini talep etme\n• Verilerinizin silinmesini talep etme\n• Verilerinizi taşınabilir formatta dışa aktarma\n\nBu haklardan herhangi birini kullanmak için aşağıdaki adresten bize ulaşın."
      },
      {
        "h": "İletişim",
        "p": "Bu politika veya verileriniz hakkında sorularınız için privacy@caffy.app adresinden bize ulaşabilirsiniz."
      }
    ]
  },
  "de": {
    "updatedLabel": "Zuletzt aktualisiert:",
    "date": "1. Mai 2026",
    "overview": "Caffy wurde mit Blick auf deine Privatsphäre entwickelt. Wir erfassen nur das Minimum, das für genaues Koffein-Tracking und Schlafvorhersagen erforderlich ist. Wir verkaufen deine Daten nicht an Dritte.",
    "sections": [
      {
        "h": "Daten, die wir sammeln",
        "p": "• Koffein-Einträge (Getränkename, Menge in mg, Zeitpunkt des Konsums)\n• Profilinformationen (Alter, Gewicht, Koffeinempfindlichkeit, Schlafens- und Aufwachzeit)\n• Benachrichtigungseinstellungen\n• Konto-E-Mail-Adresse (zur Authentifizierung)\n\nWir erfassen keine Standortdaten, Kontakte, Kamerazugriff oder andere Geräteinformationen über das oben Genannte hinaus."
      },
      {
        "h": "Wie deine Daten verwendet werden",
        "p": "Deine Daten werden ausschließlich verwendet, um:\n• Echtzeit-Koffein-Stoffwechselkurven zu berechnen\n• Schlafbereitschafts-Scores vorherzusagen\n• Personalisierte Benachrichtigungen und Empfehlungen zu erstellen\n• Deine Aufnahmehistorie und wöchentliche Einblicke anzuzeigen\n\nAlle Berechnungen werden lokal auf deinem Gerät durchgeführt. Deine Einträge werden ausschließlich zur Bewahrung deiner Geschichte geräteübergreifend mit unserer sicheren Datenbank synchronisiert."
      },
      {
        "h": "Datenspeicherung & Sicherheit",
        "p": "Deine Daten werden bei Supabase (supabase.com) gespeichert, einem DSGVO-konformen Cloud-Datenbankanbietem. Die Daten werden bei der Übertragung (TLS) und im Ruhezustand (AES-256) verschlüsselt. Row-Level-Security-Richtlinien stellen sicher, dass deine Daten nur über dein eigenes authentifiziertes Konto zugänglich sind."
      },
      {
        "h": "Datenaufbewahrung & Löschung",
        "p": "Deine Koffein-Einträge und dein Profil werden gespeichert, solange dein Konto aktiv ist. Du kannst dein Konto und alle damit verbundenen Daten jederzeit über Einstellungen → Konto löschen entfernen. Die Löschung ist dauerhaft und kann nicht rückgängig gemacht werden."
      },
      {
        "h": "KI-Analyse & Datenverarbeitung",
        "p": "Die KI-Wochenanalyse-Funktion sendet eine Zusammenfassung deiner wöchentlichen Koffeindaten zur Verarbeitung an unseren sicheren Server. Dies umfasst:\n• Aggregierte Aufnahmestatistiken (Gesamt-mg, Durchschnitts-mg, Tage über dem Limit)\n• Schlafpunkte-Daten (beste/schlechteste Tage, Koffein zur Schlafenszeit)\n• Anonymisierte Profilfaktoren (Altersgruppe, Koffeinempfindlichkeit, Halbwertszeit, Schlafens-/Aufwachzeiten, Raucherstatus, Schwangerschaftsstatus, Einnahme oraler Kontrazeptiva)\n\nDiese Daten werden an eine Supabase Edge Function gesendet und von einem KI-Sprachmodell (Claude von Anthropic) verarbeitet. Sie werden nicht über die Dauer der Anfrage hinaus gespeichert und nie zum Training von KI-Modellen verwendet. Die resultierenden Einblicke werden ausschließlich lokal auf deinem Gerät gespeichert.\n\nDiese Funktion wird nur manuell oder einmal pro Woche ausgelöst. Du kannst sie deaktivieren, indem du den Abschnitt KI-Wochenanalyse nicht nutzt."
      },
      {
        "h": "Drittanbieter-Dienste",
        "p": "Caffy verwendet folgende Drittanbieter-Dienste:\n• Supabase — Datenbank und Authentifizierung (supabase.com/privacy)\n• Anthropic (Claude API) — KI-Analyse anonymisierter Wochenstatistiken, serverseitig verarbeitet und nicht gespeichert\n• Apple UserNotifications — lokale Push-Benachrichtigungen (keine Daten verlassen dein Gerät)\n\nDie App enthält keine Analyse-SDKs, Werbenetzwerke oder Tracking-Bibliotheken."
      },
      {
        "h": "Kinderdatenschutz",
        "p": "Caffy richtet sich an Nutzer ab 13 Jahren. Wir erfassen wissentlich keine Daten von Kindern unter 13 Jahren. Falls du glaubst, dass ein Kind persönliche Informationen angegeben hat, kontaktiere uns bitte."
      },
      {
        "h": "Deine Rechte",
        "p": "Je nach deinem Wohnsitzland kannst du folgende Rechte haben:\n• Zugang zu den personenbezogenen Daten, die wir über dich speichern\n• Berichtigung unrichtiger Daten\n• Löschung deiner Daten\n• Export deiner Daten in einem portablen Format\n\nUm eines dieser Rechte auszuüben, kontaktiere uns über die unten stehende Adresse."
      },
      {
        "h": "Kontakt",
        "p": "Bei Fragen zu dieser Richtlinie oder deinen Daten wende dich bitte an: privacy@caffy.app"
      }
    ]
  },
  "es": {
    "updatedLabel": "Última actualización:",
    "date": "1 de mayo de 2026",
    "overview": "Caffy está diseñado con tu privacidad en mente. Solo recopilamos lo necesario para ofrecer un seguimiento preciso de cafeína y predicciones de sueño. No vendemos tus datos a terceros.",
    "sections": [
      {
        "h": "Datos que recopilamos",
        "p": "• Registros de cafeína (nombre de bebida, cantidad en mg, hora de consumo)\n• Información de perfil (edad, peso, sensibilidad a la cafeína, hora de dormir/despertar)\n• Preferencias de notificación\n• Dirección de correo electrónico (para autenticación)\n\nNo recopilamos datos de ubicación, contactos, acceso a la cámara ni ninguna otra información del dispositivo más allá de lo indicado."
      },
      {
        "h": "Cómo se usan tus datos",
        "p": "Tus datos se usan exclusivamente para:\n• Calcular curvas de metabolismo de cafeína en tiempo real\n• Predecir puntuaciones de preparación para dormir\n• Generar alertas y recomendaciones personalizadas\n• Mostrar tu historial de consumo e información semanal\n\nTodos los cálculos se realizan localmente en tu dispositivo. Tus registros se sincronizan con nuestra base de datos segura únicamente para conservar tu historial entre dispositivos."
      },
      {
        "h": "Almacenamiento y seguridad de datos",
        "p": "Tus datos se almacenan en Supabase (supabase.com), un proveedor de base de datos en la nube compatible con el RGPD. Los datos están cifrados en tránsito (TLS) y en reposo (AES-256). Las políticas de seguridad a nivel de fila garantizan que solo puedas acceder a tus propios datos."
      },
      {
        "h": "Retención y eliminación de datos",
        "p": "Tus registros de cafeína y perfil se conservan mientras tu cuenta esté activa. Puedes eliminar tu cuenta y todos los datos asociados en cualquier momento desde Ajustes → Eliminar cuenta. La eliminación es permanente e irreversible."
      },
      {
        "h": "Análisis de IA y procesamiento de datos",
        "p": "La función de Análisis Semanal IA envía un resumen de tus datos semanales de cafeína a nuestro servidor seguro para su procesamiento. Esto incluye:\n• Estadísticas de consumo agregadas (mg totales, mg promedio, días sobre el límite)\n• Datos de puntuación de sueño (mejores/peores días, cafeína a la hora de dormir)\n• Factores de perfil anonimizados (rango de edad, sensibilidad a la cafeína, vida media, horas de dormir/despertar, tabaquismo, embarazo, uso de anticonceptivos orales)\n\nEstos datos se envían a una función Edge de Supabase y se procesan con un modelo de lenguaje IA (Claude de Anthropic) para generar información personalizada. No se almacenan más allá de la duración de la solicitud y nunca se usan para entrenar modelos de IA. La información resultante se guarda en caché solo localmente en tu dispositivo.\n\nEsta función solo se activa manualmente o una vez por semana. Puedes desactivarla dejando de usar la sección de Análisis Semanal IA."
      },
      {
        "h": "Servicios de terceros",
        "p": "Caffy utiliza los siguientes servicios de terceros:\n• Supabase — base de datos y autenticación (supabase.com/privacy)\n• Anthropic (API de Claude) — análisis IA de estadísticas semanales anonimizadas, procesadas en servidor y no retenidas\n• Apple UserNotifications — notificaciones push locales (no se envían datos fuera de tu dispositivo)\n\nLa app no incluye SDK de analítica, redes publicitarias ni bibliotecas de seguimiento."
      },
      {
        "h": "Privacidad de menores",
        "p": "Caffy está destinado a usuarios de 13 años o más. No recopilamos datos de menores de 13 años de forma consciente. Si crees que un menor ha proporcionado información personal, contáctanos para eliminarla."
      },
      {
        "h": "Tus derechos",
        "p": "Según tu jurisdicción, puedes tener derecho a:\n• Acceder a los datos personales que conservamos sobre ti\n• Solicitar la corrección de datos inexactos\n• Solicitar la eliminación de tus datos\n• Exportar tus datos en formato portátil\n\nPara ejercer cualquiera de estos derechos, contáctanos en la dirección indicada."
      },
      {
        "h": "Contacto",
        "p": "Si tienes preguntas sobre esta política o tus datos, contáctanos en: privacy@caffy.app"
      }
    ]
  },
  "ja": {
    "updatedLabel": "最終更新:",
    "date": "2026年5月1日",
    "overview": "Caffyはプライバシーを重視して設計されています。正確なカフェイン追跡と睡眠予測に必要な最小限のデータのみを収集します。第三者にデータを販売することはありません。",
    "sections": [
      {
        "h": "収集するデータ",
        "p": "• カフェイン記録（飲み物名、mg量、摂取時刻）\n• プロフィール情報（年齢、体重、カフェイン感受性、就寝・起床時刻）\n• 通知設定\n• アカウントのメールアドレス（認証用）\n\n位置情報、連絡先、カメラアクセス、その他上記以外のデバイス情報は一切収集しません。"
      },
      {
        "h": "データの使用方法",
        "p": "データは以下の目的にのみ使用されます：\n• リアルタイムのカフェイン代謝曲線の計算\n• 睡眠準備スコアの予測\n• パーソナライズされたアラートと推奨事項の生成\n• 摂取履歴と週次インサイトの表示\n\nすべての計算はデバイス上でローカルに実行されます。記録はデバイス間で履歴を保持するためだけにセキュアデータベースと同期されます。"
      },
      {
        "h": "データの保存とセキュリティ",
        "p": "データはGDPR準拠のクラウドデータベースプロバイダーであるSupabase（supabase.com）に保存されます。データは転送中（TLS）および保存時（AES-256）に暗号化されます。行レベルセキュリティポリシーにより、自分のアカウント以外からアクセスできません。"
      },
      {
        "h": "データの保持と削除",
        "p": "カフェイン記録とプロフィールはアカウントが有効な限り保持されます。設定→アカウント削除から、いつでもアカウントとすべての関連データを削除できます。削除は永久的で元に戻せません。"
      },
      {
        "h": "AI分析とデータ処理",
        "p": "週次AI分析機能は、週次カフェインデータの要約を処理のためセキュアサーバーに送信します。含まれる情報：\n• 摂取統計の集計（合計mg、平均mg、制限超過日数）\n• 睡眠スコアデータ（最良・最悪日、就寝時カフェイン量）\n• 匿名化されたプロフィール要因（年齢層、カフェイン感受性、半減期、就寝・起床時刻、喫煙状況、妊娠状況、経口避妊薬の使用）\n\nこのデータはSupabase Edge Functionに送信され、AIモデル（AnthropicのClaude）で処理されます。リクエスト以降は保存されず、AIモデルの学習には使用されません。生成されたインサイトはデバイスにのみキャッシュされます。\n\nこの機能は手動または週1回のみ起動されます。AI週次分析セクションを使用しないことで無効にできます。"
      },
      {
        "h": "サードパーティサービス",
        "p": "Caffyは以下のサードパーティサービスを使用しています：\n• Supabase — データベースと認証（supabase.com/privacy）\n• Anthropic（Claude API）— 匿名化された週次統計のAI分析（サーバーサイドで処理、保存なし）\n• Apple UserNotifications — ローカルプッシュ通知（データはデバイス外に出ません）\n\nアプリには分析SDK、広告ネットワーク、トラッキングライブラリは含まれていません。"
      },
      {
        "h": "子どものプライバシー",
        "p": "Caffyは13歳以上のユーザーを対象としています。13歳未満の子どものデータを意図的に収集することはありません。子どもが個人情報を提供したと思われる場合はご連絡ください。"
      },
      {
        "h": "あなたの権利",
        "p": "お住まいの地域によっては、以下の権利がある場合があります：\n• 当社が保有するあなたの個人データへのアクセス\n• 不正確なデータの訂正の要求\n• データの削除の要求\n• ポータブル形式でのデータのエクスポート\n\nこれらの権利を行使するには、以下のアドレスまでご連絡ください。"
      },
      {
        "h": "お問い合わせ",
        "p": "このポリシーやデータについてご質問がある場合は、privacy@caffy.app までご連絡ください。"
      }
    ]
  }
};
