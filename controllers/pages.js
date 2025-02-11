const home = (req, res) => {
    res.render('index.ejs', { title: 'Movie Watchlist App' })
}

module.exports = {
    home,
}