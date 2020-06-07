import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, resp) => {
  const { email, password } = req.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;

  return resp.json({ user, token });
});

export default sessionsRouter;
