const errorHandler = (err, req, res, next) => {
    console.log(err)

    if (err.name === "ErrorNotFound") {
        return res.status(404).json({name: err.name, message: err.message})
    }else if(err.name === "BadRequest") {
        return res.status(400).json({message: err.message})
    }else if (err.name === "InvalidCredentials") {
        return res.status(400).json({message: "Wrong email or password"})
    }else if(err.name === "Unauthenticated") {
        return res.status(401).json({message: "Unauthenticated"})
    }else if (err.name === "Unauthorized") {
        return res.status(401).json({message: "Unauthorized"})
    } else{
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = errorHandler