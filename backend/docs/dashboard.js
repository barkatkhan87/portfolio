/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics (Admin)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     overview:
 *                       type: object
 *                       properties:
 *                         totalProjects:
 *                           type: integer
 *                         featuredProjects:
 *                           type: integer
 *                         totalSkills:
 *                           type: integer
 *                         totalMessages:
 *                           type: integer
 *                         unreadMessages:
 *                           type: integer
 *                     recentMessages:
 *                       type: array
 *                       items:
 *                         type: object
 *                     projectsByCategory:
 *                       type: array
 *                       items:
 *                         type: object
 *                     skillsByCategory:
 *                       type: array
 *                       items:
 *                         type: object
 *                     profile:
 *                       type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /dashboard/activity:
 *   get:
 *     summary: Get recent activity (Admin)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of activities to return
 *     responses:
 *       200:
 *         description: Recent activity retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         enum: [project, message]
 *                       title:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */