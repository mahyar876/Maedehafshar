/**
 * =============================================================================
 * Maedeh Afshar — Site Content & Configuration
 * =============================================================================
 *
 * HOW TO EDIT:
 * - Brand name stays "Maedeh Afshar" (localized display name in SITE.brand.nameLocalized).
 * - All user-facing copy lives under CONTENT.fa, CONTENT.en, CONTENT.ru.
 *
 * ADD A COURSE CARD:
 * - Copy an object in CONTENT.<lang>.courses.items (same `id` in all three langs).
 * - Set visible: true/false to show or hide.
 *
 * ADD FAQ:
 * - Add an object to CONTENT.<lang>.faq.items in all three languages (same `id`).
 *
 * CHANGE PORTRAIT:
 * - Update SITE.images.portrait path below (default: assets/images/maedeh-portrait.jpg).
 *
 * CONTACT LINKS (independent block — fill when ready):
 * - SITE.contact.email    → enables mailto: button
 * - SITE.contact.instagram → full URL, e.g. https://instagram.com/username
 * - SITE.contact.telegram  → full URL, e.g. https://t.me/username
 * Leave empty string "" until you have real values.
 *
 * SEO CANONICAL (optional):
 * - SITE.canonicalUrl — set your live domain when published (see README).
 * =============================================================================
 */

const SITE = {
  brand: {
    name: "Maedeh Afshar",
    nameLocalized: {
      fa: "مائده افشار",
      en: "Maedeh Afshar",
      ru: "Маэде Афшар",
    },
  },
  images: {
    // Hero: پرتره حرفه‌ای (لبخند، نور یکنواخت)
    portrait: "assets/images/maedeh-portrait.jpg",
  },
  contact: {
    email: "",
    instagram: "https://www.instagram.com/maedehafshar/",
    telegram: "https://t.me/maee_botbot",
    instagramHandle: "@maedehafshar",
    telegramHandle: "@maee_botbot",
  },
  canonicalUrl: "",
};

