import React from 'react';
import './style.css';

export default function ChatPanel() {
  return (
    <section className="chat-container">
      <div className="chat-header">
        <h2 className="chat-title">1. Chat Multicast & DMs</h2>
        <p className="chat-subtitle">WebSocket Bidirecional + STOMP</p>
      </div>
      <div className="chat-placeholder">
        Aguardando conexão STOMP...
      </div>
    </section>
  );
}