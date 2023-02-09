const router = require('express').Router();
const sequelize = require('../config/connection');
const { Song, User, Vote, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('Arrived');
    Song.findAll({
        where: {
          user_id: req.session.user_id
          },
        attributes: [
          'id',
          'name',
          'price_paid',
          'notes',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE song.id = vote.song_id)'), 'vote_count']
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'song_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbSongData => {
          const songs = dbSongData.map(song => song.get({ plain: true }));
          res.render('inventory', {songs, loggedIn: true});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
  });

router.get('/song/:id', (req, res) => {
    Song.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'name',
        'price_paid',
        'notes',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE song.id = vote.song_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'song_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbSongData => {
        if (!dbSongData) {
          res.status(404).json({ message: 'No song found with this id' });
          return;
        }

        const song = dbSongData.get({ plain: true });

        res.render('single-song', {
            song,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

  module.exports = router;