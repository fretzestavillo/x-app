import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserXEntity } from './auth.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constant';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserXEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {},
    }),
  ],

  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
