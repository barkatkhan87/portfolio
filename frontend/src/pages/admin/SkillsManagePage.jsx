import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Chip,
} from '@mui/material';
import { skillApi } from '../../api/skillApi';
import { SKILL_CATEGORIES } from '../../utils/constants';

const emptySkill = {
  name: '',
  category: 'frontend',
  proficiency: 80,
  icon: '',
  color: '#667eea',
  order: 0,
  isVisible: true,
};

const SkillsManagePage = () => {
  const [skills, setSkills] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptySkill);
  const [saving, setSaving] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  const load = async () => {
    const res = await skillApi.getAdminSkills();
    setSkills(res.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const filteredSkills = useMemo(() => {
    if (filterCategory === 'all') return skills;
    return skills.filter((s) => s.category === filterCategory);
  }, [skills, filterCategory]);

  const onOpenCreate = () => {
    setEditing(null);
    setForm(emptySkill);
    setOpen(true);
  };

  const onOpenEdit = (skill) => {
    setEditing(skill);
    setForm({
      name: skill.name || '',
      category: skill.category || 'frontend',
      proficiency: skill.proficiency ?? 80,
      icon: skill.icon || '',
      color: skill.color || '#667eea',
      order: skill.order ?? 0,
      isVisible: skill.isVisible ?? true,
    });
    setOpen(true);
  };

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onToggle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.checked }));

  const onSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        proficiency: Number(form.proficiency),
        order: Number(form.order),
      };

      if (editing?._id) {
        await skillApi.update(editing._id, payload);
      } else {
        await skillApi.create(payload);
      }

      setOpen(false);
      await load();
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to save skill';
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    await skillApi.delete(id);
    await load();
  };

  const onToggleVisibility = async (id) => {
    await skillApi.toggleVisibility(id);
    await load();
  };

  return (
    <>
      <Helmet>
        <title>Manage Skills | Admin</title>
      </Helmet>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Skills
          </Typography>
          <Typography color="text.secondary">Create, edit, and organize your skills.</Typography>
        </Box>
        <Button variant="contained" onClick={onOpenCreate}>
          Add Skill
        </Button>
      </Box>

      <Box sx={{ mb: 3, maxWidth: 300 }}>
        <TextField
          select
          fullWidth
          label="Filter Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          {SKILL_CATEGORIES.map((c) => (
            <MenuItem key={c.value} value={c.value}>
              {c.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Grid container spacing={2}>
        {filteredSkills.map((s) => (
          <Grid item xs={12} sm={6} md={4} key={s._id}>
            <Card className="card">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 800 }}>{s.name}</Typography>
                    <Typography color="text.secondary">{s.category}</Typography>
                  </Box>
                  <Chip label={`${s.proficiency}%`} />
                </Box>

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FormControlLabel
                    control={
                      <Switch checked={!!s.isVisible} onChange={() => onToggleVisibility(s._id)} />
                    }
                    label={s.isVisible ? 'Visible' : 'Hidden'}
                  />
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button size="small" onClick={() => onOpenEdit(s)}>
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={() => onDelete(s._id)}>
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {filteredSkills.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary">No skills found.</Typography>
          </Grid>
        )}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? 'Edit Skill' : 'Add Skill'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skill Name"
                name="name"
                value={form.name}
                onChange={onChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={form.category}
                onChange={onChange}
              >
                {SKILL_CATEGORIES.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Proficiency (0-100)"
                name="proficiency"
                value={form.proficiency}
                onChange={onChange}
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Icon (optional)"
                name="icon"
                value={form.icon}
                onChange={onChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Color (hex)"
                name="color"
                value={form.color}
                onChange={onChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Order"
                name="order"
                value={form.order}
                onChange={onChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={form.isVisible} onChange={onToggle} name="isVisible" />}
                label="Visible"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" disabled={saving} onClick={onSave}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SkillsManagePage;
