import { Router } from 'express';
import multer from 'multer';
import knex from '../database/connection';
import multerConfig from '../config/multer';
import isAuth from '../middlewares/isAuth';

const locationRouter = Router();

const upload = multer(multerConfig);
locationRouter.use(isAuth.isAuth);

locationRouter.get('/', async (req, res) => {
  let locations;

  try {
    const existItems: string[] = [];
    const { city, uf, items } = <any>req.query;

    if (!city || !uf || !items) {
      locations = await knex('locations').select('*');
    } else {
      const parseItems = await Promise.all(
        String(items)
          .split(',')
          .map(async item => {
            const valid = await knex('items').where({ id: item });
            if (valid.length === 0) {
              existItems.push(`O item ${item}, não existe na base de dados`);
            }

            return Number(item.trim());
          }),
      );
      locations = await knex('locations')
        .join(
          'location_items',
          'locations.id',
          '=',
          'location_items.location_id',
        )
        .whereIn('location_items.item_id', parseItems)
        .where('city', city)
        .where('uf', uf);
    }

    const locationsIfErros = {
      ...locations,
      notExists: existItems,
    };

    return res.status(200).json(locationsIfErros);
  } catch (e) {
    return res.status(400).json({ msg: 'Error', level: '50', erro: e.message });
  }
});

locationRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const location = await knex('locations').select('*').where('id', id);

    if (location.length === 0) {
      throw new Error(`o item ${id}, não existe na base de dados`);
    }

    const items = await knex('items')
      .join('location_items', 'items.id', '=', 'location_items.item_id')
      .where('location_items.location_id', id);

    const itemId = items.map(item => {
      return {
        ...item,
        image_up: `http://localhost:3000/api/uploads/${item.image}`,
      };
    });

    return res.status(200).json(itemId);
  } catch (e) {
    return res.status(400).json({ msg: 'Error', level: '50', erro: e.message });
  }
});

locationRouter.post('/', async (req, res) => {
  const transaction = await knex.transaction();
  try {
    const {
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const location = {
      name,
      image,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const newId = await transaction('locations').insert(location);

    const locationId = newId[0];

    const locationsItems = await Promise.all(
      items.map(async (item: number) => {
        const validatItem = await transaction('items')
          .where({ id: item })
          .first();

        if (!validatItem) {
          throw new Error(
            `O item ${item}, não foi localizado ma base de dados`,
          );
        }
        return {
          item_id: item,
          location_id: locationId,
        };
      }),
    );

    await transaction('location_items').insert(locationsItems);
    transaction.commit();

    return res.status(201).json({
      id: locationId,
      ...location,
    });
  } catch (error) {
    transaction.rollback();
    return res
      .status(400)
      .json({ msg: 'Error', level: '50', erro: error.message });
  }
});

locationRouter.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file.filename;
    const location = await knex('locations').where('id', id).first();

    if (!location) {
      throw new Error('Location not found');
    }

    await knex('locations')
      .update({ ...location, image })
      .where('id', id);
    return res.status(201).json({ ...location, image });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: 'Error', level: '50', erro: error.message });
  }
});
export default locationRouter;
