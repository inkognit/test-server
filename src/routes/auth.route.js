import { Router } from 'express';
import { session } from '../core/session.middlewares.js';
import { Auth } from '../services/auth.service.js';

const auth_routes = Router();
const auth = new Auth();

auth_routes.post('/sign-in', auth.signIn);
auth_routes.post('/sign-up', auth.signUp);
auth_routes.post('/sign-out', session, auth.signOut);

export default auth_routes;
