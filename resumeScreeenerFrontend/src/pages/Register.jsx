import React, { useContext } from "react";
import { AuthContext } from "../store/AuthCOntext"
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ChevronDown, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 backdrop-blur-sm backdrop-filter">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-50 mb-4">
            <User className="w-8 h-8 text-purple-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500">Join us and start your journey</p>
        </div>
        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Full Name</label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={name}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Enter your full name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                value={email}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                value={password}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Create a strong password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Account Type</label>
            <div className="relative">
              <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none"
                required
              >
                <option value="admin">Administrator</option>
                <option value="user">Regular User</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 font-medium"
          >
            {/* {loading && <Loader2 className="w-5 h-5 animate-spin" />} */}
            <span>Create Account</span>
          </button>
        </form>


        {/* Messages */}
        {success && (
          <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            {success}
          </div>
        )}
        {err && (
          <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {err}
          </div>
        )}

        {/* Already Have an Account */}
        <div className="mt-8 text-center">
          <span className="text-gray-500">Already have an account?</span>
          <button
            onClick={() => navigate("/login")}
            className="ml-2 text-purple-600 font-medium hover:text-purple-800 transition-colors"
          >
            Sign in
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-purple-600 hover:text-purple-800">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-purple-600 hover:text-purple-800">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
