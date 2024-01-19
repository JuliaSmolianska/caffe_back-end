// app.js
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dishesRouter from './routes/api/dishes_router.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Додавання методу setDishesData до об'єкта app
app.setDishesData = (dishes) => {
  // Реалізуйте логіку для обробки даних страв
  console.log('Setting dishes data:', dishes);
};

app.use("/dishes", dishesRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
