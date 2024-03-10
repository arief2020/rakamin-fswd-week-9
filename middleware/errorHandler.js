const errorHandler = (err, req, res, next) => {
    console.log(err)

    if (err.name === "ErrorNotFound") {
        res.status(404).json({name: err.name, message: err.message})
    }else if(err.name === "BadRequest") {
        return res.status(400).json({message: err.message})
    }else if (err.name === "InvalidCredentials") {
        return res.status(400).json({message: "Wrong email or password"})
    } else{
        res.status(500).json({message: "Internet Server Error"})
    }
}

module.exports = errorHandler