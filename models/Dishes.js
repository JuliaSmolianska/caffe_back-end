import Joi from "joi";

const category = ["Первые блюда", "Вторые блюда", "Вареники", "Сырники и пирожки", "Зразы", "Разносолы", "Пельмени", "Блины", "Котлеты", "Салаты"]
const availability = ["в наличии", "нет в наличии"];
const portionSize = ["стандарт", "большая"];

export const addDishSchema = Joi.object({
  id: Joi.string().required().messages({ "any.required": "missing required id field" }),
  category: Joi.string().valid(...category).required().messages({ "any.required": "missing required category field" }),
  name: Joi.string().required().messages({ "any.required": "missing required name field" }),
  price: Joi.number().min(1).max(100000).required().messages({ "any.required": "missing required price field" }),
  portionSize: Joi.string().valid(...portionSize).required().messages({ "any.required": "missing required portionSize field" }),
  description: Joi.string().required().messages({ "any.required": "missing required description field" }),
  photo: Joi.string().required().messages({ "any.required": "missing required photo field" }),
  availability: Joi.string().valid(...availability).required().messages({ "any.required": "missing required availability field" }),
})

export const updateDishSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().min(1).max(100000),
  portionSize: Joi.string().valid(...portionSize),
  description: Joi.string(),
  photo: Joi.string(),
  availability: Joi.string().valid(...availability),
})