const Game = require('../models/Game');

async function editGame (req, res) {
  const id = req.params;
  const title = req.body;
  const genre = req.body;
  const description = req.body;
  const imageUrl = req.body;

  await Game.updateOne(req.params, {$set: title})
    .updateOne(req.params, {$set: genre})
    .updateOne(req.params, {$set: description})
    .updateOne(req.params, {$set: imageUrl});
  
  const game = await Game.findByIdAndUpdate(id);

  res.status(200).json({msg: 'Informações atualizadas com sucesso!', game });
};

module.exports = editGame;