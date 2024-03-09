const pool = require("../config/query");
const bcrypt = require("bcrypt");
const { successResponse, basicResponse } = require("../services/response");
const jwt = require("jsonwebtoken");

class Auth {
  
  static async register(req, res) {
    const { email, password, confirmPassword, role, gender } = req.body;
    
    if (password != confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Password and confirm password are not same" });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const queries = `  
    INSERT INTO users (email, password, role, gender) 
    VALUES ($1, $2, $3, $4)
    `;
    console.log(`this is hashPassword: ${hashPassword}`);

    try {
      await pool.query(queries, [email, hashPassword, role, gender]);
      return res.status(200).json(basicResponse("Success register users"));
    } catch (error) {
      console.log(error);
      res.status(500).json(basicResponse("Internal Server Error"));
    }
  }


  static async login(req, res) {
    let { email, password } = req.body;
    const queryEmail = `SELECT * FROM users where email = $1`;
    const resEmail = await pool.query(queryEmail, [email]);
    if (resEmail.rowCount === 0) {
      return res.status(404).json(basicResponse("Users with this email not found"));
    }
    const dataUser = resEmail.rows[0];
    const matchingPassword = await bcrypt.compare(password, dataUser.password);
    if (!matchingPassword)
      return res.status(400).json({ msg: "Wrong Password" });

    const idUser = dataUser.id;
    const emailUser = dataUser.email;
    const genderUser = dataUser.gender;
    const roleUser = dataUser.role;

    const accessToken = jwt.sign(
      { idUser, emailUser, roleUser, genderUser },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res
      .status(200)
      .json({ accessToken: accessToken, message: "Success Login User" });
  }
}

module.exports = Auth;
