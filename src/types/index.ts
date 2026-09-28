export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
}