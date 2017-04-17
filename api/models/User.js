/**
 * User.js
 *
 * @description :: Model for user information will be recorded 
 * Created by   :: Scott Brumley
 */

module.exports = {

  attributes: {

    name: {
      type: 'text',
      required: true
    },

    song: {
      type: 'text',
      required: true
    },

    score: {
      type: 'text',
      required: true
    }
  }
};
