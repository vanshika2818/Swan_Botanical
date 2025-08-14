import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
}

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  useEffect(() => {
    if (searchQuery) {
      fetch(`https://swan-botanical.onrender.com/api/products/search?query=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    }
  }, [searchQuery]);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Search Results for "{searchQuery}"</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border p-2 rounded">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
            <h3 className="font-semibold">{p.name}</h3>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
