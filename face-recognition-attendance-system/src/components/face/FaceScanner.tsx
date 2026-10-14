"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, X, CheckCircle, User, Clock, Clipboard } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface FaceDetection {
  box: { x: number; y: number; width: number; height: number };
  score: number;
}

interface RecognizedFace {
  userId: number;
  name: string;
  studentId: string;
  confidence: number;
  detection: FaceDetection;
}

interface FaceScannerProps {
  classId: number;
  onFaceRecognized: (userId: number, name: string, studentId: string) => void;
  isActive?: boolean;
}

export function FaceScanner({
  classId,
  onFaceRecognized,
  isActive = true,
}: FaceScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [detections, setDetections] = useState<FaceDetection[]>([]);
  const [recognizedFaces, setRecognizedFaces] = useState<RecognizedFace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attendanceLogs, setAttendanceLogs] = useState<{
    userId: number;
    name: string;
    studentId: string;
    time: string;
    status: "present" | "already_marked";
  }[]>([]);
  const toast = useToast();

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraOn(true);
      }

      setIsLoading(false);
    } catch (err) {
      setError("Could not access camera. Please check permissions.");
      setIsLoading(false);
      console.error("Camera error:", err);
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
      setDetections([]);
      setRecognizedFaces([]);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Load face-api models (simplified for demo)
  useEffect(() => {
    const loadModels = async () => {
      try {
        // In a real implementation, we would load face-api.js models here
        // For this demo, we'll just set loading to false
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load face recognition models");
        setIsLoading(false);
      }
    };

    loadModels();
  }, []);

  // Simulate face detection (in a real app, this would use face-api.js)
  useEffect(() => {
    if (!isCameraOn || !videoRef.current) return;

    const interval = setInterval(() => {
      // Simulate face detection
      if (videoRef.current?.videoWidth && videoRef.current?.videoHeight) {
        // Generate random detections for demo
        const newDetections: FaceDetection[] = [];
        
        // Simulate 1-3 faces
        const numFaces = Math.min(3, Math.floor(Math.random() * 3) + 1);
        
        for (let i = 0; i < numFaces; i++) {
          newDetections.push({
            box: {
              x: Math.random() * (videoRef.current.videoWidth - 200),
              y: Math.random() * (videoRef.current.videoHeight - 200),
              width: 150 + Math.random() * 50,
              height: 150 + Math.random() * 50,
            },
            score: 0.9 + Math.random() * 0.1,
          });
        }

        setDetections(newDetections);

        // Simulate recognition
        const newRecognized: RecognizedFace[] = newDetections.map((detection) => {
          // Randomly recognize as one of the demo users
          const users = [
            { userId: 1, name: "Alice Johnson", studentId: "STU001" },
            { userId: 2, name: "Bob Wilson", studentId: "STU002" },
          ];
          
          const user = users[Math.floor(Math.random() * users.length)];
          
          return {
            ...user,
            confidence: 0.85 + Math.random() * 0.15,
            detection,
          };
        });

        setRecognizedFaces(newRecognized);

        // Simulate marking attendance
        newRecognized.forEach((face) => {
          const alreadyMarked = attendanceLogs.some(
            (log) => log.userId === face.userId
          );

          if (!alreadyMarked) {
            const newLog = {
              userId: face.userId,
              name: face.name,
              studentId: face.studentId,
              time: new Date().toLocaleTimeString(),
              status: "present" as const,
            };
            setAttendanceLogs((prev) => [...prev, newLog]);
            onFaceRecognized(face.userId, face.name, face.studentId);
            toast.addToast("success", `${face.name} marked as present`);
          }
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isCameraOn, onFaceRecognized, attendanceLogs, toast]);

  // Draw detections on canvas
  useEffect(() => {
    if (!canvasRef.current || !videoRef.current || detections.length === 0) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each detection
    detections.forEach((detection, index) => {
      const recognized = recognizedFaces[index];
      const box = detection.box;

      // Draw bounding box
      ctx.strokeStyle = recognized ? "#10b981" : "#3b82f6";
      ctx.lineWidth = 4;
      ctx.strokeRect(box.x, box.y, box.width, box.height);

      // Draw background for text
      ctx.fillStyle = recognized ? "#10b981" : "#3b82f6";
      ctx.globalAlpha = 0.7;
      ctx.fillRect(box.x, box.y - 20, box.width, 20);
      ctx.globalAlpha = 1;

      // Draw label
      ctx.fillStyle = "#ffffff";
      ctx.font = "14px sans-serif";

      if (recognized) {
        ctx.fillText(
          `${recognized.name} (${recognized.studentId})`,
          box.x + 5,
          box.y - 5
        );
      } else {
        ctx.fillText("Unknown", box.x + 5, box.y - 5);
      }
    });
  }, [detections, recognizedFaces]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader
        title="Live Attendance Scanner"
        description="Point the camera at students to mark attendance"
        action={
          <div className="flex gap-2">
            {isCameraOn ? (
              <Button variant="danger" size="sm" onClick={stopCamera}>
                <X className="w-4 h-4 mr-1" />
                Stop Scanner
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={startCamera}
                isLoading={isLoading}
              >
                <Camera className="w-4 h-4 mr-1" />
                Start Scanner
              </Button>
            )}
          </div>
        }
      />

      <CardContent>
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm mb-4">
            {error}
          </div>
        )}

        {/* Camera Feed */}
        <div className="relative bg-slate-900 rounded-lg overflow-hidden mb-6">
          <video
            ref={videoRef}
            className="w-full"
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />

          {!isCameraOn && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
              <div className="text-center text-white">
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Camera is off</p>
                <p className="text-sm opacity-75 mt-1">
                  Click "Start Scanner" to begin
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
                <p className="text-lg">Loading models...</p>
              </div>
            </div>
          )}
        </div>

        {/* Attendance Logs */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 mb-3">
            Recently Marked Attendance
          </h3>

          {attendanceLogs.length > 0 ? (
            <div className="space-y-3">
              {attendanceLogs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{log.name}</p>
                    <p className="text-sm text-slate-500">{log.studentId}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" dot>
                      Present
                    </Badge>
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {log.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <Clipboard className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No attendance marked yet</p>
              <p className="text-sm mt-1">
                Start the scanner to begin marking attendance
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
