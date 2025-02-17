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
        if (req.body.poster === "") {

            req.body.poster = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
        }

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
        res.render('movies/show.ejs', {
            title: 'Show Movie',
            movieId,
            userId,

        })

    }

    catch (error) {

        console.log(error);
        res.redirect('/');
    }



}




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

const updateMovie = async (req, res) => {
    try {
        const userId = await User.findById(req.params.userId);
        const movieId = userId.movies.id(req.params.movieId);
        movieId.set(req.body);
        await userId.save();
        res.redirect(`/users/${userId._id}/movies/${movieId._id}`)



    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

}



const deleteMovie = async (req, res) => {
    try {
        const userId = await User.findById(req.params.userId);
        userId.movies.id(req.params.movieId).deleteOne();
        await userId.save();
        res.redirect(`/users/${userId._id}/movies`);




    } catch (error) {
        console.log(error);
        res.redirect('/')
    }

}

module.exports = {

    index,
    newMoviePage,
    newMovie,
    movieEditPage,
    show,
    updateMovie,
    deleteMovie,
}

