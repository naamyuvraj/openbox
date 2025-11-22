"use client"

import React from "react"
import MonacoEditor from "@monaco-editor/react"

interface EditorProps {
  fileName: string
  content: string
  onChange: (value: string | null | undefined) => void
}

export default function Editor({ fileName, content, onChange }: EditorProps) {
  function getLanguageFromExtension(fileName: string): string {
    const ext = fileName.split('.').pop()
    switch (ext) {
      case "js":
        return "javascript"
      case "ts":
        return "typescript"
      case "json":
        return "json"
      case "jsx":
        return "javascript"
      case "tsx":
        return "typescript"
      case "css":
        return "css"
      case "html":
        return "html"
      case "md":
        return "markdown"
      default:
        return "plaintext"
    }
  }

  return (
    <MonacoEditor
      language={getLanguageFromExtension(fileName)}
      value={content}
      onChange={(value) => onChange(value)}
      options={{ minimap: { enabled: false } }}
      height="600px"
      theme="vs-dark"
    />
  )
}
