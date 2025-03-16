
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BadgeDollarSign, Target, ShoppingCart, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedLogo from "@/components/shared/AnimatedLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-sm border-b py-2 px-4 relative">
      <div className="container flex justify-between items-center relative z-20">
        <AnimatedLogo />
        
        <div className="hidden md:flex items-center space-x-1">
          <Button className="gap-2" asChild>
            <Link to="/" className="flex items-center gap-2">
              <BadgeDollarSign className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </Button>
     
          <Button className="gap-2" asChild>
            <Link to="/store" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Store</span>
            </Link>
          </Button>
          <Button className="gap-2" asChild>
            <Link to="/goals" className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <span>Goals</span>
            </Link>
          </Button>
          <Button className="gap-2" asChild>
            <Link to="/parent" className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span>Parent Settings</span>
            </Link>
          </Button>
        </div>
        
        <div className="flex md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMenu}
            className="doodle-button rounded-full border-2 border-black border-dashed"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 top-[60px] bg-white shadow-xl transition-all duration-300 ease-in-out md:hidden z-40 border-t border-gray-200 transform",
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          )}
        >
          {/* Menu Content */}
          <div className="h-[calc(100vh-60px)] flex items-center justify-center bg-white">
            <div className="flex flex-col items-center space-y-8 w-full px-6">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-xl [font-family:'Comic_Sans_MS',cursive] text-kid-purple hover:text-kid-teal transition-colors w-full justify-center py-2"
                onClick={toggleMenu}
              >
                <BadgeDollarSign className="h-6 w-6" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/store" 
                className="flex items-center gap-2 text-xl [font-family:'Comic_Sans_MS',cursive] text-kid-purple hover:text-kid-teal transition-colors w-full justify-center py-2"
                onClick={toggleMenu}
              >
                <ShoppingCart className="h-6 w-6" />
                <span>Store</span>
              </Link>
              <Link 
                to="/goals" 
                className="flex items-center gap-2 text-xl [font-family:'Comic_Sans_MS',cursive] text-kid-purple hover:text-kid-teal transition-colors w-full justify-center py-2"
                onClick={toggleMenu}
              >
                <Target className="h-6 w-6" />
                <span>Goals</span>
              </Link>
              <Link 
                to="/parent" 
                className="flex items-center gap-2 text-xl [font-family:'Comic_Sans_MS',cursive] text-kid-purple hover:text-kid-teal transition-colors w-full justify-center py-2"
                onClick={toggleMenu}
              >
                <Settings className="h-6 w-6" />
                <span>Parent Settings</span>
              </Link>
            </div>
          </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
