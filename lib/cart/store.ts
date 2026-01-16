"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./types";

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "createdAt">) => void;
  updateQty: (lineItemId: string, qty: number) => void;
  removeItem: (lineItemId: string) => void;
  clear: () => void;
  subtotalCents: () => number;
  itemCount: () => number;
}

const STORAGE_KEY = "pimpmydoor_cart_v1";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        // Always append new item (multi-item cart)
        const newItem: CartItem = {
          ...item,
          createdAt: Date.now(),
        };
        set((state) => ({
          items: [...state.items, newItem],
        }));
      },

      updateQty: (lineItemId, qty) => {
        if (qty <= 0) {
          get().removeItem(lineItemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.lineItemId === lineItemId ? { ...item, qty } : item
          ),
        }));
      },

      removeItem: (lineItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.lineItemId !== lineItemId),
        }));
      },

      clear: () => {
        set({ items: [] });
      },

      subtotalCents: () => {
        return get().items.reduce(
          (sum, item) => sum + item.qty * item.unitPriceCents,
          0
        );
      },

      itemCount: () => {
        return get().items.reduce((sum, item) => sum + item.qty, 0);
      },
    }),
    {
      name: STORAGE_KEY,
      // Safe hydration with validation
      storage: {
        getItem: (name) => {
          try {
            const str = localStorage.getItem(name);
            if (!str) return null;
            const parsed = JSON.parse(str);
            // Validate shape: must have items array with lineItemId and configurationId
            if (parsed && Array.isArray(parsed.state?.items)) {
              // Validate each item has required fields
              const isValid = parsed.state.items.every(
                (item: unknown) => 
                  item !== null &&
                  typeof item === "object" &&
                  "lineItemId" in item &&
                  "configurationId" in item &&
                  typeof (item as { lineItemId: unknown }).lineItemId === "string" &&
                  typeof (item as { configurationId: unknown }).configurationId === "string"
              );
              if (isValid) {
                return parsed;
              }
            }
            return null;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch {
            // Ignore storage errors
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch {
            // Ignore storage errors
          }
        },
      },
    }
  )
);
