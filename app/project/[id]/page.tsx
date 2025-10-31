"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Folder, Code, Plus, Trash2, ExternalLink, BarChart3, Globe } from "lucide-react"
import { mockFiles, mockChangeRecords, mockCollaborators } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/modal"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [collaborators, setCollaborators] = useState(mockCollaborators)
  const [isAddingCollaborator, setIsAddingCollaborator] = useState(false)
  const [newCollabUsername, setNewCollabUsername] = useState("")
  const [newCollabRole, setNewCollabRole] = useState("contributor")
  const [hostedLink, setHostedLink] = useState("https://openbox-mvp.vercel.app")
  const [isEditingLink, setIsEditingLink] = useState(false)
  const [tempLink, setTempLink] = useState(hostedLink)
  const [seoScore, setSeoScore] = useState(78)
  const [googleAnalyticsConnected, setGoogleAnalyticsConnected] = useState(false)

  const projectData = {
    id: params.id,
    name: "OpenBox MVP",
    description: "Building the initial minimum viable product",
    status: "active",
    owner: "Dev4ce Team",
    tags: ["frontend", "MVP", "Q1"],
    progress: 65,
    startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  }

  const handleAddCollaborator = () => {
    if (newCollabUsername) {
      const newCollab = {
        id: String(collaborators.length + 1),
        name: newCollabUsername,
        role: newCollabRole,
        avatar: newCollabUsername.substring(0, 2).toUpperCase(),
      }
      setCollaborators([...collaborators, newCollab])
      setNewCollabUsername("")
      setNewCollabRole("contributor")
      setIsAddingCollaborator(false)
    }
  }

  const handleRemoveCollaborator = (id: string) => {
    setCollaborators(collaborators.filter((c) => c.id !== id))
  }

  const handleSaveLink = () => {
    setHostedLink(tempLink)
    setIsEditingLink(false)
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border">
          <div className="container-safe max-w-6xl mx-auto py-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{projectData.name}</h1>
                  <Badge variant="default">{projectData.status}</Badge>
                </div>
                <p className="text-muted-foreground">{projectData.description}</p>
              </div>
              <Button variant="outline">Share</Button>
            </div>

            {/* Tags */}
            {projectData.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {projectData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-semibold text-foreground">{projectData.progress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-foreground transition-smooth" style={{ width: `${projectData.progress}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container-safe max-w-6xl mx-auto py-8">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="changes">Changes</TabsTrigger>
              <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Owner</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">{projectData.owner}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Start Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">{projectData.startDate.toLocaleDateString()}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Due Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">{projectData.dueDate.toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Project Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Objectives</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Create a clean, modern UI for project management</li>
                      <li>Implement CRUD operations for projects</li>
                      <li>Build team collaboration features</li>
                      <li>Establish clear API placeholders</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Files Tab */}
            <TabsContent value="files" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Project Files</h3>
                <Button size="sm" className="gap-2">
                  <Code className="w-4 h-4" />
                  Open Editor
                </Button>
              </div>

              {mockFiles.map((file) => (
                <Card key={file.id} className="hover:shadow-md transition-smooth cursor-pointer group">
                  <CardContent className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {file.type === "folder" ? (
                        <Folder className="w-5 h-5 text-foreground" />
                      ) : (
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.language || "folder"}</p>
                      </div>
                    </div>
                    {file.type === "file" && (
                      <Link href={`/project/${params.id}/editor/${file.id}`}>
                        <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100">
                          Edit
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Changes Tab */}
            <TabsContent value="changes" className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Change History</h3>

              {mockChangeRecords.map((record) => (
                <Card key={record.id}>
                  <CardContent className="py-4">
                    <div className="flex gap-4">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="bg-foreground text-background text-xs">
                          {record.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <p className="font-medium text-sm">{record.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(record.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">{record.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Collaborators Tab */}
            <TabsContent value="collaborators" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Team Members</h3>
                <Dialog open={isAddingCollaborator} onOpenChange={setIsAddingCollaborator}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Collaborator
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Collaborator</DialogTitle>
                      <DialogDescription>Invite someone to collaborate on this project</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="collab-username">Username</Label>
                        <Input
                          id="collab-username"
                          placeholder="john_doe"
                          value={newCollabUsername}
                          onChange={(e) => setNewCollabUsername(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="collab-role">Role</Label>
                        <select
                          id="collab-role"
                          value={newCollabRole}
                          onChange={(e) => setNewCollabRole(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                        >
                          <option value="admin">Admin</option>
                          <option value="contributor">Contributor</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingCollaborator(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddCollaborator}>Add Collaborator</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {collaborators.map((collaborator) => (
                <Card key={collaborator.id}>
                  <CardContent className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-foreground text-background">{collaborator.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{collaborator.name}</p>
                        <p className="text-sm text-muted-foreground">{collaborator.role}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveCollaborator(collaborator.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              {/* Hosted Link */}
              <Card className="border-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Hosted Link
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsEditingLink(!isEditingLink)
                      setTempLink(hostedLink)
                    }}
                  >
                    {isEditingLink ? "Cancel" : "Edit"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditingLink ? (
                    <div className="space-y-3">
                      <Input value={tempLink} onChange={(e) => setTempLink(e.target.value)} placeholder="https://..." />
                      <div className="flex gap-2">
                        <Button className="flex-1" onClick={handleSaveLink}>
                          Save Link
                        </Button>
                      </div>
                    </div>
                  ) : hostedLink ? (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <ExternalLink className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      <a
                        href={hostedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-foreground break-all hover:underline"
                      >
                        {hostedLink}
                      </a>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No hosted link added yet</p>
                  )}
                </CardContent>
              </Card>

              {/* SEO Score */}
              {hostedLink && (
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      SEO Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">Overall Score</span>
                        <span className="text-2xl font-black">{seoScore}/100</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden border border-foreground/10">
                        <div className="h-full bg-foreground transition-smooth" style={{ width: `${seoScore}%` }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-3 border border-border rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Mobile Friendly</p>
                        <p className="font-semibold">92%</p>
                      </div>
                      <div className="p-3 border border-border rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Page Speed</p>
                        <p className="font-semibold">85%</p>
                      </div>
                      <div className="p-3 border border-border rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Meta Tags</p>
                        <p className="font-semibold">78%</p>
                      </div>
                      <div className="p-3 border border-border rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Accessibility</p>
                        <p className="font-semibold">88%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Google Analytics */}
              <Card className="border-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle>Google Analytics</CardTitle>
                  <Button
                    size="sm"
                    variant={googleAnalyticsConnected ? "default" : "outline"}
                    onClick={() => setGoogleAnalyticsConnected(!googleAnalyticsConnected)}
                  >
                    {googleAnalyticsConnected ? "Connected" : "Connect"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {googleAnalyticsConnected ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 border border-border rounded-lg">
                          <p className="text-muted-foreground text-xs mb-1">Total Users</p>
                          <p className="font-black text-lg">5,234</p>
                        </div>
                        <div className="p-3 border border-border rounded-lg">
                          <p className="text-muted-foreground text-xs mb-1">Sessions</p>
                          <p className="font-black text-lg">8,456</p>
                        </div>
                        <div className="p-3 border border-border rounded-lg">
                          <p className="text-muted-foreground text-xs mb-1">Bounce Rate</p>
                          <p className="font-black text-lg">32%</p>
                        </div>
                        <div className="p-3 border border-border rounded-lg">
                          <p className="text-muted-foreground text-xs mb-1">Avg Session</p>
                          <p className="font-black text-lg">2m 34s</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Connect your Google Analytics account to view analytics data
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  )
}
