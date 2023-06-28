import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactoriesController } from './factories/factories.controller';
import { FactoriesModule } from './factories/factories.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AppDataSource } from './app-datasource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSourceModule } from './app-datasource.module';


@Module({
  imports: [FactoriesModule, UsersModule,TypeOrmModule.forRootAsync({
    imports:[AppDataSourceModule]
  })],
  controllers: [AppController, FactoriesController],
  providers: [AppService, UsersService],
}
)
export class AppModule { }
