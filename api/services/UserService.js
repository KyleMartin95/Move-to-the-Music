module.exports = {

  getUsers: function(res, next){
    User.find().exec(function(err, users){
      if(err){
        console.log(err)
        return res.serverError(err)
      }
      if(!users){
        return res.notFound('Could not find users, sorry.')
      }

      next(users)
    })
  },

  getOneUser: function(res, userName, next){
    User.findOne({name: userName}).exec(function (err, user){
		  if (err) {
		    return res.serverError(err);
		  }
		  if (!user) {
		    return res.notFound('Could not find that user, sorry.');
		  }

      next(user)
		});
  }

}