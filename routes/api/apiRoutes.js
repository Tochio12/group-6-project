var sequelize = require("sequelize");
var db = require("../models");
var Spotify = require("node-spotify-api");

var spotify = new Spotify({
    id: process.env.SPOTIFY,
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
});

module.exports = function(app) {
    //Get all bookmarked songs from user's logged in
    app.get("/api/saved", function(req, res) {
        db.Song.findAll({
            where: {
                id: req.params.id
            },
            include: [db.User]
        }).then(function(dbBookmarked) {
            res.json(dbFavsResult);
        });
    });
}
//Post to user when a song is marked (api/decision/marked)
app.put("/api/decision/marked", function(req, res) {
    var columnData = req.body.name();
    var data = {};

    data[columnData] = setupLike(columnData);
    db.User.update(data, { where: { id: req.body.id } })
        .then(
            db.Rating.create({
                UserId: req.body.id,
                value: 1,
                songName: req.body.song,
                artist: req.body.artist
            })
        ).then(function(dbUpdate){
            res.json(dbUpdate);
        });
});

// Get one random song from database
app.get("/api/randomize", function(req, res){
    findRandomSong(null, function(randomSong) {
        spotify.search({ type: "track", query: randomSong.songName}, function(err, data){
            if (err) {
                return console.log("Error:" + err);
            }
            var spotifyPath = data.tracks.items;
            var finalSong = {
                song: randomSong.songName,
                artist: randomSong.artist,
                id: spotifyPath[0].id
            };
            res.json(finalSong);
        });
    });
});

//Remove a bookmarked song by id
app.delete("api/saved/:id", function(req, res){
    db.Song.destroy({ where: { id: req.params.id } }).then(function(deletion){
        res.json(deletion);
    });
});