"use client";

import { notFound } from "next/navigation";
import { useState, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, ClipboardList, CheckCircle2, Car, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DUMMY_VEHICLES, STATUS_LABEL, STATUS_COLOR,
  GRADE_COLOR, formatPrice,
  getOverallGradeStyle, USS_GRADES,
} from "@/lib/dummy-data";
import type { DamageNote } from "@/lib/dummy-data";

type Props = { params: Promise<{ vehicleId: string }> };

const EXT_INT_GRADES = ["A", "B", "C", "D"] as const;

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
  const [overallGrade, setOverallGrade] = useState(vehicle.overallGrade);
  const [exteriorGrade, setExteriorGrade] = useState(vehicle.exteriorGrade || "A");
  const [interiorGrade, setInteriorGrade] = useState(vehicle.interiorGrade || "A");
  const [hasRepairHistory, setHasRepairHistory] = useState(vehicle.hasRepairHistory);
  const [damageNotes, setDamageNotes] = useState<DamageNote[]>(vehicle.damageNotes ?? []);
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
  const [marketMin, setMarketMin] = useState(vehicle.marketPriceMin ? String(vehicle.marketPriceMin) : "");
  const [marketMax, setMarketMax] = useState(vehicle.marketPriceMax ? String(vehicle.marketPriceMax) : "");
  const [purchasePrice, setPurchasePrice] = useState(vehicle.purchasePrice ? String(vehicle.purchasePrice) : "");
  const [notes, setNotes] = useState("");

  const addDamageNote = () =>
    setDamageNotes([...damageNotes, { location: "", code: "", description: "" }]);

  const removeDamageNote = (index: number) =>
    setDamageNotes(damageNotes.filter((_, i) => i !== index));

  const updateDamageNote = (index: number, field: keyof DamageNote, value: string) =>
    setDamageNotes(damageNotes.map((note, i) => i === index ? { ...note, [field]: value } : note));

  const ConditionSelector = ({
    items, state, setState,
  }: { items: string[]; state: Record<string, string>; setState: (v: Record<string, string>) => void }) => (
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
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-muted/50 border">
          <span className={cn(
            "text-3xl font-black px-4 py-1.5 rounded-lg border-2",
            getOverallGradeStyle(overallGrade)
          )}>
            {overallGrade}
          </span>
          <div className="text-left">
            <p className="text-xs text-muted-foreground mb-0.5">外装 / 内装</p>
            <div className="flex gap-1.5">
              <span className={cn("text-sm px-2 py-0.5 rounded border font-bold", GRADE_COLOR[exteriorGrade])}>
                外 {exteriorGrade}
              </span>
              <span className={cn("text-sm px-2 py-0.5 rounded border font-bold", GRADE_COLOR[interiorGrade])}>
                内 {interiorGrade}
              </span>
            </div>
          </div>
        </div>
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
      <nav className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/appraisal" className="hover:text-gray-700 transition-colors">査定一覧</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/vehicles/${vehicle.id}`} className="hover:text-gray-700 transition-colors">
          {vehicle.manufacturer} {vehicle.carName}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-700 font-medium">査定フォーム</span>
      </nav>

      <div className="flex items-start justify-between">
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
          <p className="text-xs text-gray-400 mt-0.5">{vehicle.registrationNumber}</p>
        </div>
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
                "flex-1 py-2.5 rounded border text-sm font-medium transition-all",
                !hasRepairHistory
                  ? "bg-green-50 border-green-500 text-green-700 font-bold"
                  : "border-border text-muted-foreground hover:border-primary/40"
              )}
            >
              なし
            </button>
            <button
              onClick={() => setHasRepairHistory(true)}
              className={cn(
                "flex-1 py-2.5 rounded border text-sm transition-all",
                hasRepairHistory
                  ? "bg-red-50 border-red-500 text-red-700 font-bold"
                  : "border-border text-muted-foreground hover:border-primary/40"
              )}
            >
              あり（評価R扱い）
            </button>
          </div>
        </CardContent>
      </Card>

      {/* USS総合評価 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">USS評価</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* 総合評価ボタン */}
          <div>
            <p className="text-xs font-medium mb-1">総合評価</p>
            <p className="text-[11px] text-gray-400 mb-2">
              S=特上　6=優上　5=良上　4.5=良　4=良下　3.5=中上　3=中　2=中下　1=劣　R=修復歴
            </p>
            <div className="flex flex-wrap gap-2">
              {USS_GRADES.map((g) => (
                <button
                  key={g}
                  onClick={() => setOverallGrade(g)}
                  className={cn(
                    "min-w-[3rem] h-10 px-2.5 rounded border text-sm font-bold transition-all",
                    overallGrade === g
                      ? cn(getOverallGradeStyle(g), "ring-2 ring-offset-1 ring-current/40 scale-105")
                      : "border-border text-muted-foreground hover:border-primary/40"
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* 外装・内装評価 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium mb-2">外装評価</p>
              <div className="flex gap-2">
                {EXT_INT_GRADES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setExteriorGrade(g)}
                    className={cn(
                      "w-9 h-9 rounded border text-sm font-bold transition-all",
                      exteriorGrade === g
                        ? cn(GRADE_COLOR[g], "ring-2 ring-offset-1 ring-current/30")
                        : "border-border text-muted-foreground hover:border-primary/40"
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium mb-2">内装評価</p>
              <div className="flex gap-2">
                {EXT_INT_GRADES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setInteriorGrade(g)}
                    className={cn(
                      "w-9 h-9 rounded border text-sm font-bold transition-all",
                      interiorGrade === g
                        ? cn(GRADE_COLOR[g], "ring-2 ring-offset-1 ring-current/30")
                        : "border-border text-muted-foreground hover:border-primary/40"
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* キズ・ダメージ記号 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">キズ・ダメージ記号</CardTitle>
            <button
              onClick={addDamageNote}
              className={cn(buttonVariants({ variant: "outline" }), "h-7 text-xs px-3 gap-1")}
            >
              <Plus className="h-3 w-3" />
              追加
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-[11px] text-gray-400">
            A=キズ（A1小〜A3大）　U=ヘコミ　W=修理跡　B=サビ　X=ヒビ
          </p>
          {damageNotes.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4 border border-dashed rounded-lg">
              キズ・ダメージ情報なし
            </p>
          )}
          {damageNotes.map((note, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                className="h-7 text-xs flex-1"
                placeholder="部位（例: フロントバンパー）"
                value={note.location}
                onChange={(e) => updateDamageNote(i, "location", e.target.value)}
              />
              <Input
                className="h-7 text-xs w-16"
                placeholder="コード"
                value={note.code}
                onChange={(e) => updateDamageNote(i, "code", e.target.value)}
              />
              <Input
                className="h-7 text-xs flex-1"
                placeholder="状態説明"
                value={note.description}
                onChange={(e) => updateDamageNote(i, "description", e.target.value)}
              />
              <button
                onClick={() => removeDamageNote(i)}
                className="text-red-400 hover:text-red-600 transition-colors shrink-0"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 外装コンディション詳細 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">外装コンディション詳細</CardTitle>
        </CardHeader>
        <CardContent>
          <ConditionSelector items={EXTERIOR_ITEMS} state={exteriorConditions} setState={setExteriorConditions} />
        </CardContent>
      </Card>

      {/* 内装コンディション詳細 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">内装コンディション詳細</CardTitle>
        </CardHeader>
        <CardContent>
          <ConditionSelector items={INTERIOR_ITEMS} state={interiorConditions} setState={setInteriorConditions} />
        </CardContent>
      </Card>

      {/* 機関系チェック */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">機関系チェック</CardTitle>
        </CardHeader>
        <CardContent>
          <ConditionSelector items={MECHANICAL_ITEMS} state={mechanicalConditions} setState={setMechanicalConditions} />
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
                placeholder="例: 5400000"
                value={marketMin}
                onChange={(e) => setMarketMin(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">相場価格（上限）円</Label>
              <Input
                className="mt-1 h-8 text-sm"
                placeholder="例: 6200000"
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
              placeholder="例: 5800000"
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
