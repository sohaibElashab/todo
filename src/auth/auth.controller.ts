import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-auth.dto';
import { RegisterDTO } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  async register(@Body() RegisterDTO: RegisterDTO) {
    const user = await this.userService.create(RegisterDTO);
    const payload = {
      email: user.email,
      password: user.password,
    };
    var signup = false

    return await this.authService.signPayload(payload, signup, user);
  }

  @Post('login')
  async login(@Body() req: LoginDTO) {  
    var signup = true;
    const user = {};
    return this.authService.signPayload(req, signup, user);
  }

  @Get('/verifyUser')
  public async verifyUser(@Headers() token:  any) : Promise<any> {
    return await this.authService.useVerify(token)
  }
}
