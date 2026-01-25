import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import PageSection from '../../components/common/PageSection';
import { saleProjectApi } from '../../api/saleProjectApi';
import { CardGridSkeleton } from '../../components/common/Skeletons'; // 👈 NEW

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
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true); // 👈 NEW

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await saleProjectApi.getAll({ category });
        setItems(res.data?.items || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (p) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.shortDescription || '').toLowerCase().includes(q)
    );
  }, [items, search]);

  return (
    <>
      <Helmet>
        <title>Sale Projects | Portfolio</title>
      </Helmet>

      <PageSection className="py-16 bg-white dark:bg-dark-300">
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Projects for Sale
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
          Ready-made projects with implementation guide. Delivery via WhatsApp or contact.
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
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
              {categories.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {loading ? (
          // 👇 Show skeleton grid while loading
          <CardGridSkeleton count={6} />
        ) : (
          <Grid container spacing={3}>
            {filtered.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p._id}>
                <Card className="card-hover">
                  <CardMedia
                    component="img"
                    height="180"
                    image={p.thumbnail?.url}
                    alt={p.title}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {p.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {p.shortDescription}
                    </Typography>
                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ fontWeight: 800 }}>
                        {p.currency} {p.price}
                      </Typography>
                      <Button component={Link} to={`/sale-projects/${p.slug}`} size="small">
                        View
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {!loading && filtered.length === 0 && (
              <Grid item xs={12}>
                <Typography color="text.secondary">No sale projects found.</Typography>
              </Grid>
            )}
          </Grid>
        )}
      </PageSection>
    </>
  );
};

export default SaleProjectsPage;