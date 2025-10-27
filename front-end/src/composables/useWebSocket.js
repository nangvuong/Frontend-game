import { useEffect, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WS_URL = import.meta.env.VITE_WS_URL || "http://localhost:8080/ws";

export const useWebSocket = () => {
  const clientRef = useRef(null);
  const subscribersRef = useRef({});

  // Kết nối WebSocket
  const connect = useCallback((onConnected) => {
    if (clientRef.current?.active) {
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        console.log("STOMP Debug:", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        onConnected?.();
      },
      onStompError: (frame) => {
        console.error("❌ STOMP Error:", frame);
      },
      onWebSocketClose: () => {
      },
    });

    client.activate();
    clientRef.current = client;
  }, []);
  // Ngắt kết nối
  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.deactivate();
      clientRef.current = null;
      subscribersRef.current = {};
    }
  }, []);

  // Subscribe topic/queue
  const subscribe = useCallback((destination, callback) => {
    if (!clientRef.current?.active) {
      console.error("WebSocket not connected");
      return null;
    }

    const subscription = clientRef.current.subscribe(destination, (message) => {
      try {
        const data = JSON.parse(message.body);
        callback(data);
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    });

    subscribersRef.current[destination] = subscription;

    return subscription;
  }, []);
  // Unsubscribe
  const unsubscribe = useCallback((destination) => {
    const subscription = subscribersRef.current[destination];
    if (subscription) {
      subscription.unsubscribe();
      delete subscribersRef.current[destination];
    }
  }, []);
  // Send message
  const send = useCallback((destination, body) => {
    if (!clientRef.current?.active) {
      console.error("WebSocket not connected");
      return;
    }

    clientRef.current.publish({
      destination,
      body: JSON.stringify(body),
    });
  }, []);
  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    send,
    isConnected: () => clientRef.current?.active || false,
  };
};
