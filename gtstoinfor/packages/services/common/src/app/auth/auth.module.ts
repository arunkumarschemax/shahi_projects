import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';
import { UsersAdaptor } from '../users/adapters/users.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/repository/users.repository';
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService,JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}