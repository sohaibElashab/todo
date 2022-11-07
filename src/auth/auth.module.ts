import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy'
import { PassportModule } from '@nestjs/passport';
import { autorisation } from 'src/middleware/autorisation';
import {JwtModule} from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      privateKey: fs.readFileSync(
        path.resolve('./src/auth/private.key'),
        'utf8',
      ),
      publicKey: fs.readFileSync(path.resolve('./src/auth/public.key'), 'utf8'),
      signOptions: { expiresIn: '60m', algorithm: 'RS256' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
