import {
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material';

import CrudFormDialog from '../../../components/admin/CrudFormDialog';
import FileUploadField from '../../../components/ui/FileUploadField';
import { CATEGORIES } from '../../../utils/constants';
import { useProjectForm } from './useProjectForm';

const ProjectFormDialog = ({
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
  } = useProjectForm(initialValues);

  const dialogTitle = mode === 'edit' ? 'Edit Project' : 'Add Project';

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
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Category"
            name="category"
            value={values.category}
            onChange={handleChange}
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
            value={values.description}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Long Description"
            name="longDescription"
            value={values.longDescription}
            onChange={handleChange}
            multiline
            minRows={4}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Technologies (comma separated)"
            name="technologies"
            value={values.technologies}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={values.status}
            onChange={handleChange}
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
            value={values.liveUrl}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="GitHub URL"
            name="githubUrl"
            value={values.githubUrl}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={values.featured}
                onChange={handleToggle}
                name="featured"
              />
            }
            label="Featured"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FileUploadField
            label="Upload Thumbnail"
            accept="image/*"
            onFilesSelected={handleThumbnailSelect}
            helperText={
              values.thumbnail?.name || 'No new thumbnail selected'
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
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
          />
        </Grid>
      </Grid>
    </CrudFormDialog>
  );
};

export default ProjectFormDialog;