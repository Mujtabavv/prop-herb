"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { PropertyForm } from "@/components/PropertyForm";
import { Button } from "@/components/ui/button";

const SAMPLE_PROPERTIES = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    description: "Luxurious apartment with stunning city views and high-end finishes throughout. Features include hardwood floors, stainless steel appliances, and a private balcony.",
    price: 750000,
    location: "Downtown, New York",
    bedrooms: 2,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  },
  {
    id: 2,
    title: "Cozy Suburban Home",
    description: "Beautiful family home in a quiet neighborhood. Spacious backyard, updated kitchen, and plenty of natural light throughout.",
    price: 550000,
    location: "Brooklyn, New York",
    bedrooms: 3,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2",
  },
  {
    id: 3,
    title: "Luxury Penthouse Suite",
    description: "Exclusive penthouse with panoramic views. Features include a private elevator, chef's kitchen, and wrap-around terrace.",
    price: 2500000,
    location: "Manhattan, New York",
    bedrooms: 4,
    bathrooms: 3,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
  },
];

export default function PropertiesPage() {
  const [activeView, setActiveView] = useState<"search" | "add">("search");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = SAMPLE_PROPERTIES.filter((property) =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Property Search
          </h1>
          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant={activeView === "search" ? "default" : "outline"}
              onClick={() => setActiveView("search")}
              className="min-w-[160px]"
            >
              Search Properties
            </Button>
            <Button
              variant={activeView === "add" ? "default" : "outline"}
              onClick={() => setActiveView("add")}
              className="min-w-[160px]"
            >
              Add Property
            </Button>
          </div>
        </div>

        {activeView === "search" ? (
          <>
            <div className="mb-12">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </>
        ) : (
          <PropertyForm />
        )}
      </div>
    </div>
  );
}
