module.exports = ({ user }, response, next) =>{
  if (user) {
    // console.log(user);
    next()
  } else {
    response.status(404).send({ error: `You're not logged in` });
  }
}