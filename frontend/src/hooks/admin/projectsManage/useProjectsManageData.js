import { useEffect, useMemo, useState } from 'react';
import { projectApi } from '../../../api/projectApi';
import { mapProjectToFormValues } from '../../../forms/admin/project/project.constants';

export const useProjectsManageData = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadProjects = async () => {
    const res = await projectApi.getAdminProjects();
    setProjects(res.data || []);
  };

  useEffect(() => {
    loadProjects();
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
    if (!window.confirm('Delete this project?')) return;
    await projectApi.delete(id);
    await loadProjects();
  };

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', values.title);
      fd.append('description', values.description);
      fd.append('longDescription', values.longDescription);
      fd.append('category', values.category);
      fd.append('technologies', values.technologies);
      fd.append('liveUrl', values.liveUrl);
      fd.append('githubUrl', values.githubUrl);
      fd.append('featured', String(values.featured));
      fd.append('status', values.status);

      if (values.thumbnail) fd.append('thumbnail', values.thumbnail);
      if (values.images?.length) {
        values.images.forEach((file) => fd.append('images', file));
      }

      if (editing?._id) {
        await projectApi.update(editing._id, fd);
      } else {
        await projectApi.create(fd);
      }

      setOpen(false);
      setEditing(null);
      await loadProjects();
    } finally {
      setSaving(false);
    }
  };

  const initialFormValues = useMemo(
    () => mapProjectToFormValues(editing),
    [editing]
  );

  return {
    projects,
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