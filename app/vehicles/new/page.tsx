import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanLine } from "lucide-react";

export default function NewVehiclePage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">車検証読取・新規登録</h1>
        <p className="text-muted-foreground text-sm mt-1">
          車検証の画像をアップロードすると、車両情報が自動入力されます
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ScanLine className="h-5 w-5" />
            車検証のアップロード
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground">
            <ScanLine className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">ここに実装予定（Phase 2）</p>
            <p className="text-xs mt-1">画像ドラッグ&amp;ドロップ or カメラ撮影</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
