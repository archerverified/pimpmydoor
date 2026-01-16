"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";

interface ContactEmbedProps {
  orderPayload: {
    configuration: any;
    unitPriceCents: number;
  };
  onSuccess: () => void;
}

export function ContactEmbed({ orderPayload, onSuccess }: ContactEmbedProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    preferredDateTime: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: In the future, this will submit to GarageCowboy contact form embed
    // For now, just call onSuccess to transition to success state
    onSuccess();
  };

  return (
    <div>
      {/* Placeholder embed container */}
      <div id="gc-contact-embed" className="mb-6">
        {/* Contact form embed goes here */}
      </div>

      {/* Temporary fallback form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs text-gc-gray-500 mb-2"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs text-gc-gray-500 mb-2"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-xs text-gc-gray-500 mb-2"
          >
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-xs text-gc-gray-500 mb-2"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-xs text-gc-gray-500 mb-2"
            >
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
            />
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-xs text-gc-gray-500 mb-2"
            >
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="zip" className="block text-xs text-gc-gray-500 mb-2">
            ZIP Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
            required
            className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
          />
        </div>

        <div>
          <label
            htmlFor="preferredDateTime"
            className="block text-xs text-gc-gray-500 mb-2"
          >
            Preferred Appointment Date/Time
          </label>
          <input
            type="datetime-local"
            id="preferredDateTime"
            name="preferredDateTime"
            value={formData.preferredDateTime}
            onChange={handleInputChange}
            className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
          />
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-xs text-gc-gray-500 mb-2"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full bg-gc-white border border-gc-gray-300 px-3 py-2 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50 resize-none"
          />
        </div>

        {/* Hidden fields for order payload (for future integration) */}
        <input
          type="hidden"
          name="orderPayload"
          value={JSON.stringify(orderPayload)}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
