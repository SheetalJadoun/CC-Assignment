import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabaseClient';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
        setSession(null);
      } else {
        setSession(data.session);
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      router.push('/auth');
    }
  }, [loading, session, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <div>Welcome to the event planning assistant!</div>;
};

Home.authRequired = true;

export default Home;
