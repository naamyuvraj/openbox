"use client"

import type React from "react"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronRight, Save, RotateCcw, MessageSquare } from "lucide-react"
import Link from "next/link"

const sampleCode = `import React from 'react';

export function Button({ children, variant = 'primary' }) {
  return (
    <button className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
}

export default Button;`

export default function EditorPage({
  params,
}: {
  params: { id: string; fileId: string }
}) {
  const [code, setCode] = useState(sampleCode)
  const [hasChanges, setHasChanges] = useState(false)

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
    setHasChanges(true)
  }

  const handleSave = () => {
    setHasChanges(false)
  }

  const handleDiscard = () => {
    setCode(sampleCode)
    setHasChanges(false)
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="container-safe max-w-6xl mx-auto py-4 flex items-center gap-2 text-sm">
            <Link href={`/project/${params.id}`} className="text-muted-foreground hover:text-foreground">
              {params.id}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Button.tsx</span>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Toolbar */}
            <div className="border-b border-border bg-card px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Button.tsx</span>
                {hasChanges && <span className="text-xs text-yellow-600 dark:text-yellow-500">Unsaved</span>}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDiscard}
                  disabled={!hasChanges}
                  className="gap-2 bg-transparent"
                >
                  <RotateCcw className="w-4 h-4" />
                  Discard
                </Button>
                <Button size="sm" onClick={handleSave} disabled={!hasChanges} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save
                </Button>
                <Button size="sm" variant="ghost" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Add Message
                </Button>
              </div>
            </div>

            {/* Code Editor Area */}
            <div className="flex-1 overflow-hidden flex">
              {/* Line numbers and code */}
              <div className="flex flex-1 overflow-hidden bg-slate-950 dark:bg-slate-900">
                <div className="flex">
                  {/* Line numbers */}
                  <div className="bg-slate-900 dark:bg-slate-950 text-slate-500 px-4 py-4 font-mono text-sm select-none border-r border-slate-800">
                    {code.split("\n").map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>

                  {/* Code textarea */}
                  <div className="flex-1 overflow-auto">
                    <textarea
                      value={code}
                      onChange={handleCodeChange}
                      className="w-full h-full p-4 bg-slate-950 dark:bg-slate-900 text-slate-100 font-mono text-sm resize-none focus:outline-none border-none"
                      spellCheck="false"
                    />
                  </div>
                </div>
              </div>

              {/* Right panel - Diff preview */}
              <div className="w-80 border-l border-border bg-card overflow-y-auto">
                <div className="p-4 space-y-4">
                  <h3 className="font-semibold text-sm">Changes Preview</h3>

                  <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
                    <CardContent className="p-3">
                      <p className="text-xs font-mono text-red-700 dark:text-red-400 whitespace-pre-wrap break-words">
                        - function handleChange()
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                    <CardContent className="p-3">
                      <p className="text-xs font-mono text-green-700 dark:text-green-400 whitespace-pre-wrap break-words">
                        + const handleCodeChange = (e)
                      </p>
                    </CardContent>
                  </Card>

                  <div className="pt-4 border-t border-border space-y-3">
                    <h4 className="text-xs font-semibold text-muted-foreground">Add Change Message</h4>
                    <Input placeholder="Describe your changes..." className="text-sm" />
                    <Button size="sm" className="w-full">
                      Commit Changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
