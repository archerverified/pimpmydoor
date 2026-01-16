"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart/store";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function CheckoutPage() {
  const subtotalCents = useCartStore((state) => state.subtotalCents());
  const items = useCartStore((state) => state.items);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gc-black px-6 py-6">
        <div className="max-w-[1400px] mx-auto bg-gc-white">
          <div className="max-w-2xl mx-auto py-20 px-8 text-center">
            <h1 className="text-2xl font-bold text-gc-text mb-4">Checkout</h1>
            <p className="text-gc-gray-500 mb-8">Your cart is empty.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gc-black px-6 py-6">
      <div className="max-w-[1400px] mx-auto bg-gc-white">
        <div className="max-w-4xl mx-auto py-10 md:py-14 px-4 md:px-10">
          <h1 className="text-2xl font-bold text-gc-text mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping Information Form */}
            <div className="bg-gc-white border border-gc-gray-300 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gc-text mb-6">
                Shipping Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs text-gc-gray-500 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs text-gc-gray-500 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs text-gc-gray-500 mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="street"
                    className="block text-xs text-gc-gray-500 mb-2"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-xs text-gc-gray-500 mb-2"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-xs text-gc-gray-500 mb-2"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="zip"
                    className="block text-xs text-gc-gray-500 mb-2"
                  >
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gc-white border border-gc-gray-300 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gc-text mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-gc-gray-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotalCents)}</span>
                </div>
                <div className="h-px bg-gc-gray-300" />
                <div className="flex justify-between text-lg font-semibold text-gc-text">
                  <span>Total</span>
                  <span>{formatCurrency(subtotalCents)}</span>
                </div>
              </div>

              <Button disabled className="w-full mb-4">
                Pay
              </Button>
              <p className="text-xs text-gc-gray-500 text-center">
                Payments coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
