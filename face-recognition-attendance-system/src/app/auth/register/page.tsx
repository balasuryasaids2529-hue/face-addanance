"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { GraduationCap, Camera, X, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState<"form" | "camera" | "complete">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
    role: "student",
    departmentId: "",
  });
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock departments
  const departments = [
    { id: "1", name: "Computer Science" },
    { id: "2", name: "Electrical Engineering" },
    { id: "3", name: "Mechanical Engineering" },
  ];

  const roles = [
    { value: "student", label: "Student" },
    { value: "lecturer", label: "Lecturer" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.departmentId) {
      newErrors.departmentId = "Department is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Proceed to face capture step for student registration
    if (formData.role === "student") {
      setStep("camera");
    } else {
      // For non-students, submit directly
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // In a real app, this would call the API
      // For demo purposes, we'll simulate the registration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.addToast("success", "Registration successful! You can now log in.");
      setStep("complete");
    } catch (error) {
      toast.addToast("error", "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const captureImage = () => {
    // In a real app, this would capture from the camera
    // For demo, we'll just add a placeholder
    setCapturedImages((prev) => [...prev, `capture-${Date.now()}`]);
  };

  const removeImage = (index: number) => {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCameraComplete = () => {
    if (capturedImages.length >= 3) {
      handleSubmit();
    } else {
      toast.addToast("error", "Please capture at least 3 images for face enrollment");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md shadow-xl" variant="elevated">
        {step === "form" && (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
              <p className="text-slate-500 mt-1">Join the Smart Attendance System</p>
            </CardHeader>

            <form onSubmit={handleFormSubmit}>
              <CardContent className="space-y-5">
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <Input
                  label="Student/Employee ID"
                  name="studentId"
                  placeholder="Enter your ID"
                  value={formData.studentId}
                  onChange={handleChange}
                  error={errors.studentId}
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                />

                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                />

                <Select
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={roles}
                />

                <Select
                  label="Department"
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleChange}
                  error={errors.departmentId}
                  options={[
                    { value: "", label: "Select department..." },
                    ...departments.map((d) => ({ value: d.id, label: d.name })),
                  ]}
                />
              </CardContent>

              <CardFooter>
                <Button type="submit" className="w-full" isLoading={isSubmitting}>
                  {formData.role === "student" ? "Next: Face Enrollment" : "Register"}
                </Button>
              </CardFooter>
            </form>

            <div className="text-center py-4 border-t border-slate-100">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </>
        )}

        {step === "camera" && (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Face Enrollment</h1>
              <p className="text-slate-500 mt-1">
                Capture multiple images for face recognition
              </p>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-900 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Camera Preview</p>
                    <p className="text-sm opacity-75 mt-1">
                      (In a real implementation, this would show the camera feed)
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  <Button variant="primary" onClick={captureImage}>
                    <Camera className="w-4 h-4 mr-1" />
                    Capture
                  </Button>
                  {capturedImages.length > 0 && (
                    <Button variant="danger" onClick={() => setCapturedImages([])}>
                      <X className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>

                {capturedImages.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">
                      Captured Images: {capturedImages.length}/5
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {capturedImages.map((img, index) => (
                        <div
                          key={index}
                          className="relative w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center"
                        >
                          <span className="text-xs text-slate-500">{index + 1}</span>
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                onClick={handleCameraComplete}
                disabled={capturedImages.length < 3}
              >
                {capturedImages.length >= 3 ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Complete Registration
                  </>
                ) : (
                  "Capture at least 3 images"
                )}
              </Button>
            </CardFooter>
          </>
        )}

        {step === "complete" && (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Registration Complete!</h1>
              <p className="text-slate-500 mt-1">
                Your account has been created successfully
              </p>
            </CardHeader>

            <CardContent className="text-center">
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <p className="text-emerald-700">
                    <span className="font-medium">Name:</span> {formData.name}
                  </p>
                  <p className="text-emerald-700 mt-1">
                    <span className="font-medium">Email:</span> {formData.email}
                  </p>
                  <p className="text-emerald-700 mt-1">
                    <span className="font-medium">ID:</span> {formData.studentId}
                  </p>
                </div>

                <p className="text-slate-600">
                  You can now log in with your credentials
                </p>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                onClick={() => router.push("/auth/login")}
              >
                Go to Login
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
