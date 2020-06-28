import { IsEmail, IsDefined } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsDefined()
  public email: string;

  @IsDefined()
  public username: string;

  @IsDefined()
  public password: string;
}

// tslint:disable-next-line: max-classes-per-file
export class UserLoginDto {

  @IsEmail()
  @IsDefined()
  public email: string;

  @IsDefined()
  public password: string;
}
