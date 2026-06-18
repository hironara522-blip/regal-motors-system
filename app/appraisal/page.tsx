import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AppraisalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">査定一覧</h1>
        <p className="text-muted-foreground text-sm mt-1">査定中・完了・買取済みの車両</p>
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
            <ClipboardList className="h-12 w-12 opacity-30" />
            <p className="text-sm">査定データがありません</p>
            <Link href="/vehicles/new" className={cn(buttonVariants({ variant: "outline" }))}>
              新規査定を開始する
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
