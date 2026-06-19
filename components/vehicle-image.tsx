"use client";

import { cn } from "@/lib/utils";
import { Car, AlertTriangle } from "lucide-react";

type Props = {
  src?: string;
  alt: string;
  hasRepairHistory?: boolean;
  variant?: "thumbnail" | "hero" | "card";
};

export function VehicleImage({ src, alt, hasRepairHistory, variant = "thumbnail" }: Props) {
  if (variant === "thumbnail") {
    return (
      <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div className={cn(
            "absolute inset-0 flex items-center justify-center",
            hasRepairHistory ? "bg-red-50" : "bg-gray-100"
          )}>
            {hasRepairHistory
              ? <AlertTriangle className="h-5 w-5 text-red-400" />
              : <Car className="h-5 w-5 text-gray-300" />}
          </div>
        )}
        {hasRepairHistory && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-600/80 py-0.5 text-center">
            <span className="text-[9px] font-bold text-white tracking-wider">修復歴</span>
          </div>
        )}
      </div>
    );
  }

  if (variant === "hero") {
    if (!src) return null;
    return (
      <div className="rounded-xl overflow-hidden bg-gray-100 shadow-sm ring-1 ring-black/[0.07]">
        <div className="relative w-full" style={{ aspectRatio: "16/7" }}>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              const wrap = e.currentTarget.closest("[data-vehicle-hero]") as HTMLElement | null;
              if (wrap) wrap.style.display = "none";
            }}
            data-vehicle-hero-img
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>
    );
  }

  // variant === "card"
  if (!src) return null;
  return (
    <div className="relative h-28 overflow-hidden bg-gray-100">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          const wrap = e.currentTarget.closest("[data-vehicle-card]") as HTMLElement | null;
          if (wrap) wrap.style.display = "none";
        }}
        data-vehicle-card-img
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
