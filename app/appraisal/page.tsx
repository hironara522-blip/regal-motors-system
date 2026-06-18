import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ClipboardList, AlertTriangle, TrendingUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DUMMY_VEHICLES, STATUS_LABEL, STATUS_COLOR,
  GRADE_COLOR, formatPrice, formatDate,
  getOverallGradeStyle, USS_GRADE_LABEL, getDamageCodeStyle,
} from "@/lib/dummy-data";

export default function AppraisalPage() {
  const inProgress = DUMMY_VEHICLES.filter((v) => v.status === "IN_PROGRESS");
  const completed  = DUMMY_VEHICLES.filter((v) => v.status === "COMPLETED");
  const purchased  = DUMMY_VEHICLES.filter((v) => v.status === "PURCHASED");

  const sections = [
    { title: "査定中",   vehicles: inProgress, color: "text-blue-600",   dot: "bg-blue-500" },
    { title: "査定完了", vehicles: completed,   color: "text-green-600",  dot: "bg-green-500" },
    { title: "買取済み", vehicles: purchased,   color: "text-purple-600", dot: "bg-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">査定一覧</h1>
          <p className="text-muted-foreground text-sm mt-1">査定状況の管理・値付け検討</p>
        </div>
        <Link href="/vehicles/new" className={cn(buttonVariants(), "gap-2")}>
          <ClipboardList className="h-4 w-4" />
          新規査定
        </Link>
      </div>

      {sections.map(({ title, vehicles, color, dot }) =>
        vehicles.length === 0 ? null : (
          <div key={title} className="space-y-3">
            <h2 className={cn("text-sm font-semibold flex items-center gap-2", color)}>
              <span className={cn("w-2 h-2 rounded-full", dot)} />
              {title}（{vehicles.length}件）
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicles.map((v) => (
                <Card
                  key={v.id}
                  className={cn(
                    "hover:shadow-md transition-shadow",
                    v.hasRepairHistory
                      ? "border-red-300 bg-red-50/40"
                      : ["5", "S", "6"].includes(v.overallGrade)
                      ? "border-emerald-200 bg-emerald-50/30"
                      : ["4.5", "4"].includes(v.overallGrade)
                      ? "border-blue-200"
                      : ""
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-sm flex items-center gap-2">
                          {v.manufacturer} {v.carName}
                          {v.hasRepairHistory && (
                            <AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                          )}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">{v.grade}</p>
                      </div>
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full shrink-0",
                        STATUS_COLOR[v.status]
                      )}>
                        {STATUS_LABEL[v.status]}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* USS評価バッジ群 */}
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-[10px] text-muted-foreground mb-0.5">総合</p>
                        <span className={cn(
                          "text-base font-black px-2.5 py-1 rounded border",
                          getOverallGradeStyle(v.overallGrade)
                        )}>
                          {v.overallGrade}
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {USS_GRADE_LABEL[v.overallGrade]}
                      </div>
                      <div className="flex gap-1 ml-auto">
                        <span className={cn(
                          "text-xs font-bold px-1.5 py-0.5 rounded border",
                          GRADE_COLOR[v.exteriorGrade]
                        )}>
                          外{v.exteriorGrade}
                        </span>
                        <span className={cn(
                          "text-xs font-bold px-1.5 py-0.5 rounded border",
                          GRADE_COLOR[v.interiorGrade]
                        )}>
                          内{v.interiorGrade}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">登録番号</p>
                        <p className="font-medium">{v.registrationNumber}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">走行距離</p>
                        <p className="font-medium">{v.mileage}km</p>
                      </div>
                    </div>

                    {/* キズ情報 */}
                    {v.damageNotes.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {v.damageNotes.map((note, i) => (
                          <span
                            key={i}
                            className={cn(
                              "text-[10px] font-bold px-1.5 py-0.5 rounded border",
                              getDamageCodeStyle(note.code)
                            )}
                            title={`${note.location}: ${note.description}`}
                          >
                            {note.code}
                          </span>
                        ))}
                        <span className="text-[10px] text-muted-foreground flex items-center">
                          キズ{v.damageNotes.length}件
                        </span>
                      </div>
                    )}

                    {/* 相場・買取価格 */}
                    {(v.marketPriceMin || v.purchasePrice) && (
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 text-xs">
                        <TrendingUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        {v.marketPriceMin && v.marketPriceMax && (
                          <span className="text-muted-foreground">
                            相場 {formatPrice(v.marketPriceMin)}〜{formatPrice(v.marketPriceMax)}
                          </span>
                        )}
                        {v.purchasePrice && (
                          <span className="font-bold text-green-600 ml-auto">
                            買取 {formatPrice(v.purchasePrice)}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(v.appraisalDate)}
                      </span>
                      <Link
                        href={`/appraisal/${v.id}`}
                        className={cn(buttonVariants({ variant: "outline" }), "h-7 text-xs px-3")}
                      >
                        査定フォーム
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
