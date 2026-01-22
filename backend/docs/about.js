/**
 * @swagger
 * /about:
 *   get:
 *     summary: Get about information (Public)
 *     tags: [About]
 *     responses:
 *       200:
 *         description: About info retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/About'
 */

/**
 * @swagger
 * /about:
 *   put:
 *     summary: Update about information (Admin)
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               bio:
 *                 type: string
 *               shortBio:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               location:
 *                 type: string
 *               socialLinks:
 *                 type: object
 *               yearsOfExperience:
 *                 type: integer
 *               projectsCompleted:
 *                 type: integer
 *     responses:
 *       200:
 *         description: About info updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /about/avatar:
 *   put:
 *     summary: Update avatar (Admin)
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /about/resume:
 *   put:
 *     summary: Update resume (Admin)
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: PDF file only
 *     responses:
 *       200:
 *         description: Resume updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /about/experience:
 *   post:
 *     summary: Add experience (Admin)
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *               duration:
 *                 type: string
 *               description:
 *                 type: string
 *               current:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Experience added successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /about/experience/{expId}:
 *   put:
 *     summary: Update experience (Admin)
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: expId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *               duration:
 *                 type: string
 *               description:
 *                 type: string
 *               current:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Experience updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /about/experience/{expId}:
 *   delete:
 *     summary: Delete experience (Admin)
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: expId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Experience deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /about/education:
 *   post:
 *     summary: Add education (Admin)
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               institution:
 *                 type: string
 *               degree:
 *                 type: string
 *               field:
 *                 type: string
 *               duration:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Education added successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /about/education/{eduId}:
 *   put:
 *     summary: Update education (Admin)
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eduId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Education updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /about/education/{eduId}:
 *   delete:
 *     summary: Delete education (Admin)
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eduId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Education deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */