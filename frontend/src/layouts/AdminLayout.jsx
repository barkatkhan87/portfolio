import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider,
  IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Menu, MenuItem, useMediaQuery, useTheme,
} from '@mui/material'
import {
  Menu as MenuIcon, Dashboard, Work, Code, Person, Email,
  Logout, Brightness4, Brightness7,
} from '@mui/icons-material'

import { useAuth } from '../contexts/AuthContext'
import { useTheme as useCustomTheme } from '../contexts/ThemeContext'
import { ADMIN_NAV_LINKS } from '../utils/constants'

const drawerWidth = 260

const AdminLayout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const { user, logout } = useAuth()
  const { toggleTheme, isDark } = useCustomTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget)
  const handleProfileMenuClose = () => setAnchorEl(null)

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const getIcon = (iconName) => {
    const icons = {
      Dashboard: <Dashboard />,
      Work: <Work />,
      Code: <Code />,
      Person: <Person />,
      Email: <Email />,
    }
    return icons[iconName] || <Dashboard />
  }

  const drawer = (
    <div className="h-full flex flex-col bg-white dark:bg-dark-200">
      <div className="p-6">
        <Typography variant="h5" className="font-heading font-bold gradient-text">
          Admin Panel
        </Typography>
      </div>
      <Divider />
      <List className="flex-grow px-3 py-4">
        {ADMIN_NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.path
          return (
            <ListItem key={link.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  navigate(link.path)
                  if (isMobile) setMobileOpen(false)
                }}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? 'primary.main' : 'transparent',
                  color: isActive ? 'white' : 'text.primary',
                  '&:hover': {
                    backgroundColor: isActive ? 'primary.dark' : 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'white' : 'primary.main', minWidth: 40 }}>
                  {getIcon(link.icon)}
                </ListItemIcon>
                <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: isActive ? 600 : 400 }} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <Divider />
      <Box className="p-4">
        <Box display="flex" alignItems="center" gap={2} className="p-3 rounded-lg bg-gray-50 dark:bg-dark-300">
          <Avatar src={user?.avatar?.url} alt={user?.name} sx={{ width: 40, height: 40 }}>
            {user?.name?.charAt(0)}
          </Avatar>
          <Box flex={1} overflow="hidden">
            <Typography variant="body2" fontWeight={600} noWrap>{user?.name}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>{user?.email}</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {ADMIN_NAV_LINKS.find((link) => link.path === location.pathname)?.label || 'Admin Panel'}
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 1 }}>
            {isDark ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
            <Avatar src={user?.avatar?.url} alt={user?.name} sx={{ width: 32, height: 32 }}>
              {user?.name?.charAt(0)}
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
            <MenuItem onClick={() => navigate('/')}>
              <ListItemIcon><Person fontSize="small" /></ListItemIcon>
              View Site
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth } }} open>
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminLayout