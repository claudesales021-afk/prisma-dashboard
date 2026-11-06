"use client";
import { useEffect } from "react";

// Registra o service worker só em produção (em dev o cache atrapalharia o hot reload).
export default function RegisterSW() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  return null;
}
