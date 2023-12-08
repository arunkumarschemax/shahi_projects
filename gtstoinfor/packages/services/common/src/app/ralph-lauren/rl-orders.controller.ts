import { Controller } from "@nestjs/common";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { RLOrdersService } from "./rl-orders.service";

@Controller('/rl-orders')
export class RLOrdersController {
    constructor(
        private rlOrdersService: RLOrdersService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler
    ) { }
}