"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, ClipboardList, LayoutDashboard, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/vehicles", label: "車両一覧", icon: Car },
  { href: "/vehicles/new", label: "車検証読取・新規登録", icon: ScanLine },
  { href: "/appraisal", label: "査定一覧", icon: ClipboardList },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 flex h-14 items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <Car className="h-4 w-4 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            買取査定システム
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
