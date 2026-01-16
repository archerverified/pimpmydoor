"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { ScheduleInstallationBookingForm } from "@/components/booking/ScheduleInstallationBookingForm";
import { Button } from "@/components/ui/Button";
import type { CartItem } from "@/lib/cart/types";


interface ScheduleInstallationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItem: CartItem;
}

export function ScheduleInstallationModal({
  open,
  onOpenChange,
  cartItem,
}: ScheduleInstallationModalProps) {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const orderPayload = {
    configuration: cartItem.configuration,
    configurationId: cartItem.configurationId,
    lineItemId: cartItem.lineItemId,
    unitPriceCents: cartItem.unitPriceCents,
    totalCents: cartItem.qty * cartItem.unitPriceCents,
  };

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const handleDone = () => {
    onOpenChange(false);
  };

  const handleEditSelections = () => {
    onOpenChange(false);
    router.push("/door-builder/setup/select-size");
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Schedule Installation">
      {isSuccess ? (
        // Success State
        <div>
          <p className="text-base text-gc-text mb-8">
            Check your email for a confirmation of your appointment. A technician
            will come to your home to collect a deposit, finalize measurements, and
            schedule the installation based on your order.
          </p>
          {process.env.NODE_ENV !== "production" && (
            <p className="text-xs text-gc-gray-500 mb-8">
              Dev mode: email confirmation is not yet enabled.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleDone} className="flex-1">
              Done
            </Button>
            <Button
              variant="secondary"
              onClick={handleEditSelections}
              className="flex-1"
            >
              Edit Selections
            </Button>
          </div>
        </div>
      ) : (
        // Form State
        <ScheduleInstallationBookingForm
          orderPayload={orderPayload}
          onSuccess={handleSuccess}
        />
      )}
    </Modal>
  );
}
