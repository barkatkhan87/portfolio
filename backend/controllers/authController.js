import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { sendTokenResponse } from '../utils/generateToken.js';
import { uploadImage, deleteImage } from '../config/cloudinary.js';

/**
 * @desc    Login admin
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw ApiError.unauthorized('Invalid credentials');
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw ApiError.unauthorized('Invalid credentials');
  }

  sendTokenResponse(user, 200, res, 'Login successful');
});

/**
 * @desc    Logout admin
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json(ApiResponse.success(null, 'Logged out successfully'));
});

/**
 * @desc    Get current logged in admin
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(ApiResponse.success(user, 'User retrieved successfully'));
});

/**
 * @desc    Update admin profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const fieldsToUpdate = {};
  if (name) fieldsToUpdate.name = name;
  if (email) fieldsToUpdate.email = email;

  if (req.file) {
    if (req.user.avatar && req.user.avatar.public_id) {
      await deleteImage(req.user.avatar.public_id);
    }

    const base64 = req.file.buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;
    const result = await uploadImage(dataURI, 'portfolio/avatars');
    
    fieldsToUpdate.avatar = {
      public_id: result.public_id,
      url: result.url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(ApiResponse.success(user, 'Profile updated successfully'));
});

/**
 * @desc    Change password
 * @route   PUT /api/auth/password
 * @access  Private
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw ApiError.badRequest('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  sendTokenResponse(user, 200, res, 'Password changed successfully');
});

/**
 * @desc    Check if admin exists (for setup)
 * @route   GET /api/auth/check
 * @access  Public
 */
export const checkAdmin = asyncHandler(async (req, res) => {
  const admin = await User.findOne({ role: 'admin' });
  res.status(200).json(
    ApiResponse.success({ exists: !!admin }, 'Admin check completed')
  );
});