import { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, Trash2, X, ExternalLink } from "lucide-react";
import { useNotifications } from "../store/NotificationContext";
import { formatDistanceToNow } from "date-fns";
import { useNavigate, useLocation } from "react-router-dom";

const NotificationBell = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    loading
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "SUCCESS":
        return "🎉";
      case "ERROR":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  const formatTime = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return "just now";
    }
  };

  const handleViewAll = () => {
    setIsOpen(false);
    const basePath = location.pathname.startsWith('/admin') ? '/admin' : '/user';
    navigate(`${basePath}/notifications`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3.5 rounded-2xl text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all group"
      >
        <Bell
          size={22}
          className="group-hover:rotate-12 transition-transform"
        />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 min-w-[20px] h-5 px-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white animate-bounce-fine">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Header */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                Notifications
              </h3>
              {loading && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />}
            </div>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <>
                  <button
                    onClick={markAllAsRead}
                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                    title="Mark all as read"
                  >
                    <CheckCheck size={16} />
                  </button>
                  <button
                    onClick={clearNotifications}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Clear all"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center bg-white">
                <Bell size={40} className="mx-auto text-slate-100 mb-2" />
                <p className="text-slate-400 text-sm font-medium">No new alerts detected</p>
              </div>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification._id || notification.id}
                  className={`px-4 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${!notification.isRead ? "bg-emerald-50/20" : ""
                    }`}
                  onClick={() => markAsRead(notification._id)}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm truncate ${!notification.isRead ? 'text-slate-900' : 'text-slate-500'}`}>
                        {notification.title}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">
                        {notification.message}
                      </p>
                      <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-tight">
                        {formatTime(notification.createdAt)}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* View All Button */}
          <button
            onClick={handleViewAll}
            className="w-full py-4 bg-slate-50 border-t border-slate-100 text-center text-xs font-black text-slate-900 uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 group"
          >
            View Full Control Center
            <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
