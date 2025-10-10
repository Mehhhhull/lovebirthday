import { Heart } from "lucide-react";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((i) => (
        <Heart
          key={i}
          className="absolute text-primary/20 fill-primary/10"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
          }}
          strokeWidth={1.5}
        />
      ))}
      
      <style>{`
        .fixed .absolute {
          animation: heart-float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
