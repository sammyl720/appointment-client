import { HttpErrorResponse } from "@angular/common/http";
import { TIME_SLOT } from "./fields";

export interface IAppointmentSlotAvailable {
  time: TIME_SLOT;
  available: number;
}

export interface IAppointmentsAvailable {
  appointmentsLeft: number;
  slots: IAppointmentSlotAvailable[]
}

export interface ICreateAppointment {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  time: TIME_SLOT
}

export interface UpdateAppointmentDTO {
  time: TIME_SLOT;
}

export interface IAppointment {
  firstName: string,
  lastName: string;
  email: string;
  phone: string;
  date: Date;
  timeslot: ITimeSlot;
  _id?: string;
}

export interface ITimeSlot {
  date: Date,
  time: TIME_SLOT;
  _id?: string;
}

export function isProperApiValue<T>(value: T | HttpErrorResponse): value is T {
  if (!(value instanceof HttpErrorResponse)) {
    return true;
  }
  return false;
}
