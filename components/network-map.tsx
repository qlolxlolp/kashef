"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Wifi, Search, Filter, ChevronDown, ChevronUp } from "lucide-react"

interface Device {
  id: string
  ip: string
  mac: string
  hostname: string
  isMiner: boolean
  location: {
    city: string
    region: string
    country: string
    lat: number
    lon: number
  }
}

interface NetworkMapProps {
  devices: Device[]
  selectedDevice: Device | null
}

export function NetworkMap({ devices, selectedDevice }: NetworkMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapView, setMapView] = useState<"city" | "region" | "country">("city")
  const [mapLoaded, setMapLoaded] = useState(false)
  const [locatingMethod, setLocatingMethod] = useState<"gps" | "ip" | "mac" | "signal">("ip")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // This would normally initialize a map library like Leaflet or Google Maps
    // For this demo, we'll simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Group devices by location based on the selected view
  const groupedDevices = devices.reduce(
    (acc, device) => {
      const key =
        mapView === "city"
          ? `${device.location.city}, ${device.location.region}`
          : mapView === "region"
            ? device.location.region
            : device.location.country

      if (!acc[key]) {
        acc[key] = []
      }

      acc[key].push(device)
      return acc
    },
    {} as Record<string, Device[]>,
  )

  const handleFindMyLocation = () => {
    // In a real implementation, this would use the browser's geolocation API
    // or other methods to find the user's location
    alert("در یک پیاده‌سازی واقعی، این قابلیت موقعیت فعلی شما را پیدا می‌کند.")
  }

  const getLocationMethodDescription = () => {
    switch (locatingMethod) {
      case "gps":
        return "استفاده از GPS برای موقعیت‌یابی دقیق دستگاه‌ها"
      case "ip":
        return "موقعیت‌یابی بر اساس آدرس IP دستگاه‌ها"
      case "mac":
        return "موقعیت‌یابی بر اساس آدرس MAC و اطلاعات شبکه"
      case "signal":
        return "موقعیت‌یابی بر اساس قدرت سیگنال دستگاه‌ها"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-medium">نقشه موقعیت دستگاه‌ها</h2>
          <p className="text-sm text-muted-foreground">{getLocationMethodDescription()}</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            className="minimal-select"
            value={locatingMethod}
            onChange={(e) => setLocatingMethod(e.target.value as any)}
          >
            <option value="ip">موقعیت‌یابی با IP</option>
            <option value="gps">موقعیت‌یابی با GPS</option>
            <option value="mac">موقعیت‌یابی با MAC</option>
            <option value="signal">موقعیت‌یابی با سیگنال</option>
          </select>

          <button
            className="minimal-button minimal-button-outline flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            <span>فیلترها</span>
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <button
            className="minimal-button minimal-button-primary flex items-center gap-2"
            onClick={handleFindMyLocation}
          >
            <MapPin size={16} />
            <span>موقعیت من</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="minimal-card p-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">نوع دستگاه</label>
              <select className="minimal-select w-full">
                <option value="">همه</option>
                <option value="miner">ماینر</option>
                <option value="normal">عادی</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">نمای نقشه</label>
              <div className="minimal-tabs w-full">
                <button
                  className={`minimal-tab flex-1 ${mapView === "city" ? "data-[state=active]" : ""}`}
                  onClick={() => setMapView("city")}
                >
                  شهر
                </button>
                <button
                  className={`minimal-tab flex-1 ${mapView === "region" ? "data-[state=active]" : ""}`}
                  onClick={() => setMapView("region")}
                >
                  استان
                </button>
                <button
                  className={`minimal-tab flex-1 ${mapView === "country" ? "data-[state=active]" : ""}`}
                  onClick={() => setMapView("country")}
                >
                  کشور
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">منبع داده</label>
              <select className="minimal-select w-full">
                <option value="all">همه منابع</option>
                <option value="geoip">MaxMind GeoIP</option>
                <option value="google">Google Maps</option>
                <option value="osm">OpenStreetMap</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="minimal-card overflow-hidden">
            <div
              ref={mapRef}
              className="h-[500px] bg-gray-100 relative overflow-hidden"
              style={{
                backgroundImage: "url('/placeholder.svg?height=500&width=800')",
                backgroundSize: "cover",
              }}
            >
              {!mapLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p>در حال بارگذاری نقشه...</p>
                </div>
              ) : (
                <>
                  {/* This would be replaced with actual map markers */}
                  {Object.entries(groupedDevices).map(([location, devs]) => {
                    const minerCount = devs.filter((d) => d.isMiner).length
                    const isSelected = selectedDevice && devs.some((d) => d.id === selectedDevice.id)

                    // Simulate random positions on the map
                    const top = Math.floor(Math.random() * 80) + 10
                    const left = Math.floor(Math.random() * 80) + 10

                    return (
                      <div
                        key={location}
                        className={`absolute p-1 rounded-full ${isSelected ? "ring-2 ring-primary" : ""}`}
                        style={{
                          top: `${top}%`,
                          left: `${left}%`,
                          backgroundColor: minerCount > 0 ? "#ef4444" : "#3b82f6",
                          transform: "translate(-50%, -50%)",
                          zIndex: isSelected ? 10 : 1,
                        }}
                      >
                        <div className="relative group">
                          <div className="flex items-center justify-center w-8 h-8 text-white rounded-full">
                            {minerCount > 0 ? <MapPin size={16} /> : <Wifi size={16} />}
                          </div>

                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 minimal-card">
                            <p className="font-medium text-sm">{location}</p>
                            <p className="text-xs text-muted-foreground">تعداد دستگاه‌ها: {devs.length}</p>
                            {minerCount > 0 && <p className="text-xs text-red-500">تعداد ماینرها: {minerCount}</p>}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </>
              )}
            </div>

            <div className="p-3 border-t text-xs text-muted-foreground flex justify-between">
              <div>روش موقعیت‌یابی: {locatingMethod.toUpperCase()}</div>
              <div>
                دقت: {locatingMethod === "gps" ? "بالا" : locatingMethod === "signal" ? "متوسط" : "متوسط به پایین"}
              </div>
              <div>
                منبع داده: {locatingMethod === "ip" ? "MaxMind GeoIP" : locatingMethod === "gps" ? "GPS" : "شبکه محلی"}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="minimal-card h-full">
            <div className="p-4 border-b">
              <h3 className="font-medium">لیست موقعیت‌ها</h3>
              <p className="text-sm text-muted-foreground">
                {mapView === "city" ? "شهرها" : mapView === "region" ? "استان‌ها" : "کشورها"}ی شناسایی شده
              </p>
            </div>

            <div className="p-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" placeholder="جستجوی موقعیت..." className="minimal-input pr-9 w-full mb-4" />
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {Object.entries(groupedDevices).map(([location, devs]) => {
                  const minerCount = devs.filter((d) => d.isMiner).length

                  return (
                    <div key={location} className="minimal-card p-3 hover:bg-accent transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{location}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {devs.length} دستگاه
                            {minerCount > 0 && (
                              <span className="minimal-badge minimal-badge-destructive ml-2">{minerCount} ماینر</span>
                            )}
                          </div>
                        </div>
                        <button className="minimal-button minimal-button-ghost minimal-button-icon">
                          <MapPin size={16} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

