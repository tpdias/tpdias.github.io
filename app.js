/* =========================================================
   Thiago Parisotto — Portfolio interactions
   Theme toggle · mobile nav · scroll reveal · carousel
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Theme: respect system pref, remember choice ---------- */
  var STORE_KEY = "tp-theme";
  var root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#08080a" : "#fbfbfd");
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }

  var stored = null;
  try { stored = localStorage.getItem(STORE_KEY); } catch (e) {}
  var systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(stored || (systemDark ? "dark" : "light"));

  // Follow system changes only when the user hasn't set an explicit preference
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      var hasStored;
      try { hasStored = localStorage.getItem(STORE_KEY); } catch (err) { hasStored = null; }
      if (!hasStored) applyTheme(e.matches ? "dark" : "light");
    });
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest(".theme-toggle");
    if (!t) return;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(STORE_KEY, next); } catch (err) {}
  });

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".header");
  function onScroll() {
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var hamburger = document.querySelector(".hamburger");
  var menu = document.querySelector(".mobile-menu");
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (hamburger && menu) {
    hamburger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    window.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) closeMenu(); });
  }

  /* ---------- Scroll reveal (robust: IO + scroll/timeout fallback) ---------- */
  root.classList.add("js");
  var revealEls = [].slice.call(document.querySelectorAll(".reveal"));
  function revealInView() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < revealEls.length; i++) {
      var el = revealEls[i];
      if (el.classList.contains("in")) continue;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("in");
    }
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }
  // Fallbacks — guarantee content is never stuck invisible
  window.addEventListener("scroll", revealInView, { passive: true });
  window.addEventListener("resize", revealInView);
  window.addEventListener("load", function () { setTimeout(revealInView, 60); });
  revealInView();
  setTimeout(revealInView, 1400);

  /* ---------- Carousel ---------- */
  var track = document.querySelector(".carousel-track");
  if (track) {
    var prev = document.querySelector(".carousel-prev");
    var next = document.querySelector(".carousel-next");
    function scrollAmount() {
      var slide = track.querySelector(".slide");
      return slide ? slide.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
    }
    function updateArrows() {
      if (!prev || !next) return;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    }
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -scrollAmount(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: scrollAmount(), behavior: "smooth" }); });
    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    updateArrows();
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav a");
  if ("IntersectionObserver" in window && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (a) {
            a.style.color = a.getAttribute("href") === "#" + id ? "var(--text)" : "";
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Current year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
