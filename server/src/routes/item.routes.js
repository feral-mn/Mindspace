import { Router } from 'express';
import { deleteItem, updateItem } from '../controllers/item.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { updateItemSchema } from '../utils/schemas.js';

const router = Router();
router.use(requireAuth);

router.route('/:id')
  .patch(validate(updateItemSchema), updateItem)
  .delete(deleteItem);

export default router;
