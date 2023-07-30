import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactoriesModule } from './factories/factories.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { appConfig } from '../../config';
import { OrdersModule } from './orders/orders.module';
import { SupplierModule } from './supplier/supplier.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      timezone: 'Z',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: '',
      database: 'shahi_orders',
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      extra: {
        connectionLimit: 20
      }
    }),
    FactoriesModule,
    UsersModule,
    OrdersModule,
    AuthModule, JwtModule , SupplierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
