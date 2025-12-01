"use client"

import React from "react"
import ReactMarkdown from "react-markdown"

interface MarkdownPreviewProps {
  content: string
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <div className="prose max-w-full dark:prose-invert p-4 overflow-auto" style={{ minHeight: '400px' }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
