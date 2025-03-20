
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

export interface Challenge {
  id: string;
  name: string;
  description: string;
  reward: number;
  targetAmount: number;
  currentAmount: number;
  type: 'save' | 'spend' | 'task';
  deadline: string; // ISO date string
  completed: boolean;
}

export interface BudgetContextType {
  balance: number;
  weeklyAllowance: number;
  savingsGoals: SavingsGoal[];
  storeItems: StoreItem[];
  tasks: Task[];
  challenges: Challenge[];
  ownedItems: string[];
  addBalance: (amount: number) => void;
  subtractBalance: (amount: number) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void;
  updateSavingsGoal: (goalId: string, amount: number) => void;
  removeSavingsGoal: (goalId: string) => void;
  purchaseItem: (itemId: string) => boolean;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  completeTask: (taskId: string) => void;
  resetTask: (taskId: string) => void;
  isItemOwned: (itemId: string) => boolean;
  updateChallengeProgress: (challengeId: string, amount: number) => void;
  completeChallenge: (challengeId: string) => void;
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
  // Load initial state from localStorage or use defaults
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('kiddo-balance');
    return saved ? JSON.parse(saved) : 100;
  });
  const [weeklyAllowance] = useState<number>(() => {
    const saved = localStorage.getItem('kiddo-allowance');
    return saved ? JSON.parse(saved) : 50;
  });
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(() => {
    const saved = localStorage.getItem('kiddo-savings');
    return saved ? JSON.parse(saved) : [
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
  ]});

  const [storeItems, setStoreItems] = useState<StoreItem[]>(() => {
    const saved = localStorage.getItem('kiddo-store-items');
    return saved ? JSON.parse(saved) : [
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
    {
      id: 's6',
      name: 'Virtual Dog',
      price: 150,
      description: 'A loyal companion that follows you everywhere',
      imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=300&auto=format&fit=crop',
      category: 'pet',
    },
    {
      id: 's7',
      name: 'Magic Wand',
      price: 85,
      description: 'Cast spells and create magical effects in your room',
      imageUrl: 'https://images.unsplash.com/photo-1618329075618-0d7add8b1ef2?q=80&w=300&auto=format&fit=crop',
      category: 'toy',
    },
    {
      id: 's8',
      name: 'Digital Skateboard',
      price: 110,
      description: 'Ride around your virtual world in style',
      imageUrl: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=300&auto=format&fit=crop',
      category: 'toy',
    },
    {
      id: 's9',
      name: 'Star Projector',
      price: 70,
      description: 'Fill your room with stars and galaxies',
      imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=300&auto=format&fit=crop',
      category: 'accessory',
    },
    {
      id: 's10',
      name: 'Garden Upgrade',
      price: 180,
      description: 'Add a beautiful garden to your virtual space',
      imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=300&auto=format&fit=crop',
      category: 'upgrade',
    }
  ]});

  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('kiddo-tasks');
    return saved ? JSON.parse(saved) : [
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
  ]});

  
  const [ownedItems, setOwnedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('kiddo-owned-items');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Initialize weekly challenges
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem('kiddo-challenges');
    return saved ? JSON.parse(saved) : [
    {
      id: 'c1',
      name: 'Save 50 Coins',
      description: 'Save 50 coins this week to get a special reward!',
      reward: 25,
      targetAmount: 50,
      currentAmount: 0,
      type: 'save',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      completed: false
    },
    {
      id: 'c2',
      name: 'Complete All Tasks',
      description: 'Finish all your tasks this week for a bonus!',
      reward: 30,
      targetAmount: tasks.length,
      currentAmount: 0,
      type: 'task',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false
    },
    {
      id: 'c3',
      name: 'Shopping Spree',
      description: 'Buy at least 1 item from the store this week',
      reward: 15,
      targetAmount: 1,
      currentAmount: 0,
      type: 'spend',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false
    }
  ]});


  // Add to balance
  const addBalance = (amount: number) => {
    setBalance((prev) => prev + amount);
    toast({
      title: "Money Added!",
      description: `You've added ${amount} coins to your balance.`,
      variant: "default",
    });
    
    // Update save challenge progress
    challenges.forEach(challenge => {
      if (challenge.type === 'save' && !challenge.completed) {
        updateChallengeProgress(challenge.id, amount);
      }
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

  const addTask = (task: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      completed: false,
    };
    setTasks([...tasks, newTask]);
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
    
    // Update save challenge progress
    challenges.forEach(challenge => {
      if (challenge.type === 'save' && !challenge.completed) {
        updateChallengeProgress(challenge.id, amount);
      }
    });
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
      
      // Update spend challenge progress
      challenges.forEach(challenge => {
        if (challenge.type === 'spend' && !challenge.completed) {
          updateChallengeProgress(challenge.id, 1);
        }
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
      
      // Update task challenge progress
      challenges.forEach(challenge => {
        if (challenge.type === 'task' && !challenge.completed) {
          updateChallengeProgress(challenge.id, 1);
        }
      });
    }
  };

  // Update challenge progress
  const updateChallengeProgress = (challengeId: string, amount: number) => {
    setChallenges(prev => 
      prev.map(challenge => {
        if (challenge.id === challengeId && !challenge.completed) {
          const newAmount = challenge.currentAmount + amount;
          const updatedChallenge = { 
            ...challenge, 
            currentAmount: Math.min(newAmount, challenge.targetAmount)
          };
          
          // Check if challenge is now completed
          if (updatedChallenge.currentAmount >= updatedChallenge.targetAmount) {
            // We'll mark it as completed but we'll actually complete it through the completeChallenge function
            // This is to ensure the reward is only given once
          }
          
          return updatedChallenge;
        }
        return challenge;
      })
    );
  };
  
  // Complete a challenge and give reward
  const completeChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    
    if (challenge && !challenge.completed && challenge.currentAmount >= challenge.targetAmount) {
      setChallenges(prev => 
        prev.map(c => c.id === challengeId ? { ...c, completed: true } : c)
      );
      
      addBalance(challenge.reward);
      toast({
        title: "Challenge Completed! 🎉",
        description: `You earned ${challenge.reward} coins for completing "${challenge.name}"!`,
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

  // Save state changes to localStorage
  useEffect(() => {
    localStorage.setItem('kiddo-balance', JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('kiddo-allowance', JSON.stringify(weeklyAllowance));
  }, [weeklyAllowance]);

  useEffect(() => {
    localStorage.setItem('kiddo-savings', JSON.stringify(savingsGoals));
  }, [savingsGoals]);

  useEffect(() => {
    localStorage.setItem('kiddo-owned-items', JSON.stringify(ownedItems));
  }, [ownedItems]);

  useEffect(() => {
    localStorage.setItem('kiddo-challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('kiddo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('kiddo-store-items', JSON.stringify(storeItems));
  }, [storeItems]);

  return (
    <BudgetContext.Provider
      value={{
        balance,
        weeklyAllowance,
        savingsGoals,
        storeItems,
        tasks,
        challenges,
        ownedItems,
        addBalance,
        subtractBalance,
        addSavingsGoal,
        updateSavingsGoal,
        removeSavingsGoal,
        purchaseItem,
        addTask,
        completeTask,
        resetTask,
        isItemOwned,
        updateChallengeProgress,
        completeChallenge,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
