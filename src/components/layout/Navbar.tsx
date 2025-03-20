
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BadgeDollarSign, Target, ShoppingCart, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedLogo from "@/components/shared/AnimatedLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Define the nav items
  const navItems = [
    { icon: BadgeDollarSign, title: "Dashboard", path: "/" },
    { icon: ShoppingCart, title: "Store", path: "/store" },
    { icon: Target, title: "Goals", path: "/goals" },
    { icon: Settings, title: "Parent Settings", path: "/parent" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b-2 border-black border-dashed py-2 px-4 relative">
      <div className="container flex justify-between items-center relative z-20">
        <AnimatedLogo />
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button 
              key={item.path}
              variant="ghost" 
              asChild 
              className={location.pathname === item.path ? "bg-[#FEF7CD]/50" : ""}
            >
              <Link to={item.path} className="flex items-center gap-2">
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            </Button>
          ))}
        </div>
        
        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMenu}
            className="rounded-full border-2 border-black border-dashed before:rounded-full"
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
            "fixed inset-0 top-[60px] bg-white shadow-xl transition-all duration-300 ease-in-out md:hidden z-40 border-t-2 border-black border-dashed transform",
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          )}
        >
          {/* Menu Content */}
          <div className="h-[calc(100vh-60px)] flex flex-col items-center justify-start py-8 bg-white overflow-y-auto">
            <div className="flex flex-col items-center space-y-4 w-full px-6">
              {navItems.map((item, index) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`flex items-center gap-3 text-xl [font-family:'Comic_Sans_MS',cursive] hover:text-kid-teal transition-colors w-full justify-center py-4 ${
                    location.pathname === item.path 
                      ? "bg-[#FEF7CD] border-2 border-black border-dashed rounded-lg" 
                      : "bg-white/90 border-2 border-black border-dashed rounded-lg"
                  } transform transition-all duration-300 before:content-[''] before:absolute before:w-full before:h-full before:bg-black/20 before:rounded-lg before:-z-10 before:translate-x-[5px] before:translate-y-[5px]`}
                  onClick={toggleMenu}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className="h-6 w-6" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
