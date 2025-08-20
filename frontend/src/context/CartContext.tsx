import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string; // Added size property
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> | CartItem) => void;
  removeFromCart: (id: string, size?: string) => void; // Updated to accept size
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  updateQuantity: (id: string, newQuantity: number, size?: string) => void; // Updated to accept size
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      } catch (error) {
        console.error('Failed to parse cart data', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity'> | CartItem) => {
    setCart(prev => {
      // Create a unique identifier for the item (id + size)
      const itemIdentifier = `${item.id}-${item.size || ''}`;
      
      const existingItemIndex = prev.findIndex(i => 
        `${i.id}-${i.size || ''}` === itemIdentifier
      );

      if (existingItemIndex > -1) {
        // Item with same ID and size exists, update quantity
        return prev.map((i, index) => 
          index === existingItemIndex 
            ? { 
                ...i, 
                quantity: i.quantity + ('quantity' in item ? item.quantity : 1) 
              } 
            : i
        );
      }
      
      // New item, add to cart
      return [...prev, { 
        ...item, 
        quantity: 'quantity' in item ? item.quantity : 1 
      }];
    });
  };

  const removeFromCart = (id: string, size?: string) => {
    setCart(prev => prev.filter(item => 
      !(item.id === id && item.size === size)
    ));
  };

  const updateQuantity = (id: string, newQuantity: number, size?: string) => {
    if (newQuantity < 1) {
      removeFromCart(id, size);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.id === id && item.size === size 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        cartCount, 
        cartTotal,
        updateQuantity 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};