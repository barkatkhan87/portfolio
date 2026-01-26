import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';

import PageSection from '../../components/common/PageSection';
import SectionHeader from '../../components/common/SectionHeader';
import { useSkillsData } from '../../hooks/public/skills/useSkillsData';

const SkillsPage = () => {
  const { grouped, categories, loading } = useSkillsData();

  return (
    <>
      <Helmet>
        <title>Skills | Portfolio</title>
      </Helmet>

      <PageSection className="bg-white py-16 dark:bg-dark-300">
        <SectionHeader
          title="Skills"
          subtitle="Technologies I use frequently."
        />

        {loading && categories.length === 0 ? (
          <Typography color="text.secondary">Loading...</Typography>
        ) : (
          <Grid container spacing={3}>
            {categories.map((cat) => (
              <Grid item xs={12} md={6} key={cat}>
                <Card className="card">
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 800, mb: 2 }}
                    >
                      {cat.toUpperCase()}
                    </Typography>

                    {(grouped[cat] || []).map((s) => (
                      <Box key={s._id} sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography sx={{ fontWeight: 600 }}>
                            {s.name}
                          </Typography>
                          <Typography color="text.secondary">
                            {s.proficiency}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={s.proficiency}
                        />
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {!loading && categories.length === 0 && (
              <Grid item xs={12}>
                <Typography color="text.secondary">
                  No skills yet.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </PageSection>
    </>
  );
};

export default SkillsPage;