//Validating User signup data
const validation = (Schema) => async (req, res, next) => {
  try {
    const parseBody = await Schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const message = err.errors.map((error) => error.message);
    console.log("msg err", message);
    return res.status(400).json({ msg: message });
  }
};

export default validation;
