//import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import fs from 'fs';
import path from 'path';

const JSON_FILE_PATH = path.resolve('data', 'dishes.json');

//const JSON_FILE_PATH = 'C:\\Users\\sjuli\\Desktop\\кафе\\cafe_back-end\\data\\dishes.json';
const getAllDishesFetch = async (req, res) => {
  try {
    const data = await fs.promises.readFile(JSON_FILE_PATH, 'utf-8');
    const dishes = JSON.parse(data);

    res.status(200).json({ dishes });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const addDish = async (req, res) => {
  try {
    const currentData = await fs.promises.readFile(JSON_FILE_PATH, 'utf-8');
    const dishes = JSON.parse(currentData);
    const newDish = { ...req.body };

    dishes.push(newDish);

    await fs.promises.writeFile(JSON_FILE_PATH, JSON.stringify(dishes, null, 2), 'utf-8');

    res.status(201).json(newDish);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}


const updateDishId = async (req, res) => {
  const { dishId } = req.params;
  const updatedDishData = req.body;

  try {
    const data = await fs.promises.readFile(JSON_FILE_PATH, 'utf-8');
    let dishes = JSON.parse(data);

    const indexToUpdate = dishes.findIndex(dish => dish.id === parseInt(dishId));

    if (indexToUpdate === -1) {
      res.status(404).json({ error: 'Dish not found' });
      return;
    }

    dishes[indexToUpdate] = { ...dishes[indexToUpdate], ...updatedDishData };

    await fs.promises.writeFile(JSON_FILE_PATH, JSON.stringify(dishes, null, 2), 'utf-8');

    res.status(200).json({ message: 'Dish updated successfully', updatedDish: dishes[indexToUpdate] });
  } catch (error) {
    console.error(error);

    // Відправляємо відповідь з помилкою у випадку виникнення помилки
    res.status(500).json({ error: 'Server Error' });
  }
};

const deleteDishId = async (req, res) => {
  const { dishId } = req.params;
  try {
    const data = await fs.promises.readFile(JSON_FILE_PATH, 'utf-8');
    let dishes = JSON.parse(data);

    const indexToRemove = dishes.findIndex(dish => dish.id === parseInt(dishId));

    if (indexToRemove === -1) {
      res.status(404).json({ error: 'Dish not found' });
      return;
    }

    dishes.splice(indexToRemove, 1);

    await fs.promises.writeFile(JSON_FILE_PATH, JSON.stringify(dishes, null, 2), 'utf-8');

    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

export default {
  getAllDishesFetch: ctrlWrapper(getAllDishesFetch),
  addDish: ctrlWrapper(addDish),
  updateDishId: ctrlWrapper(updateDishId),
  deleteDishId: ctrlWrapper(deleteDishId)
};