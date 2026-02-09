"use client";
import { useState } from "react";
import Step1Name from "./components/Step1Name";
import Step2Email from "./components/Step2Email";
import Step3Password from "./components/Step3Password";
import Step4Avatar from "./components/Step4Avatar";
import SuccessMessage from "./components/SuccessMessage";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
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

  return (
    <div
      id="registration-container"
      className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-2xl w-full border-8 border-yellow-400 border-dashed animate-pop-in"
    >
      {/* Progress Bar (Visible only during steps 1-4) */}
      {currentStep <= 4 && (
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              id="progress-bar"
              className="h-4 rounded-full transition-all duration-400"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Conditional Rendering of Steps */}
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
      {currentStep === 4 && (
        <Step4Avatar
          data={formData}
          update={updateData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {currentStep === 5 && <SuccessMessage username={formData.username} />}
    </div>
  );
}
