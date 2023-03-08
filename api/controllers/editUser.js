const User = require('../models/User');

async function editUser (req, res) {
  const id = req.params;
  const username = req.body;
  const email = req.body;
  
  if(!username) {
    return res.status(422).json({ msg: 'O nome de usuário é obrigatório'});
  };

  if(!email) {
    return res.status(422).json({ msg: 'O e-mail de usuário é obrigatório'});
  };

  await User.updateOne(req.params, {$set: username}).updateOne(req.params, {$set: email});

  const user = await User.findByIdAndUpdate(id, '-password');

  res.status(200).json({msg: 'Informações atualizadas com sucesso!', user });

};

module.exports = editUser;