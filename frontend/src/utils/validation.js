export const isValidEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const validateLoginForm = (values) => {
  const errors = {};

  if (!values.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

export const validateContactForm = (values) => {
  const errors = {};

  if (!values.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!values.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!values.subject?.trim()) {
    errors.subject = 'Subject is required';
  }

  if (!values.message?.trim()) {
    errors.message = 'Message is required';
  } else if (values.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
};

// Simple URL validator
export const isValidUrl = (url) => {
  if (!url) return true; // consider empty as valid if optional
  const regex = /^(https?:\/\/)/i;
  return regex.test(url);
};

// ✅ Validation for Sale Project form (Admin)
export const validateSaleProjectForm = (values, isEdit = false) => {
  const errors = {};

  // Title
  if (!values.title || !values.title.trim()) {
    errors.title = 'Title is required';
  }

  // Short description
  if (!values.shortDescription || !values.shortDescription.trim()) {
    errors.shortDescription = 'Short description is required';
  }

  // Description
  if (!values.description || !values.description.trim()) {
    errors.description = 'Description is required';
  }

  // Price
  const priceNum = Number(values.price);
  if (Number.isNaN(priceNum) || priceNum < 0) {
    errors.price = 'Price must be a valid number (>= 0)';
  }

  // Category
  if (!values.category) {
    errors.category = 'Category is required';
  }

  // Thumbnail required only when creating new
  if (!isEdit && !values.thumbnail) {
    errors.thumbnail = 'Thumbnail is required';
  }

  // Optional URLs but must be valid if present
  if (values.demoUrl && !isValidUrl(values.demoUrl)) {
    errors.demoUrl = 'Please enter a valid URL starting with http:// or https://';
  }
  if (values.githubUrl && !isValidUrl(values.githubUrl)) {
    errors.githubUrl = 'Please enter a valid URL starting with http:// or https://';
  }
  if (values.contactUrl && !isValidUrl(values.contactUrl)) {
    errors.contactUrl = 'Please enter a valid URL starting with http:// or https://';
  }

  return errors;
};
