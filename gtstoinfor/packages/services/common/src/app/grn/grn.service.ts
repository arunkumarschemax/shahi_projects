import { Injectable } from '@nestjs/common';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { GrnRepository } from './dto/grn-repository';
import { GrnAdapter } from './dto/grn-adapter';

@Injectable()

export class GrnService{
    constructor(
        private grnRepo:GrnRepository,
        private grnAdapter:GrnAdapter

    ){}

    async createGrn(req: any, isUpdate: boolean):Promise<CommonResponseModel>{
        try {
            const slNo = await this.grnRepo.count()
            // console.log(slNo);
            const indentnum ="IND" + "/" + "22-23" + "/"+"00"+Number(Number(slNo) + 1)
            req.requestNo = indentnum;
            //  console.log(req);
            //   const convertedindentEntity: Indent = this.indentAdapter.convertDtoToEntity(req, isUpdate);
            //     console.log(convertedindentEntity)
            //   const savedindentEntity: Indent = await this.indentRepo.save(convertedindentEntity);
            //   const savedindentDto: IndentDto = this.indentAdapter.convertEntityToDto(savedindentEntity);
            //   if (savedindentDto) {
            //       // generating resposnse
            //       const response = new CommonResponseModel(true, 1, isUpdate ? 'indent Updated Successfully' : 'indent Created Successfully', savedindentDto);
            //       return response;
            //   } else {
            //       throw new ErrorResponse(11106, 'indent saved but issue while transforming into DTO');
            //   }
          } catch (error) {
              return error;
          }
    }

    async getAllIndentData(): Promise<CommonResponseModel> {
        const data = await this.grnRepo.find({relations: ['iFabricInfo', 'iTrimsInfo']});
        return new CommonResponseModel(true, 1235, 'Data retrieved Successfully',data);
    }
    
}