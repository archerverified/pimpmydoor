"use client";

import { useState, FormEvent } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/booking/ui/popover";
import { Calendar } from "@/components/booking/ui/calendar";
import { cn } from "@/components/booking/ui/utils";
import { formatFtIn } from "@/lib/builder/store";
import type { DoorConfiguration } from "@/lib/cart/types";

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

interface ScheduleInstallationBookingFormProps {
  orderPayload: {
    configuration: DoorConfiguration;
    configurationId: string;
    lineItemId: string;
    unitPriceCents: number;
    totalCents?: number;
  };
  onSuccess: () => void;
}

export function ScheduleInstallationBookingForm({
  orderPayload,
  onSuccess,
}: ScheduleInstallationBookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    preferredDate: undefined as Date | undefined,
    preferredTime: "",
    message: "",
  });

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData({
      ...formData,
      preferredDate: date,
    });
    if (date) {
      setIsDatePickerOpen(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    if (!formData.zip.trim()) {
      toast.error("Please enter your ZIP code");
      return;
    }
    if (!formData.preferredDate) {
      toast.error("Please select a preferred date");
      return;
    }
    if (!formData.preferredTime.trim()) {
      toast.error("Please select a preferred time");
      return;
    }

    // TODO: In the future, this will submit to API
    // For now, just call onSuccess to transition to success state
    onSuccess();
  };

  const sizeText = `${formatFtIn(
    orderPayload.configuration.size.widthFeet,
    orderPayload.configuration.size.widthInches
  )} x ${formatFtIn(
    orderPayload.configuration.size.heightFeet,
    orderPayload.configuration.size.heightInches
  )}`;

  return (
    <div className="space-y-6">
      {/* Compact Order Summary */}
      <div className="bg-gc-gray-50 border border-gc-gray-300 rounded-lg p-4">
        <h3 className="text-xs font-semibold text-gc-text mb-3">
          Order Summary
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-[10px] tracking-widest text-gc-gray-500 mb-1">
              PRICE
            </div>
            <div className="text-gc-text font-semibold">
              {formatCurrency(orderPayload.unitPriceCents)}
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-widest text-gc-gray-500 mb-1">
              SIZE
            </div>
            <div className="text-gc-text font-medium">{sizeText}</div>
          </div>
          <div>
            <div className="text-[10px] tracking-widest text-gc-gray-500 mb-1">
              COLLECTION
            </div>
            <div className="text-gc-text font-medium">
              {orderPayload.configuration.design.collection}
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-widest text-gc-gray-500 mb-1">
              STYLE
            </div>
            <div className="text-gc-text font-medium">
              {orderPayload.configuration.design.style}
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-widest text-gc-gray-500 mb-1">
              COLOR
            </div>
            <div className="text-gc-text font-medium">
              {orderPayload.configuration.design.color}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs text-gc-gray-500 mb-2"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gc-gray-500 mb-2">
              Preferred Date <span className="text-red-500">*</span>
            </label>
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50",
                    "flex items-center justify-between",
                    !formData.preferredDate && "text-gc-gray-400"
                  )}
                >
                  {formData.preferredDate ? (
                    format(formData.preferredDate, "PPP")
                  ) : (
                    <span>Select a date</span>
                  )}
                  <CalendarIcon className="h-4 w-4 text-gc-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.preferredDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label
              htmlFor="preferredTime"
              className="block text-xs text-gc-gray-500 mb-2"
            >
              Preferred Time <span className="text-red-500">*</span>
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleInputChange}
              required
              className="h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50"
            >
              <option value="">Select a time</option>
              <option value="08:00">8:00 AM</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="17:00">5:00 PM</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-xs text-gc-gray-500 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
            className="w-full bg-gc-white border border-gc-gray-300 px-3 py-2 text-sm text-gc-text rounded outline-none focus:ring-2 focus:ring-gc-yellow/50 resize-none"
          />
        </div>

        {/* Hidden fields for order payload */}
        <input
          type="hidden"
          name="orderPayload"
          value={JSON.stringify(orderPayload)}
        />
        <input
          type="hidden"
          name="configurationId"
          value={orderPayload.configurationId}
        />
        <input
          type="hidden"
          name="lineItemId"
          value={orderPayload.lineItemId}
        />
        <input
          type="hidden"
          name="priceCents"
          value={orderPayload.unitPriceCents}
        />

        <Button type="submit" className="w-full">
          Schedule Installation
        </Button>
      </form>
    </div>
  );
}
