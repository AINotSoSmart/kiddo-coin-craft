
import Layout from "@/components/layout/Layout";
import AllowanceTracker from "@/components/dashboard/AllowanceTracker";
import GoalsPreview from "@/components/dashboard/GoalsPreview";
import TaskList from "@/components/dashboard/TaskList";
import StorePreview from "@/components/dashboard/StorePreview";
import WeeklyChallenges from "@/components/dashboard/WeeklyChallenges";
import { useBudget } from "@/context/BudgetContext";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, PiggyBank, Target, CheckCircle, ShoppingCart, Medal, BookOpen, LightbulbIcon, Activity } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const { balance } = useBudget();
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Layout>
      <div className="py-8">
        {showIntro ? (
          <div className="flex flex-col-reverse md:flex-row gap-8 items-center mb-12">
            <div className="flex-1 text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 [font-family:'Comic_Sans_MS',cursive] bg-gradient-to-r from-kid-purple to-kid-teal bg-clip-text text-transparent">
                Make Money Management Fun!
              </h1>
              <p className="text-xl mb-8 text-muted-foreground">
                Start your financial journey with KidBudget - where learning about money feels like playing your favorite game! 🎮
              </p>
              <div className="flex gap-4">
                <Button onClick={() => setShowIntro(false)} className="text-lg px-6 py-6 animate-bounce-slow">
                  Start Your Adventure
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex-1 intro-card glass-card border-2 border-black border-dashed p-8">
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
            
            </div>
          </div>
        ) : (
          <>
            <div className="mb-12 text-center">
              <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-primary/80" />
                <span className="welcome-text bg-gradient-to-r from-primary/90 to-secondary/90 bg-clip-text text-transparent">
                  Welcome Back!
                </span>
              </h1>
              <p className="text-muted-foreground">Let's manage your money today</p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-8 text-center [font-family:'Comic_Sans_MS',cursive] bg-gradient-to-r from-kid-purple2 to-kid-teal bg-clip-text text-transparent">
                Your Money Mastery Path
              </h2>
              <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-4 bg-gradient-to-r from-kid-purple to-kid-teal -translate-y-1/2 rounded-full opacity-20"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  <div className="glass-card border-2 border-black border-dashed p-6 hover:scale-105 transition-transform cursor-pointer bg-white/80">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-kid-purple/20 flex items-center justify-center mx-auto mb-2">
                        <PiggyBank className="h-8 w-8 text-kid-purple" />
                      </div>
                      <h3 className="text-xl font-bold [font-family:'Comic_Sans_MS',cursive]">Money Basics</h3>
                    </div>
                    <p className="text-center text-muted-foreground">Learn about saving, spending, and the value of money through fun activities!</p>
                  </div>
                  
                  <div className="glass-card border-2 border-black border-dashed p-6 hover:scale-105 transition-transform cursor-pointer bg-white/80">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-kid-teal/20 flex items-center justify-center mx-auto mb-2">
                        <Target className="h-8 w-8 text-kid-teal" />
                      </div>
                      <h3 className="text-xl font-bold [font-family:'Comic_Sans_MS',cursive]">Smart Goals</h3>
                    </div>
                    <p className="text-center text-muted-foreground">Set your money goals and watch your savings grow with each achievement!</p>
                  </div>
                  
                  <div className="glass-card border-2 border-black border-dashed p-6 hover:scale-105 transition-transform cursor-pointer bg-white/80">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-kid-yellow/20 flex items-center justify-center mx-auto mb-2">
                        <Medal className="h-8 w-8 text-kid-yellow" />
                      </div>
                      <h3 className="text-xl font-bold [font-family:'Comic_Sans_MS',cursive]">Money Master</h3>
                    </div>
                    <p className="text-center text-muted-foreground">Become a money expert and unlock special rewards and badges!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12 glass-card border-2 border-black border-dashed p-8 bg-gradient-to-br from-white/90 to-white/50">
              <h2 className="text-2xl font-bold mb-6 text-center [font-family:'Comic_Sans_MS',cursive] bg-gradient-to-r from-kid-blue to-kid-green bg-clip-text text-transparent">
                Fun Money Facts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-white/50 rounded-lg border border-dashed border-black hover:bg-white/70 transition-all cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-kid-blue/20">
                      <LightbulbIcon className="h-6 w-6 text-kid-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 [font-family:'Comic_Sans_MS',cursive]">Did You Know?</h3>
                      <p className="text-muted-foreground">The first piggy banks were made in the 13th century and were actually made from clay!</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white/50 rounded-lg border border-dashed border-black hover:bg-white/70 transition-all cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-kid-green/20">
                      <BookOpen className="h-6 w-6 text-kid-green" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 [font-family:'Comic_Sans_MS',cursive]">Money Wisdom</h3>
                      <p className="text-muted-foreground">If you save just $1 a day, you'll have $365 in a year - that's enough for something special!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AllowanceTracker />
              <GoalsPreview />
              <TaskList />
              <WeeklyChallenges />
              <StorePreview />
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-center [font-family:'Comic_Sans_MS',cursive] bg-gradient-to-r from-kid-purple to-kid-teal bg-clip-text text-transparent">
                Your Financial Journey
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card border-2 border-black border-dashed p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Medal className="h-6 w-6 text-kid-yellow" />
                    <h3 className="text-xl font-bold [font-family:'Comic_Sans_MS',cursive]">Achievement Badges</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((badge) => (
                      <div key={badge} className="aspect-square rounded-full bg-white/50 border-2 border-dashed border-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                        <Medal className="h-8 w-8 text-kid-yellow" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card border-2 border-black border-dashed p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-6 w-6 text-kid-blue" />
                    <h3 className="text-xl font-bold [font-family:'Comic_Sans_MS',cursive]">Learning Resources</h3>
                  </div>
                  <div className="space-y-3">
                    {["Saving Basics", "Smart Spending", "Budget Planning"].map((topic) => (
                      <div key={topic} className="p-3 bg-white/50 rounded-lg border border-dashed border-black hover:bg-white/70 transition-colors cursor-pointer">
                        <p className="font-medium">{topic}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card border-2 border-black border-dashed p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <LightbulbIcon className="h-6 w-6 text-kid-yellow" />
                    <h3 className="text-xl font-bold [font-family:'Comic_Sans_MS',cursive]">Financial Tip of the Day</h3>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg border border-dashed border-black">
                    <p className="text-lg mb-2">💡 Did you know?</p>
                    <p className="text-muted-foreground">Saving just a small amount regularly can add up to something big over time!</p>
                  </div>
                </div>

                <div className="glass-card border-2 border-black border-dashed p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="h-6 w-6 text-kid-green" />
                    <h3 className="text-xl font-bold [font-family:'Comic_Sans_MS',cursive]">Recent Activity</h3>
                  </div>
                  <div className="space-y-3">
                    {["Completed daily task", "Earned new badge", "Saved for goal"].map((activity) => (
                      <div key={activity} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-dashed border-black">
                        <div className="h-2 w-2 rounded-full bg-kid-green"></div>
                        <p className="text-sm">{activity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
