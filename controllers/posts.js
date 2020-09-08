const path = require('path');

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Post = require('../data/db');


// @desc    Get all post
// @route   GET /api/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find()

    if (!posts) {
        return next(new ErrorResponse('The posts information could not be retrieved'), 500);
    }
    res.status(200).json()

});

// @desc    Get a single post
// @route   GET /api/posts/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorResponse(
            `The post with the specified ID of ${req.params.id} does not exist`,
            404
        ));
    }
    
    res.status(200).json({
        success: true,
        data: post
    });

});

// @desc    Create a post
// @route   POST /api/posts
// @access Public
exports.createPost = asyncHandler(async (req, res, next) => {
    const postInfo = req.body;

    // Add POST to req.body
    req.body.post = req.post.id;



    // Check for published post
    const publishedPost = await Post.findOne({ post: req.post.id })

    if (publishedPost && postInfo === req.body.title && req.body.contents) {
        return next(new ErrorResponse('Please provide title and contents for the post', 400));
    }

    const post = await Post.create(req.body);

    res.status(201).json({
        success: true,
        data: post
    });

});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Public
exports.updatePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!post) {
        return next(new ErrorResponse(`The post with the specified ID of ${req.params.id} does not exist`, 404));
    }

    if (req.body !== req.body.title && req.body.contents) {
        return next(new ErrorResponse('Please provide title and contents for the post.', 400))
    }

    res.status(200).json({
        success: true,
        data: post
    });

});

// @desc    Delete a post
// @route   DELETE /spi/posts/:id
// @access  Public
exports.deletePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorResponse(`The post with the specified ID of ${req.params.id} does not exist`, 404))
    }
    post.remove();

    res.status(200).json({
        success: true,
        data: {}
    });

});