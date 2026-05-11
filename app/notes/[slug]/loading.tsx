import { Skeleton } from "@/components/common/Skeleton";
import { Separator } from "@/components/ui/separator";
import { Music, Film, Mic, Scale, Key as MusicKey } from "lucide-react";

export default function SongLoading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* Top Loading Progress Bar (Nice UI touch) */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 overflow-hidden">
        <div className="h-full bg-primary animate-progress-loading" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>

            <Skeleton className="h-10 w-3/4 md:h-12" />

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-1">
                <Film className="h-4 w-4 text-muted-foreground/40" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center gap-1">
                <Music className="h-4 w-4 text-muted-foreground/40" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="flex items-center gap-1">
                <Mic className="h-4 w-4 text-muted-foreground/40" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Piano Scale Skeleton */}
          <div className="rounded-xl border bg-muted/20 p-6 space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>

          {/* Details Grid Skeleton */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-3">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>

          {/* Notes Content Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Music className="h-6 w-6 text-primary/40" />
              <Skeleton className="h-8 w-40" />
            </div>
            <div className="space-y-2 rounded-xl border bg-card p-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className={`h-4 ${i % 2 === 0 ? 'w-full' : 'w-5/6'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-8">
          <div className="sticky top-24 space-y-8">
            <Skeleton className="h-[300px] w-full rounded-xl" />
            
            <div className="space-y-4">
              <Skeleton className="h-7 w-32" />
              <div className="grid gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex flex-col gap-2 rounded-xl border p-3">
                    <Skeleton className="aspect-video w-full rounded-lg" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
