
import Layout from "@/components/layout/Layout";
import BalanceCard from "@/components/dashboard/BalanceCard";
import GoalsPreview from "@/components/dashboard/GoalsPreview";
import TaskList from "@/components/dashboard/TaskList";
import StorePreview from "@/components/dashboard/StorePreview";
import { useBudget } from "@/context/BudgetContext";

const Index = () => {
  const { balance } = useBudget();

  return (
    <Layout>
      <div className="py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">Let's manage your money today</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BalanceCard />
          <GoalsPreview />
          <TaskList />
          <StorePreview />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
