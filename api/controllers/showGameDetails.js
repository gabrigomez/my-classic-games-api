const Game = require('../models/Game');

async function showGameDetails (req, res) {
  const id = req.params;

  await Game.find({ _id: id }, (error, data) => {
    if(error) {
      res.status(500).json({ msg: 'Aconteceu um erro no servidor'});
    } else {
      if (data.length === 0) {
        res.status(201).json({ msg: 'Jogo não encontrado'});
      } else {
        res.status(201).json(data);
      };
    };
  });
};

module.exports = showGameDetails;