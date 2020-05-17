import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (req, resp) => {
  const appointment = appointmentRepository.all();
  return resp.json(appointment);
});

appointmentsRouter.post('/', (req, resp) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentRepository,
    );

    const appointment = createAppointmentService.execute({
      provider,
      date: parsedDate,
    });

    return resp.json(appointment);
  } catch (e) {
    return resp.status(400).json({ error: e.message });
  }
});

export default appointmentsRouter;
