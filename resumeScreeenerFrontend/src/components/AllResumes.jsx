import React, { useState, useContext, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Clock,
  X,
  FileText,
  User,
  Star,
  CheckCircle,
  XCircle,
  Briefcase
} from "lucide-react";
import { JobContext } from "../store/JobContext";

const AllResumes = () => {
  const { allResume, fetchAdminResumes, loading } = useContext(JobContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    fetchAdminResumes();
  }, [fetchAdminResumes]);

  const getStatusStyle = (status) => {
    switch(status) {
      case "shortlisted": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "rejected": return "bg-rose-50 text-rose-700 border-rose-100";
      default: return "bg-amber-50 text-amber-700 border-amber-100";
    }
  };

  const filteredResumes = allResume?.filter((resume) => {
    const matchesSearch =
      resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resume.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resume.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesFilter = filterStatus === "all" || resume.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 ml-8 space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Talent Repository</h1>
          <p className="text-slate-500 font-medium mt-1">Review and manage all candidate applications across the network</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search by name, skills, or email..."
            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all font-bold shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-2 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
            <Filter size={20} />
          </div>
          <select
            className="bg-transparent border-none focus:ring-0 font-black text-xs uppercase tracking-widest text-slate-700 pr-10 cursor-pointer"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Every Status</option>
            <option value="shortlisted">AI Shortlisted</option>
            <option value="rejected">Rejected</option>
            <option value="evaluation">In Evaluation</option>
          </select>
        </div>
      </div>

      {/* Resumes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredResumes?.map((resume) => (
          <div
            key={resume._id}
            className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[3rem] -z-0 opacity-0 group-hover:opacity-100 transition-all pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                    <User size={32} />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{resume.name}</h2>
                     <p className="text-xs font-bold text-slate-400 mt-1">{resume.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex flex-wrap gap-2">
                  {resume.skills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-wider border border-slate-100 group-hover:border-emerald-100 group-hover:bg-emerald-50 transition-colors">
                      {skill}
                    </span>
                  ))}
                  {resume.skills.length > 4 && (
                    <span className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg shadow-emerald-900/20">
                      +{resume.skills.length - 4} More
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs font-black text-slate-500 uppercase tracking-widest">
                    <Briefcase className="w-4 h-4 mr-2 text-emerald-500" />
                    {resume.experience || 0} Exp Years
                  </div>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border ${getStatusStyle(resume.status)}`}>
                    {resume.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                 <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   <Clock className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                   {new Date(resume.createdAt).toLocaleDateString()}
                 </div>
                 <button
                    onClick={() => setSelectedResume(resume)}
                    className="flex items-center space-x-3 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-100 group-hover:translate-x-1"
                 >
                    <Eye size={16} />
                    <span>Review Unit</span>
                 </button>
              </div>
            </div>
          </div>
        ))}

        {!filteredResumes?.length && (
          <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-slate-100">
             <div className="bg-slate-50 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
                <FileText className="text-slate-200 w-12 h-12" />
             </div>
             <p className="text-slate-400 font-black uppercase text-xs tracking-[0.2em]">Zero talent nodes detected in current sectors</p>
          </div>
        )}
      </div>

      {/* Resume Modal */}
      {selectedResume && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xl flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3.5rem] max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-500">
             <button onClick={() => setSelectedResume(null)} className="absolute top-10 right-10 p-3 rounded-full hover:bg-slate-100 text-slate-400 transition-all z-10">
               <X size={32} />
             </button>

             <div className="p-10 md:p-16 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                   <div className="flex items-center space-x-8">
                      <div className="w-24 h-24 bg-emerald-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-900/30 group">
                         <User size={48} className="group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                         <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase leading-none">{selectedResume.name}</h2>
                         <div className="flex flex-wrap items-center mt-4 gap-6">
                            <span className="flex items-center text-slate-500 font-bold text-sm hover:text-emerald-600 transition-colors">
                               <Mail className="w-4 h-4 mr-2 text-emerald-500" />
                               {selectedResume.email}
                            </span>
                             <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border ${getStatusStyle(selectedResume.status)}`}>
                                {selectedResume.status}
                             </span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                   <div className="lg:col-span-2 space-y-10">
                      <div>
                         <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-emerald-500" /> Extracted Protocol Analysis
                         </h3>
                         <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 text-slate-600 font-medium leading-relaxed max-h-[450px] overflow-y-auto whitespace-pre-wrap text-sm italic shadow-inner">
                            {selectedResume.parsedText}
                         </div>
                      </div>
                   </div>

                   <div className="space-y-10">
                      <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
                         <h3 className="text-xs font-black text-slate-900 mb-6 flex items-center uppercase tracking-widest">
                            <Star className="w-4 h-4 mr-2 text-amber-500" fill="currentColor" /> Core Capabilities
                         </h3>
                         <div className="flex flex-wrap gap-2.5">
                            {selectedResume.skills.map((skill, i) => (
                               <span key={i} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
                                  {skill}
                               </span>
                            ))}
                         </div>
                      </div>

                      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-all">
                            <Zap size={64} fill="white" />
                         </div>
                         <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">Maturity Level</h3>
                         <div className="text-5xl font-black tracking-tighter">{selectedResume.experience || 0} <span className="text-xl text-slate-400">YRS</span></div>
                         <p className="text-slate-400 text-[10px] mt-4 font-black uppercase tracking-widest flex items-center">
                           <CheckCircle className="w-3 h-3 mr-2 text-emerald-500" /> AI Verified Node
                         </p>
                      </div>
                   </div>
                </div>

                <div className="mt-16 pt-10 border-t border-slate-100 flex flex-wrap gap-6 justify-between items-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sequence ID: {selectedResume._id}</p>
                   <div className="flex gap-4">
                      <button className="px-8 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-100 transition-all flex items-center border border-slate-100">
                         <Download size={18} className="mr-2 text-emerald-500" />
                         Raw Document
                      </button>
                      <button className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-emerald-500 hover:-translate-y-1 transition-all shadow-2xl shadow-emerald-900/20 flex items-center">
                         <Mail size={18} className="mr-2" />
                         Contact Node
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllResumes;
