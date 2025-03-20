
const PREFIX = 'kiddoBank_';

export interface StorageItem<T> {
  key: string;
  value: T;
  timestamp?: number;
}

export const saveItem = <T>(key: string, value: T): void => {
  try {
    const item: StorageItem<T> = {
      key,
      value,
      timestamp: Date.now(),
    };
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(item));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};

export const getItem = <T>(key: string): T | null => {
  try {
    const itemJson = localStorage.getItem(`${PREFIX}${key}`);
    if (!itemJson) return null;
    
    const item: StorageItem<T> = JSON.parse(itemJson);
    return item.value;
  } catch (error) {
    console.error('Error retrieving from localStorage', error);
    return null;
  }
};

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(`${PREFIX}${key}`);
  } catch (error) {
    console.error('Error removing from localStorage', error);
  }
};

export const clearAll = (): void => {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing localStorage', error);
  }
};

// Storage keys
export const STORAGE_KEYS = {
  BALANCE: 'userBalance',
  TASKS: 'userTasks',
  CHALLENGES: 'userChallenges',
  GOALS: 'savingsGoals',
  STORE_ITEMS: 'storeItems',
  OWNED_ITEMS: 'ownedItems',
  TRANSACTIONS: 'transactions',
  USER_SETTINGS: 'userSettings',
};
