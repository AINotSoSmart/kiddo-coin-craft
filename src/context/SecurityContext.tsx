import { createContext, useContext, useState, useEffect } from 'react';

type SecurityQuestion = {
  question: string;
  answer: string;
};

type SecurityContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isSetup: boolean;
  setupQuestions: (questions: SecurityQuestion[]) => void;
  verifyAnswers: (answers: string[]) => boolean;
  securityQuestions: SecurityQuestion[];
};

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestion[]>([]);

  useEffect(() => {
    const savedQuestions = localStorage.getItem('securityQuestions');
    if (savedQuestions) {
      setIsSetup(true);
      setSecurityQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const setupQuestions = (questions: SecurityQuestion[]) => {
    localStorage.setItem('securityQuestions', JSON.stringify(questions));
    setSecurityQuestions(questions);
    setIsSetup(true);
    setIsAuthenticated(true);
  };

  const verifyAnswers = (answers: string[]) => {
    const isValid = answers.every((answer, index) => 
      answer.toLowerCase() === securityQuestions[index].answer.toLowerCase()
    );
    setIsAuthenticated(isValid);
    return isValid;
  };

  return (
    <SecurityContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      isSetup,
      setupQuestions,
      verifyAnswers,
      securityQuestions
    }}>
      {children}
    </SecurityContext.Provider>
  );
}

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) throw new Error('useSecurity must be used within SecurityProvider');
  return context;
};