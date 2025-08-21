import { useState, useEffect } from 'react';
import { Menu, X, Leaf, Search, ShoppingCart, User, Heart, Zap } from 'lucide-react'; // Added Zap icon
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartIcon } from './ui/CartIcon';
import { useWishlist } from '../context/WishlistContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const { isAuthenticated, user, logout, loading: authLoading } = useAuth();
  const { cart, cartCount, removeFromCart, cartTotal } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setShowProfileDropdown(false);
    setShowCartDropdown(false);
    setShowWishlistDropdown(false);
  }, [isAuthenticated]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Ingredients', href: '/ingredients' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

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

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
    } else {
      setShowWishlistDropdown(true);
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
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-emerald-600" />
            <span className="font-bold text-xl text-gray-900">Swan Botanicals</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium ${
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
            

            {/* Wishlist Icon */}
            <div className="relative">
              <button 
                onClick={handleWishlistClick} 
                className="p-2 relative"
              >
                <Heart className="h-5 w-5 text-gray-800 hover:text-emerald-600" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>

            {/* Profile Dropdown with Thunder Icon */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)} 
                className="p-2 flex items-center"
              >
                <User className="h-5 w-5 text-gray-800 hover:text-emerald-600" />
                {/* Thunder icon for logged-in users */}
                {isAuthenticated && (
                  <Zap className="h-4 w-4 ml-1 text-amber-500 fill-amber-500" />
                )}
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-700 border-b flex items-center">
                        <Zap className="h-4 w-4 mr-1 text-amber-500 fill-amber-500" />
                        Hello, {user?.name || 'User'}
                      </div>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => logout()}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setAuthModalMode('login');
                        setAuthModalOpen(true);
                        setShowProfileDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Login
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <CartIcon itemCount={cartCount} onClick={() => setShowCartDropdown(!showCartDropdown)} />
              {showCartDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50">
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
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2 border-t">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Total:</span>
                          <span className="text-sm font-medium">₹{cartTotal.toFixed(2)}</span>
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
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium ${
                    isActive(item.href)
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <div className="text-sm font-medium text-gray-500">
                    {isAuthenticated ? (
                      <span className="flex items-center">
                        <Zap className="h-4 w-4 mr-1 text-amber-500 fill-amber-500" />
                        Hello, {user?.name || 'User'}
                      </span>
                    ) : (
                      'Welcome'
                    )}
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        Wishlist
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setAuthModalMode('login');
                        setAuthModalOpen(true);
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md"
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        
      </div>

      {/* Wishlist Dialog */}
      <Dialog open={showWishlistDropdown} onOpenChange={setShowWishlistDropdown}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>My Wishlist</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your wishlist is empty</p>
                <Button className="mt-4" onClick={() => setShowWishlistDropdown(false)}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {wishlist.map((item) => (
                  <div key={item._id} className="flex items-center border rounded-lg p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">₹{item.price}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromWishlist(item._id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 border-t">
                  <Button asChild>
                    <Link to="/wishlist" onClick={() => setShowWishlistDropdown(false)}>
                      View Full Wishlist
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => setShowWishlistDropdown(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

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