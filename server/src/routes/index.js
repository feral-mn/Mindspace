import { Router } from 'express';
import authRoutes from './auth.routes.js';
import mindspaceRoutes from './mindspace.routes.js';
import itemRoutes from './item.routes.js';
import shareRoutes from './share.routes.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));
router.use('/auth', authRoutes);
router.use('/mindspaces', mindspaceRoutes);
router.use('/items', itemRoutes);
router.use('/share', shareRoutes);

export default router;
