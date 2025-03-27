import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../store/AuthCOntext";
import { Lock, Mail, Loader2 } from "lucide-react";

function Login() {
  const { AxiosLogin, email, setEmail, password, setPassword, success, err } =
    useContext(AuthContext);

  const [loading , setLoading] = useState(false)

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    await AxiosLogin(navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 backdrop-blur-sm backdrop-filter">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
            <Lock className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleForm} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                value={email}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              {/* <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Forgot password?
              </a> */}
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                value={password}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 font-medium"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            <span>Login</span>
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

        {/* Register Link */}
        <div className="mt-8 text-center">
          <span className="text-gray-500">Don't have an account?</span>
          <button
            onClick={() => navigate('/register')}
            className="ml-2 text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            Create an account
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500">
            Protected by industry-leading security practices
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
