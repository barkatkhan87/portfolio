import Message from '../models/Message.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import emailService from '../utils/emailService.js';

/**
 * @desc    Create new message (Contact Form)
 * @route   POST /api/messages
 * @access  Public
 */
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent');

  const newMessage = await Message.create({
    name,
    email,
    subject,
    message,
    ipAddress,
    userAgent,
  });

  try {
    await emailService.sendContactEmail({ name, email, subject, message });
    await emailService.sendAutoReply({ name, email });
  } catch (error) {
    console.error('Email sending failed:', error);
  }

  res.status(201).json(
    ApiResponse.created(
      { id: newMessage._id },
      'Message sent successfully! I will get back to you soon.'
    )
  );
});

/**
 * @desc    Get all messages
 * @route   GET /api/messages
 * @access  Private/Admin
 */
export const getMessages = asyncHandler(async (req, res) => {
  const {
    status = 'all',
    starred,
    page = 1,
    limit = 20,
    sort = '-createdAt',
  } = req.query;

  const query = {};

  if (status !== 'all') {
    query.status = status;
  }

  if (starred === 'true') {
    query.isStarred = true;
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const messages = await Message.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limitNum);

  const counts = {
    all: await Message.countDocuments(),
    unread: await Message.countDocuments({ status: 'unread' }),
    read: await Message.countDocuments({ status: 'read' }),
    replied: await Message.countDocuments({ status: 'replied' }),
    archived: await Message.countDocuments({ status: 'archived' }),
    starred: await Message.countDocuments({ isStarred: true }),
  };

  const total = status === 'all' ? counts.all : await Message.countDocuments(query);

  res.status(200).json(
    ApiResponse.success(
      {
        messages,
        counts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
      'Messages retrieved successfully'
    )
  );
});

/**
 * @desc    Get single message
 * @route   GET /api/messages/:id
 * @access  Private/Admin
 */
export const getMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    throw ApiError.notFound('Message not found');
  }

  if (message.status === 'unread') {
    message.status = 'read';
    await message.save();
  }

  res.status(200).json(ApiResponse.success(message, 'Message retrieved successfully'));
});

/**
 * @desc    Update message status
 * @route   PATCH /api/messages/:id/status
 * @access  Private/Admin
 */
export const updateMessageStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const message = await Message.findById(req.params.id);

  if (!message) {
    throw ApiError.notFound('Message not found');
  }

  message.status = status;
  
  if (status === 'replied') {
    message.repliedAt = new Date();
  }

  await message.save();

  res.status(200).json(ApiResponse.success(message, 'Message status updated successfully'));
});

/**
 * @desc    Toggle message starred status
 * @route   PATCH /api/messages/:id/star
 * @access  Private/Admin
 */
export const toggleStar = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    throw ApiError.notFound('Message not found');
  }

  message.isStarred = !message.isStarred;
  await message.save();

  res.status(200).json(
    ApiResponse.success(
      message,
      `Message ${message.isStarred ? 'starred' : 'unstarred'} successfully`
    )
  );
});

/**
 * @desc    Delete message
 * @route   DELETE /api/messages/:id
 * @access  Private/Admin
 */
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    throw ApiError.notFound('Message not found');
  }

  await message.deleteOne();

  res.status(200).json(ApiResponse.success(null, 'Message deleted successfully'));
});

/**
 * @desc    Delete multiple messages
 * @route   DELETE /api/messages
 * @access  Private/Admin
 */
export const deleteMultipleMessages = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    throw ApiError.badRequest('Please provide message IDs to delete');
  }

  await Message.deleteMany({ _id: { $in: ids } });

  res.status(200).json(
    ApiResponse.success(null, `${ids.length} messages deleted successfully`)
  );
});

/**
 * @desc    Mark multiple messages as read
 * @route   PATCH /api/messages/mark-read
 * @access  Private/Admin
 */
export const markMultipleAsRead = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    throw ApiError.badRequest('Please provide message IDs');
  }

  await Message.updateMany(
    { _id: { $in: ids }, status: 'unread' },
    { status: 'read' }
  );

  res.status(200).json(
    ApiResponse.success(null, 'Messages marked as read successfully')
  );
});