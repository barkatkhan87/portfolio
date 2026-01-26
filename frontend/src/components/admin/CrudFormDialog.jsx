import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const CrudFormDialog = ({
  open,
  title,
  children,
  onClose,
  onSave,
  saving,
  maxWidth = 'md',
  fullWidth = true,
}) => (
  <Dialog open={open} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent dividers>{children}</DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" onClick={onSave} disabled={saving}>
        {saving ? 'Saving...' : 'Save'}
      </Button>
    </DialogActions>
  </Dialog>
);

export default CrudFormDialog;