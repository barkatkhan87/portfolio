import { useEffect, useState } from 'react';
import { projectApi } from '../../../api/projectApi';

export const useProjectDetailData = (slug) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await projectApi.getBySlug(slug);
        if (!isMounted) return;
        setProject(res.data);
      } catch (err) {
        if (!isMounted) return;
        console.error('Failed to load project detail', err);
        setError(err);
        setProject(null);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { project, loading, error };
};