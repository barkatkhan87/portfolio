import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';

import AdminPageHeader from '../../components/admin/AdminPageHeader';
import ProjectFormDialog from '../../forms/admin/project/ProjectFormDialog';
import { useProjectsManageData } from '../../hooks/admin/projectsManage/useProjectsManageData';

const ProjectsManagePage = () => {
  const {
    projects,
    open,
    saving,
    editing,
    initialFormValues,
    handleOpenCreate,
    handleOpenEdit,
    handleClose,
    handleDelete,
    handleSubmit,
  } = useProjectsManageData();

  return (
    <>
      <Helmet>
        <title>Manage Projects | Admin</title>
      </Helmet>

      <AdminPageHeader
        title="Projects"
        actions={
          <Button variant="contained" onClick={handleOpenCreate}>
            Add Project
          </Button>
        }
      />

      <Grid container spacing={2}>
        {projects.map((p) => (
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
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {p.description}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button size="small" onClick={() => handleOpenEdit(p)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ProjectFormDialog
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

export default ProjectsManagePage;