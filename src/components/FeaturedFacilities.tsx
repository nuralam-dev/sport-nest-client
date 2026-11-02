
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import FacilityCard from "@/components/FacilityCard";
import type { Facility } from "@/types/facility";

type ApiResponse =
  | Facility[]
  | {
      data?: Facility[];
      facilities?: Facility[];
    };

export default function FeaturedFacilities() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getFacilities() {
      try {
        const response = await fetch(
          "http://localhost:4000/facilities",
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch facilities");
        }

        const result: ApiResponse = await response.json();

        // Support array or wrapped API response
        const allFacilities = Array.isArray(result)
          ? result
          : result.data ?? result.facilities ?? [];

        if (!Array.isArray(allFacilities)) {
          throw new Error("Invalid API response");
        }

        // Display only the first 6 facilities
        setFacilities(allFacilities.slice(0, 6));
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Fetch Error:", err);

        setError("Unable to load facilities.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getFacilities();

    return () => controller.abort();
  }, []);

  return (
    <section className="bg-[#f8f9fb] px-5 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
              Featured Facilities
            </h2>

            <p className="mt-3 text-base text-gray-500 md:text-lg">
              Explore sports venues for your next game
            </p>
          </div>

          <Link
            href="/facilities"
            className="flex items-center gap-2 font-semibold text-green-600 hover:text-green-700"
          >
            View All
            <FaArrowRight size={14} />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[420px] animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div role="alert" className="rounded-xl bg-red-50 p-8 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Empty Data */}
        {!loading && !error && facilities.length === 0 && (
          <p className="py-12 text-center text-gray-500">
            No facilities found.
          </p>
        )}

        {/* Facility Cards */}
        {!loading && !error && facilities.length > 0 && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <FacilityCard
                key={facility._id}
                facility={facility}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
