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
export class CompleteReportGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user: JwtAuthDto = req.user;

    if (user.type === 'ADMIN' || user.type === 'DRIVER') {
      return true;
    }
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'You must be an admin to perform this action',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
