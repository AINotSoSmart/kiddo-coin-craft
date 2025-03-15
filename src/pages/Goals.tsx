
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useBudget } from "@/context/BudgetContext";
import CoinDisplay from "@/components/shared/CoinDisplay";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Target, Trash2, PiggyBank } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const Goals = () => {
  const { savingsGoals, balance, updateSavingsGoal, removeSavingsGoal, addSavingsGoal } = useBudget();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState<string>("10");
  const [newGoalData, setNewGoalData] = useState({
    name: "",
    targetAmount: "",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=300&auto=format&fit=crop",
  });
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  const handleContribute = (goalId: string) => {
    const amount = parseInt(contributionAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid contribution amount.",
        variant: "destructive",
      });
      return;
    }
    
    updateSavingsGoal(goalId, amount);
    setSelectedGoal(null);
  };

  const handleAddGoal = () => {
    const targetAmount = parseInt(newGoalData.targetAmount);
    
    if (!newGoalData.name) {
      toast({
        title: "Missing Name",
        description: "Please enter a name for your goal.",
        variant: "destructive",
      });
      return;
    }
    
    if (isNaN(targetAmount) || targetAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid target amount.",
        variant: "destructive",
      });
      return;
    }
    
    addSavingsGoal({
      name: newGoalData.name,
      targetAmount,
      imageUrl: newGoalData.imageUrl,
    });
    
    // Reset form
    setNewGoalData({
      name: "",
      targetAmount: "",
      imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=300&auto=format&fit=crop",
    });
    setIsAddingGoal(false);
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Savings Goals</h1>
          <p className="text-muted-foreground">
            Set goals and save up for things you want!
          </p>
          <div className="flex justify-center mt-2">
            <div className="bg-muted px-4 py-2 rounded-full flex items-center gap-2">
              <span>Your Balance:</span>
              <CoinDisplay amount={balance} size="md" />
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusCircle className="h-5 w-5" />
                Add New Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Savings Goal</DialogTitle>
                <DialogDescription>
                  Set a target and start saving towards something special.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Goal Name</Label>
                  <Input
                    id="name"
                    value={newGoalData.name}
                    onChange={(e) =>
                      setNewGoalData({ ...newGoalData, name: e.target.value })
                    }
                    placeholder="New Bike, Video Game, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Target Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newGoalData.targetAmount}
                    onChange={(e) =>
                      setNewGoalData({
                        ...newGoalData,
                        targetAmount: e.target.value,
                      })
                    }
                    placeholder="100"
                    min="1"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image</Label>
                  <Select
                    value={newGoalData.imageUrl}
                    onValueChange={(value) =>
                      setNewGoalData({ ...newGoalData, imageUrl: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an image" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=300&auto=format&fit=crop">
                        Pet
                      </SelectItem>
                      <SelectItem value="https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=300&auto=format&fit=crop">
                        Video Game
                      </SelectItem>
                      <SelectItem value="https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=300&auto=format&fit=crop">
                        Bike
                      </SelectItem>
                      <SelectItem value="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=300&auto=format&fit=crop">
                        Smartphone
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setIsAddingGoal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddGoal}>Create Goal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {savingsGoals.length === 0 ? (
          <div className="text-center py-16 bg-muted rounded-lg">
            <PiggyBank className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-medium mb-2">No Savings Goals Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start saving for something special by creating a new goal.
            </p>
            <Button
              className="gap-2"
              onClick={() => setIsAddingGoal(true)}
            >
              <PlusCircle className="h-5 w-5" />
              Add First Goal
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savingsGoals.map((goal) => (
              <Card key={goal.id} className="glass-card overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img
                    src={goal.imageUrl}
                    alt={goal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>{goal.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeSavingsGoal(goal.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(goal.currentAmount / goal.targetAmount) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Saved</div>
                      <CoinDisplay amount={goal.currentAmount} size="md" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Target</div>
                      <CoinDisplay amount={goal.targetAmount} size="md" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog
                    open={selectedGoal === goal.id}
                    onOpenChange={(open) =>
                      setSelectedGoal(open ? goal.id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full gap-2">
                        <PiggyBank className="h-5 w-5" />
                        Add to Savings
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add to your {goal.name} goal</DialogTitle>
                        <DialogDescription>
                          How much would you like to contribute?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex justify-between items-center">
                          <span>Your Balance:</span>
                          <CoinDisplay amount={balance} size="md" />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label htmlFor="contribution" className="w-auto">
                            Amount:
                          </Label>
                          <Input
                            id="contribution"
                            type="number"
                            value={contributionAmount}
                            onChange={(e) => setContributionAmount(e.target.value)}
                            className="flex-1"
                            min="1"
                            max={balance.toString()}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={() => handleContribute(goal.id)}
                          disabled={
                            parseInt(contributionAmount) <= 0 ||
                            parseInt(contributionAmount) > balance
                          }
                        >
                          Save
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Goals;
