import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import PageSection from '../../components/common/PageSection';
import { aboutApi } from '../../api/aboutApi';

const AboutPage = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await aboutApi.get();
      setAbout(res.data);
    };
    load();
  }, []);

  return (
    <>
      <Helmet>
        <title>About | Portfolio</title>
      </Helmet>

      <PageSection className="bg-white py-16 dark:bg-dark-300">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              About Me
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
              {about?.bio || 'Loading...'}
            </Typography>

            {about?.seoKeywords?.length ? (
              <Stack direction="row" spacing={1} sx={{ mt: 3, flexWrap: 'wrap' }}>
                {about.seoKeywords.map((k) => (
                  <Chip key={k} label={k} variant="outlined" />
                ))}
              </Stack>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="card">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Quick Info
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography color="text.secondary">Name</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{about?.name || '-'}</Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography color="text.secondary">Email</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{about?.email || '-'}</Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography color="text.secondary">Location</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{about?.location || '-'}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PageSection>

      <PageSection className="bg-gray-50 py-16 dark:bg-dark-200">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
              Experience
            </Typography>
            {(about?.experience || []).map((e) => (
              <Card key={e._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography sx={{ fontWeight: 700 }}>
                    {e.position} — {e.company}
                  </Typography>
                  <Typography color="text.secondary">{e.duration}</Typography>
                  <Typography sx={{ mt: 1 }}>{e.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
              Education
            </Typography>
            {(about?.education || []).map((ed) => (
              <Card key={ed._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography sx={{ fontWeight: 700 }}>
                    {ed.degree} — {ed.institution}
                  </Typography>
                  <Typography color="text.secondary">{ed.duration}</Typography>
                  <Typography sx={{ mt: 1 }}>{ed.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </PageSection>
    </>
  );
};

export default AboutPage;
