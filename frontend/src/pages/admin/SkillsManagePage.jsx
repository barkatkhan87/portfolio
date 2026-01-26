import { Helmet } from 'react-helmet-async';
import {
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  Box,
  Typography,
} from '@mui/material';

import { SKILL_CATEGORIES } from '../../utils/constants';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import SkillFormDialog from '../../forms/admin/skill/SkillFormDialog';
import { useSkillsManageData } from '../../hooks/admin/skillsManage/useSkillsManageData';

const SkillsManagePage = () => {
  const {
    filteredSkills,
    filterCategory,
    open,
    editing,
    saving,
    initialFormValues,
    handleOpenCreate,
    handleOpenEdit,
    handleClose,
    handleFilterCategoryChange,
    handleSubmit,
    handleDelete,
    handleToggleVisibility,
  } = useSkillsManageData();

  return (
    <>
      <Helmet>
        <title>Manage Skills | Admin</title>
      </Helmet>

      <AdminPageHeader
        title="Skills"
        subtitle="Create, edit, and organize your skills."
        actions={
          <Button variant="contained" onClick={handleOpenCreate}>
            Add Skill
          </Button>
        }
      />

      <Box sx={{ mb: 3, maxWidth: 300 }}>
        <TextField
          select
          fullWidth
          label="Filter Category"
          value={filterCategory}
          onChange={handleFilterCategoryChange}
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 800 }}>{s.name}</Typography>
                    <Typography color="text.secondary">
                      {s.category}
                    </Typography>
                  </Box>
                  <Chip label={`${s.proficiency}%`} />
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!s.isVisible}
                        onChange={() => handleToggleVisibility(s._id)}
                      />
                    }
                    label={s.isVisible ? 'Visible' : 'Hidden'}
                  />
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button size="small" onClick={() => handleOpenEdit(s)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(s._id)}
                  >
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

      <SkillFormDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        saving={saving}
        initialValues={initialFormValues}
        mode={editing ? 'edit' : 'create'}
      />
    </>
  );
};

export default SkillsManagePage;