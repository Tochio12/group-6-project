const router = require('express').Router();

const userRoutes = require('./user-routes');
const songRoutes = require('./song-routes');
const commentRoutes = require('./comment-routes')

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/song', songRoutes);

module.exports = router;