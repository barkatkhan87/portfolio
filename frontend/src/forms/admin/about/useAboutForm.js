import { useEffect, useState } from 'react';
import { ABOUT_EMPTY_FORM } from './about.constants';

export const useAboutForm = (initialValues) => {
  const [values, setValues] = useState(initialValues || ABOUT_EMPTY_FORM);

  useEffect(() => {
    setValues(initialValues || ABOUT_EMPTY_FORM);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setValues(initialValues || ABOUT_EMPTY_FORM);
  };

  return {
    values,
    handleChange,
    resetForm,
  };
};