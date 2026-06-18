"use client";

import Image from "next/image";
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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex h-16 items-center gap-8">
        {/* ブランドロゴ */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="REGAL MOTORS"
            width={220}
            height={48}
            style={{ height: "44px", width: "auto" }}
            className="object-contain"
            priority
          />
        </Link>

        {/* ナビゲーション */}
        <nav className="flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-red-50 text-red-700 border border-red-200 font-semibold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* ブランド名（スペース確保用・非表示） */}
        <div className="ml-auto hidden lg:flex items-center gap-2 text-xs text-gray-400 shrink-0">
          <span>買取査定管理システム</span>
        </div>
      </div>
    </header>
  );
}
