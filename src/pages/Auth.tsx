import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState<"Bubu" | "Mimi">("Bubu");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) throw error;

      toast({
        title: "Check your email! 📧",
        description: "We've sent you a password reset link.",
      });
      setIsForgotPassword(false);
    } catch (error: any) {
      toast({
        title: "Oops!",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back! 💕",
          description: "You've successfully logged in to your love sanctuary.",
        });
      } else {
        // Check if 2 profiles already exist
        const { count } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        if (count && count >= 2) {
          toast({
            title: "Sorry! 🔒",
            description: "This sanctuary is already complete with two hearts.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        // Check if nickname is already taken
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("nickname")
          .eq("nickname", nickname)
          .maybeSingle();

        if (existingProfile) {
          toast({
            title: "Nickname taken! 💔",
            description: `${nickname} is already chosen. Please select the other nickname.`,
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) throw error;

        if (data.user) {
          // Create profile
          const { error: profileError } = await supabase
            .from("profiles")
            .insert({
              id: data.user.id,
              nickname: nickname,
            });

          if (profileError) throw profileError;

          toast({
            title: "Check your email! ✨",
            description: "We've sent you a verification link to complete your signup.",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Oops!",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
            {isForgotPassword ? "Reset your password 🔑" : isLogin ? "Welcome back! 💕" : "Join our love sanctuary ✨"}
          </p>
        </div>

        <form onSubmit={isForgotPassword ? handleForgotPassword : handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-display">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="bg-white/40 border-border/50 focus:bg-white/60 transition-smooth rounded-xl"
              required
            />
          </div>

          {!isForgotPassword && (
            <div className="space-y-2">
              <Label htmlFor="password" className="font-display">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/40 border-border/50 focus:bg-white/60 transition-smooth rounded-xl"
                required
                minLength={6}
              />
            </div>
          )}

          {!isLogin && !isForgotPassword && (
            <div className="space-y-3">
              <Label className="font-display">Choose your nickname 💕</Label>
              <RadioGroup value={nickname} onValueChange={(value) => setNickname(value as "Bubu" | "Mimi")}>
                <div className="flex items-center space-x-2 bg-white/40 p-4 rounded-xl border border-border/50">
                  <RadioGroupItem value="Bubu" id="bubu" />
                  <Label htmlFor="bubu" className="font-display cursor-pointer flex-1">Bubu</Label>
                </div>
                <div className="flex items-center space-x-2 bg-white/40 p-4 rounded-xl border border-border/50">
                  <RadioGroupItem value="Mimi" id="mimi" />
                  <Label htmlFor="mimi" className="font-display cursor-pointer flex-1">Mimi</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display rounded-xl py-6 shadow-soft hover:shadow-dreamy transition-smooth disabled:opacity-50"
          >
            {loading ? "Loading..." : isForgotPassword ? "Send Reset Link 📧" : isLogin ? "Sign In 💕" : "Create Account ✨"}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {!isForgotPassword && isLogin && (
            <button
              type="button"
              onClick={() => setIsForgotPassword(true)}
              className="text-sm text-foreground/70 hover:text-foreground transition-smooth font-display block w-full"
            >
              Forgot password? 🔑
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setIsForgotPassword(false);
              setIsLogin(!isLogin);
            }}
            className="text-sm text-foreground/70 hover:text-foreground transition-smooth font-display block w-full"
          >
            {isForgotPassword
              ? "Back to sign in"
              : isLogin
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
