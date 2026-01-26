import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

import PageSection from '../../components/common/PageSection';
import SectionHeader from '../../components/common/SectionHeader';
import ContactForm from '../../forms/public/contact/ContactForm';
import { useContactPage } from '../../hooks/public/contact/useContactPage';

const ContactPage = () => {
  const { loading, handleSubmit } = useContactPage();

  return (
    <>
      <Helmet>
        <title>Contact | Portfolio</title>
      </Helmet>

      <PageSection className="bg-white py-16 dark:bg-dark-300">
        <SectionHeader
          title="Contact"
          subtitle="Let’s talk about your idea or project."
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <ContactForm onSubmit={handleSubmit} loading={loading} />
          </Grid>

          <Grid item xs={12} md={5}>
            <Card className="card">
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, mb: 1 }}
                >
                  Contact Info
                </Typography>
                <Typography color="text.secondary">
                  Use the form or email me directly.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 600 }}>Email</Typography>
                  <Typography color="text.secondary">
                    Email : salabcomputer@gmail.com
                  </Typography>
                  <Typography color="text.secondary">
                    WhatsApp : +91 8780039523
                  </Typography>
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