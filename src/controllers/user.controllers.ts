import { Request, Response } from 'express';
import bcrypt from 'bcrypt-nodejs';

import UserModel from '../models/user.model';

class UserControllers {

    async createUser(req: Request, res: Response) {
        const { password, username, email, role } = req.body;

        const newUser = new UserModel({
            username, email, role,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        });

        await newUser.save();

        return res.json({ statusText: 'done', newUser });
    }

    async getUsers(req: Request, res: Response) {
        const users = await UserModel.find();

        return res.json({ statusText: 'done', users })
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.query;

        await UserModel.findByIdAndDelete(id);

        return res.json({ statusText: 'done' });
    }

    async editUser(req: Request, res: Response) {
        const { id } = req.query;
        const { username, email } = req.body;

        const user = await UserModel.findById(id);
        if (!user)
            return res.json({ statusText: 'UserNotFound' }).status(404);

        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        return res.json({ statusText: 'done', user });
    }

}

const userControllers = new UserControllers();
export default userControllers;