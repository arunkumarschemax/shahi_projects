import { Module } from '@nestjs/common';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { RLOrdersService } from './rl-orders.service';
import { RLOrdersController } from './rl-orders.controller';



@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([

        ])],
    controllers: [RLOrdersController],
    providers: [RLOrdersService, ApplicationExceptionHandler]
})
export class RLOrdersModule { }
