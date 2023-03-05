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

export interface IAppointmentsEvent {
  event: IEvent;
  available: IAppointmentsAvailable;
}

export interface IAdminContent {
  booked: IAppointment[],
  event: IEventDetails | null
}
export interface IEvent {
  event: IEventDetails;
}
export interface IEventDetails {
  title: string;
  description?: string;
  date: Date | null;
  startingTime: string;
  endingTime: string;
  location: ILocation;
}

export interface ILocation {
  name: string;
  address: string;
}

export interface ICoordinates {
  longitude: number;
  latitude: number;
}

export interface IEventService {
  get: () => Promise<IEventDetails>;
}
