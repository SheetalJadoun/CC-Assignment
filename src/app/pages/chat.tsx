import { useEffect, useState } from 'react';
import Chat from '../components/Chat';
import { supabase } from '../../../lib/supabaseClient';

const ChatPage = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUserId(data.session.user.id);
      }
    };

    fetchSession();
  }, []);

  if (!userId) return <p>Loading...</p>;

  return <Chat userId={userId} />;
};

export default ChatPage;
