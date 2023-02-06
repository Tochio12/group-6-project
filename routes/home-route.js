const router = require('express').Router();
const { Bookmark, User } = require('../models');

//gets bookmarks for homepage
router.get('/', async (req, res) => {
    try {
        const markData = await Bookmark.findAll({
            include: [User]
        });

        const bookmarks = markData.map((mark) => mark.get({ plain: true }));
    
        res.render('all-marks', { bookmarks })
    } catch (err) {
        res.status(500).json(err);
    }
});

//set api for scroll section of page

//search part of the page