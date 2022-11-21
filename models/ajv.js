const Ajv = require("ajv")

const addFormats = require("ajv-formats")

const ajv = new Ajv({allErrors: true}) // options can be passed, e.g. {allErrors: true}
addFormats(ajv)

module.exports = ajv