// server.js
import app from './app.js';
import fs from 'fs';
import "dotenv/config";
import path from 'path';

const { PORT } = process.env;
const JSON_FILE_PATH = path.resolve('data', 'dishes.json');

const startServer = async () => {
  try {
    // Асинхронно зчитуємо дані з файлу dishes.json
    fs.readFile(JSON_FILE_PATH, 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      const dishes = JSON.parse(data);

      // Викликаємо метод setDishesData на об'єкті app
      app.setDishesData(dishes);

      // Запускаємо сервер
      app.listen(PORT, () => {
        console.log(`Server running. Use our API on port: ${PORT}`);
      });
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
