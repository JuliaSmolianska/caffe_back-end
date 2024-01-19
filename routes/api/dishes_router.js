import express from "express";
import dishesController from "../../controllers/dishes_controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
//import { isValidId } from "../../middlewares/isValidId.js";
//import validateBody from "../../decorators/validateBody.js";
//import { addConsumedWaterSchema, updateConsumedWaterSchema } from "../../db/models/consumedWater.js"

const dishesRouter = express.Router();

dishesRouter.get('/', dishesController.getAllDishesFetch);

dishesRouter.post('/', isEmptyBody, dishesController.addDish);

dishesRouter.put('/:dishId', isEmptyBody, dishesController.updateDishId);

dishesRouter.delete('/:dishId', dishesController.deleteDishId)

export default dishesRouter;