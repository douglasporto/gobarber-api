import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, resp) => {
  try {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    delete user.password;

    return resp.json({ user, token });
  } catch (e) {
    return resp.status(400).json({ error: e.message });
  }
});

export default sessionsRouter;
