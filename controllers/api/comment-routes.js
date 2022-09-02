import express from 'express';
const router = express.Router();
import Comment from '../../models/Comment.js';

// Post a new Comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            text: req.body.text,
            user_id: req.session.user_id,
            post_id: req.body.postId
        });
        console.log(newComment);
        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Get a Comment
router.get('/:id', async (req, res) => {


});

// Edit a Comment
router.put('/:id', async (req, res) => {


});


// Delete a Comment
router.delete('/:id', async (req, res) => {

});

export default router;