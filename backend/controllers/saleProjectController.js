// backend/controllers/saleProjectController.js
import SaleProject from '../models/SaleProject.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadImage, deleteImage } from '../config/cloudinary.js';

const normalizeCsv = (v) => {
  if (!v) return [];
  if (Array.isArray(v)) {
    return v
      .flatMap((x) => String(x).split(','))
      .map((x) => x.trim())
      .filter(Boolean);
  }
  return String(v)
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
};

const normalizeLines = (v) => {
  if (!v) return [];
  if (Array.isArray(v)) {
    return v.map((x) => String(x).trim()).filter(Boolean);
  }
  return String(v)
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);
};

/**
 * @desc    Get all sale projects (public)
 * @route   GET /api/sale-projects
 * @access  Public
 */
export const getSaleProjects = asyncHandler(async (req, res) => {
  const { category, featured, page = 1, limit = 12, sort = 'order -createdAt' } = req.query;

  const query = { isVisible: true };
  if (category && category !== 'all') query.category = category;
  if (featured === 'true') query.isFeatured = true;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const items = await SaleProject.find(query).sort(sort).skip(skip).limit(limitNum);
  const total = await SaleProject.countDocuments(query);

  res
    .status(200)
    .json(
      ApiResponse.success(
        {
          items,
          pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            pages: Math.ceil(total / limitNum),
          },
        },
        'Sale projects retrieved successfully'
      )
    );
});

/**
 * @desc    Get single sale project by slug (public)
 * @route   GET /api/sale-projects/:slug   or  /api/sale-projects/detail/:slug (depending on your routes)
 * @access  Public
 */
export const getSaleProjectBySlug = asyncHandler(async (req, res) => {
  const slug = String(req.params.slug).toLowerCase();
  const item = await SaleProject.findOne({ slug, isVisible: true });

  if (!item) {
    throw ApiError.notFound('Sale project not found');
  }

  res.status(200).json(ApiResponse.success(item, 'Sale project retrieved successfully'));
});

/**
 * @desc    Get all sale projects for admin
 * @route   GET /api/sale-projects/admin/all
 * @access  Private/Admin
 */
export const getAdminSaleProjects = asyncHandler(async (req, res) => {
  const items = await SaleProject.find().sort('order -createdAt');
  res
    .status(200)
    .json(ApiResponse.success(items, 'Admin sale projects retrieved successfully'));
});

/**
 * @desc    Create new sale project
 * @route   POST /api/sale-projects
 * @access  Private/Admin
 */
export const createSaleProject = asyncHandler(async (req, res) => {
  const data = { ...req.body };

  // normalize fields
  if ('technologies' in data) data.technologies = normalizeCsv(data.technologies);
  if ('features' in data) data.features = normalizeLines(data.features);
  if ('includes' in data) data.includes = normalizeLines(data.includes);
  if ('price' in data) data.price = Number(data.price);

  // thumbnail
  if (req.files?.thumbnail?.[0]) {
    const f = req.files.thumbnail[0];
    const base64 = f.buffer.toString('base64');
    const dataURI = `data:${f.mimetype};base64,${base64}`;
    const uploaded = await uploadImage(dataURI, 'portfolio/sale-projects');

    data.thumbnail = {
      public_id: uploaded.public_id,
      url: uploaded.url,
    };
  } else {
    throw ApiError.badRequest('Thumbnail is required');
  }

  // images
  if (req.files?.images?.length) {
    const uploads = await Promise.all(
      req.files.images.map(async (f) => {
        const base64 = f.buffer.toString('base64');
        const dataURI = `data:${f.mimetype};base64,${base64}`;
        return uploadImage(dataURI, 'portfolio/sale-projects');
      })
    );
    data.images = uploads;
  }

  const item = await SaleProject.create(data);
  res.status(201).json(ApiResponse.created(item, 'Sale project created successfully'));
});

/**
 * @desc    Update sale project
 * @route   PUT /api/sale-projects/:id
 * @access  Private/Admin
 */
export const updateSaleProject = asyncHandler(async (req, res) => {
  const existing = await SaleProject.findById(req.params.id);
  if (!existing) throw ApiError.notFound('Sale project not found');

  const data = { ...req.body };

  if ('technologies' in data) data.technologies = normalizeCsv(data.technologies);
  if ('features' in data) data.features = normalizeLines(data.features);
  if ('includes' in data) data.includes = normalizeLines(data.includes);
  if ('price' in data) data.price = Number(data.price);

  // ❌ REMOVE THIS – we don't touch slug on update
  // if (data.title) data.slug = generateSlug(data.title);

  // thumbnail
  if (req.files?.thumbnail?.[0]) {
    if (existing.thumbnail?.public_id) {
      await deleteImage(existing.thumbnail.public_id);
    }
    const f = req.files.thumbnail[0];
    const base64 = f.buffer.toString('base64');
    const dataURI = `data:${f.mimetype};base64,${base64}`;
    const uploaded = await uploadImage(dataURI, 'portfolio/sale-projects');

    data.thumbnail = {
      public_id: uploaded.public_id,
      url: uploaded.url,
    };
  }

  // images (replace all if new ones sent)
  if (req.files?.images?.length) {
    if (existing.images?.length) {
      await Promise.all(
        existing.images.map((img) => img.public_id && deleteImage(img.public_id))
      );
    }
    const uploads = await Promise.all(
      req.files.images.map(async (f) => {
        const base64 = f.buffer.toString('base64');
        const dataURI = `data:${f.mimetype};base64,${base64}`;
        return uploadImage(dataURI, 'portfolio/sale-projects');
      })
    );
    data.images = uploads;
  }

  const updated = await SaleProject.findByIdAndUpdate(existing._id, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(ApiResponse.success(updated, 'Sale project updated successfully'));
});

/**
 * @desc    Delete sale project
 * @route   DELETE /api/sale-projects/:id
 * @access  Private/Admin
 */
export const deleteSaleProject = asyncHandler(async (req, res) => {
  const existing = await SaleProject.findById(req.params.id);
  if (!existing) throw ApiError.notFound('Sale project not found');

  if (existing.thumbnail?.public_id) await deleteImage(existing.thumbnail.public_id);
  if (existing.images?.length) {
    await Promise.all(
      existing.images.map((img) => img.public_id && deleteImage(img.public_id))
    );
  }

  await existing.deleteOne();

  res.status(200).json(ApiResponse.success(null, 'Sale project deleted successfully'));
});