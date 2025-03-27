"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  ChevronDown,
  Home,
  Activity,
  Map,
  FileText,
  Settings,
  LogOut,
  BarChart2,
  Wifi,
  Shield,
  Database,
} from "lucide-react"

interface MinimalLayoutProps {
  children: React.ReactNode
  title: string
}

export function MinimalLayout({ children, title }: MinimalLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="minimal-layout">
      {/* Header */}
      <header className={`minimal-header ${isScrolled ? "shadow-sm" : ""}`}>
        <button
          className="minimal-button minimal-button-ghost minimal-button-icon lg:hidden mr-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? "بستن منو" : "باز کردن منو"}
        >
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
            <Shield size={16} />
          </div>
          <h1 className="text-lg font-medium hidden md:block">{title}</h1>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="جستجو..."
              className="minimal-input w-[200px] pl-9 rounded-full bg-muted border-transparent focus-visible:bg-background"
            />
          </div>

          <button className="minimal-button minimal-button-ghost minimal-button-icon relative">
            <Bell size={18} />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          <div className="relative">
            <button className="minimal-button minimal-button-ghost flex items-center gap-2">
              <div className="minimal-avatar">
                <div className="minimal-avatar-fallback">
                  <User size={16} />
                </div>
              </div>
              <span className="hidden md:inline-block text-sm font-medium">کاربر</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`minimal-sidebar ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <nav className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground mb-4 px-2">منو اصلی</div>

          <a href="#" className="minimal-nav-item minimal-nav-item-active">
            <Home size={16} />
            <span>داشبورد</span>
          </a>

          <a href="#" className="minimal-nav-item">
            <Wifi size={16} />
            <span>اسکنر شبکه</span>
          </a>

          <a href="#" className="minimal-nav-item">
            <Activity size={16} />
            <span>ماینرهای شناسایی شده</span>
          </a>

          <a href="#" className="minimal-nav-item">
            <Map size={16} />
            <span>نقشه موقعیت</span>
          </a>

          <a href="#" className="minimal-nav-item">
            <FileText size={16} />
            <span>گزارش‌ها</span>
          </a>

          <div className="minimal-divider"></div>

          <div className="text-xs font-medium text-muted-foreground mb-4 px-2">تنظیمات</div>

          <a href="#" className="minimal-nav-item">
            <Database size={16} />
            <span>منابع داده</span>
          </a>

          <a href="#" className="minimal-nav-item">
            <BarChart2 size={16} />
            <span>آمار و تحلیل</span>
          </a>

          <a href="#" className="minimal-nav-item">
            <Settings size={16} />
            <span>تنظیمات سیستم</span>
          </a>

          <div className="minimal-divider"></div>

          <a href="#" className="minimal-nav-item text-destructive">
            <LogOut size={16} />
            <span>خروج</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`minimal-main ${!isSidebarOpen ? "minimal-main-collapsed" : ""}`}>
        <div className="minimal-container">{children}</div>
      </main>
    </div>
  )
}

