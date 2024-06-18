import { Router } from 'express';
import auth_routes from './auth.route.js';
import user_routes from './user.route.js';

const routes = Router();

routes.use('/auth', auth_routes);
routes.use('/users', user_routes);

export default routes;
