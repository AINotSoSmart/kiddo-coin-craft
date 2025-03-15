
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDollarSign } from "lucide-react";
import CoinDisplay from "../shared/CoinDisplay";
import { useBudget } from "@/context/BudgetContext";

const BalanceCard = () => {
  const { balance, weeklyAllowance } = useBudget();

  return (
    <Card className="overflow-hidden border-2 border-kid-purple/20">
      <CardHeader className="bg-gradient-to-r from-kid-purple to-kid-teal p-6">
        <CardTitle className="flex items-center gap-2 text-white">
          <BadgeDollarSign className="h-6 w-6" />
          My Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-1">Current Balance</p>
          <CoinDisplay amount={balance} size="lg" />
        </div>
        <div className="bg-muted rounded-lg p-3 text-center">
          <p className="text-muted-foreground text-sm mb-1">Weekly Allowance</p>
          <CoinDisplay amount={weeklyAllowance} size="md" />
          <p className="text-xs text-muted-foreground mt-2">Next allowance in 3 days</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
