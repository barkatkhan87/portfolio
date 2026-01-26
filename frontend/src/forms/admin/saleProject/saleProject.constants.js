export const SALE_PROJECT_CATEGORY_OPTIONS = [
  { value: 'react', label: 'React JS' },
  { value: 'angular', label: 'Angular' },
  { value: 'java', label: 'Java' },
  { value: 'dotnet', label: '.NET' },
  { value: 'csharp', label: 'C#' },
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'other', label: 'Other' },
];

export const SALE_PROJECT_CURRENCY_OPTIONS = [
  { value: 'INR', label: 'INR' },
  { value: 'USD', label: 'USD' },
];

export const SALE_PROJECT_EMPTY_FORM = {
  title: '',
  shortDescription: '',
  description: '',
  price: 0,
  currency: 'INR',
  category: 'react',
  technologies: '',
  duration: '',
  implementationGuide: '',
  features: '',
  includes: '',
  demoUrl: '',
  githubUrl: '',
  contactUrl: '',
  isVisible: true,
  isFeatured: false,
  order: 0,
  thumbnail: null,
  images: [],
};

export const mapSaleProjectToFormValues = (project) => {
  if (!project) return SALE_PROJECT_EMPTY_FORM;

  return {
    ...SALE_PROJECT_EMPTY_FORM,
    title: project.title || '',
    shortDescription: project.shortDescription || '',
    description: project.description || '',
    price: project.price ?? 0,
    currency: project.currency || 'INR',
    category: project.category || 'react',
    technologies: (project.technologies || []).join(', '),
    duration: project.duration || '',
    implementationGuide: project.implementationGuide || '',
    features: (project.features || []).join('\n'),
    includes: (project.includes || []).join('\n'),
    demoUrl: project.demoUrl || '',
    githubUrl: project.githubUrl || '',
    contactUrl: project.contactUrl || '',
    isVisible: project.isVisible ?? true,
    isFeatured: project.isFeatured ?? false,
    order: project.order ?? 0,
    thumbnail: null,
    images: [],
  };
};