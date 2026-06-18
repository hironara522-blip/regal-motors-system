"use client";

import { notFound } from "next/navigation";
import { useState, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, ClipboardList, CheckCircle2, Car } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DUMMY_VEHICLES, STATUS_LABEL, STATUS_COLOR,
  GRADE_COLOR, formatPrice,
} from "@/lib/dummy-data";

type Props = { params: Promise<{ vehicleId: string }> };

const GRADE_OPTIONS = ["S", "A", "B", "C", "D"] as const;
type Grade = typeof GRADE_OPTIONS[number];

const EXTERIOR_ITEMS = [
  "ボンネット", "フロントバンパー", "フロントフェンダー左", "フロントフェンダー右",
  "ドア前左", "ドア前右", "ドア後左", "ドア後右",
  "リアフェンダー左", "リアフェンダー右", "リアバンパー", "トランク・バックドア",
  "ルーフ", "フロントガラス", "リアガラス",
];

const INTERIOR_ITEMS = ["運転席シート", "助手席シート", "後席シート", "天井", "ダッシュボード", "フロアマット"];

const MECHANICAL_ITEMS = ["エンジン音", "ミッション", "ブレーキ", "エアコン", "電装系", "タイヤ（前）", "タイヤ（後）"];

const CONDITION_OPTIONS = [
  { value: "GOOD",       label: "良好",   color: "text-green-600 bg-green-50 border-green-200" },
  { value: "NORMAL",     label: "普通",   color: "text-blue-600 bg-blue-50 border-blue-200" },
  { value: "NEEDS_WORK", label: "要整備", color: "text-orange-600 bg-orange-50 border-orange-200" },
  { value: "POOR",       label: "不良",   color: "text-red-600 bg-red-50 border-red-200" },
];

const ACCESSORIES = [
  "スペアキー", "取扱説明書", "整備記録簿", "フロアマット",
  "スペアタイヤ", "車載工具", "ナビSD/DVD", "ETC",
];

