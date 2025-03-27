"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Minimize2, Maximize2, X } from "lucide-react"

interface Windows95LayoutProps {
  children: React.ReactNode
  title: string
}

export function Windows95Layout({ children, title }: Windows95LayoutProps) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

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
        <div className={`w95-window ${isMaximized ? "w-full h-full" : "max-w-[1200px] mx-auto my-4"}`}>
          <div className="w95-title-bar">
            <div className="flex items-center">
              <span className="mr-2">🖥️</span>
              <span>{title}</span>
            </div>
            <div className="w95-window-controls">
              <button className="w95-window-control" onClick={() => {}}>
                <Minimize2 className="w-3 h-3" />
              </button>
              <button className="w95-window-control" onClick={() => setIsMaximized(!isMaximized)}>
                <Maximize2 className="w-3 h-3" />
              </button>
              <button className="w95-window-control" onClick={() => {}}>
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="w95-window-inner">{children}</div>
        </div>
      </div>

      <div className="w95-taskbar">
        <button className="w95-start-button">
          <span className="mr-1">🪟</span>
          <span>شروع</span>
        </button>

        <div className="w95-taskbar-divider"></div>

        <div className="flex-1 flex items-center px-2">
          <div className="bg-white border border-gray-400 px-2 py-1 text-xs">{title}</div>
        </div>

        <div className="w95-taskbar-time">{currentTime}</div>
      </div>
    </div>
  )
}

