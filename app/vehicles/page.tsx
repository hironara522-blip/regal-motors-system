import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { Car, Plus, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DUMMY_VEHICLES, STATUS_LABEL, STATUS_COLOR,
  GRADE_COLOR, formatDate, getOverallGradeStyle, USS_GRADE_LABEL,
} from "@/lib/dummy-data";

export default function VehiclesPage() {
  return (
    <div className="space-y-6">

      {/* ページヘッダー */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">車両一覧</h1>
          <p className="text-sm text-gray-500 mt-1">登録済み {DUMMY_VEHICLES.length}台</p>
        </div>
        <Link href="/vehicles/new" className={cn(buttonVariants(), "gap-2 shadow-sm")}>
          <Plus className="h-4 w-4" />
          新規登録
        </Link>
      </div>

      {/* テーブル */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-b border-gray-100">
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">車両</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">登録番号</TableHead>
                <TableHead className="hidden md:table-cell text-xs font-semibold text-gray-500 uppercase tracking-wide">型式</TableHead>
                <TableHead className="hidden sm:table-cell text-xs font-semibold text-gray-500 uppercase tracking-wide">走行距離</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">USS評価</TableHead>
                <TableHead className="hidden sm:table-cell text-xs font-semibold text-gray-500 uppercase tracking-wide">外装 / 内装</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">ステータス</TableHead>
                <TableHead className="hidden md:table-cell text-xs font-semibold text-gray-500 uppercase tracking-wide">査定日</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {DUMMY_VEHICLES.map((v) => (
                <TableRow
                  key={v.id}
                  className={cn(
                    "border-b border-gray-50 hover:bg-gray-50/60 transition-colors",
                    v.hasRepairHistory && "bg-red-50/30 hover:bg-red-50/50"
                  )}
                >
                  {/* 車両名 */}
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                        v.hasRepairHistory ? "bg-red-100" : "bg-gray-100"
                      )}>
                        {v.hasRepairHistory
                          ? <AlertTriangle className="h-4 w-4 text-red-500" />
                          : <Car className="h-4 w-4 text-gray-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 leading-tight">
                          {v.manufacturer} {v.carName}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{v.grade}</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* 登録番号 */}
                  <TableCell className="text-sm font-medium text-gray-700">
                    {v.registrationNumber}
                  </TableCell>

                  {/* 型式 */}
                  <TableCell className="hidden md:table-cell text-xs text-gray-400 font-mono">
                    {v.modelCode}
                  </TableCell>

                  {/* 走行距離 */}
                  <TableCell className="hidden sm:table-cell text-sm text-gray-700 tabular-nums">
                    {Number(v.mileage.replace(",", "")).toLocaleString()} km
                  </TableCell>

                  {/* USS総合評価 */}
                  <TableCell>
                    <div className="flex flex-col items-start gap-0.5">
                      <span className={cn(
                        "text-sm font-bold px-2.5 py-0.5 rounded border",
                        getOverallGradeStyle(v.overallGrade)
                      )}>
                        {v.overallGrade}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {USS_GRADE_LABEL[v.overallGrade] ?? ""}
                      </span>
                    </div>
                  </TableCell>

                  {/* 外装 / 内装 */}
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded border", GRADE_COLOR[v.exteriorGrade])}>
                        外{v.exteriorGrade}
                      </span>
                      <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded border", GRADE_COLOR[v.interiorGrade])}>
                        内{v.interiorGrade}
                      </span>
                      {v.damageNotes.length > 0 && (
                        <span className="text-[10px] text-orange-500 font-semibold">
                          キズ {v.damageNotes.length}件
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* ステータス */}
                  <TableCell>
                    <span className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      STATUS_COLOR[v.status]
                    )}>
                      {STATUS_LABEL[v.status]}
                    </span>
                  </TableCell>

                  {/* 査定日 */}
                  <TableCell className="hidden md:table-cell text-xs text-gray-400 tabular-nums">
                    {formatDate(v.appraisalDate)}
                  </TableCell>

                  {/* 詳細リンク */}
                  <TableCell>
                    <Link
                      href={`/vehicles/${v.id}`}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      詳細 →
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
