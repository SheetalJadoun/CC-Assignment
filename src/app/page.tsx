"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Import Supabase client
import Chat from './components/Chat';

const ChatPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
        return;
      }
      setUserId(data.session?.user.id ?? null);
    };

    fetchSession();
  }, []);

  if (!userId) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Event Planning Chat</h1>
      <Chat userId={userId} />
    </div>
  );
};

export default ChatPage;
