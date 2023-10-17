import { Injectable } from "@nestjs/common";
import { CommonResponseModel, CustomerOrderStatusEnum, StyleOrderReq, StyleOrderResponseModel, styleOrderReq } from "@project-management-system/shared-models";
import { StyleOrder } from "./style-order.entity";
import { Item } from "../items/item-entity";
import { Warehouse } from "../warehouse/warehouse.entity";
import { FactoriesEntity } from "../factories/factories.entity";
import { Style } from "../style/dto/style-entity";
import { PackageTerms } from "../packages-terms/package-terms.entity";
import { DeliveryTerms } from "../delivery-terms/delivery-terms.entity";
import { DeliveryMethod } from "../delivery-method/delivery-method.entity";
import { Currencies } from "../currencies/currencies.entity";
import { PaymentTerms } from "../payment-terms/payment-terms.entity";
import { PaymentMethod } from "../payment-methods/payment-method-entity";
import { Buyers } from "../buyers/buyers.entity";
import { CoLine } from "./co-line.entity";
import { Colour } from "../colours/colour.entity";
import { Size } from "../sizes/sizes-entity";
import { Destination } from "../destination/destination.entity";
import { UomEntity } from "../uom/uom-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { StyleOrderRepository } from "./style-order-repo";
import { CoLineRepository } from "./co-line.repo";
import { ItemCreation } from "../fg-item/item_creation.entity";
import { StyleOrderId } from "./style-order-id.request";
import { VariantIdReq } from "./variant-id.req";
import { Raw } from 'typeorm';

@Injectable()

export class StyleOrderService{
    constructor(
        private repo:StyleOrderRepository,
        // @InjectRepository(StyleOrder)
      
         private CoLineRepo : CoLineRepository,
        private readonly dataSource: DataSource,

    ){}

