const pool = require("../config/query");
const { successResponse, basicResponse } = require("../services/response");

class Movie {
  static async getAll(req, res, next) {
    try {
      let page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      let offset = (parseInt(req.query.page) - 1) * limit;
      let queries = `
      SELECT 
        * 
      FROM 
        movies 
      ORDER BY id ASC 
      LIMIT ${limit} 
      OFFSET ${offset};`;
      
      const result = await pool.query(queries);
      
      let countQueries = `
      SELECT 
        COUNT(DISTINCT movies.*)
      FROM movies
      `

      
      const countData = await pool.query(countQueries)
      let dataSize = countData.rows[0].count

      let totalPages = Math.ceil(dataSize / limit)
      const nextPage = (page + 1) <= totalPages ? parseInt(page) + 1 : null
      const prevPage = (page) - 1 > 0  ? parseInt(page) - 1 : null
      
      return res
        .status(200)
        .json({
          data: result.rows, 
          totalData: dataSize,
          currentPage: page,
          nextPage,
          prevPage,
          message: "Success Get Movie",

        })
    } catch (error) {
      next(error)
    }
  }

  static async getMoviesById(req, res) {
    try {
      const id = req.params.id;
      const queries = `
      SELECT 
        * 
      FROM 
        movies 
      WHERE id = $1
      `;

      const result = await pool.query(queries, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json(basicResponse("Movie not found"));
      }
      return res
        .status(200)
        .json(successResponse(result.rows, "Success Get Movie By Id"));
    } catch (error) {
      next(error)
    }
  }

  static async store(req, res) {
    try {
      let { title, genres, year } = req.body;
      const queries = `INSERT INTO movies (title, genres, year) VALUES ($1, $2, $3)`;
  
      await pool.query(queries, [title, genres, year]);

      return res.status(201).json(basicResponse("Success Create Movies"));
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res) {
    try {
      let { title, genres, year } = req.body;
      let { id } = req.params;
      const queries = `UPDATE movies SET title = '${title}', genres = '${genres}', year = '${year}'  WHERE id = ${id};`;
      if (!title || !year || !genres) {
        return res.status(400).json(basicResponse("bad request"));
      }
      const result = await pool.query(queries);

      if (result.rowCount === 0) {
        return res.status(404).json(basicResponse("Movie not found"));
      }
      return res.status(200).json(basicResponse("Success Update Movies"));
    } catch (error) {
      res.status(500).json(basicResponse("Internal Server Error"));
    }
  }

  static async delete(req, res) {
    try {
      let { id } = req.params;
      const queries = `DELETE FROM movies WHERE id = '${id}';`;
      const result = await pool.query(queries);
      if (result.rowCount === 0) {
        return res.status(404).json(basicResponse("Movie not found"));
      }
      return res.status(200).json(basicResponse("Success Delete Movie"));
    } catch (error) {
      res.status(500).json(basicResponse("Internal Server Error"));
    }
  }
}

module.exports = Movie;
