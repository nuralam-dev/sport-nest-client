
import Link from "next/link";

const sports = [
  {
    name: "Football",
    emoji: "⚽",
    bgColor: "bg-green-50",
    borderColor: "border-green-100",
    textColor: "text-green-700",
  },
  {
    name: "Badminton",
    emoji: "🏸",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-100",
    textColor: "text-yellow-700",
  },
  {
    name: "Tennis",
    emoji: "🎾",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
    textColor: "text-orange-700",
  },
  {
    name: "Swimming",
    emoji: "🏊",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-100",
    textColor: "text-cyan-700",
  },
  {
    name: "Basketball",
    emoji: "🏀",
    bgColor: "bg-red-50",
    borderColor: "border-red-100",
    textColor: "text-red-700",
  },
  {
    name: "Cricket",
    emoji: "🏏",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    textColor: "text-blue-700",
  },
];

export default function PopularSports() {
  return (
    <section className="bg-white px-5 py-24">
      <div className="mx-auto max-w-[1760px]">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Popular Sports
          </h2>

          <p className="mt-5 text-lg text-gray-500 md:text-2xl">
            Find facilities for every sport you love
          </p>
        </div>

        {/* Sports Cards */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {sports.map((sport) => (
            <Link
              key={sport.name}
              href="/facilities"
              className={`
                flex min-h-[164px] flex-col
                items-center justify-center
                rounded-[22px] border
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
                ${sport.bgColor}
                ${sport.borderColor}
              `}
            >
              {/* Sport Emoji */}
              <span className="text-5xl leading-none">
                {sport.emoji}
              </span>

              {/* Sport Name */}
              <h3
                className={`mt-6 text-lg font-semibold md:text-xl ${sport.textColor}`}
              >
                {sport.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
