import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('all');
});

export default router;


