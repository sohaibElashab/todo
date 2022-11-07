import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
// import { Payload } from 'src/types/payload';
import { LoginDTO } from 'src/auth/dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(pass, user.password)) {
      return user;
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async signPayload(userLogin: LoginDTO, signup, user) {
    if (signup) {
      user = await this.validateUser(userLogin.email, userLogin.password);
    }
    const payload = { id: user.id, username: user.username, role: user.role };
    var privateKey = fs.readFileSync(
      path.resolve('./src/auth/private.key'),
      'utf8',
    );
    var token = jwt.sign(payload, privateKey, {
      expiresIn: '60m', // 2min
      algorithm: 'RS256',
    });

    return {
      user: user,
      token: token,
    };
  }

  async useVerify(token: any) {
    var publicKey = fs.readFileSync(
      path.resolve('./src/auth/public.key'),
      'utf8',
    );
    var options = {
      issuer: 'Todo',
      subject: 'todo@moaj.info',
      audience: 'moaj.ma',
      expiredIn: '12h',
      algorithm: 'RS256',
    };
    try {
      var tokenVerifies = <jwt.VerificatedUser>(
        (<unknown>jwt.verify(token.token, publicKey, { algorithms: ['RS256'] }))
      );
      return 'token valid';
    } catch (error) {
      throw new Error('invalid token');
    }
  }
}
