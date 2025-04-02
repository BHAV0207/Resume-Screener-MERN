import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart as BarChartIcon,
  Users,
  Briefcase,
  UserCheck,
  Bell,
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
import { ThemeContext } from "../store/ThemeContext";
import { JobContext } from "../store/JobContext";

const Dashboard = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const {
    totalJobs,
    activeJobs,
    handleJobCount,
    handleResumesCount,
    resumes,
    shortlistedResumes,
    shortlisted,
  } = useContext(JobContext);

  const navigate = useNavigate();
  4;
  const [message, setMessage] = useState(false);

  useEffect(() => {
    handleJobCount();
    handleResumesCount();
    shortlistedResumes();
  }, []);

  const applicationData = totalJobs?.map((data) => {
    return { 
      "name": data.title, 
      "applications": data.resumes?.length || 0
    };
  });

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

  const experienceCategories = {
    Beginner: 0,
    Veteran: 0,
    Expert: 0,
  };

  if (totalJobs && Array.isArray(totalJobs)) {
    totalJobs.forEach((job) => {
      if (job.resumes && Array.isArray(job.resumes)) {
        job.resumes.forEach((resume) => {
          const exp = resume.experience || 0;
          if (exp < 1) experienceCategories.Beginner++;
          else if (exp >= 1 && exp < 5) experienceCategories.Veteran++;
          else experienceCategories.Expert++;
        });
      }
    });
  }
  const totalResumes =
    Object.values(experienceCategories).reduce((a, b) => a + b, 0) || 1;

  const chartData = Object.entries(experienceCategories).map(
    ([name, count]) => ({
      name,
      value: parseFloat(((count / totalResumes) * 100).toFixed(1)), // Convert to number
    })
  );

  let sum = 0;
  chartData.forEach((data) => {
    sum += data.value;
  });

  useEffect(() => {
    // Only set the message when sum is 0 and avoid infinite loop
    if (sum === 0) {
      setMessage(true);
    }
    if(sum > 0){
      setMessage(false)
    }
  }, [sum]); 


  const notifications = [
    {
      id: 1,
      message: "New application received for Frontend Developer",
      time: "5 mins ago",
    },
    {
      id: 2,
      message: "John Doe was shortlisted for Backend Developer",
      time: "10 mins ago",
    },
    {
      id: 3,
      message: "New job post published: UI Designer",
      time: "1 hour ago",
    },
  ];

  return (
    <div
      className={`px-5 py-3 transition-colors duration-200 ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          onClick={() => navigate("/admin/posted-jobs")}
          className="cursor-pointer"
        >
          <StatCard
            icon={<Briefcase className="h-6 w-6 text-indigo-600" />}
            title="Total Jobs Posted"
            value={totalJobs?.length || 0}
            trend="+12%"
            isDark={isDarkMode}
          />
        </div>
        <div
          onClick={() => navigate("/admin/active-jobs")}
          className="cursor-pointer"
        >
          <StatCard
            icon={<BarChartIcon className="h-6 w-6 text-green-600" />}
            title="Active Jobs"
            value={activeJobs?.length || 0}
            trend="+5%"
            isDark={isDarkMode}
          />
        </div>
        <div
          onClick={() => navigate("/admin/all-resumes")}
          className="cursor-pointer"
        >
          <StatCard
            icon={<Users className="h-6 w-6 text-blue-600" />}
            title="Total Resumes"
            value={resumes?.totalResumes || 0}
            trend="+18%"
            isDark={isDarkMode}
          />
        </div>
        <div
          onClick={() => navigate("/admin/all-resumes")}
          className="cursor-pointer"
        >
          <StatCard
            icon={<UserCheck className="h-6 w-6 text-yellow-600" />}
            title="Shortlisted"
            value={shortlisted?.length || 0}
            trend="+8%"
            isDark={isDarkMode}
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div
          className={`p-6 rounded-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Applications per Job
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className={`p-6 rounded-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Candidate Experience Levels
          </h3>
          <div className="h-80">
            {message ? (
              <div className="text-4xl font-bold p-23 text-red-400"> To get data please post some Jobs </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Recent Jobs and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <div
          className={`p-6 rounded-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Recent Job Listings
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr
                  className={`text-left ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                {totalJobs ? totalJobs?.map((job) => (
                  <tr key={job._id}>
                    <td className="py-2">{job.title}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          job.active === true
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {job.active ? "Active" : "Closed"}
                      </span>
                    </td>
                    <td className="py-2">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                )) : <div className="text-4xl font-extrabold text-rose-400  ">No Jobs Posted Yet</div>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div
          className={`p-6 rounded-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Recent Notifications
            </h3>
            <Bell
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-50 text-gray-700"
                }`}
              >
                <p className="text-sm">{notification.message}</p>
                <span
                  className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {notification.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend, isDark }) => (
  <div
    className={`p-6 rounded-lg ${
      isDark ? "bg-gray-800" : "bg-white"
    } shadow-lg`}
  >
    <div className="flex items-center justify-between">
      <div className={`${isDark ? "text-white" : "text-gray-900"}`}>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      {icon}
    </div>
    <div className="mt-2">
      <span className="text-sm text-green-600 dark:text-green-400">
        {trend}
      </span>
      <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        {" "}
        from last month
      </span>
    </div>
  </div>
);

export default Dashboard;
