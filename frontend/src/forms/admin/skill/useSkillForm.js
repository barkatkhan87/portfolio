import { useEffect, useState } from 'react';
import { SKILL_EMPTY_FORM } from './skill.constants';

export const useSkillForm = (initialValues) => {
  const [values, setValues] = useState(initialValues || SKILL_EMPTY_FORM);

  useEffect(() => {
    setValues(initialValues || SKILL_EMPTY_FORM);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (event) => {
    const { name, checked } = event.target;
    setValues((prev) => ({ ...prev, [name]: checked }));
  };

  const resetForm = () => {
    setValues(initialValues || SKILL_EMPTY_FORM);
  };

  return {
    values,
    handleChange,
    handleToggle,
    resetForm,
  };
};