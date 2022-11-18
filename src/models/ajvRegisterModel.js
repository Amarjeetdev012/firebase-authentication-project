const ajv  = require("./ajv")

const schema = {
    type: "object",
    properties: {
      name: {type: "string"},
      email: {type: "string"},
      password:{type:"string"},
      mobileNumber:{type:"number"}
    },
    required: ["name","email","password","mobileNumber"],
    additionalProperties: false
  }
  
module.exports = ajv.compile(schema)