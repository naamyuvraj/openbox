export const mockFiles = [
  { id: "1", name: "index.ts", type: "file", language: "typescript" },
  { id: "2", name: "utils.ts", type: "file", language: "typescript" },
  { id: "3", name: "components", type: "folder" },
  { id: "4", name: "Button.tsx", type: "file", language: "tsx" },
  { id: "5", name: "Card.tsx", type: "file", language: "tsx" },
  { id: "6", name: "styles.css", type: "file", language: "css" },
]

export const mockChangeRecords = [
  {
    id: "1",
    author: "Sarah Chen",
    message: "Updated component API and added new props",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    author: "Mike Johnson",
    message: "Fixed styling issues in dark mode",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: "3",
    author: "Alex Rivera",
    message: "Added comprehensive documentation",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
]

export const mockCollaborators = [
  { id: "1", name: "Sarah Chen", role: "Owner", avatar: "SC" },
  { id: "2", name: "Mike Johnson", role: "Editor", avatar: "MJ" },
  { id: "3", name: "Alex Rivera", role: "Viewer", avatar: "AR" },
  { id: "4", name: "Emma Wilson", role: "Editor", avatar: "EW" },
]

export const mockUsers = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "User",
    status: "active",
  },
  {
    id: "3",
    name: "Alex Rivera",
    email: "alex@example.com",
    role: "User",
    status: "inactive",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "Moderator",
    status: "active",
  },
]
