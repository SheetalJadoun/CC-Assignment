import { useEffect, useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabaseClient';

function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Fetch session on mount
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (!session && (Component as any).authRequired) {
    return <p>Redirecting to login...</p>;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
