import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { FoodModule } from './food/food.module';
import { UsersModule } from './users/users.module';
import { ShelterModule } from './shelter/shelter.module';
import { TaskModule } from './task/task.module';
import { ReportModule } from './report/report.module';
import { AmbulanceModule } from './ambulance/ambulance.module';
import { DangerousPlaceModule } from './dangerous-place/dangerous-place.module';
import { DangerousAreaModule } from './dangerous-area/dangerous-area.module';
import { MissionModule } from './mission/mission.module';

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
    ReportModule,
    AmbulanceModule,
    DangerousPlaceModule,
    DangerousAreaModule,
    MissionModule,
  ],
})
export class AppModule {}
