import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import Appointment from '../models/Appointments';

const appointmentsRouter = Router();

const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (req, resp) => {
  const appointment = appointmentRepository.all();
  return resp.json(appointment);
});

appointmentsRouter.post('/', (req, resp) => {
  const { provider, date } = req.body;
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentRepository.findByDate(
    parsedDate,
  );
  if (findAppointmentInSameDate)
    return resp.status(400).json({ message: 'This date not available' });

  const appointment = appointmentRepository.create(provider, parsedDate);

  return resp.json(appointment);
});

export default appointmentsRouter;
