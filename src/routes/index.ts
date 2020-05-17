import { Router } from 'express';
import appointmentsRouter from './appointments.route';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

routes.get('/', (req, resp) => {
  return resp.json({ message: 'Hello World' });
});

export default routes;
