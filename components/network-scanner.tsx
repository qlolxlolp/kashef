"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown, ChevronUp, ArrowUpDown, Eye, Ban, FileText } from "lucide-react"

interface Device {
  id: string
  ip: string
  mac: string
  hostname: string
  vendor: string
  lastSeen: string
  trafficVolume: number
  isMiner: boolean
  confidence: number
  location: {
    city: string
    region: string
    country: string
    lat: number
    lon: number
  }
}

interface NetworkScannerProps {
  devices: Device[]
  onSelectDevice: (device: Device) => void
}

export function NetworkScanner({ devices, onSelectDevice }: NetworkScannerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("lastSeen")
  const [sortDirection, setSortDirection] = useState("desc")
  const [showFilters, setShowFilters] = useState(false)

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredDevices = devices.filter(
    (device) =>
      device.ip.includes(searchTerm) ||
      device.mac.includes(searchTerm) ||
      device.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.vendor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedDevices = [...filteredDevices].sort((a, b) => {
    if (sortField === "trafficVolume") {
      return sortDirection === "asc" ? a.trafficVolume - b.trafficVolume : b.trafficVolume - a.trafficVolume
    } else if (sortField === "lastSeen") {
      return sortDirection === "asc"
        ? new Date(a.lastSeen).getTime() - new Date(b.lastSeen).getTime()
        : new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
    } else {
      const aValue = a[sortField as keyof Device] as string
      const bValue = b[sortField as keyof Device] as string
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-auto">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="جستجو بر اساس IP، MAC، نام میزبان یا سازنده..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="minimal-input pr-9 w-full md:w-64"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            className="minimal-button minimal-button-outline flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            <span>فیلترها</span>
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <button className="minimal-button minimal-button-primary">بروزرسانی</button>
        </div>
      </div>

      {showFilters && (
        <div className="minimal-card p-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">وضعیت</label>
              <select className="minimal-select w-full">
                <option value="">همه</option>
                <option value="miner">ماینر</option>
                <option value="normal">عادی</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">سازنده</label>
              <select className="minimal-select w-full">
                <option value="">همه</option>
                <option value="Antminer">Antminer</option>
                <option value="Innosilicon">Innosilicon</option>
                <option value="Whatsminer">Whatsminer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">موقعیت</label>
              <select className="minimal-select w-full">
                <option value="">همه</option>
                <option value="ایلام">ایلام</option>
                <option value="دهلران">دهلران</option>
                <option value="مهران">مهران</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="minimal-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="minimal-table w-full">
            <thead className="minimal-table-header">
              <tr className="minimal-table-row">
                <th className="minimal-table-head cursor-pointer" onClick={() => handleSort("ip")}>
                  <div className="flex items-center">
                    <span>آدرس IP</span>
                    {sortField === "ip" && <ArrowUpDown size={14} className="ml-1" />}
                  </div>
                </th>
                <th className="minimal-table-head cursor-pointer" onClick={() => handleSort("mac")}>
                  <div className="flex items-center">
                    <span>آدرس MAC</span>
                    {sortField === "mac" && <ArrowUpDown size={14} className="ml-1" />}
                  </div>
                </th>
                <th className="minimal-table-head cursor-pointer" onClick={() => handleSort("hostname")}>
                  <div className="flex items-center">
                    <span>نام میزبان</span>
                    {sortField === "hostname" && <ArrowUpDown size={14} className="ml-1" />}
                  </div>
                </th>
                <th className="minimal-table-head cursor-pointer" onClick={() => handleSort("vendor")}>
                  <div className="flex items-center">
                    <span>سازنده</span>
                    {sortField === "vendor" && <ArrowUpDown size={14} className="ml-1" />}
                  </div>
                </th>
                <th className="minimal-table-head cursor-pointer" onClick={() => handleSort("lastSeen")}>
                  <div className="flex items-center">
                    <span>آخرین مشاهده</span>
                    {sortField === "lastSeen" && <ArrowUpDown size={14} className="ml-1" />}
                  </div>
                </th>
                <th className="minimal-table-head cursor-pointer" onClick={() => handleSort("trafficVolume")}>
                  <div className="flex items-center">
                    <span>حجم ترافیک</span>
                    {sortField === "trafficVolume" && <ArrowUpDown size={14} className="ml-1" />}
                  </div>
                </th>
                <th className="minimal-table-head">وضعیت</th>
                <th className="minimal-table-head">عملیات</th>
              </tr>
            </thead>
            <tbody className="minimal-table-body">
              {sortedDevices.length > 0 ? (
                sortedDevices.map((device) => (
                  <tr key={device.id} className="minimal-table-row">
                    <td className="minimal-table-cell">{device.ip}</td>
                    <td className="minimal-table-cell font-mono text-xs">{device.mac}</td>
                    <td className="minimal-table-cell">{device.hostname}</td>
                    <td className="minimal-table-cell">{device.vendor}</td>
                    <td className="minimal-table-cell">{new Date(device.lastSeen).toLocaleString("fa-IR")}</td>
                    <td className="minimal-table-cell">{(device.trafficVolume / 1024 / 1024).toFixed(2)} MB</td>
                    <td className="minimal-table-cell">
                      {device.isMiner ? (
                        <span className="minimal-badge minimal-badge-destructive">ماینر</span>
                      ) : (
                        <span className="minimal-badge minimal-badge-outline">عادی</span>
                      )}
                    </td>
                    <td className="minimal-table-cell">
                      <div className="flex items-center gap-2">
                        <button
                          className="minimal-button minimal-button-ghost minimal-button-icon"
                          onClick={() => onSelectDevice(device)}
                          title="مشاهده جزئیات"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="minimal-button minimal-button-ghost minimal-button-icon" title="مسدود کردن">
                          <Ban size={16} />
                        </button>
                        <button className="minimal-button minimal-button-ghost minimal-button-icon" title="گزارش">
                          <FileText size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="minimal-table-cell text-center py-8">
                    <div className="flex flex-col items-center">
                      <Search className="h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">هیچ دستگاهی یافت نشد</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        لطفاً معیارهای جستجو را تغییر دهید یا شبکه را اسکن کنید
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

