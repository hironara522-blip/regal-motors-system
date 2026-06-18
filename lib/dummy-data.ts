export type VehicleStatus = "IN_PROGRESS" | "COMPLETED" | "PURCHASED" | "DECLINED";

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
  status: VehicleStatus;
  appraisalDate: string;
  purchasePrice?: number;
  marketPriceMin?: number;
  marketPriceMax?: number;
  exteriorGrade?: string;
  hasRepairHistory: boolean;
}

export const DUMMY_VEHICLES: DummyVehicle[] = [
  {
    id: "v001",
    manufacturer: "ホンダ",
    carName: "フィット",
    grade: "e:HEV ホーム",
    registrationNumber: "品川 300 あ 1234",
    chassisNumber: "GD3-1234567",
    modelCode: "6AA-GR3",
    firstRegistrationDate: "令和3年4月",
    inspectionExpiry: "令和8年4月30日",
    displacement: "1,496cc",
    fuel: "ガソリン（ハイブリッド）",
    capacity: "5名",
    vehicleWeight: "1,260kg",
    mileage: "28,500",
    color: "プラチナホワイト・パール",
    status: "IN_PROGRESS",
    appraisalDate: "2026-06-19",
    marketPriceMin: 1_400_000,
    marketPriceMax: 1_680_000,
    exteriorGrade: "A",
    hasRepairHistory: false,
  },
  {
    id: "v002",
    manufacturer: "トヨタ",
    carName: "プリウス",
    grade: "Z",
    registrationNumber: "横浜 300 さ 5678",
    chassisNumber: "ZVW55-0123456",
    modelCode: "DAA-ZVW55",
    firstRegistrationDate: "令和元年9月",
    inspectionExpiry: "令和7年9月30日",
    displacement: "1,798cc",
    fuel: "ガソリン（ハイブリッド）",
    capacity: "5名",
    vehicleWeight: "1,420kg",
    mileage: "52,100",
    color: "エモーショナルレッドII",
    status: "COMPLETED",
    appraisalDate: "2026-06-17",
    purchasePrice: 1_480_000,
    marketPriceMin: 1_350_000,
    marketPriceMax: 1_580_000,
    exteriorGrade: "B",
    hasRepairHistory: false,
  },
  {
    id: "v003",
    manufacturer: "日産",
    carName: "ノート",
    grade: "X",
    registrationNumber: "名古屋 300 に 9012",
    chassisNumber: "E13-012345",
    modelCode: "5AA-E13",
    firstRegistrationDate: "令和2年12月",
    inspectionExpiry: "令和7年12月10日",
    displacement: "1,198cc",
    fuel: "ガソリン（e-POWER）",
    capacity: "5名",
    vehicleWeight: "1,210kg",
    mileage: "41,800",
    color: "ブリリアントシルバー",
    status: "PURCHASED",
    appraisalDate: "2026-06-16",
    purchasePrice: 980_000,
    marketPriceMin: 850_000,
    marketPriceMax: 1_050_000,
    exteriorGrade: "B",
    hasRepairHistory: false,
  },
  {
    id: "v004",
    manufacturer: "マツダ",
    carName: "CX-5",
    grade: "25S プロアクティブ",
    registrationNumber: "大阪 330 ま 3456",
    chassisNumber: "KF2P-123456",
    modelCode: "3DA-KF2P",
    firstRegistrationDate: "平成30年8月",
    inspectionExpiry: "令和8年8月31日",
    displacement: "2,488cc",
    fuel: "ガソリン",
    capacity: "5名",
    vehicleWeight: "1,590kg",
    mileage: "68,000",
    color: "ソウルレッドクリスタルメタリック",
    status: "COMPLETED",
    appraisalDate: "2026-06-14",
    purchasePrice: 1_680_000,
    marketPriceMin: 1_500_000,
    marketPriceMax: 1_850_000,
    exteriorGrade: "A",
    hasRepairHistory: false,
  },
  {
    id: "v005",
    manufacturer: "スズキ",
    carName: "スイフト",
    grade: "XG",
    registrationNumber: "神戸 500 す 7890",
    chassisNumber: "ZC83S-789012",
    modelCode: "DAA-ZC83S",
    firstRegistrationDate: "令和4年3月",
    inspectionExpiry: "令和8年3月15日",
    displacement: "1,197cc",
    fuel: "ガソリン（マイルドハイブリッド）",
    capacity: "5名",
    vehicleWeight: "910kg",
    mileage: "15,200",
    color: "ピュアホワイトパール",
    status: "IN_PROGRESS",
    appraisalDate: "2026-06-13",
    marketPriceMin: 1_100_000,
    marketPriceMax: 1_350_000,
    exteriorGrade: "S",
    hasRepairHistory: false,
  },
];

export const OCR_DUMMY = DUMMY_VEHICLES[0];

export const STATUS_LABEL: Record<VehicleStatus, string> = {
  IN_PROGRESS: "査定中",
  COMPLETED:   "査定完了",
  PURCHASED:   "買取済み",
  DECLINED:    "見送り",
};

export const STATUS_COLOR: Record<VehicleStatus, string> = {
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED:   "bg-green-100 text-green-700",
  PURCHASED:   "bg-purple-100 text-purple-700",
  DECLINED:    "bg-gray-100 text-gray-500",
};

export const GRADE_COLOR: Record<string, string> = {
  S: "bg-yellow-100 text-yellow-700 border-yellow-300",
  A: "bg-green-100 text-green-700 border-green-300",
  B: "bg-blue-100 text-blue-700 border-blue-300",
  C: "bg-orange-100 text-orange-700 border-orange-300",
  D: "bg-red-100 text-red-700 border-red-300",
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
