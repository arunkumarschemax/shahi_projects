import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoLine } from "./co-line.entity";
import { DataSource, In, Repository } from "typeorm";
import { CoLineReq, CoLineResponseModel, CommonResponseModel, StyleOrderIdReq, styleOrderReq } from "@project-management-system/shared-models";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { Size } from "../sizes/sizes-entity";
import { Destination } from "../destination/destination.entity";
import { Colour } from "../colours/colour.entity";
import { UomEntity } from "../uom/uom-entity";
import { UomRequest } from "../uom/dto/uom.request";
import { StyleOrder } from "./style-order.entity";
import { CoBom } from "../co-bom/co-bom.entity";
import { FgItemBom } from "../substituion/fg-item-bom.entity";
import { CoLineRepository } from "./co-line.repo";

@Injectable()

export class CoLineService{
    constructor(
        @InjectRepository(CoLine)
        private repo:Repository <CoLine>,
        private coLineRepo:CoLineRepository,
        private dataSource: DataSource,
        @InjectRepository(CoBom)
        private coBomRepo: Repository<CoBom>,
        @InjectRepository(FgItemBom)
        private fgItemBomRepo: Repository<FgItemBom>,

    ){}
         async createCoLine(req:CoLineReq):Promise<CoLineResponseModel>{
            const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
            try{
                await transactionalEntityManager.startTransaction();
                // const fgiTemBomInfoQuery = `select * from fg_item_bom where fg_sku in (${req.skucodes})`
                // const fgItemBomInfo = await this.dataSource.query(fgiTemBomInfoQuery)
                const fgItemBomInfo = await this.fgItemBomRepo.find({where:{fgSku : In(req.skucodes)}})
                let flag = []
                let len = 0;
                for(const res of req.coLineInfo){
                    len =len +1
                    const entity = new CoLine()
                entity.orderNumber = req.orderNumber;
                entity.buyerPoNumber = req.buyerPoNumber;
                entity.seasonCode = req.season;
                entity.exfDate = req.exfactoryDate;
                entity.deliveryDate = req.deliveryDate;
                entity.coNumber = req.coNumber
                entity.deliveryAddress = String(res.deliveryAddress)
                    entity.skuCode = res.skuCode
                    entity.size = res.size
                    entity.colour = res.color
                    entity.destination = res.destination
                    entity.salePrice = res.price
                    entity.discount = res.discount
                    entity.orderQuantity = res.quantity
                    const size = new Size()
                    size.sizeId = res.sizeId
                    entity.sizeInfo = size
                    const destination = new Destination()
                    destination.destinationId = res.destinationId
                    entity.destinationInfo = destination
                    const color = new Colour()
                    color.colourId = res.colorId
                    entity.colorInfo = color
                    const uom = new UomEntity()
                    uom.id = res.uomId
                    entity.uomInfo = uom
                    const styleOrder = new StyleOrder()
                    styleOrder.coId = req.coId
                    entity.styleOrderInfo = styleOrder
                    entity.coLineNumber = `coLine-00${len}`
                    const save = await this.repo.save(entity)
                    if(save){
                        const bomInfo = fgItemBomInfo.filter(e => e.fgSku === res.skuCode)
                        for(const bomObj of bomInfo){
                            const coBomObj = new CoBom;
                            coBomObj.fgItemBomId = bomObj.fgItemBomId
                            coBomObj.quantity = bomObj.consumption*save.orderQuantity
                            coBomObj.coNumber = save.coNumber
                            coBomObj.coLineNumber = save.coLineNumber
                            coBomObj.fgSku = save.skuCode
                            const cusOrd = new StyleOrder()
                            cusOrd.coId = req.coId
                            coBomObj.orderId = cusOrd
                            const coLine = new CoLine()
                            coLine.coLineId = save.coLineId
                            coBomObj.coLineInfo = coLine
                            const coBomSave = await this.coBomRepo.save(coBomObj)
                            if(!coBomSave){
                                
                                flag.push(false)
                                await transactionalEntityManager.releaseTransaction()
                                return new CoLineResponseModel(false,0,'Something went wrong ',[])
                            } else{
                                flag.push(true)
                            }                
                        }

                    }
                }
                
    
                if(flag.includes(false)){
                    await transactionalEntityManager.releaseTransaction()
                    return new CoLineResponseModel(false,0,'Something went wrong in co-line creation',[])
                } else{
                    await transactionalEntityManager.completeTransaction()
                    return new CoLineResponseModel(true,1,'Created successfully',[])
                }
    
            } catch(err){
                throw err
            }
        }

        async getAllCoLine(req:styleOrderReq): Promise<CommonResponseModel> {
            try {
            const data = await this.coLineRepo.getAllCoLines(req)
         
            if(data.length > 0){
                return new CommonResponseModel(true,1,'Data retrieved',data)
            } else{
                return new CommonResponseModel(false,1,'No data found')
            }        
              } catch (err) {
                throw err;
              }
             
            }  
}