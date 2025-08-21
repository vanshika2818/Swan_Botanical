// src/components/WishlistButton.tsx
import { useEffect, useState } from "react";
import { toggleWishlist, fetchWishlist } from "@/services/wishlist";
import { FaHeart } from "react-icons/fa";

type Props = { productId: string; size?: number };

const WishlistButton: React.FC<Props> = ({ productId, size = 20 }) => {
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchWishlist()
      .then((items) => {
        if (!mounted) return;
        setLiked(items.some((p: any) => p._id === productId));
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [productId]);

  const onToggle = async () => {
    try {
      setBusy(true);
      const list = await toggleWishlist(productId);
      setLiked(list.some((p: any) => p._id === productId));
    } catch (e: any) {
      // If 401, prompt login
      if (e?.response?.status === 401) {
        // Open your auth modal if you have one:
        // showAuthModal();
        alert("Please login to use wishlist.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={onToggle}
      disabled={busy}
      aria-pressed={liked}
      className="inline-flex items-center justify-center rounded-lg border px-2 py-1"
      title={liked ? "Remove from wishlist" : "Add to wishlist"}
    >
      <FaHeart size={size} color={liked ? "red" : "gray"} />
    </button>
  );
};

export default WishlistButton;
