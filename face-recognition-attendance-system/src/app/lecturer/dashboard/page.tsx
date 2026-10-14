"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  GraduationCap,
  Camera,
  ClipboardList,
  BarChart3,
  Users,
  Clock,
  TrendingUp,
  Calendar,
} from "lucide-react";

export default function LecturerDashboardPage() {
  // Mock data for demo
  const stats = {
    totalClasses: 3,
    totalStudents: 45,
    todayAttendance: 38,
    attendanceRate: 84.4,
    recentClasses: [
      {
        id: 1,
        name: "CS101 - Section A",
        course: "Introduction to Programming",
        time: "10:00 AM - 12:00 PM",
        room: "Room 101",
        attendance: 20,
        total: 25,
      },
      {
        id: 2,
        name: "CS201 - Section B",
        course: "Data Structures",
        time: "02:00 PM - 04:00 PM",
        room: "Room 202",
        attendance: 18,
        total: 20,
      },
    ],
    recentActivity: [
      { name: "Alice Johnson", studentId: "STU001", time: "10:15 AM", status: "present" },
      { name: "Bob Wilson", studentId: "STU002", time: "10:16 AM", status: "present" },
      { name: "Charlie Brown", studentId: "STU003", time: "10:17 AM", status: "present" },
    ],
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Lecturer Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Welcome back! Here&apos;s your today&apos;s overview
        </p>
      </div>

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
                <p className="text-sm text-slate-500 mb-1">Total Students</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalStudents}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Today&apos;s Attendance</p>
                <p className="text-2xl font-bold text-slate-900">{stats.todayAttendance}</p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Attendance Rate</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {stats.attendanceRate}%
                </p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card variant="bordered">
          <CardHeader
            title="Today's Classes"
            action={
              <Link href="/lecturer/classes">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            }
          />
          <CardContent>
            <div className="space-y-4">
              {stats.recentClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{cls.name}</p>
                    <p className="text-sm text-slate-500">{cls.course}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {cls.time}
                      </span>
                      <span className="text-xs text-slate-500">|</span>
                      <span className="text-xs text-slate-500">{cls.room}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-600">
                      {cls.attendance}/{cls.total}
                    </p>
                    <p className="text-xs text-slate-500">
                      {((cls.attendance / cls.total) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardHeader
            title="Recent Activity"
            action={
              <Link href="/lecturer/attendance/logs">
                <Button variant="ghost" size="sm">
                  View Logs
                </Button>
              </Link>
            }
          />
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{activity.name}</p>
                    <p className="text-sm text-slate-500">{activity.studentId}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" dot>
                      Present
                    </Badge>
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card variant="bordered">
        <CardHeader title="Quick Actions" />
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/lecturer/classes">
              <Button variant="secondary" className="w-full justify-start">
                <GraduationCap className="w-4 h-4 mr-2" />
                My Classes
              </Button>
            </Link>
            <Link href="/lecturer/attendance/scanner">
              <Button variant="primary" className="w-full justify-start">
                <Camera className="w-4 h-4 mr-2" />
                Start Scanner
              </Button>
            </Link>
            <Link href="/lecturer/attendance/logs">
              <Button variant="secondary" className="w-full justify-start">
                <ClipboardList className="w-4 h-4 mr-2" />
                View Logs
              </Button>
            </Link>
            <Link href="/lecturer/analytics">
              <Button variant="secondary" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card variant="bordered" className="mt-6">
        <CardHeader title="This Week's Schedule" />
        <CardContent>
          <div className="space-y-3">
            {[
              { day: "Monday", classes: ["CS101 - Section A (10:00-12:00)"] },
              { day: "Tuesday", classes: [] },
              { day: "Wednesday", classes: ["CS101 - Section A (10:00-12:00)"] },
              { day: "Thursday", classes: ["CS201 - Section B (14:00-16:00)"] },
              { day: "Friday", classes: [] },
            ].map((daySchedule, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg"
              >
                <div className="w-12 flex-shrink-0">
                  <p className="font-medium text-slate-700">{daySchedule.day}</p>
                </div>
                <div className="flex-1">
                  {daySchedule.classes.length > 0 ? (
                    daySchedule.classes.map((cls, clsIndex) => (
                      <p key={clsIndex} className="text-sm text-slate-600 mb-1">
                        {cls}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No classes</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
