const express = require('express');
const Comments = require('../data/db.js');

const router = express.Router();

// @desc    Gets all comments on a specified post with id
// @route   GET /api/posts/:id/comments
// @access  Public
router.get('/:id/comments', async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await Comments.findPostComments(id);
        res.status(200).json({
            success: true,
            data: comments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

// @desc    Creates a new comment on a specified post
// @route   GET /api/posts/:id/comments
// @access  Public
router.post('/:id/comments', async (req, res) => {
    const commentInfo = { ...req.body, post_id: req.params.id };

    try {
        const comment = await Comments.insertComment(commentInfo);
        res.status(201).json({
            success: true,
            data: comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

module.exports = router;