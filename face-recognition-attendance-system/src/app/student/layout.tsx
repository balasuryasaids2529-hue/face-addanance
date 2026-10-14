"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? "ml-20" : "ml-64"}`}>
        <Navbar onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        
        <main className="pt-16 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
