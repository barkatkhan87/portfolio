import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

// Lazy load pages
const HomePage = lazy(() => import('../pages/public/HomePage'));
const AboutPage = lazy(() => import('../pages/public/AboutPage'));
const ProjectsPage = lazy(() => import('../pages/public/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('../pages/public/ProjectDetailPage'));
const SkillsPage = lazy(() => import('../pages/public/SkillsPage'));
const ContactPage = lazy(() => import('../pages/public/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'));

const LoginPage = lazy(() => import('../pages/admin/LoginPage'));
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
const ProjectsManagePage = lazy(() => import('../pages/admin/ProjectsManagePage'));
const SkillsManagePage = lazy(() => import('../pages/admin/SkillsManagePage'));
const AboutManagePage = lazy(() => import('../pages/admin/AboutManagePage'));
const MessagesPage = lazy(() => import('../pages/admin/MessagesPage'));

const SaleProjectsPage = lazy(() => import('../pages/public/SaleProjectsPage'));
const SaleProjectDetailPage = lazy(() => import('../pages/public/SaleProjectDetailPage'));
const SaleProjectsManagePage = lazy(() => import('../pages/admin/SaleProjectsManagePage'));

const PageLoader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
    <CircularProgress size={60} />
  </Box>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="sale-projects" element={<SaleProjectsPage />} />
          <Route path="sale-projects/:slug" element={<SaleProjectDetailPage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsManagePage />} />
          <Route path="skills" element={<SkillsManagePage />} />
          <Route path="about" element={<AboutManagePage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="sale-projects" element={<SaleProjectsManagePage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
