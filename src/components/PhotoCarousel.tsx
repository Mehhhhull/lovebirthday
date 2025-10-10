import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface Photo {
  url: string;
  caption: string;
}

const photos: Photo[] = [
  {
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
    caption: "Our magical moments together 💕"
  },
  {
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
    caption: "Forever creating memories ✨"
  },
  {
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    caption: "You and me against the world 🌍"
  },
  {
    url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80",
    caption: "Every day is better with you 🌸"
  },
];

const PhotoCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % photos.length);
  const prev = () => setCurrent((current - 1 + photos.length) % photos.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-dreamy group">
      <div className="relative aspect-[16/10] overflow-hidden">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-white text-lg md:text-2xl font-display font-medium text-center animate-fade-in">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
