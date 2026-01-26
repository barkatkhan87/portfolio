import { Helmet } from 'react-helmet-async';
import { Grid, TextField, MenuItem, Typography } from '@mui/material';

import PageSection from '../../components/common/PageSection';
import SectionHeader from '../../components/common/SectionHeader';
import ProjectCard from '../../components/ui/ProjectCard';

import { CATEGORIES } from '../../utils/constants';
import { useProjectsData } from '../../hooks/public/projects/useProjectsData';

const ProjectsPage = () => {
  const {
    category,
    search,
    filtered,
    handleCategoryChange,
    handleSearchChange,
  } = useProjectsData();

  return (
    <>
      <Helmet>
        <title>Projects | Portfolio</title>
      </Helmet>

      <PageSection className="bg-white py-16 dark:bg-dark-300">
        <SectionHeader title="Projects" subtitle="Browse my work." />

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search"
              value={search}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Category"
              value={category}
              onChange={handleCategoryChange}
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
              <ProjectCard
                title={p.title}
                description={p.description}
                imageUrl={p.thumbnail?.url}
                to={`/projects/${p.slug}`}
              />
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