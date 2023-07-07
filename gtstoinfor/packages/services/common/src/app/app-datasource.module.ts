import { Module } from "@nestjs/common";
import { AppDataSource } from "./app-datasource";
import { OrdersModule } from './orders/orders.module';

@Module({

    imports: [OrdersModule]
})

export class AppDataSourceModule {}