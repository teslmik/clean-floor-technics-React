import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

import UserModel from "../models/user.model";

class UserService {
  async findUserById(id: string) {
    const user = await UserModel.findById(id).select(["email", "role", "name"]);

    return user;
  }

  async singUp(email: string, password: string): Promise<{ token: string }> {
    const checkEmail = await UserModel.findOne({ email });

    if (checkEmail) {
      throw new Error(`User with email address ${email} already exists`);
    }

    const user = await UserModel.create({
      email,
      password: await this.getHashPassword(password),
    });

    const token = this.createToken({ id: user.id });

    return { token };
  }

  async signIn(email: string, password: string): Promise<{ token: string }> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new Error("Invalid email or password");
    }

    const token = this.createToken({ id: user.id });

    return { token };
  }

  async getHashPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  }

  createToken(payload: JwtPayload) {
    const token = jwt.sign(payload, import.meta.env.JWT_SECRET as string, {
      expiresIn: import.meta.env.JWT_EXPIRATION,
    });
    return `Bearer ${token}`;
  }

  validateToken(token: string) {
    const splitToken = token.replace("Bearer ", "");
    try {
      const userData = jwt.verify(
        splitToken,
        import.meta.env.JWT_SECRET as string,
      ) as {
        id: string;
        [key: string]: string | number;
      };
      console.log("userData: ", userData);

      return userData.id;
    } catch (error) {
      return String(error);
    }
  }
}

export const userService = new UserService();
