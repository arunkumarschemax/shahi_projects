import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { appConfig } from '../../config';
import { ScheduleModule } from '@nestjs/schedule';
import { AdobeAcrobatApiModule } from './adobe-acrobat-api/adobe-acrobat-api.module';
import { DataSource } from 'typeorm';
import { AppDataSource } from './app-datasource';
import { RLOrdersModule } from './ralph-lauren/rl-orders.module';
import { AddressModule } from './Entites@Shahi/address/address-module';
import { CentricModule } from './centric-buyer/centric.module';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      timezone: 'Z',
      host: appConfig.database.host,
      port: appConfig.database.port,
      username: appConfig.database.username,
      password: appConfig.database.password,
      database: appConfig.database.dbName,
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      extra: {
        connectionLimit: 20
      }
    }),
    UsersModule,
    AuthModule, JwtModule, AdobeAcrobatApiModule,CentricModule,AddressModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: DataSource,
    useFactory: async () => {
      await AppDataSource.initialize()
        .then(() => {
          console.log('Data Source has been initialized!');
        })
        .catch((err) => {
          console.error('Error during Data Source initialization', err);
        });
      // await AppDataSource1.initialize()
      //   .then(() => {
      //     console.log('Data Source has been initialized!');
      //   })
      //   .catch((err) => {
      //     console.error('Error during Data Source initialization', err);
      //   });
      // await AppDataSource2.initialize()
      //   .then(() => {
      //     console.log('Data Source has been initialized!');
      //   })
      //   .catch((err) => {
      //     console.error('Error during Data Source initialization', err);
      //   });
    }
  }],
})
export class AppModule { }
