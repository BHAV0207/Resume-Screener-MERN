import React, { useState, useContext, useEffect } from "react";
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Calendar,
  Users,
  Share2,
  ChevronRight,
  Target
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { JobContext } from "../store/JobContext";
import toast from "react-hot-toast";

const ActiveJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { activeJobs, fetchAdminJobStats } = useContext(JobContext);

  useEffect(() => {
    fetchAdminJobStats();
  }, [fetchAdminJobStats]);

  const filteredJobs = (activeJobs || []).filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = (job) => {
    const shareUrl = `${window.location.origin}/login`; // Ideally shared link for candidates
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this opening at ${job.company}`,
        url: shareUrl,
      }).catch(err => console.error("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Job link copied to clipboard!");
    }
  };

  return (
    <div className="p-6 ml-8 space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Active Deployments</h1>
          <p className="text-slate-500 font-medium mt-1">Currently visible nodes accepting network applications</p>
        </div>
      </div>

      <div className="relative group max-w-2xl">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
        <input
          type="text"
          placeholder="Search by title or company..."
          className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all font-bold shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-center sm:text-left">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="group bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[4rem] -z-0 opacity-0 group-hover:opacity-100 transition-all pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tight leading-tight">{job.title}</h2>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mt-2 block">{job.company}</span>
                </div>
                <div className="w-14 h-14 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-emerald-900/30 group-hover:rotate-6 transition-transform">
                   <Target size={28} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-10">
                <div className="flex items-center text-xs font-black text-slate-600 uppercase tracking-widest">
                  <MapPin size={18} className="mr-3 text-emerald-500" />
                  {job.location}
                </div>
                <div className="flex items-center text-xs font-black text-slate-600 uppercase tracking-widest">
                  <DollarSign size={18} className="mr-3 text-emerald-500" />
                  {job.salary}
                </div>
                <div className="flex items-center text-xs font-black text-slate-600 uppercase tracking-widest">
                  <Briefcase size={18} className="mr-3 text-emerald-500" />
                  {job.minExperience}+ Yrs Exp
                </div>
                <div className="flex items-center text-xs font-black text-slate-600 uppercase tracking-widest">
                  <Users size={18} className="mr-3 text-emerald-500" />
                  {job.resumes?.length || 0} Units
                </div>
              </div>

              <div className="space-y-6 mb-10">
                 <div className="flex flex-wrap gap-2.5">
                    {job.requiredSkills.map((skill, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 group-hover:border-emerald-100 transition-colors">
                        {skill}
                      </span>
                    ))}
                 </div>
                 <p className="text-sm font-medium text-slate-500 line-clamp-2 leading-relaxed italic border-l-2 border-emerald-100 pl-4">
                   {job.description}
                 </p>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Calendar size={14} className="text-emerald-500" />
                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                 </div>
                 <div className="flex gap-4">
                    <button 
                      onClick={() => handleShare(job)}
                      className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-sm"
                      title="Share Protocol"
                    >
                      <Share2 size={20} />
                    </button>
                    <button 
                      onClick={() => navigate(`/admin/active-jobs/${job._id}`)}
                      className="flex items-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-100 group-hover:translate-x-1"
                    >
                       Access Hub <ChevronRight size={18} className="ml-2" />
                    </button>
                 </div>
              </div>
            </div>
          </div>
        ))}

        {!filteredJobs.length && (
          <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-slate-100">
             <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
                <Target className="text-slate-200 w-12 h-12" />
             </div>
             <p className="text-slate-400 font-black uppercase text-xs tracking-[0.2em]">Zero active deployments detected in current sectors</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveJobs;
