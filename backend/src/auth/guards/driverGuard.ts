import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthDto } from '../dto/jwt-auth.dto';

@Injectable()
export class DriverGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user: JwtAuthDto = req.user;

    if (user.type === 'DRIVER') {
      return true;
    }
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'You must be a driver to perform this action',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
