import { useEffect } from 'react';
import { socket } from '../config/socket';

const useSocket = () => {
    
  useEffect(() => {
    // Conectamos sólo la primera vez que alguien use el hook
    if (!socket.connected) socket.connect();

    const handleConnect = () => console.log('Cliente Conectado al servidor con el ID: ', socket.id);
    
    const handleDisconnect = () => console.log('Cliente Desconectado con el ID: ',socket.id);

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    // Al cerrar la pestaña desconectamos.
    const off = () => socket.disconnect();
    window.addEventListener('beforeunload', off);

    // Cleanup cuando TODOS los componentes que usan el hook se desmonten
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      window.removeEventListener('beforeunload', off);
    };
  }, []);

  return socket;

}

export default useSocket;