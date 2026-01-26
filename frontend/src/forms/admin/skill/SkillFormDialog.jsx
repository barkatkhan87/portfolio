import { Grid, TextField, MenuItem, Switch, FormControlLabel } from '@mui/material';

import CrudFormDialog from '../../../components/admin/CrudFormDialog';
import { SKILL_CATEGORIES } from '../../../utils/constants';
import { useSkillForm } from './useSkillForm';

const SkillFormDialog = ({
  open,
  onClose,
  onSubmit,
  saving,
  initialValues,
  mode = 'create', // 'create' | 'edit'
}) => {
  const { values, handleChange, handleToggle } = useSkillForm(initialValues);

  const dialogTitle = mode === 'edit' ? 'Edit Skill' : 'Add Skill';

  const handleSave = () => {
    if (onSubmit) onSubmit(values);
  };

  return (
    <CrudFormDialog
      open={open}
      onClose={onClose}
      onSave={handleSave}
      saving={saving}
      title={dialogTitle}
      maxWidth="sm"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Skill Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Category"
            name="category"
            value={values.category}
            onChange={handleChange}
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
            value={values.proficiency}
            onChange={handleChange}
            inputProps={{ min: 0, max: 100 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Icon (optional)"
            name="icon"
            value={values.icon}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Color (hex)"
            name="color"
            value={values.color}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Order"
            name="order"
            value={values.order}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
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
        </Grid>
      </Grid>
    </CrudFormDialog>
  );
};

export default SkillFormDialog;