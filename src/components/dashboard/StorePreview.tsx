
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoinDisplay from "../shared/CoinDisplay";
import { useBudget } from "@/context/BudgetContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const StorePreview = () => {
  const { storeItems } = useBudget();
  const [saleItem, setSaleItem] = useState<string | null>(null);
  
  useEffect(() => {
    // Generate a random sale item
    if (storeItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * storeItems.length);
      setSaleItem(storeItems[randomIndex].id);
    }
  }, [storeItems]);

  return (
    <Card className="overflow-hidden border-2 border-black border-dashed bg-white">
      <CardHeader className="bg-[#FFE6EA] p-5 border-b-2 border-black border-dashed">
        <CardTitle className="flex items-center justify-between text-black font-normal" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            <span className="text-xl" style={{ transform: "rotate(-2deg)" }}>Fun Shop</span>
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
            className="group glass-card rounded-lg overflow-hidden flex flex-col hover:bg-white/70 transition-all"
          >
            <div className="h-32 overflow-hidden relative">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              {item.id === saleItem && (
                <div className="absolute top-2 right-2 bg-kid-red text-white text-xs font-bold py-1 px-2 rounded-full animate-pulse">
                  ON SALE!
                </div>
              )}
            </div>
            <div className="p-3 flex flex-col">
              <h3 className="font-medium">{item.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1">
                  {item.id === saleItem && (
                    <span className="line-through text-muted-foreground text-xs">
                      {item.price}
                    </span>
                  )}
                  <CoinDisplay 
                    amount={item.id === saleItem ? Math.floor(item.price * 0.8) : item.price} 
                    size="sm" 
                  />
                </div>
                <Button size="sm" variant="outline" asChild className="bg-white/50 hover:bg-white/70">
                  <Link to={`/store?item=${item.id}`}>
                    View
                  </Link>
                </Button>
              </div>
              <div className="mt-2 flex gap-1">
                <Tag className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground capitalize">{item.category}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default StorePreview;
