import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

 export const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  reconnectionAttempts: 5,
    //para evitar autoconexiones duplicadas
  autoConnect: false,
});

