import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import { aboutApi } from '../../api/aboutApi';

const AboutManagePage = () => {
  const [about, setAbout] = useState(null);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const [avatarFile, setAvatarFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const load = async () => {
    const res = await aboutApi.get();
    setAbout(res.data);
    setForm({
      name: res.data?.name || '',
      title: res.data?.title || '',
      subtitle: res.data?.subtitle || '',
      shortBio: res.data?.shortBio || '',
      bio: res.data?.bio || '',
      email: res.data?.email || '',
      phone: res.data?.phone || '',
      location: res.data?.location || '',
      github: res.data?.socialLinks?.github || '',
      linkedin: res.data?.socialLinks?.linkedin || '',
      twitter: res.data?.socialLinks?.twitter || '',
      website: res.data?.socialLinks?.website || '',
      seoTitle: res.data?.seoTitle || '',
      seoDescription: res.data?.seoDescription || '',
      seoKeywords: (res.data?.seoKeywords || []).join(', '),
      yearsOfExperience: res.data?.yearsOfExperience ?? '',
      projectsCompleted: res.data?.projectsCompleted ?? '',
      happyClients: res.data?.happyClients ?? '',
    });
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSave = async () => {
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        title: form.title,
        subtitle: form.subtitle,
        shortBio: form.shortBio,
        bio: form.bio,
        email: form.email,
        phone: form.phone,
        location: form.location,
        yearsOfExperience: form.yearsOfExperience === '' ? undefined : Number(form.yearsOfExperience),
        projectsCompleted: form.projectsCompleted === '' ? undefined : Number(form.projectsCompleted),
        happyClients: form.happyClients === '' ? undefined : Number(form.happyClients),
        socialLinks: {
          github: form.github,
          linkedin: form.linkedin,
          twitter: form.twitter,
          website: form.website,
        },
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        seoKeywords: form.seoKeywords
          ? form.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean)
          : [],
      };

      await aboutApi.update(payload);
      await load();
      alert('About updated successfully');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to update about';
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return alert('Select an avatar file first');
    try {
      const fd = new FormData();
      fd.append('avatar', avatarFile);
      await aboutApi.updateAvatar(fd);
      setAvatarFile(null);
      await load();
      alert('Avatar updated successfully');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to upload avatar');
    }
  };

  const uploadResume = async () => {
    if (!resumeFile) return alert('Select a resume PDF first');
    try {
      const fd = new FormData();
      fd.append('resume', resumeFile);
      await aboutApi.updateResume(fd);
      setResumeFile(null);
      await load();
      alert('Resume updated successfully');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to upload resume');
    }
  };

  return (
    <>
      <Helmet><title>Manage About | Admin</title></Helmet>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>About Settings</Typography>
        <Typography color="text.secondary">Update your portfolio profile content.</Typography>
      </Box>

      {!form ? (
        <Typography color="text.secondary">Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card className="card">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Profile Content
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Name" name="name" value={form.name} onChange={onChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Email" name="email" value={form.email} onChange={onChange} />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Title" name="title" value={form.title} onChange={onChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Subtitle" name="subtitle" value={form.subtitle} onChange={onChange} />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField fullWidth label="Short Bio (Hero)" name="shortBio" value={form.shortBio} onChange={onChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth multiline minRows={6} label="Bio" name="bio" value={form.bio} onChange={onChange} />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={onChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Location" name="location" value={form.location} onChange={onChange} />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Social Links
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="GitHub URL" name="github" value={form.github} onChange={onChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="LinkedIn URL" name="linkedin" value={form.linkedin} onChange={onChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Twitter URL" name="twitter" value={form.twitter} onChange={onChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Website URL" name="website" value={form.website} onChange={onChange} />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Stats + SEO
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField fullWidth type="number" label="Years Experience" name="yearsOfExperience" value={form.yearsOfExperience} onChange={onChange} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField fullWidth type="number" label="Projects Completed" name="projectsCompleted" value={form.projectsCompleted} onChange={onChange} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField fullWidth type="number" label="Happy Clients" name="happyClients" value={form.happyClients} onChange={onChange} />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField fullWidth label="SEO Title" name="seoTitle" value={form.seoTitle} onChange={onChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="SEO Description" name="seoDescription" value={form.seoDescription} onChange={onChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="SEO Keywords (comma separated)" name="seoKeywords" value={form.seoKeywords} onChange={onChange} />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Button variant="contained" disabled={saving} onClick={onSave}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
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

                <Button variant="outlined" component="label" fullWidth>
                  Choose Avatar
                  <input hidden type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files?.[0] || null)} />
                </Button>
                <Typography variant="caption" color="text.secondary">
                  {avatarFile?.name || 'No file selected'}
                </Typography>

                <Button sx={{ mt: 1 }} variant="contained" fullWidth onClick={uploadAvatar}>
                  Upload Avatar
                </Button>

                <Divider sx={{ my: 3 }} />

                <Typography color="text.secondary">Resume (PDF)</Typography>

                <Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }}>
                  Choose Resume
                  <input hidden type="file" accept="application/pdf" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} />
                </Button>
                <Typography variant="caption" color="text.secondary">
                  {resumeFile?.name || 'No file selected'}
                </Typography>

                <Button sx={{ mt: 1 }} variant="contained" fullWidth onClick={uploadResume}>
                  Upload Resume
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
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AboutManagePage;