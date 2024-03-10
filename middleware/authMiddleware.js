const jwt = require("jsonwebtoken");
const pool = require("../config/query");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (token == null) throw {name : "Unauthenticated"};
    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECREt);

    const searchUser = `
                      SELECT
                        *
                      FROM
                        users
                      WHERE id = $1

            `;
    const result = await pool.query(searchUser, [id]);
    if (result.rowCount === 0) {
        throw {name: "Unauthenticated"}
      };
      const foundUser = result.rows[0];
      req.loggedUser = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
    }
    next();
  } catch (error) {
    next(error)
  }
};

const authorization = async (req, res, next) => {
  try {
        const {role} = req.loggedUser;

        if(role === "admin") {
            // Allowed to execute
            next();
        } else {
            throw {name: "Unauthorized"}
        }
  } catch (error) {
    next(error);
  }
}

module.exports = {verifyToken, authorization};
