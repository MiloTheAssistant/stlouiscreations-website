"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity?: number }
  | { type: "REMOVE_ITEM"; slug: string }
  | { type: "UPDATE_QTY"; slug: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] };

interface CartContextType {
  items: CartItem[];
  total: number;
  count: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQty: (slug: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.product.slug === action.product.slug
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.slug === action.product.slug
              ? { ...item, quantity: item.quantity + (action.quantity || 1) }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, quantity: action.quantity || 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.product.slug !== action.slug),
      };
    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return {
          items: state.items.filter((item) => item.product.slug !== action.slug),
        };
      }
      return {
        items: state.items.map((item) =>
          item.product.slug === action.slug
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    case "LOAD_CART":
      return { items: action.items };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("stlc-cart");
      if (saved) {
        dispatch({ type: "LOAD_CART", items: JSON.parse(saved) });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("stlc-cart", JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const total = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const count = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    items: state.items,
    total,
    count,
    addItem: (product, quantity) =>
      dispatch({ type: "ADD_ITEM", product, quantity }),
    removeItem: (slug) => dispatch({ type: "REMOVE_ITEM", slug }),
    updateQty: (slug, quantity) =>
      dispatch({ type: "UPDATE_QTY", slug, quantity }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
