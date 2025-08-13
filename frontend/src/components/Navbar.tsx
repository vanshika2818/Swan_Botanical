import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Leaf, Search, ShoppingCart, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Ingredients", href: "/ingredients" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearch(false);
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            aria-label="Swan Botanicals Home"
          >
            <Leaf className="h-8 w-8 text-emerald-600" aria-hidden="true" />
            <span className="font-bold text-xl text-gray-900">
              Swan Botanicals
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right-side icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Icon */}
            <button onClick={() => setShowSearch(!showSearch)}>
              <Search className="h-6 w-6" />
            </button>

            {/* Lightning User Icon */}
            <div className="relative">
              <User className="h-5 w-5 text-gray-800 hover:text-emerald-600" />
              <Zap className="absolute -top-1 left-3 h-3 w-3 text-yellow-500" />
            </div>

            {/* Cart Icon with Badge */}
            <div className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-800 hover:text-emerald-600 cursor-pointer" />
              <span className="absolute -top-1 -right-2 bg-orange-500 text-white text-xs font-semibold rounded-full px-1.5">
                0
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isOpen}
              className="min-h-[44px] min-w-[44px] p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Search Bar (shows when search icon clicked) */}
        {showSearch && (
          <div className="border-t py-3">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center max-w-md mx-auto border rounded overflow-hidden"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-3 py-2 outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-600 text-white px-4 py-2"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className="md:hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 text-base font-medium transition-colors duration-200 min-h-[44px] ${
                    isActive(item.href)
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
