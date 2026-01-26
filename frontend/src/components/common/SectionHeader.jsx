// src/components/common/SectionHeader.jsx
import { Box, Typography } from '@mui/material';

const SectionHeader = ({ title, subtitle, titleVariant = 'h3', className }) => (
  <Box className={className} sx={{ mb: subtitle ? 3 : 2 }}>
    <Typography variant={titleVariant} sx={{ fontWeight: 800 }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

export default SectionHeader;