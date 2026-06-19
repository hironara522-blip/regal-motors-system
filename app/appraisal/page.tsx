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
import { VehicleImage } from "@/components/vehicle-image";

export default function AppraisalPage() {
  const inProgress = DUMMY_VEHICLES.filter((v) => v.status === "IN_PROGRESS");
  const completed  = DUMMY_VEHICLES.filter((v) => v.status === "COMPLETED");
  const purchased  = DUMMY_VEHICLES.filter((v) => v.status === "PURCHASED");

  const sections = [
    { title: "査定中",   vehicles: inProgress, dotCls: "bg-blue-500",   titleCls: "text-blue-700" },
    { title: "査定完了", vehicles: completed,   dotCls: "bg-emerald-500", titleCls: "text-emerald-700" },
    { title: "買取済み", vehicles: purchased,   dotCls: "bg-violet-500",  titleCls: "text-violet-700" },
  ];

  return (
    <div className="space-y-8">

      {/* ページヘッダー */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">査定一覧</h1>
          <p className="text-sm text-gray-500 mt-1">査定状況の管理・値付け検討</p>
        </div>
        <Link href="/vehicles/new" className={cn(buttonVariants(), "gap-2 shadow-sm self-start")}>
          <ClipboardList className="h-4 w-4" />
          新規査定
        </Link>
      </div>

      {/* セクション */}
      {sections.map(({ title, vehicles, dotCls, titleCls }) =>
        vehicles.length === 0 ? null : (
          <section key={title} className="space-y-3">
            <h2 className={cn("text-sm font-semibold flex items-center gap-2", titleCls)}>
              <span className={cn("w-2 h-2 rounded-full", dotCls)} />
              {title}（{vehicles.length}件）
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicles.map((v) => (
                <Card
                  key={v.id}
                  className={cn(
                    "hover:shadow-md transition-shadow overflow-hidden",
                    v.hasRepairHistory
                      ? "border-red-200"
                      : ["5", "S", "6"].includes(v.overallGrade)
                      ? "border-amber-200/60"
                      : ["4.5", "4"].includes(v.overallGrade)
                      ? "border-zinc-200/60"
                      : ""
                  )}
                >
                  {/* カードサムネイル */}
                  {v.imageUrl && (
                    <div data-vehicle-card className="relative">
                      <VehicleImage
                        src={v.imageUrl}
                        alt={`${v.manufacturer} ${v.carName}`}
                        variant="card"
                      />
                      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-2.5 pointer-events-none">
                        <p className="text-white text-xs font-semibold drop-shadow-sm">
                          {v.manufacturer} {v.carName}
                        </p>
                        <span className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          STATUS_COLOR[v.status]
                        )}>
                          {STATUS_LABEL[v.status]}
                        </span>
                      </div>
                      {v.hasRepairHistory && (
                        <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          <AlertTriangle className="h-2.5 w-2.5" />
                          修復歴
                        </div>
                      )}
                    </div>
                  )}
                  <CardHeader className="pb-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                          {!v.imageUrl && v.manufacturer} {!v.imageUrl && v.carName}
                          {v.imageUrl && <span className="text-gray-600 font-normal">{v.grade}</span>}
                          {!v.imageUrl && v.hasRepairHistory && (
                            <AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                          )}
                        </CardTitle>
                        {!v.imageUrl && <p className="text-xs text-gray-400 mt-0.5">{v.grade}</p>}
                        {v.imageUrl && (
                          <p className="text-xs text-gray-400 mt-0.5">{v.color}</p>
                        )}
                      </div>
                      {!v.imageUrl && (
                        <span className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full shrink-0",
                          STATUS_COLOR[v.status]
                        )}>
                          {STATUS_LABEL[v.status]}
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 pt-4">

                    {/* USS評価バッジ群 */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <div className="text-center">
                        <p className="text-[10px] text-gray-400 mb-1">USS総合</p>
                        <span className={cn(
                          "text-lg font-black px-3 py-1 rounded-lg border",
                          getOverallGradeStyle(v.overallGrade)
                        )}>
                          {v.overallGrade}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">
                          {USS_GRADE_LABEL[v.overallGrade]}
                        </p>
                        <div className="flex gap-1 mt-1">
                          <span className={cn("text-xs font-semibold px-1.5 py-0.5 rounded border", GRADE_COLOR[v.exteriorGrade])}>外{v.exteriorGrade}</span>
                          <span className={cn("text-xs font-semibold px-1.5 py-0.5 rounded border", GRADE_COLOR[v.interiorGrade])}>内{v.interiorGrade}</span>
                        </div>
                      </div>
                      {v.damageNotes.length > 0 && (
                        <div className="ml-auto flex flex-wrap gap-1 justify-end">
                          {v.damageNotes.map((note, i) => (
                            <span
                              key={i}
                              className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded border", getDamageCodeStyle(note.code))}
                              title={`${note.location}: ${note.description}`}
                            >
                              {note.code}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 基本情報 */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-400">登録番号</p>
                        <p className="font-medium text-gray-700 mt-0.5">{v.registrationNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">走行距離</p>
                        <p className="font-medium text-gray-700 mt-0.5 tabular-nums">{v.mileage} km</p>
                      </div>
                    </div>

                    {/* 相場・買取価格 */}
                    {(v.marketPriceMin || v.purchasePrice) && (
                      <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-xs">
                        <TrendingUp className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                        {v.marketPriceMin && v.marketPriceMax && (
                          <span className="text-gray-500">
                            相場 {formatPrice(v.marketPriceMin)}〜{formatPrice(v.marketPriceMax)}
                          </span>
                        )}
                        {v.purchasePrice && (
                          <span className="font-bold text-emerald-600 sm:ml-auto">
                            買取 {formatPrice(v.purchasePrice)}
                          </span>
                        )}
                      </div>
                    )}

                    {/* アクション行 */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-gray-400 tabular-nums">
                        {formatDate(v.appraisalDate)}
                      </span>
                      <Link
                        href={`/appraisal/${v.id}`}
                        className={cn(buttonVariants({ variant: "outline" }), "h-7 text-xs px-3 gap-1")}
                      >
                        査定フォーム →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
}
