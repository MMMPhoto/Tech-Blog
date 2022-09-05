import express from 'express';
const router = express.Router();
import Post from '../../models/Post.js';
import Comment from '../../models/Comment.js';

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
    try {
        await Post.update({
            title: req.body.title,
            contents: req.body.contents,
        },
        { where: { id: req.params.id }
        });
        const newUpdatedPost = await Post.findByPk(req.params.id);
        res.status(200).json(newUpdatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Delete a Post
router.delete('/:id', async (req, res) => {
    try {
        console.log(req.body);
        await Comment.destroy({where: {post_id: req.body.postId}});
        await Post.destroy({where: {id: req.body.postId}});
        res.status(200).json({'message': 'Post Deleted!'});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

export default router;