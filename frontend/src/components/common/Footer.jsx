import { Link } from 'react-router-dom'
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Box,
  Divider,
  Tooltip,
} from '@mui/material'
import { GitHub, LinkedIn, X, Email } from '@mui/icons-material'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', icon: GitHub, url: 'https://github.com/barkatkhan87' },
    { name: 'LinkedIn', icon: LinkedIn, url: 'https://www.linkedin.com/in/barkat-khan-187790318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'X', icon: X, url: 'https://x.com/barkatkhan_' },
    { name: 'Email', icon: Email, url: 'mailto:salabcomputer@gmail.com?subject=Hello%20Barkat&body=I%20saw%20your%20portfolio' },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-dark-200 mt-auto">
      <Container maxWidth="xl">
        <Box py={6}>
          <Grid container spacing={4}>
            {/* Left Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" className="font-heading font-bold gradient-text mb-4">
                Portfolio
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Building digital experiences with modern web technologies.
              </Typography>

              {/* Social Icons */}
              <Box mt={2}>
                {socialLinks.map(({ name, icon: Icon, url }, i) => (
                  <Tooltip key={i} title={name} arrow>
                    <IconButton
                      size="small"
                      component="a"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ mr: 1, '&:hover': { color: 'primary.main' } }}
                    >
                      <Icon />
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>
            </Grid>

            {/* Right Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Quick Links
              </Typography>
              {['/', '/about', '/projects', '/contact'].map((path) => (
                <Box key={path} mb={1}>
                  <Link to={path} className="text-gray-600 hover:text-primary-600 transition-colors">
                    {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                  </Link>
                </Box>
              ))}
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Bottom */}
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              © {currentYear} Portfolio. Built By Barkat Khan
            </Typography>
          </Box>
        </Box>
      </Container>
    </footer>
  )
}

export default Footer
