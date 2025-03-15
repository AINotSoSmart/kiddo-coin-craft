
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoinDisplay from "../shared/CoinDisplay";
import { useBudget } from "@/context/BudgetContext";

const TaskList = () => {
  const { tasks, completeTask } = useBudget();
  
  const incompleteTasks = tasks.filter(task => !task.completed);

  return (
    <Card className="overflow-hidden border-2 border-kid-yellow/20">
      <CardHeader className="bg-gradient-to-r from-kid-yellow to-kid-orange p-6">
        <CardTitle className="flex items-center gap-2 text-white">
          <ListChecks className="h-6 w-6" />
          Earn More Coins
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {incompleteTasks.length === 0 ? (
          <div className="text-center p-6">
            <p className="text-muted-foreground">All tasks completed! Check back later.</p>
          </div>
        ) : (
          incompleteTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <CheckSquare className="h-5 w-5 text-muted-foreground" />
                <span>{task.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <CoinDisplay amount={task.reward} size="sm" />
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => completeTask(task.id)}
                >
                  Complete
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
