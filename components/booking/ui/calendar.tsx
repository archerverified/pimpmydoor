"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "./utils";
import "react-day-picker/dist/style.css";

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      classNames={{
        months: "flex flex-col gap-2",
        month: "space-y-2",
        caption: "relative flex items-center justify-center py-1",
        caption_label: "text-sm font-semibold text-gc-text",
        nav: "absolute inset-y-0 left-0 right-0 flex items-center justify-between px-1",
        nav_button:
          "h-8 w-8 rounded-md border border-gc-gray-300 bg-gc-white text-gc-text hover:bg-gc-bg",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell:
          "w-9 text-center text-[11px] font-semibold text-gc-gray-500",
        row: "mt-1 flex w-full",
        cell: "relative w-9 h-9 text-center",
        day: cn(
          "h-9 w-9 rounded-md text-sm text-gc-text hover:bg-gc-bg",
          "focus:outline-none focus:ring-2 focus:ring-gc-yellow/50"
        ),
        day_selected:
          "bg-gc-yellow text-gc-white hover:bg-gc-yellow",
        day_today:
          "border border-gc-yellow",
        day_outside:
          "text-gc-gray-300 opacity-60",
        day_disabled:
          "text-gc-gray-300 opacity-40",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...p }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...p} />
        ),
        IconRight: ({ className, ...p }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...p} />
        ),
      }}
      {...props}
    />
  );
}
