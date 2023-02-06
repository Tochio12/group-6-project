// Get liked songs
var Sequelize = require("sequelize");
var db = require("../models");

module.exports = function(app) {
    app.get("/api/favorites/:userid", function(req, res) {
        db.Song.findAll({
            where: {
                userid: req.params.userid
            },
        include: [db.users]
      }).then(function(dbFavsResult) {
        res.json(dbFavsResult);
      });
    });

    // Get one random song from our db
    app.get("/api/random-song", function(req, res) {
        findRandomSong(null, function(randomSong) {
        res.json(randomSong);
        });
    });
    // Get recommended song based on user data.
    app.get("/api/recommended-song/:id", function(req, res) {
        db.User.findOne({
            where: {
            userid: req.params.id
            },
            attributes: [
            "rockLike",
            "rockDislike",
            "rapLike",
            "rapDislike",
            "popLike",
            "popDislike",
            "countryLike",
            "countryDislike",
            "altLike",
            "altDislike"
            ]
        }).then(function(userIdResult) {
            findRandomSong(favoriteGenre, function(randomSong) {
            res.json(randomSong);
            });
        });
        });

    // Creates login and stores in db
    app.post("/", function(req, res) {
        db.User.create({
            username: req.body.username,
            password: req.body.password
        }).then(function(username) {
            console.log(username);
            res.json(username);
          });
        });
    // Delete a liked song by id
    app.delete("/api/favorites/:id", function(req, res) {
        db.Song.destroy({ where: { id: req.params.id } }).then(function(deletion) {
            res.json(deletion);
            });
        });
    };
// Reusable function to find a random song or a recommended song depending on if the 'where' parameter    is populated.
function findRandomSong(genre, cb) {
    var whereOption = genre ? { genre: genre } : {};
  
    db.Song.findOne({
      order: Sequelize.literal("rand()"),
      where: whereOption
    }).then(function(randomSong) {
      console.log(randomSong);
      cb(randomSong);
    });
  };