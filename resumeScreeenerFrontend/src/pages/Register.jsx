import React, { useContext, useState } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ChevronDown, Loader2, ArrowLeft, Target, Zap, ShieldCheck, ArrowRight } from "lucide-react";

function Register() {
  const { register, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "user"
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData, navigate);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-emerald-500/30 selection:text-emerald-200 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 text-emerald-900/10">
         <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[60%] bg-emerald-600/10 blur-[150px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[60%] bg-teal-600/10 blur-[150px] rounded-full" />
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

      <div className="w-full max-w-[520px] animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[3.5rem] shadow-2xl shadow-emerald-950/20 p-8 md:p-14 border border-white/5 relative">
          <div className="absolute top-0 right-0 p-10">
             <ShieldCheck className="text-emerald-500 opacity-10 w-16 h-16 -rotate-12" />
          </div>

          <div className="text-center mb-10 relative z-10">
            <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-900/30 group">
              <User className="text-white w-10 h-10 group-hover:scale-110 transition-transform" fill="white" />
            </div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tighter">Initialize Identity</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Scale your career with AIBatch</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Legal Name</label>
                <div className="relative group">
                  <User className="w-5 h-5 text-slate-600 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Wick"
                    className="w-full pl-14 pr-6 py-4 bg-slate-800/50 border border-white/5 rounded-2xl focus:bg-slate-800 focus:ring-4 focus:ring-emerald-900/30 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600 font-bold text-white shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Network Identity (Email)</label>
                <div className="relative group">
                  <Mail className="w-5 h-5 text-slate-600 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="wick@high-table.io"
                    className="w-full pl-14 pr-6 py-4 bg-slate-800/50 border border-white/5 rounded-2xl focus:bg-slate-800 focus:ring-4 focus:ring-emerald-900/30 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600 font-bold text-white shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Security Key (Password)</label>
                <div className="relative group">
                  <Lock className="w-5 h-5 text-slate-600 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="w-full pl-14 pr-6 py-4 bg-slate-800/50 border border-white/5 rounded-2xl focus:bg-slate-800 focus:ring-4 focus:ring-emerald-900/30 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600 font-bold text-white shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Protocol / Role</label>
                <div className="relative group">
                  <Target className="w-5 h-5 text-slate-600 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors " />
                  <ChevronDown className="w-5 h-5 text-slate-600 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full pl-14 pr-12 py-4 bg-slate-800/50 border border-white/5 rounded-2xl focus:bg-slate-800 focus:ring-4 focus:ring-emerald-900/30 focus:border-emerald-500 outline-none transition-all font-bold text-white appearance-none cursor-pointer"
                  >
                    <option value="user">Talent Node (Job Seeker)</option>
                    <option value="admin">Command Node (Recruiter / Admin)</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-emerald-900/30 hover:bg-emerald-500 hover:-translate-y-1 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center px-4 uppercase tracking-widest mt-4"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin mr-3" />
              ) : (
                <>Deploy Identity <ArrowRight className="ml-3 w-5 h-5" /></>
              )}
            </button>
          </form>

          <div className="mt-12 text-center relative z-10">
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
              Standardized?{" "}
              <button
                onClick={() => navigate("/login")}
                className="ml-2 text-emerald-500 font-black hover:text-emerald-400 transition-colors underline decoration-2 underline-offset-4"
              >
                Access Portal
              </button>
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] px-12 leading-relaxed">
          By deploying, you agree to our Protocol Terms and Data Privacy Standards.
        </p>
      </div>
    </div>
  );
}

export default Register;
