import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthDto } from './dto/jwt-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { sha512 } from 'js-sha512';
import { MailerService } from '@nestjs-modules/mailer';

enum UserType {
  ADMIN = 'ADMIN',
  DRIVER = 'DRIVER',
  VOLUNTEER = 'VOLUNTEER',
}
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: DbService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async isTaken(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email: email } });
    return !!user;
  }

  async signup(dto: RegisterDto): Promise<object> {
    if (await this.isTaken(dto.email)) {
      throw new ForbiddenException('Credentials taken!');
    }
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: sha512(dto.password),
        username: dto.username,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        tempId: sha512(user.id.toString()),
      },
    });
    return { msg: 'Successfully registered a new account!' };
  }

  async login(dto: LoginDto) {
    const whereParams = {
      email: dto.email,
    };
    if (dto.isAdmin) {
      whereParams['type'] = 'ADMIN';
    } else {
      whereParams['OR'] = [
        {
          type: 'DRIVER',
        },
        {
          type: 'VOLUNTEER',
        },
      ];
    }
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email: dto.email },
    });
    if (!user || !(sha512(dto.password) === user.password))
      throw new ForbiddenException('Wrong credentials!');

    const jwt = await this.generateAuthJwt({
      userId: user.id,
      type: user.type as UserType,
    });

    return {
      token: jwt,
      userInfo: await this.getUserPublicInfo(dto.email),
    };
  }

  async generateAuthJwt(payload: JwtAuthDto): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async getUserPublicInfo(email: string): Promise<object | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        username: true,
        type: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (sha512(oldPassword) !== user.password) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: sha512(newPassword),
      },
    });
    return 'Password changed';
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const emailHTML = `
      <html lang="en">
        <body>
          <h1>Reset your password</h1>
          <p>Click <a href="http://localhost:3000/#/auth/password/reset/${user.tempId}">here</a> to reset your password.</p>
        </body>
      </html>
    `;
    await this.mailerService.sendMail({
      to: email,
      from: process.env.MAIL_FROM,
      subject: 'Reset your password',
      html: emailHTML,
    });
  }

  async resetPassword(tempId: string, newPassword: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          tempId: tempId,
        },
      });
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: sha512(newPassword),
        },
      });
      return 'Password changed';
    } catch (err) {
      console.error(err);
      return 'Error';
    }
  }
}
