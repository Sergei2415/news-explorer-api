
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getarticles, postarticles, deletearticlesid } = require('../controllers/article');

router.get('/articles', getarticles);// здесь не стал реализовывать схему, так как ничего не передаем
router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().required().min(2),
    source: Joi.string().required().min(2),
    link: Joi.string().regex(/^(https?:\/\/(www\.)?(([А-Яа-яA-Za-z0-9-_]\/*\?*=*)+\.[a-z]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(\/?[A-Za-zА-Яа-я0-9-_/]{1,})?(:\d{1,5})?(\/[A-Za-zА-Яа-я0-9-_/]{1,})?#?|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?#?)|[A-Za-z]*\.[A-Za-z0-9]{2,20}(:\d{1,5})?(\/?[A-Za-zА-Яа-я0-9-_/]{1,})?(:\d{1,5})?#?$/i),
    image: Joi.string().regex(/^(https?:\/\/(www\.)?(([А-Яа-яA-Za-z0-9-_]\/*\?*=*)+\.[a-z]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(\/?[A-Za-zА-Яа-я0-9-_/]{1,})?(:\d{1,5})?(\/[A-Za-zА-Яа-я0-9-_/]{1,})?#?|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?#?)|[A-Za-z]*\.[A-Za-z0-9]{2,20}(:\d{1,5})?(\/?[A-Za-zА-Яа-я0-9-_/]{1,})?(:\d{1,5})?#?$/i),
  }),
}), postarticles);
router.delete('/articles/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deletearticlesid);
module.exports = router;
