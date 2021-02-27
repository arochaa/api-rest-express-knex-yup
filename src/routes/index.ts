import { Router } from 'express';
import life from './routes.life';
import item from './routes.item';
import location from './routes.locations';

const routes = Router();

routes.use('/life', life);
routes.use('/items', item);
routes.use('/locations', location);

export default routes;
