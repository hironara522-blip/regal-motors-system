import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, ClipboardList, ScanLine, TrendingUp, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  DUMMY_VEHICLES,
  STATUS_LABEL,
  STATUS_COLOR,
  GRADE_COLOR,
  formatPrice,
  formatDate,
} from "@/lib/dummy-data";

export default function HomePage() {
  const totalAppraisals = DUMMY_VEHICLES.length;
  const completed = DUMMY_VEHICLES.filter((v) => v.status === "COMPLETED").length;
  const purchased = DUMMY_VEHICLES.filter((v) => v.status === "PURCHASED").length;
  const totalPurchaseAmount = DUMMY_VEHICLES.filter((v) => v.purchasePrice).reduce(
    (sum, v) => sum + (v.purchasePrice ?? 0),
    0
  );

  const stats = [
    { label: "今月の査定件数", value: `${totalAppraisals}件`, icon: ClipboardList, color: "text-blue-600" },
    { label: "査定完了", value: `${completed}件`, icon: TrendingUp, color: "text-green-600" },
    { label: "買取済み", value: `${purchased}件`, icon: Car, color: "text-purple-600" },
    { label: "今月の買取総額", value: formatPrice(totalPurchaseAmount), icon: TrendingUp, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">ダッシュボード</h1>
          <p className="text-muted-foreground text-sm mt-1">買取査定の管理・比較検討</p>
        </div>
        <Link href="/vehicles/new" className={cn(buttonVariants(), "gap-2")}>
          <ScanLine className="h-4 w-4" />
          新規査定を開始
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">{label}</span>
                <Icon className={cn("h-4 w-4", color)} />
              </div>
              <p className="text-xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* クイックアクション */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/vehicles/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <ScanLine className="h-4 w-4 text-primary" />
                車検証を読み取る
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                画像をアップロードして車両情報を自動入力
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/vehicles">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Car className="h-4 w-4 text-primary" />
                車両一覧
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">登録済み車両の管理・検索</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/appraisal">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" />
                査定一覧
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">査定状況の確認・値付け検討</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* 直近の査定 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            直近の査定
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {DUMMY_VEHICLES.map((v) => (
              <Link
                key={v.id}
                href={`/vehicles/${v.id}`}
                className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Car className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {v.manufacturer} {v.carName}
                      <span className="text-muted-foreground font-normal ml-1 text-xs">{v.grade}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {v.registrationNumber}　走行 {v.mileage}km
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  {v.exteriorGrade && (
                    <span className={cn(
                      "text-xs font-bold px-1.5 py-0.5 rounded border",
                      GRADE_COLOR[v.exteriorGrade]
                    )}>
                      {v.exteriorGrade}
                    </span>
                  )}
                  {v.hasRepairHistory && (
                    <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                  )}
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    STATUS_COLOR[v.status]
                  )}>
                    {STATUS_LABEL[v.status]}
                  </span>
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {formatDate(v.appraisalDate)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="px-6 py-3 border-t">
            <Link href="/vehicles" className="text-xs text-primary hover:underline">
              すべての車両を見る →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