const CONTENT = {
  fa: {
    meta: {
      title: "مائده افشار | مدرس زبان انگلیسی",
      description:
        "مائده افشار، مدرس زبان انگلیسی. تحصیل در HSE مسکو، فوق‌دیپلم مترجمی، تدریس در زبان ملل و کلاس‌های کودک، نوجوان و بزرگسال.",
    },
    nav: {
      about: "درباره من",
      journey: "مسیر من",
      experience: "سوابق",
      teaching: "روش تدریس",
      courses: "کلاس‌ها",
      faq: "پرسش‌ها",
      contact: "تماس",
      skipToContent: "رفتن به محتوای اصلی",
    },
    hero: {
      tagline: "یادگیری زبان، فراتر از واژه‌ها",
      role: "مدرس زبان انگلیسی",
      intro:
        "من مائده افشار هستم، مدرس زبان انگلیسی. انگلیسی و روسی را در مسیر تحصیل و تدریس جدی دنبال کرده‌ام؛ از کلاس کودک تا بزرگسال، با تمرکز بر یادگیری کاربردی.",
      cta: "با مسیر من آشنا شوید",
    },
    about: {
      label: "درباره من",
      title: "زبانی که با زندگی واقعی گره می‌خورد",
      body: [
        "سلام، من مائده افشار هستم، متولد ۱۳۸۰/۲/۱۳. امروز تمرکز حرفه‌ای من تدریس زبان انگلیسی است و با گروه‌های سنی مختلف — کودک، نوجوان و بزرگسال — کار کرده‌ام.",
        "دیپلم ریاضی دارم و فوق‌دیپلم مترجمی زبان انگلیسی را از دانشگاه علوم و تحقیقات گرفته‌ام. مدرک TTC را از مجتمع فنی تهران و آموزشگاه نوین دریافت کرده‌ام.",
        "دو سال در دانشگاه HSE مسکو در رشته Foreign Languages and Intercultural Communication تحصیل کردم. اکنون دانشجوی زبان روسی در دانشگاه تهران هستم. سطح زبان‌های من: English C1 و Russian B2.",
        "نزدیک به دو سال است در آموزشگاه زبان ملل تدریس می‌کنم؛ پیش از آن، پنج ماه در آموزشگاه کودکان برتر به کودکان ۹ تا ۱۲ سال انگلیسی درس دادم.",
      ],
    },
    journey: {
      label: "مسیر من",
      title: "روسیه، تهران و مسیر بین دو زبان",
      intro:
        "خلاصه مسیر تحصیلی و حرفه‌ای من در زبان انگلیسی و روسی — از ایران تا مسکو و بازگشت به تدریس.",
      timeline: [
        {
          id: "education-iran",
          title: "تحصیلات در ایران",
          text: "دیپلم ریاضی و فوق‌دیپلم مترجمی زبان انگلیسی از دانشگاه علوم و تحقیقات. مدرک TTC از مجتمع فنی تهران و آموزشگاه نوین.",
        },
        {
          id: "hse-moscow",
          title: "دانشگاه HSE مسکو",
          text: "دو سال در HSE مسکو در رشته Foreign Languages and Intercultural Communication تحصیل کردم — تجربه‌ای عمیق در محیط آکادمیک روسی‌زبان.",
        },
        {
          id: "tehran-study",
          title: "زبان روسی — دانشگاه تهران",
          text: "اکنون دانشجوی رشته زبان روسی در دانشگاه تهران هستم و این مسیر را در کنار تدریس زبان انگلیسی ادامه می‌دهم.",
        },
        {
          id: "teaching",
          title: "تدریس زبان انگلیسی",
          text: "نزدیک به دو سال در آموزشگاه زبان ملل و پیش از آن پنج ماه تدریس به کودکان ۹ تا ۱۲ سال در آموزشگاه کودکان برتر.",
        },
      ],
      imagePlaceholder: "جایگاه تصویر — پس از افزودن فایل در پوشه assets/images نمایش داده می‌شود",
    },
    experience: {
      label: "سوابق و فعالیت",
      title: "تحصیلات، مدارک و فعالیت",
      items: [
        {
          id: "melal",
          title: "آموزشگاه زبان ملل",
          text: "نزدیک به دو سال است در زبان ملل زبان انگلیسی تدریس می‌کنم؛ کلاس‌های کودک، نوجوان و بزرگسال.",
        },
        {
          id: "berter",
          title: "آموزشگاه کودکان برتر",
          text: "پنج ماه تدریس انگلیسی به کودکان ۹ تا ۱۲ سال.",
        },
        {
          id: "degrees",
          title: "تحصیلات",
          text: "دیپلم ریاضی؛ فوق‌دیپلم مترجمی زبان انگلیسی (دانشگاه علوم و تحقیقات).",
        },
        {
          id: "hse-moscow",
          title: "HSE مسکو",
          text: "دو سال تحصیل در رشته Foreign Languages and Intercultural Communication.",
        },
        {
          id: "ut-russian",
          title: "دانشگاه تهران",
          text: "دانشجوی رشته زبان روسی.",
        },
        {
          id: "ttc",
          title: "مدرک TTC",
          text: "مجتمع فنی تهران و آموزشگاه نوین.",
        },
        {
          id: "lang-levels",
          title: "سطح زبان",
          text: "English C1 · Russian B2",
        },
      ],
    },
    teaching: {
      label: "روش تدریس",
      title: "یادگیری کاربردی، قدم‌به‌قدم",
      body: [
        "برای من، کلاس جایی است که زبان از حالت انتزاعی خارج شود. تمرین مکالمه، درک تدریجی قواعد و فضایی امن برای اشتباه کردن — تا زبان‌آموز بتواند با آرامش پیش برود.",
        "با کتاب‌های Family and Friends، Got it و American English File کار کرده‌ام و برنامه را با سن و هدف زبان‌آموز — کودک، نوجوان یا بزرگسال — تنظیم می‌کنم.",
        "هر زبان‌آموز سرعت و نیاز متفاوتی دارد. تلاش می‌کنم برنامه درسی را با اهداف واقعی شما — مکالمه، تقویت پایه یا آمادگی آزمون — هماهنگ کنم.",
      ],
    },
    courses: {
      label: "کلاس‌ها",
      title: "دوره‌های زبان انگلیسی",
      intro:
        "کلاس‌های زبان انگلیسی برای کودک، نوجوان و بزرگسال. برای هماهنگی زمان، سطح و نحوه برگزاری از تلگرام یا اینستاگرام پیام بدهید.",
      items: [
        {
          id: "conversation",
          visible: true,
          title: "مکالمه انگلیسی",
          description:
            "تمرکز بر گفت‌وگوی روزمره، روان‌تر صحبت کردن و تقویت اعتمادبه‌نفس در مکالمه.",
        },
        {
          id: "general",
          visible: true,
          title: "زبان عمومی",
          description:
            "تقویت چهار مهارت با تمرکز بر درک و تولید زبان در موقعیت‌های مختلف.",
        },
        {
          id: "grammar",
          visible: true,
          title: "گرامر",
          description:
            "فهم ساختار جمله و کاربرد قواعد در متن و گفتار، نه صرفاً حفظ قانون.",
        },
        {
          id: "exam",
          visible: true,
          title: "آمادگی آزمون",
          description:
            "همراهی در آماده‌سازی برای آزمون‌های زبان با تمرین هدفمند و بازخورد.",
        },
        {
          id: "kids",
          visible: true,
          title: "کودکان و نوجوانان",
          description:
            "سابقه تدریس به کودک ۹ تا ۱۲ سال و نوجوان؛ با کتاب‌هایی مثل Family and Friends و Got it.",
        },
        {
          id: "modes",
          visible: true,
          title: "آنلاین و حضوری",
          description:
            "امکان برگزاری کلاس به صورت آنلاین یا حضوری — بسته به هماهنگی و شرایط شما.",
        },
      ],
    },
    faq: {
      label: "پرسش‌های متداول",
      title: "سؤالاتی که شاید داشته باشید",
      items: [
        {
          id: "lang-focus",
          question: "کلاس‌های مائده درباره چه زبانی هستند؟",
          answer:
            "تمرکز فعلی من تدریس زبان انگلیسی است. زبان روسی بخشی از مسیر تحصیلی و شخصی من است، اما در حال حاضر به‌عنوان دوره فعال معرفی نمی‌شود.",
        },
        {
          id: "more-info",
          question: "چطور می‌توان درباره کلاس‌ها اطلاعات بیشتری گرفت؟",
          answer:
            "از بخش تماس پایین صفحه یا مستقیماً از اینستاگرام @maedehafshar و تلگرام @maee_botbot پیام بدهید.",
        },
        {
          id: "online-offline",
          question: "امکان پرس‌وجو درباره کلاس آنلاین و حضوری وجود دارد؟",
          answer:
            "بله. می‌توانید در پیام خود محدودیت‌ها و ترجیح خود را بگویید تا درباره امکان برگزاری آنلاین یا حضوری هماهنگ شود.",
        },
        {
          id: "choose-class",
          question: "برای انتخاب کلاس مناسب چه کاری باید انجام داد؟",
          answer:
            "کافی است هدف خود (مکالمه، پایه زبان، آمادگی آزمون، کلاس کودک و غیره) را کوتاه بنویسید. بر اساس همان، درباره گزینه مناسب صحبت می‌کنیم.",
        },
        {
          id: "russian-course",
          question: "آیا کلاس زبان روسی هم ارائه می‌شود؟",
          answer:
            "فعلاً تدریس اصلی من زبان انگلیسی است. من در حال تحصیل زبان روسی در دانشگاه تهران هستم؛ اگر در آینده دوره مقدماتی روسی اضافه شود، در همین سایت اطلاع‌رسانی خواهد شد.",
        },
      ],
    },
    contact: {
      label: "تماس",
      title: "برای پرس‌وجو درباره کلاس‌ها",
      intro:
        "اگر درباره کلاس‌ها سؤال دارید یا می‌خواهید هماهنگ کنیم، از یکی از راه‌های زیر استفاده کنید.",
      email: "ایمیل",
      instagram: "اینستاگرام",
      telegram: "تلگرام",
      unavailable: "به‌زودی فعال می‌شود",
    },
    footer: {
      tagline: "مدرس زبان انگلیسی",
      navTitle: "بخش‌ها",
      contactTitle: "ارتباط",
      copyright: "تمامی حقوق محفوظ است.",
    },
    ui: {
      themeLight: "تم روشن",
      themeDark: "تم تیره",
      langFa: "فارسی",
      langEn: "English",
      langRu: "Русский",
      portraitAlt: "پرتره مائده افشار، مدرس زبان انگلیسی",
      portraitPlaceholder: "جایگاه عکس پرتره",
      logoAria: "مائده افشار — بازگشت به ابتدای صفحه",
      langGroup: "انتخاب زبان",
    },
  },

  en: {
    meta: {
      title: "Maedeh Afshar | English Language Teacher",
      description:
        "Maedeh Afshar, English teacher — HSE Moscow, translation degree, Melal Language Institute, classes for children, teens, and adults.",
    },
    nav: {
      about: "About",
      journey: "My Path",
      experience: "Experience",
      teaching: "Approach",
      courses: "Classes",
      faq: "FAQ",
      contact: "Contact",
      skipToContent: "Skip to main content",
    },
    hero: {
      tagline: "Language learning, beyond words",
      role: "English Language Teacher",
      intro:
        "I'm Maedeh Afshar, an English teacher. I've taught children, teens, and adults, with a background in study and life across Iran and Moscow.",
      cta: "Explore my journey",
    },
    about: {
      label: "About me",
      title: "Language tied to real life",
      body: [
        "Hello — I'm Maedeh Afshar, born May 3, 2001. My professional focus is teaching English to children, teens, and adults.",
        "I hold a math high-school diploma and an associate degree in English translation from Islamic Azad University, Science and Research Branch. I completed TTC training at Tehran Technical Complex and Novin Language Institute.",
        "I studied for two years at HSE University Moscow in Foreign Languages and Intercultural Communication. I'm now a Russian language student at the University of Tehran. Language levels: English C1, Russian B2.",
        "I've taught at Melal Language Institute for nearly two years. Before that, I spent five months teaching English to children aged 9–12 at Berter Children's Institute.",
      ],
    },
    journey: {
      label: "My path",
      title: "Russia, Tehran, and the road between two languages",
      intro:
        "A concise timeline of my education and teaching in English and Russian.",
      timeline: [
        {
          id: "education-iran",
          title: "Education in Iran",
          text: "Math diploma and associate degree in English translation (Science and Research Branch). TTC certificates from Tehran Technical Complex and Novin Institute.",
        },
        {
          id: "hse-moscow",
          title: "HSE University Moscow",
          text: "Two years in Foreign Languages and Intercultural Communication — deep academic experience in a Russian-speaking environment.",
        },
        {
          id: "tehran-study",
          title: "Russian — University of Tehran",
          text: "Currently studying Russian at the University of Tehran alongside my English teaching.",
        },
        {
          id: "teaching",
          title: "Teaching English",
          text: "Nearly two years at Melal Language Institute; previously five months with children aged 9–12 at Berter Children's Institute.",
        },
      ],
      imagePlaceholder:
        "Image slot — appears when you add a file under assets/images",
    },
    experience: {
      label: "Experience",
      title: "Education, certificates & work",
      items: [
        {
          id: "melal",
          title: "Melal Language Institute",
          text: "Nearly two years teaching English — children, teens, and adults.",
        },
        {
          id: "berter",
          title: "Berter Children's Institute",
          text: "Five months teaching English to children aged 9–12.",
        },
        {
          id: "degrees",
          title: "Education",
          text: "Math diploma; associate degree in English translation (Science and Research Branch).",
        },
        {
          id: "hse-moscow",
          title: "HSE Moscow",
          text: "Two years in Foreign Languages and Intercultural Communication.",
        },
        {
          id: "ut-russian",
          title: "University of Tehran",
          text: "Student of Russian language.",
        },
        {
          id: "ttc",
          title: "TTC certificate",
          text: "Tehran Technical Complex and Novin Language Institute.",
        },
        {
          id: "lang-levels",
          title: "Language levels",
          text: "English C1 · Russian B2",
        },
      ],
    },
    teaching: {
      label: "Teaching approach",
      title: "Practical learning, step by step",
      body: [
        "For me, class is where language leaves the abstract. Conversation practice, gradual grammar, and a safe space to make mistakes — so you can move forward with less pressure.",
        "I've worked with coursebooks including Family and Friends, Got it, and American English File, adapting lessons to children, teens, or adults.",
        "Every learner has a different pace and goal. I align lessons with what you need — conversation, foundations, or exam prep.",
      ],
    },
    courses: {
      label: "Classes",
      title: "English language courses",
      intro:
        "English classes for children, teens, and adults. Message on Telegram or Instagram to coordinate level and schedule.",
      items: [
        {
          id: "conversation",
          visible: true,
          title: "English conversation",
          description:
            "Everyday dialogue, smoother speaking, and confidence in conversation.",
        },
        {
          id: "general",
          visible: true,
          title: "General English",
          description:
            "Strengthening all four skills with focus on understanding and production.",
        },
        {
          id: "grammar",
          visible: true,
          title: "Grammar",
          description:
            "Understanding sentence structure and using rules in speech and writing.",
        },
        {
          id: "exam",
          visible: true,
          title: "Exam preparation",
          description:
            "Structured practice and feedback toward language exam goals.",
        },
        {
          id: "kids",
          visible: true,
          title: "Children & teens",
          description:
            "Experience with learners aged 9–12 and teens, including Family and Friends and Got it.",
        },
        {
          id: "modes",
          visible: true,
          title: "Online & in-person",
          description:
            "Classes online or in person — depending on what we arrange together.",
        },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Questions you might have",
      items: [
        {
          id: "lang-focus",
          question: "Which language do Maedeh's classes focus on?",
          answer:
            "My current teaching focus is English. Russian is part of my personal and academic path, but it is not offered as an active course at the moment.",
        },
        {
          id: "more-info",
          question: "How can I get more information about classes?",
          answer:
            "Use the contact section below or message directly on Instagram @maedehafshar or Telegram @maee_botbot.",
        },
        {
          id: "online-offline",
          question: "Can I ask about online and in-person options?",
          answer:
            "Yes. Mention your preferences in your message and we can discuss online or in-person arrangements.",
        },
        {
          id: "choose-class",
          question: "How do I choose the right class?",
          answer:
            "Briefly share your goal — conversation, foundations, exam prep, children's class, etc. We'll talk through what fits.",
        },
        {
          id: "russian-course",
          question: "Is Russian taught as a class?",
          answer:
            "My main teaching language is English right now. I'm studying Russian at the University of Tehran; if a beginner Russian course is added later, it will be announced on this site.",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Questions about classes",
      intro:
        "If you'd like to ask about classes or coordinate details, use one of the channels below.",
      email: "Email",
      instagram: "Instagram",
      telegram: "Telegram",
      unavailable: "Coming soon",
    },
    footer: {
      tagline: "English Language Teacher",
      navTitle: "Sections",
      contactTitle: "Connect",
      copyright: "All rights reserved.",
    },
    ui: {
      themeLight: "Light theme",
      themeDark: "Dark theme",
      langFa: "فارسی",
      langEn: "English",
      langRu: "Русский",
      portraitAlt: "Portrait of Maedeh Afshar, English language teacher",
      portraitPlaceholder: "Portrait photo placeholder",
      logoAria: "Maedeh Afshar — back to top",
      langGroup: "Language selection",
    },
  },

  ru: {
    meta: {
      title: "Маэде Афшар | Преподаватель английского языка",
      description:
        "Маэде Афшар — преподаватель английского. НИУ ВШЭ (Москва), переводческое образование, языковой институт «Мелал», занятия для детей, подростков и взрослых.",
    },
    nav: {
      about: "Обо мне",
      journey: "Мой путь",
      experience: "Опыт",
      teaching: "Подход",
      courses: "Занятия",
      faq: "Вопросы",
      contact: "Контакты",
      skipToContent: "Перейти к содержанию",
    },
    hero: {
      tagline: "Изучение языка — больше, чем слова",
      role: "Преподаватель английского языка",
      intro:
        "Я Маэде Афшар, преподаватель английского. Веду занятия с детьми, подростками и взрослыми; училась в Москве и продолжаю путь в языках.",
      cta: "Узнать мой путь",
    },
    about: {
      label: "Обо мне",
      title: "Язык, связанный с реальной жизнью",
      body: [
        "Здравствуйте! Я Маэде Афшар, родилась 3 мая 2001 г. Основной фокус — преподавание английского детям, подросткам и взрослым.",
        "Аттестат по математике; среднее специальное образование — перевод английского (филиал «Наука и исследования»). Сертификат TTC — Тегеранский технический комплекс и языковой институт «Новин».",
        "Два года училась в НИУ ВШЭ (Москва) по программе «Иностранные языки и межкультурная коммуникация». Сейчас студентка русского языка в Тегеранском университете. Уровни: английский C1, русский B2.",
        "Около двух лет преподаю в языковом институте «Мелал». Ранее пять месяцев вела английский для детей 9–12 лет в детском институте «Бертер».",
      ],
    },
    journey: {
      label: "Мой путь",
      title: "Россия, Тегеран и дорога между двумя языками",
      intro:
        "Краткая хронология обучения и преподавания английского и русского.",
      timeline: [
        {
          id: "education-iran",
          title: "Образование в Иране",
          text: "Аттестат по математике; переводческое СПО. TTC — технический комплекс и «Новин».",
        },
        {
          id: "hse-moscow",
          title: "НИУ ВШЭ, Москва",
          text: "Два года по программе «Иностранные языки и межкультурная коммуникация».",
        },
        {
          id: "tehran-study",
          title: "Русский язык — Тегеранский университет",
          text: "Сейчас изучаю русский в Тегеранском университете параллельно с преподаванием английского.",
        },
        {
          id: "teaching",
          title: "Преподавание английского",
          text: "Около двух лет в «Мелал»; ранее пять месяцев с детьми 9–12 лет в «Бертер».",
        },
      ],
      imagePlaceholder:
        "Место для изображения — появится после добавления файла в assets/images",
    },
    experience: {
      label: "Опыт и деятельность",
      title: "Образование, сертификаты и работа",
      items: [
        {
          id: "melal",
          title: "Языковой институт «Мелал»",
          text: "Около двух лет преподаю английский — дети, подростки и взрослые.",
        },
        {
          id: "berter",
          title: "Детский институт «Бертер»",
          text: "Пять месяцев английского для детей 9–12 лет.",
        },
        {
          id: "degrees",
          title: "Образование",
          text: "Аттестат по математике; СПО переводчика английского (филиал «Наука и исследования»).",
        },
        {
          id: "hse-moscow",
          title: "ВШЭ, Москва",
          text: "Два года: «Иностранные языки и межкультурная коммуникация».",
        },
        {
          id: "ut-russian",
          title: "Тегеранский университет",
          text: "Студентка русского языка.",
        },
        {
          id: "ttc",
          title: "Сертификат TTC",
          text: "Технический комплекс Тегерана и «Новин».",
        },
        {
          id: "lang-levels",
          title: "Уровни языка",
          text: "Английский C1 · Русский B2",
        },
      ],
    },
    teaching: {
      label: "Подход к обучению",
      title: "Практическое обучение шаг за шагом",
      body: [
        "Для меня урок — место, где язык становится живым. Разговорная практика, постепенное освоение грамматики и пространство, где можно ошибаться без страха.",
        "Работала с учебниками «Фэмили энд Френдс», «Гот Ит» и «Америкэн Инглиш Файл», адаптируя программу для детей, подростков и взрослых.",
        "У каждого ученика свой темп и цель. Согласую занятия с вашими задачами — разговор, база или подготовка к экзамену.",
      ],
    },
    courses: {
      label: "Занятия",
      title: "Курсы английского языка",
      intro:
        "Английский для детей, подростков и взрослых. Напишите в Телеграм или Инстаграм для согласования уровня и расписания.",
      items: [
        {
          id: "conversation",
          visible: true,
          title: "Разговорный английский",
          description:
            "Повседневное общение, более свободная речь и уверенность в диалоге.",
        },
        {
          id: "general",
          visible: true,
          title: "Общий английский",
          description:
            "Развитие всех навыков с акцентом на понимание и использование языка.",
        },
        {
          id: "grammar",
          visible: true,
          title: "Грамматика",
          description:
            "Структура предложений и применение правил в речи и письме.",
        },
        {
          id: "exam",
          visible: true,
          title: "Подготовка к экзаменам",
          description:
            "Целенаправленная практика и обратная связь для экзаменационных целей.",
        },
        {
          id: "kids",
          visible: true,
          title: "Дети и подростки",
          description:
            "Опыт с детьми 9–12 лет и подростками; учебники «Фэмили энд Френдс» и «Гот Ит».",
        },
        {
          id: "modes",
          visible: true,
          title: "Онлайн и очно",
          description:
            "Занятия онлайн или очно — по договорённости и вашим возможностям.",
        },
      ],
    },
    faq: {
      label: "Частые вопросы",
      title: "Возможные вопросы",
      items: [
        {
          id: "lang-focus",
          question: "На каком языке ведутся занятия?",
          answer:
            "Сейчас основной фокус — английский. Русский — часть моего личного и учебного пути, но как активный курс пока не предлагается.",
        },
        {
          id: "more-info",
          question: "Как узнать больше о занятиях?",
          answer:
            "Раздел контактов внизу или напрямую: Инстаграм @maedehafshar, Телеграм @maee_botbot.",
        },
        {
          id: "online-offline",
          question: "Можно ли уточнить про онлайн и очный формат?",
          answer:
            "Да. Напишите о предпочтениях в сообщении — обсудим онлайн или очные занятия.",
        },
        {
          id: "choose-class",
          question: "Как выбрать подходящий класс?",
          answer:
            "Кратко опишите цель — разговор, база, экзамен, детский класс и т.д. Подберём подходящий вариант в переписке.",
        },
        {
          id: "russian-course",
          question: "Есть ли курс русского языка?",
          answer:
            "Сейчас основной язык преподавания — английский. Я изучаю русский в Тегеранском университете; если появится начальный курс русского, об этом будет сообщено на сайте.",
        },
      ],
    },
    contact: {
      label: "Контакты",
      title: "Вопросы о занятиях",
      intro:
        "Если хотите спросить о классах или договориться о деталях, выберите канал ниже.",
      email: "Электронная почта",
      instagram: "Инстаграм",
      telegram: "Телеграм",
      unavailable: "Скоро будет доступно",
    },
    footer: {
      tagline: "Преподаватель английского языка",
      navTitle: "Разделы",
      contactTitle: "Связь",
      copyright: "Все права защищены.",
    },
    ui: {
      themeLight: "Светлая тема",
      themeDark: "Тёмная тема",
      langFa: "فارسی",
      langEn: "Английский",
      langRu: "Русский",
      portraitAlt: "Портрет Маэде Афшар, преподаватель английского языка",
      portraitPlaceholder: "Место для портрета",
      logoAria: "Маэде Афшар — наверх",
      langGroup: "Выбор языка",
    },
  },
};
