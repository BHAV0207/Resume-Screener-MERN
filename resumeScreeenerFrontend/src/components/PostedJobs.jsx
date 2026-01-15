import React, { useContext, useEffect, useState } from "react";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Calendar,
  Users,
  ExternalLink,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { JobContext } from "../store/JobContext";

const PostedJobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingJob, setEditingJob] = useState(null);

  const { totalJobs, fetchAdminJobStats, deleteJob, updateJob, loading } = useContext(JobContext);

  useEffect(() => {
    fetchAdminJobStats();
  }, [fetchAdminJobStats]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await updateJob(editingJob._id, editingJob);
    setEditingJob(null);
  };

  const filteredJobs = (totalJobs || []).filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "active" && job.active) || 
                         (filterStatus === "closed" && !job.active);
    return matchesSearch && matchesFilter;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 ml-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Posted Jobs</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and track your active recruitment listings</p>
        </div>
        <button
          onClick={() => navigate("/admin/post-jobs")}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-slate-100 hover:bg-black transition-all flex items-center group active:scale-95 uppercase text-xs tracking-widest"
        >
          <Target className="w-4 h-4 mr-2 text-emerald-500 group-hover:scale-125 transition-transform" fill="currentColor" />
          Deploy New Position
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search by title or company..."
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
            <option value="all">Global Pipeline</option>
            <option value="active">Live Nodes</option>
            <option value="closed">Internal Only</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid/Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/30 text-left">
              <tr>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Position Header</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Network Node</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Talent Unit</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedJobs.map((job) => (
                <tr key={job._id} className="hover:bg-emerald-50/20 transition-all group">
                  <td className="px-10 py-7">
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{job.title}</span>
                      <span className="text-[10px] font-black text-slate-400 flex items-center mt-2 uppercase tracking-widest">
                        <Calendar className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                        Init {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-bold text-slate-700 flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                        {job.location}
                      </span>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">{job.company}</span>
                    </div>
                  </td>
                  <td className="px-10 py-7 text-center">
                    <button 
                      onClick={() => navigate(`/admin/posted-jobs/${job._id}`)}
                      className="inline-flex items-center px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-black text-xs hover:bg-emerald-100 transition-all border border-emerald-100 shadow-sm uppercase tracking-widest"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      {job.resumes?.length || 0} Unit
                    </button>
                  </td>
                  <td className="px-10 py-7">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                      job.active ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-500 border-slate-100"
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 animate-pulse ${job.active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      {job.active ? "Live" : "Closed"}
                    </span>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                       <button
                        onClick={() => navigate(`/admin/posted-jobs/${job._id}`)}
                        className="p-3 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all shadow-sm"
                        title="View Candidates"
                      >
                        <ExternalLink size={18} />
                      </button>
                      <button
                        onClick={() => setEditingJob({...job})}
                        className="p-3 bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all shadow-sm"
                        title="Edit Job"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteJob(job._id)}
                        className="p-3 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shadow-sm"
                        title="Delete Job"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!paginatedJobs.length && (
                <tr>
                  <td colSpan="5" className="px-10 py-24 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                       <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center">
                          <Search className="text-slate-200 w-10 h-10" />
                       </div>
                       <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No matching nodes in current sectors</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-10 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Scan range: <span className="text-slate-900">{startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredJobs.length)}</span> of <span className="text-slate-900">{filteredJobs.length}</span> deployments
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-emerald-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center space-x-2">
               {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
                 <button 
                   key={p} 
                   onClick={() => setCurrentPage(p)}
                   className={`w-11 h-11 rounded-xl font-black text-xs transition-all shadow-sm ${currentPage === p ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-emerald-50 text-slate-500 border border-slate-100'}`}
                 >
                   {p < 10 ? `0${p}` : p}
                 </button>
               ))}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-emerald-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingJob && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xl flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3.5rem] max-w-xl w-full p-10 md:p-14 relative shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setEditingJob(null)} className="absolute top-10 right-10 p-3 rounded-full hover:bg-slate-100 text-slate-400 transition-all">
              <X size={28} />
            </button>
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Modify Position</h2>
              <p className="text-slate-500 font-medium text-sm mt-1">Update deployment parameters</p>
            </div>
            
            <form onSubmit={handleUpdateSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Position Header</label>
                <input
                  required
                  type="text"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-600 outline-none transition-all font-bold shadow-inner"
                  value={editingJob.title}
                  onChange={(e) => setEditingJob({...editingJob, title: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Core Objectives</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-600 outline-none transition-all font-bold resize-none shadow-inner"
                  value={editingJob.description}
                  onChange={(e) => setEditingJob({...editingJob, description: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Network Visibility</label>
                <div className="relative group">
                  <select
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-600 outline-none transition-all font-black cursor-pointer appearance-none shadow-inner uppercase text-xs tracking-widest"
                    value={editingJob.active}
                    onChange={(e) => setEditingJob({...editingJob, active: e.target.value === "true"})}
                  >
                    <option value="true">● Live & Public Node</option>
                    <option value="false">○ Closed / Internal Repository</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                </div>
              </div>

              <button className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-lg shadow-2xl shadow-slate-100 hover:bg-black transition-all active:scale-[0.98] uppercase tracking-[0.2em] mt-6">
                Push Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostedJobs;
