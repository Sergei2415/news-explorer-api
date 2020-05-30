
const articles = require('../models/article');
const { AccessDenied } = require('../errors/AccessDenied');
const { EntryNotFound } = require('../errors/EntryNotFound');

module.exports.getarticles = (req, res, next) => {
  const owner = req.user._id;
  articles.find({ owner })
    .then((article) => res.send({ data: article }))
    .catch(next);
};
module.exports.postarticles = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  articles.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};
module.exports.deleteArticlesId = (req, res, next) => {
  articles.findById(req.params.id)
    .then((article) => {
      if (article == null) return next(new EntryNotFound('Данная запись не найдена'));
      if (article.owner === req.user._id) {
        res.send({ data: article });
        return articles.findByIdAndRemove(req.params.id);
      }

      return next(new AccessDenied('Данная запись не была удалена, так как не вы её создатель'));
    })
    .catch(next);
};
