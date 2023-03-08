const Game = require('../models/Game');

async function addGame (req, res) {
  const { title, genre, description, imageUrl } = req.body;
  const user_id = req.params;
  
  if(!title) {
    return res.status(422).json({ msg: 'O nome do jogo é obrigatório'});
  };

  if(!genre) {
    return res.status(422).json({ msg: 'O gênero é obrigatório'});
  };

  if(!description) {
    return res.status(422).json({ msg: 'Escreva uma descrição'});
  };

  if(!imageUrl) {
    return res.status(422).json({ msg: 'Adicione uma imagem da web'});
  };

  const game = new Game ({
    title,
    genre,
    description,
    imageUrl,
    user_id
  });

  try {
    await game.save();
    res.status(201).json({ msg: 'Game cadastrado com sucesso', game});
  } catch(error) {
    res.status(500).json({ msg: 'Aconteceu um erro no servidor. Tente mais tarde'});
  };
};

module.exports = addGame;