import { Router } from 'express';
import knex from '../database/connection';

const itemsRouter = Router();

itemsRouter.get('/', async (req, res) => {
  try {
    const item = await knex('items').select('*').limit(10);

    const serialized = item.map(items => {
      return {
        id: items.id,
        title: items.title,
        image_up: `http://localhost:3000/api/uploads/${items.image}`,
      };
    });

    return res.status(200).json(serialized);
  } catch (error) {
    return res.status(400).json(error);
  }
});

itemsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await knex('items').select('*').where('id', id);
    const serialized = item.map(items => {
      return {
        id: items.id,
        title: items.title,
        image_up: `http://localhost:3000/api/uploads/${items.image}`,
      };
    });
    res.status(200).json(serialized);
  } catch (error) {
    res.status(400).json(error);
  }
});

itemsRouter.post('/', async (req, res) => {
  try {
    const { body } = req;
    const item = await knex('items').insert(body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

itemsRouter.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const item = await knex('items').insert(body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default itemsRouter;
