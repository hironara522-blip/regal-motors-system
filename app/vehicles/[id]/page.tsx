import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Car, AlertTriangle, CheckCircle2, ClipboardList } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DUMMY_VEHICLES, STATUS_LABEL, STATUS_COLOR,
  GRADE_COLOR, formatPrice, formatDate,
} from "@/lib/dummy-data";

type Props = { params: Promise<{ id: string }> };

export default async function VehicleDetailPage({ params }: Props) {
  const { id } = await params;
  const vehicle = DUMMY_VEHICLES.find((v) => v.id === id);
  if (!vehicle) notFound();

  const basicFields = [
    { label: "メーカー・車名",       value: `${vehicle.manufacturer} ${vehicle.carName} ${vehicle.grade}` },
    { label: "自動車登録番号",       value: vehicle.registrationNumber },
    { label: "車台番号",             value: vehicle.chassisNumber },
    { label: "型式",                 value: vehicle.modelCode },
    { label: "初度登録年月",         value: vehicle.firstRegistrationDate },
    { label: "車検満了日",           value: vehicle.inspectionExpiry },
    { label: "排気量",               value: vehicle.displacement },
    { label: "燃料の種類",           value: vehicle.fuel },
    { label: "乗車定員",             value: vehicle.capacity },
    { label: "車両重量",             value: vehicle.vehicleWeight },
    { label: "走行距離",             value: `${vehicle.mileage}km` },
    { label: "車体の色",             value: vehicle.color },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      {/* パンくず */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/vehicles" className="hover:text-foreground">車両一覧</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">
          {vehicle.manufacturer} {vehicle.carName}
        </span>
      </div>

      {/* ヘッダー */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold">
              {vehicle.manufacturer} {vehicle.carName}
            </h1>
            <span className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              STATUS_COLOR[vehicle.status]
            )}>
              {STATUS_LABEL[vehicle.status]}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{vehicle.grade}</p>
          <p className="text-xs text-muted-foreground mt-1">
            登録日: {formatDate(vehicle.appraisalDate)}
          </p>
        </div>
        <Link
          href={`/appraisal/${vehicle.id}`}
          className={cn(buttonVariants(), "gap-2 shrink-0")}
        >
          <ClipboardList className="h-4 w-4" />
          査定フォームへ
        </Link>
      </div>

      {/* 修復歴アラート */}
      {vehicle.hasRepairHistory && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300 font-medium">修復歴あり</p>
        </div>
      )}

      {/* 外装等級 */}
      {vehicle.exteriorGrade && (
        <div className="flex items-center gap-4 p-4 rounded-lg border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">外装評価等級</p>
            <span className={cn(
              "text-2xl font-bold px-3 py-1 rounded border",
              GRADE_COLOR[vehicle.exteriorGrade]
            )}>
              {vehicle.exteriorGrade}
            </span>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="grid grid-cols-2 gap-4 flex-1">
            {vehicle.marketPriceMin && (
              <div>
                <p className="text-xs text-muted-foreground">相場下限</p>
                <p className="text-sm font-medium">{formatPrice(vehicle.marketPriceMin)}</p>
              </div>
            )}
            {vehicle.marketPriceMax && (
              <div>
                <p className="text-xs text-muted-foreground">相場上限</p>
                <p className="text-sm font-medium">{formatPrice(vehicle.marketPriceMax)}</p>
              </div>
            )}
            {vehicle.purchasePrice && (
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground">買取価格</p>
                <p className="text-base font-bold text-green-600">{formatPrice(vehicle.purchasePrice)}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 車検証情報 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Car className="h-4 w-4" />
            車検証読み取り情報
            <span className="flex items-center gap-1 text-xs text-green-600 font-normal">
              <CheckCircle2 className="h-3.5 w-3.5" />
              OCR確認済み
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {basicFields.map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="text-sm font-medium mt-0.5">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Link href="/vehicles" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
          <Car className="h-4 w-4" />
          車両一覧に戻る
        </Link>
        <Link href={`/appraisal/${vehicle.id}`} className={cn(buttonVariants(), "gap-2")}>
          <ClipboardList className="h-4 w-4" />
          査定フォームへ進む
        </Link>
      </div>
    </div>
  );
}
