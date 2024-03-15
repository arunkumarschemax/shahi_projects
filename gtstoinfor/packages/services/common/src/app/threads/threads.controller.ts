import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { ThreadsDto } from './dto/threads.dto';
import { ThreadsService } from './threads.service';
// import { CurrencyResponseModel, AllCurrencyResponseModel } from '@gtpl/shared-models/masters';
import { CommonResponseModel, ItemsRequest } from '@project-management-system/shared-models';
import { AllThreadsResponseModel, ThreadsResponseModel } from '@project-management-system/shared-models';

@ApiTags('threads')
@Controller('threads')
export class ThreadsController {
    constructor(
        private threadService: ThreadsService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}
    @Post('/createThread')
    @ApiBody({type:ThreadsDto})
    async createThread(@Body() threadDto:any,isUpdate:boolean=false): Promise<ThreadsResponseModel> {
    try {
      console.log(threadDto," re q at controler")
        return await this.threadService.createThread(threadDto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(ThreadsResponseModel, error);
      }
    }
    @Post('/updatethread')
  async updatethread(@Body() threadDto: ThreadsDto,@Req() request:Request): Promise<ThreadsResponseModel> {
    try {
   
      return await this.threadService.createThread(threadDto, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(ThreadsResponseModel, error);
    }
  }
  @Post('/getAllThread')
  async getAllThread(): Promise<CommonResponseModel> {
    try {
      return await this.threadService.getAllThreads();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getAllActiveThreads')
  async getAllActiveThreads(@Req() request: Request): Promise<AllThreadsResponseModel> {
      try {
          return await this.threadService.getAllActiveThreads();
      } catch (error) {
          return this.applicationExceptionHandler.returnException(AllThreadsResponseModel, error)
      }
  }
 
}
