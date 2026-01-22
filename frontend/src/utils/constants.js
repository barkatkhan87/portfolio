export const APP_NAME = import.meta.env.VITE_APP_NAME || 'My Portfolio'

export const CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile Apps' },
  { value: 'desktop', label: 'Desktop Apps' },
  { value: 'api', label: 'APIs' },
  { value: 'other', label: 'Other' },
]

export const SKILL_CATEGORIES = [
  { value: 'frontend', label: 'Frontend', color: '#61DAFB' },
  { value: 'backend', label: 'Backend', color: '#339933' },
  { value: 'database', label: 'Database', color: '#47A248' },
  { value: 'devops', label: 'DevOps', color: '#2496ED' },
  { value: 'tools', label: 'Tools', color: '#FF6C37' },
  { value: 'other', label: 'Other', color: '#667eea' },
]

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
]

export const ADMIN_NAV_LINKS = [
  { path: '/admin', label: 'Dashboard', icon: 'Dashboard' },
  { path: '/admin/projects', label: 'Projects', icon: 'Work' },
  { path: '/admin/skills', label: 'Skills', icon: 'Code' },
  { path: '/admin/about', label: 'About', icon: 'Person' },
  { path: '/admin/messages', label: 'Messages', icon: 'Email' },
]

export const MESSAGE_STATUS = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
  { value: 'replied', label: 'Replied' },
  { value: 'archived', label: 'Archived' },
]