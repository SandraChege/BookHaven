import joi from "joi";

export const validateBook = joi.object().keys({
  title: joi.string().required(),
  author: joi.string().required(),
  genre: joi.string().required(),
  content: joi.string().required(),
  bookImage: joi.string().required(),
  userID: joi.string().required(),
  series: joi.string().required(),
});

export const validateUpdateBook = joi.object().keys({
  bookID: joi.string().required(),
  title: joi.string().required(),
  author: joi.string().required(),
  genre: joi.string().required(),
  content: joi.string().required(),
  bookImage: joi.string().required(),
  userID: joi.string().required(),
  series: joi.string().required(),
});

export const validateBookId = joi.object().keys({
  bookID: joi.string().min(8).required(),
});
