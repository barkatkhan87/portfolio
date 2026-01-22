import About from '../models/About.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadImage, deleteImage } from '../config/cloudinary.js';

/**
 * @desc    Get about info
 * @route   GET /api/about
 * @access  Public
 */
export const getAbout = asyncHandler(async (req, res) => {
  const about = await About.getAbout();
  res.status(200).json(ApiResponse.success(about, 'About info retrieved successfully'));
});

/**
 * @desc    Update about info
 * @route   PUT /api/about
 * @access  Private/Admin
 */
export const updateAbout = asyncHandler(async (req, res) => {
  let about = await About.getAbout();
  
  const updateData = { ...req.body };

  if (typeof updateData.seoKeywords === 'string') {
    updateData.seoKeywords = updateData.seoKeywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k);
  }

  if (typeof updateData.experience === 'string') {
    try {
      updateData.experience = JSON.parse(updateData.experience);
    } catch (e) {
      // Keep as is if not valid JSON
    }
  }

  if (typeof updateData.education === 'string') {
    try {
      updateData.education = JSON.parse(updateData.education);
    } catch (e) {
      // Keep as is if not valid JSON
    }
  }

  if (typeof updateData.socialLinks === 'string') {
    try {
      updateData.socialLinks = JSON.parse(updateData.socialLinks);
    } catch (e) {
      // Keep as is if not valid JSON
    }
  }

  about = await About.findByIdAndUpdate(about._id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(ApiResponse.success(about, 'About info updated successfully'));
});

/**
 * @desc    Update avatar
 * @route   PUT /api/about/avatar
 * @access  Private/Admin
 */
export const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new Error('Please upload an image');
  }

  let about = await About.getAbout();

  if (about.avatar && about.avatar.public_id) {
    await deleteImage(about.avatar.public_id);
  }

  const base64 = req.file.buffer.toString('base64');
  const dataURI = `data:${req.file.mimetype};base64,${base64}`;
  const result = await uploadImage(dataURI, 'portfolio/about');

  about = await About.findByIdAndUpdate(
    about._id,
    {
      avatar: {
        public_id: result.public_id,
        url: result.url,
      },
    },
    { new: true }
  );

  res.status(200).json(ApiResponse.success(about, 'Avatar updated successfully'));
});

/**
 * @desc    Update resume
 * @route   PUT /api/about/resume
 * @access  Private/Admin
 */
export const updateResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new Error('Please upload a PDF file');
  }

  let about = await About.getAbout();

  if (about.resume && about.resume.public_id) {
    await deleteImage(about.resume.public_id);
  }

  const base64 = req.file.buffer.toString('base64');
  const dataURI = `data:${req.file.mimetype};base64,${base64}`;
  const result = await uploadImage(dataURI, 'portfolio/resume');

  about = await About.findByIdAndUpdate(
    about._id,
    {
      resume: {
        public_id: result.public_id,
        url: result.url,
      },
    },
    { new: true }
  );

  res.status(200).json(ApiResponse.success(about, 'Resume updated successfully'));
});

/**
 * @desc    Add experience
 * @route   POST /api/about/experience
 * @access  Private/Admin
 */
export const addExperience = asyncHandler(async (req, res) => {
  let about = await About.getAbout();

  about.experience.push(req.body);
  await about.save();

  res.status(201).json(ApiResponse.created(about, 'Experience added successfully'));
});

/**
 * @desc    Update experience
 * @route   PUT /api/about/experience/:expId
 * @access  Private/Admin
 */
export const updateExperience = asyncHandler(async (req, res) => {
  let about = await About.getAbout();

  const expIndex = about.experience.findIndex(
    exp => exp._id.toString() === req.params.expId
  );

  if (expIndex === -1) {
    throw new Error('Experience not found');
  }

  about.experience[expIndex] = { ...about.experience[expIndex]._doc, ...req.body };
  await about.save();

  res.status(200).json(ApiResponse.success(about, 'Experience updated successfully'));
});

/**
 * @desc    Delete experience
 * @route   DELETE /api/about/experience/:expId
 * @access  Private/Admin
 */
export const deleteExperience = asyncHandler(async (req, res) => {
  let about = await About.getAbout();

  about.experience = about.experience.filter(
    exp => exp._id.toString() !== req.params.expId
  );
  await about.save();

  res.status(200).json(ApiResponse.success(about, 'Experience deleted successfully'));
});

/**
 * @desc    Add education
 * @route   POST /api/about/education
 * @access  Private/Admin
 */
export const addEducation = asyncHandler(async (req, res) => {
  let about = await About.getAbout();

  about.education.push(req.body);
  await about.save();

  res.status(201).json(ApiResponse.created(about, 'Education added successfully'));
});

/**
 * @desc    Update education
 * @route   PUT /api/about/education/:eduId
 * @access  Private/Admin
 */
export const updateEducation = asyncHandler(async (req, res) => {
  let about = await About.getAbout();

  const eduIndex = about.education.findIndex(
    edu => edu._id.toString() === req.params.eduId
  );

  if (eduIndex === -1) {
    throw new Error('Education not found');
  }

  about.education[eduIndex] = { ...about.education[eduIndex]._doc, ...req.body };
  await about.save();

  res.status(200).json(ApiResponse.success(about, 'Education updated successfully'));
});

/**
 * @desc    Delete education
 * @route   DELETE /api/about/education/:eduId
 * @access  Private/Admin
 */
export const deleteEducation = asyncHandler(async (req, res) => {
  let about = await About.getAbout();

  about.education = about.education.filter(
    edu => edu._id.toString() !== req.params.eduId
  );
  await about.save();

  res.status(200).json(ApiResponse.success(about, 'Education deleted successfully'));
});