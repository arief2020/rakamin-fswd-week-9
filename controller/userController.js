const pool = require("../config/query")
const { successResponse, basicResponse } = require("../services/response")

class User {
    static async getAll(req, res) {
        const queries = 'SELECT * FROM users ORDER BY id ASC'
        pool.query(queries, (err, result) =>{
            if (err) {
                throw err
            }
            return res.status(200).json(successResponse(result.rows, "Success Get All Users"))
        })
    }

    static async getUsersById(req, res) {
        const id = req.params.id
        const queries = `SELECT * FROM users where id = ${id}`
        pool.query(queries, (err, result) =>{
            if (err) {
                throw err
            }
            if (result.rows.length === 0) {
                return res.status(404).json(basicResponse("Users not found"))
            }
            return res.status(200).json(successResponse(result.rows, "Success get Users by id"))
        })
    }
}


module.exports = User