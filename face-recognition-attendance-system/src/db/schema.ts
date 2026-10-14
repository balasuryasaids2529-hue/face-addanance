import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  primaryKey,
  pgEnum,
  boolean,
  jsonb,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// User Roles
export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "lecturer",
  "student",
]);

// Attendance Status
export const attendanceStatusEnum = pgEnum("attendance_status", [
  "present",
  "absent",
  "late",
]);

// Departments Table
export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 20 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Courses Table
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 20 }).notNull().unique(),
  departmentId: integer("department_id").references(() => departments.id, {
    onDelete: "cascade",
  }),
  description: text("description"),
  credits: integer("credits").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id", { length: 50 }).unique(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).unique(),
  password: text("password"),
  role: userRoleEnum("role").notNull().default("student"),
  departmentId: integer("department_id").references(() => departments.id, {
    onDelete: "set null",
  }),
  avatarUrl: text("avatar_url"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Classes/Sections Table
export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  lecturerId: integer("lecturer_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  room: varchar("room", { length: 50 }),
  schedule: text("schedule").notNull(), // e.g., "Mon 10:00-12:00"
  academicYear: varchar("academic_year", { length: 50 }),
  semester: varchar("semester", { length: 50 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Class-Student Enrollment (Many-to-Many)
export const classStudents = pgTable(
  "class_students",
  {
    classId: integer("class_id")
      .references(() => classes.id, { onDelete: "cascade" })
      .notNull(),
    studentId: integer("student_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.classId, t.studentId] }),
  ]
);

// Attendance Logs Table
export const attendanceLogs = pgTable("attendance_logs", {
  id: serial("id").primaryKey(),
  classId: integer("class_id")
    .references(() => classes.id, { onDelete: "cascade" })
    .notNull(),
  studentId: integer("student_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  date: timestamp("date").notNull(),
  timeIn: timestamp("time_in").notNull(),
  timeOut: timestamp("time_out"),
  status: attendanceStatusEnum("status").notNull().default("present"),
  notes: text("notes"),
  recognizedAt: timestamp("recognized_at"),
  confidence: jsonb("confidence"), // Store face recognition confidence data
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Face Encodings Table
export const faceEncodings = pgTable("face_encodings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  encoding: jsonb("encoding").notNull(), // Store face-api.js descriptor array
  version: integer("version").default(1).notNull(),
  isPrimary: boolean("is_primary").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// System Logs Table
export const systemLogs = pgTable("system_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "set null",
  }),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entity_type", { length: 50 }).notNull(),
  entityId: integer("entity_id"),
  metadata: jsonb("metadata"),
  ipAddress: varchar("ip_address", { length: 50 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Notifications Table
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  type: varchar("type", { length: 50 }).default("info"),
  relatedId: integer("related_id"),
  relatedType: varchar("related_type", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const departmentsRelations = relations(departments, ({ many }) => ({
  courses: many(courses),
  users: many(users),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  department: one(departments, {
    fields: [courses.departmentId],
    references: [departments.id],
  }),
  classes: many(classes),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  department: one(departments, {
    fields: [users.departmentId],
    references: [departments.id],
  }),
  faceEncodings: many(faceEncodings),
  taughtClasses: many(classes, { relationName: "lecturer" }),
  enrolledClasses: many(classStudents),
  attendanceLogs: many(attendanceLogs),
  systemLogs: many(systemLogs),
  notifications: many(notifications),
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
  course: one(courses, {
    fields: [classes.courseId],
    references: [courses.id],
  }),
  lecturer: one(users, {
    fields: [classes.lecturerId],
    references: [users.id],
    relationName: "lecturer",
  }),
  students: many(classStudents),
  attendanceLogs: many(attendanceLogs),
}));

export const classStudentsRelations = relations(classStudents, ({ one }) => ({
  class: one(classes, {
    fields: [classStudents.classId],
    references: [classes.id],
  }),
  student: one(users, {
    fields: [classStudents.studentId],
    references: [users.id],
  }),
}));

export const attendanceLogsRelations = relations(
  attendanceLogs,
  ({ one }) => ({
    class: one(classes, {
      fields: [attendanceLogs.classId],
      references: [classes.id],
    }),
    student: one(users, {
      fields: [attendanceLogs.studentId],
      references: [users.id],
    }),
  })
);

export const faceEncodingsRelations = relations(faceEncodings, ({ one }) => ({
  user: one(users, {
    fields: [faceEncodings.userId],
    references: [users.id],
  }),
}));

export const systemLogsRelations = relations(systemLogs, ({ one }) => ({
  user: one(users, {
    fields: [systemLogs.userId],
    references: [users.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

// Export all tables for Drizzle
export const allTables = {
  departments,
  courses,
  users,
  classes,
  classStudents,
  attendanceLogs,
  faceEncodings,
  systemLogs,
  notifications,
};
