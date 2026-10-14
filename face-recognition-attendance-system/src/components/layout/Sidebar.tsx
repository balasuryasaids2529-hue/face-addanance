"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Building2,
  ClipboardList,
  BarChart3,
  Camera,
  LogOut,
  Settings,
  User,
  GraduationCap,
  Calendar,
} from "lucide-react";

interface SidebarProps {
  isCollapsed?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
}

const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, roles: ["admin"] },
  { label: "Departments", href: "/admin/departments", icon: <Building2 className="w-5 h-5" />, roles: ["admin"] },
  { label: "Courses", href: "/admin/courses", icon: <BookOpen className="w-5 h-5" />, roles: ["admin"] },
  { label: "Users", href: "/admin/users", icon: <Users className="w-5 h-5" />, roles: ["admin"] },
  { label: "Attendance Logs", href: "/admin/logs", icon: <ClipboardList className="w-5 h-5" />, roles: ["admin"] },
  { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="w-5 h-5" />, roles: ["admin"] },
];

const lecturerNavItems: NavItem[] = [
  { label: "Dashboard", href: "/lecturer/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, roles: ["lecturer"] },
  { label: "My Classes", href: "/lecturer/classes", icon: <GraduationCap className="w-5 h-5" />, roles: ["lecturer"] },
  { label: "Attendance Scanner", href: "/lecturer/attendance/scanner", icon: <Camera className="w-5 h-5" />, roles: ["lecturer"] },
  { label: "Attendance Logs", href: "/lecturer/attendance/logs", icon: <ClipboardList className="w-5 h-5" />, roles: ["lecturer"] },
  { label: "Analytics", href: "/lecturer/analytics", icon: <BarChart3 className="w-5 h-5" />, roles: ["lecturer"] },
];

const studentNavItems: NavItem[] = [
  { label: "Dashboard", href: "/student/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, roles: ["student"] },
  { label: "My Attendance", href: "/student/attendance", icon: <Calendar className="w-5 h-5" />, roles: ["student"] },
  { label: "Profile", href: "/student/profile", icon: <User className="w-5 h-5" />, roles: ["student"] },
];

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const getNavItems = () => {
    switch (user?.role) {
      case "admin":
        return adminNavItems;
      case "lecturer":
        return lecturerNavItems;
      case "student":
        return studentNavItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-slate-800 text-white transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-700">
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">Smart Attendance</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200",
              isActive(item.href)
                ? "bg-emerald-600 text-white"
                : "text-slate-300 hover:bg-slate-700 hover:text-white",
              isCollapsed ? "justify-center px-2" : ""
            )}
          >
            {item.icon}
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-800">
        {!isCollapsed && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
            </div>
          </div>
        )}
        
        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 w-full",
            "text-slate-300 hover:bg-slate-700 hover:text-white",
            isCollapsed ? "justify-center px-2" : ""
          )}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
