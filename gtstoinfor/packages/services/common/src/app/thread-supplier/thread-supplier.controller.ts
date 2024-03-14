import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ThreadSupplierService } from "./thread-supplier.service";
import { CommonResponseModel } from "@project-management-system/shared-models";


@Controller("thread_supplier")
export class ThreadSupplierController{
  applicationExceptionHandler: any;
    constructor(
   private threadQtyService:ThreadSupplierService,
   private readonly applicationExceptionhandler: ApplicationExceptionHandler
    ){ }

    @Post('/getAllThreadSupplier')
    async getAllThreadSupplier(): Promise<CommonResponseModel> {
        try {
            return this.threadQtyService.getAllThreadSupplier()
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err)
        }
    }

  
}