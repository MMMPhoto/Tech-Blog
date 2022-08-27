import express from 'express';
const router = express.Router();
import Post from '../../models/Post.js';

// Create new Post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            contents: req.body.contents,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Edit a Post
router.put('/:id', async (req, res) => {


});


// Delete a Post
router.delete('/:id', async (req, res) => {

});

export default router;