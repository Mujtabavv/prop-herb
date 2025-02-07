import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, MapPin } from "lucide-react";

interface PropertyCardProps {
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
}

export function PropertyCard({
  title,
  description,
  price,
  location,
  bedrooms,
  bathrooms,
  image,
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-black hover:bg-white/95">
            ${price.toLocaleString()}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        <div className="flex items-center gap-1 mt-1 text-muted-foreground">
          <MapPin size={16} />
          <span className="text-sm">{location}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t">
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span className="text-sm">{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span className="text-sm">{bathrooms}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
