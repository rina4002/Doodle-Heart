"use client";
import { useState, useEffect } from "react"; // Added useEffect for auto-redirect
import { useRouter } from "next/navigation"; // The navigation engine
import Step1Name from "./components/Step1Name";
import Step2Email from "./components/Step2Email";
import Step3Password from "./components/Step3Password";
import Step4Avatar from "./components/Step4Avatar";
import SuccessMessage from "./components/SuccessMessage";

export default function RegisterPage() {
  const router = useRouter(); // Initialize the router
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Added for robustness
  const [error, setError] = useState<string | null>(null); // Added to show failures
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    email: "",
    password: "",
    avatar: "happy-monster",
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const updateData = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.username,
          metadata: { age: formData.age, avatar: formData.avatar },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        nextStep();
      } else {
        setError(data.error || "The magic failed! Try a different email?");
      }
    } catch (err) {
      setError("The realm's scroll is jammed (Network Error). Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="registration-container"
      className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-2xl w-full border-8 border-yellow-400 border-dashed animate-pop-in"
    >
      {/* Show API Errors to the user */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-2xl font-bold animate-shake">
          {error}
        </div>
      )}
      {currentStep <= 4 && (
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="h-4 rounded-full bg-purple-500 transition-all duration-400"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      {currentStep === 1 && (
        <Step1Name data={formData} update={updateData} onNext={nextStep} />
      )}
      {currentStep === 2 && (
        <Step2Email
          data={formData}
          update={updateData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {currentStep === 3 && (
        <Step3Password
          data={formData}
          update={updateData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {/* Wire up the handleFinalSubmit here */}
      {currentStep === 4 && (
        <Step4Avatar
          data={formData}
          update={updateData}
          onNext={handleFinalSubmit}
          onBack={prevStep}
          isLoading={isLoading}
        />
      )}
      {currentStep === 5 && (
        <SuccessMessage
          username={formData.username}
          onFinish={() => router.push("/onboarding/pquiz")} // OPTION B: Manual button trigger
        />
      )}{" "}
    </div>
  );
}
