import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

class UserController {
  async getOneUserById(req: Request, res: Response) {
    const id = userService.validateToken(req.headers.authorization as string);

    const user = await userService.findUserById(id);
    res.json(user);
  }

  async register(
    req: Request<object, unknown, { email: string; password: string }>,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body;

    const userData = await userService.singUp(email, password);
    res.status(200).json(userData);

    next();
  }

  async login(
    req: Request<object, unknown, { email: string; password: string }>,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body;
    const userData = await userService.signIn(email, password);

    res.json(userData);

    next();
  }
}

export const userController = new UserController();
