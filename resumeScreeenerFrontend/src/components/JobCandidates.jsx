import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JobContext } from '../store/JobContext';
import { 
  ArrowLeft, 
  Users, 
  Star, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  BrainCircuit, 
  Mail, 
  CheckCircle2, 
  XCircle,
  Loader2,

  Target
} from 'lucide-react';

function JobCandidates() {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const { getJobById, currentJob: job, rankResumes, rankSingleResume, processCandidate, loading } = useContext(JobContext);
  const [candidates, setCandidates] = useState([]);
  const [rankingInProgress, setRankingInProgress] = useState(false);

  useEffect(() => {
    if (jobId) {
      getJobById(jobId);
    }
  }, [jobId, getJobById]);

  useEffect(() => {
    if (job?.resumes) {
      setCandidates(job.resumes.map(r => ({
        ...r,
        matchScore: r.jobMatchScore || 0
      })));
    }
  }, [job]);

  const handleRankSingleResume = async (resumeId) => {
    const score = await rankSingleResume(jobId, resumeId);
    if (score !== undefined) {
      setCandidates(prev => prev.map(c => 
        c._id === resumeId ? { ...c, matchScore: score } : c
      ));
    }
  };

  const handleRankResumes = async () => {
    setRankingInProgress(true);
    const rankedData = await rankResumes(jobId);
    if (rankedData) {
      setCandidates(rankedData);
    }
    setRankingInProgress(false);
  };

  const handleProcessCandidate = async (resumeId, status) => {
    const success = await processCandidate(jobId, resumeId, status);
    if (success) {
      // Update local state to reflect the change
      setCandidates(prev => prev.map(c => 
        c._id === resumeId ? { ...c, status } : c
      ));
    }
  };

  if (!job && loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!job) {
    return (
        <div className="p-12 text-center">
            <p className="text-slate-500 font-bold">Job not found.</p>
            <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 font-bold">Go Back</button>
        </div>
    )
  }

  return (
    <div className="p-6 ml-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-slate-400 hover:text-emerald-600 mb-10 font-black transition-all group uppercase text-[10px] tracking-widest"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Return to Deployments
      </button>

      {/* Job Info Header */}
      <div className="bg-slate-900 rounded-[3.5rem] p-10 md:p-14 border border-white/5 shadow-2xl mb-12 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-bl-full -z-0 blur-3xl group-hover:bg-emerald-600/20 transition-all duration-700" />
        <div className="relative z-10">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center px-5 py-2 rounded-xl bg-emerald-600/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/20">
                <Target className="w-3.5 h-3.5 mr-2" /> Deployment Specs
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">{job.title}</h1>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div className="flex items-center text-slate-400 font-bold text-sm tracking-tight">
                  <Briefcase className="w-4 h-4 mr-2 text-emerald-500" /> {job.company}
                </div>
                <div className="flex items-center text-slate-400 font-bold text-sm tracking-tight">
                  <MapPin className="w-4 h-4 mr-2 text-emerald-500" /> {job.location}
                </div>
                <div className="flex items-center text-slate-400 font-bold text-sm tracking-tight">
                  <DollarSign className="w-4 h-4 mr-2 text-emerald-500" /> {job.salary}
                </div>
                <div className="flex items-center text-slate-400 font-bold text-sm tracking-tight">
                  <Users className="w-4 h-4 mr-2 text-emerald-500" /> {job.resumes?.length || 0} Applicants
                </div>
              </div>
            </div>
            <button
               disabled={rankingInProgress || job.resumes?.length === 0}
               onClick={handleRankResumes}
               className="bg-emerald-600 text-white px-10 py-5 rounded-[2rem] font-black shadow-2xl shadow-emerald-900/40 hover:bg-emerald-500 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center whitespace-nowrap uppercase text-xs tracking-[0.2em]"
            >
               {rankingInProgress ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <BrainCircuit className="w-5 h-5 mr-3" />}
               Initialize AI Matcher
            </button>
          </div>
        </div>
      </div>

      {/* Candidates Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Ranked Talent Nodes</h2>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{candidates.length || 0} Matches Identified</span>
        </div>

        <div className="grid gap-8">
          {(candidates.length > 0 ? candidates : []).map((candidate, index) => (
            <div 
              key={candidate._id} 
              className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 group animate-in slide-in-from-bottom-8 relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[4rem] -z-0 opacity-0 group-hover:opacity-100 transition-all pointer-events-none" />
              
              <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-10">
                <div className="flex flex-col md:flex-row md:items-center gap-8 flex-1">
                   {/* Rank Badge */}
                   <div className="w-20 h-20 rounded-3xl bg-slate-50 flex flex-col items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all border border-slate-100 group-hover:scale-110 shadow-sm">
                      <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Node</span>
                      <span className="text-3xl font-black">#{index + 1}</span>
                   </div>

                   <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4">
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight group-hover:text-emerald-600 transition-colors">{candidate.name}</h3>
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                          candidate.status === 'shortlisted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                          candidate.status === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {candidate.status}
                        </span>
                      </div>
                      <p className="text-slate-400 font-bold flex items-center text-sm">
                         <Mail className="w-4 h-4 mr-2 text-emerald-500" /> {candidate.email}
                      </p>
                      
                      <div className="flex flex-wrap gap-2.5 pt-2">
                        {candidate.skills?.slice(0, 5).map((skill, i) => (
                          <span key={i} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 group-hover:border-emerald-100 transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                   </div>

                   {/* Score Section */}
                   <div className="bg-slate-900 rounded-[2rem] px-10 py-6 text-white flex flex-col items-center justify-center min-w-[160px] shadow-2xl shadow-slate-200">
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-2">Match Rating</span>
                      <div className="text-4xl font-black tracking-tighter">{candidate.matchScore || 0}%</div>
                   </div>
                </div>

                <div className="flex md:flex-row xl:flex-col gap-4">
                  <button 
                    onClick={() => handleRankSingleResume(candidate._id)}
                    className="flex-1 xl:w-48 flex items-center justify-center px-6 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                  >
                    <BrainCircuit className="w-4 h-4 mr-2" /> Analyse Node
                  </button>
                  <button 
                    disabled={candidate.status === 'shortlisted'}
                    onClick={() => handleProcessCandidate(candidate._id, 'shortlisted')}
                    className="flex-1 xl:w-48 flex items-center justify-center px-6 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20 disabled:opacity-30 disabled:shadow-none active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Shortlist Node
                  </button>
                  <button 
                    disabled={candidate.status === 'rejected'}
                    onClick={() => handleProcessCandidate(candidate._id, 'rejected')}
                    className="flex-1 xl:w-48 flex items-center justify-center px-6 py-4 bg-white text-rose-600 border-2 border-rose-600 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-rose-50 transition-all disabled:opacity-30 active:scale-95"
                  >
                    <XCircle className="w-4 h-4 mr-2" /> Reject Node
                  </button>
                </div>
              </div>
            </div>
          ))}

          {candidates.length === 0 && !rankingInProgress && (
            <div className="py-32 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner">
                  <BrainCircuit className="text-slate-200 w-12 h-12" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">Neural Sync Required</h3>
               <p className="text-slate-500 font-medium max-w-sm leading-relaxed">Execute neural matching to identify optimal talent nodes based on current deployment parameters.</p>
               <button
                  disabled={job.resumes?.length === 0}
                  onClick={handleRankResumes}
                  className="mt-8 bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 hover:text-white transition-all active:scale-95 disabled:opacity-30"
               >
                  Sync Neural Engine
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobCandidates;
