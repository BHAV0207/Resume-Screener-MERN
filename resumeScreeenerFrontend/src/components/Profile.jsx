import React from "react";
import { User, Mail, Shield, Hash, Camera, ExternalLink, Zap, BrainCircuit } from "lucide-react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="p-6 ml-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden group">
        {/* Cover Section */}
        <div className="h-60 bg-slate-900 relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#10b981_0,transparent_1px)] bg-[length:40px_40px] opacity-20" />
           <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-emerald-600/20 to-transparent" />
        </div>

        <div className="px-8 md:px-20 pb-20 relative">
          {/* Avatar Section */}
          <div className="relative -mt-24 mb-10 inline-block">
            <div className="w-48 h-48 rounded-[3rem] border-8 border-white overflow-hidden shadow-2xl relative group/avatar">
              <img
                className="w-full h-full object-cover transition-transform group-hover/avatar:scale-110 duration-700"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&h=600&fit=crop"
                alt="Profile"
              />
              <div className="absolute inset-0 bg-emerald-600/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 backdrop-blur-sm">
                 <Camera className="text-white w-10 h-10" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-600 rounded-[1.5rem] border-4 border-white flex items-center justify-center text-white shadow-xl animate-bounce-subtle">
               <Zap size={20} fill="white" />
            </div>
          </div>

          {/* User Details Header */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">{user.name}</h1>
              <div className="flex flex-wrap gap-6">
                 <span className="flex items-center text-slate-500 font-bold text-sm tracking-tight transition-colors hover:text-emerald-600">
                    <Mail className="w-4 h-4 mr-2 text-emerald-500" /> {user.email}
                 </span>
                 <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border ${
                   user.type === 'admin' ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                 }`}>
                   {user.type} Protocol
                 </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black shadow-2xl shadow-slate-200 hover:bg-black transition-all flex items-center uppercase text-xs tracking-widest active:scale-95">
                 Update Profile <ExternalLink size={20} className="ml-3 text-emerald-500" />
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <InfoBlock 
              icon={<Shield className="text-emerald-500" />} 
              label="Network Security" 
              value={user.type === "admin" ? "Level 1: Administrative Control" : "Level 0: Candidate Access"}
              desc="Your connection is protected by neural-grade encryption protocols."
            />
            <InfoBlock 
              icon={<Hash className="text-emerald-500" />} 
              label="System Signature" 
              value={user.id}
              desc="Immutable platform identifier for cross-node verification."
            />
          </div>

          <div className="mt-16 p-10 bg-slate-900 rounded-[3.5rem] text-white overflow-hidden relative group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700">
                <BrainCircuit size={120} />
             </div>
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div>
                   <h3 className="text-2xl font-black tracking-tight uppercase mb-2">Neural Optimization</h3>
                   <p className="text-slate-400 font-medium max-w-xl">Your data is being processed by the AIBatch core to enhance candidate matching precision.</p>
                </div>
                <button className="bg-emerald-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/30 whitespace-nowrap">
                   Sync Algorithms
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoBlock = ({ icon, label, value, desc }) => (
  <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300">
    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
       {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">{label}</span>
    <p className="text-lg font-black text-slate-900 mb-2 truncate">{value}</p>
    <p className="text-sm font-medium text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default Profile;
