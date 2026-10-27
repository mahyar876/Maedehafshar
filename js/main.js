(function () {
  "use strict";

  const STORAGE = { lang: "maedeh_lang", theme: "maedeh_theme" };
  const DEFAULT_LANG = "fa";
  const DEFAULT_THEME = "light";

  const NAV_SECTIONS = [
    { id: "about", key: "about" },
    { id: "journey", key: "journey" },
    { id: "experience", key: "experience" },
    { id: "teaching", key: "teaching" },
    { id: "courses", key: "courses" },
    { id: "faq", key: "faq" },
    { id: "contact", key: "contact" },
  ];

  let currentLang = DEFAULT_LANG;
  let scrollObserver = null;
  let headerScrollBound = false;
  function safeStorageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  }

  function getContent() {
    return CONTENT[currentLang] || CONTENT.fa;
  }

  function getDisplayName() {
    const localized = SITE.brand.nameLocalized;
    if (localized && localized[currentLang]) return localized[currentLang];
    return SITE.brand.name;
  }

  function setDocumentDirection(lang) {
    const html = document.documentElement;
    html.lang = lang === "fa" ? "fa" : lang === "ru" ? "ru" : "en";
    html.dir = lang === "fa" ? "rtl" : "ltr";
  }

  function text(el, value) {
    if (el && value != null) el.textContent = value;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderHero(c) {
    text(document.getElementById("hero-role"), c.hero.role);
    text(document.getElementById("hero-title"), getDisplayName());
    text(document.getElementById("brand-name"), getDisplayName());
    text(document.getElementById("footer-name"), getDisplayName());
    text(document.getElementById("hero-tagline"), c.hero.tagline);
    text(document.getElementById("hero-intro"), c.hero.intro);
    const cta = document.getElementById("hero-cta");
    if (cta) {
      cta.textContent = c.hero.cta;
      cta.setAttribute("aria-label", c.hero.cta);
    }
  }

  function fillParagraphs(container, paragraphs) {
    if (!container) return;
    container.replaceChildren();
    paragraphs.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      container.appendChild(p);
    });
  }

  function renderAbout(c) {
    text(document.getElementById("about-label"), c.about.label);
    text(document.getElementById("about-title"), c.about.title);
    fillParagraphs(document.getElementById("about-body"), c.about.body);
  }

  function createJourneyStep(item, index) {
    const li = document.createElement("li");
    li.className = "journey-step";

    const article = document.createElement("article");
    article.className = "journey-step-card reveal";
    article.style.setProperty("--reveal-delay", `${index * 0.07}s`);

    const details = document.createElement("details");
    details.className = "journey-step-details";

    const summary = document.createElement("summary");
    summary.className = "journey-step-summary";

    const num = document.createElement("span");
    num.className = "journey-step-num";
    num.setAttribute("aria-hidden", "true");
    num.textContent = String(index + 1).padStart(2, "0");

    const title = document.createElement("span");
    title.className = "journey-step-title";
    title.textContent = item.title;

    const toggle = document.createElement("span");
    toggle.className = "journey-step-toggle accordion-toggle";
    toggle.setAttribute("aria-hidden", "true");

    summary.append(num, title, toggle);

    const wrap = document.createElement("div");
    wrap.className = "journey-step-body-wrap accordion-panel-wrap";

    const inner = document.createElement("div");
    inner.className = "journey-step-body-inner accordion-panel-inner";

    const body = document.createElement("div");
    body.className = "journey-step-body accordion-panel";
    const paragraph = document.createElement("p");
    paragraph.textContent = item.text;
    body.appendChild(paragraph);

    inner.appendChild(body);
    wrap.appendChild(inner);
    details.append(summary, wrap);
    article.appendChild(details);
    li.appendChild(article);
    return li;
  }

  function bindImageFallback(img, placeholderEl, src) {
    if (!img) return;
    if (!src) {
      img.hidden = true;
      if (placeholderEl) placeholderEl.hidden = false;
      return;
    }

    const showImage = () => {
      img.hidden = false;
      if (placeholderEl) placeholderEl.hidden = true;
    };
    const showPlaceholder = () => {
      img.hidden = true;
      img.removeAttribute("src");
      if (placeholderEl) placeholderEl.hidden = false;
    };

    img.onload = showImage;
    img.onerror = showPlaceholder;
    img.src = src;

    if (img.complete && img.naturalWidth > 0) {
      showImage();
    }
  }

  function renderJourney(c) {
    text(document.getElementById("journey-label"), c.journey.label);
    text(document.getElementById("journey-title"), c.journey.title);
    text(document.getElementById("journey-intro"), c.journey.intro);

    const rowsEl = document.getElementById("journey-rows");
    if (!rowsEl) return;
    rowsEl.replaceChildren();

    const timeline = c.journey.timeline || [];
    const list = document.createElement("ol");
    list.className = "journey-path reveal";

    timeline.forEach((item, index) => {
      list.appendChild(createJourneyStep(item, index));
    });

    rowsEl.appendChild(list);
  }

  function renderExperience(c) {
    text(document.getElementById("experience-label"), c.experience.label);
    text(document.getElementById("experience-title"), c.experience.title);
    const grid = document.getElementById("experience-grid");
    if (!grid) return;
    grid.replaceChildren();
    c.experience.items.forEach((item, index) => {
      const article = document.createElement("article");
      article.className = `experience-card reveal exp-${item.id}`;
      article.style.setProperty("--reveal-delay", `${index * 0.06}s`);
      article.innerHTML = `
        <h3 class="card-title">${escapeHtml(item.title)}</h3>
        <p class="card-text">${escapeHtml(item.text)}</p>
      `;
      grid.appendChild(article);
    });
  }

  function renderTeaching(c) {
    text(document.getElementById("teaching-label"), c.teaching.label);
    text(document.getElementById("teaching-title"), c.teaching.title);
    fillParagraphs(document.getElementById("teaching-body"), c.teaching.body);
  }

  function renderCourses(c) {
    text(document.getElementById("courses-label"), c.courses.label);
    text(document.getElementById("courses-title"), c.courses.title);
    text(document.getElementById("courses-intro"), c.courses.intro);
    const grid = document.getElementById("courses-grid");
    if (!grid) return;
    grid.replaceChildren();
    c.courses.items
      .filter((item) => item.visible !== false)
      .forEach((item, index) => {
        const article = document.createElement("article");
        article.className = `course-card reveal course-${item.id}`;
        article.style.setProperty("--reveal-delay", `${index * 0.05}s`);
        article.innerHTML = `
          <div class="course-accent" aria-hidden="true"></div>
          <h3 class="card-title">${escapeHtml(item.title)}</h3>
          <p class="card-text">${escapeHtml(item.description)}</p>
        `;
        grid.appendChild(article);
      });
  }

  function renderFaq(c) {
    text(document.getElementById("faq-label"), c.faq.label);
    text(document.getElementById("faq-title"), c.faq.title);
    const list = document.getElementById("faq-list");
    if (!list) return;
    list.replaceChildren();
    c.faq.items.forEach((item, index) => {
      const details = document.createElement("details");
      details.className = "faq-item reveal";
      details.style.setProperty("--reveal-delay", `${index * 0.04}s`);
      details.innerHTML = `
        <summary class="faq-question">
          <span class="faq-question-text">${escapeHtml(item.question)}</span>
          <span class="faq-icon accordion-toggle" aria-hidden="true"></span>
        </summary>
        <div class="faq-answer-wrap accordion-panel-wrap">
          <div class="faq-answer-inner accordion-panel-inner">
            <div class="faq-answer accordion-panel"><p>${escapeHtml(item.answer)}</p></div>
          </div>
        </div>
      `;
      list.appendChild(details);
    });
  }

  const CONTACT_ICON_SVG = {
    telegram: `<svg class="contact-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M11.944 2.667A9.333 9.333 0 1 0 21.28 12a9.333 9.333 0 0 0-9.336-9.333Zm4.62 6.48-1.58 7.45c-.12.54-.44.67-.89.42l-2.46-1.81-1.19 1.15c-.13.13-.24.24-.49.24l.18-2.52 4.57-4.13c.2-.18-.04-.28-.31-.1l-5.65 3.56-2.43-.76c-.53-.16-.54-.53.11-.79l9.52-3.67c.44-.16.82.1.68.79Z"/></svg>`,
    instagram: `<svg class="contact-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.92a3.12 3.12 0 1 1 0-6.24 3.12 3.12 0 0 1 0 6.24Zm5.04-8.16a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM12 2.88c-2.64 0-2.96.01-4 .05-1.04.05-1.75.21-2.37.45-.64.25-1.19.58-1.73 1.12-.54.54-.87 1.09-1.12 1.73-.24.62-.4 1.33-.45 2.37-.04 1.04-.05 1.36-.05 4s.01 2.96.05 4c.05 1.04.21 1.75.45 2.37.25.64.58 1.19 1.12 1.73.54.54 1.09.87 1.73 1.12.62.24 1.33.4 2.37.45 1.04.04 1.36.05 4 .05s2.96-.01 4-.05c1.04-.05 1.75-.21 2.37-.45.64-.25 1.19-.58 1.73-1.12.54-.54.87-1.09 1.12-1.73.24-.62.4-1.33.45-2.37.04-1.04.05-1.36.05-4s-.01-2.96-.05-4c-.05-1.04-.21-1.75-.45-2.37-.25-.64-.58-1.19-1.12-1.73-.54-.54-1.09-.87-1.73-1.12-.62-.24-1.33-.4-2.37-.45-1.04-.04-1.36-.05-4-.05Zm0 1.92c2.6 0 2.91.01 3.94.05 1.01.05 1.56.22 1.92.37.48.19.82.41 1.18.77.36.36.58.7.77 1.18.15.36.32.91.37 1.92.04 1.03.05 1.34.05 3.94s-.01 2.91-.05 3.94c-.05 1.01-.22 1.56-.37 1.92-.19.48-.41.82-.77 1.18-.36.36-.7.58-1.18.77-.36.15-.91.32-1.92.37-1.03.04-1.34.05-3.94.05s-2.91-.01-3.94-.05c-1.01-.05-1.56-.22-1.92-.37-.48-.19-.82-.41-1.18-.77-.36-.36-.58-.7-.77-1.18-.15-.36-.32-.91-.37-1.92-.04-1.03-.05-1.34-.05-3.94s.01-2.91.05-3.94c.05-1.01.22-1.56.37-1.92.19-.48.41-.82.77-1.18.36-.36.7-.58 1.18-.77.36-.15.91-.32 1.92-.37 1.03-.04 1.34-.05 3.94-.05Z"/></svg>`,
    email: `<svg class="contact-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.01L12 13l8-6.99V6H4Zm16 12V9.25l-7.4 6.48a1 1 0 0 1-1.2 0L4 9.25V18h16Z"/></svg>`,
  };

  function getContactChannels(c) {
    const email = (SITE.contact.email || "").trim();
    const instagram = (SITE.contact.instagram || "").trim();
    const telegram = (SITE.contact.telegram || "").trim();

    return [
      {
        id: "telegram",
        label: c.contact.telegram,
        href: telegram,
        display: telegram
          ? SITE.contact.telegramHandle || telegram
          : c.contact.unavailable,
        external: true,
      },
      {
        id: "instagram",
        label: c.contact.instagram,
        href: instagram,
        display: instagram
          ? SITE.contact.instagramHandle || instagram
          : c.contact.unavailable,
        external: true,
      },
      {
        id: "email",
        label: c.contact.email,
        href: email ? `mailto:${email}` : "",
        display: email || c.contact.unavailable,
        external: false,
      },
    ];
  }

  function createContactLogo(channel, c) {
    const active = Boolean(channel.href);
    const iconSvg = CONTACT_ICON_SVG[channel.id] || "";
    const el = document.createElement(active ? "a" : "span");
    el.className = `contact-logo contact-logo-${channel.id}${active ? "" : " is-disabled"}`;

    if (active) {
      el.href = channel.href;
      el.setAttribute("aria-label", channel.label);
      if (channel.external) {
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      }
    } else {
      el.setAttribute("aria-disabled", "true");
      el.setAttribute(
        "aria-label",
        `${channel.label} — ${c.contact.unavailable}`
      );
      el.title = c.contact.unavailable;
    }

    el.innerHTML = iconSvg;
    return el;
  }

  function renderContact(c) {
    text(document.getElementById("contact-label"), c.contact.label);
    text(document.getElementById("contact-title"), c.contact.title);
    text(document.getElementById("contact-intro"), c.contact.intro);
    const wrap = document.getElementById("contact-cards");
    if (!wrap) return;
    wrap.replaceChildren();
    getContactChannels(c).forEach((ch) => {
      wrap.appendChild(createContactLogo(ch, c));
    });
  }

  function renderFooter(c) {
    text(document.getElementById("footer-role"), c.footer.tagline);
    text(document.getElementById("footer-nav-title"), c.footer.navTitle);
    text(document.getElementById("footer-contact-title"), c.footer.contactTitle);

    const footerLinks = document.getElementById("footer-links");
    if (footerLinks) {
      footerLinks.replaceChildren();
      NAV_SECTIONS.forEach(({ id, key }) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#${id}`;
        a.textContent = c.nav[key];
        li.appendChild(a);
        footerLinks.appendChild(li);
      });
    }

    const footerContact = document.getElementById("footer-contact-links");
    if (footerContact) {
      footerContact.replaceChildren();
      getContactChannels(c).forEach((ch) => {
        const li = document.createElement("li");
        if (ch.href) {
          const a = document.createElement("a");
          a.href = ch.href;
          a.textContent = ch.label;
          if (ch.external) {
            a.target = "_blank";
            a.rel = "noopener noreferrer";
          }
          li.appendChild(a);
        } else {
          const span = document.createElement("span");
          span.className = "footer-contact-muted";
          span.textContent = `${ch.label}: ${c.contact.unavailable}`;
          li.appendChild(span);
        }
        footerContact.appendChild(li);
      });
    }

    const year = new Date().getFullYear();
    const copy = document.getElementById("footer-copy");
    if (copy) {
      copy.textContent = `© ${year} ${getDisplayName()}. ${c.footer.copyright}`;
    }
  }

  function updateMeta(c) {
    document.title = c.meta.title;
    const desc = document.getElementById("meta-description");
    const ogTitle = document.getElementById("og-title");
    const ogDesc = document.getElementById("og-description");
    if (desc) desc.setAttribute("content", c.meta.description);
    if (ogTitle) ogTitle.setAttribute("content", c.meta.title);
    if (ogDesc) ogDesc.setAttribute("content", c.meta.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (SITE.canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = SITE.canonicalUrl;
    } else if (canonical) {
      canonical.remove();
    }
  }

  function updateUiChrome(c) {
    const skip = document.getElementById("skip-link");
    if (skip) skip.textContent = c.nav.skipToContent;

    const brand = document.getElementById("brand-link");
    if (brand) brand.setAttribute("aria-label", c.ui.logoAria);

    updateThemeToggleLabel(c);
    updateLangButtons();
    setupPortrait(c);
    const langSwitch = document.getElementById("lang-switch");
    if (langSwitch) langSwitch.setAttribute("aria-label", c.ui.langGroup);
  }

  function setupPortrait(c) {
    const img = document.getElementById("portrait-img");
    const ph = document.getElementById("portrait-placeholder");
    const phText = document.getElementById("portrait-placeholder-text");
    if (phText) phText.textContent = c.ui.portraitPlaceholder;
    if (img) img.alt = c.ui.portraitAlt;
    if (img && ph) bindImageFallback(img, ph, SITE.images.portrait);
  }

  function updateLangButtons() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const lang = btn.dataset.lang;
      const isActive = lang === currentLang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      const c = CONTENT[lang];
      if (c && lang === "fa") btn.setAttribute("aria-label", c.ui.langFa);
      if (c && lang === "en") btn.setAttribute("aria-label", c.ui.langEn);
      if (c && lang === "ru") btn.setAttribute("aria-label", c.ui.langRu);
    });
  }

  function updateThemeToggleLabel(c) {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const isDark = document.documentElement.dataset.theme === "dark";
    btn.setAttribute("aria-label", isDark ? c.ui.themeLight : c.ui.themeDark);
    btn.setAttribute("aria-pressed", isDark ? "true" : "false");
  }

  function applyTheme(theme) {
    const resolved = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = resolved;
    safeStorageSet(STORAGE.theme, resolved);
    updateThemeToggleLabel(getContent());
  }

  function toggleTheme() {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
  }

  function renderAll() {
    const c = getContent();
    setDocumentDirection(currentLang);
    updateMeta(c);
    renderHero(c);
    renderAbout(c);
    renderJourney(c);
    renderExperience(c);
    renderTeaching(c);
    renderCourses(c);
    renderFaq(c);
    renderContact(c);
    renderFooter(c);
    updateUiChrome(c);
    injectPersonSchema(c);
    observeRevealElements();
  }

  function injectPersonSchema(c) {
    let script = document.getElementById("schema-person");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "schema-person";
      document.head.appendChild(script);
    }
    const data = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: getDisplayName(),
      jobTitle: c.hero.role,
      description: c.meta.description,
    };
    if (SITE.contact.email) data.email = SITE.contact.email;
    script.textContent = JSON.stringify(data);
  }

  function applyLanguage(lang, preserveScroll) {
    if (!CONTENT[lang]) lang = DEFAULT_LANG;
    const y = preserveScroll ? window.scrollY : null;
    currentLang = lang;
    safeStorageSet(STORAGE.lang, lang);
    renderAll();
    if (preserveScroll && y != null) {
      requestAnimationFrame(() => window.scrollTo(0, y));
    }
  }

  function onHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function bindHeaderScroll() {
    if (headerScrollBound) return;
    headerScrollBound = true;
    window.addEventListener("scroll", onHeaderScroll, { passive: true });
    onHeaderScroll();
  }

  function bindSmoothScroll() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const header = document.getElementById("site-header");
      const offset = header ? header.offsetHeight + 8 : 0;
      const top =
        target.getBoundingClientRect().top + window.scrollY - offset;
      smoothScrollTo(top);
    });
  }

  function smoothScrollTo(top) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }

  function observeRevealElements() {
    if (scrollObserver) scrollObserver.disconnect();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll(".reveal");
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    items.forEach((el) => {
      el.classList.remove("is-visible");
      scrollObserver.observe(el);
    });
  }

  function initHeroEntrance() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("is-ready");
    if (reduced) {
      document.querySelectorAll(".hero-animate").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }
    requestAnimationFrame(() => {
      document.querySelectorAll(".hero-animate").forEach((el, i) => {
        setTimeout(() => el.classList.add("is-visible"), 80 + i * 120);
      });
    });
  }

  function closeAnimatedDetails(details) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      details.open = false;
      return;
    }

    if (details.classList.contains("is-closing")) return;
    details.classList.add("is-closing");

    const wrap = details.querySelector(".accordion-panel-wrap");
    if (!wrap) {
      details.open = false;
      details.classList.remove("is-closing");
      return;
    }

    const finish = () => {
      details.open = false;
      details.classList.remove("is-closing");
    };

    wrap.addEventListener(
      "transitionend",
      (event) => {
        if (event.target === wrap) finish();
      },
      { once: true }
    );

    window.setTimeout(finish, 520);
  }

  function initAccordionMotion() {
    const configs = [
      { rootId: "journey-rows", summary: ".journey-step-summary" },
      { rootId: "faq-list", summary: ".faq-question" },
    ];

    configs.forEach(({ rootId, summary }) => {
      const root = document.getElementById(rootId);
      if (!root || root.dataset.accordionMotionBound === "1") return;
      root.dataset.accordionMotionBound = "1";

      root.addEventListener("click", (event) => {
        const summaryEl = event.target.closest(summary);
        if (!summaryEl || !root.contains(summaryEl)) return;

        const details = summaryEl.closest("details");
        if (!details || !details.open || details.classList.contains("is-closing")) return;

        event.preventDefault();
        closeAnimatedDetails(details);
      });
    });
  }

  function bindEvents() {
    document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyLanguage(btn.dataset.lang, true);
      });
    });

    bindSmoothScroll();
    bindHeaderScroll();
    initAccordionMotion();
  }

  function init() {
    if (typeof CONTENT === "undefined" || typeof SITE === "undefined") return;

    const storedLang = safeStorageGet(STORAGE.lang);
    const storedTheme = safeStorageGet(STORAGE.theme);

    currentLang = CONTENT[storedLang] ? storedLang : DEFAULT_LANG;
    applyTheme(storedTheme === "dark" ? "dark" : DEFAULT_THEME);

    document.body.classList.add("js-reveal-ready");
    renderAll();
    bindEvents();
    initHeroEntrance();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
