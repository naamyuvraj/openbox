"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router, searchParams]);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-black tracking-tight mb-2">Authenticating...</h2>
      <div className="w-8 h-8 rounded-full border-4 border-foreground border-t-transparent animate-spin mx-auto" />
      <p className="text-muted-foreground text-sm">Please wait while we log you in</p>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Suspense fallback={
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-black tracking-tight mb-2">Loading...</h2>
          <div className="w-8 h-8 rounded-full border-4 border-foreground border-t-transparent animate-spin mx-auto" />
        </div>
      }>
        <OAuthCallbackContent />
      </Suspense>
    </div>
  );
}
