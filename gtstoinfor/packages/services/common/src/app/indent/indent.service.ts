import { Injectable } from '@nestjs/common';
import { IndentRepository } from './dto/indent-repository';
import { CommonResponseModel, IndentReq, IndentFabricModel, IndentModel, IndentTrimsModel, IndentRequestDto, indentIdReq, BuyerRefNoRequest, ColourDto } from '@project-management-system/shared-models';
import { Indent } from './indent-entity';
import { IndentDto } from './dto/indent-dto';
import { IndentAdapter } from './dto/indent-adapter';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { DataSource, Repository } from 'typeorm';
import { FabricIndentRepository } from './dto/fabric-indent-repository';
import { TrimIndentRepository } from './dto/trim-indent-repository';
import { UomService } from '@project-management-system/shared-services';
import { Colour } from '../colours/colour.entity';
import { ColourService } from '../colours/colour.service';
import { ColourDTO } from '../colours/dto/colour-dto';


@Injectable()

export class IndentService {
    constructor(
        private indentRepo: IndentRepository,
        private indentFabricRepo: FabricIndentRepository,
        private indentTrimRepo: TrimIndentRepository,
        private colorService:ColourService,
        // private ColourRepository: Repository<Colour>,
        private uomService: UomService,
        private indentAdapter: IndentAdapter,
        private readonly dataSource: DataSource,

    ) { }

