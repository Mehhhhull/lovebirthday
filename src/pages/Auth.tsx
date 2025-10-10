import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For now, just simulate login (backend will be added later)
    if (email && password) {
      toast({
        title: "Welcome back! 💕",
        description: "You've successfully logged in to your love sanctuary.",
      });
      navigate("/");
    } else {
      toast({
        title: "Oops!",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <FloatingHearts />
      
      <Card className="gradient-card shadow-dreamy border-0 p-8 md:p-10 w-full max-w-md relative z-10 animate-scale-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 shadow-soft">
            <Heart className="w-8 h-8 text-white fill-white animate-float" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2 text-gradient">
            Our Little World
          </h1>
          <p className="text-foreground/70 font-display">
            {isLogin ? "Welcome back! 💕" : "Join our love sanctuary ✨"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-display">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="bg-white/40 border-border/50 focus:bg-white/60 transition-smooth rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-display">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-white/40 border-border/50 focus:bg-white/60 transition-smooth rounded-xl"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display rounded-xl py-6 shadow-soft hover:shadow-dreamy transition-smooth"
          >
            {isLogin ? "Sign In 💕" : "Create Account ✨"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-foreground/70 hover:text-foreground transition-smooth font-display"
          >
            {isLogin
              ? "Don't have access? Create an account"
              : "Already have access? Sign in"}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-foreground/60">
            This is our private sanctuary 🔒
            <br />
            Only for us to share our love story
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
