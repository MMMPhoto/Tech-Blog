import express from 'express';
const router = express.Router();

import homeRoutes from './home-routes.js';
import apiRoutes from './api/index.js';

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

export default router;

