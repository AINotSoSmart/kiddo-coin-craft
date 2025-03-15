
import { Coins } from "lucide-react";
import { useState } from "react";

interface CoinDisplayProps {
  amount: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const CoinDisplay = ({ amount, size = "md", animated = false }: CoinDisplayProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  };
  
  const handleClick = () => {
    if (animated) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div 
      className={`kid-coin flex items-center gap-1 ${sizeClasses[size]} ${animated ? 'cursor-pointer' : ''} ${isAnimating ? 'animate-coin-spin' : ''}`}
      onClick={handleClick}
    >
      <Coins 
        className={`text-kid-yellow ${isAnimating ? 'animate-coin-spin' : ''}`} 
        size={size === "lg" ? 24 : size === "md" ? 20 : 16} 
      />
      <span className={`font-bold ${isAnimating ? 'animate-pop' : ''}`}>{amount}</span>
    </div>
  );
};

export default CoinDisplay;
