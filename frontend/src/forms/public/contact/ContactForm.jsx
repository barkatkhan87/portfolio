import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from '@mui/material';
import { useContactForm } from './useContactForm';
import { CONTACT_EMPTY_FORM } from './contact.constants';

const ContactForm = ({
  onSubmit,
  loading = false,
  initialValues = CONTACT_EMPTY_FORM,
}) => {
  const { values, handleChange, resetForm } = useContactForm(initialValues);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!onSubmit) return;

    try {
      await onSubmit(values);
      // Only reset on successful submit
      resetForm();
    } catch {
      // Do nothing on error; keep values
    }
  };

  return (
    <Card className="card">
      <CardContent>
        <Box component="form" onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                value={values.message}
                onChange={handleChange}
                required
                multiline
                minRows={5}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactForm;