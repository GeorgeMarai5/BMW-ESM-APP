import { Service } from '../services/service.service';

export interface ServiceNote {
  ServiceNoteID: string;
  ServiceID: Service;
  Description: string;
}
