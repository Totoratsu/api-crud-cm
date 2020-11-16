import { Router } from 'express';

import userControllers from '../controllers/user.controllers';

const router = Router();

router.post(
    '/add',
    userControllers.createUser
);

router.get(
    '/get',
    userControllers.getUsers
);

router.put(
    '/edit',
    userControllers.editUser
);

router.delete(
    '/delete',
    userControllers.deleteUser
);

export default router;