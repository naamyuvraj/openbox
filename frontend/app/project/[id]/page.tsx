"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Folder, FileText } from "lucide-react";
import Link from "next/link";

export default function ProjectPage() {
  const { id } = useParams();

  const [project, setProject] = useState<any | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [commits, setCommits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("files");
  const [selectedCommit, setSelectedCommit] = useState<any | null>(null);

  const BACKEND =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5170";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // -----------------------------
  // FETCH DATA
  // -----------------------------
  useEffect(() => {
    async function loadAll() {
      try {
        const pRes = await fetch(`${BACKEND}/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const dRes = await fetch(`${BACKEND}/projects/${id}/details`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!pRes.ok) throw new Error(await pRes.text());
        if (!dRes.ok) throw new Error(await dRes.text());

        const { project } = await pRes.json();
        const { files, commits } = await dRes.json();

        setProject(project);
        setFiles(files);
        setCommits(commits);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, [id]);

  function groupFiles(files: any[]) {
    const groups: Record<string, any[]> = {};
    for (const file of files) {
      const folder = file.file_path.split("/")[0]; // top folder
      if (!groups[folder]) groups[folder] = [];
      groups[folder].push(file);
    }
    return groups;
  }

  const grouped = groupFiles(files);

  if (loading)
    return (
      <AppLayout>
        <div className="p-10 text-muted-foreground">Loading...</div>
      </AppLayout>
    );
  if (!project)
    return (
      <AppLayout>
        <div className="p-10 text-red-400">Project not found</div>
      </AppLayout>
    );

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* HEADER */}
        <div className="border-b border-border">
          <div className="container-safe max-w-6xl mx-auto py-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{project.name}</h1>
                  <Badge variant="default">active</Badge>
                </div>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              <Button variant="outline">Share</Button>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="container-safe max-w-6xl mx-auto py-8">
          <Tabs
            value={activeTab}
            onValueChange={(v) => {
              setActiveTab(v);
              setSelectedCommit(null);
            }}
          >
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="commits">Commits</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>

            {/* FILES */}
            <TabsContent value="files" className="space-y-6">
              {Object.keys(grouped).map((folder) => (
                <div key={folder}>
                  {grouped[folder].map((file) => (
                    <div key={file._id} className="w-full">
                      <Card className="hover:shadow-lg transition-smooth cursor-pointer border border-border">
                        <CardContent className="py-5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-semibold">{file.file_path}</p>
                              <p className="text-s text-muted-foreground">
                                {file.file_name.split(".").pop()} · v
                                {file.latest_version ?? 1}
                              </p>
                            </div>
                          </div>
                          <Link href={`/project/${id}/editor/${file._id}`}>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="font-semibold"
                            >
                              Edit
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              ))}
            </TabsContent>

            {/* COMMITS */}
            <TabsContent value="commits" className="space-y-4">
              <h3 className="text-lg font-semibold">Change History</h3>

              {commits.length === 0 ? (
                <p className="text-muted-foreground">No commits yet</p>
              ) : (
                <div className="space-y-2">
                  {commits.map((c) => (
                    <Card
                      key={c._id}
                      onClick={() => setSelectedCommit(c)}
                      className="cursor-pointer hover:shadow-lg transition"
                    >
                      <CardContent className="p-4">
                        <p className="font-semibold">{c.commit_title}</p>
                        <p className="text-sm text-muted-foreground">
                          {c.message}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {c.files.length} changed files
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* SHOW DIFF FOR SELECTED COMMIT */}
              {selectedCommit && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Files Changed</h4>
                  {selectedCommit.files.map((f: any) => (
                    <Card key={f.file_id}>
                      <CardContent className="p-4">
                        <p className="font-semibold mb-2">{f.file_name}</p>
                        <div
                          className="max-w-full overflow-auto text-sm p-2 border border-border rounded whitespace-pre-wrap font-mono"
                          style={{ backgroundColor: "#1e1e1e" }}
                          dangerouslySetInnerHTML={{ __html: f.diff }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* OVERVIEW */}
            <TabsContent value="overview">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm">{project.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
