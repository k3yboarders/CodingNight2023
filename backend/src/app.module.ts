import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { FoodModule } from './food/food.module';
import { UsersModule } from './users/users.module';
import { ShelterModule } from './shelter/shelter.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    DbModule,
    AuthModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.SMTP_HOST,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
        defaults: {
          from: `Haid <${process.env.SMTP_USER}>`,
        },
      }),
    }),
    FoodModule,
    UsersModule,
    ShelterModule,
    TaskModule,
  ],
})
export class AppModule {}
