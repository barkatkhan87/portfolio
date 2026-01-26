import { useEffect, useMemo, useState } from 'react';
import { skillApi } from '../../../api/skillApi';
import { mapSkillToFormValues } from '../../../forms/admin/skill/skill.constants';

export const useSkillsManageData = () => {
  const [skills, setSkills] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  const loadSkills = async () => {
    const res = await skillApi.getAdminSkills();
    setSkills(res.data || []);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const filteredSkills = useMemo(() => {
    if (filterCategory === 'all') return skills;
    return skills.filter((s) => s.category === filterCategory);
  }, [skills, filterCategory]);

  const handleOpenCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditing(skill);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      const payload = {
        ...values,
        proficiency: Number(values.proficiency),
        order: Number(values.order),
      };

      if (editing?._id) {
        await skillApi.update(editing._id, payload);
      } else {
        await skillApi.create(payload);
      }

      setOpen(false);
      setEditing(null);
      await loadSkills();
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || 'Failed to save skill';
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    await skillApi.delete(id);
    await loadSkills();
  };

  const handleToggleVisibility = async (id) => {
    await skillApi.toggleVisibility(id);
    await loadSkills();
  };

  const initialFormValues = useMemo(
    () => mapSkillToFormValues(editing),
    [editing]
  );

  return {
    skills,
    filteredSkills,
    open,
    editing,
    saving,
    filterCategory,
    initialFormValues,
    handleOpenCreate,
    handleOpenEdit,
    handleClose,
    handleFilterCategoryChange,
    handleSubmit,
    handleDelete,
    handleToggleVisibility,
  };
};