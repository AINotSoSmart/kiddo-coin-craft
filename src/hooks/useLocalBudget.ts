
import { useEffect, useState } from 'react';
import { getItem, saveItem, STORAGE_KEYS } from '@/services/localStorage';

export interface Task {
  id: string;
  name: string;
  description: string;
  reward: number;
  completed: boolean;
  dueDate?: string;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  reward: number;
  completed: boolean;
  endDate: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  imageUrl?: string;
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'toy' | 'accessory' | 'pet' | 'upgrade';
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
}

const defaultStoreItems: StoreItem[] = [
  {
    id: 'store-item-1',
    name: 'Teddy Bear',
    description: 'A cute and cuddly teddy bear for your virtual room!',
    price: 50,
    imageUrl: 'https://placehold.co/300x200/FEF7CD/333333?text=Teddy+Bear',
    category: 'toy',
  },
  {
    id: 'store-item-2',
    name: 'Super Cape',
    description: 'Become a superhero with this awesome cape!',
    price: 75,
    imageUrl: 'https://placehold.co/300x200/E5DEFF/333333?text=Super+Cape',
    category: 'accessory',
  },
  {
    id: 'store-item-3',
    name: 'Virtual Puppy',
    description: 'Adopt a virtual puppy to play with!',
    price: 100,
    imageUrl: 'https://placehold.co/300x200/d3a2ff/333333?text=Virtual+Puppy',
    category: 'pet',
  },
  {
    id: 'store-item-4',
    name: 'Space Rocket',
    description: 'Zoom to the stars with your very own rocket!',
    price: 120,
    imageUrl: 'https://placehold.co/300x200/7fbfff/333333?text=Space+Rocket',
    category: 'toy',
  },
  {
    id: 'store-item-5',
    name: 'Magic Wand',
    description: 'Cast spells and create magic with this wand!',
    price: 85,
    imageUrl: 'https://placehold.co/300x200/FDE1D3/333333?text=Magic+Wand',
    category: 'toy',
  },
  {
    id: 'store-item-6',
    name: 'Virtual Kitten',
    description: 'A playful kitten that follows you around!',
    price: 95,
    imageUrl: 'https://placehold.co/300x200/FFDEE2/333333?text=Virtual+Kitten',
    category: 'pet',
  },
  {
    id: 'store-item-7',
    name: 'Pirate Hat',
    description: 'Ahoy matey! Look like a real pirate with this hat.',
    price: 60,
    imageUrl: 'https://placehold.co/300x200/F97316/FFFFFF?text=Pirate+Hat',
    category: 'accessory',
  },
  {
    id: 'store-item-8',
    name: 'Treasure Chest',
    description: 'Store your virtual treasures in this beautiful chest!',
    price: 150,
    imageUrl: 'https://placehold.co/300x200/FBBF24/333333?text=Treasure+Chest',
    category: 'accessory',
  },
  {
    id: 'store-item-9',
    name: 'Dragon Pet',
    description: 'A friendly dragon that breathes rainbow fire!',
    price: 200,
    imageUrl: 'https://placehold.co/300x200/22C55E/FFFFFF?text=Dragon+Pet',
    category: 'pet',
  },
  {
    id: 'store-item-10',
    name: 'Extra Piggy Bank',
    description: 'Unlock an extra piggy bank to save more coins!',
    price: 250,
    imageUrl: 'https://placehold.co/300x200/14B8A6/FFFFFF?text=Extra+Piggy',
    category: 'upgrade',
  },
  {
    id: 'store-item-11',
    name: 'Super Task Boost',
    description: 'Complete tasks faster with this special boost!',
    price: 180,
    imageUrl: 'https://placehold.co/300x200/EC4899/FFFFFF?text=Task+Boost',
    category: 'upgrade',
  },
  {
    id: 'store-item-12',
    name: 'Rainbow Crown',
    description: 'A beautiful rainbow crown that shows your status!',
    price: 120,
    imageUrl: 'https://placehold.co/300x200/8B5CF6/FFFFFF?text=Rainbow+Crown',
    category: 'accessory',
  }
];

const defaultTasks: Task[] = [
  {
    id: 'task-1',
    name: 'Clean your room',
    description: 'Make your bed and put toys away',
    reward: 10,
    completed: false,
  },
  {
    id: 'task-2',
    name: 'Help with dishes',
    description: 'Help wash or dry the dishes after dinner',
    reward: 5,
    completed: false,
  },
  {
    id: 'task-3',
    name: 'Read a book',
    description: 'Read a book for 30 minutes',
    reward: 8,
    completed: false,
  }
];

const defaultChallenges: Challenge[] = [
  {
    id: 'challenge-1',
    name: 'No-Screen Sunday',
    description: 'Go all day Sunday without screens',
    reward: 20,
    completed: false,
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
  },
  {
    id: 'challenge-2',
    name: 'Fitness Week',
    description: 'Exercise for 15 minutes every day this week',
    reward: 25,
    completed: false,
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
  }
];

const defaultGoals: SavingsGoal[] = [
  {
    id: 'goal-1',
    name: 'New Bike',
    description: 'Saving up for a new bike',
    targetAmount: 200,
    currentAmount: 50,
    imageUrl: 'https://placehold.co/300x200/d3a2ff/333333?text=New+Bike',
  }
];

