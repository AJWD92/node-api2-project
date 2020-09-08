const express = require('express')
const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/posts');

const Post = require('../data/migrations/20180401213248_add_posts_table');

// Include other resource routers
const commentRouter = require('./comments');

const router = express.Router();

// Re-router into other resources routers
router.use('/:id/comments', commentRouter);

router
    .route('/')
    .get(getPosts)
    .post(createPost);

router
    .route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost);

module.exports = router;