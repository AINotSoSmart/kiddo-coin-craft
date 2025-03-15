
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CoinDisplay from "../shared/CoinDisplay";
import { useBudget, Challenge } from "@/context/BudgetContext";
import { useState } from "react";

const WeeklyChallenges = () => {
  const { challenges, completeChallenge } = useBudget();
  const [expandedChallenge, setExpandedChallenge] = useState<string | null>(null);
  
  // Format days remaining
  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const activeChallenges = challenges.filter(challenge => !challenge.completed);
  const completedChallenges = challenges.filter(challenge => challenge.completed);

  return (
    <Card className="overflow-hidden border-2 border-black border-dashed bg-white">
      <CardHeader className="bg-[#E0F4E8] p-5 border-b-2 border-black border-dashed">
        <CardTitle className="flex items-center gap-2 text-black font-normal" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
          <Trophy className="h-6 w-6" />
          <span className="text-xl" style={{ transform: "rotate(-2deg)" }}>Weekly Challenges</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {activeChallenges.length === 0 ? (
          <div className="text-center p-6">
            <Trophy className="h-16 w-16 mx-auto text-kid-yellow mb-2 animate-float" />
            <p className="text-black text-sm" style={{ fontFamily: "'Comic Sans MS', cursive" }}>All challenges completed! Check back next week.</p>
          </div>
        ) : (
          <>
            {activeChallenges.map((challenge) => (
              <div 
                key={challenge.id} 
                className="space-y-3 p-4 rounded-lg cursor-pointer border-2 border-black border-dashed bg-white/50 backdrop-blur-sm hover:bg-white/70"
                onClick={() => setExpandedChallenge(expandedChallenge === challenge.id ? null : challenge.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium" style={{ fontFamily: "'Comic Sans MS', cursive" }}>{challenge.name}</h3>
                  <div className="flex items-center gap-2 text-black text-sm" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
                    <Clock className="h-4 w-4" />
                    <span>{getDaysRemaining(challenge.deadline)} days left</span>
                  </div>
                </div>
                
                <Progress 
                  value={(challenge.currentAmount / challenge.targetAmount) * 100} 
                  className="h-2 bg-[#f1f1f1] border border-black"
                />
                
                <div className="flex justify-between items-center text-sm">
                  <span style={{ fontFamily: "'Comic Sans MS', cursive" }} className="text-black">Progress: {challenge.currentAmount}/{challenge.targetAmount}</span>
                  <span>Reward: <CoinDisplay amount={challenge.reward} size="sm" /></span>
                </div>
                
                {expandedChallenge === challenge.id && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                    {challenge.currentAmount >= challenge.targetAmount ? (
                      <Button 
                        variant="default"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          completeChallenge(challenge.id);
                        }}
                      >
                        <Trophy className="mr-2 h-4 w-4" />
                        Claim Reward
                      </Button>
                    ) : (
                      <div className="text-sm text-center text-muted-foreground">
                        Complete this challenge to earn a reward!
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
        
        {completedChallenges.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Completed Challenges</h3>
            {completedChallenges.map((challenge) => (
              <div key={challenge.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{challenge.name}</span>
                </div>
                <CoinDisplay amount={challenge.reward} size="sm" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyChallenges;
