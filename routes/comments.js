const express = require('express');
const {
    getComments,
    addComment
} = require('../controllers/comments');

const router = express.Router({ mergeParams: true });

router
    .route('/comments')
    .get(getComments)
    .post(addComment);

module.exports = router;