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
import SaleProjectFormDialog from '../../forms/admin/saleProject/SaleProjectFormDialog';
import { useSaleProjectsManageData } from '../../hooks/admin/saleProjectsManage/useSaleProjectsManageData';

const SaleProjectsManagePage = () => {
  const {
    items,
    open,
    editing,
    saving,
    initialFormValues,
    handleOpenCreate,
    handleOpenEdit,
    handleClose,
    handleDelete,
    handleSubmit,
  } = useSaleProjectsManageData();

  return (
    <>
      <Helmet>
        <title>Manage Sale Projects | Admin</title>
      </Helmet>

      <AdminPageHeader
        title="Sale Projects"
        actions={
          <Button variant="contained" onClick={handleOpenCreate}>
            Add Sale Project
          </Button>
        }
      />

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

        {items.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              No sale projects yet.
            </Typography>
          </Grid>
        )}
      </Grid>

      <SaleProjectFormDialog
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

export default SaleProjectsManagePage;