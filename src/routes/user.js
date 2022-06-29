const express = require('express');
const passport = require('passport');

const user = require('../controllers/user');

const router = express.Router();

router.post('/login', passport.authenticate('local'), user.login);
router.post('/create', user.create);
router.get('/:email', user.get);

module.exports = router;
