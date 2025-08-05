import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendOTP = (e) => {
    e.preventDefault();
    console.log("OTP sent to:", email);
    setStep(2);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp);
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password reset for:", email);
    alert("Password has been reset!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--c-neutral-100))] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-slide-up">
        <h2 className="text-2xl font-bold text-center gradient-text mb-6">
          Forgot Password
        </h2>

        {/* Step 1: Email */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-1">
                Enter your email
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-1">
                Enter the OTP sent to your email
              </label>
              <input
                type="text"
                required
                placeholder="123456"
                className="input-field"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Verify OTP
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="relative">
              <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-1">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                required
                placeholder="Enter new password"
                className="input-field pr-12"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="absolute right-4 top-[38px] text-[rgb(var(--c-neutral-500))] cursor-pointer"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="Re-enter new password"
                className="input-field pr-12"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="absolute right-4 top-[38px] text-[rgb(var(--c-neutral-500))] cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button type="submit" className="btn-secondary w-full">
              Reset Password
            </button>
          </form>
        )}

        {/* Go Back */}
        <p className="text-center text-sm text-[rgb(var(--c-neutral-500))] mt-6">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="hover:underline text-[rgb(var(--c-primary-500))]"
            >
              ← Go Back
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
