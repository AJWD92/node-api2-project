const path = require('path');

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async')
const Comments = require('../data/migrations/20190509175531_add_comments_table.js');
const Posts = require(
    '../data/migrations/20180401213248_add_posts_table'
);

// @desc    Get comments by post id
// @route   GET /api/post/:id/comments
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
    const comment = await Comments.findById(req.params.post_id);

    if (!comment) {
        return next(new ErrorResponse(`No comment found on post with id of ${req.params.post_id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: comment
    });
});

// @desc    Add a new comment
// @route   POST /api/:id/comments
// @access  Public
exports.addComment = asyncHandler(async (req, res, next) => {
    req.body.post = req.post.post_id;

    const post = await Posts.findById(req.params.post_id);

    if (!post) {
        return next(
            new ErrorResponse(
                `No post with the id of ${req.params.post_id}`,
                404
            )
        );
    }

    const comment = await Comments.create(req.body);

    res.status(201).json({
        success: true,
        data: comment
    });
});

