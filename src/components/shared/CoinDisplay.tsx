
import { Coins } from "lucide-react";

interface CoinDisplayProps {
  amount: number;
  size?: "sm" | "md" | "lg";
}

const CoinDisplay = ({ amount, size = "md" }: CoinDisplayProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  };

  return (
    <div className={`kid-coin flex items-center gap-1 ${sizeClasses[size]}`}>
      <Coins className="text-kid-yellow" size={size === "lg" ? 24 : size === "md" ? 20 : 16} />
      <span className="font-medium">{amount}</span>
    </div>
  );
};

export default CoinDisplay;
