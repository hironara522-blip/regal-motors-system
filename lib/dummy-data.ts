export type VehicleStatus = "IN_PROGRESS" | "COMPLETED" | "PURCHASED" | "DECLINED";

export interface DamageNote {
  location: string;
  code: string;
  description: string;
}

export interface DummyVehicle {
  id: string;
  manufacturer: string;
  carName: string;
  grade: string;
  registrationNumber: string;
  chassisNumber: string;
  modelCode: string;
  firstRegistrationDate: string;
  inspectionExpiry: string;
  displacement: string;
  fuel: string;
  capacity: string;
  vehicleWeight: string;
  mileage: string;
  color: string;
  imageUrl?: string;
  status: VehicleStatus;
  appraisalDate: string;
  overallGrade: string;
  exteriorGrade: string;
  interiorGrade: string;
  hasRepairHistory: boolean;
  purchasePrice?: number;
  marketPriceMin?: number;
  marketPriceMax?: number;
  damageNotes: DamageNote[];
  specialNotes: string[];
}

export const DUMMY_VEHICLES: DummyVehicle[] = [
  {
    id: "v001",
    manufacturer: "トヨタ",
    carName: "クラウンセダン",
    grade: "2.5 Elegant",
    registrationNumber: "名古屋 301 あ 1234",
    chassisNumber: "TZSH35-0000123",
    modelCode: "6AA-TZSH35",
    firstRegistrationDate: "令和5年11月",
    inspectionExpiry: "令和9年11月30日",
    displacement: "2,487cc",
    fuel: "ガソリン（ハイブリッド）",
    capacity: "5名",
    vehicleWeight: "1,900kg",
    mileage: "8,200",
    color: "ブラック（トヨタカラーコード：202）",
    imageUrl: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&h=450&q=80",
    status: "COMPLETED",
    appraisalDate: "2026-06-19",
    overallGrade: "4.5",
    exteriorGrade: "A",
    interiorGrade: "A",
    hasRepairHistory: false,
    purchasePrice: 5_800_000,
    marketPriceMin: 5_400_000,
    marketPriceMax: 6_200_000,
    damageNotes: [
      { location: "フロントバンパー", code: "A1", description: "極細スリキズ（1本・長さ約3cm）" },
      { location: "左フロントドア",   code: "A2", description: "細スリキズ×2（各10cm以内）" },
    ],
    specialNotes: [
      "ワンオーナー（個人ユーザー・法人所有歴なし）",
      "ディーラー整備記録簿完備（全整備記録：3回、最終整備2026年4月）",
      "メーカー保証残3年4ヶ月（2030年3月まで）",
      "禁煙車",
      "フロントグリル・ヘッドライト周りブラックアウト仕様（ガーニッシュ・グリルモール・エンブレムベゼル全ブラック塗装済み）",
      "フューエルリッドに青色の「AICHI」ロゴデカール貼付（カーボン調 Mサイズ）",
      "純正19インチアルミホイール装着（ブリヂストン POTENZA S007A 245/40R19 残7分山 製造2024年）",
      "JBLプレミアムサウンドシステム（12スピーカー・低音増強サブウーファー付き）",
      "パノラミックビューモニター（全周囲カメラ・クリアランスソナー連動）",
      "デジタルインナーミラー（前後2カメラ ドライブレコーダー機能内蔵・SDカード32GB付き）",
      "ヘッドアップディスプレイ（HUD・全情報表示型）",
      "ETC2.0（純正品・セットアップ済み・DSRC通信対応）",
      "プリクラッシュセーフティ（夜間歩行者・自転車検知・交差点右折待ち支援付き）",
      "レーントレーシングアシスト（LTA）・ブラインドスポットモニター（BSM）",
      "後席リクライニング・シートヒーター前後席標準装備",
      "電動リアサンシェード（前後ドア全席展開可）",
    ],
  },
  {
    id: "v002",
    manufacturer: "レクサス",
    carName: "RX 500h",
    grade: "F SPORT Performance",
    registrationNumber: "名古屋 303 そ 5678",
    chassisNumber: "TALH17-0005678",
    modelCode: "6AA-TALH17",
    firstRegistrationDate: "令和5年3月",
    inspectionExpiry: "令和9年3月31日",
    displacement: "2,393cc",
    fuel: "ガソリン（ハイブリッド）",
    capacity: "5名",
    vehicleWeight: "2,140kg",
    mileage: "15,600",
    color: "ヒートブルーコントラストレイヤリング",
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&h=450&q=80",
    status: "COMPLETED",
    appraisalDate: "2026-06-17",
    overallGrade: "5",
    exteriorGrade: "A",
    interiorGrade: "A",
    hasRepairHistory: false,
    purchasePrice: 8_200_000,
    marketPriceMin: 7_800_000,
    marketPriceMax: 8_900_000,
    damageNotes: [],
    specialNotes: [
      "禁煙車",
      "OP総額約150万円",
      "電動パノラマサンルーフ",
      "ヘッドアップディスプレイ（HUD）",
      "パノラミックビューモニター",
      "純正21インチアルミホイール（ブリヂストン POTENZA S001 255/45R21）",
      "Mark Levinson® プレミアムサラウンドサウンドシステム（17スピーカー）",
    ],
  },
  {
    id: "v003",
    manufacturer: "トヨタ",
    carName: "ランドクルーザー300",
    grade: "ZX",
    registrationNumber: "豊田 334 ろ 9012",
    chassisNumber: "FJA300W-0009012",
    modelCode: "3BA-FJA300W",
    firstRegistrationDate: "令和4年8月",
    inspectionExpiry: "令和8年8月31日",
    displacement: "3,345cc",
    fuel: "ディーゼル",
    capacity: "8名",
    vehicleWeight: "2,560kg",
    mileage: "31,500",
    color: "プレシャスシルバー",
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&h=450&q=80",
    status: "IN_PROGRESS",
    appraisalDate: "2026-06-19",
    overallGrade: "4",
    exteriorGrade: "B",
    interiorGrade: "A",
    hasRepairHistory: false,
    marketPriceMin: 8_500_000,
    marketPriceMax: 9_500_000,
    damageNotes: [
      { location: "右フロントドア",  code: "U1", description: "小ヘコミ（直径10mm程度）" },
      { location: "左リアバンパー",  code: "A3", description: "スリキズ大（縦方向15cm）" },
      { location: "ルーフ",          code: "B1", description: "飛び石によるサビ点×3" },
    ],
    specialNotes: [
      "2オーナー",
      "ルーフラック装着（INNO製）",
      "サイドステップ装着（純正OP）",
      "タイヤ残7〜8分山（ブリヂストン DUELER H/L 850 265/65R17）",
      "純正デジタルインナーミラー",
      "マルチテレインセレクト・クロールコントロール付",
    ],
  },
  {
    id: "v004",
    manufacturer: "マツダ",
    carName: "CX-60",
    grade: "PHEV Premium Modern",
    registrationNumber: "岡崎 308 み 3456",
    chassisNumber: "KH3R-0003456",
    modelCode: "5LA-KH3R",
    firstRegistrationDate: "令和4年12月",
    inspectionExpiry: "令和8年12月10日",
    displacement: "2,488cc",
    fuel: "プラグインハイブリッド",
    capacity: "5名",
    vehicleWeight: "2,050kg",
    mileage: "22,100",
    color: "アーティザンレッドプレミアムメタリック",
    imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&h=450&q=80",
    status: "PURCHASED",
    appraisalDate: "2026-06-16",
    overallGrade: "R",
    exteriorGrade: "C",
    interiorGrade: "B",
    hasRepairHistory: true,
    purchasePrice: 2_800_000,
    marketPriceMin: 2_500_000,
    marketPriceMax: 3_200_000,
    damageNotes: [
      { location: "右フロントフェンダー", code: "W2", description: "板金修理跡・色味差あり" },
      { location: "フロントバンパー",     code: "W1", description: "補修跡（軽微）" },
    ],
    specialNotes: [
      "修復歴あり（右フロントサイドメンバー修正）",
      "2オーナー",
      "車検2年付き",
      "レザーシート（ナッパレザー）",
      "純正18インチアルミホイール（ミシュラン Pilot Sport 4 SUV 235/50R18 残5分山）",
      "BOSEサウンドシステム（12スピーカー）",
      "360°ビューモニター",
    ],
  },
  {
    id: "v005",
    manufacturer: "ホンダ",
    carName: "N-BOX Custom",
    grade: "G L Honda SENSING ターボ",
    registrationNumber: "春日井 581 す 7890",
    chassisNumber: "JF5-0007890",
    modelCode: "6BA-JF5",
    firstRegistrationDate: "令和5年12月",
    inspectionExpiry: "令和9年12月15日",
    displacement: "658cc",
    fuel: "ガソリン（ターボ）",
    capacity: "4名",
    vehicleWeight: "930kg",
    mileage: "4,100",
    color: "プレミアムクリスタルエナジーグリーン・パール",
    imageUrl: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=450&q=80",
    status: "IN_PROGRESS",
    appraisalDate: "2026-06-18",
    overallGrade: "5",
    exteriorGrade: "A",
    interiorGrade: "A",
    hasRepairHistory: false,
    marketPriceMin: 1_950_000,
    marketPriceMax: 2_300_000,
    damageNotes: [],
    specialNotes: [
      "ワンオーナー（個人ユーザー）",
      "新車登録後7ヶ月",
      "ホンダ保証残3年5ヶ月（2030年5月まで）",
      "禁煙車",
      "ディーラー整備記録簿完備",
      "純正14インチアルミホイール装着（ブリヂストン ECOPIA EP150 155/65R14）",
      "Honda SENSING全装備（衝突軽減・車線維持・ACC）",
      "両側電動スライドドア",
      "ナビ装着スペシャルパッケージ",
    ],
  },
];

