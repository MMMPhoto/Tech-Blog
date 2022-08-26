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
    try {
        const userLogin = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userLogin) {
            res.status(400).json({message: 'Username or password not found!'});
            return;
        };
        const passwordCheck = await userLogin.checkPassword(req.body.password);

        if (!passwordCheck) {
            res.status(400).json({message: 'Username or password not found!'});
            return;
        };

        req.session.save(() => {
            req.session.user_id = userLogin.id;
            req.session.loggedIn = true;
            console.log(req.session.logged_in);
            res.json({ status: 200, user: userLogin, message: 'You are now logged in!'});
        });
    } catch (err) {
        res.status(400).json(err);
    }

});


// User Log out
router.post('/logout', async (req, res) => {

});

export default router;