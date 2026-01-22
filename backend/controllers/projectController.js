import Project from '../models/Project.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadImage, deleteImage } from '../config/cloudinary.js';

/**
 * @desc    Get all projects (public)
 * @route   GET /api/projects
 * @access  Public
 */
export const getProjects = asyncHandler(async (req, res) => {
  const { 
    category, 
    featured, 
    status,
    page = 1, 
    limit = 10,
    sort = '-createdAt'
  } = req.query;

  const query = { isVisible: true };
  
  if (category && category !== 'all') {
    query.category = category;
  }
  
  if (featured === 'true') {
    query.featured = true;
  }
  
  if (status) {
    query.status = status;
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const projects = await Project.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limitNum);

  const total = await Project.countDocuments(query);

  res.status(200).json(
    ApiResponse.success({
      projects,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    }, 'Projects retrieved successfully')
  );
});

/**
 * @desc    Get all projects for admin (including hidden)
 * @route   GET /api/projects/admin
 * @access  Private/Admin
 */
export const getAdminProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort('-createdAt');
  res.status(200).json(
    ApiResponse.success(projects, 'All projects retrieved successfully')
  );
});

/**
 * @desc    Get single project by slug
 * @route   GET /api/projects/:slug
 * @access  Public
 */
export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ 
    slug: req.params.slug,
    isVisible: true 
  });

  if (!project) {
    throw ApiError.notFound('Project not found');
  }

  res.status(200).json(ApiResponse.success(project, 'Project retrieved successfully'));
});

/**
 * @desc    Get single project by ID (admin)
 * @route   GET /api/projects/id/:id
 * @access  Private/Admin
 */
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw ApiError.notFound('Project not found');
  }

  res.status(200).json(ApiResponse.success(project, 'Project retrieved successfully'));
});

/**
 * @desc    Create new project
 * @route   POST /api/projects
 * @access  Private/Admin
 */
export const createProject = asyncHandler(async (req, res) => {
  const projectData = { ...req.body };

  // Convert featured string -> boolean
if (typeof projectData.featured === 'string') {
  projectData.featured = projectData.featured.toLowerCase() === 'true';
}

// Convert order string -> number
if (typeof projectData.order === 'string') {
  const n = Number(projectData.order);
  projectData.order = Number.isNaN(n) ? 0 : n;
}

// Convert technologies string -> array
if (typeof projectData.technologies === 'string') {
  projectData.technologies = projectData.technologies
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

  if (req.files && req.files.thumbnail) {
    const thumbnailFile = req.files.thumbnail[0];
    const base64 = thumbnailFile.buffer.toString('base64');
    const dataURI = `data:${thumbnailFile.mimetype};base64,${base64}`;
    const result = await uploadImage(dataURI, 'portfolio/projects');
    
    projectData.thumbnail = {
      public_id: result.public_id,
      url: result.url,
    };
  } else if (!projectData.thumbnail?.url) {
    throw ApiError.badRequest('Thumbnail is required');
  }

  if (req.files && req.files.images) {
    const imagePromises = req.files.images.map(async (file) => {
      const base64 = file.buffer.toString('base64');
      const dataURI = `data:${file.mimetype};base64,${base64}`;
      return await uploadImage(dataURI, 'portfolio/projects');
    });
    
    projectData.images = await Promise.all(imagePromises);
  }

  const project = await Project.create(projectData);

  res.status(201).json(ApiResponse.created(project, 'Project created successfully'));
});

/**
 * @desc    Update project
 * @route   PUT /api/projects/:id
 * @access  Private/Admin
 */
export const updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    throw ApiError.notFound('Project not found');
  }

  const updateData = { ...req.body };

  if (typeof updateData.technologies === 'string') {
    updateData.technologies = updateData.technologies
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech);
  }

  if (req.files && req.files.thumbnail) {
    if (project.thumbnail && project.thumbnail.public_id) {
      await deleteImage(project.thumbnail.public_id);
    }

    const thumbnailFile = req.files.thumbnail[0];
    const base64 = thumbnailFile.buffer.toString('base64');
    const dataURI = `data:${thumbnailFile.mimetype};base64,${base64}`;
    const result = await uploadImage(dataURI, 'portfolio/projects');
    
    updateData.thumbnail = {
      public_id: result.public_id,
      url: result.url,
    };
  }

  if (req.files && req.files.images) {
    if (project.images && project.images.length > 0) {
      await Promise.all(
        project.images.map(img => img.public_id && deleteImage(img.public_id))
      );
    }

    const imagePromises = req.files.images.map(async (file) => {
      const base64 = file.buffer.toString('base64');
      const dataURI = `data:${file.mimetype};base64,${base64}`;
      return await uploadImage(dataURI, 'portfolio/projects');
    });
    
    updateData.images = await Promise.all(imagePromises);
  }

  project = await Project.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(ApiResponse.success(project, 'Project updated successfully'));
});

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Private/Admin
 */
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw ApiError.notFound('Project not found');
  }

  if (project.thumbnail && project.thumbnail.public_id) {
    await deleteImage(project.thumbnail.public_id);
  }

  if (project.images && project.images.length > 0) {
    await Promise.all(
      project.images.map(img => img.public_id && deleteImage(img.public_id))
    );
  }

  await project.deleteOne();

  res.status(200).json(ApiResponse.success(null, 'Project deleted successfully'));
});

/**
 * @desc    Toggle project visibility
 * @route   PATCH /api/projects/:id/visibility
 * @access  Private/Admin
 */
export const toggleVisibility = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw ApiError.notFound('Project not found');
  }

  project.isVisible = !project.isVisible;
  await project.save();

  res.status(200).json(
    ApiResponse.success(project, `Project ${project.isVisible ? 'shown' : 'hidden'} successfully`)
  );
});

/**
 * @desc    Toggle project featured status
 * @route   PATCH /api/projects/:id/featured
 * @access  Private/Admin
 */
export const toggleFeatured = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw ApiError.notFound('Project not found');
  }

  project.featured = !project.featured;
  await project.save();

  res.status(200).json(
    ApiResponse.success(project, `Project ${project.featured ? 'featured' : 'unfeatured'} successfully`)
  );
});

/**
 * @desc    Get featured projects
 * @route   GET /api/projects/featured
 * @access  Public
 */
export const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ 
    featured: true, 
    isVisible: true 
  })
    .sort('order -createdAt')
    .limit(6);

  res.status(200).json(
    ApiResponse.success(projects, 'Featured projects retrieved successfully')
  );
});