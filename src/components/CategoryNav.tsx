"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Category = { id: string; name: string };

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? "");

  // containerRef: the sticky nav bar (used for threshold calculation and outside-click detection)
  // scrollRef:    the inner horizontally-scrollable pill strip
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── Scroll indicators ──────────────────────────────────────────────────────
  // Show/hide the left and right fade edges and arrow buttons based on whether
  // there is more content to scroll in each direction. A 4px deadzone prevents
  // flickering at the exact boundary.
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  // ── Scroll spy ─────────────────────────────────────────────────────────────
  // Determines which section the user is currently reading and highlights the
  // corresponding pill. Positions are cached on mount so the scroll handler
  // only reads window.scrollY (no getBoundingClientRect during scroll =
  // no forced reflow).
  useEffect(() => {
    const navEl = containerRef.current;
    if (!navEl) return;

    // Trigger line: just below the sticky nav bar
    const threshold = navEl.getBoundingClientRect().bottom + 16;

    // Absolute document-coordinate top of each section heading, computed once
    const sectionTops = categories.map((cat) => {
      const el = document.getElementById(cat.id);
      return { id: cat.id, top: el ? el.getBoundingClientRect().top + window.scrollY : Infinity };
    });

    function handleScroll() {
      const scrollY = window.scrollY;
      // Active = last section whose heading has reached or passed the trigger line
      let active = categories[0]?.id ?? "";
      for (const s of sectionTops) {
        if (s.top - scrollY <= threshold) active = s.id;
      }
      setActiveId((prev) => (prev === active ? prev : active));
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set correct initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  // ── Center active pill in the nav strip ────────────────────────────────────
  // Smoothly scrolls the pill strip so the active category is centered.
  const centerNavLink = useCallback((id: string) => {
    const el = scrollRef.current;
    if (!el) return;
    const link = el.querySelector<HTMLElement>(`a[href="#${id}"]`);
    if (!link) return;
    const linkRect = link.getBoundingClientRect();
    const containerRect = el.getBoundingClientRect();
    const linkCenter = linkRect.left - containerRect.left + el.scrollLeft + linkRect.width / 2;
    el.scrollTo({ left: linkCenter - el.clientWidth / 2, behavior: "smooth" });
  }, []);

  useEffect(() => {
    centerNavLink(activeId);
  }, [activeId, centerNavLink]);

  // ── Close dropdown on outside click ───────────────────────────────────────
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ── Helpers ────────────────────────────────────────────────────────────────
  function scrollStrip(amount: number) {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  function handleCategorySelect(catId: string) {
    setOpen(false);
    centerNavLink(catId);
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="sticky top-35 z-40 bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 py-2">

        {/* Left arrow — desktop only */}
        <button
          onClick={() => scrollStrip(-220)}
          aria-label="Scroll categories left"
          className={`hidden md:flex shrink-0 items-center justify-center w-7 h-7 rounded-full text-ink-muted hover:bg-ink/10 transition-opacity ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable pill strip with fade edges indicating more content */}
        <div className="relative flex-1 min-w-0">
          <div className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 transition-opacity duration-200 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`} />
          <div className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 transition-opacity duration-200 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`} />

          <div ref={scrollRef} className="overflow-x-auto overflow-y-hidden scrollbar-hide">
            <ul className="flex gap-1 min-w-max">
              {categories.map((cat) => {
                const isActive = cat.id === activeId;
                return (
                  <li key={cat.id}>
                    <a
                      href={`#${cat.id}`}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                        isActive
                          ? "text-accent bg-accent/10 font-semibold"
                          : "text-ink-muted hover:text-accent hover:bg-accent/10"
                      }`}
                    >
                      {cat.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right arrow — desktop only */}
        <button
          onClick={() => scrollStrip(220)}
          aria-label="Scroll categories right"
          className={`hidden md:flex shrink-0 items-center justify-center w-7 h-7 rounded-full text-ink-muted hover:bg-ink/10 transition-opacity ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* "All" button — opens the full category dropdown */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Browse all categories"
          aria-expanded={open}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-ink hover:bg-ink/10 transition-colors border border-stone-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          All
        </button>
      </div>

      {/* Dropdown panel — full category grid */}
      {open && (
        <div className="absolute left-0 right-0 bg-white border-b border-stone-200 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    cat.id === activeId
                      ? "text-accent bg-accent/10 font-semibold"
                      : "text-ink-muted hover:text-accent hover:bg-accent/10"
                  }`}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
