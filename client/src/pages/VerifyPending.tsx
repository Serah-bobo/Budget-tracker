// VerifyPending.tsx
import { useLocation, Link } from "react-router-dom";

export const VerifyPending = () => {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="p-6 text-center bg-white rounded-lg shadow-md w-96">
        <h2 className="mb-4 text-xl font-semibold">Verify Your Email</h2>
        <p className="mb-2">
          We sent a verification link to <span className="font-medium">{email}</span>.
        </p>
        <p className="mb-4 text-sm text-gray-600">
          Please check your inbox (and spam folder) to activate your account.
        </p>
        <Link
          to="/login"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};
