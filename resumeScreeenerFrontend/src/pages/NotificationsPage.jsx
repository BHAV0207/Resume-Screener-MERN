import React, { useEffect } from "react";
import { useNotifications } from "../store/NotificationContext";
import {
    Bell,
    Trash2,
    CheckCircle,
    Trash,
    Clock,
    Inbox,
    AlertCircle,
    ThumbsUp,
    Info
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
    const {
        notifications,
        loading,
        fetchNotifications,
        markAsRead,
        deleteNotification,
        clearNotifications,
        markAllAsRead
    } = useNotifications();

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const getNotificationIcon = (type) => {
        switch (type) {
            case "SUCCESS":
                return <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl"><ThumbsUp size={20} /></div>;
            case "ERROR":
                return <div className="p-2 bg-red-100 text-red-600 rounded-xl"><AlertCircle size={20} /></div>;
            default:
                return <div className="p-2 bg-blue-100 text-blue-600 rounded-xl"><Info size={20} /></div>;
        }
    };

    const formatTime = (date) => {
        try {
            return formatDistanceToNow(new Date(date), { addSuffix: true });
        } catch {
            return "just now";
        }
    };

    return (
        <div className="min-h-[calc(100vh-120px)] transition-all duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                            Notification <span className="text-emerald-500">Center</span>
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">
                            Manage your real-time alerts and system updates
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {notifications.length > 0 && (
                            <>
                                <button
                                    onClick={markAllAsRead}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm uppercase tracking-wider"
                                >
                                    <CheckCircle size={18} />
                                    Mark all read
                                </button>
                                <button
                                    onClick={clearNotifications}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all text-sm uppercase tracking-wider"
                                >
                                    <Trash2 size={18} />
                                    Clear all
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                    {loading && notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Synchronizing data stream...</p>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mb-6">
                                <Inbox size={40} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                                All Caught Up
                            </h3>
                            <p className="text-slate-500 max-w-xs mx-auto">
                                No new notifications in your feed. We'll alert you as soon as something happens.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className={`p-6 md:p-8 hover:bg-slate-50/50 transition-all group relative ${!notification.isRead ? 'bg-emerald-50/20' : ''}`}
                                >
                                    <div className="flex gap-5 md:gap-6">
                                        <div className="flex-shrink-0 pt-1">
                                            {getNotificationIcon(notification.type)}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <div>
                                                    <h4 className={`text-lg font-bold leading-tight ${!notification.isRead ? 'text-slate-900' : 'text-slate-600'}`}>
                                                        {notification.title}
                                                    </h4>
                                                    <div className="flex items-center gap-3 mt-1 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={12} />
                                                            {formatTime(notification.createdAt)}
                                                        </span>
                                                        {!notification.isRead && (
                                                            <span className="px-2 py-0.5 bg-emerald-500 text-white rounded-full">New</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    {!notification.isRead && (
                                                        <button
                                                            onClick={() => markAsRead(notification._id)}
                                                            className="p-2 text-slate-300 hover:text-emerald-500 transition-colors"
                                                            title="Mark as read"
                                                        >
                                                            <CheckCircle size={20} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteNotification(notification._id)}
                                                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                                        title="Delete notification"
                                                    >
                                                        <Trash size={20} />
                                                    </button>
                                                </div>
                                            </div>

                                            <p className={`text-base leading-relaxed ${!notification.isRead ? 'text-slate-700' : 'text-slate-500'}`}>
                                                {notification.message}
                                            </p>

                                            {notification.metadata && Object.keys(notification.metadata).length > 0 && (
                                                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hidden md:block">
                                                    <pre className="text-xs text-slate-500 font-mono overflow-x-auto">
                                                        {JSON.stringify(notification.metadata, null, 2)}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
