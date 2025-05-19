import { UserRole } from "./user-role.enum";

export class CreateUserDto {
  email: string;
  password: string;
  role: UserRole;
}
