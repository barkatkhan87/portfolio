import { useEffect, useState } from 'react';
import { skillApi } from '../../../api/skillApi';

export const useSkillsData = () => {
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = Object.keys(grouped);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await skillApi.getAll('all');
        if (!isMounted) return;
        setGrouped(res.data?.grouped || {});
      } catch (err) {
        if (!isMounted) return;
        console.error('Failed to load skills', err);
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

  return { grouped, categories, loading, error };
};