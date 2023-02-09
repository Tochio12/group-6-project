const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { truncate } = require('./User');

// create our Post model
class Song extends Model {
    static upvote(body, models) {
        return models.Vote.create({
          user_id: body.user_id,
          song_id: body.song_id
        }).then(() => {
          return Song.findOne({
            where: {
              id: body.song_id
            },
            attributes: [
                'id',
                'name',
                'price_paid',
                'user_id',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE song.id = vote.song_id)'), 'vote_count']
            ]
          });
        });
      }
    }

// create fields/columns for Post model
Song.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price_paid: {
          type: DataTypes.FLOAT,
          allowNull: true
      },
      notes: {
          type: DataTypes.TEXT,
          allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'song'
    }
  );

  module.exports = Song;