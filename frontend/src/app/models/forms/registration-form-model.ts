import { Hearing } from '../data/hearing.model';

export class RegistrationForm {
  userName: string | null;
  email: string | null;
  password: string | null;
  dateOfBirth: Date | null;
  hearing: Hearing[] | null;
  passwordConfirmation: string | null;
  legalPerson: boolean | null;
  termsAccepted: boolean | null;
  invitations: any | null;
}
