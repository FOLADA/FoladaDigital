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
      cacheTime: 10 * 60 * 1000, // 10 minutes
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
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
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
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
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