import { environment } from '../environments/environment.development';

export const API_URLS = {
  Products: `${environment.Domain}products`,
  getById: `${environment.Domain}products/`,
};