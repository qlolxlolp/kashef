"use client"

import { useState, useEffect } from "react"
import { MinimalLayout } from "@/components/minimal-layout"
import dynamic from 'next/dynamic'

// Dynamically import components that use browser APIs
const NetworkScanner = dynamic(() => import("@/components/network-scanner").then(mod => mod.default), { ssr: false })
const MinerDetector = dynamic(() => import("@/components/miner-detector").then(mod => mod.default), { ssr: false })
const NetworkMap = dynamic(() => import("@/components/network-map").then(mod => mod.default), { ssr: false })
const ReportGenerator = dynamic(() => import("@/components/report-generator").then(mod => mod.default), { ssr: false })
const LocationTracker = dynamic(() => import("@/components/location-tracker").then(mod => mod.default), { ssr: false })

import { scanNetwork } from "@/lib/network-utils"
import { Wifi, AlertTriangle, Activity, BarChart2, Search, RefreshCw } from "lucide-react"

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [networkRange, setNetworkRange] = useState("192.168.1.0/24")
  const [isScanning, setIsScanning] = useState(false)
  const [devices, setDevices] = useState([])
  const [miners, setMiners] = useState([])
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [activeTab, setActiveTab] = useState("scanner")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleScan = async () => {
    setIsScanning(true)
    try {
      const result = await scanNetwork(networkRange)
      setDevices(result.devices)
      setMiners(result.miners)
    } catch (error) {
      console.error("Scanning error:", error)
    } finally {
      setIsScanning(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <MinimalLayout title="سیستم تحلیل و ردیابی شبکه">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold">داشبورد</h1>
            <p className="text-muted-foreground">مدیریت و نظارت بر شبکه و دستگاه‌ها</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={networkRange}
                onChange={(e) => setNetworkRange(e.target.value)}
                placeholder="محدوده شبکه (مثال: 192.168.1.0/24)"
                className="minimal-input pr-9 w-full md:w-auto min-w-[240px]"
              />
            </div>
            <button
              className="minimal-button minimal-button-primary flex items-center gap-2"
              onClick={handleScan}
              disabled={isScanning}
            >
              {isScanning ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>در حال اسکن...</span>
                </>
              ) : (
                <>
                  <Wifi size={16} />
                  <span>اسکن شبکه</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="minimal-card p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">دستگاه‌های شناسایی شده</p>
                <p className="text-2xl font-semibold mt-1">{devices.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Wifi size={18} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                <span className="text-green-600">+{Math.floor(devices.length * 0.2)}</span> دستگاه جدید از آخرین اسکن
              </p>
            </div>
          </div>

          <div className="minimal-card p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">ماینرهای فعال</p>
                <p className="text-2xl font-semibold mt-1 text-destructive">{miners.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <AlertTriangle size={18} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                <span className="text-red-600">+{Math.floor(miners.length * 0.1)}</span> ماینر جدید از آخرین اسکن
              </p>
            </div>
          </div>

          <div className="minimal-card p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">وضعیت اسکن</p>
                <p className="text-2xl font-semibold mt-1">{isScanning ? "در حال اسکن" : "آماده"}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Activity size={18} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">آخرین اسکن: {new Date().toLocaleTimeString("fa-IR")}</p>
            </div>
          </div>

          <div className="minimal-card p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">حجم ترافیک</p>
                <p className="text-2xl font-semibold mt-1">2.4 GB</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <BarChart2 size={18} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                <span className="text-green-600">+12%</span> نسبت به روز گذشته
              </p>
            </div>
          </div>
        </div>

        <div className="minimal-card overflow-hidden">
          <div className="border-b p-4">
            <div className="minimal-tabs">
              <button
                className={`minimal-tab ${activeTab === "scanner" ? "data-[state=active]" : ""}`}
                onClick={() => setActiveTab("scanner")}
              >
                اسکنر شبکه
              </button>
              <button
                className={`minimal-tab ${activeTab === "miners" ? "data-[state=active]" : ""}`}
                onClick={() => setActiveTab("miners")}
              >
                ماینرهای شناسایی شده
              </button>
              <button
                className={`minimal-tab ${activeTab === "map" ? "data-[state=active]" : ""}`}
                onClick={() => setActiveTab("map")}
              >
                نقشه موقعیت
              </button>
              <button
                className={`minimal-tab ${activeTab === "reports" ? "data-[state=active]" : ""}`}
                onClick={() => setActiveTab("reports")}
              >
                گزارش‌ها
              </button>
            </div>
          </div>

          <div className="p-4">
            {activeTab === "scanner" && <NetworkScanner devices={devices} onSelectDevice={setSelectedDevice} />}
            {activeTab === "miners" && <MinerDetector miners={miners} onSelectMiner={setSelectedDevice} />}
            {activeTab === "map" && (
              <NetworkMap devices={miners.length > 0 ? miners : devices} selectedDevice={selectedDevice} />
            )}
            {activeTab === "reports" && <ReportGenerator devices={devices} miners={miners} />}
          </div>
        </div>

        {selectedDevice && (
          <div className="minimal-card p-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">جزئیات دستگاه انتخاب شده</h2>
                <p className="text-sm text-muted-foreground">اطلاعات تکمیلی و موقعیت دستگاه</p>
              </div>
              <button className="minimal-button minimal-button-outline" onClick={() => setSelectedDevice(null)}>
                بستن
              </button>
            </div>
            <LocationTracker device={selectedDevice} />
          </div>
        )}
      </div>
    </MinimalLayout>
  )
}