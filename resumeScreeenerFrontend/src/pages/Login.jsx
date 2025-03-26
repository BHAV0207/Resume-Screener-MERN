import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthCOntext'; // ✅ FIXED

function Login() {
  const {
    AxiosLogin,
    email,
    setEmail,
    password,
    setPassword,
    success,
    err,
  } = useContext(AuthContext); // ✅ FIXED

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    await AxiosLogin(navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleForm} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Success Message */}
        {success && (
          <div className="mt-4 text-green-600 bg-green-100 border border-green-400 px-4 py-2 rounded">
            {success}
          </div>
        )}

        {/* Error Message */}
        {err && (
          <div className="mt-2 text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded">
            {err}
          </div>
        )}

        {/* Route to Register */}
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don’t have an account?</span>
          <button
            onClick={() => navigate('/register')}
            className="ml-2 text-blue-500 hover:underline font-medium"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
