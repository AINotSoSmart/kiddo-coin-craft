
import { useBudget } from "@/context/BudgetContext";
import { Gift, Tag, PawPrint, Sparkles } from "lucide-react";

const StoreCategories = () => {
  const { storeItems } = useBudget();
  
  // Count items in each category
  const categoryCounts = storeItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = 0;
    acc[item.category]++;
    return acc;
  }, {} as Record<string, number>);
  
  const categories = [
    { 
      id: 'toy', 
      name: 'Toys', 
      icon: Gift, 
      color: 'bg-kid-pink text-white',
      count: categoryCounts['toy'] || 0
    },
    { 
      id: 'accessory', 
      name: 'Accessories', 
      icon: Tag, 
      color: 'bg-kid-blue/50 text-white',
      count: categoryCounts['accessory'] || 0
    },
    { 
      id: 'pet', 
      name: 'Pets', 
      icon: PawPrint, 
      color: 'bg-kid-teal text-white',
      count: categoryCounts['pet'] || 0
    },
    { 
      id: 'upgrade', 
      name: 'Upgrades', 
      icon: Sparkles, 
      color: 'bg-kid-purple text-white',
      count: categoryCounts['upgrade'] || 0
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {categories.map((category) => (
        <div 
          key={category.id}
          className="glass-card rounded-xl overflow-hidden transition-all group cursor-pointer"
        >
          <div className={`p-4 flex flex-col items-center ${category.color}`}>
            <category.icon className="h-6 w-6 mb-1 group-hover:animate-bounce" />
            <h3 className="font-medium text-sm">{category.name}</h3>
          </div>
          <div className="p-2 text-center bg-white/50">
            <span className="text-xs font-medium">{category.count} items</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreCategories;
