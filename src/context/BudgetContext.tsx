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

  const [storeItems, setStoreItems] = useState<StoreItem[]>([
    // Toys Category
    
  
    {
      id: 's3',
      name: 'Building Blocks',
      price: 85,
      description: 'Create amazing structures with colorful blocks',
      imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=300&auto=format&fit=crop',
      category: 'toy',
    },
    {
      id: 's4',
      name: 'Art Set',
      price: 65,
      description: 'Express your creativity with a complete art kit',
      imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300&auto=format&fit=crop',
      category: 'toy',
    },
    {
      id: 's5',
      name: 'Remote Control Car',
      price: 120,
      description: 'Race around with this speedy RC car',
      imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=300&auto=format&fit=crop',
      category: 'toy',
    },
    {
      id: 's6',
      name: 'Science Kit',
      price: 90,
      description: 'Discover the wonders of science with fun experiments',
      imageUrl: 'https://images.unsplash.com/photo-1532634993-15f421e42ec0?q=80&w=300&auto=format&fit=crop',
      category: 'toy',
    },
    {
      id: 's7',
      name: 'Musical Keyboard',
      price: 150,
      description: 'Create beautiful music with this beginner keyboard',
      imageUrl: 'https://images.unsplash.com/photo-1552056776-9b5657118ca4?q=80&w=300&auto=format&fit=crop',
      category: 'toy',
    },
    {
      id: 's8',
      name: 'Puppet Theater',
      price: 110,
      description: 'Put on amazing shows with your own theater',
      imageUrl: 'https://images.unsplash.com/photo-1618506557292-ec1862b3c506?q=80&w=300&auto=format&fit=crop',
      category: 'toy',
    },
    {
      id: 's9',
      name: 'Board Game Set',
      price: 95,
      description: 'Hours of fun with classic board games',
      imageUrl: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?q=80&w=300&auto=format&fit=crop',
      category: 'toy',
    },
    {
      id: 's10',
      name: 'Magic Kit',
      price: 80,
      description: 'Learn amazing tricks to impress your friends',
      imageUrl: 'https://images.unsplash.com/photo-1572507388915-99d3c1cbe324?q=80&w=300&auto=format&fit=crop',
      category: 'toy',
    },
    // Pets Category
    {
      id: 's11',
      name: 'Virtual Cat',
      price: 120,
      description: 'A cute pet that needs your care and attention',
      imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300&auto=format&fit=crop',
      category: 'pet',
    },
    {
      id: 's12',
      name: 'Virtual Dog',
      price: 130,
      description: 'A loyal companion who loves to play',
      imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=300&auto=format&fit=crop',
      category: 'pet',
    },
    {
      id: 's13',
      name: 'Virtual Hamster',
      price: 90,
      description: 'A tiny friend who loves to explore',
      imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=300&auto=format&fit=crop',
      category: 'pet',
    },
    {
      id: 's14',
      name: 'Virtual Bird',
      price: 100,
      description: 'A colorful bird that sings beautiful songs',
      imageUrl: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?q=80&w=300&auto=format&fit=crop',
      category: 'pet',
    },
    {
      id: 's15',
      name: 'Virtual Fish Tank',
      price: 150,
      description: 'Create your own underwater world',
      imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=300&auto=format&fit=crop',
      category: 'pet',
    },
    {
      id: 's16',
      name: 'Virtual Rabbit',
      price: 110,
      description: 'A fluffy friend who loves carrots',
      imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=300&auto=format&fit=crop',
      category: 'pet',
    },
    {
      id: 's17',
      name: 'Virtual Turtle',
      price: 95,
      description: 'A slow but steady companion',
      imageUrl: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=300&auto=format&fit=crop',
      category: 'pet',
    },
    {
      id: 's18',
      name: 'Virtual Parrot',
      price: 140,
      description: 'A talkative friend who mimics your words',
      imageUrl: 'https://images.unsplash.com/photo-1544181093-c712fb401bdc?q=80&w=300&auto=format&fit=crop',
      category: 'pet',
    },
    {
      id: 's19',
      name: 'Virtual Guinea Pig',
      price: 85,
      description: 'A gentle pet who loves vegetables',
      imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=300&auto=format&fit=crop',
      category: 'pet',
    },
    {
      id: 's20',
      name: 'Virtual Lizard',
      price: 115,
      description: 'A unique pet with a cool personality',
      imageUrl: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?q=80&w=300&auto=format&fit=crop',
      category: 'pet',
    },
    // Accessories Category
    {
      id: 's21',
      name: 'Superhero Cape',
      price: 60,
      description: 'Be the hero of your own story',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=300&auto=format&fit=crop',
      category: 'accessory',
    },
    {
      id: 's22',
      name: 'Magic Wand',
      price: 45,
      description: 'Cast spells and create magic',
      imageUrl: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?q=80&w=300&auto=format&fit=crop',
      category: 'accessory',
    },
    {
      id: 's23',
      name: 'Crown',
      price: 70,
      description: 'Feel like royalty with this shiny crown',
      imageUrl: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=300&auto=format&fit=crop',
      category: 'accessory',
    },
    {
      id: 's24',
      name: 'Backpack',
      price: 55,
      description: 'Carry your adventures with style',
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300&auto=format&fit=crop',
      category: 'accessory',
    },
    {
      id: 's25',
      name: 'Treasure Map',
      price: 40,
      description: 'Find hidden treasures in your virtual world',
      imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd75a9370?q=80&w=300&auto=format&fit=crop',
      category: 'accessory',
    },
    {
      id: 's26',
      name: 'Wizard Hat',
      price: 50,
      description: 'Perfect for aspiring magicians',
      imageUrl: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=300&auto=format&fit=crop',
      category: 'accessory',
    },
    {
      id: 's27',
      name: 'Adventure Compass',
      price: 35,
      description: 'Never lose your way on adventures',
      imageUrl: 'https://images.unsplash.com/photo-1533317177834-f881a2413e30?q=80&w=300&auto=format&fit=crop',
      category: 'accessory',
    },
    {
      id: 's28',
      name: 'Magical Amulet',
      price: 65,
      description: 'Wear this for good luck and protection',
      imageUrl: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=300&auto=format&fit=crop',
      category: 'accessory',
    },
    {
      id: 's29',
      name: 'Explorer Belt',
      price: 45,
      description: 'Keep your tools handy for adventures',
      imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=300&auto=format&fit=crop',
      category: 'accessory',
    },
    {
      id: 's30',
      name: 'Magic Glasses',
      price: 55,
      description: 'See the world in a magical way',
      imageUrl: 'https://images.unsplash.com/photo-1577744486770-020ab432da65?q=80&w=300&auto=format&fit=crop',
      category: 'accessory',
    },
    // Upgrades Category
    {
      id: 's31',
      name: 'Room Upgrade',
      price: 200,
      description: 'Upgrade your virtual space with cool decorations',
      imageUrl: 'https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=300&auto=format&fit=crop',
      category: 'upgrade',
    },
    {
      id: 's32',
      name: 'Garden Expansion',
      price: 250,
      description: 'Add a beautiful garden to your virtual space',
      imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=300&auto=format&fit=crop',
      category: 'upgrade',
    },
    {
      id: 's33',
      name: 'Library Corner',
      price: 180,
      description: 'Create a cozy reading nook',
      imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=300&auto=format&fit=crop',
      category: 'upgrade',
    },
    {
      id: 's34',
      name: 'Art Studio',
      price: 220,
      description: 'A creative space for your artistic endeavors',
      imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=300&auto=format&fit=crop',
      category: 'upgrade',
    },
    {
      id: 's35',
      name: 'Music Room',
      price: 240,
      description: 'Transform your space into a musical paradise',
      imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=300&auto=format&fit=crop',
      category: 'upgrade',
    },
    {
      id: 's36',
      name: 'Science Lab',
      price: 280,
      description: 'Set up your own experimental laboratory',
      imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=300&auto=format&fit=crop',
      category: 'upgrade',
    },
    {
      id: 's37',
      name: 'Sports Corner',
      price: 190,
      description: 'Create a space for your favorite sports activities',
      imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=300&auto=format&fit=crop',
      category: 'upgrade',
    },
    {
      id: 's38',
      name: 'Gaming Station',
      price: 260,
      description: 'Ultimate setup for gaming enthusiasts',
      imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=300&auto=format&fit=crop',
      category: 'upgrade',
    },
    {
      id: 's39',
      name: 'Craft Workshop',
      price: 210,
      description: 'Perfect space for DIY projects',
      imageUrl: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=300&auto=format&fit=crop',
      category: 'upgrade',
    },
    {
      id: 's40',
      name: 'Observatory Deck',
      price: 300,
      description: 'Watch the stars from your own observatory',
      imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=300&auto=format&fit=crop',
      category: 'upgrade',
    }
  ]);

  
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

  // Add a new task
  const addTask = (task: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    toast({
      title: "Task Added!",
      description: `New task "${task.name}" has been added.`,
    });
  };

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
