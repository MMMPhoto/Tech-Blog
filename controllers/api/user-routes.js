import express from 'express';
const router = express.Router();
import User from '../../models/User.js';

// Create new User Signin
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        console.log(newUser);
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(newUser);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// User Login
router.post('/login', async (req, res) => {



});


// User Log out
router.post('/logout', async (req, res) => {

});

export default router;