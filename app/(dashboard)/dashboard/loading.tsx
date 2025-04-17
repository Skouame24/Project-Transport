import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-8 w-[200px]" />
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(null).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-[140px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[100px] mb-2" />
              <Skeleton className="h-3 w-[160px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Array(2).fill(null).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-[200px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}