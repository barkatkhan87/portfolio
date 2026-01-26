import { useEffect, useState } from 'react';
import { aboutApi } from '../../../api/aboutApi';

export const useAboutData = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await aboutApi.get();
        if (!isMounted) return;
        setAbout(res.data);
      } catch (err) {
        if (!isMounted) return;
        console.error('Failed to load about data', err);
        setError(err);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { about, loading, error };
};