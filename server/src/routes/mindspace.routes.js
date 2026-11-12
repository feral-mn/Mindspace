import { Router } from 'express';
import {
  createMindspace, deleteMindspace, getMindspace, listMindspaces, toggleShare, updateMindspace,
} from '../controllers/mindspace.controller.js';
import { addItem } from '../controllers/item.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { addItemSchema, mindspaceSchema } from '../utils/schemas.js';

const router = Router();
router.use(requireAuth);

router.route('/')
  .get(listMindspaces)
  .post(validate(mindspaceSchema), createMindspace);

router.route('/:id')
  .get(getMindspace)
  .patch(validate(mindspaceSchema.partial()), updateMindspace)
  .delete(deleteMindspace);

router.post('/:id/share', toggleShare);

// Nested: items live inside a mindspace
router.post('/:mindspaceId/items', validate(addItemSchema), addItem);

export default router;
