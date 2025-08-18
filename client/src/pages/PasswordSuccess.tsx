import { Link } from "react-router-dom";

const PasswordSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="p-6 text-center bg-white rounded-lg shadow-md w-96">
        <h2 className="mb-4 text-xl font-semibold">Password Reset Successful</h2>
        <p className="mb-4">
          Your password has been reset successfully. You can now log in with your new password.
        </p>
        <Link
          to="/login"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  )   
}

export default PasswordSuccess
