import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();

  const handlePlaceOrder = () => {
    // Process order logic here
    clearCart();
    alert('Order placed successfully!');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total:</span>
              <span>
                ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
              </span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-emerald-600 text-white py-3 rounded hover:bg-emerald-700"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;