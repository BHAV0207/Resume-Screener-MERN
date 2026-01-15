import  { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  UserCheck,
  Bell,
  ArrowUpRight,
  Zap,
  TrendingUp,
  Activity
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { JobContext } from "../store/JobContext";

const Dashboard = () => {
  const {
    totalJobs,
    activeJobs,
    fetchAdminJobStats,
    fetchAdminResumes,
    resumes,
    fetchShortlistedResumes,
    shortlisted,
    loading,
  } = useContext(JobContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminJobStats();
    fetchAdminResumes();
    fetchShortlistedResumes();
  }, [fetchAdminJobStats, fetchAdminResumes, fetchShortlistedResumes]);

  const applicationData = totalJobs?.map((data) => ({
    name: data.title.length > 15 ? data.title.substring(0, 15) + "..." : data.title,
    applications: data.resumes?.length || 0,
  }));

  const COLORS = ["#10b981", "#059669", "#34d399", "#6ee7b7"];

  const experienceCategories = [
    { name: "Beginner (<1yr)", value: 0 },
    { name: "Intermediate (1-5yrs)", value: 0 },
    { name: "Expert (5+yrs)", value: 0 },
  ];

  resumes?.forEach((resume) => {
    const exp = resume.experience || 0;
    if (exp < 1) experienceCategories[0].value++;
    else if (exp >= 1 && exp < 5) experienceCategories[1].value++;
    else experienceCategories[2].value++;
  });

  const totalResumesCount = resumes?.length || 0;
  const hasData = totalResumesCount > 0;

  const notifications = [
    { id: 1, message: "New application received for Senior Engineer", time: "5 mins ago", type: "success" },
    { id: 2, message: "AI Analysis completed for 12 candidate resumes", time: "10 mins ago", type: "info" },
  ];

  if (loading && !totalJobs.length) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500/20 border-t-emerald-500" />
      </div>
    );
  }

  return (
    <div className="p-6 ml-8 space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Intelligence Hub</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-2 flex items-center">
            <Activity className="w-3 h-3 mr-2 text-emerald-500" /> Monitoring Recruitment Pipeline
          </p>
        </div>
        <button 
          onClick={() => navigate("/admin/post-jobs")}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-slate-100 hover:bg-black transition-all flex items-center justify-center group active:scale-95"
        >
          <Zap className="w-4 h-4 mr-2 text-emerald-500 group-hover:scale-125 transition-transform" fill="currentColor" />
          Deploy New Position
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Briefcase className="w-6 h-6 text-emerald-600" />}
          title="Total Positions"
          value={totalJobs?.length || 0}
          bgColor="bg-emerald-50"
          onClick={() => navigate("/admin/posted-jobs")}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
          title="Active Live"
          value={activeJobs?.length || 0}
          bgColor="bg-emerald-50"
          accentColor="emerald"
          onClick={() => navigate("/admin/active-jobs")}
        />
        <StatCard
          icon={<Users className="w-6 h-6 text-emerald-600" />}
          title="Talent Pool"
          value={totalResumesCount}
          bgColor="bg-emerald-50"
          onClick={() => navigate("/admin/all-resumes")}
        />
        <StatCard
          icon={<UserCheck className="w-6 h-6 text-emerald-600" />}
          title="AI Shortlisted"
          value={shortlisted?.length || 0}
          bgColor="bg-emerald-100/50"
          onClick={() => navigate("/admin/all-resumes")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-center sm:text-left">
        {/* Charts */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Volume Analysis</h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resumes / Job</span>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', padding: '16px'}} 
                  cursor={{fill: '#f0fdf4'}}
                />
                <Bar dataKey="applications" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Expertise Depth</h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate Stratification</span>
          </div>
          <div className="h-80 w-full flex items-center justify-center">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={experienceCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={120}
                    paddingAngle={10}
                    dataKey="value"
                  >
                    {experienceCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={12} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', padding: '16px'}} 
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center">
                 <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-200">
                   <Activity size={32} />
                 </div>
                 <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Waiting for data feed...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Jobs */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Deployments</h3>
            <button 
              onClick={() => navigate("/admin/posted-jobs")}
              className="text-emerald-600 font-black text-xs uppercase tracking-widest hover:underline"
            >
              Master List
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-slate-50/30">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Position Header</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Network Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {totalJobs?.slice(0, 5).map((job) => (
                  <tr key={job._id} className="hover:bg-emerald-50/20 transition-all group">
                    <td className="px-8 py-6 text-slate-800 font-black tracking-tight group-hover:text-emerald-600 transition-colors uppercase text-sm">{job.title}</td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                        job.active 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : "bg-slate-50 text-slate-500 border-slate-100"
                      }`}>
                        {job.active ? "● Live Node" : "○ Internal"}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-400 font-bold text-xs">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Network Feed</h3>
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
               <Bell size={20} />
            </div>
          </div>
          <div className="space-y-8">
            {notifications.map((n) => (
              <div key={n.id} className="relative pl-8 border-l-2 border-slate-100 pb-1 hover:border-emerald-500 transition-colors group">
                <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-slate-200 group-hover:bg-emerald-500 transition-colors" />
                <p className="text-sm font-black text-slate-800 mb-2 leading-tight group-hover:text-emerald-600 transition-colors">{n.message}</p>
                <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                   <Activity className="w-3 h-3 mr-1.5 text-emerald-500" /> {n.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, bgColor, onClick }) => (
  <div 
    onClick={onClick}
    className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden relative"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 ${bgColor} rounded-bl-[4rem] group-hover:scale-110 transition-transform -z-0 opacity-40`} />
    <div className="relative z-10">
      <div className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:rotate-6 transition-transform`}>
        {icon}
      </div>
      <p className="text-slate-400 font-black text-[10px] tracking-[0.2em] uppercase mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-5xl font-black text-slate-900 tracking-tighter">{value}</h4>
        <div className="bg-emerald-500 text-white p-2 rounded-xl shadow-lg shadow-emerald-900/20 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
