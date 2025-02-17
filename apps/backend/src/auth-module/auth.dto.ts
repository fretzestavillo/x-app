import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(3, { message: 'Full name must be at least 3 characters long' })
  full_name: string;

  @IsString()
  born_date: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @MinLength(6, {
    message: 'Retype password must be at least 6 characters long',
  })
  retype_password: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
