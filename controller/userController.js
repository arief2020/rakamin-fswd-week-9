const pool = require("../config/query");
const bcrypt = require("bcrypt");

const pagination = require("../services/pagination");

class User {
  
  static async getAll(req, res, next) {
    try {
      const paginationSQL = pagination(req.query)

      const countSQL = `
      SELECT
        COUNT(DISTINCT users.*)
      FROM
        users
      `;
      const queryCount = await pool.query(countSQL);
      const count = queryCount.rows[0].count;

      let dataSQL = `
      SELECT 
        *
      FROM
        users
      ORDER BY id ASC
      ${paginationSQL}
      `;
      const queryData = await pool.query(dataSQL);
      const data = queryData.rows;

      let {limit, page} = req.query;

      // +limit is same like parseInt(limit)
      limit = +limit || 11
      page = +page || 1;

      let totalPages = Math.ceil(+count/ limit)

      const nextPage = (page + 1) <= totalPages ? page + 1 : null;
      const prevPage = (page - 1) > 0 ? page -1 : null


      res.status(200).json({
        count,
        data: data,
        currentPage: page,
        nextPage,
        prevPage,
        totalPages
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

  
}

module.exports = User;
