import Navigation from "@/components/Navigation";
import FloatingHearts from "@/components/FloatingHearts";
import { Card } from "@/components/ui/card";
import { Sparkles, Cake, Music, Coffee, Heart } from "lucide-react";

const HerPage = () => {
  const quirks = [
    " i fuckingggg love youuu baby✨",
    "apki height wah wah *skeleton emoji* 🎶",
    "both tharki and dharmik with u hehehe ☕",
    "yourrrrrrrr gaaaaaaal lovely  🤗",
    "yourrrrr eyessss <3 💕",
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
            <h2 className="font-display text-3xl font-bold mb-2">
              My Cutu Putu 💕
            </h2>
            <p className="text-foreground/70 mb-6">
              <Cake className="w-4 h-4 inline mr-2" />
              Birthday: 23/10/2005
            </p>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              u are a kind of person like a mixed aachar haha, sweet, sour,
              spicy and a little salty but all in one u r the best thing that
              ever happened to me i love u so much my baby. yeah extra angry but
              jaise b hooo just mine *angry cat emoji*
            </p>
          </Card>

          {/* Special Dedications Grid */}
          <div
            className="grid md:grid-cols-2 gap-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {/* ✅ Song Dedicated Card with Clickable Link */}
            <a
              href="https://open.spotify.com/playlist/1Qkdi37r8CsM8bER179IMz?si=kSkjXVH9TkOw05e8w05fgQ"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Card className="gradient-card shadow-soft border-0 p-6 text-center hover:shadow-dreamy transition-smooth group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🎵</span>
                </div>
                <h3 className="font-display font-semibold mb-2">
                  Song Dedicated to You
                </h3>
                <p className="text-sm text-foreground/70">
                  Listen to this special tune made just for you
                </p>
              </Card>
            </a>

            {/* Video Dedicated Card */}
            <Card className="gradient-card shadow-soft border-0 p-6 text-center hover:shadow-dreamy transition-smooth group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎬</span>
              </div>
              <h3 className="font-display font-semibold mb-2">Video for You</h3>
              <p className="text-sm text-foreground/70">
                Watch this heartfelt video created only for you
              </p>
            </Card>
          </div>

          {/* Things I Love About Her */}
          <Card
            className="gradient-card shadow-dreamy border-0 p-8 md:p-10 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-primary fill-primary" />
              <h2 className="font-display text-2xl font-bold">
                Things About You
              </h2>
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
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
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
          <Card
            className="gradient-card shadow-dreamy border-0 p-8 md:p-10 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <h2 className="font-display text-2xl font-bold mb-4 text-center">
              A Letter Just For You 💌
            </h2>
            <div className="prose prose-lg max-w-none text-foreground/80">
              <p className="leading-relaxed mb-4">My Girl,</p>
              <p className="leading-relaxed mb-4">
                Every day with you feels like a gift I never knew I was waiting
                for. The time and the nights and the moments i dont want to pass when i am with you(but you sleep💀),  I
                want to protect and cherish and pamper you like a child foreverrr forever.
              </p>
              <p className="leading-relaxed mb-4">
                Your voice is the biggest therapy for me. I hope betuu you use this website and loved it and use the features so that i can track you 😈your emotions. I hopeee yeh chotu sa efforts apko pasand aaayega bubu. this is now open source,  features add hote rahenge hehe
              </p>
              <p className="leading-relaxed mb-4">
                Thank you for being you. Thank you for choosing us. I promise to
                love you with everything I have, today and always.
              </p>
              <p className="leading-relaxed text-right">
                Forever yours, 💕
                <br />
                <span className="font-display font-semibold">Bubu</span>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HerPage;
