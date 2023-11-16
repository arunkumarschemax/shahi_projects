import { Injectable } from '@nestjs/common';
import { CommonResponseModel, PoItemEnum, PurchaseOrderStatus } from '@project-management-system/shared-models';
import { GrnRepository } from './dto/grn-repository';
import { GrnAdapter } from './dto/grn-adapter';
import { GrnDto, PurchaseOrderReq } from './dto/grn-dto';
import { GrnEntity } from './entities/grn-entity';
import { GrnItemsEntity } from './entities/grn-items-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PurchaseOrderEntity } from '../purchase-order/entities/purchase-order-entity';
import { PurchaseOrderFbricEntity } from '../purchase-order/entities/purchase-order-fabric-entity';
import { PurchaseOrderTrimEntity } from '../purchase-order/entities/purchase-order-trim-entity';
import { GenericTransactionManager } from '../../typeorm-transactions';

@Injectable()

export class GrnService{
    constructor(
        private grnRepo:GrnRepository,
        private grnAdapter:GrnAdapter,
        @InjectRepository(PurchaseOrderFbricEntity)
        private poFabricRepo:Repository<PurchaseOrderFbricEntity>,
        @InjectRepository(PurchaseOrderTrimEntity)
        private poTrimRepo:Repository<PurchaseOrderTrimEntity>,
        private readonly dataSource: DataSource,
        @InjectRepository(PurchaseOrderEntity)
        private readonly poRepo:Repository<PurchaseOrderEntity>
      
    ){}

    async createGrne(req: any, isUpdate: boolean):Promise<CommonResponseModel>{
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

    async getAllPoDataToUPdateStatus(purchaseOrderId:number,materialType:string):Promise<CommonResponseModel>{
        try{
            const manager = this.dataSource;
            let query='SELECT pt.grn_quantity AS ptGrnQuantity,pf.grn_quantity AS pfGrnQuantity,po_fabric_id AS poFabricId,po_trim_id AS poTrimId,po.purchase_order_id AS purchaseOrderId,po_number AS poNumber,po.status AS poStatus,fab_item_status AS fabItemStatus,trim_item_status AS trimItemStatus FROM purchase_order po LEFT JOIN purchase_order_fabric pf ON pf.purchase_order_id=po.purchase_order_id LEFT JOIN purchase_order_trim pt ON pt.purchase_order_id=po.purchase_order_id WHERE po.purchase_order_id='+purchaseOrderId+''
            if(materialType == 'Fabric'){
                query=query+' and fab_item_status in ("OPEN","PARTAILLY RECEIVED")'
            }
            if(materialType == 'Trim'){
                query=query+' and trim_item_status in ("OPEN","PARTAILLY RECEIVED")'
            }
            const result= await manager.query(query)
            if(result){
                return new CommonResponseModel(true,1,'',result)
            }
        }catch(err){
            throw err
        }
    }

    async createGrn(req:GrnDto):Promise<CommonResponseModel>{
        const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
        try{
            // console.log(req,'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        await transactionalEntityManager.startTransaction();
            const itemInfo=[]
            const grnEntity = new GrnEntity()
            grnEntity.grnNumber=req.grnNumber
            grnEntity.vendorId=req.vendorId
            grnEntity.styleId=req.styleId
            grnEntity.poId=req.poId
            grnEntity.grnDate=req.grnDate
            grnEntity.createdUser=req.createdUser
            grnEntity.updatedUser=req.updatedUser
            for(const item of req.grnItemInfo){
                const itemEntity = new GrnItemsEntity()
                itemEntity.m3ItemCodeId=item.m3ItemCodeId
                itemEntity.productGroupId=item.productGroupId
                itemEntity.receivedQuantity=item.receivedQuantity
                itemEntity.receivedUomId=item.receivedUomId
                itemEntity.acceptedQuantity=item.acceptedQuantity
                itemEntity.acceptedUomId=item.acceptedUomId
                itemEntity.rejectedQuantity=item.rejectedQuantity
                itemEntity.rejectedUomId=item.rejectedUomId
                itemEntity.conversionQuantity=item.conversionQuantity
                itemEntity.conversionUomId=item.conversionUomId
                itemEntity.remarks=item.remarks
                itemInfo.push(itemEntity)
            }
            grnEntity.grnItemInfo=itemInfo
            const save = await this.grnRepo.save(grnEntity)  
            if(save){
                for(const item of req.grnItemInfo){ 
                   if(item.poFabricId != undefined){
                    const poQuantity = await this.poFabricRepo.find({where:{poFabricId:item.poFabricId}})
                    if(poQuantity[0].poQuantity == item.conversionQuantity){
                    await this.poFabricRepo.update({poFabricId:item.poFabricId},{grnQuantity:item.conversionQuantity,fabricItemStatus:PoItemEnum.RECEIVED})
                    }else{
                        await this.poFabricRepo.update({poFabricId:item.poFabricId},{fabricItemStatus:PoItemEnum.PARTAILLY_RECEIVED,grnQuantity:item.conversionQuantity})
                    }
                   }
                   if(item.poTrimId != undefined){
                    const poQuantity = await this.poTrimRepo.find({where:{poTrimId:item.poTrimId}})
                    if(poQuantity[0].poQuantity == item.conversionQuantity){
                        await this.poTrimRepo.update({poTrimId:item.poTrimId},{grnQuantity:item.conversionQuantity,trimItemStatus:PoItemEnum.RECEIVED})
                    }else{
                        await this.poTrimRepo.update({poTrimId:item.poTrimId},{grnQuantity:item.conversionQuantity,trimItemStatus:PoItemEnum.PARTAILLY_RECEIVED})
                    }
                   }
                }
                    const poData = await this.getAllPoDataToUPdateStatus(req.poId,req.materialtype)
                    // console.log(poData.data)
                    // console.log(poData.data.length)
                    // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
                    if(poData.data.length == 0){
                        await this.poRepo.update({purchaseOrderId:req.poId},{status:PurchaseOrderStatus.CLOSED})
                    }else{
                        await this.poRepo.update({purchaseOrderId:req.poId},{status:PurchaseOrderStatus.IN_PROGRESS})
                    }
                await transactionalEntityManager.completeTransaction();
                return new CommonResponseModel(true,1,'Grn Created Sucessfully',save)

            }else{
                await transactionalEntityManager.releaseTransaction();
                return new CommonResponseModel(false,0,'Something went wrong',[])
            }
            
        }
        catch(err){
            throw err
        }
    }
    
}