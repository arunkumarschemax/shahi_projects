import { Injectable } from '@nestjs/common';
import { IndentRepository } from './dto/indent-repository';
import { CommonResponseModel, IndentFabricModel, IndentModel, IndentTrimsModel, indentIdReq } from '@project-management-system/shared-models';
import { Indent } from './indent-entity';
import { IndentDto } from './dto/indent-dto';
import { IndentAdapter } from './dto/indent-adapter';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
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
    async getAllIndentItemDetailsAgainstIndent(req:indentIdReq):Promise<CommonResponseModel>{
        console.log(req)
        const data = 'SELECT ifb.ifabric_id as indentFabricId,ifb.indent_id as indentid,ft.fabric_type_id as fabric_type_id,m3_code as m3FabricCode,fabric_weave_name as fabricTypeName,p.profit_control_head AS pch,color AS colorName,fabric_weave_name AS weaveName,fabric_type_name AS fabricTypeName,content,ifb.fabric_type AS fabricTypeId,weave_id AS weaveId,weight,width,yarn_count AS yarnCount,construction,finish,shrinkage,m3_fabric_code,color AS colourId,pch,moq,moq_unit,quantity AS indentQuantity,ifb.indent_id AS indentId FROM indent_fabric ifb LEFT JOIN indent i ON ifb.indent_id=i.indent_id  LEFT JOIN fabric_type ft ON ft.fabric_type_id=ifb.fabric_type LEFT JOIN fabric_weave fw ON fw.fabric_weave_id=ifb.weave_id  LEFT JOIN colour c ON c.colour_id=ifb.color LEFT JOIN profit_control_head p ON p.profit_control_head_id=ifb.pch left join m3_masters ms on ms.m3_code=ifb.m3_fabric_code where ifb.indent_id in ('+req.indentId+') '
        const result= await this.indentRepo.query(data)
        if(result){
            return new CommonResponseModel(true,1,'data retived sucessfully',result)
        }else{
            return new CommonResponseModel(false,0,'no data found',[])
        }
    }

    
}