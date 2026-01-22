import { Box, Container } from '@mui/material';

const PageSection = ({ children, maxWidth = 'lg', className = '' }) => {
  return (
    <Box className={`w-full ${className}`}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
};

export default PageSection;