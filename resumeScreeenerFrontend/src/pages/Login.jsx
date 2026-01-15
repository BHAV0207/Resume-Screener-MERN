import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { Lock, Mail, Loader2, ArrowLeft, Zap, ArrowRight } from "lucide-react";

function Login() {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, navigate);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-emerald-500/30 selection:text-emerald-200 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
         <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[50%] bg-teal-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Back button */}
      <button 
        onClick={() => navigate("/")}
        className="fixed top-8 left-8 flex items-center text-slate-500 hover:text-white transition-all group font-black uppercase text-[10px] tracking-widest"
      >
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mr-3 group-hover:bg-emerald-600/20 group-hover:text-emerald-500 transition-all">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </div>
        Back to Hub
      </button>

      <div className="w-full max-w-[460px] animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-emerald-950/20 p-8 md:p-14 border border-white/5 relative">
          <div className="absolute top-0 right-0 p-8">
             <Zap className="text-emerald-500 opacity-20 w-12 h-12 rotate-12" fill="currentColor" />
          </div>

          <div className="text-center mb-12 relative z-10">
            <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-900/30 group">
              <Lock className="text-white w-10 h-10 group-hover:scale-110 transition-transform" fill="white" />
            </div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tighter">Auth Portal</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Deploying career intelligence</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Secure Channel (Email)</label>
              <div className="relative group">
                <Mail className="w-5 h-5 text-slate-600 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="commander@aibatch.io"
                  className="w-full pl-14 pr-6 py-5 bg-slate-800/50 border border-white/5 rounded-2xl focus:bg-slate-800 focus:ring-4 focus:ring-emerald-900/30 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600 font-bold text-white shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Access Key</label>
                <button type="button" className="text-[10px] font-black text-emerald-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Reset Key</button>
              </div>
              <div className="relative group">
                <Lock className="w-5 h-5 text-slate-600 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-14 pr-6 py-5 bg-slate-800/50 border border-white/5 rounded-2xl focus:bg-slate-800 focus:ring-4 focus:ring-emerald-900/30 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600 font-bold text-white shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-emerald-900/20 hover:bg-emerald-500 hover:-translate-y-1 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center uppercase tracking-widest"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin mr-3" />
              ) : (
                <>Sign In Port <ArrowRight className="ml-3 w-5 h-5" /></>
              )}
            </button>
          </form>

          <div className="mt-12 text-center relative z-10">
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
              No account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="ml-2 text-emerald-500 font-black hover:text-emerald-400 transition-colors underline decoration-2 underline-offset-4"
              >
                Initialization Phase
              </button>
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
           End-to-End Encryption • AI Verification
        </p>
      </div>
    </div>
  );
}

export default Login;
