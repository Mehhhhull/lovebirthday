import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FloatingHearts from "@/components/FloatingHearts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { BookHeart, Plus, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type JournalEntry = Database["public"]["Tables"]["journal_entries"]["Row"] & {
  profiles: { nickname: string } | null;
  journal_replies: Array<{
    id: string;
    content: string;
    created_at: string;
    profiles: { nickname: string } | null;
  }>;
};

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "💕", label: "In Love" },
  { emoji: "😌", label: "Peaceful" },
  { emoji: "😢", label: "Sad" },
  { emoji: "🤗", label: "Grateful" },
  { emoji: "🎉", label: "Excited" },
];

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [newEntry, setNewEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState(moods[0].emoji);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadEntries();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setCurrentUserId(session.user.id);
  };

  const loadEntries = async () => {
    const { data, error } = await supabase
      .from("journal_entries")
      .select(`
        *,
        profiles:author_id (nickname),
        journal_replies (
          id,
          content,
          created_at,
          profiles:author_id (nickname)
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading entries",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setEntries(data || []);
  };

  const handleSubmit = async () => {
    if (!newEntry.trim() || !currentUserId) return;

    const { error } = await supabase
      .from("journal_entries")
      .insert({
        author_id: currentUserId,
        mood: selectedMood,
        content: newEntry,
      });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setNewEntry("");
    setIsWriting(false);
    loadEntries();
    toast({
      title: "Entry saved! 💕",
      description: "Your memory has been added to our journal.",
    });
  };

  const handleReply = async (entryId: string) => {
    const reply = replyText[entryId];
    if (!reply?.trim() || !currentUserId) return;

    const { error } = await supabase
      .from("journal_replies")
      .insert({
        entry_id: entryId,
        author_id: currentUserId,
        content: reply,
      });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setReplyText({ ...replyText, [entryId]: "" });
    loadEntries();
    toast({
      title: "Reply added! 💬",
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
                      <p className="font-display font-semibold">
                        {entry.profiles?.nickname || "Unknown"} {entry.profiles?.nickname === "Bubu" ? "❤️" : "💙"}
                      </p>
                      <p className="text-sm text-foreground/60">
                        {new Date(entry.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-foreground/80 leading-relaxed mb-4">{entry.content}</p>

                {entry.journal_replies && entry.journal_replies.length > 0 && (
                  <div className="space-y-3 mb-4 pt-4 border-t border-border/50">
                    {entry.journal_replies.map((reply) => (
                      <div key={reply.id} className="bg-white/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-display font-semibold text-sm">
                            {reply.profiles?.nickname || "Unknown"}
                          </span>
                          <span className="text-xs text-foreground/60">
                            {new Date(reply.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/80">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-border/50">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Write a reply..."
                      value={replyText[entry.id] || ""}
                      onChange={(e) => setReplyText({ ...replyText, [entry.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleReply(entry.id);
                        }
                      }}
                      className="bg-white/40 border-border/50 focus:bg-white/60 transition-smooth rounded-xl"
                    />
                    <Button
                      onClick={() => handleReply(entry.id)}
                      size="sm"
                      className="gap-2"
                      disabled={!replyText[entry.id]?.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Journal;