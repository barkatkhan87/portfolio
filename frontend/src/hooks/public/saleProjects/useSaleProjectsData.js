import { useEffect, useMemo, useState } from 'react';
import { saleProjectApi } from '../../../api/saleProjectApi';

export const useSaleProjectsData = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await saleProjectApi.getAll({ category });
        setItems(res.data?.items || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (p) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.shortDescription || '').toLowerCase().includes(q)
    );
  }, [items, search]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return {
    items,
    category,
    search,
    loading,
    filtered,
    handleCategoryChange,
    handleSearchChange,
  };
};