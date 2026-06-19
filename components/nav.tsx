"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Car, ClipboardList, LayoutDashboard, ScanLine, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/",             label: "ダッシュボード",       icon: LayoutDashboard },
  { href: "/vehicles",     label: "車両一覧",             icon: Car },
  { href: "/vehicles/new", label: "車検証読取・新規登録", icon: ScanLine },
  { href: "/appraisal",    label: "査定一覧",             icon: ClipboardList },
];

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-900 border-b border-zinc-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex h-14 sm:h-16 items-center gap-4 sm:gap-6">

        {/* ブランドロゴ */}
        <Link href="/" className="shrink-0" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-sm">
            <Image
              src="/logo.png"
              alt="REGAL MOTORS"
              width={160}
              height={36}
              style={{ height: "30px", width: "auto" }}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* 縦区切り (md+) */}
        <div className="hidden md:block h-6 w-px bg-zinc-700 shrink-0" />

        {/* ナビゲーション (md+) */}
        <nav className="hidden md:flex items-center gap-1">
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

        {/* 右端ラベル (lg+) */}
        <div className="ml-auto hidden lg:block text-[11px] text-zinc-500 font-medium tracking-wider uppercase">
          買取査定管理システム
        </div>

        {/* ハンバーガーボタン (md以下) */}
        <button
          className="md:hidden ml-auto p-2 text-zinc-400 hover:text-zinc-100 rounded-md transition-colors"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* モバイルドロップダウンメニュー */}
      {isOpen && (
        <nav className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-2 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-all",
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
      )}
    </header>
  );
}
