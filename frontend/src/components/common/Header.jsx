import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { NAV_LINKS } from "../../utils/constants";
import { useTheme as useCustomTheme } from "../../contexts/ThemeContext";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { toggleTheme, isDark } = useCustomTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled ? "background.paper" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/" className="flex items-center mr-auto">
              <span className="text-2xl font-heading font-bold gradient-text">
                Portfolio
              </span>
            </Link>

            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {NAV_LINKS.map((link) => (
                  <Button
                    key={link.path}
                    component={Link}
                    to={link.path}
                    sx={{
                      color: isActive(link.path)
                        ? "primary.main"
                        : "text.primary",
                      fontWeight: isActive(link.path) ? 600 : 400,
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: isDark ? "warning.main" : "text.primary",
                  }}
                >
                  {isDark ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Box>
            )}

            {isMobile && (
              <>
                <IconButton
                  onClick={toggleTheme}
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  {isDark ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => setMobileOpen(true)}
                  edge="end"
                >
                  <MenuIcon />
                </IconButton>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 280 } }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <span className="text-xl font-heading font-bold gradient-text">
              Menu
            </span>
            <IconButton onClick={() => setMobileOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <List>
            {NAV_LINKS.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  selected={isActive(link.path)}
                  sx={{ borderRadius: 2, mb: 1 }}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Toolbar />
    </>
  );
};

export default Header;
