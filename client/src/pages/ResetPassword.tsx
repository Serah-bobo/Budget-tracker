import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordSchemaType } from "../schemas/resetPassword";
import { useResetPassword } from "../api/auth";
import { useParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useState } from "react";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending, error, isSuccess } = useResetPassword();

  const onSubmit = (data: ResetPasswordSchemaType) => {
    if (token) {
      mutate(
        { token, password: data.password },
        {
          onSuccess: () => navigate("/password-reset-success"),
        }
      );
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-bold text-center">Reset Password</h2>

      {error && (
        <div className="p-2 mb-4 text-red-800 bg-red-100 rounded">
          {(error as Error).message}
        </div>
      )}

      {isSuccess && (
        <div className="p-2 mb-4 text-green-800 bg-green-100 rounded">
          Password reset successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-4">
        {/* New Password Field */}
        <div className="relative">
          <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="New Password"
            className="w-full py-2 pl-10 pr-10 border rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-gray-600 transform -translate-y-1/2 right-3 top-1/2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="relative">
          <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Confirm New Password"
            className="w-full py-2 pl-10 pr-10 border rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-gray-600 transform -translate-y-1/2 right-3 top-1/2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};
