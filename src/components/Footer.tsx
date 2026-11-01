
import Link from "next/link";

import {
  FaFutbol,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

// Quick Links
const quickLinks = [
  { name: "All Facilities", href: "/facilities" },
  { name: "My Bookings", href: "/dashboard/bookings" },
  { name: "Add Facility", href: "/dashboard/add-facility" },
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

// Social Media Links
const socialLinks = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "https://facebook.com",
  },
  {
    name: "X",
    icon: FaXTwitter,
    href: "https://x.com",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://instagram.com",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-400">
      <div className="mx-auto max-w-[1200px] px-4 pb-10 pt-20 md:px-10 lg:px-12">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-20">

          {/* Brand Section */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              {/* Logo */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#16a34a] text-white">
                <FaFutbol size={27} />
              </div>

              {/* Brand Name */}
              <span className="text-3xl font-extrabold tracking-tight text-white">
                Sport
                <span className="text-[#22c55e]">
                  Nest
                </span>
              </span>
            </Link>

            {/* Description */}
            <p className="mt-6 max-w-[440px] text-lg leading-8 text-gray-400">
              Book your perfect sports facility in seconds.
              From football turfs to swimming lanes, we
              have it all.
            </p>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f2937] text-gray-400 transition-colors hover:bg-green-600 hover:text-white"
                  >
                    <Icon size={22} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="mb-7 text-lg font-bold uppercase tracking-[0.12em] text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-lg text-gray-400 transition-colors hover:text-green-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-7 text-lg font-bold uppercase tracking-[0.12em] text-white">
              Contact
            </h3>

            <div className="space-y-5">

              {/* Email */}
              <a
                href="mailto:support@sportnest.app"
                className="flex items-center gap-4 text-lg transition-colors hover:text-green-400"
              >
                <FaEnvelope
                  size={20}
                  className="shrink-0 text-[#22c55e]"
                />
                <span className="break-all">
                  support@sportnest.app
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+8801234567890"
                className="flex items-center gap-4 text-lg transition-colors hover:text-green-400"
              >
                <FaPhoneAlt
                  size={20}
                  className="shrink-0 text-[#22c55e]"
                />
                <span>+880 1234-567890</span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 text-lg">
                <FaMapMarkerAlt
                  size={20}
                  className="shrink-0 text-[#22c55e]"
                />
                <span>Dhaka, Bangladesh</span>
              </div>

            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-center text-base text-gray-500 md:flex-row md:text-left">
          <p>
            © 2026 SportNest.
            All rights reserved.
          </p>

          <p>
            Built with ❤️ for sports lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
