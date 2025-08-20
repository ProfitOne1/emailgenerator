"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  Archive,
  Trash2,
  Reply,
  MoreHorizontal,
  Star,
  ChevronDown,
  CornerUpLeft,
  MapPin,
  Upload,
} from "lucide-react"
import { useRef, useState } from "react"

interface GmailEmailProps {
  time?: string
  battery?: string
  subject?: string
  label?: string
  senderName?: string
  senderEmail?: string
  profilePicture?: string
  emailContent?: string
  onUpdate?: (key: string, value: string) => void
  onProfilePictureUpload?: (file: File) => void
}

export function GmailEmail({
  time = "10:24",
  battery = "99",
  subject = "not gonna sugarcoat it",
  label = "Inbox",
  senderName = "Alex Keene",
  senderEmail = "alex@example.com",
  profilePicture = "/professional-headshot.png",
  emailContent = "Hey –\n\nMost GLP-1 clinics make it way harder (and more expensive) than it needs to be. We cut out the middlemen, the markup, and the nonsense.\n\nSame meds. Legit providers. Zero fluff.\n\nIf you've been thinking about trying it but got overwhelmed by all the chaos out there—yeah, we built this on purpose",
  onUpdate,
  onProfilePictureUpload,
}: GmailEmailProps) {
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleContentEdit = (key: string, element: HTMLElement) => {
    const value = element.textContent || ""
    onUpdate?.(key, value)
  }

  const handleEmailContentEdit = (element: HTMLElement) => {
    const value = element.innerHTML
      .replace(/<div><br><\/div>/g, "\n")
      .replace(/<div>/g, "\n")
      .replace(/<\/div>/g, "")
      .replace(/<br>/g, "\n")
    onUpdate?.("emailContent", value)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && onProfilePictureUpload) {
      onProfilePictureUpload(file)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen font-sans">
      {/* Status Bar */}
      <div
        className="flex justify-between items-center px-4 py-2 text-sm font-medium"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}
      >
        <div className="flex items-center">
          <span
            className="font-semibold cursor-text hover:bg-gray-100 px-1 rounded"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleContentEdit("time", e.currentTarget)}
          >
            {time}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {/* Signal bars */}
          <div className="flex items-end gap-0.5">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1.5 bg-black rounded-full"></div>
            <div className="w-1 h-2 bg-black rounded-full"></div>
            <div className="w-1 h-2.5 bg-black rounded-full"></div>
          </div>
          {/* WiFi icon */}
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
          {/* Battery */}
          <div className="flex items-center ml-1">
            <div className="relative">
              <div className="w-6 h-3 border border-black rounded-sm bg-white"></div>
              <div className="absolute inset-0.5 bg-black rounded-sm"></div>
              <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-black rounded-r-sm"></div>
            </div>
            <span
              className="text-xs ml-1 cursor-text hover:bg-gray-100 px-1 rounded"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleContentEdit("battery", e.currentTarget)}
            >
              {battery}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="p-0 h-6 w-6">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Button>
          <Button variant="ghost" size="icon" className="p-0 h-6 w-6">
            <MapPin className="w-5 h-5 text-gray-700" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="p-0 h-6 w-6">
            <Archive className="w-5 h-5 text-gray-700" />
          </Button>
          <Button variant="ghost" size="icon" className="p-0 h-6 w-6">
            <Trash2 className="w-5 h-5 text-gray-700" />
          </Button>
          <Button variant="ghost" size="icon" className="p-0 h-6 w-6">
            <Reply className="w-5 h-5 text-gray-700" />
          </Button>
          <Button variant="ghost" size="icon" className="p-0 h-6 w-6">
            <MoreHorizontal className="w-5 h-5 text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Email Subject */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <h1
            className="text-xl font-normal text-gray-900 cursor-text hover:bg-gray-100 px-1 rounded"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleContentEdit("subject", e.currentTarget)}
          >
            {subject}
          </h1>
          <span
            className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded cursor-text hover:bg-gray-200"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleContentEdit("label", e.currentTarget)}
          >
            {label}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="p-0 h-6 w-6">
          <Star className="w-5 h-5 text-gray-400" />
        </Button>
      </div>

      {/* Sender Info */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsHoveringAvatar(true)}
            onMouseLeave={() => setIsHoveringAvatar(false)}
            onClick={handleAvatarClick}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={profilePicture || "/placeholder.svg"} alt={senderName} />
              <AvatarFallback>{getInitials(senderName)}</AvatarFallback>
            </Avatar>
            {isHoveringAvatar && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <Upload className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <div className="flex flex-col">
            <span
              className="font-medium text-gray-900 cursor-text hover:bg-gray-100 px-1 rounded"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleContentEdit("senderName", e.currentTarget)}
            >
              {senderName}
            </span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>to me</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="p-0 h-6 w-6">
            <CornerUpLeft className="w-4 h-4 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="p-0 h-6 w-6">
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Email Content */}
      <div
        className="px-4 py-4 text-gray-900 leading-relaxed cursor-text hover:bg-gray-50 rounded mx-2"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => handleEmailContentEdit(e.currentTarget)}
        dangerouslySetInnerHTML={{
          __html: emailContent
            .split("\n")
            .map((line) => `<div>${line || "<br>"}</div>`)
            .join(""),
        }}
      />
    </div>
  )
}
