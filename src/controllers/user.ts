import { Request, Response, NextFunction } from 'express';

import UserService from '../services/user';

const login = async (req: Request, res: Response) => {
    const { user } = req;

    return res.json(user);
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.session.destroy((error) => {
            if (error) {
                next(error);
            }
        });
    });

    res.sendStatus(200);
};

const create = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UserService.create(email, password);

    res.send(user);
};

const get = async (req: Request, res: Response) => {
    const { email } = req.params;

    const user = await UserService.get(email);

    res.send(user);
};

const getSession = async (req: Request, res: Response) => {
    const { user } = req;

    res.send(user);
};

export default { get, getSession, create, login, logout };
