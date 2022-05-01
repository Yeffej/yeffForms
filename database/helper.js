/**
 * HELPERS FILE
 */

const helper = {}

helper.ParseArgs = function () {
    let args = process.argv.slice(2)
    return args
}

module.exports = helper