import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { session } from '../core/session.middlewares.js';

const auth_routes = Router();
const auth = new AuthController();

auth_routes.post('/sign-in', auth.signIn);
auth_routes.post('/sign-up', auth.signUp);
auth_routes.post('/sign-out', session, auth.signOut);

export default auth_routes;
