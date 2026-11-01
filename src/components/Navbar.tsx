
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleDot, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Facilities", href: "/facilities" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="z-50 w-full border-b border-gray-100 bg-white fixed">
      <nav className="mx-auto flex h-[78px] max-w-[1450px] items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#13a34b] text-white shadow-md">
            <CircleDot size={25} strokeWidth={2.5} />
          </span>

          <span className="text-[24px] font-extrabold tracking-tight text-[#111827]">
            Sport<span className="text-[#13a34b]">Nest</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[17px] font-semibold transition-colors hover:text-[#13a34b] ${
                pathname === link.href
                  ? "text-[#13a34b]"
                  : "text-[#374151]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Login */}
        <Link
          href="/login"
          className="hidden rounded-[15px] bg-[#13a34b] px-7 py-3 text-[16px] font-bold text-white shadow-md transition-colors hover:bg-[#0e883d] md:inline-flex"
        >
          Login
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="rounded-lg p-2 text-gray-900 md:hidden"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full flex flex-col gap-3 border-t bg-white px-6 py-5 shadow-lg md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 font-semibold text-gray-800 hover:bg-green-50"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="rounded-lg bg-[#13a34b] px-4 py-3 text-center font-bold text-white"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
