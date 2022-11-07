import { PartialType } from '@nestjs/mapped-types';

export class RegisterDTO {
  email: string;
  username: string;
  password: string;
  role: string;
}
