import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { projectApi } from '../../api/projectApi';
import { CATEGORIES } from '../../utils/constants';

const emptyForm = {
  title: '',
  description: '',
  longDescription: '',
  category: 'web',
  technologies: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
  status: 'completed',
  thumbnail: null,
  images: [],
};

const ProjectsManagePage = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await projectApi.getAdminProjects();
    setProjects(res.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const onOpenCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const onOpenEdit = (p) => {
    setEditing(p);
    setForm({
      ...emptyForm,
      title: p.title || '',
      description: p.description || '',
      longDescription: p.longDescription || '',
      category: p.category || 'web',
      technologies: (p.technologies || []).join(', '),
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      featured: !!p.featured,
      status: p.status || 'completed',
      thumbnail: null,
      images: [],
    });
    setOpen(true);
  };

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onToggle = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.checked }));

  const onFile = (e) => {
    const { name, files } = e.target;
    if (name === 'thumbnail') {
      setForm((p) => ({ ...p, thumbnail: files?.[0] || null }));
    } else if (name === 'images') {
      setForm((p) => ({ ...p, images: files ? Array.from(files) : [] }));
    }
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('longDescription', form.longDescription);
    fd.append('category', form.category);
    fd.append('technologies', form.technologies);
    fd.append('liveUrl', form.liveUrl);
    fd.append('githubUrl', form.githubUrl);
    fd.append('featured', String(form.featured));
    fd.append('status', form.status);

    if (form.thumbnail) fd.append('thumbnail', form.thumbnail);
    if (form.images?.length) form.images.forEach((f) => fd.append('images', f));
    return fd;
  };

  const onSave = async () => {
    setSaving(true);
    try {
      const fd = buildFormData();
      if (editing?._id) {
        await projectApi.update(editing._id, fd);
      } else {
        await projectApi.create(fd);
      }
      setOpen(false);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    await projectApi.delete(id);
    await load();
  };

  return (
    <>
      <Helmet>
        <title>Manage Projects | Admin</title>
      </Helmet>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Projects
        </Typography>
        <Button variant="contained" onClick={onOpenCreate}>
          Add Project
        </Button>
      </Box>

      <Grid container spacing={2}>
        {projects.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id}>
            <Card>
              <CardMedia component="img" height="160" image={p.thumbnail?.url} alt={p.title} />
              <CardContent>
                <Typography sx={{ fontWeight: 700 }}>{p.title}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {p.description}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button size="small" onClick={() => onOpenEdit(p)}>
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={() => onDelete(p._id)}>
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>{editing ? 'Edit Project' : 'Add Project'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={form.title}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={form.category}
                onChange={onChange}
              >
                {CATEGORIES.filter((c) => c.value !== 'all').map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={form.description}
                onChange={onChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Long Description"
                name="longDescription"
                value={form.longDescription}
                onChange={onChange}
                multiline
                minRows={4}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Technologies (comma separated)"
                name="technologies"
                value={form.technologies}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={form.status}
                onChange={onChange}
              >
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="planned">Planned</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Live URL"
                name="liveUrl"
                value={form.liveUrl}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="GitHub URL"
                name="githubUrl"
                value={form.githubUrl}
                onChange={onChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch checked={form.featured} onChange={onToggle} name="featured" />}
                label="Featured"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Thumbnail
                <input hidden type="file" accept="image/*" name="thumbnail" onChange={onFile} />
              </Button>
              <Typography variant="caption" color="text.secondary">
                {form.thumbnail?.name || 'No new thumbnail selected'}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Images
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  name="images"
                  multiple
                  onChange={onFile}
                />
              </Button>
              <Typography variant="caption" color="text.secondary">
                {form.images?.length
                  ? `${form.images.length} file(s) selected`
                  : 'No images selected'}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={onSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectsManagePage;
