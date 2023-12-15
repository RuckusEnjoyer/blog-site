const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth  = require('../../utils/auth')


router.post('/create', withAuth, async (req, res) => {
    try{
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        
        console.log(newPost);
        
        res.redirect('/dashboard')

    }catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});



module.exports = router;