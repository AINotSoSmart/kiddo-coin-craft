
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
    <Card className="overflow-hidden border-2 border-white/30 glass-card">
      <CardHeader className="bg-gradient-to-r from-kid-purple to-kid-blue p-6">
        <CardTitle className="flex items-center gap-2 text-white">
          <BadgeDollarSign className="h-6 w-6" />
          My Piggy Bank
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-1">Current Balance</p>
          <div className={`flex justify-center ${showAnimation ? 'animate-pop' : ''}`}>
            <CoinDisplay amount={balance} size="lg" animated />
          </div>
        </div>
        
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-xs">{daysUntilAllowance} days left</span>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-xs font-medium">+{weeklyAllowance}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-gradient-to-r from-kid-purple to-kid-blue h-2.5 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <p className="text-xs text-muted-foreground">Next allowance in {daysUntilAllowance} days</p>
        </div>
        
        <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-3 animate-pulse-scale">
          <p className="text-sm font-medium">Weekly Allowance</p>
          <CoinDisplay amount={weeklyAllowance} size="md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AllowanceTracker;
