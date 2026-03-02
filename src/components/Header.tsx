"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import info from "@/data/info.json";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Gift Cards", href: "/gift-cards" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-surface text-ink sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-35">
          {/* Logo */}
          <img src={info.logo} alt={info.name} className="h-35 w-auto" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium transition-colors hover:text-accent ${
                  pathname === link.href ? "text-accent" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={info.orderOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 bg-btn hover:bg-btn-hover text-white text-lg font-medium px-4 py-2 rounded-full transition-colors"
            >
              Order Online
            </a>
          </nav>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md text-ink hover:text-accent hover:bg-ink/10 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              /* X icon */
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-ink/20 mt-0 pt-3">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 rounded-md text-lg font-medium transition-colors hover:bg-ink/10 hover:text-accent ${
                      pathname === link.href ? "text-accent" : "text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 px-3">
                <a
                  href={info.orderOnlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-btn hover:bg-btn-hover text-white text-lg font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  Order Online
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
