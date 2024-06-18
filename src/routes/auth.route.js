import { Router } from 'express';
import { sign_in_controller, sign_out_controller, sign_up_controller } from '../controllers/auth.controller.js';
import { session } from '../core/session.middlewares.js';

const auth_routes = Router();

auth_routes.post('/sign-in', sign_in_controller);
auth_routes.post('/sign-up', sign_up_controller);
auth_routes.post('/sign-out', session, sign_out_controller);

export default auth_routes;
