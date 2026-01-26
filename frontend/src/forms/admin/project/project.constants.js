export const PROJECT_EMPTY_FORM = {
  title: '',
  description: '',
  longDescription: '',
  category: 'web',
  technologies: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
  status: 'completed',
  thumbnail: null,
  images: [],
};

export const mapProjectToFormValues = (project) => {
  if (!project) return PROJECT_EMPTY_FORM;

  return {
    ...PROJECT_EMPTY_FORM,
    title: project.title || '',
    description: project.description || '',
    longDescription: project.longDescription || '',
    category: project.category || 'web',
    technologies: (project.technologies || []).join(', '),
    liveUrl: project.liveUrl || '',
    githubUrl: project.githubUrl || '',
    featured: !!project.featured,
    status: project.status || 'completed',
    thumbnail: null, // user will pick a new one if needed
    images: [], // new uploads only
  };
};