import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center py-4 border-b">
                <div className="flex items-center gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-16 w-16 object-cover rounded" 
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-6">
              <span className="font-bold">Total:</span>
              <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between gap-4">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="flex-1"
              >
                Clear Cart
              </Button>
              <Link to="/checkout" className="flex-1">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage; 