
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, ListChecks, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoinDisplay from "../shared/CoinDisplay";
import { useBudget } from "@/context/BudgetContext";
import { useState } from "react";
import Confetti from "../shared/Confetti";

const TaskList = () => {
  const { tasks, completeTask } = useBudget();
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedTaskId, setCompletedTaskId] = useState<string | null>(null);
  
  const incompleteTasks = tasks.filter(task => !task.completed);

  const handleCompleteTask = (taskId: string) => {
    setCompletedTaskId(taskId);
    setShowConfetti(true);
    
    // Add a slight delay for the animation effect
    setTimeout(() => {
      completeTask(taskId);
      setTimeout(() => {
        setShowConfetti(false);
        setCompletedTaskId(null);
      }, 1500);
    }, 300);
  };
  
  // Group tasks by difficulty/reward
  const groupedTasks = incompleteTasks.reduce((acc, task) => {
    const rewardLevel = task.reward <= 10 ? 'easy' : task.reward <= 20 ? 'medium' : 'hard';
    if (!acc[rewardLevel]) acc[rewardLevel] = [];
    acc[rewardLevel].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  return (
    <>
      <Confetti show={showConfetti} />
      <Card className="overflow-hidden border-2 border-black border-dashed bg-white">
        <CardHeader className="bg-[#F0E6FF] p-5 border-b-2 border-black border-dashed">
          <CardTitle className="flex items-center gap-2 text-black font-normal" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
            <ListChecks className="h-6 w-6" />
            <span className="text-xl" style={{ transform: "rotate(-2deg)" }}>Complete Tasks, Earn Coins!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {incompleteTasks.length === 0 ? (
            <div className="text-center p-6">
              <Trophy className="h-16 w-16 mx-auto text-kid-yellow mb-2 animate-float" />
              <p className="text-black text-sm" style={{ fontFamily: "'Comic Sans MS', cursive" }}>All tasks completed! Check back later for more.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {['easy', 'medium', 'hard'].map(difficulty => 
                groupedTasks[difficulty] && (
                  <div key={difficulty} className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-1.5" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
                      {difficulty === 'easy' && <Star className="h-4 w-4 text-kid-green" />}
                      {difficulty === 'medium' && <Star className="h-4 w-4 text-kid-blue" />}
                      {difficulty === 'hard' && <Star className="h-4 w-4 text-kid-purple" />}
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Tasks
                    </h3>
                    
                    {groupedTasks[difficulty].map((task) => (
                      <div 
                        key={task.id} 
                        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300
                          ${completedTaskId === task.id 
                            ? 'bg-green-50 border-2 border-black border-dashed shadow-md' 
                            : 'bg-white/50 backdrop-blur-sm border-2 border-black border-dashed hover:bg-white/70'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-full 
                            ${difficulty === 'easy' ? 'bg-kid-green/10' : 
                              difficulty === 'medium' ? 'bg-kid-blue/10' : 'bg-kid-purple/10'}`}>
                            <CheckSquare className={`h-4 w-4 
                              ${difficulty === 'easy' ? 'text-kid-green' : 
                                difficulty === 'medium' ? 'text-kid-blue' : 'text-kid-purple'}`} />
                          </div>
                          <span className="font-medium" style={{ fontFamily: "'Comic Sans MS', cursive" }}>{task.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CoinDisplay amount={task.reward} size="sm" />
                          <Button 
                            size="sm" 
                            className={`transition-all ${
                              completedTaskId === task.id 
                                ? 'bg-green-500 hover:bg-green-600' 
                                : difficulty === 'easy' 
                                  ? 'bg-kid-green hover:bg-kid-green/90' 
                                  : difficulty === 'medium' 
                                    ? 'bg-kid-blue hover:bg-kid-blue/90' 
                                    : 'bg-kid-purple hover:bg-kid-purple/90'
                            }`}
                            onClick={() => handleCompleteTask(task.id)}
                            disabled={completedTaskId === task.id}
                          >
                            {completedTaskId === task.id ? 'Done!' : 'Complete'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default TaskList;
