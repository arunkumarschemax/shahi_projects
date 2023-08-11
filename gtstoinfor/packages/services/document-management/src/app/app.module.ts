import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DocumentUploadModule } from './document_upload/document_upload.module';
import { appConfig } from '../../../common/config';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      timezone: 'Z',
      host: appConfig.database.host,
      port: appConfig.database.port,
      username: appConfig.database.username,
      password: appConfig.database.password,
      database: appConfig.database.docdbName,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      extra: {
        connectionLimit: 20
      }
    }),
    DocumentUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
