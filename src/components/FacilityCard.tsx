"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaArrowRight,
  FaClock,
  FaImage,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

import type { Facility } from "@/types/facility";
import Image from "next/image";

type FacilityCardProps = {
  facility: Facility;
};

export default function FacilityCard({ facility }: FacilityCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {!imageError && facility.image ? (
          <Image
            width={300}
            height={300}
            src={facility.image}
            alt={facility.name}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          ></Image>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-400">
            <FaImage size={36} />
            <span className="text-sm">Image unavailable</span>
          </div>
        )}

        {/* Sport Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold uppercase text-green-700">
          {facility.sport}
        </span>

        {/* Price */}
        <div className="absolute right-4 top-4 rounded-xl bg-white px-3 py-2 shadow-md">
          <span className="text-lg font-extrabold text-green-600">
            ${facility.pricePerHour}
          </span>
          <span className="text-sm text-gray-500">/hr</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="mb-4 line-clamp-1 text-xl font-bold text-gray-900">
          {facility.name}
        </h3>

        <div className="space-y-3 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="shrink-0 text-green-500" />
            <span className="line-clamp-1">{facility.location}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaUsers className="shrink-0 text-green-500" />
            <span>Up to {facility.capacity} players</span>
          </div>

          <div className="flex items-center gap-3">
            <FaClock className="shrink-0 text-green-500" />
            <span>Contact for availability</span>
          </div>
        </div>

        {/* Booking Button */}
        <Link
          href={`/facilities/${facility._id}`}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 px-5 py-3.5 font-bold text-white transition-colors hover:bg-green-700"
        >
          Book Now
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}