    async createCustomerOrder(req:StyleOrderReq):Promise<StyleOrderResponseModel>{
        const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
        try{
            await transactionalEntityManager.startTransaction();
            const getCOLineCount = await this.repo.getAllCOCount()
            const maxId = getCOLineCount.id
            const entity = new StyleOrder()
            entity.itemCode = req.itemCode;
            entity.orderDate = req.orderDate;
            entity.buyerPoNumber = req.buyerPoNumber;
            entity.shipmentType = req.shipmentType;
            entity.buyerStyle = req.buyerStyle;
            entity.agent = req.agent;
            entity.buyerAddress = req.buyerAddress;
            entity.exFactoryDate = req.exFactoryDate;
            entity.deliveryDate = req.deliveryDate;
            entity.instoreDate = req.instoreDate;
            entity.salePrice = req.salePrice;
            entity.priceQuantity = req.priceQuantity;
            entity.discountAmount = req.discountAmount;
            entity.status = req.styleOrderItems.length > 0 ? CustomerOrderStatusEnum.CONFIRMED : CustomerOrderStatusEnum.OPEN;
            entity.remarks = req.remarks;
            const item = new ItemCreation()
            item.fgitemId = req.itemId
            entity.fgitemInfo = item;
            const warehouse = new Warehouse()
            warehouse.warehouseId = req.warehouseId
            entity.warehouseInfo = warehouse;
            const factory = new FactoriesEntity()
            factory.id = req.facilityId
            entity.factoryInfo = factory;
            const style = new Style()
            style.styleId = req.styleId
            entity.styleInfo = style
            const packageTerms = new PackageTerms()
            packageTerms.packageTermsId = req.packageTermsId
            entity.packageTermsInfo = packageTerms
            const deliveryTerms = new DeliveryTerms()
            deliveryTerms.deliveryTermsId = req.deliverytermId
            entity.deliveryTermsInfo = deliveryTerms
            const deliveryMethod = new DeliveryMethod()
            deliveryMethod.deliveryMethodId = req.deliveryMethodId
            entity.deliveryMethodInfo = deliveryMethod
            const currency = new Currencies()
            currency.currencyId = req.currencyId
            entity.currenciesInfo = currency
            const paymentTerms = new PaymentTerms()
            paymentTerms.paymentTermsId = req.paymentTermId
            entity.paymentTermsInfo = paymentTerms
            const paymentMethod = new PaymentMethod()
            paymentMethod.paymentMethodId = req.paymentMethodId
            entity.paymentMethodInfo = paymentMethod
            const buyer = new Buyers()
            buyer.buyerId = req.buyerId
            entity.buyerInfo = buyer
            let coLineItem  = []
            let val = 0
            for(const rec of req.styleOrderItems){
                val = val+1
                const itemsEntity = new CoLine()
                itemsEntity.deliveryAddress = rec.deliveryAddress
                itemsEntity.orderQuantity = rec.orderQuantity
                itemsEntity.color = rec.color
                itemsEntity.size = rec.size
                itemsEntity.destination = rec.destination
                itemsEntity.uom = rec.uom
                itemsEntity.status = rec.status
                itemsEntity.salePrice = rec.salePrice
                itemsEntity.coPercentage = rec.coPercentage
                const color = new Colour()
                color.colourId = rec.colorId
                itemsEntity.colorInfo = color
                const size = new Size()
                size.sizeId = rec.sizeId
                itemsEntity.sizeInfo = size
                const destination = new Destination()
                destination.destinationId = rec.destinationId
                itemsEntity.destinationInfo = destination
                const uom = new UomEntity()
                uom.id = rec.uomId
                itemsEntity.uomInfo = uom
                if(rec.styleOrderItemId){
                    itemsEntity.id = rec.styleOrderItemId
                    const styleOrderEntity = new StyleOrder()
                    styleOrderEntity.id = req.styleOrderId
                    itemsEntity.styleOrderInfo = styleOrderEntity
                    itemsEntity.updatedUser = req.createdUser
                    itemsEntity.coLineNumber = rec.coLineNumber

                } else{
                    itemsEntity.coLineNumber = `Line-${val}`
                    itemsEntity.createdUser = req.createdUser
                }
                coLineItem.push(itemsEntity)
            }
            entity.coLineInfo = coLineItem
            if(req.styleOrderId){
                entity.id = req.styleOrderId
                entity.updatedUser = req.createdUser
                entity.coNumber = req.coNumber
            } else{
                entity.coNumber = `CO-${Number(maxId)+1}`
                entity.createdUser = req.createdUser
            }
            const save = await transactionalEntityManager.getRepository(StyleOrder).save(entity)
            if(!save){
                await transactionalEntityManager.releaseTransaction()
                return new StyleOrderResponseModel(false,0,'Something went wrong in customer order creation',[])
            } else{
                await transactionalEntityManager.completeTransaction()
                return new StyleOrderResponseModel(true,1,'Created successfully',[])
            }

        } catch(err){
            await transactionalEntityManager.releaseTransaction()
            throw err
        }
    }
   async getAllStyleOrders(req:styleOrderReq):Promise<CommonResponseModel>{
    try{
        const data = await this.repo.getAllStyleOrders(req)
        console.log(req.itemId,'ressssssssssss');
        
        return new CommonResponseModel(true,1,'',data)

    } catch(err){
        throw err
    }
   } 
   async getAllCoLinesById(req:styleOrderReq):Promise<CommonResponseModel>{
    try{
        const data = await this.CoLineRepo.getAllCoLines(req)
        console.log(req.itemId,'ressssssssssss');
        
        return new CommonResponseModel(true,1,'',data)

    } catch(err){
        throw err
    }
   }
   async cancelOrder(req:StyleOrderId):Promise<CommonResponseModel>{
    const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
    try{
        await transactionalEntityManager.startTransaction();
        console.log(req);
        const updateStatus = await transactionalEntityManager.getRepository(StyleOrder).update({id:req.styleOrderId},{status:CustomerOrderStatusEnum.CLOSED});
        if(updateStatus.affected > 0){
            const updateCoLineStatus = await transactionalEntityManager.getRepository(CoLine).update({styleOrderInfo:{id:req.styleOrderId}},{status:CustomerOrderStatusEnum.CLOSED});
            if(updateCoLineStatus.affected > 0){
                await transactionalEntityManager.completeTransaction();
                return new CommonResponseModel(true,1,'Order Cancelled Successfully. ',)
            }
            else{
                await transactionalEntityManager.releaseTransaction();
                return new CommonResponseModel(false,0,'Cancel Order failed. ',)
            }
        }
        else{
            await transactionalEntityManager.releaseTransaction();
            return new CommonResponseModel(false,0,'Cancel Order failed. ',)
        }
    } catch(err){
        throw err
    }
   }

   async cancelVariantOrder(req:VariantIdReq):Promise<CommonResponseModel>{
    const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
    try{
        await transactionalEntityManager.startTransaction();
        console.log(req);
        const styleOrderDetails = await transactionalEntityManager.getRepository(CoLine).findOne({where:{id:req.variantId}});
        const updateCoLineStatus = await transactionalEntityManager.getRepository(CoLine).update({id:req.variantId},{status:CustomerOrderStatusEnum.CLOSED});
        if(updateCoLineStatus.affected > 0){
            const getCoLines = await transactionalEntityManager.getRepository(CoLine).find({where:{status:Raw(alias => `status !=  '${CustomerOrderStatusEnum.CLOSED}'`), id:Raw(alias => `id !=  '${req.variantId}'`)}});
            if(getCoLines.length > 0){
                await transactionalEntityManager.completeTransaction();
                return new CommonResponseModel(true,1,'Order Cancelled Successfully. ',)
            }
            else{
                console.log("jo")
                console.log(styleOrderDetails);
                const cancelOrder = await transactionalEntityManager.getRepository(StyleOrder).update({id:styleOrderDetails.styleOrderInfo.id},{status:CustomerOrderStatusEnum.CLOSED});
                if(cancelOrder.affected > 0){
                    await transactionalEntityManager.completeTransaction();
                    return new CommonResponseModel(true,1,'Order Cancelled Successfully. ',)
                }
                else{
                    await transactionalEntityManager.releaseTransaction();
                    return new CommonResponseModel(false,0,'Cancel Order failed. ',)
                }
            }
        }
        else{
            await transactionalEntityManager.releaseTransaction();
            return new CommonResponseModel(false,0,'Cancel Order failed. ',)
        }
    } catch(err){
        throw err
    }
   }
}