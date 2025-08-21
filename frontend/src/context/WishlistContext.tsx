import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Product = {
  id: string;
  _id: string;
  name: string;
  image?: string;
  price?: number;
};

type WishlistContextType = {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      if (exists) {
        return prev.filter((item) => item._id !== product._id);
      }
      return [...prev, product];
    });
  };
  
const addToWishlist = (product: Product) => {
  setWishlist((prev) => [...prev, product]);
};

const removeFromWishlist = (productId: string) => {
  setWishlist((prev) => prev.filter((p) => p.id !== productId));
};


  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist,removeFromWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
