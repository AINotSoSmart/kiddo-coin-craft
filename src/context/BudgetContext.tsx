
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Types
export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  imageUrl: string;
}

export interface StoreItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: 'toy' | 'accessory' | 'pet' | 'upgrade';
}

export interface Task {
  id: string;
  name: string;
  reward: number;
  completed: boolean;
}

export interface BudgetContextType {
  balance: number;
  weeklyAllowance: number;
  savingsGoals: SavingsGoal[];
  storeItems: StoreItem[];
  tasks: Task[];
  ownedItems: string[];
  addBalance: (amount: number) => void;
  subtractBalance: (amount: number) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void;
  updateSavingsGoal: (goalId: string, amount: number) => void;
  removeSavingsGoal: (goalId: string) => void;
  purchaseItem: (itemId: string) => boolean;
  completeTask: (taskId: string) => void;
  resetTask: (taskId: string) => void;
  isItemOwned: (itemId: string) => boolean;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [balance, setBalance] = useState<number>(100);
  const [weeklyAllowance] = useState<number>(50);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    {
      id: '1',
      name: 'Video Game',
      targetAmount: 200,
      currentAmount: 50,
      imageUrl: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=300&auto=format&fit=crop',
    },
    {
      id: '2',
      name: 'Bike',
      targetAmount: 500,
      currentAmount: 100,
      imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=300&auto=format&fit=crop',
    }
  ]);
  const [storeItems, setStoreItems] = useState<StoreItem[]>([
    {
      id: 's1',
      name: 'Teddy Bear',
      price: 50,
      description: 'A cuddly companion for your virtual room',
      imageUrl: 'https://images.unsplash.com/photo-1558877385-81a1c7b67b22?q=80&w=300&auto=format&fit=crop',
      category: 'toy',
    },
    {
      id: 's2',
      name: 'Rocket Ship',
      price: 75,
      description: 'Blast off into space with this cool rocket',
      imageUrl: 'https://images.unsplash.com/photo-1636097411291-91d7d7b44ba7?q=80&w=300&auto=format&fit=crop',
      category: 'toy',
    },
    {
      id: 's3',
      name: 'Virtual Cat',
      price: 120,
      description: 'A cute pet that needs your care and attention',
      imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300&auto=format&fit=crop',
      category: 'pet',
    },
    {
      id: 's4',
      name: 'Superhero Cape',
      price: 60,
      description: 'Be the hero of your own story',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=300&auto=format&fit=crop',
      category: 'accessory',
    },
    {
      id: 's5',
      name: 'Room Upgrade',
      price: 200,
      description: 'Upgrade your virtual space with cool decorations',
      imageUrl: 'https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=300&auto=format&fit=crop',
      category: 'upgrade',
    },
  ]);
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 't1',
      name: 'Clean your room',
      reward: 15,
      completed: false
    },
    {
      id: 't2',
      name: 'Do your homework',
      reward: 20,
      completed: false
    },
    {
      id: 't3',
      name: 'Help with dishes',
      reward: 10,
      completed: false
    },
    {
      id: 't4',
      name: 'Read for 30 minutes',
      reward: 15,
      completed: false
    }
  ]);
  
  const [ownedItems, setOwnedItems] = useState<string[]>([]);

  // Add to balance
  const addBalance = (amount: number) => {
    setBalance((prev) => prev + amount);
    toast({
      title: "Money Added!",
      description: `You've added ${amount} coins to your balance.`,
      variant: "default",
    });
  };

  // Subtract from balance
  const subtractBalance = (amount: number) => {
    if (balance >= amount) {
      setBalance((prev) => prev - amount);
      return true;
    }
    toast({
      title: "Not Enough Money!",
      description: `You need ${amount - balance} more coins.`,
      variant: "destructive",
    });
    return false;
  };

  // Add a savings goal
  const addSavingsGoal = (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: Date.now().toString(),
      currentAmount: 0,
    };
    setSavingsGoals((prev) => [...prev, newGoal]);
    toast({
      title: "Goal Added!",
      description: `You've added a new savings goal: ${goal.name}.`,
    });
  };

  // Update a savings goal
  const updateSavingsGoal = (goalId: string, amount: number) => {
    if (amount > balance) {
      toast({
        title: "Not Enough Money!",
        description: `You need ${amount - balance} more coins.`,
        variant: "destructive",
      });
      return;
    }

    setSavingsGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          const newAmount = goal.currentAmount + amount;
          const updatedAmount = Math.min(newAmount, goal.targetAmount);
          
          // Check if goal is completed
          if (updatedAmount >= goal.targetAmount) {
            toast({
              title: "Goal Completed! 🎉",
              description: `Congratulations! You've reached your goal for ${goal.name}!`,
            });
          } else {
            toast({
              title: "Saved!",
              description: `You've added ${amount} coins toward ${goal.name}.`,
            });
          }
          
          return { ...goal, currentAmount: updatedAmount };
        }
        return goal;
      })
    );
    
    subtractBalance(amount);
  };

  // Remove a savings goal
  const removeSavingsGoal = (goalId: string) => {
    const goalToRemove = savingsGoals.find(goal => goal.id === goalId);
    
    if (goalToRemove) {
      setSavingsGoals((prev) => prev.filter((goal) => goal.id !== goalId));
      
      // Return any saved money back to balance
      if (goalToRemove.currentAmount > 0) {
        addBalance(goalToRemove.currentAmount);
        toast({
          title: "Goal Removed",
          description: `${goalToRemove.currentAmount} coins have been returned to your balance.`,
        });
      }
    }
  };

  // Purchase an item
  const purchaseItem = (itemId: string) => {
    const item = storeItems.find((item) => item.id === itemId);
    
    if (!item) return false;
    
    if (balance >= item.price) {
      subtractBalance(item.price);
      setOwnedItems((prev) => [...prev, itemId]);
      toast({
        title: "Purchase Complete!",
        description: `You now own ${item.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Not Enough Money!",
        description: `You need ${item.price - balance} more coins.`,
        variant: "destructive",
      });
      return false;
    }
  };

  // Complete a task
  const completeTask = (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);
    
    if (task && !task.completed) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
      );
      
      addBalance(task.reward);
      toast({
        title: "Task Completed!",
        description: `You earned ${task.reward} coins for completing "${task.name}".`,
      });
    }
  };

  // Reset a task
  const resetTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: false } : t))
    );
  };

  // Check if an item is owned
  const isItemOwned = (itemId: string) => {
    return ownedItems.includes(itemId);
  };

  return (
    <BudgetContext.Provider
      value={{
        balance,
        weeklyAllowance,
        savingsGoals,
        storeItems,
        tasks,
        ownedItems,
        addBalance,
        subtractBalance,
        addSavingsGoal,
        updateSavingsGoal,
        removeSavingsGoal,
        purchaseItem,
        completeTask,
        resetTask,
        isItemOwned,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
