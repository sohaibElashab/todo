import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as fs from 'fs';
import * as path from 'path';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService : UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: fs.readFileSync(
        path.resolve('./src/auth/public.key'),
        'utf8',
      ),
    });
  }

  async validate(payload: any) {
    const {id , username , role} = payload
    const user = await this.userService.findOne(id)
    if (user && user.username == username){
      return { id: id, username: username , role:role };
    }
    throw new UnauthorizedException();
  }
}
