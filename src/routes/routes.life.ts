import { Router } from 'express';

const life = Router();

life.get('/', (request, response) => {
  return response.status(200).json({ message: 'Rota is Running' });
});

export default life;
