import { useState, useEffect } from "react";
import type { CartItem } from "@/shared/types";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSessionId = localStorage.getItem("sessionId");
    if (storedSessionId) {
      setSessionId(storedSessionId);
      fetchCart(storedSessionId);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCart = async (sid: string) => {
    try {
      const response = await fetch("/api/cart", {
        headers: { "X-Session-Id": sid },
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (
    productId: number,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Id": sessionId,
        },
        body: JSON.stringify({ productId, quantity, size, color }),
      });

      const data = await response.json();
      const newSessionId = response.headers.get("X-Session-Id") || sessionId;

      if (newSessionId && newSessionId !== sessionId) {
        setSessionId(newSessionId);
        localStorage.setItem("sessionId", newSessionId);
      }

      if (data.success) {
        await fetchCart(newSessionId || sessionId);
      }

      return data;
    } catch (error) {
      console.error("Failed to add to cart:", error);
      return { success: false };
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
        headers: { "X-Session-Id": sessionId },
      });

      const data = await response.json();
      if (data.success) {
        await fetchCart(sessionId);
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Id": sessionId,
        },
        body: JSON.stringify({ quantity }),
      });

      const data = await response.json();
      if (data.success) {
        await fetchCart(sessionId);
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    sessionId,
  };
}
