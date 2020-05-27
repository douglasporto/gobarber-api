import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, resp) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointment = await appointmentRepository.find();
  return resp.json(appointment);
});

appointmentsRouter.post('/', async (req, resp) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      provider,
      date: parsedDate,
    });

    return resp.json(appointment);
  } catch (e) {
    return resp.status(400).json({ error: e.message });
  }
});

export default appointmentsRouter;
