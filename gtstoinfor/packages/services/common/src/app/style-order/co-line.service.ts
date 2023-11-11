import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoLine } from "./co-line.entity";
import { DataSource, Repository } from "typeorm";
import { CoLineResponseModel } from "@project-management-system/shared-models";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { Size } from "../sizes/sizes-entity";
import { Destination } from "../destination/destination.entity";
import { Colour } from "../colours/colour.entity";
import { UomEntity } from "../uom/uom-entity";
import { UomRequest } from "../uom/dto/uom.request";
import { CoLineReq } from "./dto/co-line.req";
import { StyleOrder } from "./style-order.entity";

@Injectable()

export class CoLineService{
    constructor(
        @InjectRepository(CoLine)
        private repo:Repository <CoLine>,
        private dataSource: DataSource

    ){}
         async createCoLine(req:CoLineReq):Promise<CoLineResponseModel>{
            console.log(req,'----------')
            const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
            try{
                await transactionalEntityManager.startTransaction();
                let flag = []
                let len = 0;
                const entity = new CoLine()
                entity.orderNumber = req.orderNumber;
                entity.buyerPoNumber = req.buyerPoNumber;
                entity.seasonCode = req.season;
                entity.exfDate = req.exFactoryDate;
                entity.deliveryDate = req.deliveryDate;
                entity.coNumber = req.coNumber
                entity.deliveryAddress = req.deliveryAddress
                for(const res of req.coLineInfo){
                    len =len +1
                    entity.skuCode = res.skuCode
                    entity.size = res.size
                    entity.colour = res.color
                    entity.destination = res.destination
                    entity.salePrice = res.price
                    entity.discount = res.discount
                    entity.orderQuantity = res.qty
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
                    styleOrder.coId = res.coId
                    entity.styleOrderInfo = styleOrder
                    entity.coLineNumber = `coLine-00${len}`

                    const save = await this.repo.save(entity)
                    if(!save){
                        
                        flag.push(false)
                        await transactionalEntityManager.releaseTransaction()
                        return new CoLineResponseModel(false,0,'Something went wrong ',[])
                    } else{
                        flag.push(true)
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

    
}