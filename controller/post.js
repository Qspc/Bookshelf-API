const user = require('../model/User');
// const post = db.posts

const getAll = async (req, res) => {
  const data = await user.find()
  return res.json({data})
};

const getOne = async (req, res) => {
  const id = req.params._id

  user.findById(id)

  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    res.send(err)
  })
};

const editUser = async (req, res) => {
  const id = req.params._id

  user.findByIdAndUpdate(id, req.body)

  .then((result) => {
    if (!result) {
      res.send({
        message: "post not found"
      })
    }
    res.send(result, {
      message: 'post was update'
    })
  })
  .catch((err) => {
    res.send(err)
  })
};

const getProfile = async (req, res) => {
  const {userName} = req.params

  user.find({
    userName
  })

  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    res.send(err)
  })
};

module.exports = {getAll, getOne, getProfile, editUser};
