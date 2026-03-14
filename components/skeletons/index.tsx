import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="rounded-2xl border bg-card p-6 space-y-4">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-5/6" />
      ))}
    </div>
  );
}

export function VisaSuggestionResultSkeleton() {
  return (
    <div className="bg-card border p-8 rounded-xl space-y-5 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-3/4" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-52" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-44" />
      </div>
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 flex-1 rounded-md" />
      </div>
    </div>
  );
}

export function NavbarSkeleton() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 h-16 flex items-center px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <div className="hidden md:flex gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-20" />
          ))}
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="py-28 space-y-6 container mx-auto px-4 text-center">
      <Skeleton className="h-4 w-40 mx-auto rounded-full" />
      <Skeleton className="h-16 w-3/4 mx-auto" />
      <Skeleton className="h-16 w-2/3 mx-auto" />
      <Skeleton className="h-5 w-1/2 mx-auto" />
      <div className="flex gap-4 justify-center pt-4">
        <Skeleton className="h-12 w-40 rounded-full" />
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>
    </section>
  );
}
