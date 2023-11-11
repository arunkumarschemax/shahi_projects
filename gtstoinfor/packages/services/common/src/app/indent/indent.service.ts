import { Injectable } from '@nestjs/common';
import { IndentRepository } from './dto/indent-repository';
import { CommonResponseModel, IndentReq } from '@project-management-system/shared-models';
import { Indent } from './indent-entity';
import { IndentDto } from './dto/indent-dto';
import { IndentAdapter } from './dto/indent-adapter';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { DataSource } from 'typeorm';

@Injectable()

export class IndentService{
    constructor(
        private indentRepo:IndentRepository,
        private indentAdapter:IndentAdapter,
        private readonly dataSource: DataSource,

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
    
    async getIndentData( ): Promise<CommonResponseModel> {
        const data = await this.indentRepo.getIndentData();
        if (data.length > 0) {
            const groupedData = data.reduce((result, item) => {
                const requestNo = item.requestNo;
                const style = item.style;
                const indentDate = item.indentDate;
                const expectedDate = item.expectedDate;
                const status= item.status
               
                if (!result[requestNo]) {
                    result[requestNo] = {
                        requestNo: requestNo,
                        style: style,
                        indentDate: indentDate,
                        expectedDate: expectedDate,
                        status:status,
                        i_items: [],
                    };
                }
                result[requestNo].i_items.push({
                    requestNo: item.requestNo,
                    itrims_id: item.itrims_id,
                    fabricId: item.fabricId,
                    trimType: item.trimType,
                    fabricType:item.fabricType,
                    fbquantity:item.fbquantity,
                    color:item.color,
                    trimCode: item.trimCode,
                    status:item.status,
                    quantity: item.quantity,
                    m3TrimCode: item.m3TrimCode,
                    m3FabricCode:item.m3FabricCode,
                  

                });
                result[requestNo].i_items.push(
                    {
                    code: item.fabricCode,
                    consumption: item.fConsumption,
                  },
                  {
                    code: item.trimCode,
                    consumption: item.tConsumption,
                  }
                  );
                  return result;
                }, {});

            return new CommonResponseModel(true, 1, 'Data retrieved successfully', Object.values(groupedData));
        }  return new CommonResponseModel(false, 0, 'No data found', []);
    } catch (error) {
        return new CommonResponseModel(false, 0, 'An error occurred', []);
    }

    async getIndentDropDown(req:IndentReq): Promise<CommonResponseModel> {
        const data = await this.indentRepo.getIndentDropDown()
        if (data.length) {
            return new CommonResponseModel(true, 1, 'Inventory data Retrived Sucessfully', data)
        } else {
            return new CommonResponseModel(false, 6546, 'Inventory data Not Found', data)

        }

    }
}