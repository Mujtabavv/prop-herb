"use client";

import { useState, useEffect } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { PropertyForm } from "@/components/PropertyForm";
import { Button } from "@/components/ui/button";

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
}

export default function Index() {
  const [activeView, setActiveView] = useState<"search" | "add">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Could not fetch properties:", error);
    }
  };

  const handleAddProperty = async (newProperty: Omit<Property, 'id'>) => {
    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProperty),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedProperty = await response.json();
      setProperties([...properties, addedProperty]);
      setActiveView("search"); // Switch back to search view after adding
    } catch (error) {
      console.error("Could not add property:", error);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    try {
      const response = await fetch(`/api/search?q=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Could not perform search:", error);
    }
  };

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
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </>
        ) : (
          <PropertyForm onSubmit={handleAddProperty} />
        )}
      </div>
    </div>
  );
}
