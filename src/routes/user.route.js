import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { session } from '../core/session.middlewares.js';

const user_routes = Router();
const user_controller = new UserController();

user_routes.get('/', session, user_controller.get_users);
user_routes.get('/:id', session, user_controller.get_user);
user_routes.put('/:id', session, user_controller.put_user);
// user_routes.delete('/:id', session, user_controller.delete_user);

export default user_routes;
