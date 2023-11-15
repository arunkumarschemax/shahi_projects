import { Injectable } from '@nestjs/common';
import { IndentRepository } from './dto/indent-repository';
import { CommonResponseModel, IndentReq, IndentFabricModel, IndentModel, IndentTrimsModel, IndentRequestDto } from '@project-management-system/shared-models';
import { Indent } from './indent-entity';
import { IndentDto } from './dto/indent-dto';
import { IndentAdapter } from './dto/indent-adapter';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { DataSource } from 'typeorm';
import { FabricIndentRepository } from './dto/fabric-indent-repository';
import { TrimIndentRepository } from './dto/trim-indent-repository';
import { UomService } from '@project-management-system/shared-services';


@Injectable()

export class IndentService{
    constructor(
        private indentRepo:IndentRepository,
        private indentFabricRepo:FabricIndentRepository,
        private indentTrimRepo:TrimIndentRepository,
        private uomService:UomService,
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
        const indentData = await this.indentRepo.getAllIndentData();
        const indentModel = []
        const uomInfo = await this.uomService.getAllActiveUoms();
      const uomNameMap = new Map<number, string>();
      uomInfo.data.forEach(uom => uomNameMap.set(uom.uomId, uom.uom));
        for(const data of indentData){
            const fabricModel = [];
            const trimModel = [];
            const fabricIndentData = await this.indentFabricRepo.getFabricIndentData(data.indent_id);
            for(const fabric of fabricIndentData){
                fabricModel.push(new IndentFabricModel(fabric.ifabric_id,fabric.content, 
                    fabric.fabric_type_name,fabric.fabric_weave_name,fabric.weight,fabric.width,fabric.yarn_count,
                    fabric.name,fabric.construction,fabric.finish,fabric.shrinkage,fabric.m3_fabric_code,fabric.colour,
                    fabric.pch,fabric.moq,uomNameMap.get(fabric.moq_unit),fabric.moq_price,uomNameMap.get(fabric.moq_price_unit),fabric.season,fabric.supplier_id,
                    fabric.buyer_name,fabric.grn_date,fabric.xl_no,fabric.quantity,uomNameMap.get(Number(fabric.quantity_unit)),fabric.status))
                    console.log(Number(fabric.quantity_unit),'QQQQQQQQ')
                }
            const trimIndentData = await this.indentTrimRepo.getTrimIndentData(data.indent_id); 
            for(const trim of trimIndentData){
                trimModel.push(new IndentTrimsModel(trim.itrims_id,trim.trim_type,trim.trim_code,trim.sizes,trim.colour,
                    trim.quantity,trim.m3_trim_code,trim.description,
                    trim.remarks,trim.status))
            }
            indentModel.push(new IndentModel(data.indent_id,data.request_no,data.indent_date,data.expected_date,data.status,fabricModel,trimModel,data.style,data.description,data.created_at))
        }
        return new CommonResponseModel(true, 1235, 'Data retrieved Successfully',indentModel);
    }

    async getIndentnumbers():Promise<CommonResponseModel>{
        const data = 'select indent_id as indentId ,request_no as indentCode from indent'
        const result= await this.indentRepo.query(data)
        if(result){
            return new CommonResponseModel(true,1,'data retived sucessfully',result)
        }else{
            return new CommonResponseModel(false,0,'no data found',[])
        }
    }
    
    async getIndentData(req:IndentRequestDto): Promise<CommonResponseModel> {
        const data = await this.indentRepo.getIndentData(req);
        console.log(data,'555555555555555');
        
        if (data.length > 0) {
            const groupedData = data.reduce((result, item) => {
                const requestNo = item?.requestNo;
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
                    requestNo: item?.requestNo,
                    fabricId: item.fabricId,
                    materialtype:item.fabricType,
                    quantity:item.fbquantity,
                    color:item.color,
                    status:item.status,
                    m3Code:item.m3FabricCode,
                  

                });
                result[requestNo].i_items.push({
                    requestNo: item?.requestNo,
                    itrims_id: item.itrims_id,
                    materialtype: item.trimType,
                    trimCode: item.trimCode,
                    quantity: item.quantity,
                    color:item.color,
                    m3Code: item.m3TrimCode,
                    status:item.status,
                  })

               
                  return result;
                }, {});

            return new CommonResponseModel(true, 1, 'Data retrieved successfully', Object.values(groupedData));
        }  return new CommonResponseModel(false, 0, 'No data found', []);
    } catch (error) {
        return new CommonResponseModel(false, 0, 'An error occurred', []);
    }

    async getIndentDropDown(req:IndentRequestDto): Promise<CommonResponseModel> {
        const data = await this.indentRepo.getIndentDropDown()
        if (data.length) {
            return new CommonResponseModel(true, 1, 'Inventory data Retrived Sucessfully', data)
        } else {
            return new CommonResponseModel(false, 6546, 'Inventory data Not Found', data)

        }

    }
    async getIndentDate(req:IndentRequestDto): Promise<CommonResponseModel> {
        const data = await this.indentRepo.getIndentDropDown()
        if (data.length) {
            return new CommonResponseModel(true, 1, 'Inventory data Retrived Sucessfully', data)
        } else {
            return new CommonResponseModel(false, 6546, 'Inventory data Not Found', data)

        }

    }
}