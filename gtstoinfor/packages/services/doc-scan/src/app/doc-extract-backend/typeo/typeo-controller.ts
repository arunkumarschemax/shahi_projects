import { Body, Controller, Post,Get } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ScanService } from "./typeo-service";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApplicationExceptionHandler } from "../../../../../../libs/backend-utils/src/exception-handling/application-exception-handler";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ScanResponseModel } from "../../../../../../libs/shared-models/src/shared-model/scan-response-object";
import { filterDto } from "../dtos/filter.dto";
import { ScanDto } from "../dtos/typeo.dto";
// import { ScanDto } from "../dtos/typeo.dto";

@ApiTags("docs")
@Controller("docs")
export class ScanController {
  constructor(
    private readonly Service: ScanService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler

  ) { }

  @Post("postdata")
  @ApiBody({type:ScanDto})
  async postdata(@Body() req: any): Promise<ScanResponseModel> {
    console.log(req,"contro")
    try {
      return await this.Service.postdata(req);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(
        ScanResponseModel,
        error
      );
    }
  }

  @Post("getdata")
  @ApiBody({type:filterDto})
  async getdata(@Body() req:any): Promise<any> {
    console.log(req,"controll")
    return await this.Service.getdata(req);
  }
  @Get('Emailprocess')
  processEmails() {
    this.Service.processEmails();
    return 'Processing emails';
  }
  @Get('automatic')
  async automatic(): Promise<any> {
    return this.Service.automatic();

  }
}