import { Controller } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PurchaseOrderService } from './purchase-order-service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@ApiTags('sample-request')
@Controller('sample-request')
export class PurchaseOrderController {
    constructor(private purchasseOrdrSeriv: PurchaseOrderService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

    }