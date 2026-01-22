import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, TextField, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import PageSection from '../../components/common/PageSection';
import { projectApi } from '../../api/projectApi';
import { CATEGORIES } from '../../utils/constants';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await projectApi.getAll({ category });
      setProjects(res.data?.projects || []);
    };
    load();
  }, [category]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) =>
      (p.title || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  }, [projects, search]);

  return (
    <>
      <Helmet><title>Projects | Portfolio</title></Helmet>

      <PageSection className="py-16 bg-white dark:bg-dark-300">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>Projects</Typography>
          <Typography color="text.secondary">Browse my work.</Typography>
        </Box>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {filtered.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <Card className="card-hover">
                <CardMedia component="img" height="180" image={p.thumbnail?.url} alt={p.title} />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {p.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {p.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button component={Link} to={`/projects/${p.slug}`} size="small">
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {filtered.length === 0 && (
            <Grid item xs={12}>
              <Typography color="text.secondary">No projects found.</Typography>
            </Grid>
          )}
        </Grid>
      </PageSection>
    </>
  );
};

export default ProjectsPage;