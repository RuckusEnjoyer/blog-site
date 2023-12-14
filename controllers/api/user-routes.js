const router = require('express').Router();
const { User } = require('../../models')

//make a new user
router.post('/signup', async (req, res) => {
    try{
        const newUser = new User();
        newUser.username = req.body.userName;
        newUser.password = req.body.password;
    console.log(newUser)
        const userData = await newUser.save();
    
        req.session.save(() => {
            req.session.username = userData.username;
            req.session.loggedIn = true;
            req.session.user_id = userData.id;
    
            res.json({user: userData, message: "You are Now Signed In!"})
        })
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({
            where: { username: req.body.userName }
        })
        console.log(userData)
        if (!userData) {
            res
              .status(400)
              .json({ message: "Incorrect email or password, please try again" });
            return;
          }
          const validPassword = await userData.checkPassword(req.body.password);
          if (!validPassword) {
            res
              .status(400)
              .json({ message: "Incorrect email or password, please try again" });
            return;
          }
    
        req.session.save(() => {
            req.session.username = userData.username;
            req.session.loggedIn = true;
            req.session.user_id = userData.id;
            console.log('logged in')
    
            res.json({user: userData, message: "You are Now Signed In!"})
        })
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
})

router.get("/logout", (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
