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
    <header className="bg-stone-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Restaurant Name */}
          <Link
            href="/"
            className="text-xl font-bold tracking-wide text-amber-400 hover:text-amber-300 transition-colors"
          >
            {info.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                  pathname === link.href ? "text-amber-400" : "text-stone-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={info.orderOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              Order Online
            </a>
          </nav>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
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
          <nav className="md:hidden pb-4 border-t border-stone-800 mt-0 pt-3">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-stone-800 hover:text-amber-400 ${
                      pathname === link.href ? "text-amber-400" : "text-stone-300"
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
                  className="block text-center bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
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
