"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, ClipboardList, LayoutDashboard, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/",            label: "ダッシュボード",         icon: LayoutDashboard },
  { href: "/vehicles",    label: "車両一覧",               icon: Car },
  { href: "/vehicles/new",label: "車検証読取・新規登録",   icon: ScanLine },
  { href: "/appraisal",   label: "査定一覧",               icon: ClipboardList },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-900 border-b border-zinc-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex h-16 items-center gap-6">

        {/* ブランドロゴ — 白背景ボックスで視認性確保 */}
        <Link href="/" className="shrink-0">
          <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm">
            <Image
              src="/logo.png"
              alt="REGAL MOTORS"
              width={160}
              height={36}
              style={{ height: "34px", width: "auto" }}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* 縦区切り */}
        <div className="h-6 w-px bg-zinc-700 shrink-0" />

        {/* ナビゲーション */}
        <nav className="flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                pathname === href
                  ? "bg-zinc-800 text-white ring-1 ring-zinc-700"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* 右端ラベル */}
        <div className="ml-auto hidden lg:block text-[11px] text-zinc-500 font-medium tracking-wider uppercase">
          買取査定管理システム
        </div>
      </div>
    </header>
  );
}
