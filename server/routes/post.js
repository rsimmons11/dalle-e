import express from 'express';
import { getPosts, createPost } from '../controller/post.js'

const router = express.Router();


//GET ALL POST
router.route('/').get(getPosts) 



// CREATE A POST
router.route('/').post(createPost) 

export default router;