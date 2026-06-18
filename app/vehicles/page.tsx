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
  GRADE_COLOR, formatDate,
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
                <TableHead className="hidden sm:table-cell">外装</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="hidden md:table-cell">査定日</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {DUMMY_VEHICLES.map((v) => (
                <TableRow key={v.id} className="hover:bg-muted/40">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <Car className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-tight">
                          {v.manufacturer} {v.carName}
                        </p>
                        <p className="text-xs text-muted-foreground">{v.grade}</p>
                      </div>
                      {v.hasRepairHistory && (
                        <AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" aria-label="修復歴あり" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{v.registrationNumber}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {v.modelCode}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {Number(v.mileage.replace(",", "")).toLocaleString()}km
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {v.exteriorGrade && (
                      <span className={cn(
                        "text-xs font-bold px-1.5 py-0.5 rounded border",
                        GRADE_COLOR[v.exteriorGrade]
                      )}>
                        {v.exteriorGrade}
                      </span>
                    )}
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
