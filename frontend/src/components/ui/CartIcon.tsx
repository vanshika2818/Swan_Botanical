// In your CartIcon.tsx or wherever the component is defined
import { ShoppingCart } from 'lucide-react';

interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

export const CartIcon = ({ itemCount, onClick }: CartIconProps) => {
  return (
    <button 
      onClick={onClick}
      className="p-2 relative"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
};