import Skill from '../models/Skill.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

/**
 * @desc    Get all skills (public)
 * @route   GET /api/skills
 * @access  Public
 */
export const getSkills = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const query = { isVisible: true };
  if (category && category !== 'all') {
    query.category = category;
  }

  const skills = await Skill.find(query).sort('category order -proficiency');

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  res.status(200).json(
    ApiResponse.success({
      skills,
      grouped: groupedSkills,
    }, 'Skills retrieved successfully')
  );
});

/**
 * @desc    Get all skills for admin
 * @route   GET /api/skills/admin
 * @access  Private/Admin
 */
export const getAdminSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort('category order');
  res.status(200).json(
    ApiResponse.success(skills, 'All skills retrieved successfully')
  );
});

/**
 * @desc    Get single skill
 * @route   GET /api/skills/:id
 * @access  Public
 */
export const getSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    throw ApiError.notFound('Skill not found');
  }

  res.status(200).json(ApiResponse.success(skill, 'Skill retrieved successfully'));
});

/**
 * @desc    Create new skill
 * @route   POST /api/skills
 * @access  Private/Admin
 */
export const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json(ApiResponse.created(skill, 'Skill created successfully'));
});

/**
 * @desc    Update skill
 * @route   PUT /api/skills/:id
 * @access  Private/Admin
 */
export const updateSkill = asyncHandler(async (req, res) => {
  let skill = await Skill.findById(req.params.id);

  if (!skill) {
    throw ApiError.notFound('Skill not found');
  }

  skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(ApiResponse.success(skill, 'Skill updated successfully'));
});

/**
 * @desc    Delete skill
 * @route   DELETE /api/skills/:id
 * @access  Private/Admin
 */
export const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    throw ApiError.notFound('Skill not found');
  }

  await skill.deleteOne();

  res.status(200).json(ApiResponse.success(null, 'Skill deleted successfully'));
});

/**
 * @desc    Toggle skill visibility
 * @route   PATCH /api/skills/:id/visibility
 * @access  Private/Admin
 */
export const toggleVisibility = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    throw ApiError.notFound('Skill not found');
  }

  skill.isVisible = !skill.isVisible;
  await skill.save();

  res.status(200).json(
    ApiResponse.success(skill, `Skill ${skill.isVisible ? 'shown' : 'hidden'} successfully`)
  );
});

/**
 * @desc    Bulk update skill order
 * @route   PUT /api/skills/reorder
 * @access  Private/Admin
 */
export const reorderSkills = asyncHandler(async (req, res) => {
  const { skills } = req.body;

  if (!Array.isArray(skills)) {
    throw ApiError.badRequest('Skills array is required');
  }

  const updatePromises = skills.map(({ id, order }) =>
    Skill.findByIdAndUpdate(id, { order })
  );

  await Promise.all(updatePromises);

  const updatedSkills = await Skill.find().sort('category order');

  res.status(200).json(
    ApiResponse.success(updatedSkills, 'Skills reordered successfully')
  );
});