export const OCR_DUMMY = DUMMY_VEHICLES[0];

// --- 表示ヘルパー ---

export const STATUS_LABEL: Record<VehicleStatus, string> = {
  IN_PROGRESS: "査定中",
  COMPLETED:   "査定完了",
  PURCHASED:   "買取済み",
  DECLINED:    "見送り",
};

export const STATUS_COLOR: Record<VehicleStatus, string> = {
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED:   "bg-emerald-100 text-emerald-700",
  PURCHASED:   "bg-violet-100 text-violet-700",
  DECLINED:    "bg-gray-100 text-gray-500",
};

// 外装・内装グレード A/B/C/D — ゴールド / シルバー / 銅 / 深紅
export const GRADE_COLOR: Record<string, string> = {
  A: "bg-amber-50 text-amber-800 border-amber-400",
  B: "bg-zinc-50 text-zinc-600 border-zinc-400",
  C: "bg-orange-50 text-orange-700 border-orange-400",
  D: "bg-rose-50 text-rose-700 border-rose-400",
};

export const USS_GRADES = ["S", "6", "5", "4.5", "4", "3.5", "3", "2", "1", "R"] as const;
export type UssGrade = typeof USS_GRADES[number];

export const USS_GRADE_LABEL: Record<string, string> = {
  "S": "特上", "6": "優上", "5": "良上",
  "4.5": "良", "4": "良下",
  "3.5": "中上", "3": "中",
  "2": "中下", "1": "劣",
  "R": "修復歴", "RA": "修復良",
};

