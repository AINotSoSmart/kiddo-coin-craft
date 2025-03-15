
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useBudget } from "@/context/BudgetContext";
import CoinDisplay from "@/components/shared/CoinDisplay";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Tag, ShoppingBag, Gift, Sparkles, PawPrint } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Confetti from "@/components/shared/Confetti";
import StoreCategories from "@/components/store/StoreCategories";

const Store = () => {
  const { storeItems, balance, purchaseItem, isItemOwned } = useBudget();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState(
    storeItems.find((item) => item.id === searchParams.get("item")) || null
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [itemOnSale, setItemOnSale] = useState<string | null>(null);

  useEffect(() => {
    // Simulate a random item being on sale
    const randomItemIndex = Math.floor(Math.random() * storeItems.length);
    setItemOnSale(storeItems[randomItemIndex]?.id || null);
  }, [storeItems]);

  const closeItemDialog = () => {
    setSelectedItem(null);
    searchParams.delete("item");
    setSearchParams(searchParams);
  };

  const handlePurchase = () => {
    if (selectedItem) {
      setIsPurchasing(true);
      
      // Add a slight delay for animation effect
      setTimeout(() => {
        const success = purchaseItem(selectedItem.id);
        if (success) {
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
            setIsPurchasing(false);
          }, 2000);
        } else {
          setIsPurchasing(false);
        }
      }, 500);
    }
  };

  const getDiscountedPrice = (item: any) => {
    if (item.id === itemOnSale) {
      return Math.floor(item.price * 0.8); // 20% discount
    }
    return item.price;
  };

  return (
    <Layout>
      <Confetti show={showConfetti} />
      <div className="py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-kid-pink to-kid-purple bg-clip-text text-transparent">
            Fun Shop
          </h1>
          <p className="text-muted-foreground">
            Spend your coins on exciting items!
          </p>
          <div className="flex justify-center mt-2">
            <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 animate-pulse-scale">
              <span>Your Balance:</span>
              <CoinDisplay amount={balance} size="md" animated />
            </div>
          </div>
        </div>

        <StoreCategories />

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="toy" className="flex items-center gap-1">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Toys</span>
            </TabsTrigger>
            <TabsTrigger value="accessory" className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Accessories</span>
            </TabsTrigger>
            <TabsTrigger value="pet" className="flex items-center gap-1">
              <PawPrint className="h-4 w-4" />
              <span className="hidden sm:inline">Pets</span>
            </TabsTrigger>
            <TabsTrigger value="upgrade" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Upgrades</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {storeItems.map((item) => (
                <StoreItemCard
                  key={item.id}
                  item={item}
                  owned={isItemOwned(item.id)}
                  onSale={item.id === itemOnSale}
                  discountedPrice={getDiscountedPrice(item)}
                  onSelect={() => {
                    setSelectedItem(item);
                    searchParams.set("item", item.id);
                    setSearchParams(searchParams);
                  }}
                />
              ))}
            </div>
          </TabsContent>

          {["toy", "accessory", "pet", "upgrade"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {storeItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <StoreItemCard
                      key={item.id}
                      item={item}
                      owned={isItemOwned(item.id)}
                      onSale={item.id === itemOnSale}
                      discountedPrice={getDiscountedPrice(item)}
                      onSelect={() => {
                        setSelectedItem(item);
                        searchParams.set("item", item.id);
                        setSearchParams(searchParams);
                      }}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && closeItemDialog()}>
        {selectedItem && (
          <DialogContent className="sm:max-w-md glass-card">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedItem.name}</DialogTitle>
              <DialogDescription>
                {selectedItem.description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center p-4 relative">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                className="max-h-64 object-contain rounded-md hover:scale-105 transition-transform"
              />
              {selectedItem.id === itemOnSale && (
                <div className="absolute top-2 right-2 bg-kid-red text-white text-xs font-bold py-1 px-2 rounded-full animate-pulse">
                  20% OFF!
                </div>
              )}
            </div>
            <div className="flex justify-between items-center px-4">
              <div className="flex items-center gap-2">
                {selectedItem.id === itemOnSale && (
                  <span className="line-through text-muted-foreground text-sm">
                    {selectedItem.price}
                  </span>
                )}
                <CoinDisplay 
                  amount={getDiscountedPrice(selectedItem)} 
                  size="lg" 
                  animated 
                />
              </div>
              <div>
                {isItemOwned(selectedItem.id) ? (
                  <Button variant="outline" disabled className="bg-white/50">
                    Owned
                  </Button>
                ) : balance < getDiscountedPrice(selectedItem) ? (
                  <Button variant="outline" disabled className="bg-white/50">
                    Not Enough Coins
                  </Button>
                ) : (
                  <Button 
                    onClick={handlePurchase} 
                    disabled={isPurchasing}
                    className={`bg-kid-purple hover:bg-kid-purple/90 ${isPurchasing ? 'animate-pulse' : ''}`}
                  >
                    {isPurchasing ? 'Buying...' : 'Buy Now'}
                  </Button>
                )}
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <Button variant="secondary" onClick={closeItemDialog}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </Layout>
  );
};

const StoreItemCard = ({
  item,
  owned,
  onSale,
  discountedPrice,
  onSelect,
}: {
  item: any;
  owned: boolean;
  onSale: boolean;
  discountedPrice: number;
  onSelect: () => void;
}) => {
  return (
    <Card
      className={`overflow-hidden hover:shadow-md transition-all glass-card group ${
        owned ? 'border-kid-teal/50' : ''
      }`}
    >
      <div className="h-40 overflow-hidden relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {owned && (
          <div className="absolute top-2 right-2 bg-kid-teal text-white px-2 py-1 rounded-full text-xs font-medium">
            Owned
          </div>
        )}
        {onSale && !owned && (
          <div className="absolute top-2 right-2 bg-kid-red text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
            20% OFF!
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-2 flex justify-between">
        <div className="flex items-center gap-2">
          {onSale && (
            <span className="line-through text-muted-foreground text-sm">
              {item.price}
            </span>
          )}
          <CoinDisplay amount={discountedPrice} size="md" />
        </div>
        <Button 
          size="sm" 
          onClick={onSelect}
          className={`${owned ? 'bg-kid-teal hover:bg-kid-teal/90' : 'bg-kid-purple hover:bg-kid-purple/90'}`}
        >
          {owned ? "View" : "Buy"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Store;
