import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FloatingHearts from "@/components/FloatingHearts";
import PhotoCarousel from "@/components/PhotoCarousel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const loveNotes = [
  "You make every day brighter just by being in it 🌟",
  "My favorite place is wherever you are 💕",
  "You're my today and all of my tomorrows 🌸",
  "With you, I am home 🏡",
  "Every love story is beautiful, but ours is my favorite ✨",
  "You're the reason I believe in magic 🦋",
  "Forever grateful the universe brought us together 💫",
];

const Index = () => {
  const navigate = useNavigate();
  const [currentNote, setCurrentNote] = useState(
    loveNotes[Math.floor(Math.random() * loveNotes.length)]
  );

  const getNewNote = () => {
    let newNote;
    do {
      newNote = loveNotes[Math.floor(Math.random() * loveNotes.length)];
    } while (newNote === currentNote);
    setCurrentNote(newNote);
  };

  // 🖼️ Your 4 Image Links
  const photoLinks = [
    "https://i.pinimg.com/736x/32/c0/ee/32c0ee44716c77f6b2abab05d8900e0e.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Qt4PfPL6az5mwTjBKAgVh_Z3ndz6JKyX7dDzINORgezb_CpBn4Ubm0Xwfl9Dy0r2kN0&usqp=CAU",
    "https://i.pinimg.com/736x/1f/9b/53/1f9b53bf6c6deda625a9b5dae687827e.jpg",
    "https://i.pinimg.com/736x/87/89/ba/8789ba2678a8090c06b2af86a0063afa.jpg",
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-gradient">
            Welcome to Our Forever Place
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto font-display">
            Built just for us — a private sanctuary where our love story lives 💕
          </p>
        </div>

        {/* Photo Carousel */}
        <div
          className="mb-16 animate-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <PhotoCarousel images={photoLinks} />
        </div>

        {/* Love Note Card */}
        <div
          className="max-w-2xl mx-auto mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Card className="gradient-card p-8 md:p-10 shadow-dreamy border-0 text-center">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4 animate-float" />
            <p className="text-xl md:text-2xl font-display font-medium text-foreground/90 mb-6">
              {currentNote}
            </p>
            <Button
              onClick={getNewNote}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-display rounded-full px-8"
            >
              ✨ Get Another Love Note
            </Button>
          </Card>
        </div>

        {/* Quick Links Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Card 
            className="gradient-card p-6 shadow-soft hover:shadow-dreamy transition-smooth border-0 text-center group cursor-pointer"
            onClick={() => navigate('/timeline')}
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">⏳</span>
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Our Journey</h3>
            <p className="text-sm text-foreground/70">Relive our beautiful timeline</p>
          </Card>

          <Card 
            className="gradient-card p-6 shadow-soft hover:shadow-dreamy transition-smooth border-0 text-center group cursor-pointer"
            onClick={() => navigate('/her-page')}
          >
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Her Page</h3>
            <p className="text-sm text-foreground/70">Everything about my amazing girl</p>
          </Card>

          <Card 
            className="gradient-card p-6 shadow-soft hover:shadow-dreamy transition-smooth border-0 text-center group cursor-pointer"
            onClick={() => navigate('/journal')}
          >
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">📖</span>
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Our Journal</h3>
            <p className="text-sm text-foreground/70">Share thoughts & moments</p>
          </Card>

          <Card 
            className="gradient-card p-6 shadow-soft hover:shadow-dreamy transition-smooth border-0 text-center group cursor-pointer"
            onClick={() => navigate('/bucket-list')}
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Bucket List</h3>
            <p className="text-sm text-foreground/70">Dreams we'll achieve together</p>
          </Card>

          <Card 
            className="gradient-card p-6 shadow-soft hover:shadow-dreamy transition-smooth border-0 text-center group cursor-pointer"
            onClick={() => navigate('/moods')}
          >
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">💝</span>
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Mood Board</h3>
            <p className="text-sm text-foreground/70">Track our daily feelings</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