// USS総合評価バッジ配色
// S/6/5 → ゴールド（シャンパン）、4.5/4 → シルバー、3.5/3 → カッパー（銅）、2/1 → 深い警告、R/RA → 深紅
export function getOverallGradeStyle(grade: string): string {
  if (["S", "6", "5"].includes(grade))
    return "bg-amber-50 text-amber-800 border-amber-400";
  if (["4.5", "4"].includes(grade))
    return "bg-zinc-50 text-zinc-700 border-zinc-400";
  if (["3.5", "3"].includes(grade))
    return "bg-orange-50 text-orange-700 border-orange-400";
  if (["2", "1"].includes(grade))
    return "bg-rose-50 text-rose-700 border-rose-400";
  if (["R", "RA"].includes(grade))
    return "bg-red-100 text-red-900 border-red-600";
  return "bg-zinc-50 text-zinc-600 border-zinc-300";
}

export function getDamageCodeStyle(code: string): string {
  if (code.startsWith("A")) return "bg-orange-50 text-orange-700 border-orange-400";  // キズ: カッパー
  if (code.startsWith("U")) return "bg-zinc-50 text-zinc-600 border-zinc-400";        // ヘコミ: シルバー
  if (code.startsWith("W")) return "bg-rose-50 text-rose-800 border-rose-500";       // 修理跡: 深紅
  if (code.startsWith("B")) return "bg-amber-50 text-amber-700 border-amber-400";    // サビ: ゴールド系
  if (code.startsWith("X")) return "bg-red-100 text-red-900 border-red-600";         // ヒビ/割れ: 深紅
  return "bg-zinc-50 text-zinc-600 border-zinc-300";
}

export const DAMAGE_CODE_LABEL: Record<string, string> = {
  A: "キズ", U: "ヘコミ", W: "修理跡", B: "サビ", X: "ヒビ/割れ", XX: "穴", S: "折れ",
};

export function formatPrice(price: number): string {
  return `¥${price.toLocaleString("ja-JP")}`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 86_400_000);
  if (diff === 0) return "本日";
  if (diff === 1) return "1日前";
  return `${diff}日前`;
}
