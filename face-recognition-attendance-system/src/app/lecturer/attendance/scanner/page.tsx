"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaceScanner } from "@/components/face/FaceScanner";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { GraduationCap, ChevronLeft } from "lucide-react";

export default function AttendanceScannerPage() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState("");

  // In a real app, these would be fetched from the API
  const classes = [
    { id: 1, name: "CS101 - Section A" },
    { id: 2, name: "CS201 - Section B" },
  ];

  const handleFaceRecognized = (userId: number, name: string, studentId: string) => {
    console.log(`Recognized: ${name} (${studentId})`);
    // In a real app, you would call an API to mark attendance
    // markAttendance(classId, userId)
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </Button>

        <h1 className="text-2xl font-bold text-slate-900">Attendance Scanner</h1>
        <p className="text-slate-500 mt-1">
          Scan students faces to mark attendance in real-time
        </p>
      </div>

      {/* Class Selection */}
      <Card className="mb-6" variant="bordered">
        <CardHeader
          title="Select Class"
          description="Choose the class for which you want to mark attendance"
        />
        <CardContent>
          <Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            options={[
              { value: "", label: "Select a class..." },
              ...classes.map((c) => ({ value: c.id.toString(), label: c.name })),
            ]}
          />
        </CardContent>
      </Card>

      {/* Face Scanner */}
      {selectedClass && (
        <FaceScanner
          classId={parseInt(selectedClass)}
          onFaceRecognized={handleFaceRecognized}
        />
      )}

      {!selectedClass && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No class selected
            </h3>
            <p className="text-slate-500">
              Please select a class from the dropdown above to start scanning
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
