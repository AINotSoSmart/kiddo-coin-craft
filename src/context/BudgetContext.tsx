
import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalBudget } from '@/hooks/useLocalBudget';
import type { Task, Challenge, SavingsGoal, StoreItem, Transaction } from '@/hooks/useLocalBudget';

// Context type
interface BudgetContextType {
  balance: number;
  tasks: Task[];
  challenges: Challenge[];
  savingsGoals: SavingsGoal[];
  storeItems: StoreItem[];
  transactions: Transaction[];
  completeTask: (taskId: string) => number;
  completeChallenge: (challengeId: string) => number;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id'>) => SavingsGoal;
  contributeToGoal: (goalId: string, amount: number) => boolean;
  purchaseItem: (itemId: string) => boolean;
  isItemOwned: (itemId: string) => boolean;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => Task;
  addChallenge: (challenge: Omit<Challenge, 'id' | 'completed'>) => Challenge;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

// Create context
const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

// Provider component
export const BudgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const budgetData = useLocalBudget();

  return (
    <BudgetContext.Provider value={budgetData}>
      {children}
    </BudgetContext.Provider>
  );
};

// Hook for using the budget context
export const useBudget = (): BudgetContextType => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

// Export types so they can be used elsewhere
export type { Task, Challenge, SavingsGoal, StoreItem, Transaction };
