const pool = require("../config/query")
const { successResponse, basicResponse } = require("../services/response")

class Movie {
    static async getAll(req, res) {
        const queries = 'SELECT * FROM movies ORDER BY id ASC'
        pool.query(queries, (err, result) =>{
            if (err) {
                throw err
            }
            return res.status(200).json(successResponse(result.rows, "Success Get All Movie"))
        })
    }

    static async getMoviesById(req, res) {
        const id = req.params.id
        const queries = `SELECT * FROM movies where id = ${id}`
        pool.query(queries, (err, result) =>{
            if (err) {
                throw err
            }
            if (result.rows.length === 0) {
                return res.status(404).json(basicResponse("Movie not found"))
            }
            return res.status(200).json(successResponse(result.rows, "Success Get Movie By Id"))
        })
    }

    static async store(req, res) {

    }

    static async update(req, res) {
    }

    static async delete(req, res) {
    }
}


module.exports = Movie