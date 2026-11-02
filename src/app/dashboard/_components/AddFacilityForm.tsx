"use client";

import { toast } from "@/components/ui/toast";
import type { FormEvent } from "react";

const sportTypes = [
  "Football",
  "Badminton",
  "Tennis",
  "Swimming",
  "Basketball",
  "Cricket",
  "Gym",
];

const labelClass =
  "mb-2 block text-sm font-bold uppercase tracking-wide text-gray-500";

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/10";

export default function AddFacilityForm() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const facility = Object.fromEntries(formData.entries());
    const result = await fetch("http://localhost:4000/facilities", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(facility),
    });
    const data = await result.json();
    const newFacility = {
      ...facility,
      pricePerHour: Number(facility.pricePerHour),
      capacity: Number(facility.capacity),
    };
    console.log("New Facility:", newFacility);
    console.log(data);
    // fot toast
    if (data.acknowledged) {
      toast.add({
        title: "Facility add successful",
        description: "your facilities added to the platform",
        type:"success"
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f9fb] px-5 py-10 md:px-10 lg:px-14">
      {/* Page Heading */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
          Add New Facility
        </h1>

        <p className="mt-3 text-base text-gray-500 md:text-lg">
          List your sports venue for others to book
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full rounded-[30px] border border-gray-200/70 bg-white p-6 md:p-10 lg:p-12">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {/* Facility Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Facility Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={3}
                maxLength={120}
                placeholder="e.g. Green Turf Football Ground"
                className={inputClass}
              />
            </div>

            {/* Sport Type */}
            <div>
              <label htmlFor="sport" className={labelClass}>
                Sport Type *
              </label>

              <select
                id="sport"
                name="sport"
                required
                defaultValue=""
                className={inputClass}
              >
                <option value="" disabled>
                  Select Sport Type
                </option>

                {sportTypes.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className={labelClass}>
                Image URL *
              </label>

              <input
                id="image"
                name="image"
                type="url"
                required
                placeholder="https://example.com/image.jpg"
                className={inputClass}
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className={labelClass}>
                Location *
              </label>

              <input
                id="location"
                name="location"
                type="text"
                required
                placeholder="e.g. Gulshan, Dhaka"
                className={inputClass}
              />
            </div>

            {/* Price Per Hour */}
            <div>
              <label htmlFor="pricePerHour" className={labelClass}>
                Price Per Hour ($) *
              </label>

              <input
                id="pricePerHour"
                name="pricePerHour"
                type="number"
                required
                min="0.01"
                step="0.01"
                placeholder="50"
                className={inputClass}
              />
            </div>

            {/* Capacity */}
            <div>
              <label htmlFor="capacity" className={labelClass}>
                Capacity (Players) *
              </label>

              <input
                id="capacity"
                name="capacity"
                type="number"
                required
                min="1"
                step="1"
                placeholder="22"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className={labelClass}>
                Description *
              </label>

              <textarea
                id="description"
                name="description"
                required
                minLength={10}
                rows={5}
                placeholder="Describe your facility..."
                className={`${inputClass} min-h-[145px] resize-y`}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-12">
            <button
              type="submit"
              className="w-full rounded-2xl bg-[#16a34a] px-12 py-4 text-lg font-bold text-white shadow-lg shadow-green-100 transition-all hover:bg-[#15803d] active:scale-[0.98] sm:w-auto"
            >
              Add Facility
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
