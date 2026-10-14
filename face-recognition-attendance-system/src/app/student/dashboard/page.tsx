"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calendar,
  Clock,
  GraduationCap,
  BarChart3,
  TrendingUp,
  TrendingDown,
  User,
  Building2,
} from "lucide-react";

export default function StudentDashboardPage() {
  // Mock data for demo
  const studentInfo = {
    name: "Alice Johnson",
    studentId: "STU001",
    department: "Computer Science",
    email: "alice@student.university.edu",
  };

  const stats = {
    totalClasses: 3,
    presentCount: 25,
    absentCount: 2,
    lateCount: 1,
    attendanceRate: 89.3,
  };

  const recentAttendance = [
    { date: "2024-01-15", className: "CS101 - Section A", status: "present", time: "10:15 AM" },
    { date: "2024-01-14", className: "CS201 - Section B", status: "present", time: "02:05 PM" },
    { date: "2024-01-13", className: "CS101 - Section A", status: "present", time: "10:10 AM" },
    { date: "2024-01-12", className: "CS201 - Section B", status: "absent", time: "-" },
    { date: "2024-01-11", className: "CS101 - Section A", status: "late", time: "10:25 AM" },
  ];

  const classes = [
    { name: "CS101 - Section A", course: "Introduction to Programming", instructor: "Dr. John Smith", schedule: "Mon, Wed 10:00-12:00", room: "Room 101" },
    { name: "CS201 - Section B", course: "Data Structures", instructor: "Dr. Jane Doe", schedule: "Thu 14:00-16:00", room: "Room 202" },
  ];

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "present":
        return "success";
      case "absent":
        return "danger";
      case "late":
        return "warning";
      default:
        return "default";
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case "present":
        return "text-emerald-600";
      case "absent":
        return "text-red-600";
      case "late":
        return "text-amber-600";
      default:
        return "text-slate-600";
    }
  };

  const getBgColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-emerald-100";
      case "absent":
        return "bg-red-100";
      case "late":
        return "bg-amber-100";
      default:
        return "bg-slate-100";
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Track your attendance and academic progress
        </p>
      </div>

      {/* Student Info */}
      <Card variant="bordered" className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{studentInfo.name}</h2>
              <p className="text-slate-600 mt-1">{studentInfo.studentId}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600">{studentInfo.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">{studentInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card variant="bordered">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Total Classes</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalClasses}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Present</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.presentCount}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Absent</p>
                <p className="text-2xl font-bold text-red-600">{stats.absentCount}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Attendance Rate</p>
                <p className="text-2xl font-bold text-blue-600">{stats.attendanceRate}%</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card variant="bordered">
          <CardHeader title="My Classes" />
          <CardContent>
            <div className="space-y-4">
              {classes.map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{cls.name}</p>
                    <p className="text-sm text-slate-500">{cls.course}</p>
                    <p className="text-xs text-slate-400 mt-1">{cls.instructor}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardHeader
            title="Recent Attendance"
            action={
              <Link href="/student/attendance">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            }
          />
          <CardContent>
            <div className="space-y-4">
              {recentAttendance.map((attendance, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getBgColor(attendance.status)}`}>
                    <Calendar className={`w-4 h-4 ${getIconColor(attendance.status)}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{attendance.className}</p>
                    <p className="text-sm text-slate-500">{attendance.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getBadgeVariant(attendance.status)}>
                      {attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}
                    </Badge>
                    {attendance.time !== "-" && (
                      <span className="text-sm text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {attendance.time}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Summary Chart (Placeholder) */}
      <Card variant="bordered">
        <CardHeader title="Attendance Summary" />
        <CardContent>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-slate-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Chart will be displayed here</p>
              <p className="text-sm mt-1">
                (In a real implementation, this would show attendance trends)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
