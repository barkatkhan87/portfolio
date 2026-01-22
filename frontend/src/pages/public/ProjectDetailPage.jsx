import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Box, Typography, Chip, Stack, Button, Card, CardMedia, Grid } from '@mui/material';
import PageSection from '../../components/common/PageSection';
import { projectApi } from '../../api/projectApi';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await projectApi.getBySlug(slug);
      console.log(res)
      setProject(res.data);
    };
    load();
  }, [slug]);

  return (
    <>
      <Helmet><title>{project?.title ? `${project.title} | Portfolio` : 'Project | Portfolio'}</title></Helmet>

      <PageSection className="py-16 bg-white dark:bg-dark-300">
        {!project ? (
          <Typography color="text.secondary">Loading...</Typography>
        ) : (
          <>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              {project.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              {project.description}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 3, flexWrap: 'wrap' }}>
              {(project.technologies || []).map((t) => (
                <Chip key={t} label={t} />
              ))}
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 3, flexWrap: 'wrap' }}>
              {project.liveUrl && (
                <Button component="a" href={project.liveUrl} target="_blank" rel="noreferrer" variant="contained">
                  Live Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button component="a" href={project.githubUrl} target="_blank" rel="noreferrer" variant="outlined">
                  GitHub
                </Button>
              )}
            </Stack>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                Details
              </Typography>
              <Typography sx={{ whiteSpace: 'pre-line' }}>
                {project.longDescription || 'No additional details.'}
              </Typography>
            </Box>

            {(project.images?.length || 0) > 0 && (
              <Box sx={{ mt: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                  Gallery
                </Typography>
                <Grid container spacing={2}>
                  {project.images.map((img) => (
                    <Grid item xs={12} sm={6} md={4} key={img.public_id || img.url}>
                      <Card>
                        <CardMedia component="img" height="200" image={img.url} alt="Project image" />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </>
        )}
      </PageSection>
    </>
  );
};

export default ProjectDetailPage;