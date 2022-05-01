module.exports = function (req, res, next) {
    console.log(`Requesting to: ${req.originalUrl}`)
    next()
}