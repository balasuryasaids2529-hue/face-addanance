// Basic types for the application

export type UserRole = "admin" | "lecturer" | "student";
export type AttendanceStatus = "present" | "absent" | "late";

// User types
export interface User {
  id: number;
  studentId: string | null;
  name: string;
  email: string | null;
  role: UserRole;
  departmentId: number | null;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: number;
  name: string;
  code: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: number;
  name: string;
  code: string;
  departmentId: number;
  description: string | null;
  credits: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Class {
  id: number;
  courseId: number;
  lecturerId: number;
  name: string;
  room: string | null;
  schedule: string;
  academicYear: string | null;
  semester: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceLog {
  id: number;
  classId: number;
  studentId: number;
  date: Date;
  timeIn: Date;
  timeOut: Date | null;
  status: AttendanceStatus;
  notes: string | null;
  recognizedAt: Date | null;
  confidence: any;
  createdAt: Date;
}

export interface FaceEncoding {
  id: number;
  userId: number;
  encoding: number[];
  version: number;
  isPrimary: boolean;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Face Recognition types
export interface RecognizedFace {
  userId: number;
  name: string;
  studentId: string;
  confidence: number;
  matched: boolean;
}

// Analytics types
export interface AttendanceStats {
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  presentPercentage: number;
  absentPercentage: number;
  latePercentage: number;
}

export interface DailyAttendance {
  date: string;
  present: number;
  absent: number;
  late: number;
}

// Notification types
export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  isRead: boolean;
  type: string;
  relatedId: number | null;
  relatedType: string | null;
  createdAt: Date;
}
