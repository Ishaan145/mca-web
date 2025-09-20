import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

/**
 * A clean and refactored header component for the E-Consultation portal.
 * This version includes the Saaransh logo and an external link for government officials.
 */
export const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Checks if the given path is the current active page to apply active styles.
  const isActive = (path: string) => location.pathname === path;

  // A single, consolidated list of navigation items.
  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Consultation Listing", path: "/consultation-listing" },
    { 
      label: "Gov Officials Employportal", 
      path: "https://ishaan145.github.io/Saaransh/", 
      isExternal: true 
    },
  ];

  return (
    <header className="bg-background border-b">
      {/* Top header section with logo, ministry name, tagline, and search */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Ministry Info */}
          <div className="flex items-center space-x-4">
            {/* LOGO UPDATED HERE */}
            <img 
              src="https://raw.githubusercontent.com/Ishaan145/Saaransh/main/saaransh-app/public/logo512.png" 
              alt="Saaransh Logo" 
              className="w-16 h-16 rounded-md" 
            />
            <div>
              <h1 className="text-xl font-bold text-gov-blue">MINISTRY OF</h1>
              <h1 className="text-xl font-bold text-gov-blue">CORPORATE AFFAIRS</h1>
              <p className="text-xs text-muted-foreground mt-1">GOVERNMENT OF INDIA</p>
            </div>
          </div>
          
          {/* Right-aligned section for desktop: Tagline and Search */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-right">
              <h2 className="text-lg font-semibold text-foreground">EMPOWERING BUSINESS, PROTECTING INVESTORS</h2>
              <div className="flex space-x-2 text-xs mt-1 justify-end">
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
      </div>

      {/* Main navigation bar */}
      <nav className="bg-gov-blue-dark">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation Menu */}
            <ul className="hidden md:flex space-x-0">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  {item.isExternal ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-white text-sm transition-colors hover:bg-gov-blue"
                    >
                      {item.label}
                    </a>
                  ) : (
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
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden w-full flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gov-blue"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu (Dropdown) */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gov-blue mt-2 pt-2 pb-2">
              <ul className="space-y-1">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    {item.isExternal ? (
                       <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-white text-sm rounded-md transition-colors hover:bg-gov-blue"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        className={`block px-4 py-2 text-white text-sm rounded-md transition-colors ${
                          isActive(item.path)
                            ? "bg-gov-blue font-medium"
                            : "hover:bg-gov-blue"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