export default function AppraisalFormPage({ params }: Props) {
  const { vehicleId } = use(params);
  const vehicle = DUMMY_VEHICLES.find((v) => v.id === vehicleId);
  if (!vehicle) notFound();

  const [saved, setSaved] = useState(false);
  const [exteriorGrade, setExteriorGrade] = useState<Grade>(
    (vehicle.exteriorGrade as Grade | undefined) ?? "A"
  );
  const [interiorGrade, setInteriorGrade] = useState<Grade>("A");
  const [hasRepairHistory, setHasRepairHistory] = useState(vehicle.hasRepairHistory);
  const [exteriorConditions, setExteriorConditions] = useState<Record<string, string>>(
    Object.fromEntries(EXTERIOR_ITEMS.map((k) => [k, "GOOD"]))
  );
  const [interiorConditions, setInteriorConditions] = useState<Record<string, string>>(
    Object.fromEntries(INTERIOR_ITEMS.map((k) => [k, "GOOD"]))
  );
  const [mechanicalConditions, setMechanicalConditions] = useState<Record<string, string>>(
    Object.fromEntries(MECHANICAL_ITEMS.map((k) => [k, "GOOD"]))
  );
  const [accessories, setAccessories] = useState<Record<string, boolean>>(
    Object.fromEntries(ACCESSORIES.map((a) => [a, false]))
  );
  const [marketMin, setMarketMin] = useState(
    vehicle.marketPriceMin ? String(vehicle.marketPriceMin) : ""
  );
  const [marketMax, setMarketMax] = useState(
    vehicle.marketPriceMax ? String(vehicle.marketPriceMax) : ""
  );
  const [purchasePrice, setPurchasePrice] = useState(
    vehicle.purchasePrice ? String(vehicle.purchasePrice) : ""
  );
  const [notes, setNotes] = useState("");

  const ConditionSelector = ({
    items, state, setState,
  }: {
    items: string[];
    state: Record<string, string>;
    setState: (v: Record<string, string>) => void;
  }) => (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2">
          <span className="text-xs w-32 shrink-0">{item}</span>
          <div className="flex gap-1">
            {CONDITION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setState({ ...state, [item]: opt.value })}
                className={cn(
                  "text-xs px-2 py-0.5 rounded border transition-all",
                  state[item] === opt.value
                    ? opt.color + " font-bold"
                    : "border-border text-muted-foreground hover:border-primary/40"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const GradeSelector = ({
    value, onChange,
  }: { value: Grade; onChange: (g: Grade) => void }) => (
    <div className="flex gap-2">
      {GRADE_OPTIONS.map((g) => (
        <button
          key={g}
          onClick={() => onChange(g)}
          className={cn(
            "w-9 h-9 rounded border text-sm font-bold transition-all",
            value === g
              ? cn(GRADE_COLOR[g], "ring-2 ring-offset-1 ring-primary/30")
              : "border-border text-muted-foreground hover:border-primary/40"
          )}
        >
          {g}
        </button>
      ))}
    </div>
  );

  if (saved) {
    return (
      <div className="max-w-xl mx-auto mt-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-lg font-bold">査定情報を保存しました</h2>
        <p className="text-sm text-muted-foreground">
          {vehicle.manufacturer} {vehicle.carName}（{vehicle.registrationNumber}）
        </p>
        {purchasePrice && (
          <p className="text-xl font-bold text-green-600">
            買取価格：{formatPrice(Number(purchasePrice.replace(/,/g, "")))}
          </p>
        )}
        <div className="flex justify-center gap-3 pt-2">
          <Link href="/appraisal" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
            <ClipboardList className="h-4 w-4" />
            査定一覧へ
          </Link>
          <Link href="/vehicles" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
            <Car className="h-4 w-4" />
            車両一覧へ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* パンくず */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/appraisal" className="hover:text-foreground">査定一覧</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">
          {vehicle.manufacturer} {vehicle.carName} 査定フォーム
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{vehicle.manufacturer} {vehicle.carName}</h1>
          <p className="text-sm text-muted-foreground">{vehicle.grade}　{vehicle.registrationNumber}</p>
        </div>
        <span className={cn(
          "text-xs font-medium px-2 py-0.5 rounded-full",
          STATUS_COLOR[vehicle.status]
        )}>
          {STATUS_LABEL[vehicle.status]}
        </span>
      </div>

      {/* 修復歴 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">修復歴（最重要項目）</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <button
              onClick={() => setHasRepairHistory(false)}
              className={cn(
                "flex-1 py-2 rounded border text-sm font-medium transition-all",
                !hasRepairHistory
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "border-border text-muted-foreground hover:border-primary/40"
              )}
            >
              なし
            </button>
            <button
              onClick={() => setHasRepairHistory(true)}
              className={cn(
                "flex-1 py-2 rounded border text-sm font-medium transition-all",
                hasRepairHistory
                  ? "bg-red-50 border-red-500 text-red-700"
                  : "border-border text-muted-foreground hover:border-primary/40"
              )}
            >
              あり
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 外装評価 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">外装評価</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">総合等級</span>
              <GradeSelector value={exteriorGrade} onChange={setExteriorGrade} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ConditionSelector
            items={EXTERIOR_ITEMS}
            state={exteriorConditions}
            setState={setExteriorConditions}
          />
        </CardContent>
      </Card>

      {/* 内装評価 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">内装評価</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">総合等級</span>
              <GradeSelector value={interiorGrade} onChange={setInteriorGrade} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ConditionSelector
            items={INTERIOR_ITEMS}
            state={interiorConditions}
            setState={setInteriorConditions}
          />
        </CardContent>
      </Card>

      {/* 機関系チェック */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">機関系チェック</CardTitle>
        </CardHeader>
        <CardContent>
          <ConditionSelector
            items={MECHANICAL_ITEMS}
            state={mechanicalConditions}
            setState={setMechanicalConditions}
          />
        </CardContent>
      </Card>

      {/* 付属品 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">付属品チェック</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ACCESSORIES.map((a) => (
              <button
                key={a}
                onClick={() => setAccessories((prev) => ({ ...prev, [a]: !prev[a] }))}
                className={cn(
                  "py-1.5 px-2 rounded border text-xs transition-all",
                  accessories[a]
                    ? "bg-primary/10 border-primary text-primary font-medium"
                    : "border-border text-muted-foreground hover:border-primary/40"
                )}
              >
                {accessories[a] ? "✓ " : ""}{a}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 相場・買取価格 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">相場・買取価格</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">相場価格（下限）円</Label>
              <Input
                className="mt-1 h-8 text-sm"
                placeholder="例: 1400000"
                value={marketMin}
                onChange={(e) => setMarketMin(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">相場価格（上限）円</Label>
              <Input
                className="mt-1 h-8 text-sm"
                placeholder="例: 1680000"
                value={marketMax}
                onChange={(e) => setMarketMax(e.target.value)}
              />
            </div>
          </div>

          {marketMin && marketMax && (
            <div className="p-3 rounded-lg bg-muted/50 text-xs space-y-1">
              <p className="text-muted-foreground">相場中央値</p>
              <p className="font-bold text-sm">
                {formatPrice(Math.round((Number(marketMin) + Number(marketMax)) / 2))}
              </p>
            </div>
          )}

          <Separator />

          <div>
            <Label className="text-xs font-medium">買取価格（提示額）円</Label>
            <Input
              className="mt-1 h-9 text-base font-bold"
              placeholder="例: 1480000"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
            />
            {purchasePrice && marketMax && (
              <p className="text-xs mt-1.5 text-muted-foreground">
                相場上限との差額：
                <span className={cn(
                  "font-medium",
                  Number(purchasePrice) > Number(marketMax) ? "text-red-600" : "text-green-600"
                )}>
                  {Number(purchasePrice) > Number(marketMax) ? "+" : ""}
                  {formatPrice(Number(purchasePrice) - Number(marketMax))}
                </span>
              </p>
            )}
          </div>

          <div>
            <Label className="text-xs">備考・特記事項</Label>
            <Textarea
              className="mt-1 text-sm resize-none"
              rows={3}
              placeholder="気になった点、交渉メモなど..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* 保存ボタン */}
      <div className="flex justify-end gap-3 pb-8">
        <Link href={`/vehicles/${vehicle.id}`} className={cn(buttonVariants({ variant: "outline" }))}>
          キャンセル
        </Link>
        <button
          onClick={() => setSaved(true)}
          className={cn(buttonVariants(), "gap-2")}
        >
          <CheckCircle2 className="h-4 w-4" />
          査定情報を保存する
        </button>
      </div>
    </div>
  );
}
