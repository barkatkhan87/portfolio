import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Grid,
} from '@mui/material';

import PageSection from '../../components/common/PageSection';
import ChipList from '../../components/common/ChipList';
import { useProjectDetailData } from '../../hooks/public/projectDetail/useProjectDetailData';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { project, loading } = useProjectDetailData(slug);

  const title = project?.title
    ? `${project.title} | Portfolio`
    : 'Project | Portfolio';

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageSection className="bg-white py-16 dark:bg-dark-300">
        {loading ? (
          <Typography color="text.secondary">Loading...</Typography>
        ) : !project ? (
          <Typography color="text.secondary">
            Project not found.
          </Typography>
        ) : (
          <>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              {project.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              {project.description}
            </Typography>

            {/* Technologies as ChipList */}
            <ChipList items={project.technologies || []} sx={{ mt: 3 }} />

            <Box
              sx={{
                mt: 3,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {project.liveUrl && (
                <Button
                  component="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                >
                  Live Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  component="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                >
                  GitHub
                </Button>
              )}
            </Box>

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
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={img.public_id || img.url}
                    >
                      <Card>
                        <CardMedia
                          component="img"
                          height="200"
                          image={img.url}
                          alt="Project image"
                        />
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