import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import FloatingHearts from "@/components/FloatingHearts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Frown, Meh, Heart, Zap, Cloud, Trash2 } from "lucide-react";

interface MoodEntry {
  id: string;
  user_id: string;
  mood: string;
  note: string | null;
  created_at: string;
  profiles: {
    nickname: string;
  };
}

const moodOptions = [
  { value: "happy", label: "Happy", icon: Smile, color: "text-yellow-500" },
  { value: "loved/horny[state]", label: "Loved", icon: Heart, color: "text-pink-500" },
  { value: "excited", label: "Excited", icon: Zap, color: "text-orange-500" },
  { value: "calm", label: "Calm", icon: Cloud, color: "text-blue-400" },
  { value: "neutral", label: "Neutral", icon: Meh, color: "text-gray-500" },
  { value: "sad/Angry[state]", label: "Sad", icon: Frown, color: "text-blue-600" },
];

const MoodTracker = () => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    loadMoods();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setCurrentUser(session.user);
  };

  const loadMoods = async () => {
    const { data, error } = await supabase
      .from("moods")
      .select(`
        *,
        profiles!moods_user_id_fkey (
          nickname
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading moods",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setMoods(data as any);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood || !currentUser) return;

    setLoading(true);
    const { error } = await supabase.from("moods").insert({
      user_id: currentUser.id,
      mood: selectedMood,
      note: note || null,
    });

    if (error) {
      toast({
        title: "Error saving mood",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Mood logged! 💕",
        description: "Your mood has been saved.",
      });
      setSelectedMood("");
      setNote("");
      loadMoods();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("moods").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error deleting mood",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Mood deleted",
      });
      loadMoods();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-8 max-w-4xl relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Mood Tracker 💭
          </h1>
          <p className="text-foreground/70 text-lg">
            Track your daily emotions and see how you both feel
          </p>
        </div>

        <Card className="gradient-card shadow-dreamy border-0 p-6 md:p-8 mb-8 animate-scale-in">
          <h2 className="font-display text-2xl font-bold mb-6 text-gradient">
            How are you feeling?
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {moodOptions.map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => setSelectedMood(mood.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedMood === mood.value
                        ? "border-primary bg-primary/10 scale-105"
                        : "border-border/50 bg-white/40 hover:bg-white/60"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${mood.color}`} />
                    <p className="font-display text-sm">{mood.label}</p>
                  </button>
                );
              })}
            </div>

            <div>
              <label className="font-display text-sm mb-2 block">
                Add a note (optional)
              </label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind?"
                className="bg-white/40 border-border/50 focus:bg-white/60 rounded-xl"
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={!selectedMood || loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display rounded-xl py-6 shadow-soft hover:shadow-dreamy transition-smooth disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Mood ✨"}
            </Button>
          </form>
        </Card>

        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-gradient mb-4">
            Mood History
          </h2>

          {moods.length === 0 ? (
            <Card className="gradient-card shadow-soft border-0 p-8 text-center">
              <p className="text-foreground/60">No moods logged yet. Start tracking! 💕</p>
            </Card>
          ) : (
            moods.map((entry) => {
              const moodConfig = moodOptions.find((m) => m.value === entry.mood);
              const Icon = moodConfig?.icon || Smile;

              return (
                <Card
                  key={entry.id}
                  className="gradient-card shadow-soft border-0 p-6 animate-fade-in hover:shadow-dreamy transition-smooth"
                >
                  <div className="flex items-start gap-4">
                    <div className={`${moodConfig?.color || ""}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display font-bold">
                          {entry.profiles.nickname}
                        </span>
                        <span className="text-sm text-foreground/60">
                          felt {moodConfig?.label.toLowerCase()}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="text-foreground/80 mb-2">{entry.note}</p>
                      )}
                      <p className="text-xs text-foreground/50">
                        {formatDate(entry.created_at)}
                      </p>
                    </div>
                    {currentUser?.id === entry.user_id && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(entry.id)}
                        className="text-foreground/60 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
