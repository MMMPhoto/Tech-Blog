import express from 'express';
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
    res.render('homepage', {postTest, loggedIn: req.session.loggedIn});
});

router.get('/login', async (req, res) => {
    res.render('login'); 
});

router.get('/signup', async (req, res) => {
    res.render('signup'); 
});

router.get('/dashboard', async (req, res) => {
    res.render('dashboard'); 
});

router.get('/post/:id', async (req, res) => {
    res.render('post'); 
});

export default router;


