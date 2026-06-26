"use client";

import { createContext, useContext } from "react";

const SiteSettingsContext = createContext<any>(null);

export function SiteSettingsProvider({ children, settings, navigation }: { children: React.ReactNode; settings: any; navigation: any }) {
  return <SiteSettingsContext.Provider value={{ settings, navigation }}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);

  if (!context) {
    throw new Error("useSiteSettings must be used inside SiteSettingsProvider");
  }

  return context;
}
