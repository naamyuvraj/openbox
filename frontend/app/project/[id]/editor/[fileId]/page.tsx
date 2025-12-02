"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Save, RotateCcw, MessageSquare } from "lucide-react";
import MonacoEditor from "@monaco-editor/react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditorPage() {
  const { id, fileId } = useParams();

  const BACKEND =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5170";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [code, setCode] = useState("");
  const [originalCode, setOriginalCode] = useState("");
  const [fileName, setFileName] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [commitMessage, setCommitMessage] = useState("");

  // ---------------------------------------------------------
  // FETCH LATEST VERSION OF THIS FILE
  // ---------------------------------------------------------
useEffect(() => {
  async function loadContent() {
    const res = await fetch(`${BACKEND}/projects/${id}/details`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.log("Error loading project details");
      return;
    }

    const data = await res.json();

    const file = data.files.find((f) => f._id === fileId);

    if (!file) {
      console.error("File not found");
      return;
    }

    setFileName(file.file_name);

    // IMPORTANT: your backend uses latest_content, not versions[]
    setCode(file.latest_content || "");
    setOriginalCode(file.latest_content || "");
  }

  loadContent();
}, [id, fileId]);

  const handleSave = async () => {
    const res = await fetch(`${BACKEND}/files/${fileId}/commit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        new_content: code,
        message: commitMessage,
        project_id: id,
      }),
    });

    setOriginalCode(code);
    setHasChanges(false);
    setCommitMessage("");

    alert("Committed successfully!");
  };

  const handleDiscard = () => {
    setCode(originalCode);
    setHasChanges(false);
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Top Navigation Breadcrumb */}
        <div className="border-b border-border">
          <div className="container-safe max-w-6xl mx-auto py-4 flex items-center gap-2 text-sm">
            <Link
              href={`/project/${id}`}
              className="text-muted-foreground hover:text-foreground"
            >
              {id}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{fileName}</span>
          </div>
        </div>

        {/* Editor Layout */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Toolbar */}
            <div className="border-b border-border bg-card px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{fileName}</span>
                {hasChanges && (
                  <span className="text-xs text-yellow-600">Unsaved</span>
                )}
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

                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  Commit
                </Button>
              </div>
            </div>

            {/* Editor + Commit Panel */}
            <div className="flex-1 overflow-hidden flex">
              {/* Monaco Editor */}
              <div className="flex-1">
                <MonacoEditor
                  language="typescript"
                  value={code}
                  onChange={(value) => {
                    setCode(value || "");
                    setHasChanges(value !== originalCode);
                  }}
                  height="100%"
                  theme="vs-dark"
                />
              </div>

              {/* Commit Sidebar */}
              <div className="w-80 border-l border-border bg-card p-4 space-y-4">
                <h3 className="font-semibold text-sm">Commit Message</h3>

                <Input
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="Describe your changes..."
                  className="text-sm"
                />

                <Button
                  size="sm"
                  className="w-full"
                  disabled={!commitMessage || !hasChanges}
                  onClick={handleSave}
                >
                  Commit Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
