module.exports = (err, req, res, next) => {
    let status = err.status || 500
    let message = err.message || "internal server error"
    if (err.name === "ValidationError") {
        status = 400
        let errArray = []
        for (let el in err.errors) {
            errArray.push(err.errors[el].message)
        }
        message = errArray.join(', ')
    }

    console.log(err)
    res.status(status).json({ message })
}