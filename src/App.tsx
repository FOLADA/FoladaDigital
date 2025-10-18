// src/App.tsx
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Lazy load components for better performance
import { lazy, Suspense as ReactSuspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

import { useTranslation } from "react-i18next";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/* ---------- optional floating language switcher ---------- */
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const langs = ["en", "ka", "ru"];

  return (
    <div className="fixed top-4 right-4 z-[9999] flex gap-2">
      {langs.map((lng) => (
        <button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          className={`px-2 py-1 text-xs rounded-md border
            ${
              i18n.resolvedLanguage === lng
                ? "bg-red-600 text-white border-red-600"
                : "bg-black/50 text-red-300 border-red-900/50 hover:bg-black/70"
            }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
/* -------------------------------------------------------- */

// Loading component for lazy loading
const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    {/* Sophisticated Gradient Background for loading state - expanded black at top */}
    <div className="fixed inset-0 z-0 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,_#DC143C_0%,_#8B0000_15%,_#4A0E0E_30%,_#2B0808_50%,_#0D0404_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,_rgba(220,20,60,0.4)_0%,_rgba(139,0,0,0.2)_20%,_transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(13,4,4,0.9)_100%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_#000000_0%,_transparent_30%)]"></div>
    </div>
    <div className="relative z-10 w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* Suspense lets react‑i18next wait for JSON files the first time */}
      <ReactSuspense fallback={<LoadingFallback />}>
        {/* optional global language switch */}
        <LanguageSwitcher />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <ReactSuspense fallback={<LoadingFallback />}>
                <Index />
              </ReactSuspense>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH‑ALL "*" ROUTE */}
            <Route path="*" element={
              <ReactSuspense fallback={<LoadingFallback />}>
                <NotFound />
              </ReactSuspense>
            } />
          </Routes>
        </BrowserRouter>
      </ReactSuspense>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;