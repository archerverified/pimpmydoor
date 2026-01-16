"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBuilderStore } from "@/lib/builder/store";

export function BuilderHeader() {
  const router = useRouter();
  const reset = useBuilderStore((state) => state.reset);

  const handleStartOver = () => {
    reset();
    router.push("/door-builder/setup/select-size");
  };
  return (
    <header className="flex items-start justify-between px-8 pt-6 pb-4">
      {/* Left: Branding */}
      <div className="flex flex-col">
        <p className="text-sm text-gc-gray-500 mb-1">Pimp My Garage Door by</p>
        <div className="flex items-center">
          {/* TODO: Fine-tune width/height if logo sizing needs adjustment */}
          <Image
            src="/builder/garage-cowboy-logo.png"
            alt="Garage Cowboy"
            width={260}
            height={90}
            priority
          />
        </div>
      </div>

      {/* Center: Lead Time Info */}
      <div className="flex flex-col items-center text-center">
        <p className="text-sm text-gc-text mb-1">
          Current Lead Time for Delivery of Most Door Models
        </p>
        <p className="text-lg font-bold text-gc-text mb-2">4-7 Weeks</p>
        <p className="text-sm text-gc-text mb-1">
          For any immediate questions, call us
        </p>
        <p className="text-base font-bold text-gc-text">(871) 256-0122</p>
      </div>

      {/* Right: Cart and Start Over */}
      <div className="flex flex-col items-end gap-2">
        <button
          className="w-12 h-12 bg-gc-yellow flex items-center justify-center rounded"
          aria-label="View shopping cart"
        >
          <ShoppingCart className="w-6 h-6 text-gc-black" />
        </button>
        <button
          type="button"
          onClick={handleStartOver}
          className="px-4 py-2 bg-gc-yellow text-gc-black font-semibold uppercase rounded text-sm"
          aria-label="Start over"
        >
          Start Over
        </button>
      </div>
    </header>
  );
}
