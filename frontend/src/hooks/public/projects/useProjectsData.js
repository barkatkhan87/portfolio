import { useEffect, useMemo, useState } from 'react';
import { projectApi } from '../../../api/projectApi';

export const useProjectsData = () => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await projectApi.getAll({ category });
      setProjects(res.data?.projects || []);
    };
    load();
  }, [category]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
    );
  }, [projects, search]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return {
    projects,
    category,
    search,
    filtered,
    setCategory,
    setSearch,
    handleCategoryChange,
    handleSearchChange,
  };
};