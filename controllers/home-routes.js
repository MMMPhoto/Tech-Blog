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
        res.render('homepage', {displayPosts, loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    res.render('login'); 
});

router.get('/signup', async (req, res) => {
    res.render('signup'); 
});

router.get('/dashboard', async (req, res) => {
    res.render('dashboard', {loggedIn: req.session.loggedIn}); 
});

router.get('/new-post', async (req, res) => {
    res.render('new-post');
});

// Get a Post
router.get('/post/:id', async (req, res) => {
    try {
        let getPost = await Post.findByPk(req.params.id);
        getPost = getPost.dataValues;
        console.log(getPost);
        res.render('post', {getPost});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// User Log out
router.get('/logout', async (req, res) => {
    req.session.destroy();
    req.session.loggedIn = false;
    res.render('homepage');
    res.redirect('/');
});

export default router;


