import { db } from "@/db";
import { eq, count, countDistinct } from "drizzle-orm";
import {
  users,
  departments,
  courses,
  classes,
  attendanceLogs,
} from "@/db/schema";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Users,
  Building2,
  BookOpen,
  GraduationCap,
  ClipboardList,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react";

async function getStats() {
  const [
    userCount,
    departmentCount,
    courseCount,
    classCount,
    attendanceCount,
    presentCount,
    absentCount,
  ] = await Promise.all([
    db.select({ count: count() }).from(users),
    db.select({ count: count() }).from(departments),
    db.select({ count: count() }).from(courses),
    db.select({ count: count() }).from(classes),
    db.select({ count: count() }).from(attendanceLogs),
    db
      .select({ count: count() })
      .from(attendanceLogs)
      .where(eq(attendanceLogs.status, "present")),
    db
      .select({ count: count() })
      .from(attendanceLogs)
      .where(eq(attendanceLogs.status, "absent")),
  ]);

  return {
    userCount: userCount[0]?.count || 0,
    departmentCount: departmentCount[0]?.count || 0,
    courseCount: courseCount[0]?.count || 0,
    classCount: classCount[0]?.count || 0,
    attendanceCount: attendanceCount[0]?.count || 0,
    presentCount: presentCount[0]?.count || 0,
    absentCount: absentCount[0]?.count || 0,
  };
}

async function getRecentActivity() {
  const logs = await db
    .select({
      id: attendanceLogs.id,
      studentName: users.name,
      studentId: users.studentId,
      className: classes.name,
      date: attendanceLogs.date,
      timeIn: attendanceLogs.timeIn,
      status: attendanceLogs.status,
    })
    .from(attendanceLogs)
    .leftJoin(users, eq(attendanceLogs.studentId, users.id))
    .leftJoin(classes, eq(attendanceLogs.classId, classes.id))
    .orderBy(attendanceLogs.createdAt)
    .limit(5);

  return logs;
}

export default async function AdminDashboardPage() {
  const stats = await getStats();
  const recentActivity = await getRecentActivity();

  const attendanceRate = stats.attendanceCount > 0
    ? ((stats.presentCount + stats.absentCount) / stats.attendanceCount) * 100
    : 0;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Welcome to the Smart Attendance System
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card variant="bordered">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.userCount}
                </p>
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
                <p className="text-sm text-slate-500 mb-1">Departments</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.departmentCount}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Courses</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.courseCount}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Classes</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.classCount}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card variant="bordered">
          <CardHeader title="Attendance Overview" />
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Records</p>
                  <p className="text-xl font-bold text-slate-900">
                    {stats.attendanceCount}
                  </p>
                </div>
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-slate-600" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Present</p>
                  <p className="text-xl font-bold text-emerald-600">
                    {stats.presentCount}
                  </p>
                </div>
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Absent</p>
                  <p className="text-xl font-bold text-red-600">
                    {stats.absentCount}
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Attendance Rate</p>
                  <p className="text-xl font-bold text-blue-600">
                    {attendanceRate.toFixed(1)}%
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardHeader title="Recent Activity" />
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">
                        {activity.studentName}
                      </p>
                      <p className="text-sm text-slate-500">
                        {activity.className} - {activity.studentId}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === "present"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {activity.status}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  No recent activity
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card variant="bordered">
        <CardHeader title="Quick Actions" />
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/users">
              <Button variant="secondary" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/departments">
              <Button variant="secondary" className="w-full justify-start">
                <Building2 className="w-4 h-4 mr-2" />
                Departments
              </Button>
            </Link>
            <Link href="/admin/courses">
              <Button variant="secondary" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Courses
              </Button>
            </Link>
            <Link href="/admin/logs">
              <Button variant="secondary" className="w-full justify-start">
                <ClipboardList className="w-4 h-4 mr-2" />
                View Logs
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
