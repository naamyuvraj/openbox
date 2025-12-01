"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import JSZip from "jszip";

import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Calendar, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/modal";

import { Label } from "@/components/ui/label";

interface ProjectItem {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  progress?: number;
  owner?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "archived"
  >("active");

  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [folderFiles, setFolderFiles] = useState<FileList | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data.projects);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    load();
  }, []);

  // ----------------------------
  // HANDLE FOLDER SELECTION
  // ----------------------------
  function handleFolderSelect(e: any) {
    setFolderFiles(e.target.files);
  }

  // ----------------------------
  // ZIP + UPLOAD PROJECT
  // ----------------------------
  // inside your ProjectsPage component
async function handleUploadProject() {
  if (!folderFiles || folderFiles.length === 0) return;

  // 1️⃣ Zip the folder
  const zip = new JSZip();
  for (const file of Array.from(folderFiles)) {
    const path =
      (file as any).webkitRelativePath ||
      (file as any).relativePath ||
      file.name;

    zip.file(path, file);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });

  const sizeBytes = zipBlob.size;
  const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2);
  console.log("ZIP size:", sizeBytes, "bytes (~", sizeMB, "MB )");

  if (sizeBytes > 50 * 1024 * 1024) {
    alert(
      `ZIP is ${sizeMB} MB — larger than 50 MB. Consider zipping fewer files or using S3 upload.`
    );
    return;
  }

  // 2️⃣ Prepare FormData
  const formData = new FormData();
  formData.append("projectZip", zipBlob, "project.zip");

  // 3️⃣ Get backend URL + JWT Token
  const BACKEND = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5170";

  // Token from localStorage (YOUR backend requires Bearer token)
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You are not logged in. No token found.");
    return;
  }

  try {
    // 4️⃣ Call backend
    const res = await fetch(`${BACKEND}/projects/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`, // REQUIRED FOR YOUR BACKEND
      },
    });

    // 5️⃣ If backend responded with HTML error page → avoid JSON parsing crash
    const text = await res.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Server returned non-JSON:", text);
      alert("Upload failed: Server returned an invalid response");
      return;
    }

    // 6️⃣ Handle success
    if (res.ok) {
      console.log("Upload success:", data);
      setIsCreatingProject(false);
      window.location.reload();
      return;
    }

    // 7️⃣ Handle backend errors
    console.error("Upload error:", data);
    alert(data.error || data.message || "Upload failed");

  } catch (err) {
    console.error("Upload error", err);
    alert("Upload failed. Check console for details.");
  }
}

  // ----------------------------
  // FILTER PROJECTS
  // ----------------------------
  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || filterStatus === "active";
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border">
          <div className="container-safe max-w-6xl mx-auto py-8 space-y-6">
            {/* Title + New Project */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black tracking-tight">
                  All Projects
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage and track everything
                </p>
              </div>

              {/* Upload Project (Folder → ZIP) */}
              <Dialog
                open={isCreatingProject}
                onOpenChange={setIsCreatingProject}
              >
                <DialogTrigger asChild>
                  <Button className="gap-2 w-full sm:w-auto">
                    <Plus className="w-5 h-5" />
                    New Project
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Project Folder</DialogTitle>
                    <DialogDescription>
                      Select a full project folder to create a repo.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Select Folder</Label>
                      <Input
                        type="file"
                        webkitdirectory="true"
                        directory="true"
                        multiple
                        onChange={handleFolderSelect}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreatingProject(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUploadProject}>Upload</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("active")}
                  className="font-semibold"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Active
                </Button>

                <Button
                  variant={filterStatus === "archived" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("archived")}
                  className="font-semibold"
                >
                  Archived
                </Button>

                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                  className="font-semibold"
                >
                  All
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT LIST */}
        <div className="container-safe max-w-6xl mx-auto py-8 space-y-4">
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : filtered.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground font-medium">
                  No projects found
                </p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((project) => (
              <Link key={project._id} href={`/project/${project._id}`}>
                <Card className="hover:shadow-lg transition-smooth cursor-pointer border-2 hover:border-foreground/50">
                  <CardContent className="py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-black text-lg">{project.name}</h3>
                          <Badge
                            variant="default"
                            className="font-semibold text-xs"
                          >
                            active
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {project.description || "No description"}
                        </p>

                        {/* Progress bar (static for now) */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                            <span>Progress</span>
                            <span>0%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden border border-foreground/10">
                            <div
                              className="h-full bg-foreground transition-smooth"
                              style={{ width: "0%" }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:flex-col md:text-right text-sm gap-4">
                        <div>
                          <div className="font-black text-foreground">You</div>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                            <Calendar className="w-3 h-3" />
                            {formatDistanceToNow(new Date(project.updatedAt), {
                              addSuffix: true,
                            })}
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 font-semibold bg-transparent"
                        >
                          <span className="hidden sm:inline">→</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
