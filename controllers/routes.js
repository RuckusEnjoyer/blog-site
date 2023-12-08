const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth  = require('../utils/auth')

//Getting all posts for homepage
router.get('/', async (req, res) => {
    try{
        //grabbing the data from the database
        const postData = await Post.findAll({
            // include: [
            //     {
            //         model: Comment,
            //         attributes:['user_id', 'body'],
            //     },
            //     {
            //         model: User,
            //         attributes: ['username']
            //     }
            // ],
        });

        //the variable that puts the post data in crayons
        const posts = postData.map((post) => post.get({ plain: true }));

        //render the page using the 'home.handlebars' file!
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn
        });

    } catch (err){
    console.log(err)
    res.status(500).json(err)
    }
} 
);

router.get('/dashboard', withAuth, async (req, res) => {
    try{
        const postData = await Post.findAll({
            // where: {
            //     user_id: req.session.user_id
            // }
        })

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//TO DO: get one post
router.get('/posts/:id')



//TO DO: login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });


router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    } else{
        res.render('signup')
    }
})
  
  module.exports = router;