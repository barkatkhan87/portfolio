import { Helmet } from 'react-helmet-async';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

import PageSection from '../../components/common/PageSection';
import SectionHeader from '../../components/common/SectionHeader';
import ChipList from '../../components/common/ChipList';

import { useAboutData } from '../../hooks/public/about/useAboutData';

const AboutPage = () => {
  const { about, loading } = useAboutData();

  return (
    <>
      <Helmet>
        <title>About | Portfolio</title>
      </Helmet>

      {/* ABOUT + QUICK INFO */}
      <PageSection className="bg-white py-16 dark:bg-dark-300">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <SectionHeader title="About Me" />

            <Typography
              color="text.secondary"
              sx={{ mt: 2, whiteSpace: 'pre-line' }}
            >
              {loading ? 'Loading...' : about?.bio || 'No bio available.'}
            </Typography>

            {/* SEO Keywords as ChipList */}
            <ChipList
              items={about?.seoKeywords || []}
              variant="outlined"
              sx={{ mt: 3 }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="card">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Quick Info
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography color="text.secondary">Name</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {about?.name || '-'}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography color="text.secondary">Email</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {about?.email || '-'}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography color="text.secondary">Location</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {about?.location || '-'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PageSection>

      {/* EXPERIENCE + EDUCATION */}
      <PageSection className="bg-gray-50 py-16 dark:bg-dark-200">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SectionHeader title="Experience" titleVariant="h5" />

            {(about?.experience || []).map((e) => (
              <Card key={e._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography sx={{ fontWeight: 700 }}>
                    {e.position} — {e.company}
                  </Typography>
                  <Typography color="text.secondary">
                    {e.duration}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>{e.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={6}>
            <SectionHeader title="Education" titleVariant="h5" />

            {(about?.education || []).map((ed) => (
              <Card key={ed._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography sx={{ fontWeight: 700 }}>
                    {ed.degree} — {ed.institution}
                  </Typography>
                  <Typography color="text.secondary">
                    {ed.duration}
                  </Typography>
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