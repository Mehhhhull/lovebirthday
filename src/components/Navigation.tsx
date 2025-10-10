import { Link, useLocation } from "react-router-dom";
import { Heart, Clock, Sparkles, BookHeart, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  
  const links = [
    { to: "/", icon: Heart, label: "Home" },
    { to: "/timeline", icon: Clock, label: "Our Journey" },
    { to: "/her", icon: Sparkles, label: "Her Page" },
    { to: "/journal", icon: BookHeart, label: "Journal" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Heart className="w-6 h-6 text-primary group-hover:scale-110 transition-transform fill-primary" />
            <span className="font-display font-semibold text-lg text-gradient">Our Little World</span>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-6">
            {links.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-full transition-smooth hover:bg-primary/10",
                  location.pathname === to
                    ? "bg-primary/20 text-primary font-medium"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline text-sm font-medium">{label}</span>
              </Link>
            ))}
            
            <Link
              to="/auth"
              className="flex items-center gap-2 px-3 py-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-destructive/10 transition-smooth"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline text-sm">Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
