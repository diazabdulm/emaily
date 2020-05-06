module.exports = (request, response, next) => {
  if (!request.user.credits) {
    return response.status(402).send({ error: "Not enough credits" });
  }
  next();
};
