
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Used for entrance animation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Listen for sidebar changes from children
  useEffect(() => {
    const handleSidebarToggle = (e: CustomEvent) => {
      setIsSidebarExpanded(e.detail.expanded);
    };
    
    window.addEventListener("sidebar-toggle" as any, handleSidebarToggle);
    return () => {
      window.removeEventListener("sidebar-toggle" as any, handleSidebarToggle);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isMounted ? "animate-fade-in opacity-100" : "opacity-0",
          isSidebarExpanded ? "ml-64" : "ml-20"
        )}
      >
        <Header />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
