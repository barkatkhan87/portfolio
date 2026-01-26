import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

import PageSection from '../../components/common/PageSection';
import SectionHeader from '../../components/common/SectionHeader';
import ProjectCard from '../../components/ui/ProjectCard';

import { useHomeData } from '../../hooks/public/home/useHomeData';
import { useAOSInit } from '../../hooks/shared/useAOSInit';

const HomePage = () => {
  // Shared animation hook
  useAOSInit();

  // Page-specific data hook
  const { about, featured, loading } = useHomeData();

  return (
    <>
      <Helmet>
        <title>Home | Portfolio</title>
      </Helmet>

      {/* HERO */}
      <PageSection className="flex min-h-[85vh] items-center justify-center bg-white dark:bg-dark-300">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography
              data-aos="fade-right"
              variant="h2"
              sx={{ fontWeight: 800, lineHeight: 1.1 }}
              className="font-heading"
            >
              {about?.title || 'Full Stack Developer'}
              <br />
              <span className="gradient-text">
                {about?.subtitle || 'MERN Stack Specialist'}
              </span>
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 640 }}
            >
              {about?.shortBio ||
                'Building modern web applications with MERN stack. Clean UI, solid backend, scalable architecture.'}
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 4, flexWrap: 'wrap' }}
            >
              <Button
                data-aos="fade-up"
                component={Link}
                to="/projects"
                variant="contained"
                size="large"
              >
                View Projects
              </Button>
              <Button
                data-aos="fade-up"
                component={Link}
                to="/contact"
                variant="outlined"
                size="large"
              >
                Contact Me
              </Button>
            </Stack>

            {(about?.socialLinks?.github || about?.socialLinks?.linkedin) && (
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 3, flexWrap: 'wrap' }}
              >
                {about?.socialLinks?.github && (
                  <Tooltip title="GitHub Profile" arrow>
                    <Chip
                      clickable
                      component="a"
                      href="https://github.com/barkatkhan87"
                      target="_blank"
                      rel="noopener noreferrer"
                      label="GitHub"
                    />
                  </Tooltip>
                )}
                {about?.socialLinks?.linkedin && (
                  <Tooltip title="LinkedIn Profile" arrow>
                    <Chip
                      clickable
                      component="a"
                      href="https://www.linkedin.com/in/barkat-khan-187790318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                      target="_blank"
                      rel="noopener noreferrer"
                      label="LinkedIn"
                    />
                  </Tooltip>
                )}
              </Stack>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            {/* simple hero visual */}
            <Box className="flex w-full justify-center md:justify-end">
              <Box className="gradient-bg flex h-[320px] w-[320px] items-center justify-center rounded-2xl shadow-2xl">
                <Spline scene="https://prod.spline.design/9-Ahp9wVmpoaofsI/scene.splinecode" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </PageSection>

      {/* FEATURED */}
      <PageSection className="bg-gray-50 py-16 dark:bg-dark-200">
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            title="Featured Projects"
            subtitle="A few projects I’m proud of."
            titleVariant="h4"
          />
        </Box>

        {loading ? (
          <Typography color="text.secondary">Loading...</Typography>
        ) : featured.length === 0 ? (
          <Typography color="text.secondary">
            No featured projects yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {featured.map((p) => (
              <Grid
                data-aos="fade-up"
                item
                xs={12}
                sm={6}
                md={4}
                key={p._id}
              >
                <ProjectCard
                  title={p.title}
                  description={p.description}
                  imageUrl={p.thumbnail?.url}
                  to={`/projects/${p.slug}`}
                  buttonLabel="Read More"
                />
              </Grid>
            ))}
          </Grid>
        )}
      </PageSection>
    </>
  );
};

export default HomePage;