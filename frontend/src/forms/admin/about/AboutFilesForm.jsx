import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import FileUploadField from '../../../components/ui/FileUploadField';

const AboutFilesForm = ({
  about,
  onUploadAvatar,
  onUploadResume,
  uploadingAvatar = false,
  uploadingResume = false,
}) => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const handleUploadAvatarClick = async () => {
    if (!onUploadAvatar) return;
    await onUploadAvatar(avatarFile);
    // Clear selection after upload attempt
    setAvatarFile(null);
  };

  const handleUploadResumeClick = async () => {
    if (!onUploadResume) return;
    await onUploadResume(resumeFile);
    setResumeFile(null);
  };

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Files
        </Typography>

        <Typography color="text.secondary">Current Avatar</Typography>
        <Box sx={{ mt: 1, mb: 2 }}>
          <img
            src={about?.avatar?.url || 'https://via.placeholder.com/150'}
            alt="avatar"
            style={{ width: '100%', borderRadius: 12 }}
          />
        </Box>

        <FileUploadField
          label="Choose Avatar"
          accept="image/*"
          onFilesSelected={(files) => setAvatarFile(files?.[0] || null)}
          helperText={avatarFile?.name || 'No file selected'}
        />

        <Button
          sx={{ mt: 1 }}
          variant="contained"
          fullWidth
          onClick={handleUploadAvatarClick}
          disabled={uploadingAvatar}
        >
          {uploadingAvatar ? 'Uploading...' : 'Upload Avatar'}
        </Button>

        <Divider sx={{ my: 3 }} />

        <Typography color="text.secondary">Resume (PDF)</Typography>

        <Box sx={{ mt: 1 }}>
          <FileUploadField
            label="Choose Resume"
            accept="application/pdf"
            onFilesSelected={(files) => setResumeFile(files?.[0] || null)}
            helperText={resumeFile?.name || 'No file selected'}
          />
        </Box>

        <Button
          sx={{ mt: 1 }}
          variant="contained"
          fullWidth
          onClick={handleUploadResumeClick}
          disabled={uploadingResume}
        >
          {uploadingResume ? 'Uploading...' : 'Upload Resume'}
        </Button>

        {about?.resume?.url && (
          <Button
            sx={{ mt: 2 }}
            fullWidth
            component="a"
            href={about.resume.url}
            target="_blank"
            rel="noreferrer"
          >
            View Current Resume
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AboutFilesForm;