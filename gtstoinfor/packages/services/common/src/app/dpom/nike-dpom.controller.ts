import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/"
import { CommonResponseModel } from '@project-management-system/shared-models';
import { DpomService } from './nike-dpom.service';

@Controller('/nike-dpom')
export class DpomController {
    constructor(
        private dpomService: DpomService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler
    ) { }

    @Post('/getOctaToken')
    async getOctaToken() {
        try {
            return await this.dpomService.getOctaToken()
        } catch (error) {
            console.log(error);
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getDPOMOrderDetails')
    async getDPOMOrderDetails() {
        try {
            return await this.dpomService.getDPOMOrderDetails()
        } catch (error) {
            console.log(error);
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/saveDPOMDataToDataBase')
    async saveDPOMDataToDataBase() {
        try {
            return await this.dpomService.saveDPOMDataToDataBase()
        } catch (error) {
            console.log(error);
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }
    @Post('/getPPMData')
    async getPPMData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPPMData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }
     
}
