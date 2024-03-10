const pool = require("../config/query");
const bcrypt = require("bcrypt");
const { successResponse, basicResponse } = require("../services/response");
const jwt = require("jsonwebtoken");

class Auth {
  static async register(req, res, next) {
    try {
      const { email, password, confirmPassword, role, gender } = req.body;

      if (password != confirmPassword) {
        throw {
          name: "BadRequest",
          message: "Password and Confirm Password are not same",
        };
      }
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const queries = `  
      INSERT INTO users (email, password, role, gender) 
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `;
      const result = await pool.query(queries, [
        email,
        hashPassword,
        role,
        gender,
      ]);
      return res
        .status(200)
        .json({ message: "Success register users", data: result.rows[0] });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      const queryEmail = `
            SELECT 
              * 
            FROM 
              users 
            WHERE email = $1
            `;

      const resEmail = await pool.query(queryEmail, [email]);

      if (resEmail.rowCount === 0) {
        throw {name: "InvalidCredentials"}
      }

      const dataUser = resEmail.rows[0];
      const matchingPassword = await bcrypt.compare(
        password,
        dataUser.password
      );

      if (!matchingPassword) throw {name: "InvalidCredentials"}

      const accessToken = jwt.sign(
        { 
          id: dataUser.id,
          email: dataUser.email,
          role: dataUser.role 
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return res
        .status(200)
        .json({ accessToken: accessToken, message: "Success Login User" });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Auth;
