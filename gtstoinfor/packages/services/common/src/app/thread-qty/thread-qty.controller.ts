import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { ThreadQtyService } from "./thread-qty.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel } from "@project-management-system/shared-models";




@Controller("thread_qty")
export class ThreadQtyController{
    constructor(
   private threadQtyService:ThreadQtyService,
   private readonly applicationExceptionhandler: ApplicationExceptionHandler
    ){ }

    @Post('/getAllThreadQty')
    async getAllThreadQty(): Promise<CommonResponseModel> {
        try {
            return this.threadQtyService.getAllThreadQty()
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err)
        }
    }
  
}