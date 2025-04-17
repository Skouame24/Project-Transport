import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function NouveauCertificatLoading() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-8 w-[250px]" />
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[300px]" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-4">
            {Array(3).fill(null).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}