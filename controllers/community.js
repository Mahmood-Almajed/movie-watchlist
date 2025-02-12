const User = require('../models/user');

const communityIndex = async (req, res) => {
    try {
        const userId = await User.find({});
        res.render('community/index.ejs', {
            title: 'Community Page',
            userId
        })



    } catch (error) {
        console.log(error)
    }


}

const userMovies = async (req, res) => {
    try {
        const userMovies = await User.findById(req.params.userId);
        res.render('community/show.ejs', {
            title: `${userMovies.username} Watchlist`,
            userList: userMovies

        })


    } catch (error) {
        console.log(error)
    }


}








module.exports = {
    communityIndex,
    userMovies,
}