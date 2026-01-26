import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useAboutForm } from './useAboutForm';

const AboutProfileForm = ({ initialValues, saving, onSubmit }) => {
  const { values, handleChange } = useAboutForm(initialValues);

  const handleSave = () => {
    if (onSubmit) onSubmit(values);
  };

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Profile Content
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Subtitle"
              name="subtitle"
              value={values.subtitle}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Short Bio (Hero)"
              name="shortBio"
              value={values.shortBio}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={6}
              label="Bio"
              name="bio"
              value={values.bio}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={values.location}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Social Links
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="GitHub URL"
              name="github"
              value={values.github}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="LinkedIn URL"
              name="linkedin"
              value={values.linkedin}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Twitter URL"
              name="twitter"
              value={values.twitter}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Website URL"
              name="website"
              value={values.website}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Stats + SEO
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Years Experience"
              name="yearsOfExperience"
              value={values.yearsOfExperience}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Projects Completed"
              name="projectsCompleted"
              value={values.projectsCompleted}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Happy Clients"
              name="happyClients"
              value={values.happyClients}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="SEO Title"
              name="seoTitle"
              value={values.seoTitle}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="SEO Description"
              name="seoDescription"
              value={values.seoDescription}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="SEO Keywords (comma separated)"
              name="seoKeywords"
              value={values.seoKeywords}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" disabled={saving} onClick={handleSave}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AboutProfileForm;