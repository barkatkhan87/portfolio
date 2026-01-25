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
import { saleProjectApi } from '../../api/saleProjectApi';

const CATEGORY_OPTIONS = [
  { value: 'react', label: 'React JS' },
  { value: 'angular', label: 'Angular' },
  { value: 'java', label: 'Java' },
  { value: 'dotnet', label: '.NET' },
  { value: 'csharp', label: 'C#' },
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'other', label: 'Other' },
];

const CURRENCY_OPTIONS = [
  { value: 'INR', label: 'INR' },
  { value: 'USD', label: 'USD' },
];

const emptyForm = {
  title: '',
  shortDescription: '',
  description: '',
  price: 0,
  currency: 'INR',
  category: 'react',
  technologies: '',
  duration: '',
  implementationGuide: '',
  features: '',
  includes: '',
  demoUrl: '',
  githubUrl: '',
  contactUrl: '',
  isVisible: true,
  isFeatured: false,
  order: 0,
  thumbnail: null,
  images: [],
};

const SaleProjectsManagePage = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await saleProjectApi.getAdminAll();
    setItems(res.data || []);
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
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      price: p.price ?? 0,
      currency: p.currency || 'INR',
      category: p.category || 'react',
      technologies: (p.technologies || []).join(', '),
      duration: p.duration || '',
      implementationGuide: p.implementationGuide || '',
      features: (p.features || []).join('\n'),
      includes: (p.includes || []).join('\n'),
      demoUrl: p.demoUrl || '',
      githubUrl: p.githubUrl || '',
      contactUrl: p.contactUrl || '',
      isVisible: p.isVisible ?? true,
      isFeatured: p.isFeatured ?? false,
      order: p.order ?? 0,
      thumbnail: null,
      images: [],
    });
    setOpen(true);
  };

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onToggle = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.checked }));

  const onFile = (e) => {
    const { name, files } = e.target;
    if (name === 'thumbnail') {
      setForm((prev) => ({ ...prev, thumbnail: files?.[0] || null }));
    } else if (name === 'images') {
      setForm((prev) => ({ ...prev, images: files ? Array.from(files) : [] }));
    }
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('shortDescription', form.shortDescription);
    fd.append('description', form.description);
    fd.append('price', String(form.price));
    fd.append('currency', form.currency);
    fd.append('category', form.category);
    fd.append('technologies', form.technologies);
    fd.append('duration', form.duration);
    fd.append('implementationGuide', form.implementationGuide);
    fd.append('features', form.features);
    fd.append('includes', form.includes);
    fd.append('demoUrl', form.demoUrl);
    fd.append('githubUrl', form.githubUrl);
    fd.append('contactUrl', form.contactUrl);
    fd.append('isVisible', String(form.isVisible));
    fd.append('isFeatured', String(form.isFeatured));
    fd.append('order', String(form.order));

    if (form.thumbnail) fd.append('thumbnail', form.thumbnail);
    if (form.images?.length) {
      form.images.forEach((f) => fd.append('images', f));
    }

    return fd;
  };

  const onSave = async () => {
    setSaving(true);
    try {
      const fd = buildFormData();
      if (editing?._id) {
        await saleProjectApi.update(editing._id, fd);
      } else {
        await saleProjectApi.create(fd);
      }
      setOpen(false);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this sale project?')) return;
    await saleProjectApi.delete(id);
    await load();
  };

  return (
    <>
      <Helmet>
        <title>Manage Sale Projects | Admin</title>
      </Helmet>

      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Sale Projects
        </Typography>
        <Button variant="contained" onClick={onOpenCreate}>
          Add Sale Project
        </Button>
      </Box>

      {/* Cards grid – same style as ProjectsManagePage */}
      <Grid container spacing={2}>
        {items.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id}>
            <Card>
              <CardMedia
                component="img"
                height="160"
                image={p.thumbnail?.url}
                alt={p.title}
              />
              <CardContent>
                <Typography sx={{ fontWeight: 700 }}>{p.title}</Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  {p.currency} {p.price}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {p.shortDescription}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button size="small" onClick={() => onOpenEdit(p)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => onDelete(p._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {items.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              No sale projects yet.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Dialog for Add/Edit */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editing ? 'Edit Sale Project' : 'Add Sale Project'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Left column */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={form.title}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Short Description"
                name="shortDescription"
                value={form.shortDescription}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Full Description"
                name="description"
                value={form.description}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Implementation Guide"
                name="implementationGuide"
                value={form.implementationGuide}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
            </Grid>

            {/* Right column */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={form.price}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
              <TextField
                select
                fullWidth
                label="Currency"
                name="currency"
                value={form.currency}
                onChange={onChange}
                sx={{ mb: 2 }}
              >
                {CURRENCY_OPTIONS.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={form.category}
                onChange={onChange}
                sx={{ mb: 2 }}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Duration (e.g., 3 Days)"
                name="duration"
                value={form.duration}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Order"
                type="number"
                name="order"
                value={form.order}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={form.isVisible}
                    onChange={onToggle}
                    name="isVisible"
                  />
                }
                label="Visible"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={form.isFeatured}
                    onChange={onToggle}
                    name="isFeatured"
                  />
                }
                label="Featured"
              />
            </Grid>

            {/* Bottom row */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Technologies (comma separated)"
                name="technologies"
                value={form.technologies}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Demo URL"
                name="demoUrl"
                value={form.demoUrl}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="GitHub URL"
                name="githubUrl"
                value={form.githubUrl}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Contact / WhatsApp URL"
                name="contactUrl"
                value={form.contactUrl}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Features (one per line)"
                name="features"
                value={form.features}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Includes (one per line)"
                name="includes"
                value={form.includes}
                onChange={onChange}
                sx={{ mb: 2 }}
              />

              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 1 }}
              >
                Upload Thumbnail
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  name="thumbnail"
                  onChange={onFile}
                />
              </Button>
              <Typography variant="caption" color="text.secondary">
                {form.thumbnail?.name || 'No new thumbnail selected'}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                >
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
              </Box>
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

export default SaleProjectsManagePage;