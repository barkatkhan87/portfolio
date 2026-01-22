import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Typography, Grid, Card, CardContent, LinearProgress } from '@mui/material';
import PageSection from '../../components/common/PageSection';
import { skillApi } from '../../api/skillApi';

const SkillsPage = () => {
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    const load = async () => {
      const res = await skillApi.getAll('all');
      setGrouped(res.data?.grouped || {});
    };
    load();
  }, []);

  const categories = Object.keys(grouped);

  return (
    <>
      <Helmet><title>Skills | Portfolio</title></Helmet>

      <PageSection className="py-16 bg-white dark:bg-dark-300">
        <Typography variant="h3" sx={{ fontWeight: 800 }}>Skills</Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
          Technologies I use frequently.
        </Typography>

        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid item xs={12} md={6} key={cat}>
              <Card className="card">
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                    {cat.toUpperCase()}
                  </Typography>
                  {(grouped[cat] || []).map((s) => (
                    <Box key={s._id} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 600 }}>{s.name}</Typography>
                        <Typography color="text.secondary">{s.proficiency}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={s.proficiency} />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}

          {categories.length === 0 && (
            <Grid item xs={12}>
              <Typography color="text.secondary">No skills yet.</Typography>
            </Grid>
          )}
        </Grid>
      </PageSection>
    </>
  );
};

export default SkillsPage;