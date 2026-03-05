import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Notification {
  id: string;
  type: 'scan_completed' | 'info' | 'error';
  message: string;
  timestamp: Date;
  read: boolean;
  data?: any;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let reconnectTimeout: any;

    const connect = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // No ambiente do AI Studio, o WebSocket usa a mesma origem
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}`;
      
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log('[WS] Conectado ao servidor');
        // Autenticar
        socket.send(JSON.stringify({
          type: 'auth',
          token: session.access_token
        }));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('[WS] Mensagem recebida:', data);

        if (data.type === 'scan_completed') {
          const newNotification: Notification = {
            id: `notif-${Date.now()}`,
            type: 'scan_completed',
            message: `Varredura concluída para ${data.url}. Score: ${data.score}`,
            timestamp: new Date(),
            read: false,
            data: data
          };
          setNotifications(prev => [newNotification, ...prev]);
        }
      };

      socket.onclose = () => {
        console.log('[WS] Desconectado. Tentando reconectar...');
        reconnectTimeout = setTimeout(connect, 5000);
      };

      socket.onerror = (error) => {
        console.error('[WS] Erro na conexão:', error);
      };
    };

    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      clearTimeout(reconnectTimeout);
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return { notifications, markAsRead, clearNotifications };
}
