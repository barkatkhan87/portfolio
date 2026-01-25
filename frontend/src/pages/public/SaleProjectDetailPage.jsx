import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Button,
  Grid,
  Card,
  CardMedia,
} from '@mui/material';
import PageSection from '../../components/common/PageSection';
import { saleProjectApi } from '../../api/saleProjectApi';

const SaleProjectDetailPage = () => {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setNotFound(false);
        const res = await saleProjectApi.getBySlug(slug);
        setItem(res.data);
      } catch {
        setNotFound(true);
      }
    };
    load();
  }, [slug]);

  return (
    <>
      <Helmet>
        <title>
          {item?.title ? `${item.title} | Project for Sale` : 'Project for Sale'}
        </title>
      </Helmet>

      <PageSection className="py-16 bg-white dark:bg-dark-300">
        {notFound ? (
          <Typography color="text.secondary">Sale project not found.</Typography>
        ) : !item ? (
          <Typography color="text.secondary">Loading...</Typography>
        ) : (
          <>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              {item.title}
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {item.currency} {item.price}{' '}
              {item.duration ? `• Duration: ${item.duration}` : null}
            </Typography>

            <Typography sx={{ mt: 2 }}>{item.description}</Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 3, flexWrap: 'wrap' }}>
              {(item.technologies || []).map((t) => (
                <Chip key={t} label={t} />
              ))}
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 3, flexWrap: 'wrap' }}>
              {item.demoUrl && (
                <Button
                  component="a"
                  href={item.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                >
                  Live Demo
                </Button>
              )}
              {item.contactUrl && (
                <Button
                  component="a"
                  href={item.contactUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                >
                  Buy / Contact on WhatsApp
                </Button>
              )}
            </Stack>

            {item.implementationGuide && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                  Implementation Guide
                </Typography>
                <Typography sx={{ whiteSpace: 'pre-line' }}>
                  {item.implementationGuide}
                </Typography>
              </Box>
            )}

            {(item.features?.length || 0) > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                  Features
                </Typography>
                <ul>
                  {item.features.map((f) => (
                    <li key={f}>
                      <Typography>{f}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {(item.includes?.length || 0) > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                  What You Get
                </Typography>
                <ul>
                  {item.includes.map((x) => (
                    <li key={x}>
                      <Typography>{x}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {(item.images?.length || 0) > 0 && (
              <Box sx={{ mt: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                  Screenshots
                </Typography>
                <Grid container spacing={2}>
                  {item.images.map((img) => (
                    <Grid item xs={12} sm={6} md={4} key={img.public_id || img.url}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="200"
                          image={img.url}
                          alt="screenshot"
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

export default SaleProjectDetailPage;