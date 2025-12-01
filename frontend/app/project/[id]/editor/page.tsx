"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MarkdownPreview from "./MarkdownPreview"

const Editor = dynamic(() => import("./Editor"), { ssr: false })

export default function EditorPage() {
  const router = useRouter()
  const { theme } = useTheme()
  const { toast } = useToast()

  const [fileContent, setFileContent] = useState("")
  const [fileName, setFileName] = useState("")
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    // Load file content logic...
    // For example, fetch file content from API using router or params
  }, [])

  const handleSave = async () => {
    // Save file content logic...
    toast({ title: "File saved successfully." })
  }

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode)
  }

  const isImage = (fileName: string) => {
    return /\.(png|jpe?g|gif|svg)$/i.test(fileName)
  }

  const isMarkdown = (fileName: string) => {
    return /\.md$/i.test(fileName)
  }

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex gap-4 mb-4">
        <Button onClick={togglePreviewMode}>
          {previewMode ? "Edit" : "Preview"}
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>

      {previewMode ? (
        isImage(fileName) ? (
          <img src={fileContent} alt={fileName} className="max-w-full max-h-[600px]" />
        ) : isMarkdown(fileName) ? (
          <MarkdownPreview content={fileContent} />
        ) : (
          <p className="p-4">Preview not available for this file type.</p>
        )
      ) : (
        <Editor fileName={fileName} content={fileContent} onChange={setFileContent} />
      )}
    </div>
  )
}
