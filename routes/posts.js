const express = require('express');
const Posts = require('../data/db.js');

const router = express.Router();

// @desc    Gets all post
// @route   GET /api/posts
// @access  Public
router.get('/', (req, res) => {
    console.log(req.query);
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json({
                success: true,
                data: posts
            })
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                error: 'The posts information could not be retrieved.'
            });
        });
});

// @desc    Gets a single post by id
// @route   GET /api/posts/:id
// @access  Public
router.get('/:id', (req, res) => {
    const { id } = req.params
    Posts.findById(id)
        .then(post => {
            console.log(post);
            if (post) {
                res.status(200).json({
                    success: true,
                    data: post
                }); 
            } else {
                res.status(404).json({
                    success: false,
                    message: 'The post with the specified ID does not exist.'
                });
            }
            
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                error: 'The post information could not be retrieved.'
            });
        });
});

// @desc    Creates a new post
// @route   POST /api/posts
// @access  Public
router.post('/', (req, res) => {
    Posts.insert(req.body)
        .then(post => {
            res.status(201).json({
                success: true,
                data: post
            })
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                error: 'Error'
            });
        });
});

// @desc    Deletes a post by id
// @route   DELETE /api/posts/:id
// @access  Public
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Posts.remove(id)
        .then(() => {
            res.status(200).json({
                success: true,
                data: {}
            });
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                error: 'Server error'
            })
        });
});

// @desc    Updates a post by id
// @route   PUT /api/posts/:id
// @access  Public
router.put('/:id', (req, res) => {
    const { id } = req.params;

    Posts.update(id, req.body)
        .then(postUpdated => {
            res.status(200).json({
                success: true,
                data: postUpdated
            });
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                error: 'Error'
        })
    })
})

module.exports = router