const bcrypt = require('bcrypt');
const User = require('../models/User');

async function register (req, res) {
  
  const {username, email, password, confirmPassword} = req.body;

  if(!username) {
    return res.status(422).json({ msg: 'O nome de usuário é obrigatório'});
  };

  if(!email) {
    return res.status(422).json({ msg: 'O e-mail de usuário é obrigatório'});
  };

  if(!password) {
    return res.status(422).json({ msg: 'A senha de usuário é obrigatória'});
  };

  if(password !== confirmPassword) {
    return res.status(422).json({ msg: 'As senhas não conferem'});
  };

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ msg: 'E-mail já cadastrado'});
  };

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    email,
    password: passwordHash
  });

  try {
    await user.save();
    res.status(201).json({ msg: 'Usuário cadastrado com sucesso'});

  } catch(error) {
    res.status(500).json({ msg: 'Aconteceu um erro no servidor. Tente mais tarde'});
  };
};

module.exports = register;