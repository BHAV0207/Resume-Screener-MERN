const { Server } = require("socket.io");

// Map: userId -> Set of socket IDs (one user can have multiple connections)
const userSockets = new Map();

let io = null;

/**
 * Initialize Socket.io with the HTTP server
 * @param {http.Server} httpServer 
 */
const initializeSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: [
                "http://localhost:5174",
                "http://localhost:5173",
                "https://resume-screener-mern-1.onrender.com",
                "https://cozy-horse-11712e.netlify.app",
            ],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            // Add socket to user's set of connections
            if (!userSockets.has(userId)) {
                userSockets.set(userId, new Set());
            }
            userSockets.get(userId).add(socket.id);
            console.log(`🔌 User ${userId} connected (socket: ${socket.id})`);
        }

        socket.on("disconnect", () => {
            if (userId && userSockets.has(userId)) {
                userSockets.get(userId).delete(socket.id);
                if (userSockets.get(userId).size === 0) {
                    userSockets.delete(userId);
                }
                console.log(`🔌 User ${userId} disconnected (socket: ${socket.id})`);
            }
        });
    });

    console.log("✅ WebSocket server initialized");
    return io;
};

/**
 * Send notification to a specific user
 * @param {string} userId 
 * @param {string} event 
 * @param {object} data 
 */
const sendToUser = (userId, event, data) => {
    if (!io) {
        console.warn("⚠️ Socket.io not initialized");
        return false;
    }

    const sockets = userSockets.get(userId);
    if (sockets && sockets.size > 0) {
        sockets.forEach((socketId) => {
            io.to(socketId).emit(event, data);
        });
        console.log(`📤 Sent ${event} to user ${userId}`);
        return true;
    }

    console.log(`⚠️ User ${userId} not connected, notification queued in DB only`);
    return false;
};

/**
 * Broadcast to all connected clients
 * @param {string} event 
 * @param {object} data 
 */
const broadcastToAll = (event, data) => {
    if (!io) {
        console.warn("⚠️ Socket.io not initialized");
        return false;
    }
    io.emit(event, data);
    return true;
};

/**
 * Get the Socket.io instance
 */
const getIO = () => io;

module.exports = {
    initializeSocket,
    sendToUser,
    broadcastToAll,
    getIO,
};
