import { useState } from "react";
import Navigation from "@/components/Navigation";
import FloatingHearts from "@/components/FloatingHearts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookHeart, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: string;
  author: string;
  mood: string;
  text: string;
  date: string;
  reactions?: string[];
}

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "💕", label: "In Love" },
  { emoji: "😌", label: "Peaceful" },
  { emoji: "😢", label: "Sad" },
  { emoji: "🤗", label: "Grateful" },
  { emoji: "🎉", label: "Excited" },
];

const sampleEntries: JournalEntry[] = [
  {
    id: "1",
    author: "Me",
    mood: "💕",
    text: "Today I was just thinking about how lucky I am to have you in my life. Every moment with you feels like a blessing.",
    date: "2024-10-09",
    reactions: ["❤️", "🥰"],
  },
  {
    id: "2",
    author: "Her",
    mood: "😊",
    text: "I love our little morning coffee ritual. It's the best way to start my day — with you by my side.",
    date: "2024-10-08",
    reactions: ["☕", "💕"],
  },
];

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(sampleEntries);
  const [isWriting, setIsWriting] = useState(false);
  const [newEntry, setNewEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState(moods[0].emoji);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!newEntry.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      author: "Me",
      mood: selectedMood,
      text: newEntry,
      date: new Date().toISOString().split("T")[0],
      reactions: [],
    };

    setEntries([entry, ...entries]);
    setNewEntry("");
    setIsWriting(false);
    
    toast({
      title: "Entry saved! 💕",
      description: "Your memory has been added to our journal.",
    });
  };

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <BookHeart className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-gradient">
            Our Shared Journal
          </h1>
          <p className="text-lg text-foreground/80 font-display">
            A place for our thoughts, feelings, and memories 📖
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Write New Entry */}
          {!isWriting ? (
            <Button
              onClick={() => setIsWriting(true)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display rounded-2xl py-6 shadow-soft hover:shadow-dreamy transition-smooth animate-scale-in"
            >
              <Plus className="w-5 h-5 mr-2" />
              Write a New Entry
            </Button>
          ) : (
            <Card className="gradient-card shadow-dreamy border-0 p-6 md:p-8 animate-scale-in">
              <h3 className="font-display text-xl font-semibold mb-4">New Journal Entry</h3>
              
              {/* Mood Selector */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-3">How are you feeling?</p>
                <div className="flex flex-wrap gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.label}
                      onClick={() => setSelectedMood(mood.emoji)}
                      className={`px-4 py-2 rounded-full transition-smooth ${
                        selectedMood === mood.emoji
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    >
                      <span className="mr-2">{mood.emoji}</span>
                      <span className="text-sm">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="Share your thoughts, a memory, or just how you're feeling today..."
                className="min-h-32 mb-4 bg-white/40 border-border/50 focus:bg-white/60 transition-smooth rounded-xl resize-none"
              />

              <div className="flex gap-3">
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-display rounded-xl"
                >
                  Save Entry
                </Button>
                <Button
                  onClick={() => {
                    setIsWriting(false);
                    setNewEntry("");
                  }}
                  variant="outline"
                  className="px-6 rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          )}

          {/* Entries List */}
          <div className="space-y-6">
            {entries.map((entry, index) => (
              <Card
                key={entry.id}
                className="gradient-card shadow-soft hover:shadow-dreamy border-0 p-6 md:p-8 transition-smooth animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl shadow-soft">
                      {entry.mood}
                    </div>
                    <div>
                      <p className="font-display font-semibold">{entry.author}</p>
                      <p className="text-sm text-foreground/60">{entry.date}</p>
                    </div>
                  </div>
                </div>

                <p className="text-foreground/80 leading-relaxed mb-4">{entry.text}</p>

                {entry.reactions && entry.reactions.length > 0 && (
                  <div className="flex gap-2 pt-4 border-t border-border/50">
                    {entry.reactions.map((reaction, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/40 rounded-full text-sm"
                      >
                        {reaction}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Journal;
