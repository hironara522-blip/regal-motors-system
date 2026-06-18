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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">車両一覧</h1>
          <p className="text-muted-foreground text-sm mt-1">
            登録済み {DUMMY_VEHICLES.length}台
          </p>
        </div>
        <Link href="/vehicles/new" className={cn(buttonVariants(), "gap-2")}>
          <Plus className="h-4 w-4" />
          新規登録
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>車両</TableHead>
                <TableHead>登録番号</TableHead>
                <TableHead className="hidden md:table-cell">型式</TableHead>
                <TableHead className="hidden sm:table-cell">走行距離</TableHead>
                <TableHead>USS評価</TableHead>
                <TableHead className="hidden sm:table-cell">外装 / 内装</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="hidden md:table-cell">査定日</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {DUMMY_VEHICLES.map((v) => (
                <TableRow
                  key={v.id}
                  className={cn(
                    "hover:bg-muted/40",
                    v.hasRepairHistory && "bg-red-50/60 hover:bg-red-50"
                  )}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                        v.hasRepairHistory ? "bg-red-100" : "bg-muted"
                      )}>
                        {v.hasRepairHistory
                          ? <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                          : <Car className="h-3.5 w-3.5 text-muted-foreground" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-tight">
                          {v.manufacturer} {v.carName}
                        </p>
                        <p className="text-xs text-muted-foreground">{v.grade}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{v.registrationNumber}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {v.modelCode}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {Number(v.mileage.replace(",", "")).toLocaleString()}km
                  </TableCell>
                  {/* USS総合評価 */}
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className={cn(
                        "text-sm font-bold w-11 text-center px-1.5 py-0.5 rounded border",
                        getOverallGradeStyle(v.overallGrade)
                      )}>
                        {v.overallGrade}
                      </span>
                      <span className="text-[10px] text-muted-foreground text-center">
                        {USS_GRADE_LABEL[v.overallGrade] ?? ""}
                      </span>
                    </div>
                  </TableCell>
                  {/* 外装 / 内装 */}
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex gap-1">
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
                      {v.damageNotes.length > 0 && (
                        <span className="text-[10px] text-orange-600 font-medium">
                          キズ{v.damageNotes.length}件
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      STATUS_COLOR[v.status]
                    )}>
                      {STATUS_LABEL[v.status]}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                    {formatDate(v.appraisalDate)}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/vehicles/${v.id}`}
                      className="text-xs text-primary hover:underline"
                    >
                      詳細
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
