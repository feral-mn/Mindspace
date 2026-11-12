import { Router } from 'express';
import { getSharedMindspace } from '../controllers/share.controller.js';

const router = Router();
router.get('/:slug', getSharedMindspace); // no auth: public read-only

export default router;
