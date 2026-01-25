import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import PageSection from '../../components/common/PageSection';
import { messageApi } from '../../api/messageApi';

const ContactPage = () => {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setValues((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await messageApi.send(values);
      setValues({ name: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | Portfolio</title>
      </Helmet>

      <PageSection className="bg-white py-16 dark:bg-dark-300">
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Contact
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
          Let’s talk about your idea or project.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card className="card">
              <CardContent>
                <Box component="form" onSubmit={onSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={onChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={onChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={values.subject}
                        onChange={onChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        value={values.message}
                        onChange={onChange}
                        required
                        multiline
                        minRows={5}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" size="large" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card className="card">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  Contact Info
                </Typography>
                <Typography color="text.secondary">Use the form or email me directly.</Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 600 }}>Email</Typography>
                  <Typography color="text.secondary">Email : salabcomputer@gmail.com</Typography>
                  <Typography color="text.secondary">WhatsApp : +91 8780039523</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PageSection>
    </>
  );
};

export default ContactPage;
