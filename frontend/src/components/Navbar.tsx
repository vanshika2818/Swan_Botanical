import { useState, useEffect } from 'react';
import { Menu, X, Leaf, Search, ShoppingCart, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartIcon } from './ui/CartIcon';

const Navbar = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Hooks
  const { isAuthenticated, user, logout, loading: authLoading } = useAuth();
  const { cart, cartCount, removeFromCart, cartTotal } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdowns when auth state changes
  useEffect(() => {
    setShowProfileDropdown(false);
    setShowCartDropdown(false);
  }, [isAuthenticated]);

  // Navigation items
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Ingredients', href: '/ingredients' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  // Helper functions
  const isActive = (path: string) => location.pathname === path;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearch(false);
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      setShowCartDropdown(false);
    } else {
      navigate('/checkout');
    }
  };

  if (authLoading) {
    return (
      <div className="bg-white shadow-sm sticky top-0 z-50 h-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

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
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right-side icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Icon */}
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="p-2"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Profile Icon with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="p-2 relative"
                aria-label="User profile"
              >
                <User className="h-5 w-5 text-gray-800 hover:text-emerald-600" />
                {isAuthenticated && <Zap className="absolute -top-1 left-3 h-3 w-3 text-yellow-500" />}
              </button>
              
              {showProfileDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  onMouseLeave={() => setShowProfileDropdown(false)}
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        Hello, {user?.name}
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setAuthModalMode('login');
                          setAuthModalOpen(true);
                          setShowProfileDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setAuthModalMode('register');
                          setAuthModalOpen(true);
                          setShowProfileDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart Icon with Dropdown */}
            <div className="relative">
              <CartIcon 
                itemCount={cartCount}
                onClick={() => setShowCartDropdown(!showCartDropdown)}
              />
              
              {showCartDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50"
                  onMouseLeave={() => setShowCartDropdown(false)}
                >
                  {cart.length === 0 ? (
                    <div className="px-4 py-4 text-sm text-gray-500 text-center">
                      Your cart is empty
                    </div>
                  ) : (
                    <>
                      <div className="max-h-60 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={item.id} className="px-4 py-2 border-b flex justify-between">
                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                {item.quantity} × ₹{item.price.toFixed(2)}
                              </p>
                            </div>
                            <button 
                              className="text-red-500 text-xs"
                              onClick={() => removeFromCart(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2 border-t">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Total:</span>
                          <span className="text-sm font-medium">
                            ₹{cartTotal.toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={handleCheckout}
                          className="w-full bg-emerald-600 text-white py-2 rounded text-sm font-medium hover:bg-emerald-700"
                        >
                          {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
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
                aria-label="Search products"
              />
              <button
                type="submit"
                className="bg-emerald-600 text-white px-4 py-2"
                aria-label="Submit search"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden" role="navigation" aria-label="Mobile navigation">
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
              
              {/* Mobile Cart and Profile Links */}
              <div className="px-4 py-3 border-t">
                <Link
                  to="/cart"
                  className="flex items-center text-base font-medium text-gray-700 hover:text-emerald-600"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
              </div>
              <div className="px-4 py-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center text-base font-medium text-gray-700 hover:text-emerald-600"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-5 w-5 mr-2" />
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center text-base font-medium text-gray-700 hover:text-emerald-600 mt-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setAuthModalMode('login');
                        setAuthModalOpen(true);
                        setIsOpen(false);
                      }}
                      className="flex items-center text-base font-medium text-gray-700 hover:text-emerald-600"
                    >
                      <User className="h-5 w-5 mr-2" />
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setAuthModalMode('register');
                        setAuthModalOpen(true);
                        setIsOpen(false);
                      }}
                      className="flex items-center text-base font-medium text-gray-700 hover:text-emerald-600 mt-2"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </nav>
  );
};

export default Navbar;