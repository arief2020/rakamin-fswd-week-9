const jwt = require("jsonwebtoken");
const pool = require("../config/query");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    //   console.log(authHeader)
    const token = authHeader?.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    const { idUser } = jwt.verify(token, process.env.ACCESS_TOKEN_SECREt);

    const searchUser = `
                      SELECT
                        *
                      FROM
                        users
                      WHERE id = $1

            `;
    const result = await pool.query(searchUser, [idUser]);
    if (result.rowCount > 1) {
      const foundUser = result.rows[0];
      console.log(`ininsiadnlafnlsd ${foundUser}` )
      req.loggedUser = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      };
    }
    next();
  } catch (error) {
    next(error)
  }
};

const authorization = async (req, res, next) => {
  try {
    console.log(req.loggedUser)
        const {role} = req.loggedUser;

        if(role === "admin") {
            // Allowed to execute
            next();
        } else {
            throw {name: "Unauthorized"}
        }
  } catch (error) {
    // next(error);
  }
}

module.exports = {verifyToken, authorization};
