import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice: number;
  category: string;
  subcategory: string;
  expiryDate: string;
  imageUrl: string;
  safetyTag: string;
  storeName: string;
  distance: number;
}

const SubcategoryProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  useEffect(() => {
    if (category && subcategory) {
      axios
        .get<Product[]>(`https://swan-botanical.onrender.com/api/products/subcategory-products`, {
          params: { category, subcategory }
        })
        .then((res) => setProducts(res.data))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [category, subcategory]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(
                ((product.price - product.discountPrice) / product.price) * 100
              )}
              % OFF
            </span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-gray-500">
              {product.storeName} • {product.distance} km
            </p>
            <div className="flex items-center mt-2">
              <span className="text-lg font-semibold text-green-600">
                ₹{product.discountPrice}
              </span>
              <span className="text-sm text-gray-400 line-through ml-2">
                ₹{product.price}
              </span>
            </div>
            <div className="mt-2">
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  product.safetyTag === "sealed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {product.safetyTag}
              </span>
            </div>
            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubcategoryProducts;
