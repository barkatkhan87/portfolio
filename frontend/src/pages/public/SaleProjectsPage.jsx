import { Helmet } from 'react-helmet-async';
import { Grid, TextField, MenuItem, Typography } from '@mui/material';

import PageSection from '../../components/common/PageSection';
import { CardGridSkeleton } from '../../components/common/Skeletons';
import SectionHeader from '../../components/common/SectionHeader';
import ProjectCard from '../../components/ui/ProjectCard';

import { useSaleProjectsData } from '../../hooks/public/saleProjects/useSaleProjectsData';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'react', label: 'React JS' },
  { value: 'angular', label: 'Angular' },
  { value: 'java', label: 'Java' },
  { value: 'dotnet', label: '.NET' },
  { value: 'csharp', label: 'C#' },
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'other', label: 'Other' },
];

const SaleProjectsPage = () => {
  const {
    category,
    search,
    loading,
    filtered,
    handleCategoryChange,
    handleSearchChange,
  } = useSaleProjectsData();

  return (
    <>
      <Helmet>
        <title>Sale Projects | Portfolio</title>
      </Helmet>

      <PageSection className="py-16 bg-white dark:bg-dark-300">
        <SectionHeader
          title="Projects for Sale"
          subtitle="Ready-made projects with implementation guide. Delivery via WhatsApp or contact."
        />

        <Grid container spacing={2} sx={{ mb: 3 }}>
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
              {categories.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {loading ? (
          <CardGridSkeleton count={6} />
        ) : (
          <Grid container spacing={3}>
            {filtered.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p._id}>
                <ProjectCard
                  title={p.title}
                  description={p.shortDescription}
                  imageUrl={p.thumbnail?.url}
                  to={`/sale-projects/${p.slug}`}
                  buttonLabel="View"
                  bottomRight={`${p.currency} ${p.price}`}
                />
              </Grid>
            ))}

            {!loading && filtered.length === 0 && (
              <Grid item xs={12}>
                <Typography color="text.secondary">
                  No sale projects found.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </PageSection>
    </>
  );
};

export default SaleProjectsPage;