import { Module } from "@nestjs/common";
import { AppDataSource } from "./app-datasource";
import { OrdersModule } from './orders/orders.module';
import { AdobeAcrobatApiModule } from './adobe-acrobat-api/adobe-acrobat-api.module';

@Module({

    imports: [OrdersModule, AdobeAcrobatApiModule]
})

export class AppDataSourceModule {}