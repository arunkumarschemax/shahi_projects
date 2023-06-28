import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async signIn(authDto:AuthDto): Promise<any> {
    console.log(authDto)
    const user = await this.usersService.findOne(authDto.username);
    console.log(user)
    if (user?.password !== authDto.password) {
      throw new UnauthorizedException();
    }
    const payload = {  username: user.username };
    return {
      access_token: await this.jwtService.sign(payload,{secret:'dileep',privateKey:'dil'}),
    };
  }
}