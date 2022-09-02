import express from 'express';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
const router = express.Router();

let postTest = [
    {
        title: 'Post 1',
        contents: 'This is a post, blah blah blah',
        user: 'MaxMcD',
        creation_date: '08/27/2022'
    },
    {
        title: 'Post 2',
        contents: 'Shor post',
        user: 'MaxMcD',
        creation_date: '08/27/2022'
    },
    {
        title: 'Post 3',
        contents: 'LODODFMNDFMNDFMNDFMNDNFMDMFDMFDEMFMDFMDFMASDAFMD',
        user: 'MaxMcD',
        creation_date: '08/27/2022'
    }
];

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            order: [
                ['creation_date', 'DESC']
            ]
        });
        console.log(allPosts);
        const displayPosts = allPosts.map((post) => post.dataValues);
        console.log(displayPosts);
        res.render('homepage', {displayPosts, loggedIn: req.session.loggedIn, userId: req.session.user_id, username: req.session.username});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

router.get('/login', async (req, res) => {
    res.render('login'); 
});

router.get('/signup', async (req, res) => {
    res.render('signup'); 
});

router.get('/dashboard', async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            order: [
                ['creation_date', 'DESC']
            ]
        });
        console.log(userPosts);
        const displayPosts = userPosts.map((post) => post.dataValues);
        console.log(displayPosts);
        res.render('dashboard', {displayPosts, loggedIn: req.session.loggedIn, userId: req.session.user_id, username: req.session.username});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

router.get('/new-post', async (req, res) => {
    res.render('new-post', {loggedIn: req.session.loggedIn, userId: req.session.user_id, username: req.session.username});
});

// Get a Post
router.get('/post/:id', async (req, res) => {
    try {
        let getPost = await Post.findByPk(req.params.id);
        getPost = getPost.dataValues;
        console.log(getPost);
        const postComments = await Comment.findAll({
            where: {
                post_id: req.params['id']
            },
            order: [
                ['creation_date', 'DESC']
            ]
        });
        console.log(postComments);
        const getComments = postComments.map(comment => comment.dataValues);
        console.log(getComments);
        res.render('post', {getPost, getComments, loggedIn: req.session.loggedIn, userId: req.session.user_id, username: req.session.username});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// User Log out
router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.render('homepage');
    res.redirect('/');
});

export default router;


