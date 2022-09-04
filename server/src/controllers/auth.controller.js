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
      userEmail: user.email,
    });
    await sessionRepository.expire(doc.entityId, 3600);

    //Send response
    return res
      .status(201)
      .cookie("sessionID", sessionID, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600 * 1000,
        secure: process.env.NODE_ENV === "production",
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
      userEmail: user.email,
    });
    await sessionRepository.expire(doc.entityId, 3600);

    //Send response
    return res
      .status(201)
      .cookie("sessionID", sessionID, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600 * 1000,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: "User created successfully",
        user: {
          name: user.name,
          email: user.email,
        },
      });
  };

  static reAuth = async (req, res) => {
    //Check if sessionID is sent
    if (!req.cookies.sessionID) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    //Get sessions from redis
    const session = await sessionRepository
      .search()
      .where("sessionID")
      .is.equalTo(req.cookies.sessionID)
      .return.all();

    //Check if session exists
    if (session.length === 0) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    //Check if session is expired
    if (session[0].expired) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    //Get user from database and check if user exists
    const user = await User.findById(session[0].userID);
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    //Extend session expiration
    await sessionRepository.expire(session.entityId, 3600);

    //Send response
    return res.status(200).json({
      message: "Reauthenticated successfully",
      user: {
        name: session[0].userName,
        email: session[0].userEmail,
      },
    });
  };

  static logout = async (req, res) => {
    //Check if sessionID is sent
    if (!req.cookies.sessionID) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    //Get sessions from redis
    const session = await sessionRepository
      .search()
      .where("sessionID")
      .is.equalTo(req.cookies.sessionID)
      .return.all();

    //Check if session exists
    if (session.length === 0) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    //Delete session from redis
    await sessionRepository.remove(session[0].entityId);

    //Send response
    return res.status(200).json({
      message: "Logged out successfully",
    });
  };
}

export default AuthController;
