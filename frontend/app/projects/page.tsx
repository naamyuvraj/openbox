"use client"

import { useState } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Calendar, ArrowRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/modal"
import { Label } from "@/components/ui/label"

interface ProjectItem {
  id: string
  name: string
  description: string
  owner: string
  members: number
  status: "active" | "archived"
  lastUpdated: Date
  progress: number
}

const mockProjects: ProjectItem[] = [
  {
    id: "1",
    name: "OpenBox MVP",
    description: "Building the initial minimum viable product",
    owner: "Sarah Chen",
    members: 5,
    status: "active",
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    progress: 65,
  },
  {
    id: "2",
    name: "Design System V2",
    description: "Refactoring the component library",
    owner: "Mike Johnson",
    members: 3,
    status: "active",
    lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000),
    progress: 45,
  },
  {
    id: "3",
    name: "API Documentation",
    description: "Comprehensive API documentation",
    owner: "Alex Rivera",
    members: 2,
    status: "active",
    lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
    progress: 80,
  },
  {
    id: "4",
    name: "Dashboard Analytics",
    description: "Build advanced analytics dashboard",
    owner: "Emma Wilson",
    members: 4,
    status: "archived",
    lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    progress: 100,
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "archived">("active")
  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState("")
  const [newProjectDescription, setNewProjectDescription] = useState("")

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || p.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleCreateProject = () => {
    if (newProjectName) {
      const newProject: ProjectItem = {
        id: String(projects.length + 1),
        name: newProjectName,
        description: newProjectDescription,
        owner: "John Doe",
        members: 1,
        status: "active",
        lastUpdated: new Date(),
        progress: 0,
      }
      setProjects([...projects, newProject])
      setNewProjectName("")
      setNewProjectDescription("")
      setIsCreatingProject(false)
    }
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border">
          <div className="container-safe max-w-6xl mx-auto py-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black tracking-tight">All Projects</h1>
                <p className="text-muted-foreground mt-2">Manage and track everything</p>
              </div>
              <Dialog open={isCreatingProject} onOpenChange={setIsCreatingProject}>
                <DialogTrigger asChild>
                  <Button className="gap-2 w-full sm:w-auto">
                    <Plus className="w-5 h-5" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>Start a new project with your team</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-name">Project Name</Label>
                      <Input
                        id="project-name"
                        placeholder="My Awesome Project"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-description">Description</Label>
                      <Input
                        id="project-description"
                        placeholder="What is this project about?"
                        value={newProjectDescription}
                        onChange={(e) => setNewProjectDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreatingProject(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateProject}>Create Project</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filters */}
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

        {/* Projects List */}
        <div className="container-safe max-w-6xl mx-auto py-8 space-y-4">
          {filtered.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground font-medium">No projects found</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((project) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <Card className="hover:shadow-lg transition-smooth cursor-pointer border-2 hover:border-foreground/50">
                  <CardContent className="py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-black text-lg">{project.name}</h3>
                          <Badge
                            variant={project.status === "active" ? "default" : "secondary"}
                            className="font-semibold text-xs"
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>

                        {/* Progress bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden border border-foreground/10">
                            <div
                              className="h-full bg-foreground transition-smooth"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:flex-col md:text-right text-sm gap-4">
                        <div>
                          <div className="font-black text-foreground">{project.owner}</div>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                            <Calendar className="w-3 h-3" />
                            {formatDistanceToNow(project.lastUpdated, { addSuffix: true })}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 font-semibold bg-transparent">
                          <span className="hidden sm:inline">{project.members}</span>
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
  )
}
