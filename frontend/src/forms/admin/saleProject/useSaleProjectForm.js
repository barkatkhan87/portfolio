import { useEffect, useState } from 'react';
import { SALE_PROJECT_EMPTY_FORM } from './saleProject.constants';

export const useSaleProjectForm = (initialValues) => {
  const [values, setValues] = useState(initialValues || SALE_PROJECT_EMPTY_FORM);

  useEffect(() => {
    setValues(initialValues || SALE_PROJECT_EMPTY_FORM);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (event) => {
    const { name, checked } = event.target;
    setValues((prev) => ({ ...prev, [name]: checked }));
  };

  const handleThumbnailSelect = (files) => {
    setValues((prev) => ({ ...prev, thumbnail: files?.[0] || null }));
  };

  const handleImagesSelect = (files) => {
    setValues((prev) => ({ ...prev, images: files || [] }));
  };

  const resetForm = () => {
    setValues(initialValues || SALE_PROJECT_EMPTY_FORM);
  };

  return {
    values,
    handleChange,
    handleToggle,
    handleThumbnailSelect,
    handleImagesSelect,
    resetForm,
  };
};