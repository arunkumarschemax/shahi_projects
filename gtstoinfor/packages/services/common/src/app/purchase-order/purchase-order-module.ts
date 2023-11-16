import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderService } from "./purchase-order-service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { PurchaseOrderController } from "./purchase-order-controller";
import { PurchaseOrderEntity } from "./entities/purchase-order-entity";
import { PurchaseOrderFbricEntity } from "./entities/purchase-order-fabric-entity";
import { PurchaseOrderTrimEntity } from "./entities/purchase-order-trim-entity";
import { PurchaseOrderRepository } from "./repo/purchase-order-repository";
import { PurchaseOrderFabricRepository } from "./repo/purchase-order-fabric-repository";
import { PurchaseOrderTrimRepository } from "./repo/purchase-order-trim-repository";

@Module({
    imports: [
    TypeOrmModule.forFeature([
        PurchaseOrderEntity,
        PurchaseOrderFbricEntity,
        PurchaseOrderTrimEntity
    ]),
    ],
    controllers: [PurchaseOrderController],
    providers: [PurchaseOrderService,ApplicationExceptionHandler,PurchaseOrderRepository,PurchaseOrderFabricRepository,PurchaseOrderTrimRepository]
  })
  export class PurchaseOrderModule {}