export const ABOUT_EMPTY_FORM = {
  name: '',
  title: '',
  subtitle: '',
  shortBio: '',
  bio: '',
  email: '',
  phone: '',
  location: '',
  github: '',
  linkedin: '',
  twitter: '',
  website: '',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  yearsOfExperience: '',
  projectsCompleted: '',
  happyClients: '',
};

export const mapAboutToFormValues = (about) => {
  if (!about) return ABOUT_EMPTY_FORM;

  return {
    ...ABOUT_EMPTY_FORM,
    name: about.name || '',
    title: about.title || '',
    subtitle: about.subtitle || '',
    shortBio: about.shortBio || '',
    bio: about.bio || '',
    email: about.email || '',
    phone: about.phone || '',
    location: about.location || '',
    github: about.socialLinks?.github || '',
    linkedin: about.socialLinks?.linkedin || '',
    twitter: about.socialLinks?.twitter || '',
    website: about.socialLinks?.website || '',
    seoTitle: about.seoTitle || '',
    seoDescription: about.seoDescription || '',
    seoKeywords: (about.seoKeywords || []).join(', '),
    yearsOfExperience: about.yearsOfExperience ?? '',
    projectsCompleted: about.projectsCompleted ?? '',
    happyClients: about.happyClients ?? '',
  };
};