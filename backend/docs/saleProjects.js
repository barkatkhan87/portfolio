// backend/docs/saleProjects.js

/**
 * @swagger
 * tags:
 *   name: SaleProjects
 *   description: Sale projects (projects for sale)
 */

/**
 * @swagger
 * /sale-projects:
 *   get:
 *     summary: Get all visible sale projects
 *     tags: [SaleProjects]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [all, web, mobile, desktop, api, ui, other]
 *         description: Filter by category
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *         description: Only featured sale projects
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: "order -createdAt"
 *         description: Sort fields
 *     responses:
 *       200:
 *         description: Sale projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/SaleProject'
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 */

/**
 * @swagger
 * /sale-projects/detail/{slug}:
 *   get:
 *     summary: Get a single sale project by slug
 *     tags: [SaleProjects]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Sale project slug
 *     responses:
 *       200:
 *         description: Sale project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/SaleProject'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */

/**
 * @swagger
 * /sale-projects/admin/all:
 *   get:
 *     summary: Get all sale projects (admin)
 *     tags: [SaleProjects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin sale projects list
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
 *                     $ref: '#/components/schemas/SaleProject'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /sale-projects:
 *   post:
 *     summary: Create a new sale project
 *     tags: [SaleProjects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               currency:
 *                 type: string
 *                 enum: [INR, USD]
 *               category:
 *                 type: string
 *                 enum: [web, mobile, desktop, api, ui, other]
 *               technologies:
 *                 type: string
 *                 description: Comma-separated technologies
 *               duration:
 *                 type: string
 *                 description: e.g. "3 Days" or "1 Week"
 *               implementationGuide:
 *                 type: string
 *                 description: Text/Markdown guide
 *               features:
 *                 type: string
 *                 description: New line separated features
 *               includes:
 *                 type: string
 *                 description: New line separated "what you get"
 *               demoUrl:
 *                 type: string
 *               githubUrl:
 *                 type: string
 *               contactUrl:
 *                 type: string
 *                 description: WhatsApp or contact link
 *               isVisible:
 *                 type: boolean
 *               isFeatured:
 *                 type: boolean
 *               order:
 *                 type: integer
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Thumbnail image file
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Additional screenshots
 *     responses:
 *       201:
 *         description: Sale project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/SaleProject'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /sale-projects/{id}:
 *   put:
 *     summary: Update a sale project
 *     tags: [SaleProjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sale project ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               currency:
 *                 type: string
 *                 enum: [INR, USD]
 *               category:
 *                 type: string
 *               technologies:
 *                 type: string
 *               duration:
 *                 type: string
 *               implementationGuide:
 *                 type: string
 *               features:
 *                 type: string
 *               includes:
 *                 type: string
 *               demoUrl:
 *                 type: string
 *               githubUrl:
 *                 type: string
 *               contactUrl:
 *                 type: string
 *               isVisible:
 *                 type: boolean
 *               isFeatured:
 *                 type: boolean
 *               order:
 *                 type: integer
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Sale project updated successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */

/**
 * @swagger
 * /sale-projects/{id}:
 *   delete:
 *     summary: Delete a sale project
 *     tags: [SaleProjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sale project ID
 *     responses:
 *       200:
 *         description: Sale project deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */