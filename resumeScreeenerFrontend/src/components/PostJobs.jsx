import React, { useContext, useState } from "react";
import { JobContext } from "../store/JobContext";
import { Briefcase, Building, MapPin, DollarSign, List, GraduationCap, AlignLeft, Send, Loader2, Zap } from "lucide-react";

function PostJobs() {
  const { createJob, loading } = useContext(JobContext);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    salary: "",
    location: "",
    skills: "",
    minExperience: 0,
    description: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(Boolean);
    const dataToSend = { ...formData, requiredSkills: skillsArray };
    delete dataToSend.skills;
    
    await createJob(dataToSend);
    if (!loading) {
      setFormData({
        title: "",
        company: "",
        salary: "",
        location: "",
        skills: "",
        minExperience: 0,
        description: ""
      });
    }
  };

  return (
    <div className="p-6 ml-8 max-w-4xl sm:max-w-6xl md:max-w-8xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Post a New Position</h1>
          <p className="text-slate-500 font-medium">Create a job opening to start receiving AI-screened resumes</p>
        </div>
        <div className="hidden md:flex w-14 h-14 bg-emerald-600 rounded-2xl items-center justify-center shadow-lg shadow-emerald-900/20 group hover:rotate-6 transition-transform">
           <Briefcase className="text-white w-7 h-7" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
                <Building className="w-4 h-4 mr-2 text-emerald-500" /> Company & Role
              </h3>
              
              <FormInput 
                label="Job Title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g. Senior Frontend Engineer"
                required
              />
              <FormInput 
                label="Company Name" 
                name="company" 
                value={formData.company} 
                onChange={handleChange} 
                placeholder="e.g. Acme Inc"
                required
              />
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-emerald-500" /> Logistics
              </h3>
              <FormInput 
                label="Location" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="e.g. Remote / New York"
                required
              />
              <FormInput 
                label="Salary Range" 
                name="salary" 
                value={formData.salary} 
                onChange={handleChange} 
                placeholder="e.g. $120k - $150k"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
                <List className="w-4 h-4 mr-2 text-emerald-500" /> Requirements
              </h3>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Required Skills (Comma separated)</label>
                <textarea
                   name="skills"
                   value={formData.skills}
                   onChange={handleChange}
                   placeholder="React, Tailwind, Node.js..."
                   className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-600 outline-none transition-all placeholder:text-slate-400 font-medium h-28 resize-none shadow-inner"
                   required
                />
              </div>
              <FormInput 
                label="Min Experience (Years)" 
                name="minExperience" 
                type="number"
                value={formData.minExperience} 
                onChange={handleChange} 
                required
              />
            </div>
          </div>
        </div>

        {/* Description - Full Width */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
            <AlignLeft className="w-4 h-4 mr-2 text-emerald-500" /> Job Description
          </h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the role, responsibilities, and benefits..."
            className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-600 outline-none transition-all placeholder:text-slate-400 font-medium h-60 resize-none shadow-inner"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="group bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-slate-100 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70 flex items-center uppercase tracking-widest"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : (
              <>
                <Zap className="w-5 h-5 mr-3 text-emerald-500 group-hover:scale-125 transition-transform" fill="currentColor" />
                Deploy Position
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

const FormInput = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
    <input
      {...props}
      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-600 outline-none transition-all placeholder:text-slate-400 font-medium shadow-inner"
    />
  </div>
);

export default PostJobs;
