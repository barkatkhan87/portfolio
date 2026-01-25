import { Box, Card, CardContent, Grid, Skeleton, Stack } from '@mui/material';

// Skeleton grid for list pages (like Projects / Sale Projects)
export const CardGridSkeleton = ({ count = 6 }) => {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Card className="card">
            <Skeleton variant="rectangular" height={160} />
            <CardContent>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

// Detail page skeleton (can be reused for SaleProjectDetail / ProjectDetail)
export const ProjectDetailSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="text" width="60%" height={48} />
      <Skeleton variant="text" width="40%" height={32} sx={{ mt: 1 }} />
      <Skeleton variant="text" width="90%" sx={{ mt: 2 }} />
      <Skeleton variant="text" width="85%" />
      <Skeleton variant="text" width="80%" />
      <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
        <Skeleton variant="rectangular" width={90} height={32} />
        <Skeleton variant="rectangular" width={90} height={32} />
        <Skeleton variant="rectangular" width={90} height={32} />
      </Stack>
      <Box sx={{ mt: 4 }}>
        <Skeleton variant="text" width="30%" height={32} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="95%" />
        <Skeleton variant="text" width="90%" />
      </Box>
    </Box>
  );
};