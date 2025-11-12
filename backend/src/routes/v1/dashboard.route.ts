import { dashboardController } from '../../controllers/index.ts';
import auth from '../../middlewares/auth.ts';
import validate from '../../middlewares/validate.ts';
import { dashboardValidation } from '../../validations/index.ts';
import express from 'express';

const router = express.Router();

// Authenticated dashboard routes
router
    .route('/stats')
    .get(auth('getDashboard'), validate(dashboardValidation.getDashboardStats), dashboardController.getDashboardStats);

router
    .route('/recent-activity')
    .get(auth('getDashboard'), validate(dashboardValidation.getRecentActivity), dashboardController.getRecentActivity);

export default router;

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard statistics and activity feed
 */

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Get dashboard statistics including total users, active users, revenue, and conversion metrics for authenticated user.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   example: 12543
 *                 activeUsers:
 *                   type: integer
 *                   example: 8432
 *                 totalRevenue:
 *                   type: number
 *                   format: float
 *                   example: 123456.78
 *                 conversionRate:
 *                   type: number
 *                   format: float
 *                   example: 3.24
 *                 percentChanges:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: number
 *                       format: float
 *                       example: 12.5
 *                     revenue:
 *                       type: number
 *                       format: float
 *                       example: 8.3
 *                     conversionRate:
 *                       type: number
 *                       format: float
 *                       example: -2.1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /dashboard/recent-activity:
 *   get:
 *     summary: Get recent activity feed
 *     description: Get recent activity feed for authenticated user showing recent system activities.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   type:
 *                     type: string
 *                     example: "user_registered"
 *                   description:
 *                     type: string
 *                     example: "New user registration"
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-11-12T10:15:00Z"
 *                   user:
 *                     type: string
 *                     example: "Alice Johnson"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */