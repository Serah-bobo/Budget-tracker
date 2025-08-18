import { Link } from "react-router-dom"

const ResetLink = () => {
  return (
   <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 text-center bg-white shadow-lg rounded-2xl">
        <h1 className="mb-4 text-2xl font-bold text-green-600">
          Check Your Email 📧
        </h1>
        <p className="mb-6 text-gray-600">
          We’ve sent you a password reset
          link. Please check your inbox and follow the instructions.
        </p>
        <Link
          to="/login"
          className="inline-block px-4 py-2 text-white transition bg-green-600 rounded-xl hover:bg-green-700"
        >
          Back to Login
        </Link>
      </div>
    </div>

  )
}

export default ResetLink
