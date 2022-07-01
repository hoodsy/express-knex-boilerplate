const express = require('express');
const passport = require('passport');

const user = require('../controllers/user');

const router = express.Router();

router.post('/login', passport.authenticate('local'), user.login);
router.get('/logout', user.logout);
router.post('/create', user.create);
router.get('/:email', user.get);
router.get('/', user.getSession);

module.exports = router;
