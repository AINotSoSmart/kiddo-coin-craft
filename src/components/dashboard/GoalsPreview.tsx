
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CoinDisplay from "../shared/CoinDisplay";
import { useBudget } from "@/context/BudgetContext";
import { Link } from "react-router-dom";

const GoalsPreview = () => {
  const { savingsGoals } = useBudget();

  return (
    <Card className="overflow-hidden border-2 border-black border-dashed bg-white">
      <CardHeader className="bg-[#E5DEFF] p-5 border-b-2 border-black border-dashed">
        <CardTitle className="flex items-center justify-between text-black font-normal" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6" />
            <span className="text-xl" style={{ transform: "rotate(-2deg)" }}>Savings Goals</span>
          </div>
          <Button variant="secondary" size="sm" asChild>
            <Link to="/goals">View All</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {savingsGoals.length === 0 ? (
          <div className="text-center p-6">
            <Target className="h-16 w-16 mx-auto text-kid-yellow mb-2 animate-float" />
            <p className="text-black text-sm" style={{ fontFamily: "'Comic Sans MS', cursive" }}>No savings goals yet.</p>
            <Button className="mt-4 bg-kid-green hover:bg-kid-green/90" asChild>
              <Link to="/goals">Create a Goal</Link>
            </Button>
          </div>
        ) : (
          savingsGoals.slice(0, 2).map((goal) => (
            <div key={goal.id} className="space-y-2 p-3 rounded-lg border-2 border-black border-dashed bg-white/50 backdrop-blur-sm hover:bg-white/70">
              <div className="flex items-center justify-between">
                <h3 className="font-medium" style={{ fontFamily: "'Comic Sans MS', cursive" }}>{goal.name}</h3>
                <CoinDisplay amount={goal.currentAmount} size="sm" />
              </div>
              <div className="doodle-progress">
                <div 
                  className="doodle-progress-bar" 
                  style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-black" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
                <span>
                  {Math.round((goal.currentAmount / goal.targetAmount) * 100)}% complete
                </span>
                <span>Target: <CoinDisplay amount={goal.targetAmount} size="sm" /></span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default GoalsPreview;
