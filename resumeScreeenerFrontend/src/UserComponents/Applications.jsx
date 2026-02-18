import React from "react";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Building,
  Calendar,
  ArrowRight,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { useContext } from "react";
import { ResumeContext } from "../store/ResumeContext";

function Applications() {
  const { resumes } = useContext(ResumeContext);
  console.log(resumes);
  // Keeping the sample data for now as per current project architecture

  const getStatusConfig = (status) => {
    switch (status) {
      case "shortlisted":
        return {
          icon: <CheckCircle2 className="h-5 w-5" />,
          color: "text-emerald-700 bg-emerald-50 border-emerald-100",
          dot: "bg-emerald-500",
        };
      case "pending":
        return {
          icon: <Clock className="h-5 w-5" />,
          color: "text-amber-700 bg-amber-50 border-amber-100",
          dot: "bg-amber-500",
        };
      case "rejected":
        return {
          icon: <XCircle className="h-5 w-5" />,
          color: "text-rose-700 bg-rose-50 border-rose-100",
          dot: "bg-rose-500",
        };
      default:
        return {
          icon: <Clock className="h-5 w-5" />,
          color: "text-slate-700 bg-slate-50 border-slate-100",
          dot: "bg-slate-400",
        };
    }
  };

  return (
    <div className="p-8 ml-8 space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Application Tracking
          </h1>
          <p className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.4em] mt-2">
            Active protocol monitoring • Deployment status live
          </p>
        </div>
        <div className="flex gap-6 bg-white px-6 py-4 rounded-[1.5rem] border border-slate-100 shadow-sm">
          {["shortlisted", "evaluation", "rejected"].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-2.5 h-2.5 rounded-full ${getStatusConfig(s).dot} shadow-inner`}
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {resumes.map((item) => {
          const config = getStatusConfig(item.status);
          return (
            <div
              key={item._id}
              className="group bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[4.5rem] -z-0 opacity-0 group-hover:opacity-100 transition-all pointer-events-none" />

              <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8 relative z-10">
                <div className="flex gap-8">
                  <div className="w-20 h-20 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-slate-300 group-hover:bg-emerald-600 transition-all group-hover:rotate-6">
                    <Building size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tight leading-none mb-3">
                      {item.jobId?.title}
                    </h2>
                    <div className="flex flex-wrap gap-5">
                      <span className="flex items-center text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        <Building className="w-4 h-4 mr-2 text-emerald-500" />{" "}
                        {item.jobId?.company}
                      </span>
                      <span className="flex items-center text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        <Calendar className="w-4 h-4 mr-2 text-emerald-500" />{" "}
                        Applied {item.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span
                    className={`flex items-center px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border ${config.color} shadow-sm group-hover:shadow-md transition-shadow`}
                  >
                    <span className="mr-3">{config.icon}</span>
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl shadow-slate-200 group-hover:ring-2 group-hover:ring-emerald-500/20 transition-all">
                  <div className="flex items-center text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                    <ArrowRight className="w-4 h-4 mr-2" /> Current Phase
                  </div>
                  <p className="text-white text-lg font-black tracking-tight">
                    {item.status === "shortlisted"
                      ? "Shortlisted , Will be contacted soon for further Process"
                      : item.status === "rejected"
                        ? "Due to incompability with the current role , resume will not be moving forward"
                        : item.status === "evaluation"
                          ? "under evaluation"
                          : "Deployment Finalized"}
                  </p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 group-hover:bg-emerald-50/30 transition-colors">
                  <div className="flex items-center text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                    <MessageSquare className="w-4 h-4 mr-2" /> Neural Feedback
                  </div>
                  <p className="text-slate-600 font-bold italic text-sm leading-relaxed">
                    none
                  </p>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button className="flex items-center text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em] hover:text-emerald-500 hover:translate-x-1 transition-all group/btn bg-emerald-50 px-6 py-3 rounded-[1.5rem]">
                  Analyze Node Context{" "}
                  <Briefcase className="ml-3 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Applications;
