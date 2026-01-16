"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart/store";
import { BuilderChrome } from "@/components/builder/BuilderChrome";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { formatFtIn } from "@/lib/builder/store";
import { Trash2 } from "lucide-react";
import { ScheduleInstallationModal } from "@/components/builder/ScheduleInstallationModal";

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotalCents = useCartStore((state) => state.subtotalCents());
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleScheduleInstallation = () => {
    setIsScheduleModalOpen(true);
  };

  const handleContinueShopping = () => {
    router.push("/door-builder/setup/select-size");
  };

  if (items.length === 0) {
    return (
      <BuilderChrome activeStep="extras">
        <div className="max-w-2xl mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold text-gc-text mb-4">Your Cart</h1>
          <p className="text-gc-gray-500 mb-8">Your cart is empty.</p>
          <Button onClick={handleContinueShopping} variant="secondary">
            Continue Shopping
          </Button>
        </div>
      </BuilderChrome>
    );
  }

  return (
    <BuilderChrome activeStep="extras">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gc-text mb-8">Your Cart</h1>

          <div className="space-y-6 mb-8">
            {items.map((item) => {
              const sizeText = `${formatFtIn(
                item.configuration.size.widthFeet,
                item.configuration.size.widthInches
              )} x ${formatFtIn(
                item.configuration.size.heightFeet,
                item.configuration.size.heightInches
              )}`;
              const lineTotalCents = item.qty * item.unitPriceCents;

              return (
                <div
                  key={item.lineItemId}
                  className="bg-gc-white border border-gc-gray-300 rounded-lg p-6"
                >
                  <div className="flex gap-6">
                    {/* Image Thumbnail */}
                    {item.imageDataUrl && (
                      <div className="w-[150px] flex-shrink-0 aspect-[8/7] border border-gc-gray-300 rounded overflow-hidden">
                        <img
                          src={item.imageDataUrl}
                          alt="Garage door preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    {/* Item Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold text-gc-text mb-4">
                            {item.name}
                          </h2>
                          
                          {/* Full Configuration Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Size */}
                            <div>
                              <div className="text-[11px] tracking-widest text-gc-gray-500 mb-1">
                                SIZE
                              </div>
                              <div className="text-sm text-gc-text font-medium">
                                {sizeText}
                              </div>
                            </div>

                            {/* Design Collection */}
                            <div>
                              <div className="text-[11px] tracking-widest text-gc-gray-500 mb-1">
                                COLLECTION
                              </div>
                              <div className="text-sm text-gc-text font-medium">
                                {item.configuration.design.collection}
                              </div>
                            </div>

                            {/* Design Style */}
                            <div>
                              <div className="text-[11px] tracking-widest text-gc-gray-500 mb-1">
                                STYLE
                              </div>
                              <div className="text-sm text-gc-text font-medium">
                                {item.configuration.design.style}
                              </div>
                            </div>

                            {/* Design Color */}
                            <div>
                              <div className="text-[11px] tracking-widest text-gc-gray-500 mb-1">
                                COLOR
                              </div>
                              <div className="text-sm text-gc-text font-medium">
                                {item.configuration.design.color}
                              </div>
                            </div>

                            {/* Track Springs */}
                            <div>
                              <div className="text-[11px] tracking-widest text-gc-gray-500 mb-1">
                                SPRINGS
                              </div>
                              <div className="text-sm text-gc-text font-medium">
                                {item.configuration.track.springType}
                              </div>
                            </div>

                            {/* Track Lift */}
                            <div>
                              <div className="text-[11px] tracking-widest text-gc-gray-500 mb-1">
                                LIFT
                              </div>
                              <div className="text-sm text-gc-text font-medium">
                                {item.configuration.track.liftType}
                              </div>
                            </div>

                            {/* Track Wind Load */}
                            <div>
                              <div className="text-[11px] tracking-widest text-gc-gray-500 mb-1">
                                WIND LOAD
                              </div>
                              <div className="text-sm text-gc-text font-medium">
                                {item.configuration.track.windLoad}
                              </div>
                            </div>

                            {/* Extras Windows */}
                            <div>
                              <div className="text-[11px] tracking-widest text-gc-gray-500 mb-1">
                                WINDOWS
                              </div>
                              <div className="text-sm text-gc-text font-medium">
                                {item.configuration.extras.windows}
                              </div>
                            </div>

                            {/* Extras Insulation */}
                            <div>
                              <div className="text-[11px] tracking-widest text-gc-gray-500 mb-1">
                                INSULATION
                              </div>
                              <div className="text-sm text-gc-text font-medium">
                                {item.configuration.extras.insulation}
                              </div>
                            </div>

                            {/* Extras Hardware */}
                            <div>
                              <div className="text-[11px] tracking-widest text-gc-gray-500 mb-1">
                                HARDWARE
                              </div>
                              <div className="text-sm text-gc-text font-medium">
                                {item.configuration.extras.hardware}
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.lineItemId)}
                          className="text-gc-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-4"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor={`qty-${item.lineItemId}`}
                            className="text-sm text-gc-gray-500"
                          >
                            Quantity:
                          </label>
                          <Select
                            id={`qty-${item.lineItemId}`}
                            value={item.qty}
                            onChange={(e) =>
                              updateQty(item.lineItemId, Number(e.target.value))
                            }
                            className="w-20"
                          >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((qty) => (
                              <option key={qty} value={qty}>
                                {qty}
                              </option>
                            ))}
                          </Select>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gc-gray-500">
                            {formatCurrency(item.unitPriceCents)} each
                          </p>
                          <p className="text-lg font-semibold text-gc-text">
                            {formatCurrency(lineTotalCents)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtotal and Actions */}
          <div className="bg-gc-white border border-gc-gray-300 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-gc-text">Subtotal</span>
              <span className="text-2xl font-bold text-gc-text">
                {formatCurrency(subtotalCents)}
              </span>
            </div>
            <div className="text-sm text-gc-gray-500 leading-5 mb-6 space-y-3">
              <p>
                After scheduling an installation, check your email for a confirmation of your appointment (if it doesn't arrive to your inbox, check your spam folder).
              </p>
              <p>
                A technician will come to your home to collect a deposit, finalize measurements, and schedule the installation based on your order. If you have any immediate questions, please call +1 (871) 256-0122 or send an email to deno@garagecowboy.com
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleScheduleInstallation} className="flex-1">
                Schedule Installation
              </Button>
              <Button
                variant="secondary"
                onClick={handleContinueShopping}
                className="flex-1"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>

        {/* Schedule Installation Modal */}
        {items.length > 0 && (
          <ScheduleInstallationModal
            open={isScheduleModalOpen}
            onOpenChange={setIsScheduleModalOpen}
            cartItem={items[0]}
          />
        )}
      </BuilderChrome>
    );
}
