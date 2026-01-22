import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Message from '../models/Message.js';
import About from '../models/About.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/dashboard/stats
 * @access  Private/Admin
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalProjects,
    featuredProjects,
    totalSkills,
    totalMessages,
    unreadMessages,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ featured: true }),
    Skill.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ status: 'unread' }),
  ]);

  const recentMessages = await Message.find()
    .sort('-createdAt')
    .limit(5)
    .select('name email subject status createdAt');

  const projectsByCategory = await Project.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  const skillsByCategory = await Skill.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        avgProficiency: { $avg: '$proficiency' },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  // Get message stats by month (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const messagesByMonth = await Message.aggregate([
    {
      $match: {
        createdAt: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 },
    },
  ]);

  const about = await About.getAbout();

  res.status(200).json(
    ApiResponse.success(
      {
        overview: {
          totalProjects,
          featuredProjects,
          totalSkills,
          totalMessages,
          unreadMessages,
        },
        recentMessages,
        projectsByCategory,
        skillsByCategory,
        messagesByMonth,
        profile: {
          name: about.name,
          title: about.title,
          email: about.email,
          avatar: about.avatar,
        },
      },
      'Dashboard stats retrieved successfully'
    )
  );
});

/**
 * @desc    Get recent activity
 * @route   GET /api/dashboard/activity
 * @access  Private/Admin
 */
export const getRecentActivity = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const recentProjects = await Project.find()
    .sort('-createdAt')
    .limit(parseInt(limit))
    .select('title category createdAt updatedAt');

  const recentMessages = await Message.find()
    .sort('-createdAt')
    .limit(parseInt(limit))
    .select('name subject status createdAt');

  const activities = [
    ...recentProjects.map((p) => ({
      type: 'project',
      title: `New project: ${p.title}`,
      category: p.category,
      date: p.createdAt,
    })),
    ...recentMessages.map((m) => ({
      type: 'message',
      title: `Message from ${m.name}`,
      subject: m.subject,
      status: m.status,
      date: m.createdAt,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  res.status(200).json(
    ApiResponse.success(
      activities.slice(0, parseInt(limit)),
      'Recent activity retrieved successfully'
    )
  );
});