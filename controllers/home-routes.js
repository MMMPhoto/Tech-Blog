import express from 'express';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
const router = express.Router();

// Function to grab username by id
const getUsernameById = async (user_id) => {
    const user = await User.findByPk(user_id);
    const username = user.dataValues.username;
    console.log(username);
    return username;
};

// Loop to get each Username in an array of post or comments
const loopForUsers = async (items) => {
    for (const item of items) {
        item.username = await getUsernameById(item.user_id);       
    };
    return items;
};

// Homepage Route
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            order: [
                ['creation_date', 'DESC']
            ]
        });
        const displayPosts = allPosts.map((post) => post.dataValues);
        await loopForUsers(displayPosts);
        res.render('homepage', {displayPosts, loggedIn: req.session.loggedIn, userId: req.session.user_id, username: req.session.username});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Login page Route
router.get('/login', async (req, res) => {
    res.render('login'); 
});

// Signup page route
router.get('/signup', async (req, res) => {
    res.render('signup'); 
});

// Dashboard Route
router.get('/dashboard', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        };
        const userPosts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            order: [
                ['creation_date', 'DESC']
            ]
        });
        const displayPosts = userPosts.map((post) => post.dataValues);
        await loopForUsers(displayPosts);
        res.render('dashboard', {displayPosts, loggedIn: req.session.loggedIn, userId: req.session.user_id, username: req.session.username});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// New Post Route
router.get('/new-post', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        };
        res.render('new-post', {loggedIn: req.session.loggedIn, userId: req.session.user_id, username: req.session.username});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Update Post Route
router.get('/update-post/:id', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        };
        let getPost = await Post.findByPk(req.params.id);
        getPost = getPost.dataValues;
        res.render('update-post', {getPost, loggedIn: req.session.loggedIn, userId: req.session.user_id, username: req.session.username});
    } catch {
        console.log(err);
        res.status(500).json(err);
    };
});

// Single Post Route
router.get('/post/:id', async (req, res) => {
    try {
        let getPost = await Post.findByPk(req.params.id);
        getPost = getPost.dataValues;
        getPost.username = await getUsernameById(getPost.user_id);
        const postComments = await Comment.findAll({
            where: {
                post_id: req.params['id']
            },
            order: [
                ['creation_date', 'ASC']
            ]
        });
        const getComments = postComments.map(comment => comment.dataValues);
        await loopForUsers(getComments);
        res.render('post', {getPost, getComments, loggedIn: req.session.loggedIn, userId: req.session.user_id, username: req.session.username});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Post with Comment Form
router.get('/post-new-comment/:id', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        };
        let getPost = await Post.findByPk(req.params.id);
        getPost = getPost.dataValues;
        getPost.username = await getUsernameById(getPost.user_id);
        const postComments = await Comment.findAll({
            where: {
                post_id: req.params['id']
            },
            order: [
                ['creation_date', 'ASC']
            ]
        });
        const getComments = postComments.map(comment => comment.dataValues);
        await loopForUsers(getComments);
        res.render('post-new-comment', {getPost, getComments, loggedIn: req.session.loggedIn, userId: req.session.user_id, username: req.session.username});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Post with Delete Warning
router.get('/post-delete/:id', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        };
        let getPost = await Post.findByPk(req.params.id);
        getPost = getPost.dataValues;
        getPost.username = await getUsernameById(getPost.user_id);
        const postComments = await Comment.findAll({
            where: {
                post_id: req.params['id']
            },
            order: [
                ['creation_date', 'ASC']
            ]
        });
        const getComments = postComments.map(comment => comment.dataValues);
        await loopForUsers(getComments);
        res.render('post-delete', {getPost, getComments, loggedIn: req.session.loggedIn, userId: req.session.user_id, username: req.session.username});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// User Log out Route
router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.render('homepage');
    res.redirect('/');
});

export default router;


