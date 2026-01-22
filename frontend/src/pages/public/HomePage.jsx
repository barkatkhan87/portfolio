import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Tooltip
} from "@mui/material";
import { Link } from "react-router-dom";
import PageSection from "../../components/common/PageSection";
import { aboutApi } from "../../api/aboutApi";
import { projectApi } from "../../api/projectApi";
import Spline from "@splinetool/react-spline"
import AOS from 'aos';
import 'aos/dist/aos.css';


const HomePage = () => {
  const [about, setAbout] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // transitions
    useEffect(()=>{
      AOS.init({
        duration: 1000,
        once: true,
      })
    })

  useEffect(() => {
    const load = async () => {
      try {
        const [aboutRes, featuredRes] = await Promise.all([
          aboutApi.get(),
          projectApi.getFeatured(),
        ]);
        setAbout(aboutRes.data);
        setFeatured(featuredRes.data || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Portfolio</title>
      </Helmet>

      {/* HERO */}
      <PageSection className="min-h-[85vh] flex items-center justify-center bg-white dark:bg-dark-300">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography
              data-aos="fade-right"
              variant="h2"
              sx={{ fontWeight: 800, lineHeight: 1.1 }}
              className="font-heading"
            >
              {about?.title || "Full Stack Developer"}
              <br />
              <span className="gradient-text">
                {about?.subtitle || "MERN Stack Specialist"}
              </span>
            </Typography>

            <Typography 
              variant="h6"
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 640 }}
            >
              {about?.shortBio ||
                "Building modern web applications with MERN stack. Clean UI, solid backend, scalable architecture."}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 4, flexWrap: "wrap" }}>
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
                sx={{ mt: 3, flexWrap: "wrap" }}
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
            <Box className="w-full flex justify-center md:justify-end">
              <Box className="w-[320px] h-[320px] rounded-2xl gradient-bg shadow-2xl flex items-center justify-center">
                <Spline scene="https://prod.spline.design/9-Ahp9wVmpoaofsI/scene.splinecode" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </PageSection>

      {/* FEATURED */}
      <PageSection className="py-16 bg-gray-50 dark:bg-dark-200">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Featured Projects
          </Typography>
          <Typography color="text.secondary">
            A few projects I’m proud of.
          </Typography>
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
              <Grid data-aos="fade-up" item xs={12} sm={6} md={4} key={p._id}>
                <Card className="card-hover">
                  <CardMedia
                    component="img"
                    height="180"
                    image={p.thumbnail?.url}
                    alt={p.title}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {p.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {p.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        component={Link}
                        to={`/projects/${p.slug}`}
                        size="small"
                      >
                        Read More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </PageSection>
    </>
  );
};

export default HomePage;
