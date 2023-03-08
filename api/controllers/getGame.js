const Game = require('../models/Game');

async function getGame (req, res) {
  const id = req.params;

  await Game.find({ user_id: id }, (error, data) => {
    if(error) {
      res.status(500).json({ msg: 'Aconteceu um erro no servidor'});
    } else {
      if (data.length === 0) {
        res.status(201).json({ msg: 'Este usuário não possui jogos cadastrados'});
      } else {
        res.status(201).json(data);
      };
    };
  });
};

module.exports = getGame;