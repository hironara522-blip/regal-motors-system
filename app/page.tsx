import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, ClipboardList, ScanLine, TrendingUp, AlertTriangle, Star } from "lucide-react";
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
  const totalAppraisals = DUMMY_VEHICLES.length;
  const completed = DUMMY_VEHICLES.filter((v) => v.status === "COMPLETED").length;
  const purchased = DUMMY_VEHICLES.filter((v) => v.status === "PURCHASED").length;
  const totalPurchaseAmount = DUMMY_VEHICLES.filter((v) => v.purchasePrice).reduce(
    (sum, v) => sum + (v.purchasePrice ?? 0), 0
  );

  const stats = [
    {
      label: "今月の査定件数",
      value: `${totalAppraisals}件`,
      icon: ClipboardList,
      cardColor: "bg-red-50 border-red-200",
      iconColor: "text-red-700",
    },
    {
      label: "査定完了",
      value: `${completed}件`,
      icon: TrendingUp,
      cardColor: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
    {
      label: "買取済み",
      value: `${purchased}件`,
      icon: Car,
      cardColor: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
    },
    {
      label: "今月の買取総額",
      value: formatPrice(totalPurchaseAmount),
      icon: Star,
      cardColor: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
    },
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
        {stats.map(({ label, value, icon: Icon, cardColor, iconColor }) => (
          <Card key={label} className={cn("border", cardColor)}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{label}</span>
                <Icon className={cn("h-4 w-4", iconColor)} />
              </div>
              <p className={cn("text-xl font-bold", iconColor)}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* クイックアクション */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/vehicles/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-red-300 bg-red-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <ScanLine className="h-4 w-4 text-red-700" />
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
                className={cn(
                  "flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors",
                  v.hasRepairHistory && "bg-red-50/50"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    v.hasRepairHistory ? "bg-red-100" : "bg-muted"
                  )}>
                    {v.hasRepairHistory
                      ? <AlertTriangle className="h-4 w-4 text-red-500" />
                      : <Car className="h-4 w-4 text-muted-foreground" />
                    }
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
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  {/* USS総合評価バッジ */}
                  <span className={cn(
                    "text-sm font-bold w-10 h-7 flex items-center justify-center rounded border",
                    getOverallGradeStyle(v.overallGrade)
                  )}>
                    {v.overallGrade}
                  </span>
                  {/* 外装・内装 */}
                  <div className="hidden sm:flex gap-1">
                    <span className={cn("text-xs px-1 rounded border font-medium", GRADE_COLOR[v.exteriorGrade])}>
                      外{v.exteriorGrade}
                    </span>
                    <span className={cn("text-xs px-1 rounded border font-medium", GRADE_COLOR[v.interiorGrade])}>
                      内{v.interiorGrade}
                    </span>
                  </div>
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
