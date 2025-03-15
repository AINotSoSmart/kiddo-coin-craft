
import Layout from "@/components/layout/Layout";
import AllowanceTracker from "@/components/dashboard/AllowanceTracker";
import GoalsPreview from "@/components/dashboard/GoalsPreview";
import TaskList from "@/components/dashboard/TaskList";
import StorePreview from "@/components/dashboard/StorePreview";
import WeeklyChallenges from "@/components/dashboard/WeeklyChallenges";
import { useBudget } from "@/context/BudgetContext";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, PiggyBank, Target, CheckCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const { balance } = useBudget();
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Layout>
      <div className="py-8">
        {showIntro ? (
          <div className="mb-12 intro-card">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <span className="text-primary">Welcome to KidBudget</span>
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                A fun and educational finance app designed for kids ages 6-12 to learn money management skills through rewards, savings goals, and interactive challenges.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-accent text-accent-foreground">
                  <PiggyBank className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Learn Saving</h3>
                  <p className="text-sm text-muted-foreground">Track allowances and save for goals that matter</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-accent text-accent-foreground">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Complete Tasks</h3>
                  <p className="text-sm text-muted-foreground">Earn rewards by completing chores and challenges</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-accent text-accent-foreground">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Set Goals</h3>
                  <p className="text-sm text-muted-foreground">Learn to save and plan for future purchases</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-accent text-accent-foreground">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Make Choices</h3>
                  <p className="text-sm text-muted-foreground">Spend rewards wisely in our virtual store</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button onClick={() => setShowIntro(false)} className="group">
                Get Started
                <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-primary/80" />
                <span className="bg-gradient-to-r from-primary/90 to-secondary/90 bg-clip-text text-transparent">
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
