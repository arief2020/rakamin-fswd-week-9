const pool = require("../config/query");

class Movie {
  static async getAll(req, res, next) {
    try {
      const countSQL = `
      SELECT
        COUNT(DISTINCT movies.*)
      FROM
        movies
      
      `;
      const queryCount = await pool.query(countSQL);
      const count = queryCount.rows[0];

      const dataSQL = `
      SELECT 
        *
      FROM
        movies
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

  static async getMoviesById(req, res, next) {
    try {
      const { id } = req.params;
      const sqlGetDataById = `
      SELECT
        *
      FROM
        movies
      WHERE id = $1
      `;

      const queryDataById = await pool.query(sqlGetDataById, [id]);
      if (queryDataById.rowCount === 0) {
        throw { name: "ErrorNotFound", message: "Movies Not Found" };
      }
      const data = queryDataById.rows[0];
      return res.status(200).json({ data });
    } catch (error) {
      next(error)
    }
  }

  static async store(req, res, next) {
    try {
      let { title, genres, year } = req.body;

      if (!title || !genres || !year) {
        throw {name: "BadRequest", message: "field must be required by title, genres, and year"}
      }

      const queries = `
      INSERT INTO movies (title, genres, year) 
      VALUES ($1, $2, $3) 
      RETURNING *
      `;
  
      const queryInsert = await pool.query(queries, [title, genres, year]);

      return res.status(201).json({message: "Success Create Movies", data: queryInsert.rows[0]});
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      let { title, genres, year } = req.body;
      const { id } = req.params;

      const searchSQL = `
      SELECT 
        *
      FROM
        movies
      WHERE id = $1
      `
      const searchQuery = await pool.query(searchSQL, [id])

      if (searchQuery.rowCount === 0) {
        throw { name: "ErrorNotFound", message: "Movies Not Found" }; 
      }

      const searchResult = searchQuery.rows[0]

      const updateSQL = `
      UPDATE 
        movies 
      SET 
        title = $1, 
        genres = $2, 
        year = $3 
      WHERE id = $4
      `
      title = title || searchResult.title
      genres = genres || searchResult.genres
      year = year || searchResult.year

      await pool.query(updateSQL,[title, genres, year, id])
      return res.status(200).json({message: "Success update movies"})
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const sqlDeleteDataById = `
      DELETE FROM movies
      WHERE id = $1
      `;

      const queryDeleteById = await pool.query(sqlDeleteDataById, [id]);
      if (queryDeleteById.rowCount === 0) {
        throw { name: "ErrorNotFound", message: "Movies Not Found" };
      }
      return res.status(200).json({message: "Success Delete Data By ID"});
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Movie;
