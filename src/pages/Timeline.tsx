import Navigation from "@/components/Navigation";
import FloatingHearts from "@/components/FloatingHearts";
import { Card } from "@/components/ui/card";
import { Calendar, Heart, Sparkles, Infinity } from "lucide-react";

const milestones = [
  {
    icon: Infinity,
    title: "Infinity",
    date: "Before Time",
    description: "Before we met in this world, our souls were already searching for each other. Our connection was written in the stars, waiting for the perfect moment.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    color: "from-primary/20 to-secondary/20",
  },
  {
    icon: Sparkles,
    title: "First Meet",
    date: "20th October 2023",
    description: "The day our paths finally crossed in real life. Everything felt right, like coming home to a place I'd never been before.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80",
    color: "from-secondary/20 to-accent/20",
  },
  {
    icon: Heart,
    title: "Love Portray",
    date: "13th May 2024",
    description: "The moment our love bloomed fully into something beautiful and undeniable. When we both knew — this is forever.",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
    color: "from-accent/20 to-primary/20",
  },
];

const Timeline = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-gradient">
            Our Love Story
          </h1>
          <p className="text-lg text-foreground/80 font-display">
            Every moment, every memory, forever treasured ✨
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Card className="gradient-card shadow-dreamy border-0 overflow-hidden group hover:scale-[1.02] transition-smooth">
                <div className="md:flex">
                  <div className="md:w-2/5 relative overflow-hidden">
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-smooth duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color} mix-blend-overlay`} />
                  </div>
                  
                  <div className="md:w-3/5 p-8 md:p-10 relative">
                    <div className="absolute top-6 right-6">
                      <milestone.icon className="w-8 h-8 text-primary/40 animate-float-slow" />
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-soft">
                        <milestone.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-foreground">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-primary font-medium">{milestone.date}</p>
                      </div>
                    </div>
                    
                    <p className="text-foreground/80 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <Card className="gradient-card p-8 shadow-soft border-0 max-w-2xl mx-auto">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4 fill-primary animate-float" />
            <p className="font-display text-lg text-foreground/90">
              And our story continues to unfold, one beautiful day at a time... 💕
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Timeline;
