import Navigation from "@/components/Navigation";
import FloatingHearts from "@/components/FloatingHearts";
import { Card } from "@/components/ui/card";
import { Sparkles, Cake, Music, Coffee, Heart } from "lucide-react";

const HerPage = () => {
  const favorites = [
    { icon: Coffee, label: "Favorite Drink", value: "Sweet iced coffee ☕" },
    { icon: Music, label: "Favorite Music", value: "Lo-fi & acoustic vibes 🎵" },
    { icon: Cake, label: "Favorite Food", value: "Anything sweet & pastries 🧁" },
  ];

  const quirks = [
    "Her laugh lights up the entire room ✨",
    "She hums when she's concentrating 🎶",
    "Coffee tastes better when she makes it ☕",
    "She has the warmest hugs in the world 🤗",
    "Her smile is my favorite view 💕",
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-gradient">
            All About Her
          </h1>
          <p className="text-lg text-foreground/80 font-display">
            The most amazing person in my universe 💫
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Profile Card */}
          <Card className="gradient-card shadow-dreamy border-0 p-8 md:p-12 text-center animate-scale-in">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 shadow-dreamy ring-4 ring-primary/20">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80"
                alt="Her"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-display text-3xl font-bold mb-2">My Girlfriend 💕</h2>
            <p className="text-foreground/70 mb-6">
              <Cake className="w-4 h-4 inline mr-2" />
              Birthday: [Her Birthday]
            </p>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              She's the kind of person who makes ordinary moments extraordinary. Her kindness, 
              her laughter, her dreams — everything about her makes my world brighter. 
              I'm endlessly grateful for every second we share together.
            </p>
          </Card>

          {/* Favorites Grid */}
          <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {favorites.map((fav, index) => (
              <Card key={index} className="gradient-card shadow-soft border-0 p-6 text-center hover:shadow-dreamy transition-smooth group">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <fav.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2">{fav.label}</h3>
                <p className="text-sm text-foreground/70">{fav.value}</p>
              </Card>
            ))}
          </div>

          {/* Things I Love About Her */}
          <Card className="gradient-card shadow-dreamy border-0 p-8 md:p-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-primary fill-primary" />
              <h2 className="font-display text-2xl font-bold">Things I Love About Her</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {quirks.map((quirk, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/40 hover:bg-white/60 transition-smooth"
                >
                  <span className="text-xl mt-0.5">💖</span>
                  <p className="text-foreground/80">{quirk}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Gallery */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <h2 className="font-display text-2xl font-bold mb-6 text-center">
              <Sparkles className="w-6 h-6 inline mr-2 text-primary" />
              Her Cutest Moments
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((img, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-2xl overflow-hidden shadow-soft hover:shadow-dreamy transition-smooth hover:scale-105"
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Love Letter */}
          <Card className="gradient-card shadow-dreamy border-0 p-8 md:p-10 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <h2 className="font-display text-2xl font-bold mb-4 text-center">A Letter Just For You 💌</h2>
            <div className="prose prose-lg max-w-none text-foreground/80">
              <p className="leading-relaxed mb-4">
                My dearest,
              </p>
              <p className="leading-relaxed mb-4">
                Every day with you feels like a gift I never knew I was waiting for. You've turned 
                my world into something magical, something I want to protect and cherish forever.
              </p>
              <p className="leading-relaxed mb-4">
                Your smile is my favorite sunrise. Your laughter is the melody I never want to stop 
                hearing. And your love — your beautiful, gentle love — is home to me.
              </p>
              <p className="leading-relaxed mb-4">
                Thank you for being you. Thank you for choosing us. I promise to love you with 
                everything I have, today and always.
              </p>
              <p className="leading-relaxed text-right">
                Forever yours, 💕<br />
                <span className="font-display font-semibold">[Your Name]</span>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HerPage;
