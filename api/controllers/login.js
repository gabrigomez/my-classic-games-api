const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

async function login (req, res) {  
  const { email, password } = req.body;

  if(!email) {
    return res.status(422).json({ msg: 'O e-mail de usuário é obrigatório'});
  };

  if(!password) {
    return res.status(422).json({ msg: 'A senha de usuário é obrigatória'});
  };

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: 'Usuário não cadastrado'});
  };

  const checkPassword = await bcrypt.compare(password, user.password)

  if(!checkPassword) {
    return res.status(422).json({ msg: 'Senha incorreta'});
  };

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign({
      id:user._id,
    },
    secret,
    )
  res.status(201).json({ token, user});

  } catch (error) {
    res.status(500).json({ msg: 'Aconteceu um erro no servidor. Tente mais tarde'});
  }

};

module.exports = login;