"use client";

import React from "react";
import { AppLayout } from "@/components/layout/app-layout";

export default function AdminPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8 text-center">
        <h1 className="text-4xl font-black tracking-tight">Admin Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          Coming Soon
        </p>
        <p className="text-sm text-muted-foreground/70 max-w-md">
          We are currently building this section. Check back later for administrative features and settings.
        </p>
      </div>
    </AppLayout>
  );
}
