// pages/admin/messages.tsx

import { useEffect, useState } from 'react';

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch('/api/admin/messages')
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Primljene poruke</h1>
      <div className="space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className="border p-4 rounded shadow-sm">
            <p><strong>{msg.name}</strong> ({msg.email})</p>
            <p className="text-gray-700 italic">{new Date(msg.createdAt).toLocaleString()}</p>
            <p className="mt-2">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
