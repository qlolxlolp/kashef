"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Download, FileText, Printer, Share2 } from "lucide-react"

interface Device {
  id: string
  ip: string
  mac: string
  hostname: string
  vendor: string
  isMiner: boolean
}

interface ReportGeneratorProps {
  devices: Device[]
  miners: Device[]
}

export function ReportGenerator({ devices, miners }: ReportGeneratorProps) {
  const [reportType, setReportType] = useState("summary")
  const [timeRange, setTimeRange] = useState("today")
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)

  const [includeOptions, setIncludeOptions] = useState({
    networkTopology: true,
    minerDetails: true,
    locationData: true,
    trafficAnalysis: true,
  })

  const handleGenerateReport = () => {
    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      setReportGenerated(true)
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>تنظیمات گزارش</CardTitle>
          <CardDescription>پارامترهای گزارش را تنظیم کنید</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="report-type">نوع گزارش</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="انتخاب نوع گزارش" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">خلاصه</SelectItem>
                <SelectItem value="detailed">جزئیات کامل</SelectItem>
                <SelectItem value="miners-only">فقط ماینرها</SelectItem>
                <SelectItem value="location">موقعیت‌یابی</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-range">بازه زمانی</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger id="time-range">
                <SelectValue placeholder="انتخاب بازه زمانی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">امروز</SelectItem>
                <SelectItem value="yesterday">دیروز</SelectItem>
                <SelectItem value="week">هفته اخیر</SelectItem>
                <SelectItem value="month">ماه اخیر</SelectItem>
                <SelectItem value="custom">سفارشی</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>شامل موارد</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="network-topology"
                  checked={includeOptions.networkTopology}
                  onCheckedChange={(checked) => setIncludeOptions({ ...includeOptions, networkTopology: !!checked })}
                />
                <Label htmlFor="network-topology" className="mr-2">
                  توپولوژی شبکه
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="miner-details"
                  checked={includeOptions.minerDetails}
                  onCheckedChange={(checked) => setIncludeOptions({ ...includeOptions, minerDetails: !!checked })}
                />
                <Label htmlFor="miner-details" className="mr-2">
                  جزئیات ماینرها
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="location-data"
                  checked={includeOptions.locationData}
                  onCheckedChange={(checked) => setIncludeOptions({ ...includeOptions, locationData: !!checked })}
                />
                <Label htmlFor="location-data" className="mr-2">
                  داده‌های موقعیت
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="traffic-analysis"
                  checked={includeOptions.trafficAnalysis}
                  onCheckedChange={(checked) => setIncludeOptions({ ...includeOptions, trafficAnalysis: !!checked })}
                />
                <Label htmlFor="traffic-analysis" className="mr-2">
                  تحلیل ترافیک
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateReport} disabled={isGenerating} className="w-full">
            {isGenerating ? "در حال تولید گزارش..." : "تولید گزارش"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>پیش‌نمایش گزارش</CardTitle>
          <CardDescription>
            {reportGenerated
              ? "گزارش تولید شده آماده دانلود است"
              : "پس از تولید گزارش، پیش‌نمایش آن را اینجا مشاهده کنید"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reportGenerated ? (
            <div className="border rounded-md p-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">گزارش تحلیل شبکه</h2>
                <p className="text-muted-foreground">
                  {timeRange === "today"
                    ? "امروز"
                    : timeRange === "yesterday"
                      ? "دیروز"
                      : timeRange === "week"
                        ? "هفته اخیر"
                        : timeRange === "month"
                          ? "ماه اخیر"
                          : "بازه سفارشی"}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">خلاصه</h3>
                  <p>تعداد کل دستگاه‌های شناسایی شده: {devices.length}</p>
                  <p>تعداد ماینرهای شناسایی شده: {miners.length}</p>
                </div>

                {includeOptions.minerDetails && miners.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">ماینرهای شناسایی شده</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {miners.slice(0, 3).map((miner) => (
                        <li key={miner.id}>
                          {miner.ip} ({miner.hostname})
                        </li>
                      ))}
                      {miners.length > 3 && <li>و {miners.length - 3} مورد دیگر...</li>}
                    </ul>
                  </div>
                )}

                {includeOptions.locationData && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">پراکندگی جغرافیایی</h3>
                    <p>استان ایلام، شهرهای مختلف</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center border rounded-md">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
                <p className="mt-2">پیش‌نمایش گزارش</p>
                <p className="text-sm text-muted-foreground">برای مشاهده پیش‌نمایش، گزارش را تولید کنید</p>
              </div>
            </div>
          )}
        </CardContent>
        {reportGenerated && (
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              چاپ
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              اشتراک‌گذاری
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              دانلود
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

