
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useBudget } from "@/context/BudgetContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, ClipboardPen, Settings, Trash2 } from "lucide-react";
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
  const { tasks, resetTask, addBalance } = useBudget();
  const [newTask, setNewTask] = useState({
    name: "",
    reward: "",
  });
  const [manualAmount, setManualAmount] = useState("");

  const handleResetTasks = () => {
    tasks.forEach((task) => {
      resetTask(task.id);
    });
    toast({
      title: "Tasks Reset",
      description: "All tasks have been reset and are available again.",
    });
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
    
    addBalance(amount);
    setManualAmount("");
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Parent Settings</h1>
          <p className="text-muted-foreground">
            Manage tasks and allowance settings
          </p>
        </div>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
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
            <Card>
              <CardHeader>
                <CardTitle>Tasks Management</CardTitle>
                <CardDescription>
                  Create and manage tasks that children can complete to earn coins
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Current Tasks</h3>
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          task.completed ? "bg-muted" : ""
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
                            className="h-8 w-8 p-0"
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
                    <h3 className="text-lg font-medium">Add New Task</h3>
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
                        />
                      </div>
                    </div>
                    <Button
                      className="w-full md:w-auto"
                      disabled={!newTask.name || !newTask.reward}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleResetTasks}>
                  Reset All Tasks
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="allowance">
            <Card>
              <CardHeader>
                <CardTitle>Allowance Settings</CardTitle>
                <CardDescription>
                  Configure the weekly allowance and add manual coins
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Weekly Allowance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weekly-amount">Amount (Coins)</Label>
                      <Input
                        id="weekly-amount"
                        type="number"
                        placeholder="e.g., 50"
                        defaultValue="50"
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allowance-day">Day of Week</Label>
                      <select
                        id="allowance-day"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <Button>Save Allowance Settings</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Add Coins Manually</h3>
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
                      />
                    </div>
                    <div className="self-end">
                      <Button 
                        onClick={handleManualAdd}
                        disabled={!manualAmount || parseInt(manualAmount) <= 0}
                      >
                        Add Coins
                      </Button>
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
