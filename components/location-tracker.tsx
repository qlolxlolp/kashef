"use client"

import { useState } from "react"
import { MapPin, Router, Wifi, Signal, Navigation, Clock, Info, ChevronDown, ChevronUp } from "lucide-react"

interface Device {
  id: string
  ip: string
  mac: string
  hostname: string
  vendor: string
  isMiner: boolean
  location: {
    city: string
    region: string
    country: string
    lat: number
    lon: number
    accuracy: number
  }
}

interface LocationTrackerProps {
  device: Device
}

export function LocationTracker({ device }: LocationTrackerProps) {
  const [isTracking, setIsTracking] = useState(false)
  const [trackingProgress, setTrackingProgress] = useState(0)
  const [trackingMethod, setTrackingMethod] = useState<"ip" | "mac" | "gps" | "signal">("ip")
  const [activeTab, setActiveTab] = useState<"info" | "location" | "signal" | "history">("info")
  const [showDetails, setShowDetails] = useState(false)

  const startTracking = () => {
    setIsTracking(true)
    setTrackingProgress(0)

    // Simulate tracking progress
    const interval = setInterval(() => {
      setTrackingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTracking(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const getAccuracyText = () => {
    switch (trackingMethod) {
      case "gps":
        return "بسیار بالا (5-10 متر)"
      case "signal":
        return "متوسط (50-100 متر)"
      case "mac":
        return "متوسط به پایین (100-500 متر)"
      case "ip":
        return "پایین (سطح شهر)"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="minimal-tabs">
        <button
          className={`minimal-tab ${activeTab === "info" ? "data-[state=active]" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          اطلاعات دستگاه
        </button>
        <button
          className={`minimal-tab ${activeTab === "location" ? "data-[state=active]" : ""}`}
          onClick={() => setActiveTab("location")}
        >
          موقعیت
        </button>
        <button
          className={`minimal-tab ${activeTab === "signal" ? "data-[state=active]" : ""}`}
          onClick={() => setActiveTab("signal")}
        >
          سیگنال
        </button>
        <button
          className={`minimal-tab ${activeTab === "history" ? "data-[state=active]" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          تاریخچه
        </button>
      </div>

      {activeTab === "info" && (
        <div className="minimal-card p-4 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Info size={18} />
            </div>
            <div>
              <h3 className="font-medium">اطلاعات دستگاه</h3>
              <p className="text-sm text-muted-foreground">مشخصات فنی و شبکه‌ای دستگاه</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">آدرس IP</h4>
              <p className="font-medium">{device.ip}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">آدرس MAC</h4>
              <p className="font-mono text-sm">{device.mac}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">نام میزبان</h4>
              <p>{device.hostname}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">سازنده</h4>
              <p>{device.vendor}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">وضعیت</h4>
              <p className="flex items-center gap-2">
                <span className="minimal-status-indicator minimal-status-indicator-online"></span>
                <span>آنلاین</span>
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">نوع دستگاه</h4>
              <p>{device.isMiner ? "ماینر" : "عادی"}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "location" && (
        <div className="minimal-card p-4 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <MapPin size={18} />
            </div>
            <div>
              <h3 className="font-medium">موقعیت دستگاه</h3>
              <p className="text-sm text-muted-foreground">
                {device.location.city}، {device.location.region}، {device.location.country}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">روش موقعیت‌یابی:</label>
              <select
                className="minimal-select text-sm w-40"
                value={trackingMethod}
                onChange={(e) => setTrackingMethod(e.target.value as any)}
              >
                <option value="ip">موقعیت‌یابی با IP</option>
                <option value="gps">موقعیت‌یابی با GPS</option>
                <option value="mac">موقعیت‌یابی با MAC</option>
                <option value="signal">موقعیت‌یابی با سیگنال</option>
              </select>
            </div>

            <div className="text-xs mb-4 text-muted-foreground">دقت: {getAccuracyText()}</div>

            <button
              className="minimal-button minimal-button-primary w-full flex items-center justify-center gap-2"
              onClick={startTracking}
              disabled={isTracking}
            >
              <Navigation size={16} />
              {isTracking ? "در حال موقعیت‌یابی..." : "شروع موقعیت‌یابی"}
            </button>

            {isTracking && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">پیشرفت موقعیت‌یابی</span>
                  <span className="text-sm">{trackingProgress}%</span>
                </div>
                <div className="minimal-progress">
                  <div className="minimal-progress-bar" style={{ width: `${trackingProgress}%` }}></div>
                </div>
              </div>
            )}
          </div>

          <div
            className="h-[200px] bg-gray-100 rounded-md relative mt-2"
            style={{
              backgroundImage: "url('/placeholder.svg?height=200&width=400')",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white">
                <MapPin size={14} />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              className="minimal-button minimal-button-outline w-full flex items-center justify-center gap-2"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showDetails ? "مخفی کردن جزئیات" : "نمایش جزئیات بیشتر"}
            </button>
          </div>

          {showDetails && (
            <div className="mt-4 space-y-4 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">عرض جغرافیایی:</p>
                  <p>{device.location.lat.toFixed(6)}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">طول جغرافیایی:</p>
                  <p>{device.location.lon.toFixed(6)}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">دقت:</p>
                  <p>{(device.location.accuracy * 100).toFixed(0)}%</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">منبع داده:</p>
                  <p>{trackingMethod === "ip" ? "MaxMind GeoIP" : trackingMethod === "gps" ? "GPS" : "شبکه محلی"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "signal" && (
        <div className="minimal-card p-4 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Signal size={18} />
            </div>
            <div>
              <h3 className="font-medium">قدرت سیگنال</h3>
              <p className="text-sm text-muted-foreground">اطلاعات مربوط به قدرت سیگنال و پایداری اتصال</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">قدرت سیگنال</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <div className="minimal-progress">
                <div className="minimal-progress-bar" style={{ width: "78%", backgroundColor: "#8b5cf6" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">پایداری اتصال</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="minimal-progress">
                <div className="minimal-progress-bar" style={{ width: "92%", backgroundColor: "#10b981" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">نویز سیگنال</span>
                <span className="text-sm font-medium">23%</span>
              </div>
              <div className="minimal-progress">
                <div className="minimal-progress-bar" style={{ width: "23%", backgroundColor: "#f43f5e" }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="minimal-card p-3">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">فرکانس</span>
              </div>
              <p className="mt-1 text-lg">2.4 GHz</p>
            </div>

            <div className="minimal-card p-3">
              <div className="flex items-center gap-2">
                <Router className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">کانال</span>
              </div>
              <p className="mt-1 text-lg">6</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="minimal-card p-4 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Clock size={18} />
            </div>
            <div>
              <h3 className="font-medium">تاریخچه فعالیت</h3>
              <p className="text-sm text-muted-foreground">تاریخچه فعالیت‌های دستگاه در شبکه</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative border-r border-border pr-6 pb-6">
              <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-0 w-3 h-3 rounded-full bg-blue-500"></div>
              <div className="mb-1">
                <span className="text-sm font-medium">اتصال به شبکه</span>
                <span className="text-xs text-muted-foreground mr-2">12:45</span>
              </div>
              <p className="text-sm text-muted-foreground">دستگاه به شبکه متصل شد و آدرس IP دریافت کرد.</p>
            </div>

            <div className="relative border-r border-border pr-6 pb-6">
              <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-0 w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="mb-1">
                <span className="text-sm font-medium">افزایش ترافیک</span>
                <span className="text-xs text-muted-foreground mr-2">13:20</span>
              </div>
              <p className="text-sm text-muted-foreground">افزایش ناگهانی در ترافیک شبکه مشاهده شد.</p>
            </div>

            <div className="relative border-r border-border pr-6">
              <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-0 w-3 h-3 rounded-full bg-red-500"></div>
              <div className="mb-1">
                <span className="text-sm font-medium">شناسایی فعالیت ماینینگ</span>
                <span className="text-xs text-muted-foreground mr-2">14:05</span>
              </div>
              <p className="text-sm text-muted-foreground">الگوی ترافیک مشکوک به فعالیت ماینینگ شناسایی شد.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

