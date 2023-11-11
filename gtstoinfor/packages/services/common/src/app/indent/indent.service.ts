import { Injectable } from '@nestjs/common';
import { IndentRepository } from './dto/indent-repository';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { Indent } from './indent-entity';
import { IndentDto } from './dto/indent-dto';
import { IndentAdapter } from './dto/indent-adapter';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';

@Injectable()

export class IndentService{
    constructor(
        private indentRepo:IndentRepository,
        private indentAdapter:IndentAdapter

    ){}

    async creteIndent(req: IndentDto, isUpdate: boolean):Promise<CommonResponseModel>{
        try {
            const slNo = await this.indentRepo.count()
            // console.log(slNo);
            const indentnum ="IND" + "/" + "22-23" + "/"+"00"+Number(Number(slNo) + 1)
            req.requestNo = indentnum;
            //  console.log(req);
              const convertedindentEntity: Indent = this.indentAdapter.convertDtoToEntity(req, isUpdate);
                console.log(convertedindentEntity)
              const savedindentEntity: Indent = await this.indentRepo.save(convertedindentEntity);
              const savedindentDto: IndentDto = this.indentAdapter.convertEntityToDto(savedindentEntity);
              if (savedindentDto) {
                  // generating resposnse
                  const response = new CommonResponseModel(true, 1, isUpdate ? 'indent Updated Successfully' : 'indent Created Successfully', savedindentDto);
                  return response;
              } else {
                  throw new ErrorResponse(11106, 'indent saved but issue while transforming into DTO');
              }
          } catch (error) {
              return error;
          }
    }

    async getAllIndentData(): Promise<CommonResponseModel> {
        const data = await this.indentRepo.find({relations: ['iFabricInfo', 'iTrimsInfo']});
        return new CommonResponseModel(true, 1235, 'Data retrieved Successfully',data);
    }

    async getIndentnumbers():Promise<CommonResponseModel>{
        const data = 'select indent_id as indenyId ,request_no as indentCode from indent'
        const result= await this.indentRepo.query(data)
        if(result){
            return new CommonResponseModel(true,1,'data retived sucessfully',result)
        }else{
            return new CommonResponseModel(false,0,'no data found',[])
        }
    }
    
}