import { useEffect, useState } from 'react';
import { aboutApi } from '../../../api/aboutApi';
import { projectApi } from '../../../api/projectApi';

export const useHomeData = () => {
  const [about, setAbout] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const [aboutRes, featuredRes] = await Promise.all([
          aboutApi.get(),
          projectApi.getFeatured(),
        ]);

        if (!isMounted) return;

        setAbout(aboutRes.data);
        setFeatured(featuredRes.data || []);
      } catch (error) {
        if (!isMounted) return;
        console.error('Failed to load home data', error);
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

  return { about, featured, loading };
};