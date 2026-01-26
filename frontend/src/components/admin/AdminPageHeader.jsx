import { Box, Typography } from '@mui/material';

const AdminPageHeader = ({ title, subtitle, actions, ...boxProps }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 3,
    }}
    {...boxProps}
  >
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography color="text.secondary">{subtitle}</Typography>
      )}
    </Box>
    {actions && <Box>{actions}</Box>}
  </Box>
);

export default AdminPageHeader;