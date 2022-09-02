// import "../models/user" neradi ali linija ispod radi??
import User from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import { sessionRepository } from "../models/session.js";

class AuthController {
  static login = async (req, res) => {
    let { email, password } = req.body;

    //Check if email and password are sent
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "User does not exist",
      });
    }

    //Check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        error: "Incorrect username or password",
      });
    }

    //Generate token
    const sessionID = uuidv4();

    //Save token to redis
    let doc = await sessionRepository.createAndSave({
      sessionID: sessionID,
      userID: user._id.toString(),
      userName: user.name,
    });
    await sessionRepository.expire(doc.entityId, 3600);

    //Send response
    return res
      .status(201)
      .cookie("sessionID", sessionID, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600 * 1000,
      })
      .json({
        message: "Logged in successfully",
        user: {
          name: user.name,
          email: user.email,
        },
      });
  };

  static register = async (req, res) => {
    let { name, email, password } = req.body;

    //Check if email and password are sent
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    //Check if email is unique
    if (await User.findOne({ email })) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    //Hash password before saving
    password = await bcrypt.hash(password, 10);

    //Create new user
    const user = new User({
      name,
      email,
      password,
    });

    //Save user to database
    await user.save();

    //Generate session token
    const sessionID = uuidv4();

    //Save token to redis
    let doc = await sessionRepository.createAndSave({
      sessionID: sessionID,
      userID: user._id.toString(),
      userName: user.name,
    });
    await sessionRepository.expire(doc.entityId, 3600);

    //Send response
    return res
      .status(201)
      .cookie("sessionID", sessionID, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600 * 1000,
      })
      .json({
        message: "User created successfully",
        user: {
          name: user.name,
          email: user.email,
        },
      });
  };
}

export default AuthController;