export const useLocalBudget = () => {
  const [balance, setBalance] = useState<number>(() => getItem(STORAGE_KEYS.BALANCE) || 100);
  const [tasks, setTasks] = useState<Task[]>(() => getItem(STORAGE_KEYS.TASKS) || defaultTasks);
  const [challenges, setChallenges] = useState<Challenge[]>(() => getItem(STORAGE_KEYS.CHALLENGES) || defaultChallenges);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(() => getItem(STORAGE_KEYS.GOALS) || defaultGoals);
  const [storeItems, setStoreItems] = useState<StoreItem[]>(() => getItem(STORAGE_KEYS.STORE_ITEMS) || defaultStoreItems);
  const [ownedItems, setOwnedItems] = useState<string[]>(() => getItem(STORAGE_KEYS.OWNED_ITEMS) || []);
  const [transactions, setTransactions] = useState<Transaction[]>(() => getItem(STORAGE_KEYS.TRANSACTIONS) || []);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    saveItem(STORAGE_KEYS.BALANCE, balance);
  }, [balance]);

  useEffect(() => {
    saveItem(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  useEffect(() => {
    saveItem(STORAGE_KEYS.CHALLENGES, challenges);
  }, [challenges]);

  useEffect(() => {
    saveItem(STORAGE_KEYS.GOALS, savingsGoals);
  }, [savingsGoals]);

  useEffect(() => {
    saveItem(STORAGE_KEYS.STORE_ITEMS, storeItems);
  }, [storeItems]);

  useEffect(() => {
    saveItem(STORAGE_KEYS.OWNED_ITEMS, ownedItems);
  }, [ownedItems]);

  useEffect(() => {
    saveItem(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  // Logic to complete a task and earn rewards
  const completeTask = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId && !task.completed) {
        // Add transaction record
        addTransaction({
          id: `tx-${Date.now()}`,
          type: 'income',
          amount: task.reward,
          description: `Completed task: ${task.name}`,
          date: new Date().toISOString(),
        });
        
        // Update balance
        setBalance(prev => prev + task.reward);
        
        return { ...task, completed: true };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    return updatedTasks.find(t => t.id === taskId)?.reward || 0;
  };

  // Logic to complete a challenge and earn rewards
  const completeChallenge = (challengeId: string) => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === challengeId && !challenge.completed) {
        // Add transaction record
        addTransaction({
          id: `tx-${Date.now()}`,
          type: 'income',
          amount: challenge.reward,
          description: `Completed challenge: ${challenge.name}`,
          date: new Date().toISOString(),
        });
        
        // Update balance
        setBalance(prev => prev + challenge.reward);
        
        return { ...challenge, completed: true };
      }
      return challenge;
    });
    
    setChallenges(updatedChallenges);
    return updatedChallenges.find(c => c.id === challengeId)?.reward || 0;
  };

  // Logic to add a new savings goal
  const addSavingsGoal = (goal: Omit<SavingsGoal, 'id'>) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
      currentAmount: 0,
    };
    
    setSavingsGoals(prev => [...prev, newGoal]);
    return newGoal;
  };

  // Logic to contribute to a savings goal
  const contributeToGoal = (goalId: string, amount: number) => {
    if (amount <= 0 || amount > balance) return false;

    const updatedGoals = savingsGoals.map(goal => {
      if (goal.id === goalId) {
        const newAmount = goal.currentAmount + amount;
        const finalAmount = Math.min(newAmount, goal.targetAmount);
        
        return { ...goal, currentAmount: finalAmount };
      }
      return goal;
    });
    
    // Add transaction record
    addTransaction({
      id: `tx-${Date.now()}`,
      type: 'expense',
      amount: amount,
      description: `Contributed to goal: ${savingsGoals.find(g => g.id === goalId)?.name}`,
      date: new Date().toISOString(),
    });
    
    setBalance(prev => prev - amount);
    setSavingsGoals(updatedGoals);
    return true;
  };

  // Logic to purchase an item from the store
  const purchaseItem = (itemId: string) => {
    const item = storeItems.find(item => item.id === itemId);
    if (!item) return false;
    
    if (balance < item.price) return false;
    
    // Add transaction record
    addTransaction({
      id: `tx-${Date.now()}`,
      type: 'expense',
      amount: item.price,
      description: `Purchased: ${item.name}`,
      date: new Date().toISOString(),
    });
    
    setBalance(prev => prev - item.price);
    setOwnedItems(prev => [...prev, itemId]);
    return true;
  };

  // Check if an item is owned
  const isItemOwned = (itemId: string) => {
    return ownedItems.includes(itemId);
  };

  // Add a transaction record
  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  // Add a new task
  const addTask = (task: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      completed: false,
    };
    
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  // Add a new challenge
  const addChallenge = (challenge: Omit<Challenge, 'id' | 'completed'>) => {
    const newChallenge: Challenge = {
      ...challenge,
      id: `challenge-${Date.now()}`,
      completed: false,
    };
    
    setChallenges(prev => [...prev, newChallenge]);
    return newChallenge;
  };

  return {
    balance,
    tasks,
    challenges,
    savingsGoals,
    storeItems,
    transactions,
    completeTask,
    completeChallenge,
    addSavingsGoal,
    contributeToGoal,
    purchaseItem,
    isItemOwned,
    addTask,
    addChallenge,
    setBalance, // For parent settings
  };
};
