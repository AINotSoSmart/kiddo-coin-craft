import { useState } from "react";
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
import { Tag, ShoppingBag, Gift, Scissors } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Store = () => {
  const { storeItems, balance, purchaseItem, isItemOwned } = useBudget();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState(
    storeItems.find((item) => item.id === searchParams.get("item")) || null
  );

  const closeItemDialog = () => {
    setSelectedItem(null);
    searchParams.delete("item");
    setSearchParams(searchParams);
  };

  const handlePurchase = () => {
    if (selectedItem) {
      const success = purchaseItem(selectedItem.id);
      if (success) {
        // Keep dialog open to show ownership status
      }
    }
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Store</h1>
          <p className="text-muted-foreground">
            Spend your coins on exciting items!
          </p>
          <div className="flex justify-center mt-2">
            <div className="bg-muted px-4 py-2 rounded-full flex items-center gap-2">
              <span>Your Balance:</span>
              <CoinDisplay amount={balance} size="md" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
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
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Pets</span>
            </TabsTrigger>
            <TabsTrigger value="upgrade" className="flex items-center gap-1">
              <Scissors className="h-4 w-4" />
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

      <Dialog open={!!selectedItem} onOpenChange={() => closeItemDialog()}>
        {selectedItem && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedItem.name}</DialogTitle>
              <DialogDescription>
                {selectedItem.description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center p-4">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                className="max-h-64 object-contain rounded-md"
              />
            </div>
            <div className="flex justify-between items-center px-4">
              <CoinDisplay amount={selectedItem.price} size="lg" />
              <div>
                {isItemOwned(selectedItem.id) ? (
                  <Button variant="outline" disabled>
                    Owned
                  </Button>
                ) : balance < selectedItem.price ? (
                  <Button variant="outline" disabled>
                    Not Enough Coins
                  </Button>
                ) : (
                  <Button onClick={handlePurchase}>Buy Now</Button>
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
  onSelect,
}: {
  item: any;
  owned: boolean;
  onSelect: () => void;
}) => {
  return (
    <Card
      className={`overflow-hidden hover:shadow-md transition-shadow ${
        owned ? "border-kid-teal" : ""
      }`}
    >
      <div className="h-40 overflow-hidden relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {owned && (
          <div className="absolute top-2 right-2 bg-kid-teal text-white px-2 py-1 rounded-full text-xs font-medium">
            Owned
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
        <CoinDisplay amount={item.price} size="md" />
        <Button size="sm" onClick={onSelect}>
          {owned ? "View" : "Buy"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Store;
