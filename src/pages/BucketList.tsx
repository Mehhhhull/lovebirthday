import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import FloatingHearts from "@/components/FloatingHearts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Circle, Trash2, Plus } from "lucide-react";

interface BucketListItem {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  completed_by: string | null;
  completed_at: string | null;
  created_by: string;
  created_at: string;
  profiles: {
    nickname: string;
  };
  completed_profile?: {
    nickname: string;
  };
}

const BucketList = () => {
  const [items, setItems] = useState<BucketListItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    loadItems();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setCurrentUser(session.user);
  };

  const loadItems = async () => {
    const { data, error } = await supabase
      .from("bucket_list")
      .select(`
        *,
        profiles!bucket_list_created_by_fkey (
          nickname
        )
      `)
      .order("completed", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading bucket list",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setItems(data as any);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !currentUser) return;

    setLoading(true);
    const { error } = await supabase.from("bucket_list").insert({
      title: title.trim(),
      description: description.trim() || null,
      created_by: currentUser.id,
    });

    if (error) {
      toast({
        title: "Error adding item",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Added to bucket list! ✨",
        description: "New dream added to your shared list.",
      });
      setTitle("");
      setDescription("");
      setShowForm(false);
      loadItems();
    }
    setLoading(false);
  };

  const handleToggleComplete = async (item: BucketListItem) => {
    if (!currentUser) return;

    const { error } = await supabase
      .from("bucket_list")
      .update({
        completed: !item.completed,
        completed_by: !item.completed ? currentUser.id : null,
        completed_at: !item.completed ? new Date().toISOString() : null,
      })
      .eq("id", item.id);

    if (error) {
      toast({
        title: "Error updating item",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: item.completed ? "Unmarked! 📝" : "Completed! 🎉",
        description: item.completed
          ? "Back to the list!"
          : "Amazing! You did it together!",
      });
      loadItems();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("bucket_list").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error deleting item",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Item deleted",
      });
      loadItems();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const completedCount = items.filter((item) => item.completed).length;

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Our Bucket List 🎯
          </h1>
          <p className="text-foreground/70 text-lg mb-4">
            Dreams we'll make come true together
          </p>
          <p className="text-foreground/60">
            {completedCount} of {items.length} completed
          </p>
        </div>

        <div className="mb-8">
          {!showForm ? (
            <Button
              onClick={() => setShowForm(true)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display rounded-xl py-6 shadow-soft hover:shadow-dreamy transition-smooth"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Dream ✨
            </Button>
          ) : (
            <Card className="gradient-card shadow-dreamy border-0 p-6 md:p-8 animate-scale-in">
              <h2 className="font-display text-2xl font-bold mb-6 text-gradient">
                Add a New Dream
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title" className="font-display">
                    What do you want to do?
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Visit Paris, Learn to cook pasta..."
                    className="bg-white/40 border-border/50 focus:bg-white/60 rounded-xl mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="font-display">
                    Add details (optional)
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Why is this special? When do you want to do it?"
                    className="bg-white/40 border-border/50 focus:bg-white/60 rounded-xl mt-2"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={!title.trim() || loading}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-display rounded-xl py-6 shadow-soft hover:shadow-dreamy transition-smooth disabled:opacity-50"
                  >
                    {loading ? "Adding..." : "Add to List ✨"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setTitle("");
                      setDescription("");
                    }}
                    className="px-6 rounded-xl"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          {items.length === 0 ? (
            <Card className="gradient-card shadow-soft border-0 p-8 text-center">
              <p className="text-foreground/60">
                No dreams yet. Start adding your bucket list! 💕
              </p>
            </Card>
          ) : (
            items.map((item) => (
              <Card
                key={item.id}
                className={`gradient-card shadow-soft border-0 p-6 animate-fade-in hover:shadow-dreamy transition-smooth ${
                  item.completed ? "opacity-70" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => handleToggleComplete(item)}
                    className="mt-1 text-primary hover:scale-110 transition-transform"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  <div className="flex-1">
                    <h3
                      className={`font-display text-lg font-bold mb-1 ${
                        item.completed ? "line-through" : ""
                      }`}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-foreground/70 text-sm mb-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-foreground/60">
                      <span>Added by {item.profiles.nickname}</span>
                      <span>•</span>
                      <span>{formatDate(item.created_at)}</span>
                    </div>
                    {item.completed && item.completed_at && (
                      <p className="text-xs text-primary mt-1">
                        ✨ Completed on {formatDate(item.completed_at)}
                      </p>
                    )}
                  </div>

                  {currentUser?.id === item.created_by && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="text-foreground/60 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BucketList;
