import { Router } from 'express';

import movieControllers from '../controllers/movie.controllers';

const router = Router();

router.post(
    '/add',
    movieControllers.createMovie
);

router.get(
    '/get',
    movieControllers.getMovies
);

router.put(
    '/edit',
    movieControllers.editMovie
);

router.delete(
    '/delete',
    movieControllers.deleteMovie
);

export default router;