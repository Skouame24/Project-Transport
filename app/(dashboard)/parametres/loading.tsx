import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ParametresLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-10 w-[100px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Table>
                <TableHeader>
                  <TableRow>
                    {Array(5).fill(null).map((_, i) => (
                      <TableHead key={i}>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array(5).fill(null).map((_, i) => (
                    <TableRow key={i}>
                      {Array(5).fill(null).map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}