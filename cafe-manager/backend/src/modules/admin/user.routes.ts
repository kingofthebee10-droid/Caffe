import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';

const router = Router();

// Placeholder routes - to be implemented
router.get('/', authenticate, authorize('owner', 'manager'), (req, res) => {
  res.json({
    success: true,
    message: 'User management module - Coming soon',
  });
});

export { router as userRoutes };