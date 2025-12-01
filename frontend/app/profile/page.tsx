"use client";

import type React from "react";
import { useState, useEffect } from "react";

import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Edit, Lock, Upload, Save, Plus, Trash2, Mail, User } from "lucide-react";

// api call
import { getUserProfile, updateUserProfile } from "../service/app";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  totalCommits: number;
  totalChanges: number;
}

interface Friend {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

const mockFriends: Friend[] = [
  { id: "1", username: "sarah_chen", email: "sarah@example.com", avatar: "SC" },
  { id: "2", username: "mike_johnson", email: "mike@example.com", avatar: "MJ" },
  { id: "3", username: "alex_rivera", email: "alex@example.com", avatar: "AR" },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isAddingFriend, setIsAddingFriend] = useState(false);

  const [newFriendUsername, setNewFriendUsername] = useState("");
  const [newFriendEmail, setNewFriendEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // api call
  useEffect(() => {
    async function load() {
      try {
        const data = await getUserProfile();
        setProfile(data);
        setEditedProfile(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const handleSaveDetails = async () => {
    try {
      if (!editedProfile) return;
      const updated = await updateUserProfile(editedProfile);
      setProfile(updated);
      setIsEditingDetails(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword && newPassword.length >= 8) {
      setIsChangingPassword(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile((prev) =>
          prev ? { ...prev, avatar: (event.target?.result as string) || "JD" } : prev
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFriend = () => {
    if (newFriendUsername && newFriendEmail) {
      const newFriend: Friend = {
        id: String(friends.length + 1),
        username: newFriendUsername,
        email: newFriendEmail,
        avatar: newFriendUsername.substring(0, 2).toUpperCase(),
      };
      setFriends([...friends, newFriend]);
      setNewFriendUsername("");
      setNewFriendEmail("");
      setIsAddingFriend(false);
    }
  };

  const handleRemoveFriend = (id: string) => {
    setFriends(friends.filter((f) => f.id !== id));
  };

  if (loading) return <p className="p-8">Loading profile...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (!profile) return null;

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="container-safe max-w-4xl mx-auto py-8">
          {/* Profile Header */}
          <Card className="border-2 mb-8">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row sm:items-end gap-6">

                {/* Avatar with Upload */}
                <div className="relative">
                  <Avatar className="w-24 h-24 border-2 border-foreground">
                    {typeof profile.avatar === "string" && profile.avatar.length > 2 ? (
                      <img
                        src={profile.avatar || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <AvatarFallback className="bg-foreground text-background text-2xl font-black">
                        {profile.avatar}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <label className="absolute bottom-0 right-0 bg-foreground text-background p-2 rounded-full cursor-pointer hover:bg-muted-foreground transition">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                  </label>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-black mb-2">{profile.name}</h1>
                  <p className="text-muted-foreground text-sm">{profile.email}</p>
                  <p className="text-sm mt-2">{profile.bio}</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  Total Commits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-black">{profile.totalCommits}</p>
                <p className="text-xs text-muted-foreground mt-2">Contributions to projects</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  Total Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-black">{profile.totalChanges}</p>
                <p className="text-xs text-muted-foreground mt-2">Files modified/created</p>
              </CardContent>
            </Card>
          </div>

          {/* Account Settings */}
          <div className="space-y-6">

            {/* Edit Details */}
            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle>Profile Details</CardTitle>
                <Dialog open={isEditingDetails} onOpenChange={setIsEditingDetails}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Edit className="w-4 h-4" /> Edit
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile Details</DialogTitle>
                      <DialogDescription>Update your personal information</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={editedProfile?.name || ""}
                          onChange={(e) =>
                            editedProfile && setEditedProfile({ ...editedProfile, name: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editedProfile?.email || ""}
                          onChange={(e) =>
                            editedProfile && setEditedProfile({ ...editedProfile, email: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          placeholder="Tell us about yourself"
                          value={editedProfile?.bio || ""}
                          onChange={(e) =>
                            editedProfile && setEditedProfile({ ...editedProfile, bio: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditingDetails(false)}>Cancel</Button>
                      <Button onClick={handleSaveDetails}>
                        <Save className="w-4 h-4 mr-2" /> Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>

              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{profile.name}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Bio</p>
                  <p className="font-medium">{profile.bio}</p>
                </div>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle>Security</CardTitle>
                <Dialog open={isChangingPassword} onOpenChange={setIsChangingPassword}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Lock className="w-4 h-4" /> Change Password
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>Enter your new password</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" placeholder="••••••••" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>

                      {newPassword && confirmPassword && newPassword !== confirmPassword && (
                        <p className="text-sm text-red-600">Passwords do not match</p>
                      )}

                      {newPassword && newPassword.length < 8 && (
                        <p className="text-sm text-yellow-600">Password must be at least 8 characters</p>
                      )}
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsChangingPassword(false)}>Cancel</Button>
                      <Button onClick={handleChangePassword} disabled={newPassword !== confirmPassword || newPassword.length < 8}>
                        Update Password
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>

              <CardContent className="text-sm">
                <p className="text-muted-foreground">Last changed 3 months ago</p>
              </CardContent>
            </Card>

            {/* Friends */}
            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle>Friends & Collaborators</CardTitle>

                <Dialog open={isAddingFriend} onOpenChange={setIsAddingFriend}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Plus className="w-4 h-4" /> Add Friend
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Friend</DialogTitle>
                      <DialogDescription>Invite a friend for collaboration</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="username" className="flex items-center gap-2">
                          <User className="w-4 h-4" /> Username
                        </Label>
                        <Input
                          id="username"
                          placeholder="john_doe"
                          value={newFriendUsername}
                          onChange={(e) => setNewFriendUsername(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="friend-email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Email
                        </Label>
                        <Input
                          id="friend-email"
                          type="email"
                          placeholder="john@example.com"
                          value={newFriendEmail}
                          onChange={(e) => setNewFriendEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingFriend(false)}>Cancel</Button>
                      <Button onClick={handleAddFriend}>Add Friend</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>

              <CardContent className="space-y-3">
                {friends.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No friends added yet</p>
                ) : (
                  friends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-foreground text-background text-xs font-bold">
                            {friend.avatar}
                          </AvatarFallback>
                        </Avatar>

                        <div className="text-sm">
                          <p className="font-semibold">{friend.username}</p>
                          <p className="text-xs text-muted-foreground">{friend.email}</p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFriend(friend.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
