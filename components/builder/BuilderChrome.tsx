"use client";

import { BuilderHeader } from "./BuilderHeader";
import { BuilderProgress } from "./BuilderProgress";

type Step = "setup" | "design" | "track-options" | "extras";

interface BuilderChromeProps {
  activeStep: Step;
  children: React.ReactNode;
}

export function BuilderChrome({
  activeStep,
  children,
}: BuilderChromeProps) {
  return (
    <div className="min-h-screen bg-gc-black px-6 py-6">
      {/* Inner Canvas */}
      <div className="max-w-[1400px] mx-auto bg-gc-white">
        {/* Header */}
        <BuilderHeader />

        {/* Progress Bar */}
        <BuilderProgress activeStep={activeStep} />

        {/* Introductory Text */}
        <div className="px-8 pb-4 text-center">
          <p className="text-base text-gc-text mb-1">
            Customize your Garage Door. Purchase Online or Send Yourself a Quote.
          </p>
          <p className="text-base text-gc-text mb-4">
            FREE DIY Delivery right to your home or business
          </p>
          
          {/* Rules */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[85%] h-px bg-gc-yellow" />
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-[1100px] mx-auto py-10 md:py-14 px-4 md:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
