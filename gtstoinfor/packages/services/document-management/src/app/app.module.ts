import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from "@nestjs/serve-static";
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DocumentUploadModule } from './document_upload/document_upload.module';
import { appConfig } from '../../../common/config';
import { OrdersModule } from './orders/order.module';
import { join } from 'path';


@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      useFactory: () => ([{
        rootPath: join(__dirname, '../../../..', 'upload_fil'),
        serveStaticOptions: {
          redirect: false,
          index: false
        }
      }]),
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      timezone: 'Z',
      host: appConfig.database.host,
      port: appConfig.database.port,
      username: appConfig.database.username,
      password: appConfig.database.password,
      database: appConfig.database.docdbName,
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      extra: {
        connectionLimit: 20
      }
    }),
    DocumentUploadModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
