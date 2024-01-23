import express from "express";
import dishesController from "../../controllers/dishes_controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
//import { isValidId } from "../../middlewares/isValidId.js";
//import validateBody from "../../decorators/validateBody.js";
import { addDishSchema, updateDishSchema } from "../../models/Dishes.js"

const dishesRouter = express.Router();

dishesRouter.get('/', dishesController.getAllDishesFetch);

dishesRouter.post('/', isEmptyBody, validateBody(addDishSchema), dishesController.addDish);

dishesRouter.patch('/:dishId', isEmptyBody, validateBody(updateDishSchema), dishesController.updateDishId);

dishesRouter.delete('/:dishId', dishesController.deleteDishId)

export default dishesRouter;