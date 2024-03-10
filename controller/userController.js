const pool = require("../config/query");
const bcrypt = require("bcrypt");
const { successResponse, basicResponse } = require("../services/response");
const jwt = require("jsonwebtoken");

class User {
  // static async getAll(req, res) {
  //   try {
  //     let page = parseInt(req.query.page) || 1;
  //     let limit = parseInt(req.query.limit) || 10;
  //     let offset = (page - 1) * limit;
  //     const queries = `SELECT * FROM users ORDER BY id ASC LIMIT ${limit} OFFSET ${offset};`;

  //     const result = await pool.query(queries);

  //     return res
  //       .status(200)
  //       .json(successResponse(result.rows, "Success Get All Users"));
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json(basicResponse("Internal Server Error"));
  //   }
  // }
  static async getAll(req, res, next) {
    try {
      const countSQL = `
      SELECT
        COUNT(DISTINCT users.*)
      FROM
        users
      `;
      const queryCount = await pool.query(countSQL);
      const count = queryCount.rows[0];

      const dataSQL = `
      SELECT 
        *
      FROM
        users
      ORDER BY id ASC
      `;
      const queryData = await pool.query(dataSQL);
      const data = queryData.rows;

      res.status(200).json({
        count,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUsersById(req, res, next) {
    try {
      const id = req.params.id;
      const queries = `
      SELECT 
        * 
      FROM 
        users 
      WHERE id = $1`;
      const result = await pool.query(queries, [id]);
      if (result.rows.length === 0) {
        throw { name: "ErrorNotFound", message: "Movies Not Found" };
      }
      return res
        .status(200)
        .json({ data: result.rows, message: "Success get Users by id" });
    } catch (error) {
      next(error);
    }
  }

  // static async store(req, res) {
  //   const { email, password, confirmPassword, role, gender } = req.body;

  //   if (password != confirmPassword) {
  //     return res
  //       .status(400)
  //       .json({ msg: "Password and confirm password are not same" });
  //   }
  //   const salt = await bcrypt.genSalt();
  //   const hashPassword = await bcrypt.hash(password, salt);
  //   const queries = `INSERT INTO users (email, password, role, gender) VALUES ('${email}', '${hashPassword}', '${role}', '${gender}')`;
  //   console.log(`ini hashPassword: ${hashPassword}`);

  //   try {
  //     await pool.query(queries);
  //     return res.status(200).json(basicResponse("Success register users"));
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json(basicResponse("Internal Server Error"));
  //   }
  // }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { email, password, confirmPassword, role, gender } = req.body;

      if (password != confirmPassword) {
        throw {
          name: "BadRequest",
          message: "Password and Confirm password are not same",
        };
      }

      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const queries = `
                  UPDATE 
                    users 
                  SET email = $1, 
                      password = $2, 
                      gender = $3, 
                      role = $4 
                  WHERE id = $5
                  `;

      const result = await pool.query(queries, [
        email,
        hashPassword,
        gender,
        role,
        id,
      ]);
      if (result.rowCount === 0) {
        throw { name: "ErrorNotFound", message: "Users Not Found" };
      }
      return res.status(200).json({ message: "Success Update Users" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      let { id } = req.params;
      const queries = `DELETE FROM users WHERE id = $1;`;
      const result = await pool.query(queries, [id]);
      if (result.rowCount === 0) {
        throw {name: "ErrorNotFound", message: "Users Not Found"}
      }
      return res.status(200).json({message: "Success Delete Users"});
    } catch (error) {
      next(error)
    }
  }

  // static async login(req, res) {
  //   let { email, password } = req.body;
  //   const queryEmail = `SELECT * FROM users where email = '${email}'`;
  //   const resEmail = await pool.query(queryEmail);
  //   if (resEmail.rowCount === 0) {
  //     return res
  //       .status(404)
  //       .json(basicResponse("Users with this email not found"));
  //   }
  //   const dataUser = resEmail.rows[0];
  //   const matchingPassword = await bcrypt.compare(password, dataUser.password);
  //   if (!matchingPassword)
  //     return res.status(400).json({ msg: "Wrong Password" });

  //   const idUser = dataUser.id;
  //   const emailUser = dataUser.email;
  //   const genderUser = dataUser.gender;
  //   const roleUser = dataUser.role;

  //   const accessToken = jwt.sign(
  //     { idUser, emailUser, roleUser, genderUser },
  //     process.env.ACCESS_TOKEN_SECRET,
  //     {
  //       expiresIn: "1d",
  //     }
  //   );
  //   return res
  //     .status(200)
  //     .json({ accessToken: accessToken, message: "Success Login User" });
  // }
}

module.exports = User;
