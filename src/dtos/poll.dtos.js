const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId();
const pollTitle = Joi.string().min(5).max(100); // Valida la longitud del título de la encuesta
const startDate = Joi.date().iso(); // Valida el formato de fecha ISO

// const endDate = Joi.date().iso(); // Valida el formato de fecha ISO

const createPollDto = Joi.object({
  pollTitle: pollTitle.required(),
  startDate: startDate.required(),

  questions: Joi.array(), // Valida un array de preguntas utilizando el esquema de pregunta definido anteriormente
});

const updatePollDto = Joi.object({
  pollTitle,
  startDate,
  questions: Joi.array(),
});
const getPollByIdDto = Joi.object({
  id: id.required(),
});
module.exports = { createPollDto, updatePollDto, getPollByIdDto };
