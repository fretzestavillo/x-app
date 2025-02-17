import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserXEntity } from './auth.entity';
import { LoginDto, SignupDto } from './auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserXEntity)
    private userRepository: Repository<UserXEntity>,
    private jwtService: JwtService
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async comparePasswords(
    enteredPassword: string,
    storedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, storedPassword);
  }

  async signUp(data: SignupDto): Promise<object> {
    const userEntity = new UserXEntity();
    const joinDate = new Date();
    const philippinesTime = new Date(
      joinDate.toLocaleString('en-US', { timeZone: 'Asia/Manila' })
    );

    userEntity.full_name = data.full_name;
    userEntity.born_date = data.born_date;
    userEntity.join_date = philippinesTime;
    userEntity.email = data.email;
    userEntity.password = await this.hashPassword(data.password);

    await this.userRepository.save(userEntity);
    return { message: 'Signup Successful!' };
  }

  async signIn(
    data: LoginDto
  ): Promise<{ id: string; name: string; access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await this.comparePasswords(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { id: user.id, fullName: user.full_name };
    return {
      id: payload.id,
      name: payload.fullName,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
