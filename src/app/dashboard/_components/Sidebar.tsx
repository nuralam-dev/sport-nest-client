"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaFutbol, FaHome, FaRegCalendarAlt } from "react-icons/fa";

import { FiPlusSquare, FiSettings } from "react-icons/fi";

// Dashboard Navigation Links
const sidebarLinks = [
  {
    name: "My Bookings",
    href: "/dashboard/my-booking",
    icon: FaRegCalendarAlt,
  },
  {
    name: "Add Facility",
    href: "/dashboard/add-facility",
    icon: FiPlusSquare,
  },
  {
    name: "Manage Facilities",
    href: "/dashboard/manage-facilities",
    icon: FiSettings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-r border-gray-200 bg-white md:min-h-screen md:w-[320px] md:shrink-0">
      {/* Logo Section */}
      <div className="flex h-[112px] items-center border-b border-gray-100 px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16a34a] text-white shadow-lg shadow-green-200">
            <FaFutbol size={23} />
          </div>

          <span className="text-[24px] font-extrabold tracking-tight text-[#111827]">
            Sport
            <span className="text-[#16a34a]">Nest</span>
          </span>
        </Link>
      </div>

      {/* Sidebar Navigation */}
      <nav aria-label="Dashboard navigation" className="px-3 py-8">
        {/* Back to Home */}
        <Link
          href="/"
          className="mb-8 flex items-center gap-4 rounded-xl px-5 py-3 text-[16px] font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <FaHome size={20} />
          <span>Back to Home</span>
        </Link>

        {/* Management Heading */}
        <h3 className="mb-4 px-5 text-[12px] font-extrabold uppercase tracking-[0.2em] text-gray-400">
          Management
        </h3>

        {/* Dashboard Links */}
        <div className="space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;

            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`
                  flex items-center gap-4
                  rounded-[16px] px-5 py-4
                  text-[16px] font-semibold
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#16a34a] text-white shadow-lg shadow-green-100"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-white" : "text-gray-400"}
                />

                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
