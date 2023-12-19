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
import { PurchaseOrderItemsEntity } from "./entities/purchase-order-items-entity";
import { SampleRequestRepository } from "../sample-dev-request/repo/sample-dev-req-repo";
import { SampleRequest } from "../sample-dev-request/entities/sample-dev-request.entity";
import { IndentRepository } from "../indent/dto/indent-repository";
import { Indent } from "../indent/indent-entity";

@Module({
    imports: [
    TypeOrmModule.forFeature([
        PurchaseOrderEntity,
        PurchaseOrderFbricEntity,
        PurchaseOrderTrimEntity,
        PurchaseOrderItemsEntity,
        SampleRequest,
        Indent
    ]),
    ],
    controllers: [PurchaseOrderController],
    providers: [PurchaseOrderService,ApplicationExceptionHandler,PurchaseOrderRepository,PurchaseOrderFabricRepository,PurchaseOrderTrimRepository,SampleRequestRepository,IndentRepository,SampleRequestRepository]
  })
  export class PurchaseOrderModule {}