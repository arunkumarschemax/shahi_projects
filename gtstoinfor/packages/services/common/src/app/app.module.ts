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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PVHModule } from './pvh/pvh.module';
import { GapAddressModule } from './Entites@Shahi/gap-address/gap-address-module';
import { CkAddressModule } from './Entites@Shahi/ck-address/ck-address-module';


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

    ServeStaticModule.forRoot({
      // rootPath: join(__dirname, '..', '..', '..', '..', 'dist','packages','services','common','upload_files'),
      rootPath: join(__dirname, '../../../../', 'upload_files'),
      serveRoot: '/static',
      serveStaticOptions: {
        redirect: false,
        index: false
      }
    }),
    UsersModule,
    AuthModule, JwtModule, AdobeAcrobatApiModule,PVHModule,GapAddressModule,CkAddressModule],
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
    
    }
  }],
})
export class AppModule { }
