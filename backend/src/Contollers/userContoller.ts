import { Request, Response } from "express";
import mssql from "mssql";

import { v4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sqlConfig } from "../Config/sqlConfig";
import {
  userLoginValidationSchema,
  userRegisterValidationSchema,
  validateResetpassword,
  validateUserEmailForgotPassword,
} from "../Validators/user";
import { query, execute } from "../Helpers/dbHelpers";
import { ExtendedUser } from "../Middlewares/verfiyToken";
import { updateUser } from "../Interface/user";
import { hashPass } from "../Services/passwordHash";
import { isEmpty } from "lodash";

//REGISTER USER
export const registerUser = async (req: Request, res: Response) => {
  try {
    let { email, fullname, phone_no, username, password } = req.body;

    console.log(req.body);

    const { error } = userRegisterValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    console.log(error);

    let userID = v4();
    const hashedPwd = await bcrypt.hash(password, 8);

    const Procedure1 = "getUserByEmail";
    const Param = { email };

    const result = await execute(Procedure1, Param);

    // const user = result.recordset[0];
    const user =
      result.recordset && result.recordset.length > 0
        ? result.recordset[0]
        : undefined;

    // console.log(user);

    if (user) {
      return res.json({ error: "Email already exists. User not registered." });
    } else {
      const procedureName2 = "registerUser";
      const params = {
        userID,
        username,
        fullname,
        phone_no,
        email,
        password: hashedPwd,
      };
      console.log("here");

      await execute(procedureName2, params);

      res.status(200).json({
        message: "user registered successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//LOGIN USER
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { error } = userLoginValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const pool = await mssql.connect(sqlConfig);

    console.log(email, password);

    let user = await (
      await pool
        .request()
        .input("email", mssql.VarChar, email)
        .input("password", mssql.VarChar, password)
        .execute("loginUser")
    ).recordset;
    console.log("user is", user);

    if (user.length === 1) {
      const correctPwd = await bcrypt.compare(password, user[0].password);

      if (!correctPwd) {
        return res.status(401).json({
          message: "Incorrect password",
        });
      }

      const loginCredentials = user.map((record) => {
        const { password, ...rest } = record;
        console.log(rest);

        return rest;
      });

      const token = jwt.sign(
        loginCredentials[0],
        process.env.SECRET as string,
        {
          expiresIn: "86400s",
        }
      );

      return res.status(200).json({
        message: "Logged in successfully",
        token,
      });
    } else {
      return res.status(401).json({
        message: "Email not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//CHECK USER DETAILS
export const checkUserDetails = async (req: ExtendedUser, res: Response) => {
  if (req.info) {
    return res.json({
      info: req.info,
    });
  }
};

//GET SINGLE USER
export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const singleUser = await pool
      .request()
      .input("email", mssql.VarChar, email)
      .execute("getSingleUser");
    console.log(singleUser);

    return res.status(200).json({
      user: singleUser.recordset[0],
      message: "Single User retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

//FETCH ALL USERS
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    let users = (await pool.request().execute("fetchAllUsers")).recordset;
    return res.json({
      users: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

//UPDATE USER
export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const { userID, fullname, profileUrl, profileCaption } = req.body;

    if (!userID || !fullname || !profileUrl || !profileCaption) {
      return res.status(400).json({
        error: "Invalid request",
        details:
          "Both userID, profileUrl, profileCaption and fullname are required for updating user details.",
      });
    }

    const updatedUser: updateUser = {
      userID,
      fullname,
      profileUrl,
      profileCaption,
    };
    const updateuserprocedureName = "updateUserDetails";
    const params = updatedUser;
    await execute(updateuserprocedureName, params);
    return res.send({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).send({
      error: "Internal server error",
    });
  }
};
