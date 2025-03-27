import React, { useContext } from "react";
import { AuthContext } from "../store/AuthCOntext"
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const {
    AxiosRegister,
    name,
    setName,
    email,
    setEmail,
    type,
    setType,
    password,
    setPassword,
    success,
    err,
  } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    AxiosRegister();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 mt-2">Sign up to get started</p>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Role</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-700 transition-all duration-200 shadow-lg font-medium"
          >
            Register
          </button>
        </form>

        {/* Messages */}
        {success && (
          <div className="mt-4 text-green-600 bg-green-100 border border-green-400 px-4 py-2 rounded-md">
            {success}
          </div>
        )}
        {err && (
          <div className="mt-2 text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md">
            {err}
          </div>
        )}

        {/* Already Have an Account */}
        <div className="mt-6 text-center">
          <span className="text-gray-600">Already have an account?</span>
          <button
            onClick={() => navigate("/login")}
            className="ml-2 text-gray-900 font-medium hover:underline transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
