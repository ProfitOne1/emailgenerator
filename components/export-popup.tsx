"use client"

import { useState, type FormEvent } from "react"
import { X, ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

function joinWaitlist(email: string, params: { ref?: string }) {
  return new Promise<string>((resolve, reject) => {
    // Using placeholder API URL - replace with actual Adsone API endpoint
    fetch(`https://waitlist.adsone.app/api/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, referrer: params.ref }),
    })
      .then((res) => {
        if (res.status === 200) {
          res
            .json()
            .then((_body) => {
              resolve(_body?.data?.message || "Successfully joined the waitlist!")
            })
            .catch((err) => {
              console.error(err)
              reject("Something went wrong")
            })
        } else if (res.status === 400) {
          res
            .json()
            .then((data) => {
              reject(data.message)
            })
            .catch((err) => {
              console.error(err)
              reject("Something went wrong")
            })
        } else {
          reject("Something went wrong")
        }
      })
      .catch((err) => {
        console.error(err)
        reject("Something went wrong")
      })
  })
}

interface ExportPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function ExportPopup({ isOpen, onClose }: ExportPopupProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<
    | {
        message: string
        type: "success" | "error"
      }
    | undefined
  >()

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (loading) return

    setLoading(true)
    setMessage(undefined)

    if (!validateEmail(email)) {
      setMessage({
        message: "Please enter a valid email",
        type: "error",
      })
      setLoading(false)
      return
    }

    const url = new URL(window.location.href)
    const ref = url.searchParams.get("ref") || document.referrer?.replace(/https?:\/\//, "")

    joinWaitlist(email, ref ? { ref } : {})
      .then((message) => {
        setMessage({
          message,
          type: "success",
        })
        // Auto close after success
        setTimeout(() => {
          onClose()
        }, 2000)
      })
      .catch((err) => {
        setMessage({
          message: err,
          type: "error",
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSkip = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Download className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your image will download shortly!</h2>
          <p className="text-gray-600 text-sm">
            Stay updated with Adsone - our platform to automate and optimize marketing campaigns across Meta, Google,
            Bing, and more.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <Button type="submit" disabled={!email || loading} className="px-4">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </Button>
          </div>

          {message && (
            <div
              className={`text-sm p-3 rounded-md ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.message}
            </div>
          )}

          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  )
}
