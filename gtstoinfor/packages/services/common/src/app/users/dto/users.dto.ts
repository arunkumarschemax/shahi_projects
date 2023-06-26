export class UserDto {
  username: string;
  password: string;
  factory: string;
  role: string;

  constructor(
    username: string,
    password: string,
    factory: string,
    role: string
  ) {
    this.username = username;
    this.password = password;
    this.factory = factory;
    this.role = role;
  }
}
