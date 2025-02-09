const User = require('../models/user');


const index = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        res.render('movies/index.ejs', {
            title: `${currentUser.username} watchlist`,
            userMovies: currentUser,
        })



    }


    catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

const newMoviePage = (req, res) => {

    res.render('movies/new.ejs', {
        title: 'create movie watchlist'

    })
}
const newMovie = async (req, res) => {
    try {
        const userId = await User.findById(req.params.userId);
        userId.movies.push(req.body);
        console.log(req.body)
        await userId.save();
        res.redirect(`/users/${userId._id}/movies`);

    }
    catch (error) {
        console.log(error);
        res.redirect('/');
    }
}


const show = async (req, res) => {
    try {

        const userId = await User.findById(req.params.userId);
        const movieId = await userId.movies.id(req.params.movieId);
        res.render('movies/show.ejs',{
            title:'Show Movie',
            movieId,
            userId,

        })

    }

    catch (error) {

        console.log(error);
        res.redirect('/');
    }



}




//edit user
const movieEditPage = async (req, res) => {
    try {
        const userId = await User.findById(req.params.userId);
        const movieId = userId.movies.id(req.params.movieId);
        res.render('movies/edit.ejs', {
            title: `edit movie`,
            movieId,

        })





    } catch (error) {
        console.log(error);
        res.redirect('/');
    }


}


module.exports = {

    index,
    newMoviePage,
    newMovie,
    movieEditPage,
    show
}

