function validateSchema(ajv) {
  return (req, res, next) => {
    const valid = ajv(req.body);
    if (!valid) {
      const error = ajv.errors.map((err) => {
        return err.message;
      });
      console.log(error);
      return res.status(400).send(error);
    }
    next();
  };
}

module.exports = validateSchema;
