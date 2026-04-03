import { Router } from 'express';
import { authenticate } from '../../middleware/auth';

const router = Router();

// Placeholder routes - to be implemented
router.get('/', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Inventory management module - Coming soon',
  });
});

export { router as inventoryRoutes };