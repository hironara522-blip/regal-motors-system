import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Car, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function VehiclesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">車両一覧</h1>
          <p className="text-muted-foreground text-sm mt-1">登録済み車両の管理</p>
        </div>
        <Link href="/vehicles/new" className={cn(buttonVariants())}>
          <Plus className="h-4 w-4 mr-1" />
          新規登録
        </Link>
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
            <Car className="h-12 w-12 opacity-30" />
            <p className="text-sm">登録された車両がありません</p>
            <Link href="/vehicles/new" className={cn(buttonVariants({ variant: "outline" }))}>
              車検証を読み取って登録する
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
