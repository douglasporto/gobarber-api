import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, resp) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    return resp.json(user);
  } catch (e) {
    return resp.status(400).json({ error: e.message });
  }
});

export default usersRouter;
