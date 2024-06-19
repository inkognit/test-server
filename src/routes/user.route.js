import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { session } from '../core/session.middlewares.js';

const user_routes = Router();
const user_controller = new UserController();

user_routes.get('/', session, user_controller.getUsers);
user_routes.get('/:id', session, user_controller.getUser);
user_routes.patch('/:id', session, user_controller.putUser);
// user_routes.delete('/:id', session, user_controller.delete_user);

export default user_routes;
