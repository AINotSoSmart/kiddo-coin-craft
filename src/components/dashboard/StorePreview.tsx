
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoinDisplay from "../shared/CoinDisplay";
import { useBudget } from "@/context/BudgetContext";
import { Link } from "react-router-dom";

const StorePreview = () => {
  const { storeItems } = useBudget();

  return (
    <Card className="overflow-hidden border-2 border-kid-pink/20">
      <CardHeader className="bg-gradient-to-r from-kid-pink to-kid-purple p-6">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Shop Items
          </div>
          <Button variant="secondary" size="sm" asChild>
            <Link to="/store">View All</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {storeItems.slice(0, 2).map((item) => (
          <div 
            key={item.id} 
            className="group bg-muted rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-32 overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
              />
            </div>
            <div className="p-3 flex flex-col">
              <h3 className="font-medium">{item.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <CoinDisplay amount={item.price} size="sm" />
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/store?item=${item.id}`}>
                    View
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default StorePreview;
