// src/pages/WishlistPage.tsx
import { useEffect, useState } from "react";
import { fetchWishlist, removeFromWishlist } from "@/services/wishlist";
import { Link } from "react-router-dom";

type Product = {
  _id: string;
  name: string;
  imageUrl?: string;
  price?: number;
  discount?: number;
};

export default function WishlistPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchWishlist();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleRemove = async (id: string) => {
    const data = await removeFromWishlist(id);
    setItems(data as Product[]);
  };

  if (loading) return <div className="p-6">Loading wishlist…</div>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">My Wishlist</h1>
      {items.length === 0 ? (
        <p>No products in wishlist.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {items.map((p) => (
            <div key={p._id} className="rounded-xl border p-3">
              <Link to={`/products/${p._id}`} className="block">
                <img
                  src={p.imageUrl || "/placeholder.png"}
                  alt={p.name}
                  className="h-40 w-full rounded-lg object-cover"
                />
                <div className="mt-2">
                  <div className="font-medium">{p.name}</div>
                  {typeof p.price === "number" && (
                    <div className="text-sm">₹{p.price}</div>
                  )}
                  {!!p.discount && <div className="text-xs text-green-600">{p.discount}% OFF</div>}
                </div>
              </Link>
              <button
                onClick={() => handleRemove(p._id)}
                className="mt-3 w-full rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
