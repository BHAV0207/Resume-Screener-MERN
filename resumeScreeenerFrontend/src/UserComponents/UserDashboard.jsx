import {
  Briefcase,
  TrendingUp,
  ArrowRight,
  Bell,
  Zap,
  Building,
  BrainCircuit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";
import { ResumeContext } from "../store/ResumeContext";
import { useEffect } from "react";

function UserDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { fetchResumesByUserId, resumes } = useContext(ResumeContext);

  useEffect(() => {
    fetchResumesByUserId();
  }, []);

  console.log(resumes);

  const shortlistedCount = resumes.filter(
    (item) => item.status === "shortlisted",
  ).length;

  const underEvaluation = resumes.filter(
    (item) => item.status === "evaluation",
  ).length;

  const recentResumes = [...resumes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // This would ideally come from a context/API, using dummy data for now as per project scope
  const stats = [
    {
      title: "Active Applications",
      value: resumes?.length,
      icon: Briefcase,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Shortlisted Applications",
      value: shortlistedCount,
      icon: BrainCircuit,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Rejected Applications",
      value: resumes?.length - shortlistedCount - underEvaluation,
      icon: Zap,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Success Rate",
      value: (shortlistedCount / resumes?.length) * 100 + "%",
      icon: TrendingUp,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
  ];

  const notifications = [
    {
      id: 1,
      text: "Resume successfully parsed for TechCorp",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      text: "Application viewed by StartupX hiring team",
      time: "5 hours ago",
      type: "info",
    },
  ];

  return (
    <div className="p-8 ml-8 space-y-10 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 bg-slate-900 p-10 md:p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-bl-full -z-0 blur-3xl group-hover:bg-emerald-600/20 transition-all duration-700" />
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
            Welcome, {user?.name || "Explorer"}
          </h1>
          <p className="text-emerald-500/60 font-black uppercase text-[10px] tracking-[0.4em]">
            Neural sync active • Candidate protocol initialized
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={() => navigate("/user/browse-jobs")}
              className="px-10 py-5 bg-emerald-600 text-white rounded-[2rem] font-black shadow-2xl shadow-emerald-900/40 hover:bg-emerald-500 transition-all flex items-center uppercase text-xs tracking-widest active:scale-95"
            >
              Analyze Openings <ArrowRight className="ml-3 w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/user/profile")}
              className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-[2rem] font-black hover:bg-white/10 transition-all uppercase text-xs tracking-widest active:scale-95"
            >
              Sync Profile
            </button>
          </div>
        </div>
        <div className="hidden xl:flex w-48 h-48 bg-emerald-600/10 rounded-[4rem] items-center justify-center p-10 border border-emerald-500/20 group-hover:rotate-6 transition-transform duration-700">
          <Zap className="text-emerald-500 w-full h-full" fill="currentColor" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Stats */}
        <div className="lg:col-span-2 space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 text-center group"
              >
                <div
                  className={`w-14 h-14 ${stat.bgColor} ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <stat.icon size={28} />
                </div>
                <div className="text-3xl font-black text-slate-900 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">
                  {stat.title}
                </div>
              </div>
            ))}
          </div>

          {/* Activity Section */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm max-h-[500px] overflow-auto">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                Recent Pulse
              </h3>
              <TrendingUp className="text-emerald-500 w-8 h-8" />
            </div>
            <div className="space-y-6">
              {recentResumes.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-emerald-100 transition-colors"
                >
                  {/* Left section */}
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <Building size={24} className="text-emerald-500" />
                    </div>

                    <div>
                      <p className="font-black text-slate-900 text-lg uppercase">
                        {item.jobId?.company}
                      </p>
                      <p className="text-xs font-black uppercase text-slate-400">
                        {item.jobId?.title}
                      </p>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {item.jobId?.description}
                      </p>

                      <p className="text-sm text-slate-600 mt-1">
                        <span className="font-semibold">Salary:</span>{" "}
                        {item.jobId?.salary}
                      </p>
                    </div>
                  </div>

                  {/* Right section (badges) */}
                  <div className="flex gap-3">
                    {/* Location badge */}
                    <span className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                      {item.jobId?.location}
                    </span>

                    {/* Status badge */}
                    <span
                      className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl
          ${
            item.status === "shortlisted"
              ? "bg-green-600 text-white"
              : item.status === "rejected"
                ? "bg-red-600 text-white"
                : "bg-yellow-500 text-white"
          }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
                 {resumes.length > 2 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate("/user/applications")}
                className="px-8 py-3 rounded-xl bg-slate-900 text-white text-sm font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors"
              >
                View More
              </button>
            </div>
          )}
          </div>
     
        </div>

        {/* Sidebar info */}
        <div className="space-y-10">
          <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl shadow-slate-200 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700">
              <BrainCircuit size={100} />
            </div>
            <h3 className="text-xl font-black mb-6 flex items-center tracking-tight uppercase">
              <Zap
                size={24}
                className="mr-3 text-emerald-500"
                fill="currentColor"
              />{" "}
              Neural Logic
            </h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Optimal matches exceeding{" "}
              <span className="text-emerald-500 font-black">
                80% efficiency
              </span>{" "}
              are automatically prioritized in your deployment feed. Sync your
              node signature for maximum accuracy.
            </p>
            <button className="mt-8 w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-900/30 active:scale-95">
              Optimize Node
            </button>
          </div>

          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                Data Feed
              </h3>
              <Bell size={24} className="text-emerald-500 animate-swing" />
            </div>
            <div className="space-y-8">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="relative pl-8 border-l-2 border-emerald-100 pb-2 group"
                >
                  <div className="absolute top-0 -left-[5px] w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-inner group-hover:scale-125 transition-transform" />
                  <p className="text-sm font-bold text-slate-700 leading-snug group-hover:text-emerald-600 transition-colors uppercase tracking-tight">
                    {n.text}
                  </p>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2 block opacity-60">
                    {n.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
