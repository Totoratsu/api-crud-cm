import { Request, Response } from 'express';
import MovieModel from '../models/movie.model';

class MovieControllers {

    async createMovie(req: Request, res: Response) {
        const { title, author, director, rating, genre } = req.body;

        let arr = genre.split(',');

        const newMovie = new MovieModel({
            title, author, director, rating, genre: arr,
            date: Date.now()
        }).populate('author','director');

        await newMovie.save();

        return res.json({ statusText: 'done' });
    }

    async getMovies(req: Request, res: Response) {
        const movies = await MovieModel.find()
            .populate('author','director');

        return res.json({ statusText: 'done', movies })
    }

    async deleteMovie(req: Request, res: Response) {
        const { id } = req.query;

        await MovieModel.findByIdAndDelete(id);

        return res.json({ statusText: 'done' });
    }

    async editMovie(req: Request, res: Response) {
        const { id } = req.query;
        const { title, author, director, rating, genre } = req.body;

        const movie = await MovieModel.findById(id);
        if (!movie)
            return res.json({ statusText: 'MovieNotFound' }).status(404);

        if (title) movie.title = title;
        if (author) movie.author = author;
        if (director) movie.director = director;
        if (rating) movie.rating = rating;
        if (genre) movie.genre = genre.split(',');

        await movie.save();

        return res.json({ statusText: 'done', movie });
    }

}

const movieControllers = new MovieControllers();
export default movieControllers;