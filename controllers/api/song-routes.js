const router = require('express').Router();
const { User, Song, Comment, Vote } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Song.findAll({
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
            },
          ]
    })
      .then(dbSongData => res.json(dbSongData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


router.get('/:id', (req, res) => {
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
                model: User,
                attributes: ['username']
              },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'song_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            }
          ]

    })
      .then(dbSongData => {
        if (!dbSongData) {
          res.status(404).json({ message: 'No Song found with this id' });
          return;
        }
        res.json(dbSongData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


router.post('/', withAuth, (req, res) => {
    Song.create({
      name: req.body.name,
      price_paid: req.body.price_paid,
      notes: req.body.notes,
      user_id: req.session.user_id
    })
    .then(dbSongData => res.json(dbSongData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });


router.put('/upvote', withAuth, (req, res) => {
    if (req.session) {
      Song.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });


router.delete('/:id', withAuth, (req, res) => {
    Song.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbSongData => {
        if (!dbSongData) {
          res.status(404).json({ message: 'No Song found with this id' });
          return;
        }
        res.json(dbSongData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;