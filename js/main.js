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

  function buildNavLink(sectionId, label) {
    const a = document.createElement("a");
    a.href = `#${sectionId}`;
    a.textContent = label;
    a.dataset.section = sectionId;
    return a;
  }

  function renderNavigation(c) {
    const desktop = document.getElementById("nav-desktop");
    const mobile = document.getElementById("mobile-nav");
    if (!desktop || !mobile) return;

    desktop.replaceChildren();
    mobile.replaceChildren();

    NAV_SECTIONS.forEach(({ id, key }) => {
      const label = c.nav[key];
      desktop.appendChild(buildNavLink(id, label));
      mobile.appendChild(buildNavLink(id, label));
    });
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

  function renderAbout(c) {
    text(document.getElementById("about-label"), c.about.label);
    text(document.getElementById("about-title"), c.about.title);
    const body = document.getElementById("about-body");
    if (!body) return;
    body.replaceChildren();
    c.about.body.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      body.appendChild(p);
    });
  }

  function createTimelineItem(item, index) {
    const li = document.createElement("li");
    li.className = "timeline-item";
    li.innerHTML = `
      <span class="timeline-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
      <div class="timeline-content">
        <h3 class="timeline-title">${escapeHtml(item.title)}</h3>
        <p class="timeline-text">${escapeHtml(item.text)}</p>
      </div>
    `;
    return li;
  }

  function normalizeJourneyImage(item) {
    if (typeof item === "string") {
      return {
        id: "",
        src: item,
        aspectRatio: "4 / 5",
        objectPosition: "50% 50%",
      };
    }
    return {
      id: item.id || "",
      src: item.src || "",
      aspectRatio: item.aspectRatio || "4 / 5",
      objectPosition: item.objectPosition || "50% 50%",
    };
  }

  function createJourneyImageSlot(config, alt, placeholderText) {
    const figure = document.createElement("figure");
    figure.className = "journey-figure reveal";
    if (config.id) figure.classList.add(`journey-figure--${config.id}`);

    const wrap = document.createElement("div");
    wrap.className = "journey-image-wrap";
    wrap.style.setProperty("--journey-aspect", config.aspectRatio);
    wrap.style.aspectRatio = config.aspectRatio;

    const img = document.createElement("img");
    img.className = "journey-img";
    img.alt = alt;
    img.loading = "lazy";
    img.width = 480;
    img.height = 600;
    img.decoding = "async";
    img.style.objectPosition = config.objectPosition;

    const ph = document.createElement("div");
    ph.className = "journey-placeholder";
    ph.hidden = true;
    ph.innerHTML = `<div class="placeholder-art journey-art" aria-hidden="true"></div>
      <p class="placeholder-text">${escapeHtml(placeholderText)}</p>`;

    wrap.appendChild(img);
    wrap.appendChild(ph);
    figure.appendChild(wrap);

    bindImageFallback(img, ph, config.src);

    return figure;
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

    const images = SITE.images.journey || [];
    const timeline = c.journey.timeline || [];
    const rowCount = Math.max(
      images.length,
      Math.ceil(timeline.length / 2),
      1
    );

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
      const row = document.createElement("div");
      row.className = "journey-row reveal";
      row.style.setProperty("--reveal-delay", `${rowIndex * 0.1}s`);

      const textCol = document.createElement("div");
      textCol.className = "journey-row-text";
      const segment = document.createElement("ol");
      segment.className = "timeline timeline-segment";
      timeline
        .slice(rowIndex * 2, rowIndex * 2 + 2)
        .forEach((item, offset) => {
          segment.appendChild(createTimelineItem(item, rowIndex * 2 + offset));
        });
      textCol.appendChild(segment);

      const mediaCol = document.createElement("div");
      mediaCol.className = "journey-row-media";
      if (images[rowIndex]) {
        const config = normalizeJourneyImage(images[rowIndex]);
        mediaCol.appendChild(
          createJourneyImageSlot(
            config,
            c.ui.journeyImageAlt,
            c.journey.imagePlaceholder
          )
        );
      }

      row.appendChild(textCol);
      row.appendChild(mediaCol);
      rowsEl.appendChild(row);
    }
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
    const body = document.getElementById("teaching-body");
    if (!body) return;
    body.replaceChildren();
    c.teaching.body.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      body.appendChild(p);
    });
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
          <span>${escapeHtml(item.question)}</span>
          <span class="faq-icon" aria-hidden="true"></span>
        </summary>
        <div class="faq-answer"><p>${escapeHtml(item.answer)}</p></div>
      `;
      list.appendChild(details);
    });
  }

  const CONTACT_ICON_SVG = {
    telegram: `<svg class="contact-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="#26A5E4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>`,
    instagram: `<svg class="contact-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><defs><linearGradient id="contact-ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#FD5949"/><stop offset="50%" stop-color="#D6249F"/><stop offset="100%" stop-color="#285AEB"/></linearGradient></defs><path fill="url(#contact-ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.226-.149-4.771-1.664-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
    email: `<svg class="contact-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="#EA4335" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>`,
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

    const menuLabel = document.getElementById("menu-toggle-label");
    const menuBtn = document.getElementById("menu-toggle");
    const mobileOpen = menuBtn && menuBtn.getAttribute("aria-expanded") === "true";
    if (menuLabel) {
      menuLabel.textContent = mobileOpen ? c.nav.menuClose : c.nav.menuOpen;
    }
    if (menuBtn) {
      menuBtn.setAttribute(
        "aria-label",
        mobileOpen ? c.nav.menuClose : c.nav.menuOpen
      );
    }

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
    renderNavigation(c);
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

  function closeMobileNav() {
    const nav = document.getElementById("mobile-nav");
    const toggle = document.getElementById("menu-toggle");
    if (!nav || !toggle) return;
    nav.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    updateUiChrome(getContent());
  }

  function openMobileNav() {
    const nav = document.getElementById("mobile-nav");
    const toggle = document.getElementById("menu-toggle");
    if (!nav || !toggle) return;
    nav.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    updateUiChrome(getContent());
  }

  function toggleMobileNav() {
    const toggle = document.getElementById("menu-toggle");
    if (!toggle) return;
    if (toggle.getAttribute("aria-expanded") === "true") closeMobileNav();
    else openMobileNav();
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
      closeMobileNav();
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

  function bindEvents() {
    document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyLanguage(btn.dataset.lang, true);
      });
    });

    document.getElementById("menu-toggle")?.addEventListener("click", toggleMobileNav);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileNav();
    });

    bindSmoothScroll();
    bindHeaderScroll();
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
