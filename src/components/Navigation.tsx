import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, Clock, Sparkles, BookHeart, LogOut, Smile, Target, Menu, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };
  
  const links = [
    { to: "/", icon: Heart, label: "Home" },
    { to: "/timeline", icon: Clock, label: "Our Journey" },
    { to: "/her", icon: Sparkles, label: "Her Page" },
    { to: "/journal", icon: BookHeart, label: "Journal" },
    { to: "/moods", icon: Smile, label: "Moods" },
    { to: "/bucket-list", icon: Target, label: "Bucket List" },
  ];

  const NavLinks = ({ className = "", onClick = () => {} }) => (
    <>
      {isAuthenticated ? (
        <>
          {links.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={onClick}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-full transition-smooth hover:bg-primary/10",
                location.pathname === to
                  ? "bg-primary/20 text-primary font-medium"
                  : "text-foreground/70 hover:text-foreground",
                className
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
          <Button
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
              onClick();
            }}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-destructive/10 transition-smooth",
              className
            )}
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </Button>
        </>
      ) : (
        <Link
          to="/auth"
          onClick={onClick}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-primary/10 transition-smooth",
            className
          )}
        >
          <LogIn className="w-4 h-4" />
          <span className="text-sm">Login</span>
        </Link>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Heart className="w-6 h-6 text-primary group-hover:scale-110 transition-transform fill-primary" />
            <span className="font-display font-semibold text-lg text-gradient">Our Little World</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 md:gap-6">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary fill-primary" />
                  Our Little World
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-6">
                <NavLinks className="w-full justify-start" onClick={() => setIsOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
