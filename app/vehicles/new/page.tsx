"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OCR_DUMMY } from "@/lib/dummy-data";
import {
  ScanLine, Upload, CheckCircle2, AlertCircle,
  RotateCcw, ChevronRight, Car, FileImage,
} from "lucide-react";
import Link from "next/link";

type Step = "upload" | "scanning" | "result" | "done";

const SCAN_MESSAGES = [
  "画像を解析しています...",
  "文字を認識しています...",
  "車台番号を抽出しています...",
  "型式・年式を読み取っています...",
  "データを整理しています...",
];

const OCR_FIELDS = [
  { key: "registrationNumber",    label: "自動車登録番号（ナンバー）",   confidence: 97 },
  { key: "chassisNumber",         label: "車台番号",                      confidence: 99 },
  { key: "modelCode",             label: "型式",                          confidence: 95 },
  { key: "manufacturer",          label: "メーカー",                      confidence: 99 },
  { key: "carName",               label: "車名・グレード",                confidence: 96 },
  { key: "firstRegistrationDate", label: "初度登録年月",                  confidence: 98 },
  { key: "inspectionExpiry",      label: "車検満了日",                    confidence: 99 },
  { key: "displacement",          label: "排気量",                        confidence: 97 },
  { key: "fuel",                  label: "燃料の種類",                    confidence: 99 },
  { key: "capacity",              label: "乗車定員",                      confidence: 99 },
  { key: "vehicleWeight",         label: "車両重量",                      confidence: 98 },
  { key: "color",                 label: "車体の色",                      confidence: 92 },
] as const;

type FieldKey = typeof OCR_FIELDS[number]["key"];

export default function NewVehiclePage() {
  const [step, setStep] = useState<Step>("upload");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [fields, setFields] = useState<Record<string, string>>(
    Object.fromEntries(OCR_FIELDS.map((f) => [f.key, OCR_DUMMY[f.key] ?? ""]))
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startScanning = useCallback(() => {
    setStep("scanning");
    setProgress(0);
    setMsgIndex(0);
  }, []);

  useEffect(() => {
    if (step !== "scanning") return;
    let prog = 0;
    const timer = setInterval(() => {
      prog += Math.random() * 8 + 4;
      const capped = Math.min(prog, 100);
      setProgress(capped);
      setMsgIndex(Math.min(
        Math.floor((capped / 100) * SCAN_MESSAGES.length),
        SCAN_MESSAGES.length - 1
      ));
      if (prog >= 100) {
        clearInterval(timer);
        setTimeout(() => setStep("result"), 400);
      }
    }, 180);
    return () => clearInterval(timer);
  }, [step]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    startScanning();
  }, [startScanning]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const reset = () => {
    setStep("upload");
    setImageUrl(null);
    setProgress(0);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/vehicles" className="text-sm text-muted-foreground hover:text-foreground">
          車両一覧
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-sm font-medium">車検証読取・新規登録</span>
      </div>

      {/* ステップインジケーター */}
      <div className="flex items-center gap-2 text-sm">
        {(["upload", "scanning", "result", "done"] as Step[]).map((s, i) => {
          const stepNames = ["アップロード", "スキャン中", "結果確認", "完了"];
          const isActive = step === s;
          const isDone = (["upload", "scanning", "result", "done"] as Step[]).indexOf(step) > i;
          return (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                isActive && "bg-primary text-primary-foreground",
                isDone && "bg-green-500 text-white",
                !isActive && !isDone && "bg-muted text-muted-foreground"
              )}>
                {isDone ? "✓" : i + 1}
              </div>
              <span className={cn(
                "hidden sm:block",
                isActive ? "text-foreground font-medium" : "text-muted-foreground"
              )}>
                {stepNames[i]}
              </span>
              {i < 3 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
            </div>
          );
        })}
      </div>

      {/* ステップ1: アップロード */}
      {step === "upload" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ScanLine className="h-5 w-5" />
              車検証の画像をアップロード
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-xl p-6 sm:p-12 text-center cursor-pointer transition-all",
                isDragOver
                  ? "border-primary bg-primary/5 scale-[1.01]"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              )}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                  <Upload className="h-7 w-7 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {isDragOver ? "ここにドロップ" : "クリックまたはドラッグ＆ドロップ"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG・PNG・HEIC対応　最大10MB
                  </p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30">
              <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
              <div className="text-xs text-blue-700 dark:text-blue-300">
                <p className="font-medium">撮影のコツ</p>
                <p>車検証全体が映るよう、明るい場所で真上から撮影してください。2023年以降の電子車検証のQRコードも読み取り対応しています。</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ステップ2: スキャン中 */}
      {step === "scanning" && (
        <Card>
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="車検証プレビュー"
                    className="w-40 h-28 object-cover rounded-lg border opacity-60"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ScanLine className="h-5 w-5 text-primary animate-pulse" />
                  </div>
                </div>
                {/* スキャンライン */}
                <div
                  className="absolute left-0 right-0 h-0.5 bg-primary/60 shadow-[0_0_8px_2px_hsl(var(--primary)/0.4)] transition-all duration-300"
                  style={{ top: `${progress}%` }}
                />
              </div>

              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{SCAN_MESSAGES[msgIndex]}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                AIが車検証を読み取っています。しばらくお待ちください...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ステップ3: 結果確認 */}
      {step === "result" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium text-sm">読み取り完了</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                平均信頼度 97%
              </span>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              やり直す
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 画像プレビュー */}
            {imageUrl && (
              <Card className="md:col-span-2">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-3">
                    <FileImage className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">アップロードした車検証</span>
                  </div>
                  <img
                    src={imageUrl}
                    alt="車検証"
                    className="mt-2 max-h-40 rounded-lg border object-contain"
                  />
                </CardContent>
              </Card>
            )}

            {/* 抽出フィールド */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  読み取り結果（修正可能）
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {OCR_FIELDS.map((f) => (
                    <div key={f.key}>
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-xs">{f.label}</Label>
                        <span className={cn(
                          "text-xs",
                          f.confidence >= 95 ? "text-green-600" : "text-orange-500"
                        )}>
                          {f.confidence}%
                        </span>
                      </div>
                      <Input
                        value={fields[f.key]}
                        onChange={(e) =>
                          setFields((prev) => ({ ...prev, [f.key]: e.target.value }))
                        }
                        className="h-8 text-sm"
                      />
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex items-center gap-3 justify-end">
                  <button
                    onClick={reset}
                    className={cn(buttonVariants({ variant: "outline" }), "text-sm h-8")}
                  >
                    やり直す
                  </button>
                  <button
                    onClick={() => setStep("done")}
                    className={cn(buttonVariants(), "text-sm h-8 gap-1.5")}
                  >
                    確認して査定へ進む
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ステップ4: 完了 */}
      {step === "done" && (
        <Card>
          <CardContent className="pt-10 pb-10">
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-bold">車両情報を登録しました</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {fields.manufacturer} {fields.carName}（{fields.registrationNumber}）
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/appraisal/v001"
                  className={cn(buttonVariants(), "gap-2")}
                >
                  <ScanLine className="h-4 w-4" />
                  査定フォームへ進む
                </Link>
                <Link
                  href="/vehicles"
                  className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
                >
                  <Car className="h-4 w-4" />
                  車両一覧に戻る
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
