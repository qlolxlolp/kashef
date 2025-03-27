"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Miner {
  id: string
  ip: string
  mac: string
  hostname: string
  vendor: string
  lastSeen: string
  trafficVolume: number
  minerType: string
  hashRate: number
  confidence: number
  location: {
    city: string
    region: string
    country: string
    lat: number
    lon: number
  }
  connectionHistory: {
    timestamp: string
    trafficVolume: number
  }[]
}

interface MinerDetectorProps {
  miners: Miner[]
  onSelectMiner: (miner: Miner) => void
}

export function MinerDetector({ miners, onSelectMiner }: MinerDetectorProps) {
  const [selectedMiner, setSelectedMiner] = useState<Miner | null>(null)

  const handleSelectMiner = (miner: Miner) => {
    setSelectedMiner(miner)
    onSelectMiner(miner)
  }

  const totalHashRate = miners.reduce((sum, miner) => sum + miner.hashRate, 0)

  const minersByType = miners.reduce(
    (acc, miner) => {
      acc[miner.minerType] = (acc[miner.minerType] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const minerTypeData = Object.entries(minersByType).map(([name, value]) => ({ name, value }))

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>تعداد ماینرها</CardTitle>
            <CardDescription>تعداد کل ماینرهای شناسایی شده</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-red-500">{miners.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>نرخ هش کل</CardTitle>
            <CardDescription>مجموع نرخ هش تمام ماینرها</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalHashRate.toFixed(2)} MH/s</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>نوع ماینرها</CardTitle>
            <CardDescription>توزیع انواع ماینرهای شناسایی شده</CardDescription>
          </CardHeader>
          <CardContent className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={minerTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">آدرس IP</TableHead>
              <TableHead>آدرس MAC</TableHead>
              <TableHead>نوع ماینر</TableHead>
              <TableHead>نرخ هش</TableHead>
              <TableHead>اطمینان</TableHead>
              <TableHead>موقعیت</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {miners.length > 0 ? (
              miners.map((miner) => (
                <TableRow key={miner.id}>
                  <TableCell>{miner.ip}</TableCell>
                  <TableCell className="font-mono">{miner.mac}</TableCell>
                  <TableCell>{miner.minerType}</TableCell>
                  <TableCell>{miner.hashRate.toFixed(2)} MH/s</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={miner.confidence * 100} className="h-2" />
                      <span>{(miner.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {miner.location.city}, {miner.location.region}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleSelectMiner(miner)}>
                      جزئیات
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  هیچ ماینری یافت نشد
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedMiner && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>جزئیات ماینر - {selectedMiner.ip}</CardTitle>
            <CardDescription>
              {selectedMiner.hostname} | {selectedMiner.vendor} | {selectedMiner.minerType}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="traffic">
              <TabsList>
                <TabsTrigger value="traffic">ترافیک</TabsTrigger>
                <TabsTrigger value="connections">اتصالات</TabsTrigger>
                <TabsTrigger value="details">مشخصات فنی</TabsTrigger>
              </TabsList>

              <TabsContent value="traffic">
                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedMiner.connectionHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="timestamp"
                        tickFormatter={(value) => new Date(value).toLocaleTimeString("fa-IR")}
                      />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(value) => new Date(value).toLocaleString("fa-IR")}
                        formatter={(value) => [((value as number) / 1024 / 1024).toFixed(2) + " MB"]}
                      />
                      <Bar dataKey="trafficVolume" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="connections">
                <div className="mt-4">
                  <p>اطلاعات اتصالات در حال بارگذاری...</p>
                </div>
              </TabsContent>

              <TabsContent value="details">
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">مشخصات دستگاه</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">IP:</span> {selectedMiner.ip}
                      </li>
                      <li>
                        <span className="font-medium">MAC:</span> {selectedMiner.mac}
                      </li>
                      <li>
                        <span className="font-medium">نام میزبان:</span> {selectedMiner.hostname}
                      </li>
                      <li>
                        <span className="font-medium">سازنده:</span> {selectedMiner.vendor}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">مشخصات ماینر</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">نوع:</span> {selectedMiner.minerType}
                      </li>
                      <li>
                        <span className="font-medium">نرخ هش:</span> {selectedMiner.hashRate.toFixed(2)} MH/s
                      </li>
                      <li>
                        <span className="font-medium">اطمینان:</span> {(selectedMiner.confidence * 100).toFixed(0)}%
                      </li>
                      <li>
                        <span className="font-medium">آخرین مشاهده:</span>{" "}
                        {new Date(selectedMiner.lastSeen).toLocaleString("fa-IR")}
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

