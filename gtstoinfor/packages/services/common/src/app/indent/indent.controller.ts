import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IndentService } from "./indent.service";
import { AllItemsResponseModel, CommonResponseModel } from "@project-management-system/shared-models";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/"
import { IndentDto } from "./dto/indent-dto";

@ApiTags('indent')
@Controller('Indent')
export class IndentController {
  constructor(
    private readonly indentService: IndentService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler

  ) { }
  @Post('/creteIndent')
  async creteIndent(@Body() dto: any, isUpdate: boolean = false): Promise<CommonResponseModel> {
    try {
      return await this.indentService.creteIndent(dto, false);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/updateItem')
  async updateItem(@Body() dto: any, @Req() request: Request): Promise<CommonResponseModel> {
    try {
      return await this.indentService.creteIndent(dto, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }


  // @Post('/getAllItems')
  // async getAllItems():Promise<AllItemsResponseModel>{
  //   try{
  //     return await this.indentService.getAllItems()
  //   }catch(error){
  //     return this.applicationExceptionHandler.returnException(AllItemsResponseModel,error)
  //   }
  // }

  @Post('/getAllIndentData')
  async getAllIndentData(): Promise<CommonResponseModel> {
    try {
      return await this.indentService.getAllIndentData();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getIndentnumbers')
  async getIndentnumbers(): Promise<CommonResponseModel> {
    try {
      return await this.indentService.getIndentnumbers();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

}