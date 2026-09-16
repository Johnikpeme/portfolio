/* =========================================================
   John Ikpeme portfolio interactions
   Vanilla JS + GSAP (ScrollTrigger, SplitText) + Lenis.
   Everything degrades: no JS → content is fully visible.
   ========================================================= */
(() => {
  "use strict";

  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = typeof window.gsap !== "undefined";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Theme ---------- */
  const themeBtn = $("#theme-toggle");
  // The site is light by default; only an explicit choice (stored in localStorage) switches it.
  const currentTheme = () => root.dataset.theme || "light";
  const applyThemeMeta = () => {
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", currentTheme() === "dark" ? "#0d0c10" : "#fcfcfd");
    if (themeBtn) themeBtn.setAttribute("aria-pressed", String(currentTheme() === "dark"));
  };
  applyThemeMeta();
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      const swap = () => {
        root.classList.add("is-switching");
        root.dataset.theme = next;
        try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
        applyThemeMeta();
        requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("is-switching")));
      };
      if (document.startViewTransition && !reduce) document.startViewTransition(swap);
      else swap();
    });
  }


  /* ---------- Copy email ---------- */
  $$("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = value; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (err) { /* ignore */ }
        ta.remove();
      }
      btn.classList.add("is-copied");
      btn.setAttribute("aria-label", "Email address copied");
      setTimeout(() => { btn.classList.remove("is-copied"); btn.removeAttribute("aria-label"); }, 1800);
    });
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $("#menu-btn");
  const mobileMenu = $("#mobile-menu");
  const setMenu = (open) => {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileMenu.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
  };
  if (menuBtn) {
    menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
    $$("a", mobileMenu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  }

  /* ---------- Smooth scroll (Lenis) ---------- */
  let lenis = null;
  if (!reduce && typeof window.Lenis !== "undefined" && finePointer) {
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    window.__lenis = lenis;
    if (hasGsap) {
      lenis.on("scroll", () => window.ScrollTrigger && window.ScrollTrigger.update());
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  // Anchor links: scroll with offset for the fixed nav.
  const navH = () => ($("#nav") ? $("#nav").offsetHeight : 72);
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - (id === "#top" ? 0 : navH() - 8);
      if (lenis) lenis.scrollTo(y, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
      else window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    });
  });

  /* ---------- Nav state ---------- */
  const nav = $("#nav");
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle("is-scrolled", y > 24);
      nav.classList.toggle("is-hidden", y > lastY && y > 320 && Math.abs(y - lastY) > 4);
    }
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  if (lenis) lenis.on("scroll", onScroll);
  onScroll();

  // Active section link
  const navLinks = $$(".nav__links a");
  if (navLinks.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a) => a.setAttribute("aria-current", a.hash === "#" + en.target.id ? "true" : "false"));
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    $$("main section[id]").forEach((s) => io.observe(s));
  }

  /* ---------- Scroll progress ---------- */
  const progress = $(".progress");
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  if (lenis) lenis.on("scroll", updateProgress);
  updateProgress();

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduce && hasGsap) {
    $$("[data-magnetic]").forEach((el) => {
      const strength = 0.28;
      const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * strength);
        yTo((e.clientY - r.top - r.height / 2) * strength);
      });
      el.addEventListener("pointerleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.45)" }));
    });
  }

  /* ---------- Product mock tabs ---------- */
  $$("[data-mock]").forEach((mock) => {
    const tabs = $$(".mk-tabs button", mock);
    const views = $$(".mk-view", mock);
    if (tabs.length < 2 || tabs.length !== views.length) return;
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => {
        if (tab.classList.contains("is-on")) return;
        tabs.forEach((t) => t.classList.toggle("is-on", t === tab));
        views.forEach((v, n) => v.classList.toggle("is-on", n === i));
      });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$("[data-reveal], [data-reveal-stagger]");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        obs.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.05 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Count-up stats ---------- */
  const counters = $$("[data-count]");
  const fmt = (n) => n.toLocaleString("en-US");
  const renderCount = (el, v) => {
    el.textContent = (el.dataset.prefix || "") + fmt(Math.round(v)) + (el.dataset.suffix || "");
  };
  if (counters.length) {
    if (reduce || !hasGsap) counters.forEach((el) => renderCount(el, +el.dataset.count));
    else {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target, end = +el.dataset.count, obj = { v: 0 };
          gsap.to(obj, { v: end, duration: 1.6, ease: "power2.out", onUpdate: () => renderCount(el, obj.v) });
          obs.unobserve(el);
        });
      }, { threshold: 0.4 });
      counters.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Case-study expanders ---------- */
  $$(".case__toggle").forEach((btn) => {
    const panel = $("#" + btn.getAttribute("aria-controls"));
    if (!panel) return;
    const inner = panel.firstElementChild;
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      if (open) {
        panel.hidden = false;
        panel.classList.add("is-open");
        const h = inner.getBoundingClientRect().height;
        if (hasGsap && !reduce) {
          gsap.fromTo(panel, { height: 0 }, { height: h, duration: 0.7, ease: "power3.inOut", onComplete: () => { panel.style.height = "auto"; window.ScrollTrigger && ScrollTrigger.refresh(); } });
          gsap.fromTo($$(":scope > *", inner), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06, ease: "power3.out", delay: 0.2 });
        } else {
          panel.style.height = "auto";
        }
      } else {
        const h = inner.getBoundingClientRect().height;
        if (hasGsap && !reduce) {
          gsap.fromTo(panel, { height: h }, { height: 0, duration: 0.5, ease: "power3.inOut", onComplete: () => { panel.hidden = true; panel.classList.remove("is-open"); panel.style.height = ""; window.ScrollTrigger && ScrollTrigger.refresh(); } });
        } else {
          panel.hidden = true; panel.classList.remove("is-open"); panel.style.height = "";
        }
      }
    });
  });

  /* ---------- Hero entrance ---------- */
  const heroTitle = $("#hero-title");
  const heroBits = $$("[data-hero]");
  const runHero = () => {
    if (!hasGsap || reduce || !heroTitle) {
      heroBits.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    let lines = null;
    if (window.SplitText) {
      try {
        gsap.registerPlugin(SplitText);
        const split = SplitText.create(heroTitle, { type: "lines", linesClass: "line", aria: "auto" });
        lines = split.lines;
      } catch (e) { lines = null; }
    }
    if (lines && lines.length) {
      gsap.set(heroTitle, { autoAlpha: 1 });
      tl.from(lines, { yPercent: 115, duration: 1.15, stagger: 0.09 }, 0.1);
    } else {
      tl.from(heroTitle, { y: 40, autoAlpha: 0, duration: 1.1 }, 0.1);
    }
    tl.to(heroBits, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1 }, 0.45);
  };
  if (hasGsap && !reduce) {
    gsap.set(heroBits, { y: 26, autoAlpha: 0 });
    if (heroTitle) gsap.set(heroTitle, { autoAlpha: 0 });
  }
  const start = () => (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(runHero);
  if (document.readyState === "complete") start(); else window.addEventListener("load", start, { once: true });

  /* ---------- Parallax on hero background & footer name ---------- */
  if (hasGsap && !reduce) {
    gsap.registerPlugin(ScrollTrigger);
    const bigName = $(".footer__marquee-name");
    if (bigName) gsap.fromTo(bigName, { xPercent: -6 }, { xPercent: 2, ease: "none", scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: 1 } });
    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  }

})();
