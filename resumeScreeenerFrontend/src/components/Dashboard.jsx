import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
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

const Dashboard = () => {
  const { isDarkMode } = useContext(ThemeContext);

  // Sample data for charts
  const applicationData = [
    { name: "Frontend Dev", applications: 55 },
    { name: "Backend Dev", applications: 32 },
    { name: "UI Designer", applications: 28 },
    { name: "DevOps", applications: 15 },
  ];

  const experienceData = [
    { name: "Junior", value: 60 },
    { name: "Mid-Level", value: 35 },
    { name: "Senior", value: 5 },
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

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

  const recentJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      status: "Active",
      date: "2024-03-15",
    },
    { id: 2, title: "Backend Engineer", status: "Active", date: "2024-03-14" },
    { id: 3, title: "UI/UX Designer", status: "Closed", date: "2024-03-10" },
  ];

  const [totalJobs, setTotalJobs] = useState(null);
  const [activeJobs, setActiveJobs] = useState(null);

  const handleJobCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/jobs/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );

      const res = await axios.get(
        `http://localhost:5000/api/jobs/${user.id}?active=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );

      const activeJobsCount = res.data.length;
      const jobCount = response.data.length;
      setTotalJobs(jobCount);
      setActiveJobs(activeJobsCount)
    } catch (err) {
      console.error("Error fetching job count:", err);
    }
  };

  useEffect(() => {
    handleJobCount()
  } ,[])

  return (
    <div
      className={`px-5 py-3 transition-colors duration-200 ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Briefcase className="h-6 w-6 text-indigo-600" />}
          title="Total Jobs Posted"
          value={totalJobs}
          trend="+12%"
          isDark={isDarkMode}
        />
        <StatCard
          icon={<BarChartIcon className="h-6 w-6 text-green-600" />}
          title="Active Jobs"
          value={activeJobs}
          trend="+5%"
          isDark={isDarkMode}
        />
        <StatCard
          icon={<Users className="h-6 w-6 text-blue-600" />}
          title="Total Resumes"
          value="1,890"
          trend="+18%"
          isDark={isDarkMode}
        />
        <StatCard
          icon={<UserCheck className="h-6 w-6 text-yellow-600" />}
          title="Shortlisted"
          value="280"
          trend="+8%"
          isDark={isDarkMode}
        />
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
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={experienceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {experienceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
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
                {recentJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="py-2">{job.title}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          job.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="py-2">{job.date}</td>
                  </tr>
                ))}
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