    async creteIndent(req: IndentDto, isUpdate: boolean): Promise<CommonResponseModel> {
        try {
            for(const rec of req.indentFabricDetails){
                if(rec.newColor){
                    const colorobj = new Colour()
                    const req = new ColourDTO()
                    req.colourId = null
                    req.colour = rec.newColor
                    req.createdUser = 'Admin';
                    const saveColor = await this.colorService.createColour(req,false)
                    if(saveColor.status){
                        rec.color = saveColor.data[0].colourId
                    }else{
                        let msg = 'Something went wrong in adding new colour';
                        if(saveColor.errorCode == 11104){
                            msg = 'Added new Color already existed in the list';
                        }
                        return new CommonResponseModel(false,0,msg)
                    }
                  }
            }
            const slNo = await this.indentRepo.count()
            // console.log(slNo);
            const today = new Date();
            const CurrentYear = today.getFullYear();
            const CurrentMonth = today.getMonth();
            let fromDate = 0;
            let toDate = 0;
            let totalIndents
            if (CurrentMonth < 4) {
                fromDate = (CurrentYear-1);
                toDate = (CurrentYear);
            } else {
                fromDate = (CurrentYear);
                toDate = (CurrentYear + 1);
            }
            totalIndents = slNo + 1;
            let refNo = totalIndents + "";
            while (refNo.length < 4) refNo = "0" + refNo;
            const indentnum = "IND" + "/"+(fromDate.toString().substr(-2)) + "-" + (toDate.toString().substr(-2))+ "/" + refNo
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

    async getAllIndentData(req?: any): Promise<CommonResponseModel> {
        console.log(req,'ooooo')
        const indentData = await this.indentRepo.getAllIndentData(req.extRefNumber);
        // if (req.requestNo) {
        //     indentData = indentData + ' and ,it.request_no = "' + req.requestNo + '"'
        //   }
        //   if (req.style) {
        //     indentData = indentData + ' and ,st.style = "' + req.style + '"'
        //   }
        //   if (req.status) {
        //     indentData = indentData + ' and ,it.status = "' + req.status + '"'
        //   }
        //   indentData = indentData + ' group by it.indent_id '
      
        const indentModel = []
        // const uomInfo = await this.uomService.getAllActiveUoms();
        //   const uomNameMap = new Map<number, string>();
        //   uomInfo.data.forEach(uom => uomNameMap.set(uom.uomId, uom.uom));
        for (const data of indentData) {
            const fabricModel = [];
            const trimModel = [];
            const fabricIndentData = await this.indentFabricRepo.getFabricIndentData(data.indent_id);
         

            for (const fabric of fabricIndentData) {
                fabricModel.push(new IndentFabricModel(fabric.ifabric_id, fabric.content,
                    fabric.fabric_type_name, fabric.fabric_weave_name, fabric.weight, fabric.width, fabric.yarn_count, fabric.unit, fabric.construction, fabric.finish, fabric.shrinkage, fabric.item_code,fabric.colour,
                    fabric.pch, fabric.moq, fabric.moqUnit, fabric.moq_price, fabric.moqPriceUnit, fabric.season, fabric.vendor_name,
                    fabric.buyer, fabric.grn_date, fabric.xl_no, fabric.quantity, fabric.quantityUnit, fabric.status,fabric.indentId,fabric.materialType,fabric.description,fabric.buyerId,data.styleId))
            }
            const trimIndentData = await this.indentTrimRepo.getTrimIndentData(data.indent_id);
            for (const trim of trimIndentData) {
                trimModel.push(new IndentTrimsModel(trim.itrims_id, trim.trimType, trim.item_code, trim.sizes, trim.colour,
                    trim.quantity, trim.m3TrimCode, trim.description,
                    trim.remarks, trim.quantity,trim.quantityUnit, trim.status,trim.indentId,trim.materialType,trim.buyerName,trim.buyerId,trim.quantityUnitId,trim.styleId))
            }
            indentModel.push(new IndentModel(data.indent_id, data.request_no, data.indent_date, data.expected_date, data.status, fabricModel, trimModel, data.style, data.description, data.created_at,data.buyerName,data.extRefNo))
        }
        
        return new CommonResponseModel(true, 1235, 'Data retrieved Successfully', indentModel);
    }

    async getIndentnumbers(req?:BuyerRefNoRequest): Promise<CommonResponseModel> {
        let buyerId
        if(req?.buyerRefNo){
            const buyerdata = `select buyer_id from buyers where external_ref_number = '${req.buyerRefNo}'`;
            const res = await this.dataSource.query(buyerdata)
            buyerId = res[0].buyer_id
        }
        let data = `select indent_id as indentId ,request_no as indentCode from indent`
        if(req.buyerRefNo){
            data = data+` where buyer_id = ${buyerId}`
        }
        console.log('dataaaaanyuuu',data)
        const result = await this.indentRepo.query(data)
        if (result) {
            return new CommonResponseModel(true, 1, 'data retived sucessfully', result)
        } else {
            return new CommonResponseModel(false, 0, 'no data found', [])
        }
    }

    async getAllIndentItemDetailsAgainstIndent(req: indentIdReq): Promise<CommonResponseModel> {
        console.log(req)
        // const data = 'SELECT "" as poQuantity,yarn_unit as yarnUnit,ifb.ifabric_id as indentFabricId,ifb.indent_id as indentid,ft.fabric_type_id as fabric_type_id,m3_code as m3FabricCode,fabric_weave_name as fabricTypeName,p.profit_control_head AS pch,color AS colorName,fabric_weave_name AS weaveName,fabric_type_name AS fabricTypeName,content,ifb.fabric_type AS fabricTypeId,weave_id AS weaveId,weight,width,yarn_count AS yarnCount,construction,finish,shrinkage,m3_fabric_code,color AS colourId,pch,moq,moq_unit,quantity AS indentQuantity,ifb.indent_id AS indentId FROM indent_fabric ifb LEFT JOIN indent i ON ifb.indent_id=i.indent_id  LEFT JOIN fabric_type ft ON ft.fabric_type_id=ifb.fabric_type LEFT JOIN fabric_weave fw ON fw.fabric_weave_id=ifb.weave_id  LEFT JOIN colour c ON c.colour_id=ifb.color LEFT JOIN profit_control_head p ON p.profit_control_head_id=ifb.pch left join m3_masters ms on ms.m3_code=ifb.m3_fabric_code where ifb.indent_id in ('+req.indentId+') '
        const data = '  SELECT i.request_no AS indentCode,"" AS poQuantity,ifb.ifabric_id AS indentFabricId,ifb.indent_id AS indentid,item_code AS itemCode,colour AS colorName, ifb.m3_fabric_code m3FabricCode,color AS colourId,quantity AS indentQuantity,ifb.quantity_unit as quantityUomId,u.uom as quantityUom,ifb.indent_id AS indentId,i.buyer_id as buyerId,i.style  FROM indent_fabric ifb LEFT JOIN indent i ON ifb.indent_id=i.indent_id LEFT JOIN colour c ON c.colour_id=ifb.color LEFT JOIN m3_items ms ON ms.m3_items_Id=ifb.m3_fabric_code LEFT JOIN uom u ON u.id=ifb.quantity_unit WHERE ifb.indent_id IN (' + req.indentId + ')'
        const result = await this.indentRepo.query(data)
        if (result) {
            return new CommonResponseModel(true, 1, 'data retived sucessfully', result)
        } else {
            return new CommonResponseModel(false, 0, 'no data found', [])
        }
    }

    async getAllIndentTrimDetailsAgainstIndent(req: indentIdReq): Promise<CommonResponseModel> {
        console.log(req)
        // const data = 'SELECT "" as poQuantity,item_code as trimCodeName,it.trim_type as productGroupId,trim_code as trimId, pg.product_group as trimType,c.colour AS colourName,item_code AS trimCodeName,product_group AS productGroup,itrims_id AS indentTrmId,trim_code AS trimId ,size AS sizeId,color AS colourId, quantity as indentQuantity,quantity_unit AS indentQuantityUnit,m3_trim_code AS m3TrimCode FROM indent_trims it LEFT JOIN indent i ON it.indent_id=i.indent_id LEFT JOIN product_group pg ON pg.product_group_id=it.trim_type LEFT JOIN rm_items ri ON ri.rm_item_id=it.trim_code LEFT JOIN colour c ON c.colour_id=it.color where it.indent_id in(' + req.indentId + ') '
        const data ='SELECT it.indent_id as indentId,m3_trim_Id AS m3TrimCode,request_no AS indentCode,"" AS poQuantity,ms.trim_type AS trimtype,ms.trim_code AS m3TrimCodeName,ms.trim_mapping_id as trimMappingId,it.trim_type AS productGroupId,it.trim_code AS trimId, itrims_id AS indentTrmId, it.trim_code AS trimId ,quantity AS indentQuantity, it.quantity_unit AS quantityUnitId, u.uom AS quantityUnit, tpm.structure, tpm.category, tpm.content, tpm.type, tpm.finish, tpm.hole, tpm.quality, tpm.thickness, tpm.variety, tpm.uom, tpm.color, tpm.logo, tpm.part,i.style as styleId FROM indent_trims it LEFT JOIN indent i ON it.indent_id=i.indent_id  LEFT JOIN m3_trims ms ON ms.m3_trim_Id=it.trim_code left join uom u on u.id = it.quantity_unit LEFT JOIN trim_params_mapping tpm ON tpm.trim_mapping_id = ms.trim_mapping_id WHERE it.indent_id in(' + req.indentId + ') '
        const result = await this.indentRepo.query(data)
        if (result.length > 0) {
            const modifiedRes = result.map(item => {
                const trueValues = Object.keys(item)
                .filter(key => ["structure", "category", "content", "type", "finish", "hole", "quality", "thickness", "variety", "uom", "color", "logo", "part"].includes(key) && item[key] === 1)
                .map(key => key.toUpperCase());

                const concatenatedValues = trueValues.join('/');
                const label = trueValues.length > 0 ? "BUYER/TRIM TYPE/TRIM CATEGORY/":""

                const trimParams = label + concatenatedValues
                return { ...item, trimParams };
            });

            return new CommonResponseModel(true, 1, "Stock retrieved successfully", modifiedRes);
        } else {
            return new CommonResponseModel(false, 0, 'no data found', [])
        }
    }



    async getIndentData(req: IndentRequestDto): Promise<CommonResponseModel> {
        const data = await this.indentRepo.getIndentData(req);
        console.log(data, '555555555555555');

        if (data.length > 0) {
            const groupedData = data.reduce((result, item) => {
                const requestNo = item?.requestNo;
                const style = item.style;
                const indentDate = item.indentDate;
                const expectedDate = item.expectedDate;
                const status = item.status

                if (!result[requestNo]) {
                    result[requestNo] = {
                        requestNo: requestNo,
                        style: style,
                        indentDate: indentDate,
                        expectedDate: expectedDate,
                        status: status,
                        i_items: [],
                    };
                }
                result[requestNo].i_items.push({
                    requestNo: item?.requestNo,
                    fabricId: item.fabricId,
                    materialtype: item.fabricType,
                    quantity: item.fbquantity,
                    color: item.color,
                    status: item.status,
                    m3Code: item.m3FabricCode,


                });
                result[requestNo].i_items.push({
                    requestNo: item?.requestNo,
                    itrims_id: item.itrims_id,
                    materialtype: item.trimType,
                    trimCode: item.trimCode,
                    quantity: item.quantity,
                    color: item.color,
                    m3Code: item.m3TrimCode,
                    status: item.status,
                })


                return result;
            }, {});

            return new CommonResponseModel(true, 1, 'Data retrieved successfully', Object.values(groupedData));
        } return new CommonResponseModel(false, 0, 'No data found', []);
    } catch(error) {
        return new CommonResponseModel(false, 0, 'An error occurred', []);
    }

    async getIndentDropDown(req: IndentRequestDto): Promise<CommonResponseModel> {
        const data = await this.indentRepo.getIndentDropDown()
        if (data.length) {
            return new CommonResponseModel(true, 1, 'Inventory data Retrived Sucessfully', data)
        } else {
            return new CommonResponseModel(false, 6546, 'Inventory data Not Found', data)

        }

    }
    // async getIndentDate(req:IndentRequestDto): Promise<CommonResponseModel> {
    //     const data = await this.indentRepo.getIndentDropDown()
    //     if (data.length) {
    //         return new CommonResponseModel(true, 1, 'Inventory data Retrived Sucessfully', data)
    //     } else {
    //         return new CommonResponseModel(false, 6546, 'Inventory data Not Found', data)

    //     }

    // }
}