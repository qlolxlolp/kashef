"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Bell,
  Settings,
  User,
  ChevronDown,
  Menu,
  X,
  Search,
  Home,
  BarChart2,
  Wifi,
  Map,
  FileText,
  LogOut,
} from "lucide-react"

interface ModernLayoutProps {
  children: React.ReactNode
  title: string
}

export function ModernLayout({ children, title }: ModernLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentTime, setCurrentTime] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-pattern">
      {/* Top Navigation Bar */}
      <header className={`modern-navbar transition-all duration-300 ${isScrolled ? "py-2 shadow-md" : "py-4"}`}>
        <div className="flex items-center">
          <button
            className="p-2 rounded-full hover:bg-gray-100 lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center ml-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              N
            </div>
            <h1 className="text-xl font-bold ml-2 hidden md:block">نت‌اسکنر</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input type="text" placeholder="جستجو..." className="modern-input pr-10 w-40 md:w-64" />
          </div>

          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="dropdown">
            <button className="flex items-center space-x-2 space-x-reverse">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={16} />
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            <div className="dropdown-content">
              <a href="#" className="dropdown-item">
                پروفایل
              </a>
              <a href="#" className="dropdown-item">
                تنظیمات
              </a>
              <div className="border-t my-1"></div>
              <a href="#" className="dropdown-item">
                خروج
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`modern-sidebar pt-20 transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <nav className="flex flex-col space-y-1">
          <a
            href="#"
            className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg bg-blue-50 text-blue-600"
          >
            <Home size={20} />
            <span>داشبورد</span>
          </a>

          <a href="#" className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg hover:bg-gray-100">
            <Wifi size={20} />
            <span>اسکنر شبکه</span>
          </a>

          <a href="#" className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg hover:bg-gray-100">
            <BarChart2 size={20} />
            <span>ماینرهای شناسایی شده</span>
          </a>

          <a href="#" className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg hover:bg-gray-100">
            <Map size={20} />
            <span>نقشه موقعیت</span>
          </a>

          <a href="#" className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg hover:bg-gray-100">
            <FileText size={20} />
            <span>گزارش‌ها</span>
          </a>
        </nav>

        <div className="mt-auto">
          <div className="border-t pt-4">
            <a
              href="#"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <Settings size={20} />
              <span>تنظیمات</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <LogOut size={20} />
              <span>خروج</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? "lg:mr-64" : ""} pt-24 px-6 pb-6`}>
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  )
}

