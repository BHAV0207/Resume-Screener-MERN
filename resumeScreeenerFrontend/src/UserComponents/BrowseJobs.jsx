import React, { useContext, useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Building,
  DollarSign,
  Clock,
  Briefcase,
  Filter,
  Upload,
  CheckCircle2,
  ChevronRight,
  Info,
  X,
  FileText
} from "lucide-react";
import { JobContext } from "../store/JobContext";

function BrowseJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(null);
  
  const { getAllJobs, allJobs, applyForJob, loading } = useContext(JobContext);

  useEffect(() => {
    getAllJobs();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleApplication = async (jobId) => {
    if (!selectedFile) {
      return;
    }
    await applyForJob(selectedFile, jobId);
    setShowApplyModal(null);
    setSelectedFile(null);
  };

  const filteredJobs = allJobs?.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 ml-8 space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Browse Openings //</h1>
          <p className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.4em] mt-2">Neural network active • Discovery protocol active</p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="flex-1 relative group max-w-2xl mx-auto w-full">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={24} />
        <input
          type="text"
          placeholder="Query deployment sectors..."
          className="w-full pl-16 pr-6 py-6 bg-white border border-slate-100 rounded-[2.5rem] focus:ring-8 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all font-black text-sm tracking-widest placeholder:text-slate-200 placeholder:font-bold shadow-2xl shadow-slate-100 uppercase"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* JOB GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-12">
        {filteredJobs?.map((job) => (
          <div
            key={job._id}
            className="group bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[4rem] -z-0 opacity-0 group-hover:opacity-100 transition-all pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                 <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-slate-300 group-hover:bg-emerald-600 transition-all group-hover:rotate-6">
                    <Building size={32} />
                 </div>
                 <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-4 py-2 rounded-xl">
                    <Clock className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                    {new Date(job.createdAt).toLocaleDateString()}
                 </span>
              </div>

              <h2 className="text-3xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors mb-2 uppercase tracking-tight">
                {job.title}
              </h2>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-8">{job.company}</p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <InfoItem icon={<MapPin size={18} />} text={job.location} />
                <InfoItem icon={<DollarSign size={18} />} text={job.salary} />
                <InfoItem icon={<Briefcase size={18} />} text={`${job.minExperience}+ Yrs Exp`} />
                <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-600 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100">
                   <CheckCircle2 size={18} className="mr-3 text-emerald-600" />
                   Neural Check ready
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-10">
                {job.requiredSkills.slice(0, 4).map((skill, i) => (
                  <span key={i} className="px-5 py-2.5 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-100 group-hover:border-emerald-100 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setShowApplyModal(job)}
              className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black hover:bg-black transition-all flex items-center justify-center group/btn shadow-2xl shadow-slate-100 uppercase text-xs tracking-[0.2em]"
            >
              Analyze Placement
              <ChevronRight className="ml-2 w-6 h-6 group-hover/btn:translate-x-1 transition-transform text-emerald-500" />
            </button>
          </div>
        ))}
        
        {(!filteredJobs || filteredJobs.length === 0) && (
          <div className="col-span-full py-32 text-center bg-white rounded-[4rem] border border-slate-100">
             <div className="bg-slate-50 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
                <Search className="text-slate-200 w-12 h-12" />
             </div>
             <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Zero matching nodes</h3>
             <p className="text-slate-400 font-medium">Reset protocol parameters or wait for network expansion.</p>
          </div>
        )}
      </div>

      {/* APPLICATION MODAL */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-3xl flex items-center justify-center z-[100] p-6 animate-in fade-in duration-500">
          <div className="bg-white rounded-[4rem] max-w-2xl w-full p-10 md:p-14 relative shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-bl-full -z-0" />
             
             <button onClick={() => setShowApplyModal(null)} className="absolute top-10 right-10 p-3 rounded-2xl hover:bg-slate-50 text-slate-400 transition-all z-20">
                <X size={28} />
             </button>

             <div className="text-center mb-12 relative z-10">
                <div className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-emerald-500 shadow-2xl shadow-slate-200 group">
                   <Upload size={48} className="group-hover:scale-110 transition-transform" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter uppercase leading-none">Initialize Placement //</h2>
                <p className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.3em]">{showApplyModal.title} // {showApplyModal.company}</p>
             </div>

             <div className="space-y-8 relative z-10">
                <div 
                  className={`relative border-2 border-dashed rounded-[3rem] p-12 text-center transition-all cursor-pointer ${
                    selectedFile ? 'bg-emerald-600/5 border-emerald-500 text-emerald-700 shadow-inner' : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-emerald-400 group'
                  }`}
                  onClick={() => document.getElementById('resumeUpload').click()}
                >
                  <input 
                    type="file" 
                    id="resumeUpload" 
                    className="hidden" 
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                       <FileText size={64} className="mb-6 text-emerald-600 animate-pulse" />
                       <span className="font-black truncate w-full px-6 text-lg tracking-tight uppercase">{selectedFile.name}</span>
                       <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                        className="mt-6 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:underline hover:scale-105 transition-all"
                       >
                         Discard node data
                       </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                       <Upload size={64} className="mb-6 text-slate-200 group-hover:text-emerald-500 transition-all group-hover:scale-110" />
                       <span className="font-black text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-widest text-xs">Inject PDF Protocol</span>
                       <span className="text-[9px] font-black uppercase text-slate-300 mt-2 tracking-[0.2em]">MAX BUFFER // 5MB</span>
                    </div>
                  )}
                </div>

                <button 
                  disabled={!selectedFile || loading}
                  onClick={() => handleApplication(showApplyModal._id)}
                  className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-900/30 hover:bg-emerald-500 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="flex items-center justify-center">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-3" />
                        Syncing Neural Weights...
                      </>
                    ) : (
                      <>
                        Confirm Protocol
                        <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center text-sm font-bold text-slate-600 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
    <div className="text-violet-600 mr-2">{icon}</div>
    <span className="truncate">{text}</span>
  </div>
);

export default BrowseJobs;
