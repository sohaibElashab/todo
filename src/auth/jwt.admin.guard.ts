import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAdminGuard extends AuthGuard('jwt') {
  constructor(private userService: UserService) {
    super();
  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: any,
    status?: any,
  ): any {
   
    if (err || !user) {
      throw new UnauthorizedException();
    }
    if (user.role == 'Admin') {
      return user;
    }
    throw new UnauthorizedException();
  }
}
