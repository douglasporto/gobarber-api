import { Router } from 'express';
import appointmentsRouter from './appointments.route';
import usersRouter from './users.route';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

routes.get('/', (req, resp) => {
  return resp.json({ message: 'Hello World' });
});

export default routes;
