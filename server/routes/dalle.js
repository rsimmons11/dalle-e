// dalleRoutes.js

import express from 'express';
import { getHelloMessage, postImage } from '../controller/dalle.js';

const router = express.Router();

router.route('/').get(getHelloMessage);
router.route('/').post(postImage);

export default router;
