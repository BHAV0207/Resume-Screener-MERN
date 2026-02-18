import { X, MapPin, DollarSign, Briefcase, Clock } from "lucide-react";

function JobDetailsModal({ job, onClose, onApply }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xl flex items-center justify-center z-[200] p-6">
      <div className="bg-white max-w-3xl w-full rounded-[4rem] p-12 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-400 hover:text-black"
        >
          <X size={28} />
        </button>

        {/* Header */}
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">
          {job.title}
        </h2>
        <p className="text-emerald-600 font-black uppercase tracking-widest text-xs mb-6">
          {job.company}
        </p>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <Meta icon={<MapPin size={16} />} text={job.location} />
          <Meta icon={<DollarSign size={16} />} text={job.salary} />
          <Meta
            icon={<Briefcase size={16} />}
            text={`${job.minExperience}+ Years`}
          />
          <Meta
            icon={<Clock size={16} />}
            text={new Date(job.createdAt).toDateString()}
          />
        </div>

        {/* Description */}
        <p className="text-slate-600 mb-8">{job.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-3 mb-10">
          {job.requiredSkills.map((skill, i) => (
            <span
              key={i}
              className="px-5 py-2 bg-slate-100 rounded-xl text-xs font-black uppercase"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => onApply(job)}
          className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black uppercase tracking-widest"
        >
          Apply for this role
        </button>
      </div>
    </div>
  );
}

const Meta = ({ icon, text }) => (
  <div className="flex items-center text-sm font-bold text-slate-600">
    <span className="mr-2 text-emerald-600">{icon}</span>
    {text}
  </div>
);

export default JobDetailsModal;
