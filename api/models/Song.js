/**
 * Song.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'text',
      required: true
    },

    artist: {
      type: 'text',
      required: true
    },

    genre: {
      type: 'text',
      required: false
    },

    audioFile: {
      type: 'text',
      required: true
    },

    beatMap: {
      type: 'array',
      required: true
    },

    difficulty: {
      type: 'text',
      required: true
    },

    length: {
      type: 'text',
      required: true
    },

    scores: {
      collection: 'score',
      via: 'song'
    }
  }
};
