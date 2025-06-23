// src/utils/socket.js
import { io } from 'socket.io-client';

let socket;

export const getSocket = (sessionId, userId) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000', {
      query: { sessionId, userId },
      transports: ['websocket'],
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('✅ 소켓 연결됨:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ 소켓 연결 끊김');
    });
  }

  return socket;
};

export const resetSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
