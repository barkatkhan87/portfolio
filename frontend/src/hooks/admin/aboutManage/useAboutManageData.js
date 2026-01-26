import { useEffect, useState } from 'react';
import { aboutApi } from '../../../api/aboutApi';
import { mapAboutToFormValues } from '../../../forms/admin/about/about.constants';

export const useAboutManageData = () => {
  const [about, setAbout] = useState(null);
  const [initialFormValues, setInitialFormValues] = useState(null);
  const [loading, setLoading] = useState(true);

  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const loadAbout = async () => {
    try {
      const res = await aboutApi.get();
      setAbout(res.data);
      setInitialFormValues(mapAboutToFormValues(res.data));
    } catch (err) {
      console.error('Failed to load about data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAbout();
  }, []);

  const handleSaveProfile = async (values) => {
    setSavingProfile(true);
    try {
      const payload = {
        name: values.name,
        title: values.title,
        subtitle: values.subtitle,
        shortBio: values.shortBio,
        bio: values.bio,
        email: values.email,
        phone: values.phone,
        location: values.location,
        yearsOfExperience:
          values.yearsOfExperience === ''
            ? undefined
            : Number(values.yearsOfExperience),
        projectsCompleted:
          values.projectsCompleted === ''
            ? undefined
            : Number(values.projectsCompleted),
        happyClients:
          values.happyClients === ''
            ? undefined
            : Number(values.happyClients),
        socialLinks: {
          github: values.github,
          linkedin: values.linkedin,
          twitter: values.twitter,
          website: values.website,
        },
        seoTitle: values.seoTitle,
        seoDescription: values.seoDescription,
        seoKeywords: values.seoKeywords
          ? values.seoKeywords
              .split(',')
              .map((k) => k.trim())
              .filter(Boolean)
          : [],
      };

      await aboutApi.update(payload);
      await loadAbout();
      alert('About updated successfully');
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to update about';
      alert(msg);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUploadAvatar = async (file) => {
    if (!file) {
      alert('Select an avatar file first');
      return;
    }
    setUploadingAvatar(true);
    try {
      const fd = new FormData();
      fd.append('avatar', file);
      await aboutApi.updateAvatar(fd);
      await loadAbout();
      alert('Avatar updated successfully');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleUploadResume = async (file) => {
    if (!file) {
      alert('Select a resume PDF first');
      return;
    }
    setUploadingResume(true);
    try {
      const fd = new FormData();
      fd.append('resume', file);
      await aboutApi.updateResume(fd);
      await loadAbout();
      alert('Resume updated successfully');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to upload resume');
    } finally {
      setUploadingResume(false);
    }
  };

  return {
    about,
    loading,
    initialFormValues,
    savingProfile,
    uploadingAvatar,
    uploadingResume,
    handleSaveProfile,
    handleUploadAvatar,
    handleUploadResume,
  };
};