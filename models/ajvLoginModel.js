const ajv = require("./ajv");

const schema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

module.exports = ajv.compile(schema);
