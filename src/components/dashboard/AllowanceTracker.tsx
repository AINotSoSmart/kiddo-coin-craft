
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDollarSign, Clock, ArrowUpRight } from "lucide-react";
import CoinDisplay from "../shared/CoinDisplay";
import { useBudget } from "@/context/BudgetContext";
import { useEffect, useState } from "react";

const AllowanceTracker = () => {
  const { balance, weeklyAllowance } = useBudget();
  const [daysUntilAllowance, setDaysUntilAllowance] = useState(3);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Calculate days until next allowance (in a real app, this would be based on actual dates)
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ...
    const allowanceDay = 1; // Monday
    let days = allowanceDay - dayOfWeek;
    if (days <= 0) days += 7;
    setDaysUntilAllowance(days);
    
    // Simulate an animation when component mounts
    setShowAnimation(true);
    const timer = setTimeout(() => setShowAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const progressPercentage = ((7 - daysUntilAllowance) / 7) * 100;

  return (
    <Card className="overflow-hidden border-2 border-black border-dashed bg-white">
      <CardHeader className="bg-[#FEF7CD] p-5 border-b-2 border-black border-dashed">
        <CardTitle className="flex items-center gap-2 text-black font-normal" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
          <BadgeDollarSign className="h-5 w-5" />
          <span className="text-xl" style={{ transform: "rotate(-2deg)" }}>My Piggy Bank</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-5">
        <div className="text-center">
          <p className="text-black text-sm mb-1" style={{ fontFamily: "'Comic Sans MS', cursive" }}>Current Balance</p>
          <div className={`flex justify-center ${showAnimation ? 'animate-pop' : ''}`}>
            <CoinDisplay amount={balance} size="lg" animated />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 text-center border-2 border-black border-dashed">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1 text-black">
              <Clock className="h-4 w-4" />
              <span className="text-xs" style={{ fontFamily: "'Comic Sans MS', cursive" }}>{daysUntilAllowance} days left</span>
            </div>
            <div className="flex items-center gap-1 text-black">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-xs font-medium" style={{ fontFamily: "'Comic Sans MS', cursive" }}>+{weeklyAllowance}</span>
            </div>
          </div>
          
          <div className="w-full bg-[#f1f1f1] rounded-full h-3 mb-2 border border-black">
            <div 
              className="bg-[#FBBF24] h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${progressPercentage}%`,
                backgroundImage: 'url(/lovable-uploads/3c102155-1f35-4a2b-8922-dca1487f7e49.png)',
                backgroundSize: '20px 20px',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center'
              }}
            ></div>
          </div>
          
          <p className="text-xs text-black mt-2" style={{ fontFamily: "'Comic Sans MS', cursive" }}>Next allowance in {daysUntilAllowance} days</p>
        </div>
        
        <div className="text-center bg-white rounded-lg p-3 border-2 border-black border-dashed">
          <p className="text-sm font-medium" style={{ fontFamily: "'Comic Sans MS', cursive" }}>Weekly Allowance</p>
          <CoinDisplay amount={weeklyAllowance} size="md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AllowanceTracker;
