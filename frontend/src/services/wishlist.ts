// src/services/wishlist.ts
import http from "./http";

export async function fetchWishlist() {
  const { data } = await http.get("/wishlist");
  return data as any[]; // array of Product
}

export async function toggleWishlist(productId: string) {
  const { data } = await http.post("/wishlist/toggle", { productId });
  return data.wishlist as any[];
}

export async function removeFromWishlist(productId: string) {
  const { data } = await http.delete(`/wishlist/${productId}`);
  return data.wishlist as any[];
}
