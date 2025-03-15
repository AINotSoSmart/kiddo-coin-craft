
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coins, BadgeDollarSign, Target, ShoppingCart, Settings } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b py-2 px-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-kid-purple flex items-center justify-center">
            <Coins className="text-white h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-kid-purple to-kid-teal bg-clip-text text-transparent">
            KidBudget
          </h1>
        </Link>
        
        <div className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center gap-2">
              <BadgeDollarSign className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/store" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Store</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/goals" className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <span>Goals</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/parent" className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span>Parent Settings</span>
            </Link>
          </Button>
        </div>
        
        <div className="flex md:hidden">
          <Button variant="outline" size="icon" className="rounded-full">
            <Coins className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
