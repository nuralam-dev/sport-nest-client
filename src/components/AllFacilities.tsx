
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

import FacilityCard from "@/components/FacilityCard";
import type { Facility } from "@/types/facility";

type ApiResponse =
  | Facility[]
  | {
      data?: Facility[];
      facilities?: Facility[];
    };

type SortOrder = "default" | "low" | "high";

export default function AllFacilities() {
  // API Data
  const [facilities, setFacilities] = useState<Facility[]>([]);

  // Search and Filter
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  // Loading and Error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch facilities from API
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

        const allFacilities = Array.isArray(result)
          ? result
          : result.data ?? result.facilities;

        if (!Array.isArray(allFacilities)) {
          throw new Error("Invalid API response");
        }

        setFacilities(allFacilities);
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Fetch Error:", err);
        setError("Unable to load facilities. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getFacilities();

    return () => controller.abort();
  }, []);

  // Get unique sports from API data
  const sports = useMemo(() => {
    return [
      "All Sports",
      ...Array.from(
        new Set(facilities.map((facility) => facility.sport))
      ).filter(Boolean),
    ];
  }, [facilities]);

  // Search, Filter, and Sort
  const filteredFacilities = useMemo(() => {
    let result = facilities.filter((facility) => {
      const matchesSearch = facility.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const matchesSport =
        selectedSport === "All Sports" ||
        facility.sport === selectedSport;

      return matchesSearch && matchesSport;
    });

    if (sortOrder === "low") {
      result = [...result].sort(
        (a, b) =>
          Number(a.pricePerHour) - Number(b.pricePerHour)
      );
    }

    if (sortOrder === "high") {
      result = [...result].sort(
        (a, b) =>
          Number(b.pricePerHour) - Number(a.pricePerHour)
      );
    }

    return result;
  }, [facilities, search, selectedSport, sortOrder]);

  // Toggle price sorting
  function handleSort(order: "low" | "high") {
    setSortOrder((previous) =>
      previous === order ? "default" : order
    );
  }

  return (
    <section className="min-h-screen bg-white px-5 py-12 md:px-10 lg:py-16">
      <div className="mx-auto max-w-[1536px]">

        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
            All Facilities
          </h1>

          <p className="mt-3 text-base text-gray-500 md:text-lg">
            {loading
              ? "Loading sports venues..."
              : `Browse ${facilities.length} sports venues available for booking`}
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">

            {/* Search Input */}
            <div className="relative min-w-0 flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by facility name..."
                aria-label="Search facilities"
                className="h-13 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
              />
            </div>

            {/* Sport Filter */}
            <div className="relative w-full lg:w-[220px]">
              <FaFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <select
                value={selectedSport}
                onChange={(e) =>
                  setSelectedSport(e.target.value)
                }
                aria-label="Filter by sport"
                className="h-13 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-11 pr-8 text-base text-gray-900 outline-none focus:border-green-500"
              >
                {sports.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Sorting Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleSort("low")}
                aria-pressed={sortOrder === "low"}
                className={`flex h-13 flex-1 items-center justify-center gap-2 rounded-xl border px-4 font-medium transition lg:flex-none ${
                  sortOrder === "low"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-600 hover:border-green-400"
                }`}
              >
                <FaArrowUp size={13} />
                Price
              </button>

              <button
                type="button"
                onClick={() => handleSort("high")}
                aria-pressed={sortOrder === "high"}
                className={`flex h-13 flex-1 items-center justify-center gap-2 rounded-xl border px-4 font-medium transition lg:flex-none ${
                  sortOrder === "high"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-600 hover:border-green-400"
                }`}
              >
                <FaArrowDown size={13} />
                Price
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[440px] animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-6 py-12 text-center text-red-600"
          >
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredFacilities.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 py-20 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              No facilities found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your search or sport filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedSport("All Sports");
                setSortOrder("default");
              }}
              className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Facility Cards */}
        {!loading && !error && filteredFacilities.length > 0 && (
          <>
            <div className="mb-5 text-sm text-gray-500">
              Showing {filteredFacilities.length} of{" "}
              {facilities.length} facilities
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredFacilities.map((facility) => (
                <FacilityCard
                  key={facility._id}
                  facility={facility}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
