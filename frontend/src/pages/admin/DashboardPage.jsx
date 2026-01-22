import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { dashboardApi } from '../../api/dashboardApi';

const StatCard = ({ title, value }) => (
  <Card className="card">
    <CardContent>
      <Typography color="text.secondary">{title}</Typography>
      <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await dashboardApi.getStats();
      setStats(res.data);
    };
    load();
  }, []);

  return (
    <>
      <Helmet><title>Dashboard | Admin</title></Helmet>

      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Projects" value={stats?.overview?.totalProjects ?? '-'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Featured Projects" value={stats?.overview?.featuredProjects ?? '-'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Skills" value={stats?.overview?.totalSkills ?? '-'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Unread Messages" value={stats?.overview?.unreadMessages ?? '-'} />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;