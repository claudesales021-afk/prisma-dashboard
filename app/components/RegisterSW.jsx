"use client";
import { useEffect } from "react";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Registra o service worker só em produção (em dev o cache atrapalharia o hot reload).
export default function RegisterSW() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register(`${base}/sw.js`, { scope: `${base}/` }).catch(() => {});
  }, []);
  return null;
}
