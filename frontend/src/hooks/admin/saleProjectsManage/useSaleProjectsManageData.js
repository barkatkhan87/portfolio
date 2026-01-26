import { useEffect, useMemo, useState } from 'react';
import { saleProjectApi } from '../../../api/saleProjectApi';
import { mapSaleProjectToFormValues } from '../../../forms/admin/saleProject/saleProject.constants';

export const useSaleProjectsManageData = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadItems = async () => {
    const res = await saleProjectApi.getAdminAll();
    setItems(res.data || []);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleOpenCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditing(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this sale project?')) return;
    await saleProjectApi.delete(id);
    await loadItems();
  };

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', values.title);
      fd.append('shortDescription', values.shortDescription);
      fd.append('description', values.description);
      fd.append('price', String(values.price));
      fd.append('currency', values.currency);
      fd.append('category', values.category);
      fd.append('technologies', values.technologies);
      fd.append('duration', values.duration);
      fd.append('implementationGuide', values.implementationGuide);
      fd.append('features', values.features);
      fd.append('includes', values.includes);
      fd.append('demoUrl', values.demoUrl);
      fd.append('githubUrl', values.githubUrl);
      fd.append('contactUrl', values.contactUrl);
      fd.append('isVisible', String(values.isVisible));
      fd.append('isFeatured', String(values.isFeatured));
      fd.append('order', String(values.order));

      if (values.thumbnail) fd.append('thumbnail', values.thumbnail);
      if (values.images?.length) {
        values.images.forEach((file) => fd.append('images', file));
      }

      if (editing?._id) {
        await saleProjectApi.update(editing._id, fd);
      } else {
        await saleProjectApi.create(fd);
      }

      setOpen(false);
      setEditing(null);
      await loadItems();
    } finally {
      setSaving(false);
    }
  };

  const initialFormValues = useMemo(
    () => mapSaleProjectToFormValues(editing),
    [editing]
  );

  return {
    items,
    open,
    editing,
    saving,
    initialFormValues,
    handleOpenCreate,
    handleOpenEdit,
    handleClose,
    handleDelete,
    handleSubmit,
  };
};