import { Helmet } from 'react-helmet-async';
import { Grid, Typography } from '@mui/material';

import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AboutProfileForm from '../../forms/admin/about/AboutProfileForm';
import AboutFilesForm from '../../forms/admin/about/AboutFilesForm';
import { useAboutManageData } from '../../hooks/admin/aboutManage/useAboutManageData';

const AboutManagePage = () => {
  const {
    about,
    loading,
    initialFormValues,
    savingProfile,
    uploadingAvatar,
    uploadingResume,
    handleSaveProfile,
    handleUploadAvatar,
    handleUploadResume,
  } = useAboutManageData();

  return (
    <>
      <Helmet>
        <title>Manage About | Admin</title>
      </Helmet>

      <AdminPageHeader
        title="About Settings"
        subtitle="Update your portfolio profile content."
      />

      {loading || !initialFormValues ? (
        <Typography color="text.secondary">Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          {/* LEFT: main form */}
          <Grid item xs={12} md={8}>
            <AboutProfileForm
              initialValues={initialFormValues}
              saving={savingProfile}
              onSubmit={handleSaveProfile}
            />
          </Grid>

          {/* RIGHT: files card */}
          <Grid item xs={12} md={4}>
            <AboutFilesForm
              about={about}
              onUploadAvatar={handleUploadAvatar}
              onUploadResume={handleUploadResume}
              uploadingAvatar={uploadingAvatar}
              uploadingResume={uploadingResume}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AboutManagePage;