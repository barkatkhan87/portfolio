export const SKILL_EMPTY_FORM = {
  name: '',
  category: 'frontend',
  proficiency: 80,
  icon: '',
  color: '#667eea',
  order: 0,
  isVisible: true,
};

export const mapSkillToFormValues = (skill) => {
  if (!skill) return SKILL_EMPTY_FORM;

  return {
    ...SKILL_EMPTY_FORM,
    name: skill.name || '',
    category: skill.category || 'frontend',
    proficiency: skill.proficiency ?? 80,
    icon: skill.icon || '',
    color: skill.color || '#667eea',
    order: skill.order ?? 0,
    isVisible: skill.isVisible ?? true,
  };
};