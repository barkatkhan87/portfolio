import { useEffect, useState } from 'react';
import { CONTACT_EMPTY_FORM } from './contact.constants';

export const useContactForm = (initialValues) => {
  const [values, setValues] = useState(initialValues || CONTACT_EMPTY_FORM);

  useEffect(() => {
    setValues(initialValues || CONTACT_EMPTY_FORM);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setValues(initialValues || CONTACT_EMPTY_FORM);
  };

  return {
    values,
    handleChange,
    resetForm,
  };
};