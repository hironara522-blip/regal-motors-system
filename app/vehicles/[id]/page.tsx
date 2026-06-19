import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight, Car, AlertTriangle, CheckCircle2, ClipboardList, Info, BadgeCheck,
} from "lucide-react";
import { VehicleImage } from "@/components/vehicle-image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DUMMY_VEHICLES, STATUS_LABEL, STATUS_COLOR,
  GRADE_COLOR, formatPrice, formatDate,
  getOverallGradeStyle, USS_GRADE_LABEL, getDamageCodeStyle,
} from "@/lib/dummy-data";

type Props = { params: Promise<{ id: string }> };

export default async function VehicleDetailPage({ params }: Props) {
  const { id } = await params;
  const vehicle = DUMMY_VEHICLES.find((v) => v.id === id);
  if (!vehicle) notFound();

  const basicFields = [
    { label: "メーカー・車名",   value: `${vehicle.manufacturer} ${vehicle.carName}` },
    { label: "グレード",         value: vehicle.grade },
    { label: "自動車登録番号",   value: vehicle.registrationNumber },
    { label: "車台番号",         value: vehicle.chassisNumber },
    { label: "型式",             value: vehicle.modelCode },
    { label: "初度登録年月",     value: vehicle.firstRegistrationDate },
    { label: "車検満了日",       value: vehicle.inspectionExpiry },
    { label: "排気量",           value: vehicle.displacement },
    { label: "燃料の種類",       value: vehicle.fuel },
    { label: "乗車定員",         value: vehicle.capacity },
    { label: "車両重量",         value: vehicle.vehicleWeight },
    { label: "走行距離",         value: `${vehicle.mileage} km` },
    { label: "車体の色",         value: vehicle.color },
  ];

  return (
    <div className="max-w-3xl space-y-6">

      {/* パンくず */}
      <nav className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/vehicles" className="hover:text-gray-700 transition-colors">車両一覧</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-700 font-medium">
          {vehicle.manufacturer} {vehicle.carName}
        </span>
      </nav>

      {/* ヒーロー画像 */}
      {vehicle.imageUrl && (
        <div data-vehicle-hero className="relative rounded-xl overflow-hidden shadow-sm ring-1 ring-black/[0.07]">
          <VehicleImage
            src={vehicle.imageUrl}
            alt={`${vehicle.manufacturer} ${vehicle.carName}`}
            variant="hero"
          />
          <div className="absolute bottom-0 left-0 p-4 pointer-events-none">
            <p className="text-white font-bold text-lg drop-shadow-sm">
              {vehicle.manufacturer} {vehicle.carName}
            </p>
            <p className="text-white/80 text-sm">{vehicle.color}</p>
          </div>
        </div>
      )}

      {/* ページヘッダー */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-xl font-bold text-gray-900">
              {vehicle.manufacturer} {vehicle.carName}
            </h1>
            <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", STATUS_COLOR[vehicle.status])}>
              {STATUS_LABEL[vehicle.status]}
            </span>
          </div>
          <p className="text-sm text-gray-500">{vehicle.grade}</p>
          <p className="text-xs text-gray-400 mt-1">査定日: {formatDate(vehicle.appraisalDate)}</p>
        </div>
        <Link href={`/appraisal/${vehicle.id}`} className={cn(buttonVariants(), "gap-2 shrink-0 shadow-sm")}>
          <ClipboardList className="h-4 w-4" />
          査定フォームへ
        </Link>
      </div>

      {/* 修復歴アラート */}
      {vehicle.hasRepairHistory && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-700">修復歴あり</p>
            <p className="text-xs text-red-500 mt-0.5">
              {vehicle.specialNotes.find((n) => n.includes("修復歴")) ?? "詳細は特記事項を参照してください"}
            </p>
          </div>
        </div>
      )}

      {/* USS評価パネル */}
      <Card className={cn(vehicle.hasRepairHistory ? "border-red-200" : "border-blue-100")}>
        <CardContent className="py-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">USS 査定評価</p>
          <div className="flex items-center gap-6 flex-wrap">

            {/* 総合 */}
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-2">総合評価</p>
              <span className={cn(
                "text-4xl font-black px-5 py-2.5 rounded-xl border-2 inline-block",
                getOverallGradeStyle(vehicle.overallGrade)
              )}>
                {vehicle.overallGrade}
              </span>
              <p className="text-xs text-gray-400 mt-1.5 font-medium">
                {USS_GRADE_LABEL[vehicle.overallGrade] ?? ""}
              </p>
            </div>

            <Separator orientation="vertical" className="h-16 hidden sm:block" />

            {/* 外装・内装 */}
            <div className="flex gap-5">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-2">外装</p>
                <span className={cn("text-2xl font-bold px-4 py-1.5 rounded-lg border-2", GRADE_COLOR[vehicle.exteriorGrade])}>
                  {vehicle.exteriorGrade}
                </span>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-2">内装</p>
                <span className={cn("text-2xl font-bold px-4 py-1.5 rounded-lg border-2", GRADE_COLOR[vehicle.interiorGrade])}>
                  {vehicle.interiorGrade}
                </span>
              </div>
            </div>

            <Separator orientation="vertical" className="h-16 hidden sm:block" />

            {/* 価格 */}
            <div className="flex-1 min-w-[180px]">
              {vehicle.marketPriceMin && vehicle.marketPriceMax && (
                <div className="mb-3">
                  <p className="text-xs text-gray-400 mb-0.5">市場相場</p>
                  <p className="text-sm font-semibold text-gray-700">
                    {formatPrice(vehicle.marketPriceMin)} 〜 {formatPrice(vehicle.marketPriceMax)}
                  </p>
                </div>
              )}
              {vehicle.purchasePrice && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <p className="text-xs text-emerald-600 mb-0.5 font-medium">買取価格（確定）</p>
                  <p className="text-xl font-bold text-emerald-700">{formatPrice(vehicle.purchasePrice)}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* キズ・ダメージ */}
      {vehicle.damageNotes.length > 0 && (
        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-orange-700">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              キズ・ダメージ情報（{vehicle.damageNotes.length}件）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {vehicle.damageNotes.map((note, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-orange-50/70 border border-orange-100">
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded border shrink-0 min-w-[2.5rem] text-center",
                    getDamageCodeStyle(note.code)
                  )}>
                    {note.code}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{note.location}</p>
                    <p className="text-xs text-gray-500">{note.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-3">
              A=キズ　U=ヘコミ　W=修理跡　B=サビ（数字1〜3：1小〜3大）
            </p>
          </CardContent>
        </Card>
      )}

      {/* 特記事項 */}
      {vehicle.specialNotes.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-gray-700">
              <Info className="h-4 w-4 text-blue-500" />
              特記事項・装備
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {vehicle.specialNotes.map((note) => (
                <li key={note} className={cn(
                  "flex items-start gap-2 text-xs",
                  note.includes("修復歴") ? "text-red-600" : "text-gray-700"
                )}>
                  {note.includes("修復歴")
                    ? <AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                    : <BadgeCheck className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                  }
                  {note}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* 車検証情報 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-gray-700">
            <Car className="h-4 w-4 text-gray-400" />
            車検証読み取り情報
            <span className="flex items-center gap-1 text-xs text-emerald-600 font-normal">
              <CheckCircle2 className="h-3.5 w-3.5" />
              OCR確認済み
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            {basicFields.map(({ label, value }) => (
              <div key={label} className="border-b border-gray-50 pb-3">
                <dt className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{label}</dt>
                <dd className="text-sm font-semibold text-gray-800 mt-1">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {/* フッターアクション */}
      <div className="flex gap-3 pb-4">
        <Link href="/vehicles" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
          <Car className="h-4 w-4" />
          車両一覧に戻る
        </Link>
        <Link href={`/appraisal/${vehicle.id}`} className={cn(buttonVariants(), "gap-2 shadow-sm")}>
          <ClipboardList className="h-4 w-4" />
          査定フォームへ進む
        </Link>
      </div>
    </div>
  );
}
