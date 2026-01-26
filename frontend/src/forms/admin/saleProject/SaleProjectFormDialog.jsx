import {
  Grid,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';

import CrudFormDialog from '../../components/admin/CrudFormDialog';
import FileUploadField from '../../components/ui/FileUploadField';
import {
  SALE_PROJECT_CATEGORY_OPTIONS,
  SALE_PROJECT_CURRENCY_OPTIONS,
} from './saleProject.constants';
import { useSaleProjectForm } from './useSaleProjectForm';

const SaleProjectFormDialog = ({
  open,
  onClose,
  onSubmit,
  saving,
  initialValues,
  mode = 'create', // 'create' | 'edit'
}) => {
  const {
    values,
    handleChange,
    handleToggle,
    handleThumbnailSelect,
    handleImagesSelect,
  } = useSaleProjectForm(initialValues);

  const dialogTitle = mode === 'edit' ? 'Edit Sale Project' : 'Add Sale Project';

  const handleSave = () => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <CrudFormDialog
      open={open}
      onClose={onClose}
      onSave={handleSave}
      saving={saving}
      title={dialogTitle}
    >
      <Grid container spacing={2}>
        {/* Left column */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Short Description"
            name="shortDescription"
            value={values.shortDescription}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Full Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Implementation Guide"
            name="implementationGuide"
            value={values.implementationGuide}
            onChange={handleChange}
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
            value={values.price}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            fullWidth
            label="Currency"
            name="currency"
            value={values.currency}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            {SALE_PROJECT_CURRENCY_OPTIONS.map((c) => (
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
            value={values.category}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            {SALE_PROJECT_CATEGORY_OPTIONS.map((c) => (
              <MenuItem key={c.value} value={c.value}>
                {c.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Duration (e.g., 3 Days)"
            name="duration"
            value={values.duration}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Order"
            type="number"
            name="order"
            value={values.order}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={values.isVisible}
                onChange={handleToggle}
                name="isVisible"
              />
            }
            label="Visible"
          />
          <FormControlLabel
            control={
              <Switch
                checked={values.isFeatured}
                onChange={handleToggle}
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
            value={values.technologies}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Demo URL"
            name="demoUrl"
            value={values.demoUrl}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="GitHub URL"
            name="githubUrl"
            value={values.githubUrl}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Contact / WhatsApp URL"
            name="contactUrl"
            value={values.contactUrl}
            onChange={handleChange}
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
            value={values.features}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Includes (one per line)"
            name="includes"
            value={values.includes}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <FileUploadField
            label="Upload Thumbnail"
            accept="image/*"
            onFilesSelected={handleThumbnailSelect}
            helperText={values.thumbnail?.name || 'No new thumbnail selected'}
            sx={{ mt: 1 }}
          />

          <FileUploadField
            label="Upload Images"
            accept="image/*"
            multiple
            onFilesSelected={handleImagesSelect}
            helperText={
              values.images?.length
                ? `${values.images.length} file(s) selected`
                : 'No images selected'
            }
            sx={{ mt: 2 }}
          />
        </Grid>
      </Grid>
    </CrudFormDialog>
  );
};

export default SaleProjectFormDialog;