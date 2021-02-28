import { Router } from 'express';
import life from './routes.life';
import item from './routes.item';
import location from './routes.locations';
import users from './routes.users';
import userSessions from './routes.userSessions';

const routes = Router();

routes.use('/life', life);
routes.use('/items', item);
routes.use('/locations', location);
routes.use('/users', users);
routes.use('/login', userSessions);

export default routes;
