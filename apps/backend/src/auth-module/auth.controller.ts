import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './auth.dto';
import { UserXEntity } from './auth.entity';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() data: SignupDto): Promise<object> {
    const result = await this.authService.signUp(data);
    return result;
  }

  @Post('login')
  async login(@Body() data: LoginDto): Promise<any> {
    const result = await this.authService.signIn(data);
    return result;
  }
}
