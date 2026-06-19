import { Card, CardContent } from "@/components/ui/card";
import { Car, ClipboardList, ScanLine, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  DUMMY_VEHICLES,
  STATUS_LABEL,
  STATUS_COLOR,
  formatPrice,
  formatDate,
  getOverallGradeStyle,
  GRADE_COLOR,
} from "@/lib/dummy-data";

export default function HomePage() {
  const totalAppraisals    = DUMMY_VEHICLES.length;
  const completed          = DUMMY_VEHICLES.filter((v) => v.status === "COMPLETED").length;
  const purchased          = DUMMY_VEHICLES.filter((v) => v.status === "PURCHASED").length;
  const totalPurchaseAmount = DUMMY_VEHICLES
    .filter((v) => v.purchasePrice)
    .reduce((sum, v) => sum + (v.purchasePrice ?? 0), 0);

  const stats = [
    { label: "今月の査定件数", value: `${totalAppraisals}件`, icon: ClipboardList, accent: "border-l-red-600",    iconCls: "text-red-500" },
    { label: "査定完了",       value: `${completed}件`,       icon: CheckCircle2,  accent: "border-l-emerald-500", iconCls: "text-emerald-500" },
    { label: "買取済み",       value: `${purchased}件`,       icon: Car,           accent: "border-l-violet-500",  iconCls: "text-violet-500" },
    { label: "今月の買取総額", value: formatPrice(totalPurchaseAmount), icon: TrendingUp, accent: "border-l-amber-500", iconCls: "text-amber-500" },
  ];

  return (
    <div className="space-y-8">

      {/* ページヘッダー */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="text-sm text-gray-500 mt-1">買取査定の管理・比較検討</p>
        </div>
        <Link href="/vehicles/new" className={cn(buttonVariants(), "gap-2 shadow-sm")}>
          <ScanLine className="h-4 w-4" />
          新規査定を開始
        </Link>
      </div>

      {/* KPIカード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, accent, iconCls }) => (
          <Card key={label} className={cn("border-l-4", accent)}>
            <CardContent className="py-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 tabular-nums">{value}</p>
                  <p className="text-xs text-gray-500 mt-1.5 font-medium">{label}</p>
                </div>
                <Icon className={cn("h-5 w-5 mt-0.5 opacity-60", iconCls)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* クイックアクション */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/vehicles/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-red-200 bg-red-50/40 hover:bg-red-50/70">
            <CardContent className="py-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-700 flex items-center justify-center shrink-0">
                <ScanLine className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">車検証を読み取る</p>
                <p className="text-xs text-gray-500 mt-0.5">画像をアップロードして車両情報を自動入力</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/vehicles">
          <Card className="hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50/80">
            <CardContent className="py-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                <Car className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">車両一覧</p>
                <p className="text-xs text-gray-500 mt-0.5">登録済み車両の管理・検索</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/appraisal">
          <Card className="hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50/80">
            <CardContent className="py-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                <ClipboardList className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">査定一覧</p>
                <p className="text-xs text-gray-500 mt-0.5">査定状況の確認・値付け検討</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* 直近の査定 */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            直近の査定
          </h2>
          <Link href="/vehicles" className="text-xs text-red-600 hover:text-red-700 font-medium">
            すべて見る →
          </Link>
        </div>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-50">
            {DUMMY_VEHICLES.map((v) => (
              <Link
                key={v.id}
                href={`/vehicles/${v.id}`}
                className={cn(
                  "flex items-center justify-between px-6 py-4 hover:bg-gray-50/70 transition-colors",
                  v.hasRepairHistory && "bg-red-50/30"
                )}
              >
                {/* 左: 車両情報 */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                    v.hasRepairHistory ? "bg-red-100" : "bg-gray-100"
                  )}>
                    {v.hasRepairHistory
                      ? <AlertTriangle className="h-4 w-4 text-red-500" />
                      : <Car className="h-4 w-4 text-gray-400" />
                    }
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {v.manufacturer} {v.carName}
                      <span className="text-gray-400 font-normal ml-1.5 text-xs">{v.grade}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {v.registrationNumber}　走行 {v.mileage}km
                    </p>
                  </div>
                </div>

                {/* 右: 評価バッジ群 */}
                <div className="flex items-center gap-2.5 shrink-0 ml-4">
                  <span className={cn(
                    "text-sm font-bold w-11 h-7 flex items-center justify-center rounded border",
                    getOverallGradeStyle(v.overallGrade)
                  )}>
                    {v.overallGrade}
                  </span>
                  <div className="hidden sm:flex gap-1">
                    <span className={cn("text-xs px-1.5 rounded border font-semibold", GRADE_COLOR[v.exteriorGrade])}>外{v.exteriorGrade}</span>
                    <span className={cn("text-xs px-1.5 rounded border font-semibold", GRADE_COLOR[v.interiorGrade])}>内{v.interiorGrade}</span>
                  </div>
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", STATUS_COLOR[v.status])}>
                    {STATUS_LABEL[v.status]}
                  </span>
                  <span className="text-xs text-gray-400 w-12 text-right tabular-nums">
                    {formatDate(v.appraisalDate)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
