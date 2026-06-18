import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, ClipboardList, ScanLine, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ダッシュボード</h1>
        <p className="text-muted-foreground text-sm mt-1">買取査定の管理・比較検討</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/vehicles/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <ScanLine className="h-5 w-5 text-primary" />
                車検証を読み取る
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                車検証を撮影・アップロードして車両情報を自動入力。OCRとQRコード両対応。
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/vehicles">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                車両一覧
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                登録済み車両の確認・査定フォームへの移動。
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/appraisal">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                査定一覧
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                査定中・完了・買取済みの車両を一覧で管理。
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            直近の査定
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground py-8 text-center">
            まだ査定データがありません。「車検証を読み取る」から開始してください。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
