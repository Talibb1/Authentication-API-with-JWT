

// Details of login user with token

const loggedUser = async (req, res) => {
    res.send({ "user": req.user })
  }


  export default loggedUser;