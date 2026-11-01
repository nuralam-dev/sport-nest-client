
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Trophy,
} from "lucide-react";

const stats = [
  { value: "500+", label: "Facilities" },
  { value: "10K+", label: "Bookings" },
  { value: "6", label: "Sports" },
  { value: "4.9★", label: "Rating" },
];

export default function Banner() {
  return (
    <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-[#142a1c] px-5 py-10 text-white md:px-8">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      {/* Dark green overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#081e19]/90 via-[#102c1c]/80 to-[#254e16]/75" />

      {/* Floating badge - top left */}
      <div className="absolute left-[3%] top-[14%] hidden items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-sm lg:flex">
        <Circle
          size={11}
          className="fill-[#4ade80] text-[#4ade80]"
        />
        500+ Active Facilities
      </div>

      {/* Floating badge - bottom right */}
      <div className="absolute bottom-[19%] right-[4%] hidden items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-sm lg:flex">
        <CheckCircle2 size={15} className="text-[#4ade80]" />
        10,000+ Bookings Made
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Top Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#22c55e]/40 bg-[#22c55e]/15 px-5 py-2 text-sm font-medium text-[#6ee7a0] md:text-base">
          <Trophy size={17} className="text-yellow-400" />
          #1 Sports Booking Platform
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold leading-[1.12] tracking-tight sm:text-6xl md:text-[78px] lg:text-[88px]">
          <span className="block text-white">Book Your</span>
          <span className="block bg-gradient-to-r from-[#38df86] to-[#70e7a4] bg-clip-text text-transparent">
            Perfect Court
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-[790px] text-base leading-relaxed text-gray-200 sm:text-lg md:text-[23px] md:leading-[1.55]">
          Discover and reserve premium sports facilities —
          football turfs, badminton courts, swimming lanes,
          and more. Instant booking, zero hassle.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/facilities"
            className="inline-flex w-full items-center justify-center gap-3 rounded-[18px] bg-[#13a34b] px-9 py-5 text-[17px] font-bold shadow-lg transition hover:-translate-y-1 hover:bg-[#0c8b3c] sm:w-auto"
          >
            Explore Facilities
            <ArrowRight size={20} />
          </Link>

          <Link
            href="/register"
            className="inline-flex w-full items-center justify-center rounded-[18px] border border-white/30 bg-white/10 px-9 py-5 text-[17px] font-bold backdrop-blur-sm transition hover:bg-white/20 sm:w-auto"
          >
            Get Started Free
          </Link>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-4 gap-5 sm:gap-10 md:mt-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {stat.value}
              </p>

              <p className="mt-1 text-xs font-medium text-gray-300 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
