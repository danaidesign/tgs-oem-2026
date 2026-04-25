"use client";

import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    // Client-side redirect to default locale — works on any static host
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    window.location.replace(base + "/en/");
  }, []);

  return null;
}
