
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useBudget } from "@/context/BudgetContext";
import { useSecurity } from "@/context/SecurityContext";
import { SecuritySetup } from "@/components/security/SecuritySetup";
import { SecurityCheck } from "@/components/security/SecurityCheck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, ClipboardPen, Settings, Trash2, CheckCircle, Calendar, BadgeDollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import CoinDisplay from "@/components/shared/CoinDisplay";
import { toast } from "@/components/ui/use-toast";

const ParentSettings = () => {
  const { isAuthenticated, isSetup, setupQuestions, verifyAnswers, securityQuestions } = useSecurity();
  const { tasks, resetTask, addBalance, addTask } = useBudget();
  const [newTask, setNewTask] = useState({
    name: "",
    reward: "",
  });
  const [manualAmount, setManualAmount] = useState("");
  const [isResetingTasks, setIsResetingTasks] = useState(false);
  const [isAddingCoins, setIsAddingCoins] = useState(false);

  const handleResetTasks = () => {
    setIsResetingTasks(true);
    setTimeout(() => {
      tasks.forEach((task) => {
        resetTask(task.id);
      });
      toast({
        title: "Tasks Reset",
        description: "All tasks have been reset and are available again.",
      });
      setIsResetingTasks(false);
    }, 500);
  };

  const handleManualAdd = () => {
    const amount = parseInt(manualAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAddingCoins(true);
    setTimeout(() => {
      addBalance(amount);
      setManualAmount("");
      setIsAddingCoins(false);
    }, 500);
  };

  if (!isSetup) {
    return (
      <Layout>
        <div className="py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-kid-teal to-kid-blue bg-clip-text text-transparent">
              Parent Controls Setup
            </h1>
            <p className="text-muted-foreground">
              Please set up security questions to protect parent controls
            </p>
          </div>
          <SecuritySetup onSetup={setupQuestions} />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-kid-teal to-kid-blue bg-clip-text text-transparent">
              Parent Controls
            </h1>
            <p className="text-muted-foreground">
              Please verify your identity to access parent controls
            </p>
          </div>
          <SecurityCheck questions={securityQuestions} onVerify={verifyAnswers} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-kid-teal to-kid-blue bg-clip-text text-transparent">
            Parent Controls
          </h1>
          <p className="text-muted-foreground">
            Manage tasks and allowance settings
          </p>
        </div>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <ClipboardPen className="h-5 w-5" />
              Tasks Management
            </TabsTrigger>
            <TabsTrigger value="allowance" className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Allowance Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <Card className="glass-card border-2 border-black border-dashed">
              <CardHeader className="bg-gradient-to-r from-kid-blue to-kid-purple p-6 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 [font-family:'Comic_Sans_MS',cursive]">
                  <CheckCircle className="h-5 w-5" />
                  Tasks Management
                </CardTitle>
                <CardDescription className="text-white/90 backdrop-blur-sm rounded-lg p-2">
                  Create and manage tasks that children can complete to earn coins
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2 [font-family:'Comic_Sans_MS',cursive]">
                      <ClipboardPen className="h-5 w-5 text-kid-blue" />
                      Current Tasks
                    </h3>
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-4 rounded-lg bg-white/50 backdrop-blur-sm border-2 border-dashed border-black hover:shadow-md transition-all ${
                          task.completed ? "bg-gray-50/50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              task.completed
                                ? "bg-muted-foreground"
                                : "bg-green-500"
                            }`}
                          ></div>
                          <span
                            className={
                              task.completed ? "text-muted-foreground" : ""
                            }
                          >
                            {task.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <CoinDisplay amount={task.reward} size="sm" />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-500"
                            onClick={() => resetTask(task.id)}
                            disabled={!task.completed}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Reset</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2 [font-family:'Comic_Sans_MS',cursive]">
                      <PlusCircle className="h-5 w-5 text-kid-green" />
                      Add New Task
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="task-name">Task Name</Label>
                        <Input
                          id="task-name"
                          placeholder="e.g., Make the bed"
                          value={newTask.name}
                          onChange={(e) =>
                            setNewTask({ ...newTask, name: e.target.value })
                          }
                          className="doodle-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="task-reward">Reward (Coins)</Label>
                        <Input
                          id="task-reward"
                          type="number"
                          placeholder="e.g., 10"
                          value={newTask.reward}
                          onChange={(e) =>
                            setNewTask({ ...newTask, reward: e.target.value })
                          }
                          min="1"
                          className="doodle-input"
                        />
                      </div>
                    </div>
                    <Button
                      className="doodle-button w-full md:w-auto"
                      disabled={!newTask.name || !newTask.reward}
                      onClick={() => {
                        const reward = parseInt(newTask.reward);
                        if (isNaN(reward) || reward <= 0) {
                          toast({
                            title: "Invalid Reward",
                            description: "Please enter a valid reward amount.",
                            variant: "destructive",
                          });
                          return;
                        }
                        addTask({
                          name: newTask.name,
                          reward: reward
                        });
                        setNewTask({ name: "", reward: "" });
                      }}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 p-6 pt-0">
                <Button 
                  variant="outline" 
                  onClick={handleResetTasks}
                  disabled={isResetingTasks}
                  className={`bg-white/50 ${isResetingTasks ? 'animate-pulse' : ''}`}
                >
                  {isResetingTasks ? 'Resetting...' : 'Reset All Tasks'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="allowance">
            <Card className="glass-card">
              <CardHeader className="bg-gradient-to-r from-kid-teal to-kid-blue p-6 text-white">
                <CardTitle className="flex items-center gap-2">
                  <BadgeDollarSign className="h-5 w-5" />
                  Allowance Settings
                </CardTitle>
                <CardDescription className="text-white/80">
                  Configure the weekly allowance and add manual coins
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2 [font-family:'Comic_Sans_MS',cursive]">
                    <Calendar className="h-5 w-5 text-kid-teal" />
                    Weekly Allowance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weekly-amount">Amount (Coins)</Label>
                      <Input
                        id="weekly-amount"
                        type="number"
                        placeholder="e.g., 50"
                        defaultValue="50"
                        min="1"
                        className="bg-white/70"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allowance-day">Day of Week</Label>
                      <select
                        id="allowance-day"
                        className="flex h-10 w-full rounded-md border border-input bg-white/70 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                      </select>
                    </div>
                  </div>
                  <Button className="bg-kid-teal hover:bg-kid-teal/90">Save Allowance Settings</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2 [font-family:'Comic_Sans_MS',cursive]">
                    <BadgeDollarSign className="h-5 w-5 text-kid-yellow" />
                    Add Coins Manually
                  </h3>
                  <div className="p-4 bg-white/30 backdrop-blur-sm rounded-lg">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <Label htmlFor="manual-amount">Amount (Coins)</Label>
                        <Input
                          id="manual-amount"
                          type="number"
                          placeholder="e.g., 25"
                          value={manualAmount}
                          onChange={(e) => setManualAmount(e.target.value)}
                          min="1"
                          className="bg-white/70"
                        />
                      </div>
                      <div className="self-end">
                        <Button 
                          onClick={handleManualAdd}
                          disabled={!manualAmount || parseInt(manualAmount) <= 0 || isAddingCoins}
                          className={`bg-kid-yellow hover:bg-kid-yellow/90 text-black font-comic-sans transition-all duration-300 transform hover:scale-105 ${isAddingCoins ? 'animate-pulse' : ''}`}
                        >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          {isAddingCoins ? 'Adding...' : 'Add Coins'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ParentSettings;
