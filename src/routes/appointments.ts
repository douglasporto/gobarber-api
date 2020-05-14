import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, resp) => {
  const { provider, date } = req.body;
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(a =>
    isEqual(parsedDate, a.date),
  );
  if (findAppointmentInSameDate)
    return resp.status(400).json({ message: 'This date not available' });

  const appoint = new Appointment(provider, parsedDate);

  appointments.push(appoint);
  return resp.json(appoint);
});

export default appointmentsRouter;
