import React, { useContext, useEffect } from "react";
import {
  Briefcase,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Users,
  Building,
} from "lucide-react";
import { JobContext } from "../store/JobContext";

function UserDashboard() {







  const stats = [
    {
      title: "Applications Sent",
      value: "24",
      icon: Briefcase,
      change: "+12%",
      changeType: "increase",
    },
    {
      title: "Interviews Scheduled",
      value: "5",
      icon: Clock,
      change: "+3",
      changeType: "increase",
    },
    {
      title: "Applications Accepted",
      value: "8",
      icon: CheckCircle,
      change: "+2",
      changeType: "increase",
    },
    {
      title: "Applications Rejected",
      value: "3",
      icon: XCircle,
      change: "-1",
      changeType: "decrease",
    },
  ];

  const recentActivity = [
    {
      company: "TechCorp",
      position: "Senior Developer",
      status: "Interview Scheduled",
      date: "2024-03-15",
      logo: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=100&h=100&fit=crop",
    },
    {
      company: "DesignHub",
      position: "UI/UX Designer",
      status: "Application Sent",
      date: "2024-03-14",
      logo: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=100&h=100&fit=crop",
    },
    {
      company: "StartupX",
      position: "Product Manager",
      status: "Under Review",
      date: "2024-03-13",
      logo: "https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?w=100&h=100&fit=crop",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Activity up by 23% this week
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="h-8 w-8 text-indigo-500" />
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "increase"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <div className="mt-6 space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.company}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={activity.logo}
                    alt={activity.company}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.position}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.company}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.status}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
