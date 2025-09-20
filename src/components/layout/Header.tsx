import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Consultation Listing", path: "/consultation-listing" },
    { label: "Document Details", path: "/document-details" },
    { label: "Demo", path: "/demo" },
  ];

  return (
    <header className="bg-background border-b">
      {/* Top header with logo and search */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gov-blue rounded-md flex items-center justify-center">
              <div className="text-white font-bold text-xs">GOI</div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gov-blue">MINISTRY OF</h1>
              <h1 className="text-xl font-bold text-gov-blue">CORPORATE AFFAIRS</h1>
              <p className="text-xs text-muted-foreground mt-1">GOVERNMENT OF INDIA</p>
            </div>
          </div>
          
          <div className="text-right">
            <h2 className="text-lg font-semibold text-foreground">EMPOWERING BUSINESS, PROTECTING INVESTORS</h2>
            <div className="flex space-x-2 text-xs mt-1">
              <span className="text-gov-orange">REGULATOR</span>
              <span>•</span>
              <span className="text-gov-green">INTEGRATOR</span>
              <span>•</span>
              <span className="text-gov-red">FACILITATOR</span>
              <span>•</span>
              <span className="text-gov-blue">EDUCATOR</span>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-10 w-64" 
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-gov-blue-dark">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-0">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 text-white text-sm transition-colors ${
                      isActive(item.path)
                        ? "bg-gov-blue font-medium"
                        : "hover:bg-gov-blue"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="#"
                  className="block px-4 py-3 text-white hover:bg-gov-blue text-sm"
                >
                  About MCA
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block px-4 py-3 text-white hover:bg-gov-blue text-sm"
                >
                  Acts & Rules
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block px-4 py-3 text-white hover:bg-gov-blue text-sm"
                >
                  Help & FAQs
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-gov-blue"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gov-blue mt-2 pt-2">
              <ul className="space-y-1">
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`block px-4 py-2 text-white text-sm transition-colors ${
                        isActive(item.path)
                          ? "bg-gov-blue font-medium"
                          : "hover:bg-gov-blue"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-white hover:bg-gov-blue text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About MCA
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-white hover:bg-gov-blue text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Acts & Rules
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-white hover:bg-gov-blue text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Help & FAQs
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};