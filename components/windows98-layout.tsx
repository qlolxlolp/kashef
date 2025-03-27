"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Minimize2, Maximize2, X } from "lucide-react"

interface Windows98LayoutProps {
  children: React.ReactNode
  title: string
}

export function Windows98Layout({ children, title }: Windows98LayoutProps) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [showStartMenu, setShowStartMenu] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#008080] flex flex-col">
      <div className={`flex-1 p-2 ${isMaximized ? "p-0" : ""} overflow-auto`}>
        <div className={`win98-window ${isMaximized ? "w-full h-full" : "max-w-[1200px] mx-auto my-4"}`}>
          <div className="win98-title-bar">
            <div className="flex items-center">
              <span className="mr-2">🖥️</span>
              <span>{title} - ASP.NET برای ویندوز 10/11 x64</span>
            </div>
            <div className="win98-window-controls">
              <button className="win98-window-control" onClick={() => {}}>
                <Minimize2 className="w-3 h-3" />
              </button>
              <button className="win98-window-control" onClick={() => setIsMaximized(!isMaximized)}>
                <Maximize2 className="w-3 h-3" />
              </button>
              <button className="win98-window-control" onClick={() => {}}>
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="win98-window-inner">{children}</div>
        </div>
      </div>

      <div className="win98-taskbar">
        <div className="relative">
          <button className="win98-start-button" onClick={() => setShowStartMenu(!showStartMenu)}>
            <span className="mr-1">🪟</span>
            <span>شروع</span>
          </button>

          {showStartMenu && (
            <div className="win98-menu absolute bottom-full mb-1 left-0 w-64">
              <div className="bg-[#000080] text-white p-2 h-16 flex items-center">
                <span className="font-bold">سیستم تحلیل و ردیابی شبکه</span>
              </div>
              <div className="win98-menu-item">اسکن شبکه</div>
              <div className="win98-menu-item">شناسایی ماینرها</div>
              <div className="win98-menu-item">نقشه موقعیت</div>
              <div className="win98-menu-divider"></div>
              <div className="win98-menu-item">تنظیمات</div>
              <div className="win98-menu-item">راهنما</div>
              <div className="win98-menu-divider"></div>
              <div className="win98-menu-item">خروج</div>
            </div>
          )}
        </div>

        <div className="win98-taskbar-divider"></div>

        <div className="flex-1 flex items-center px-2">
          <div className="bg-white border border-gray-400 px-2 py-1 text-xs">{title}</div>
        </div>

        <div className="win98-taskbar-time">{currentTime}</div>
      </div>
    </div>
  )
}

