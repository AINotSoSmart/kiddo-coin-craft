
import Layout from "@/components/layout/Layout";
import AllowanceTracker from "@/components/dashboard/AllowanceTracker";
import GoalsPreview from "@/components/dashboard/GoalsPreview";
import TaskList from "@/components/dashboard/TaskList";
import StorePreview from "@/components/dashboard/StorePreview";
import WeeklyChallenges from "@/components/dashboard/WeeklyChallenges";
import { useBudget } from "@/context/BudgetContext";
import { Sparkles } from "lucide-react";

const Index = () => {
  const { balance } = useBudget();

  return (
    <Layout>
      <div className="py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-7 w-7 text-kid-yellow animate-jiggle" />
            <span className="bg-gradient-to-r from-kid-purple to-kid-blue bg-clip-text text-transparent">
              Welcome Back!
            </span>
          </h1>
          <p className="text-muted-foreground">Let's manage your money today</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AllowanceTracker />
          <GoalsPreview />
          <TaskList />
          <WeeklyChallenges />
          <StorePreview />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
