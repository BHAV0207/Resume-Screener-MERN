import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X, CheckCircle, Star, Users, Building, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";
import { AuthContext } from "../store/AuthContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const { features } = useContext(AuthContext);

  return (
    <div className="bg-slate-950 min-h-screen font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden text-slate-200">
      {/* Dynamic Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:rotate-12 transition-transform">
              <Star className="text-white w-6 h-6" fill="white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">
              AIBatch
            </span>
          </div>
          <div className="flex items-center space-x-8">
            <button onClick={() => navigate("/login")} className="text-slate-400 font-bold hover:text-emerald-400 transition-colors uppercase text-xs tracking-widest">
              Login
            </button>
            <button 
              onClick={() => navigate("/register")}
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-black shadow-xl shadow-emerald-900/20 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all active:scale-95 uppercase text-xs tracking-widest"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-emerald-600/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[80%] bg-teal-600/10 blur-[150px] rounded-full animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-px shadow-[0_0_200px_100px_rgba(16,185,129,0.05)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 mb-10 animate-fade-in">
            <Zap className="w-4 h-4 text-emerald-500 mr-2" fill="currentColor" />
            <span className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em]">The Future of Talent Acquisition</span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-[0.95] mb-10">
            Automating the <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500">
              Talent Pipeline
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-medium leading-relaxed mb-14">
            Leverage bleeding-edge AI to screen thousands of resumes in seconds. Precision matching. Unbiased scoring. Accelerated hiring.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-5 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => navigate("/register")}
              className="group flex items-center px-10 py-5 bg-emerald-600 text-white text-lg font-black rounded-[2rem] shadow-2xl shadow-emerald-900/30 hover:bg-emerald-500 hover:-translate-y-1 transition-all active:scale-95"
            >
              Recruit with AI
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
               onClick={() => navigate("/login")}
              className="px-10 py-5 bg-white text-slate-950 text-lg font-black rounded-[2rem] hover:bg-slate-100 transition-all active:scale-95"
            >
              Apply as Talent
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-32 pt-16 border-t border-white/5">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-12">Empowering Global Tech Powerhouses</p>
            <div className="flex flex-wrap justify-center gap-16 md:gap-24 opacity-30 group">
              <span className="text-3xl font-black italic tracking-tighter hover:opacity-100 hover:text-emerald-500 transition-all cursor-default">QUANTUM</span>
              <span className="text-3xl font-black italic tracking-tighter hover:opacity-100 hover:text-emerald-500 transition-all cursor-default">SYNAPSE</span>
              <span className="text-3xl font-black italic tracking-tighter hover:opacity-100 hover:text-emerald-500 transition-all cursor-default">VELOCITY</span>
              <span className="text-3xl font-black italic tracking-tighter hover:opacity-100 hover:text-emerald-500 transition-all cursor-default">ORBIT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Engineered for <span className="text-emerald-500">Scale.</span></h2>
              <p className="text-slate-400 font-medium text-lg">Our AI engine doesn't just read resumes—it understands potential. Built for enterprise teams who move fast.</p>
            </div>
            <div className="hidden md:block h-px flex-1 mx-12 bg-white/5 mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-10 rounded-[3rem] bg-slate-900/50 border border-white/5 hover:border-emerald-500/20 hover:bg-slate-900 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedFeature(index)}
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-inner">
                  {React.cloneElement(feature.icon, { size: 32 })}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">{feature.description}</p>
                
                <div className="mt-8 flex items-center text-emerald-500 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                   Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Stats */}
      <section className="py-32 bg-emerald-600 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.2)_0%,transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-3">
              <div className="text-7xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform duration-700">500K+</div>
              <div className="text-emerald-100 font-black uppercase tracking-widest text-xs">Resumes Processed</div>
            </div>
            <div className="space-y-3">
              <div className="text-7xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform duration-700 delay-100">100K+</div>
              <div className="text-emerald-100 font-black uppercase tracking-widest text-xs">Succesful Placements</div>
            </div>
            <div className="space-y-3">
              <div className="text-7xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform duration-700 delay-200">99.2%</div>
              <div className="text-emerald-100 font-black uppercase tracking-widest text-xs">Matching Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
               <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
                  <Star className="text-white w-6 h-6" fill="white" />
                </div>
                <span className="text-2xl font-black tracking-tighter">AIBatch</span>
              </div>
              <p className="text-slate-500 font-medium max-w-sm mb-10 leading-relaxed">
                The world's most advanced AI resume screening engine. Designed for the high-growth companies of tomorrow.
              </p>
              <div className="flex space-x-6">
                <Globe className="w-6 h-6 text-slate-700 hover:text-emerald-500 transition-colors cursor-pointer" />
                <Cpu className="w-6 h-6 text-slate-700 hover:text-emerald-500 transition-colors cursor-pointer" />
                <ShieldCheck className="w-6 h-6 text-slate-700 hover:text-emerald-500 transition-colors cursor-pointer" />
              </div>
            </div>
            
            <div className="space-y-6">
               <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Platform</h4>
               <ul className="space-y-4 text-slate-500 font-medium">
                  <li className="hover:text-emerald-500 transition-colors cursor-pointer">Candidate Screening</li>
                  <li className="hover:text-emerald-500 transition-colors cursor-pointer">Talent Pool</li>
                  <li className="hover:text-emerald-500 transition-colors cursor-pointer">Integrations</li>
               </ul>
            </div>
            
            <div className="space-y-6">
               <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Legal</h4>
               <ul className="space-y-4 text-slate-500 font-medium">
                  <li className="hover:text-emerald-500 transition-colors cursor-pointer">Privacy Policy</li>
                  <li className="hover:text-emerald-500 transition-colors cursor-pointer">Terms of Service</li>
                  <li className="hover:text-emerald-500 transition-colors cursor-pointer">Security Compliance</li>
               </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-xs font-black uppercase tracking-widest">&copy; {new Date().getFullYear()} AIBATCH RECRUITMENT LABS. GLOBAL HQ.</p>
            <div className="flex items-center text-slate-600 text-xs font-black uppercase tracking-widest gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               Systems Operational
            </div>
          </div>
        </div>
      </footer>

      {/* Feature Modal */}
      {selectedFeature !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-3xl flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-white/5 rounded-[3.5rem] max-w-2xl w-full p-10 md:p-16 relative shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] -z-10" />
            
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-10 right-10 p-2 rounded-full hover:bg-white/5 text-slate-500 hover:text-white transition-all"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="w-24 h-24 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-10 shadow-inner">
               {React.cloneElement(features[selectedFeature].icon, { size: 48 })}
            </div>
            
            <h3 className="text-4xl font-black text-white mb-6 tracking-tight uppercase">
              {features[selectedFeature].title}
            </h3>
            
            <p className="text-xl text-slate-400 mb-10 leading-relaxed font-medium">
              {features[selectedFeature].description}
            </p>
            
            <div className="space-y-6">
              {features[selectedFeature].details.map((detail, index) => (
                <div key={index} className="flex items-start group">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center mr-5 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-900/20">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-slate-300 font-medium leading-snug">{detail}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate("/register")}
              className="mt-12 w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-500 transition-all uppercase tracking-widest shadow-xl shadow-emerald-900/20"
            >
              Deploy Feature
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;